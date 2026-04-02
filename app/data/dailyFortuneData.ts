// ─── 今日の運勢 データ ─────────────────────────────────────────

import {
  Body,
  Ecliptic,
  EclipticGeoMoon,
  GeoVector,
  SunPosition,
} from "astronomy-engine";

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
  year: number,
  month: number,
  day: number,
  birthMonth: number,
  birthDay: number
) {
  const seed = getDateSeed(year, month, day);
  const sign = getZodiacSign(birthMonth, birthDay);
  // 星座ごとに運勢を変える：日付シードに星座IDを加算
  const zodiacSeed = seed + sign.id * 100000;
  const love = FORTUNE_PATTERNS.love[seededIndex(zodiacSeed, FORTUNE_PATTERNS.love.length)];
  const money = FORTUNE_PATTERNS.money[seededIndex(zodiacSeed + 1, FORTUNE_PATTERNS.money.length)];
  const work = FORTUNE_PATTERNS.work[seededIndex(zodiacSeed + 2, FORTUNE_PATTERNS.work.length)];
  const total = FORTUNE_PATTERNS.total[seededIndex(zodiacSeed + 3, FORTUNE_PATTERNS.total.length)];
  return { type: "zodiac" as const, sign, love, money, work, total };
}

// ランキング用の一言アドバイス（充実版）
const PLANET_NAMES = ["太陽", "月", "水星", "金星", "火星", "木星", "土星"] as const;

// 順位別アドバイス（1位・2-3位・4-6位・7-12位）
const ADVICE_BY_RANK = {
  top: [
    "今日はトップの運気。新しい挑戦に最適な一日",
    "天体のエネルギーが集中。思い切った行動が吉",
    "運気が最高潮。大切な決断やアピールに",
    "チャンスの波に乗って。積極的に動いて",
    "今日の流れを味方に。リーダーシップを発揮して",
    "好機到来。直感を信じて一歩踏み出して",
  ],
  upper: [
    "好調な一日。無理のない範囲で前進を",
    "運気上昇中。小さなチャンスを見逃さずに",
    "調子に乗りすぎず、着実に進めて",
    "人との協力が運を呼ぶ。繋がりを大切に",
    "穏やかな勢い。焦らず丁寧に過ごして",
    "良い流れが来ている。感謝の気持ちで",
  ],
  middle: [
    "安定した一日。普段のペースで過ごして",
    "無理せずリフレッシュ。心身を整える日に",
    "小さな幸せを感じて。日常を丁寧に",
    "焦らずゆっくりと。自分を労わる一日に",
    "人との繋がりを大切に。穏やかに過ごして",
    "前向きな気持ちで。できることからコツコツと",
  ],
  lower: [
    "落ち着いて過ごすのが吉。無理は禁物",
    "静かな一日。内省や準備に充てて",
    "焦らず今できることを。明日に備えて",
    "穏やかに。心身の休息を心がけて",
    "小さな一歩でOK。自分を責めずに",
    "流れに任せて。リラックスして過ごして",
  ],
} as const;

// 天体滞在時の補足フレーズ
const PLANET_ADVICE: Record<string, string[]> = {
  太陽: ["活力が満ちる", "自我が輝く", "リーダーシップ発揮のチャンス"],
  月: ["感情が豊かに", "直感が冴える", "心が落ち着く"],
  水星: ["コミュニケーション運アップ", "アイデアが浮かぶ", "学びのチャンス"],
  金星: ["恋愛・調和に恵まれる", "美意識が高まる", "人気運上昇"],
  火星: ["行動力が高まる", "情熱を注げる", "決断のタイミング"],
  木星: ["幸運の波が来る", "拡大・成長のチャンス", "楽観的に"],
  土星: ["着実に積み上げる", "責任感が強まる", "忍耐が実を結ぶ"],
};

// 黄経（0〜360度）を星座ID（0=牡羊座〜11=魚座）に変換
function longitudeToSignIndex(lon: number): number {
  return Math.floor((lon % 360) / 30) % 12;
}

// 同スコア時の日替わりタイブレーカー用ハッシュ
function tiebreaker(seed: number, signId: number): number {
  const x = Math.sin((seed + 1) * (signId + 1) * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// 西洋占星術トランシットベースの今日の星座運勢ランキング（1位〜12位）
// その日の惑星配置（太陽・月・惑星の黄経）から各星座の運勢スコアを算出
export function getDailyFortuneRanking(year: number, month: number, day: number) {
  // その日の正午UTCで惑星位置を計算（同じ日は同じ結果）
  const date = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));

  // 各天体の黄経を取得（占星術では地球から見た黄道経度を使用）
  const sunLon = SunPosition(date).elon;
  const moonLon = EclipticGeoMoon(date).lon;
  const planetBodies = [
    { body: Body.Mercury, weight: 1 },
    { body: Body.Venus, weight: 2 },
    { body: Body.Mars, weight: 2 },
    { body: Body.Jupiter, weight: 2 },
    { body: Body.Saturn, weight: 1 },
  ] as const;

  const planetLons: number[] = [];
  for (const { body } of planetBodies) {
    const vec = GeoVector(body, date, true);
    const ecl = Ecliptic(vec);
    planetLons.push(ecl.elon);
  }

  // 各星座のスコアを計算（天体がその星座にいるほど加点）
  const weights = [3, 3, 1, 2, 2, 2, 1]; // Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn
  const allLons = [sunLon, moonLon, ...planetLons];

  const baseSeed = getDateSeed(year, month, day);
  const scores = ZODIAC_BOUNDARIES.map((sign) => {
    let score = 0;
    const planetsInSign: string[] = [];
    for (let i = 0; i < allLons.length; i++) {
      if (longitudeToSignIndex(allLons[i]) === sign.id) {
        score += weights[i];
        planetsInSign.push(PLANET_NAMES[i]);
      }
    }
    return { sign, score, planetsInSign };
  });

  // スコア降順、同点は日替わりシャッフルで順位決定
  const seed = getDateSeed(year, month, day);
  scores.sort((a, b) =>
    b.score !== a.score
      ? b.score - a.score
      : tiebreaker(seed, a.sign.id) - tiebreaker(seed, b.sign.id)
  );

  // 順位と天体情報をもとに一言アドバイスを生成
  return scores.map((item, i) => {
    const rank = i + 1;
    const rankTier: keyof typeof ADVICE_BY_RANK =
      rank === 1 ? "top" : rank <= 3 ? "upper" : rank <= 6 ? "middle" : "lower";
    const rankAdvices = ADVICE_BY_RANK[rankTier];
    const rankAdvice = rankAdvices[seededIndex(baseSeed + item.sign.id * 100, rankAdvices.length)];

    let advice: string;
    if (item.planetsInSign.length > 0) {
      const planets = item.planetsInSign.slice(0, 2).join("・");
      const mainPlanet = item.planetsInSign[0];
      const planetPhrases = PLANET_ADVICE[mainPlanet];
      const phrase = planetPhrases
        ? planetPhrases[seededIndex(baseSeed + item.sign.id * 7, planetPhrases.length)]
        : "";
      advice = phrase
        ? `${planets}が滞在。${phrase}。${rankAdvice}`
        : `${planets}が滞在。${rankAdvice}`;
    } else {
      advice = rankAdvice;
    }
    return { rank, ...item, advice };
  });
}
