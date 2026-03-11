export interface SpecialQuestion {
  key: string;
  label: string;
  options: { value: string; label: string }[];
}

export interface SpecialLineDefinition {
  key: string;
  name: string;
  emoji: string;
  image: string;
  description: string;
  questions: SpecialQuestion[];
}

export const SPECIAL_LINE_DEFINITIONS: SpecialLineDefinition[] = [
  {
    key: "masukake",
    name: "ますかけ線",
    emoji: "⚡",
    image: "/lines/ますかけ線.png",
    description: "感情線と頭脳線が一本につながった希少な手相",
    questions: [
      {
        key: "gender",
        label: "性別を教えてください",
        options: [
          { value: "male", label: "男性" },
          { value: "female", label: "女性" },
          { value: "other", label: "答えない" },
        ],
      },
      {
        key: "hand",
        label: "どちらの手にありますか？",
        options: [
          { value: "right", label: "右手" },
          { value: "left", label: "左手" },
          { value: "both", label: "両手" },
        ],
      },
      {
        key: "clarity",
        label: "線の濃さは？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "薄め" },
        ],
      },
      {
        key: "continuity",
        label: "線の状態は？",
        options: [
          { value: "connected", label: "一本につながっている" },
          { value: "broken", label: "途中で途切れている" },
        ],
      },
    ],
  },
  {
    key: "sun",
    name: "太陽線",
    emoji: "☀️",
    image: "/lines/太陽線.png",
    description: "薬指の下に縦に走る線",
    questions: [
      {
        key: "length",
        label: "線の長さは？",
        options: [
          { value: "long", label: "長い（手首近くから）" },
          { value: "medium", label: "中程度" },
          { value: "short", label: "短い（指の付け根付近のみ）" },
        ],
      },
      {
        key: "count",
        label: "本数は？",
        options: [
          { value: "one", label: "1本" },
          { value: "multiple", label: "2本以上" },
        ],
      },
      {
        key: "clarity",
        label: "線の濃さは？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "薄め" },
        ],
      },
    ],
  },
  {
    key: "buddha",
    name: "仏眼",
    emoji: "👁️",
    image: "/lines/仏眼.png",
    description: "指の第一関節に現れる目のような模様",
    questions: [
      {
        key: "finger",
        label: "どの指にありますか？",
        options: [
          { value: "thumb", label: "親指" },
          { value: "index", label: "人差し指" },
          { value: "middle", label: "中指" },
          { value: "ring", label: "薬指" },
          { value: "pinky", label: "小指" },
          { value: "multiple", label: "複数の指" },
        ],
      },
      {
        key: "hand",
        label: "どちらの手にありますか？",
        options: [
          { value: "right", label: "右手" },
          { value: "left", label: "左手" },
          { value: "both", label: "両手" },
        ],
      },
      {
        key: "clarity",
        label: "はっきり度は？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "うっすら" },
        ],
      },
    ],
  },
  {
    key: "mystic",
    name: "神秘十字",
    emoji: "✝️",
    image: "/lines/神秘十字.png",
    description: "感情線と頭脳線の間に現れる十字の印",
    questions: [
      {
        key: "position",
        label: "十字の位置は？",
        options: [
          { value: "center", label: "感情線と頭脳線のほぼ中央" },
          { value: "near_heart", label: "感情線に近い" },
          { value: "near_head", label: "頭脳線に近い" },
        ],
      },
      {
        key: "size",
        label: "大きさは？",
        options: [
          { value: "large", label: "大きめ" },
          { value: "small", label: "小さめ" },
        ],
      },
      {
        key: "clarity",
        label: "線の濃さは？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "薄め" },
        ],
      },
    ],
  },
  {
    key: "mars",
    name: "火星線",
    emoji: "🔥",
    image: "/lines/火星線.png",
    description: "生命線の内側に沿って走る線",
    questions: [
      {
        key: "length",
        label: "線の長さは？",
        options: [
          { value: "long", label: "生命線と同じくらい長い" },
          { value: "short", label: "短め" },
        ],
      },
      {
        key: "clarity",
        label: "線の濃さは？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "薄め" },
        ],
      },
    ],
  },
  {
    key: "double",
    name: "二重生命線",
    emoji: "💫",
    image: "/lines/二重生命線.png",
    description: "生命線が二本並行して走っている状態",
    questions: [
      {
        key: "shape",
        label: "線の形状は？",
        options: [
          { value: "parallel", label: "平行に走っている" },
          { value: "curved", label: "生命線に沿ってカーブしている" },
        ],
      },
      {
        key: "gap",
        label: "生命線との間隔は？",
        options: [
          { value: "close", label: "近い" },
          { value: "wide", label: "離れている" },
        ],
      },
      {
        key: "length",
        label: "長さは？",
        options: [
          { value: "same", label: "生命線と同じくらい" },
          { value: "short", label: "短め" },
        ],
      },
    ],
  },
  {
    key: "money",
    name: "財運線",
    emoji: "💰",
    image: "/lines/財運線.png",
    description: "小指の付け根から感情線に向かう縦線（水星線）",
    questions: [
      {
        key: "hand",
        label: "どちらの手にありますか？",
        options: [
          { value: "right", label: "右手" },
          { value: "left", label: "左手" },
          { value: "both", label: "両手" },
        ],
      },
      {
        key: "length",
        label: "線の長さは？",
        options: [
          { value: "short", label: "短い" },
          { value: "long", label: "長い（感情線まで届く）" },
        ],
      },
      {
        key: "count",
        label: "本数は？",
        options: [
          { value: "one", label: "1本" },
          { value: "multiple", label: "2本以上" },
        ],
      },
      {
        key: "clarity",
        label: "線の濃さは？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "薄め" },
        ],
      },
    ],
  },
  {
    key: "marriage",
    name: "結婚線",
    emoji: "💍",
    image: "/lines/結婚線.png",
    description: "小指の下・感情線の上にある横線",
    questions: [
      {
        key: "hand",
        label: "どちらの手にありますか？",
        options: [
          { value: "right", label: "右手" },
          { value: "left", label: "左手" },
          { value: "both", label: "両手" },
        ],
      },
      {
        key: "count",
        label: "本数は？",
        options: [
          { value: "one", label: "1本" },
          { value: "two", label: "2本" },
          { value: "many", label: "3本以上" },
        ],
      },
      {
        key: "length",
        label: "線の長さは？",
        options: [
          { value: "short", label: "短い" },
          { value: "medium", label: "中程度" },
          { value: "long", label: "長い（薬指の下あたりまで）" },
        ],
      },
      {
        key: "clarity",
        label: "線の濃さは？",
        options: [
          { value: "clear", label: "くっきり" },
          { value: "faint", label: "薄め" },
        ],
      },
    ],
  },
];
