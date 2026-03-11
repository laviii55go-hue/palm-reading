// ─── 今日の運勢 データ ─────────────────────────────────────────

import { calcLifePathNumber } from "./numerologyData";

// 日付からシードを生成（同じ日は同じ結果）
function getDateSeed(year: number, month: number, day: number): number {
  return year * 10000 + month * 100 + day;
}

// シードから擬似ランダムにインデックス（0〜n-1）を取得
function seededIndex(seed: number, n: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return Math.floor(((x - Math.floor(x)) + 1) * n) % n;
}

// 運勢テキストパターン（恋愛・金運・仕事・総合）
const FORTUNE_PATTERNS = {
  love: [
    "今日は出会いのチャンスが訪れる日。新しい出会いや再会に心を開いて。",
    "今日は恋愛運が上昇。気になる人にアプローチするなら絶好のタイミング。",
    "今日はパートナーとの絆が深まる日。素直な気持ちを伝えてみて。",
    "今日は恋愛より自分磨きの日。内面を整えると良い運気が巡ります。",
    "今日は恋愛運が安定。焦らず穏やかに過ごすのが吉。",
    "今日は恋愛運が上昇気味。小さなサプライズが効果的。",
  ],
  money: [
    "今日は金運が良い日。小さな投資や貯金の見直しに良いタイミング。",
    "今日は金運が安定。無駄遣いを避け、着実に貯めるのが吉。",
    "今日は金運が上昇。思わぬ収入やお得な情報に注意。",
    "今日は金運が安定。大きな支出は控えめに。",
    "今日は金運が良い日。お財布の整理や家計の見直しに良い日。",
    "今日は金運が上昇気味。ラッキーアイテムに触れると運気アップ。",
  ],
  work: [
    "今日は仕事運が上昇。新しい企画や提案が好評を得やすい日。",
    "今日は仕事運が安定。コツコツと積み上げる作業が吉。",
    "今日は仕事運が良い日。チームワークや協力が実を結ぶ。",
    "今日は仕事運が安定。焦らず丁寧に進めるのが吉。",
    "今日は仕事運が上昇気味。アピールのチャンスを逃さずに。",
    "今日は仕事運が良い日。人脈が広がる可能性あり。",
  ],
  total: [
    "今日は全体的に運気が良い日。新しいことに挑戦するチャンス。",
    "今日は安定した一日。無理のないペースで過ごすのが吉。",
    "今日は運気が上昇気味。小さな幸せを見逃さずに。",
    "今日は穏やかな一日。心身のリフレッシュを心がけて。",
    "今日は良い流れが来る日。直感を信じて動いてみて。",
    "今日は運気が安定。普段の努力が実を結ぶ日。",
  ],
};

// 星座リスト（境界日：その日から次の星座）
const ZODIAC_BOUNDARIES: { month: number; day: number; name: string; emoji: string; id: number }[] = [
  { id: 10, name: "水瓶座", emoji: "♒", month: 1, day: 20 },
  { id: 11, name: "魚座", emoji: "♓", month: 2, day: 19 },
  { id: 0, name: "牡羊座", emoji: "♈", month: 3, day: 21 },
  { id: 1, name: "牡牛座", emoji: "♉", month: 4, day: 20 },
  { id: 2, name: "双子座", emoji: "♊", month: 5, day: 21 },
  { id: 3, name: "蟹座", emoji: "♋", month: 6, day: 22 },
  { id: 4, name: "獅子座", emoji: "♌", month: 7, day: 23 },
  { id: 5, name: "乙女座", emoji: "♍", month: 8, day: 23 },
  { id: 6, name: "天秤座", emoji: "♎", month: 9, day: 23 },
  { id: 7, name: "蠍座", emoji: "♏", month: 10, day: 24 },
  { id: 8, name: "射手座", emoji: "♐", month: 11, day: 22 },
  { id: 9, name: "山羊座", emoji: "♑", month: 12, day: 22 },
];

export const ZODIAC_SIGNS = ZODIAC_BOUNDARIES;

// 境界値：その星座の開始日を数値化（1月20日=120, 2月19日=219, ... 12月22日=1222）
// 水瓶座(1/20)は 120 とし、2月以降の日付(213など)と比較できるようにする
function toBoundary(b: (typeof ZODIAC_BOUNDARIES)[0]): number {
  return b.month === 1 ? 100 + b.day : b.month * 100 + b.day;
}

// 入力日付を数値化（1/1〜1/19は年跨ぎのため1300+日、1/20〜12/31は通常）
function toDateNum(month: number, day: number): number {
  if (month === 1 && day <= 19) return 1300 + day; // 山羊座期間（12/22〜1/19）
  if (month === 1) return 100 + day;                 // 水瓶座期間（1/20〜1/31）
  return month * 100 + day;
}

export function getZodiacSign(month: number, day: number): (typeof ZODIAC_BOUNDARIES)[0] {
  const d = toDateNum(month, day);
  // 境界値の大きい順にチェックし、d >= boundary となる最初の星座を返す
  const sorted = [...ZODIAC_BOUNDARIES].sort((a, b) => toBoundary(b) - toBoundary(a));
  for (const b of sorted) {
    const boundary = toBoundary(b);
    if (d >= boundary) return b;
  }
  return ZODIAC_BOUNDARIES[11]; // 山羊座（フォールバック）
}

export function getDailyFortune(
  type: "numerology" | "zodiac",
  year: number,
  month: number,
  day: number,
  birthYear?: number,
  birthMonth?: number,
  birthDay?: number
) {
  const seed = getDateSeed(year, month, day);
  const love = FORTUNE_PATTERNS.love[seededIndex(seed, FORTUNE_PATTERNS.love.length)];
  const money = FORTUNE_PATTERNS.money[seededIndex(seed + 1, FORTUNE_PATTERNS.money.length)];
  const work = FORTUNE_PATTERNS.work[seededIndex(seed + 2, FORTUNE_PATTERNS.work.length)];
  const total = FORTUNE_PATTERNS.total[seededIndex(seed + 3, FORTUNE_PATTERNS.total.length)];

  if (type === "numerology" && birthYear != null && birthMonth != null && birthDay != null) {
    const num = calcLifePathNumber(birthYear, birthMonth, birthDay);
    const numStr = num > 9 ? String(num) : String(num);
    return { type: "numerology" as const, num: numStr, love, money, work, total };
  }

  if (type === "zodiac" && birthMonth != null && birthDay != null) {
    const sign = getZodiacSign(birthMonth, birthDay);
    // 星座ごとに運勢を変える：日付シードに星座IDを加算
    const zodiacSeed = seed + sign.id * 100000;
    const zodiacLove = FORTUNE_PATTERNS.love[seededIndex(zodiacSeed, FORTUNE_PATTERNS.love.length)];
    const zodiacMoney = FORTUNE_PATTERNS.money[seededIndex(zodiacSeed + 1, FORTUNE_PATTERNS.money.length)];
    const zodiacWork = FORTUNE_PATTERNS.work[seededIndex(zodiacSeed + 2, FORTUNE_PATTERNS.work.length)];
    const zodiacTotal = FORTUNE_PATTERNS.total[seededIndex(zodiacSeed + 3, FORTUNE_PATTERNS.total.length)];
    return { type: "zodiac" as const, sign, love: zodiacLove, money: zodiacMoney, work: zodiacWork, total: zodiacTotal };
  }

  return { type: "unknown" as const, love, money, work, total };
}

// ランキング用の一言アドバイス
const ADVICE_PATTERNS = [
  "今日は新しい一歩を踏み出して",
  "穏やかに過ごすのが吉",
  "チャンスを逃さずに",
  "無理せずリフレッシュを",
  "直感を信じて動いてみて",
  "人との繋がりを大切に",
  "自分を労わる一日に",
  "小さな幸せを感じて",
  "前向きな気持ちで",
  "焦らずゆっくりと",
  "感謝の気持ちを忘れずに",
  "笑顔で過ごすと運気アップ",
];

// 今日の星座運勢ランキング（1位〜12位、同じ日付なら同じ結果）
export function getDailyFortuneRanking(year: number, month: number, day: number) {
  const baseSeed = getDateSeed(year, month, day);
  const scores = ZODIAC_BOUNDARIES.map((sign) => {
    const signSeed = baseSeed + sign.id * 100000;
    const s = seededIndex(signSeed, 1000) + seededIndex(signSeed + 1, 1000) + seededIndex(signSeed + 2, 1000) + seededIndex(signSeed + 3, 1000);
    const advice = ADVICE_PATTERNS[seededIndex(signSeed + 4, ADVICE_PATTERNS.length)];
    return { sign, score: s, advice };
  });
  scores.sort((a, b) => b.score - a.score);
  return scores.map((item, i) => ({ rank: i + 1, ...item }));
}
