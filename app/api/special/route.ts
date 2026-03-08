import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const LINE_LABELS: Record<string, string> = {
  masukake: "ますかけ線",
  sun: "太陽線",
  buddha: "仏眼",
  mystic: "神秘十字",
  mars: "火星線",
  double: "二重生命線",
};

const QUESTION_LABELS: Record<string, Record<string, string>> = {
  gender: { male: "男性", female: "女性", other: "答えない" },
  hand: { right: "右手", left: "左手", both: "両手" },
  clarity: { clear: "くっきり", faint: "薄め・うっすら" },
  continuity: { connected: "一本につながっている", broken: "途中で途切れている" },
  length: { long: "長い", medium: "中程度", short: "短い", same: "生命線と同じくらい" },
  count: { one: "1本", multiple: "2本以上" },
  finger: { thumb: "親指", index: "人差し指", middle: "中指", ring: "薬指", pinky: "小指", multiple: "複数の指" },
  position: { center: "感情線と頭脳線のほぼ中央", near_heart: "感情線に近い", near_head: "頭脳線に近い" },
  size: { large: "大きめ", small: "小さめ" },
  shape: { parallel: "平行に走っている", curved: "生命線に沿ってカーブしている" },
  gap: { close: "近い", wide: "離れている" },
};

export async function POST(req: NextRequest) {
  try {
    const { lineKey, selections } = await req.json();
    const lineName = LINE_LABELS[lineKey] ?? lineKey;

    const details = Object.entries(selections as Record<string, string>)
      .filter(([, v]) => v)
      .map(([k, v]) => {
        const label = QUESTION_LABELS[k]?.[v] ?? v;
        return label;
      })
      .join("、");

    const prompt = `あなたは手相鑑定の専門家です。以下の特殊手相の情報をもとに鑑定結果を、必ず以下のJSON形式のみで返してください。JSON以外のテキストは一切含めないでください。

特殊手相: ${lineName}
特徴: ${details}

返すJSONの形式:
{
  "title": "${lineName}の鑑定結果タイトル（10文字以内）",
  "overview": "この手相が持つ意味・特徴（2〜3文）",
  "personality": "性格・気質の傾向（2〜3文）",
  "fortune": "今後の運勢・アドバイス（2〜3文）",
  "lucky": "ラッキーポイント（15文字以内）",
  "score": 1から5の整数（この手相の希少度・強運度）
}

読み手に寄り添った温かみのある文体で鑑定してください。`;

    const message = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.choices[0].message.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("レスポンスの形式が正しくありません");
    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ result });
  } catch (error) {
    const raw = error instanceof Error ? error.message : String(error);
    console.error("Special API Error:", raw);
    return NextResponse.json({ error: raw }, { status: 500 });
  }
}
