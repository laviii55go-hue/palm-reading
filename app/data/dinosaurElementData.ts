/**
 * 恐竜占い — バースデーナンバー（属性）システム
 */

export type DinosaurStats = {
  attack: number;
  defense: number;
  speed: number;
  intelligence: number;
  kindness: number;
  luck: number;
};

/** 属性に対応する数秘バースデー値（1〜9, 11, 22） */
export const ELEMENT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22] as const;
export type ElementNumber = (typeof ELEMENT_NUMBERS)[number];

export interface DinosaurElement {
  number: ElementNumber;
  name: string;
  key: string;
  emoji: string;
  image?: string;
  bgImage?: string;
  bgGradient: string;
  talent: string;
  description: string;
  strengths: string[];
  advice: string;
  statBonus: Partial<DinosaurStats>;
  /** キラキラボーダー用（Tailwind 近似 + CSS 変数用ラベル） */
  shimmerFrom: string;
  shimmerTo: string;
  glowRgb: string;
}

/** 生まれた「日」からバースデーナンバー（1〜9, 11, 22） */
export function calcBirthdayNumber(day: number): number {
  if (day < 1 || day > 31) return 1;
  if (day === 11 || day === 22) return day;
  let num = day;
  while (num > 9) {
    num = String(num)
      .split("")
      .reduce((sum, d) => sum + parseInt(d, 10), 0);
    if (num === 11 || num === 22) break;
  }
  return num;
}

export const ELEMENT_DATA: Record<number, DinosaurElement> = {
  1: {
    number: 1,
    name: "炎",
    key: "fire",
    emoji: "🔥",
    bgGradient: "from-red-600 via-orange-500 to-amber-400",
    bgImage: "/dinosaur/elements/fire.webp",
    talent: "情熱的・先駆者・行動力",
    description:
      "火山みたいにパワフルな炎のエネルギー。まっすぐに突き進む勇気と、みんなを元気にする熱さを持ってるよ。",
    strengths: ["いちばんに動ける", "周りをあたためる", "チャレンジがだいすき"],
    advice: "ときには立ち止まって、水を飲むのも忘れないでね。",
    statBonus: { attack: 2, speed: 1 },
    shimmerFrom: "#f97316",
    shimmerTo: "#ef4444",
    glowRgb: "249, 115, 22",
  },
  2: {
    number: 2,
    name: "水",
    key: "water",
    emoji: "💧",
    bgGradient: "from-sky-600 via-blue-500 to-cyan-400",
    bgImage: "/dinosaur/elements/water.webp",
    talent: "柔軟・共感力・協調性",
    description:
      "海や川のように、周りの形にそって流れるやさしさ。人の気持ちにそっと寄り添える才能があるよ。",
    strengths: ["ちゃんと聞ける", "ムードメーカー", "チームをまとめる"],
    advice: "自分の気持ちも、ちゃんと言葉にしてあげようね。",
    statBonus: { defense: 1, kindness: 2 },
    shimmerFrom: "#38bdf8",
    shimmerTo: "#2563eb",
    glowRgb: "56, 189, 248",
  },
  3: {
    number: 3,
    name: "風",
    key: "wind",
    emoji: "🌪️",
    bgGradient: "from-emerald-400 via-teal-400 to-sky-300",
    bgImage: "/dinosaur/elements/wind.webp",
    talent: "表現力・社交的・自由",
    description:
      "高原の風みたいに、軽やかで自由。おもしろい話やアイデアで、場の空気をふわっと変えられるよ。",
    strengths: ["おしゃべりが上手", "アイデアがわく", "フレンドリー"],
    advice: "一つのことに、じっくり向き合う時間も大切だよ。",
    statBonus: { speed: 2, intelligence: 1 },
    shimmerFrom: "#34d399",
    shimmerTo: "#e2e8f0",
    glowRgb: "52, 211, 153",
  },
  4: {
    number: 4,
    name: "大地",
    key: "earth",
    emoji: "🪨",
    bgGradient: "from-amber-800 via-yellow-700 to-amber-600",
    bgImage: "/dinosaur/elements/earth.webp",
    talent: "堅実・忍耐力・安定感",
    description:
      "どっしりとした大地のように、コツコツ積み上げる力が強いよ。約束を守る、信頼される存在になれる。",
    strengths: ["まじめにやりぬける", "だいじにする", "計画がたてられる"],
    advice: "たまには予定外の楽しさも、一緒に入れてみよう。",
    statBonus: { defense: 2, luck: 1 },
    shimmerFrom: "#b45309",
    shimmerTo: "#fbbf24",
    glowRgb: "180, 83, 9",
  },
  5: {
    number: 5,
    name: "雷",
    key: "thunder",
    emoji: "⚡",
    bgGradient: "from-violet-600 via-indigo-500 to-yellow-300",
    bgImage: "/dinosaur/elements/thunder.webp",
    talent: "変化を好む・冒険・直感",
    description:
      "嵐のあとのキラメキみたいに、ふいにチャンスがきたりするタイプ。直感で動くと、いいことがおこりやすいよ。",
    strengths: ["すばやく決める", "あたらしいのがすき", "きらめきをつかむ"],
    advice: "周りの声も、ときどき聞いてみようね。",
    statBonus: { speed: 2, attack: 1 },
    shimmerFrom: "#facc15",
    shimmerTo: "#e2e8f0",
    glowRgb: "250, 204, 21",
  },
  6: {
    number: 6,
    name: "森",
    key: "forest",
    emoji: "🌿",
    bgGradient: "from-green-700 via-emerald-600 to-lime-500",
    bgImage: "/dinosaur/elements/forest.webp",
    talent: "守護者・愛情深い・責任感",
    description:
      "深い森がみんなをやさしく包むように、そばで見守るのが上手。だれかの役に立つと、自分もしあわせになれるよ。",
    strengths: ["まもるのがじょうず", "やさしい", "気くばりができる"],
    advice: "自分のための時間も、ちゃんととってね。",
    statBonus: { kindness: 2, defense: 1 },
    shimmerFrom: "#22c55e",
    shimmerTo: "#15803d",
    glowRgb: "34, 197, 94",
  },
  7: {
    number: 7,
    name: "氷",
    key: "ice",
    emoji: "❄️",
    bgGradient: "from-slate-300 via-cyan-200 to-blue-300",
    bgImage: "/dinosaur/elements/ice.webp",
    talent: "分析力・探究心・神秘的",
    description:
      "氷のようにクリアな頭で、じっくり考えられるよ。ひみつやふしぎなことに、目がないかも？",
    strengths: ["よくかんがえる", "こころがしずか", "ひらめきがある"],
    advice: "たまにはあたたかい場所にも、でかけてみよう。",
    statBonus: { intelligence: 2, defense: 1 },
    shimmerFrom: "#e2e8f0",
    shimmerTo: "#38bdf8",
    glowRgb: "125, 211, 252",
  },
  8: {
    number: 8,
    name: "鉄",
    key: "metal",
    emoji: "⚙️",
    bgGradient: "from-zinc-600 via-slate-500 to-gray-400",
    bgImage: "/dinosaur/elements/metal.webp",
    talent: "統率力・野心・パワー",
    description:
      "かたい鉄のように、ゴールに向かってグイッと進める力。リーダーになったり、目標を達成したりするのが得意だよ。",
    strengths: ["リードできる", "ねばり強い", "かっこいい"],
    advice: "やわらかい言葉も、ときどきつかおうね。",
    statBonus: { attack: 1, intelligence: 1, luck: 1 },
    shimmerFrom: "#94a3b8",
    shimmerTo: "#475569",
    glowRgb: "148, 163, 184",
  },
  9: {
    number: 9,
    name: "光",
    key: "light",
    emoji: "✨",
    bgGradient: "from-yellow-300 via-amber-200 to-orange-200",
    bgImage: "/dinosaur/elements/light.webp",
    talent: "慈悲深い・理想主義・万能",
    description:
      "朝の光みたいに、みんなをあたためるやさしさ。理想を信じて、世界をちょっとずつ明るくできるよ。",
    strengths: ["ひろいこころ", "ゆめがおおきい", "だれにでもやさしい"],
    advice: "自分のことも、ちゃんと大事にしてね。",
    statBonus: { kindness: 1, luck: 2 },
    shimmerFrom: "#fde047",
    shimmerTo: "#fb923c",
    glowRgb: "253, 224, 71",
  },
  11: {
    number: 11,
    name: "星",
    key: "star",
    emoji: "⭐",
    bgGradient: "from-indigo-900 via-violet-700 to-purple-500",
    bgImage: "/dinosaur/elements/star.webp",
    talent: "直感・霊感・インスピレーション",
    description:
      "夜空の星みたいに、キラリとひらめくセンス。言葉にしにくい「なんとなく」を大切にすると、道がひらけるよ。",
    strengths: ["ピンとくる", "かんがえがふかい", "ユニーク"],
    advice: "たまには足もつけて、地上を歩こうね。",
    statBonus: { intelligence: 2, luck: 1 },
    shimmerFrom: "#a78bfa",
    shimmerTo: "#312e81",
    glowRgb: "167, 139, 250",
  },
  22: {
    number: 22,
    name: "虹",
    key: "rainbow",
    emoji: "🌈",
    bgGradient: "from-pink-400 via-violet-400 to-cyan-400",
    bgImage: "/dinosaur/elements/rainbow.webp",
    talent: "壮大なビジョン・カリスマ",
    description:
      "虹みたいに、いろんな色をつなげて大きな夢を描けるよ。みんなをまとめて、すごいことを成し遂げる力がある。",
    strengths: ["ゆめがおおきい", "みんなをひきつける", "がんばりや"],
    advice: "小さな一歩も、ちゃんとほめてあげよう。",
    statBonus: { luck: 2, kindness: 1 },
    shimmerFrom: "#f472b6",
    shimmerTo: "#22d3ee",
    glowRgb: "244, 114, 182",
  },
};

const E_IDX: Record<number, number> = {
  1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 11: 9, 22: 10,
};

/** 属性同士の相性スコア（1〜5）対称行列。説明は getElementCompatibility で生成 */
const EL_SCORE: number[][] = [
  [5, 4, 3, 3, 4, 3, 2, 3, 4, 4, 4],
  [4, 5, 4, 4, 2, 4, 3, 2, 4, 3, 3],
  [3, 4, 5, 3, 4, 3, 3, 2, 4, 4, 4],
  [3, 4, 3, 5, 3, 4, 3, 4, 3, 3, 4],
  [4, 2, 4, 3, 5, 2, 3, 3, 4, 3, 4],
  [3, 4, 3, 4, 2, 5, 3, 2, 4, 3, 4],
  [2, 3, 3, 3, 3, 3, 5, 3, 3, 4, 3],
  [3, 2, 2, 4, 3, 2, 3, 5, 3, 3, 4],
  [4, 4, 4, 3, 4, 4, 3, 3, 5, 4, 4],
  [4, 3, 4, 3, 3, 3, 4, 3, 4, 5, 4],
  [4, 3, 4, 4, 4, 4, 3, 4, 4, 4, 5],
];

export function getElementCompatibility(
  birthdayNumA: number,
  birthdayNumB: number
): { score: number; description: string } {
  const ia = E_IDX[birthdayNumA];
  const ib = E_IDX[birthdayNumB];
  if (ia === undefined || ib === undefined) {
    return {
      score: 3,
      description: "ふたりの属性は、それぞれ特別なキラメキを持ってるよ。ちがいを楽しんでね。",
    };
  }
  const score = EL_SCORE[ia][ib];
  const ea = ELEMENT_DATA[birthdayNumA]?.name ?? "?";
  const eb = ELEMENT_DATA[birthdayNumB]?.name ?? "?";
  const templates: Record<number, string> = {
    5: `${ea}と${eb}のエネルギーが、とてもよく合うよ！お互いのいいところを、大きく伸ばし合える。`,
    4: `${ea}と${eb}は、バランスのいい組み合わせ。ちがいをほめあえると、もっとラクになるよ。`,
    3: `${ea}と${eb}は、ちょっとクセがちがうけど、それがおもしろい関係になれるよ。`,
    2: `${ea}と${eb}は、テンポがちがうこともあるかも。ゆっくり話す時間を、大事にしよう。`,
    1: `${ea}と${eb}は、正反対みたいに見えることも。でも、だからこそ新しい発見があるよ。`,
  };
  return { score, description: templates[score] ?? templates[3]! };
}

/** 恐竜タイプ番号の並び（カードNo.用） */
export const DINOSAUR_CARD_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

/** 1〜132 のカード番号 */
export function getDinosaurCardNumber(lifePathNum: number, birthdayNum: number): number {
  const di = DINOSAUR_CARD_ORDER.indexOf(lifePathNum as (typeof DINOSAUR_CARD_ORDER)[number]);
  const ei = ELEMENT_NUMBERS.indexOf(birthdayNum as ElementNumber);
  if (di < 0 || ei < 0) return 0;
  return di * 11 + ei + 1;
}

export function mergeDinosaurStats(
  base: DinosaurStats,
  bonus: Partial<DinosaurStats>
): DinosaurStats {
  const keys: (keyof DinosaurStats)[] = [
    "attack",
    "defense",
    "speed",
    "intelligence",
    "kindness",
    "luck",
  ];
  const out = { ...base };
  for (const k of keys) {
    const v = (out[k] ?? 5) + (bonus[k] ?? 0);
    out[k] = Math.min(10, Math.max(1, v));
  }
  return out;
}

export function emptyDinosaurStats(fill = 5): DinosaurStats {
  return {
    attack: fill,
    defense: fill,
    speed: fill,
    intelligence: fill,
    kindness: fill,
    luck: fill,
  };
}

/** 総合相性（1〜5）：恐竜70% + 属性30% */
export function combineCompatibilityScores(dinoScore: number, elementScore: number): number {
  const raw = 0.7 * dinoScore + 0.3 * elementScore;
  return Math.min(5, Math.max(1, Math.round(raw)));
}

/** 恐竜名 × 属性の一言 */
export function getDinoElementComboLine(dinoName: string, el: DinosaurElement): string {
  return `${el.name}のエネルギーをまとった${dinoName}だよ。${el.talent}の才能が、恐竜タイプの性格とミックスして、キミだけのスタイルになってる！`;
}
