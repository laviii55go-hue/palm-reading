import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const CATEGORY_LABELS: Record<string, string> = {
  love: "恋愛・人間関係",
  career: "仕事・キャリア",
  money: "金運・財運",
  health: "健康・心身のバランス",
};

export async function POST(req: NextRequest) {
  try {
    const { dreamText, keywords, category } = await req.json();

    const dreamInfo = [
      dreamText ? `夢の内容: ${dreamText}` : "",
      keywords?.length ? `キーワード: ${keywords.join("、")}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    if (category) {
      const categoryLabel = CATEGORY_LABELS[category] ?? category;
      const prompt = `あなたは夢占いの専門家です。以下の夢の情報をもとに「${categoryLabel}」への影響・メッセージを詳しく読み解いてください。200〜300文字程度の温かみのある文体で、テキストのみ返してください。

${dreamInfo}`;

      const message = await client.chat.completions.create({
        model: "gpt-4o-mini",
        max_tokens: 600,
        messages: [{ role: "user", content: prompt }],
      });

      const detail = message.choices[0].message.content?.trim() ?? "";
      return NextResponse.json({ detail });
    }

    const prompt = `あなたは夢占いの専門家です。以下の夢の情報をもとに、夢が伝えるメッセージを「ひとつの物語」として読み解いてください。
300〜400文字程度の温かみのある文体で、夢の象徴・潜在意識・近い将来のサインを織り交ぜながら、テキストのみ返してください。

${dreamInfo}`;

    const message = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    const narrative = message.choices[0].message.content?.trim() ?? "";
    return NextResponse.json({ narrative });
  } catch (error) {
    const raw = error instanceof Error ? error.message : String(error);
    console.error("Dream API Error:", raw);
    return NextResponse.json({ error: raw }, { status: 500 });
  }
}
