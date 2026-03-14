import { NextRequest, NextResponse } from "next/server";
import path from "path";

// kanji-data のデータパスを明示（Next.js バンドルで __dirname がずれる対策）
if (!process.env.KANJI_DATA_DIR) {
  process.env.KANJI_DATA_DIR = path.join(
    process.cwd(),
    "node_modules",
    "kanji-data",
    "data"
  );
}
// eslint-disable-next-line @typescript-eslint/no-require-imports
const kanji = require("kanji-data");
import {
  STROKE_FORTUNE,
  normalizeStroke,
  HIRAGANA_STROKES,
} from "../../data/nameFortuneData";

function getStrokeCount(char: string): number | null {
  // 漢字の場合
  const meta = kanji.get(char);
  if (meta?.stroke_count != null) return meta.stroke_count;

  // ひらがなの場合
  if (HIRAGANA_STROKES[char] != null) return HIRAGANA_STROKES[char];

  // カタカナ→ひらがな変換（Unicode範囲）
  const code = char.charCodeAt(0);
  if (code >= 0x30a1 && code <= 0x30f6) {
    const hira = String.fromCharCode(code - 0x60);
    if (HIRAGANA_STROKES[hira] != null) return HIRAGANA_STROKES[hira];
  }

  return null;
}

function getStrokesForString(str: string): { strokes: number[]; unknown: string[] } {
  const strokes: number[] = [];
  const unknown: string[] = [];
  for (const char of str) {
    const s = getStrokeCount(char);
    if (s != null) {
      strokes.push(s);
    } else if (char.trim()) {
      unknown.push(char);
    }
  }
  return { strokes, unknown };
}

export async function POST(req: NextRequest) {
  try {
    const { surname, givenName } = await req.json();

    const seimei = String(surname || "").trim();
    const namae = String(givenName || "").trim();

    if (!seimei || !namae) {
      return NextResponse.json(
        { error: "姓と名の両方を入力してください" },
        { status: 400 }
      );
    }

    const { strokes: seimeiStrokes, unknown: seimeiUnknown } =
      getStrokesForString(seimei);
    const { strokes: namaeStrokes, unknown: namaeUnknown } =
      getStrokesForString(namae);

    const allUnknown = [...new Set([...seimeiUnknown, ...namaeUnknown])];
    if (allUnknown.length > 0) {
      return NextResponse.json(
        {
          error: `次の文字の画数を取得できませんでした：${allUnknown.join("")}。漢字またはひらがなで入力してください。`,
        },
        { status: 400 }
      );
    }

    if (seimeiStrokes.length === 0 || namaeStrokes.length === 0) {
      return NextResponse.json(
        { error: "姓と名に有効な文字を入力してください" },
        { status: 400 }
      );
    }

    // 五格計算
    const seimeiSum = seimeiStrokes.reduce((a, b) => a + b, 0);
    const namaeSum = namaeStrokes.reduce((a, b) => a + b, 0);

    // 天格：姓が1字なら画数+1、2字以上なら姓の合計
    const tenkaku =
      seimeiStrokes.length === 1
        ? seimeiStrokes[0] + 1
        : seimeiSum;

    // 人格：姓の最後の字 + 名の最初の字
    const jinkaku =
      seimeiStrokes[seimeiStrokes.length - 1]! + namaeStrokes[0]!;

    // 地格：名の合計
    const chikaku = namaeSum;

    // 総格：姓 + 名の合計
    const soukaku = seimeiSum + namaeSum;

    // 外格：総格 - 人格 + 1
    const gaikaku = soukaku - jinkaku + 1;

    const tenkakuN = normalizeStroke(tenkaku);
    const jinkakuN = normalizeStroke(jinkaku);
    const chikakuN = normalizeStroke(chikaku);
    const gaikakuN = normalizeStroke(gaikaku);
    const soukakuN = normalizeStroke(soukaku);

    const result = {
      input: { surname: seimei, givenName: namae },
      strokes: {
        surname: seimeiStrokes,
        givenName: namaeStrokes,
      },
      gaku: [
        {
          key: "tenkaku",
          name: "天格",
          value: tenkakuN,
          fortune: STROKE_FORTUNE[tenkakuN],
        },
        {
          key: "jinkaku",
          name: "人格",
          value: jinkakuN,
          fortune: STROKE_FORTUNE[jinkakuN],
        },
        {
          key: "chikaku",
          name: "地格",
          value: chikakuN,
          fortune: STROKE_FORTUNE[chikakuN],
        },
        {
          key: "gaikaku",
          name: "外格",
          value: gaikakuN,
          fortune: STROKE_FORTUNE[gaikakuN],
        },
        {
          key: "soukaku",
          name: "総格",
          value: soukakuN,
          fortune: STROKE_FORTUNE[soukakuN],
        },
      ],
    };

    return NextResponse.json(result);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("Name fortune API error:", msg, stack);
    return NextResponse.json(
      {
        error: "エラーが発生しました",
        ...(process.env.NODE_ENV === "development" && { detail: msg }),
      },
      { status: 500 }
    );
  }
}
