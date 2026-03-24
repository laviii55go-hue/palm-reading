import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import {
  buildTarotAiUserPrompt,
  buildTarotFallbackResponse,
  getCelestialPromptContext,
  getNowForTarotPrompt,
  getTarotResult,
  isValidTarotThemeId,
  TAROT_THEMES,
} from "../../data/tarotData";

type ParsedAi = {
  interpretation: string;
  celestialNote: string;
  advice: string;
  keywords: string[];
};

function parseTarotAiJson(text: string): ParsedAi {
  let raw = text.trim();
  const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) raw = fenced[1].trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("JSON not found");
  const obj = JSON.parse(jsonMatch[0]) as Record<string, unknown>;
  const interpretation = String(obj.interpretation ?? "").trim();
  const celestialNote = String(obj.celestialNote ?? "").trim();
  const advice = String(obj.advice ?? "").trim();
  const kw = obj.keywords;
  const keywords = Array.isArray(kw)
    ? kw.slice(0, 5).map((k) => String(k))
    : [];
  if (!interpretation) throw new Error("empty interpretation");
  return { interpretation, celestialNote, advice, keywords };
}

type Provider = "openai" | "anthropic" | "gemini";

/** 安定した優先順。1つ目が失敗したら次を試す（本番でランダム1回失敗→テンプレになるのを防ぐ） */
function getProvidersInPriorityOrder(): Provider[] {
  const order: Provider[] = ["openai", "anthropic", "gemini"];
  return order.filter((p) => {
    if (p === "openai") return Boolean(process.env.OPENAI_API_KEY?.trim());
    if (p === "anthropic") return Boolean(process.env.ANTHROPIC_API_KEY?.trim());
    return Boolean(process.env.GEMINI_API_KEY?.trim());
  });
}

async function callOpenAiJson(prompt: string): Promise<string> {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const message = await client.chat.completions.create({
    model: "gpt-4o-mini",
    max_tokens: 900,
    response_format: { type: "json_object" },
    messages: [{ role: "user", content: prompt }],
  });
  return message.choices[0].message.content?.trim() ?? "";
}

async function callAnthropicJson(prompt: string): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const message = await client.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }],
  });
  const block = message.content[0];
  if (block.type !== "text") throw new Error("unexpected block");
  return block.text;
}

async function callGeminiJson(prompt: string): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const tryModels = ["gemini-2.0-flash", "gemini-1.5-flash"] as const;
  let lastErr: unknown;
  for (const modelName of tryModels) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json" },
      });
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

async function runTarotAi(prompt: string, provider: Provider): Promise<ParsedAi> {
  let raw: string;
  if (provider === "openai") raw = await callOpenAiJson(prompt);
  else if (provider === "anthropic") raw = await callAnthropicJson(prompt);
  else raw = await callGeminiJson(prompt);
  return parseTarotAiJson(raw);
}

async function runTarotAiTryProvidersInOrder(prompt: string): Promise<ParsedAi> {
  const providers = getProvidersInPriorityOrder();
  if (providers.length === 0) throw new Error("no AI provider keys");
  let lastErr: unknown;
  for (const provider of providers) {
    try {
      return await runTarotAi(prompt, provider);
    } catch (e) {
      lastErr = e;
      console.error(`tarot AI failed (${provider}):`, e);
    }
  }
  throw lastErr;
}

/** GET: 従来のテンプレート応答（外部互換・テーマなし） */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get("cardId");
  if (cardId === null || cardId === undefined) {
    return NextResponse.json({ error: "cardId is required" }, { status: 400 });
  }
  const id = parseInt(cardId, 10);
  if (isNaN(id) || id < 0 || id > 21) {
    return NextResponse.json({ error: "cardId must be 0-21" }, { status: 400 });
  }
  const isReversed =
    searchParams.get("isReversed") === "true" ||
    searchParams.get("isReversed") === "1" ||
    searchParams.get("isReversed") === "yes";
  const result = getTarotResult(id, isReversed);
  if (!result) {
    return NextResponse.json({ error: "Card not found" }, { status: 404 });
  }
  return NextResponse.json({
    cardName: result.cardName,
    isReversed: result.isReversed,
    love: result.love,
    work: result.work,
    general: result.general,
    advice: result.advice,
    emoji: result.emoji,
  });
}

/** POST: AI解釈（テーマ必須） */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cardId = Number(body.cardId);
    const isReversed = Boolean(body.isReversed);
    const themeRaw = typeof body.theme === "string" ? body.theme : "general";

    if (!Number.isInteger(cardId) || cardId < 0 || cardId > 21) {
      return NextResponse.json({ error: "cardId must be 0-21" }, { status: 400 });
    }
    if (!isValidTarotThemeId(themeRaw)) {
      return NextResponse.json({ error: "invalid theme" }, { status: 400 });
    }

    const themeDef = TAROT_THEMES.find((t) => t.id === themeRaw)!;
    const celestialInfo = getCelestialPromptContext();
    const { month, day, dayOfWeek, seasonContext } = getNowForTarotPrompt();

    const base = getTarotResult(cardId, isReversed);
    if (!base) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    const prompt = buildTarotAiUserPrompt({
      cardName: base.cardName,
      isReversed,
      themeLabel: themeDef.label,
      themeContext: themeDef.promptContext,
      celestialInfo,
      month,
      day,
      dayOfWeek,
      seasonContext,
    });

    const providers = getProvidersInPriorityOrder();
    if (providers.length === 0) {
      const fb = buildTarotFallbackResponse(cardId, isReversed, themeRaw);
      return NextResponse.json(fb);
    }

    try {
      const parsed = await runTarotAiTryProvidersInOrder(prompt);
      const keywords =
        parsed.keywords.length >= 3
          ? parsed.keywords.slice(0, 3)
          : [...parsed.keywords, "直感", "バランス", "一歩"].slice(0, 3);

      return NextResponse.json({
        cardName: base.cardName,
        cardNumber: cardId,
        isReversed: base.isReversed,
        theme: themeRaw,
        interpretation: parsed.interpretation,
        celestialNote: parsed.celestialNote || getCelestialPromptContext().slice(0, 80),
        advice: parsed.advice,
        keywords,
        fallback: false,
      });
    } catch (aiErr) {
      console.error("tarot AI error:", aiErr);
      const fb = buildTarotFallbackResponse(cardId, isReversed, themeRaw);
      return NextResponse.json(fb);
    }
  } catch (e) {
    const raw = e instanceof Error ? e.message : String(e);
    console.error("tarot-result POST:", raw);
    return NextResponse.json({ error: raw }, { status: 500 });
  }
}
