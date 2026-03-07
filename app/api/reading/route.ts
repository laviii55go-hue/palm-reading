import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const FORTUNE_CONFIG: Record<string, {
  label: string;
  focus: string;
  sectionTitles: Record<string, string>;
}> = {
  general: {
    label: "総合運",
    focus: "健康・恋愛・知性・仕事の全体的な運勢",
    sectionTitles: { lifeLine: "健康運・生命力", heartLine: "恋愛運・感情面", headLine: "知性・思考傾向", fateLine: "仕事運・運命" },
  },
  love: {
    label: "恋愛運",
    focus: "恋愛運・パートナーシップ・出会いの運勢",
    sectionTitles: { heartLine: "恋愛の深さ・感情", lifeLine: "恋愛への活力・魅力", marriageLine: "縁・出会いの運" },
  },
  marriage: {
    label: "結婚運",
    focus: "結婚運・長期的な縁・パートナーとの絆",
    sectionTitles: { marriageLine: "結婚の縁・タイミング", heartLine: "愛情の深さ・相性", fateLine: "人生の転機・縁" },
  },
  career: {
    label: "仕事運",
    focus: "仕事運・キャリア・社会的な成功",
    sectionTitles: { fateLine: "仕事の方向性・成功運", headLine: "仕事における思考力・判断力" },
  },
  money: {
    label: "金運",
    focus: "金運・財運・お金の流れ",
    sectionTitles: { moneyLine: "財運・お金の流れ", fateLine: "稼ぐ力・仕事からの収入" },
  },
  health: {
    label: "健康運",
    focus: "健康運・生命力・体と心のバランス",
    sectionTitles: { lifeLine: "生命力・体の強さ", headLine: "精神的健康・ストレス耐性" },
  },
  relationship: {
    label: "人間関係運",
    focus: "人間関係・対人運・人脈",
    sectionTitles: { heartLine: "感情表現・人への愛情", headLine: "コミュニケーション力", lifeLine: "社交性・人との関わり" },
  },
};

export async function POST(req: NextRequest) {
  try {
    const { selections, fortuneType } = await req.json();
    const config = FORTUNE_CONFIG[fortuneType] ?? FORTUNE_CONFIG.general;
    const prompt = buildPrompt(selections, config);

    const message = await client.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1500,
      messages: [{ role: "user", content: prompt }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("レスポンスの形式が正しくありません");
    const result = JSON.parse(jsonMatch[0]);

    return NextResponse.json({ result });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("API Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function buildPrompt(
  selections: Record<string, string>,
  config: { label: string; focus: string; sectionTitles: Record<string, string> }
) {
  const lineTexts: string[] = [];

  const lineMap = [
    { key: "lifeLine", name: "生命線", fields: ["length", "shape", "condition"] },
    { key: "heartLine", name: "感情線", fields: ["length", "shape", "condition"] },
    { key: "headLine", name: "頭脳線", fields: ["length", "direction", "condition"] },
    { key: "fateLine", name: "運命線", fields: ["origin", "condition"] },
    { key: "marriageLine", name: "結婚線", fields: ["count", "length", "condition"] },
    { key: "moneyLine", name: "財運線", fields: ["length", "condition"] },
  ];

  for (const line of lineMap) {
    const present = selections[`${line.key}_present`];
    if (present === undefined) continue;
    if (present === "no") {
      lineTexts.push(`${line.name}: なし`);
    } else {
      const details = line.fields
        .map((f) => selections[`${line.key}_${f}`])
        .filter(Boolean)
        .join("、");
      lineTexts.push(`${line.name}: あり（${details}）`);
    }
  }

  const sectionsTemplate = Object.entries(config.sectionTitles)
    .map(([key, title]) => `    { "key": "${key}", "title": "${title}", "text": "2〜3文の鑑定テキスト", "score": 1から5の整数 }`)
    .join(",\n");

  return `あなたは手相鑑定の専門家です。以下の手相情報をもとに「${config.label}」（${config.focus}）の鑑定結果を、必ず以下のJSON形式のみで返してください。JSON以外のテキストは一切含めないでください。

手相情報:
${lineTexts.join("\n")}

返すJSONの形式:
{
  "sections": [
${sectionsTemplate}
  ],
  "summary": "${config.label}についての総合的なアドバイス（3〜4文、温かみのある文体で）"
}

読み手に寄り添った温かみのある文体で、特に${config.label}（${config.focus}）の観点から詳しく鑑定してください。`;
}
