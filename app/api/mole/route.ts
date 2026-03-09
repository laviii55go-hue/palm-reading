import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { MOLE_AREAS } from "../../data/moleAreas";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { areaNumber, hand, size, color } = await req.json();

    const area = MOLE_AREAS.find((a) => a.number === Number(areaNumber));
    const areaLabel = area ? `${area.label}（${area.description}）` : `エリア${areaNumber}`;
    const handLabel =
      hand === "right" ? "右手" : hand === "left" ? "左手" : hand === "both" ? "両手" : hand;
    const sizeLabel = size === "large" ? "大きめ" : size === "small" ? "小さめ" : size;
    const colorLabel =
      color === "black" ? "黒" : color === "dark" ? "濃い茶色" : color === "light" ? "薄い茶色" : color;

    const prompt = `あなたは手相・ほくろ占いの専門家です。以下のほくろの情報をもとに鑑定結果を、必ず以下のJSON形式のみで返してください。JSON以外のテキストは一切含めないでください。

ほくろの情報:
・位置: ${areaLabel}
・手: ${handLabel}
・大きさ: ${sizeLabel}
・色: ${colorLabel}

返すJSONの形式:
{
  "title": "鑑定結果タイトル（15文字以内）",
  "meaning": "このほくろが持つ基本的な意味（2〜3文）",
  "luck": "運勢への影響・特徴（2〜3文）",
  "advice": "今後へのアドバイス（2〜3文）",
  "lucky": "ラッキーポイント（15文字以内）",
  "score": 1から5の整数（このほくろの吉凶度。5が最も吉）
}

読み手に寄り添った温かみのある文体で鑑定してください。`;

    const message = await client.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.choices[0].message.content ?? "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("レスポンスの形式が正しくありません");
    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ result });
  } catch (error) {
    const raw = error instanceof Error ? error.message : String(error);
    console.error("Mole API Error:", raw);
    return NextResponse.json({ error: raw }, { status: 500 });
  }
}
