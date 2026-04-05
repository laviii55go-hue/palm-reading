/**
 * 恐竜バトル — フィールド・競技・計算ロジック
 */

import type { DinosaurStats } from "./dinosaurElementData";

// ===== バトルフィールド定義 =====
export type BattleField = {
  id: string;
  name: string;
  description: string;
  advantageElement: number[];
  disadvantageElement: number[];
  advantageBonus: number;
  disadvantagePenalty: number;
  bgColor: string;
  bgImage?: string;
};

export const BATTLE_FIELDS: BattleField[] = [
  {
    id: "volcano",
    name: "火山",
    description: "灼熱の溶岩が噴き出すフィールド！",
    advantageElement: [1],
    disadvantageElement: [9],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#DC2626",
    bgImage: "/dinosaur/battle/field_volcano.webp",
  },
  {
    id: "glacier",
    name: "氷河",
    description: "凍りついた極寒の大地！",
    advantageElement: [9],
    disadvantageElement: [1],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#3B82F6",
    bgImage: "/dinosaur/battle/field_glacier.webp",
  },
  {
    id: "jungle",
    name: "密林",
    description: "うっそうとしたジャングル！",
    advantageElement: [3],
    disadvantageElement: [7],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#16A34A",
    bgImage: "/dinosaur/battle/field_jungle.webp",
  },
  {
    id: "deepsea",
    name: "深海",
    description: "暗い海の底での戦い！",
    advantageElement: [6],
    disadvantageElement: [5],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#1E3A8A",
    bgImage: "/dinosaur/battle/field_deepsea.webp",
  },
  {
    id: "thundercloud",
    name: "雷雲",
    description: "雷鳴とどろく空中戦！",
    advantageElement: [5],
    disadvantageElement: [6],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#EAB308",
    bgImage: "/dinosaur/battle/field_thundercloud.webp",
  },
  {
    id: "ruins",
    name: "遺跡",
    description: "古代のちからが眠る神殿！",
    advantageElement: [11, 22],
    disadvantageElement: [],
    advantageBonus: 1.2,
    disadvantagePenalty: 1.0,
    bgColor: "#7C3AED",
    bgImage: "/dinosaur/battle/field_ruins.webp",
  },
  {
    id: "mine",
    name: "鉱山",
    description: "鉄鉱石だらけの洞窟！",
    advantageElement: [7],
    disadvantageElement: [3],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#78716C",
    bgImage: "/dinosaur/battle/field_mine.webp",
  },
  {
    id: "wasteland",
    name: "荒野",
    description: "砂嵐の吹く広大な平原！",
    advantageElement: [4],
    disadvantageElement: [8],
    advantageBonus: 1.25,
    disadvantagePenalty: 0.8,
    bgColor: "#D97706",
    bgImage: "/dinosaur/battle/field_wasteland.webp",
  },
];

// ===== 競技（対決方法）定義 =====
export type BattleContest = {
  id: string;
  name: string;
  description: string;
  primaryStat: keyof DinosaurStats;
  randomRange: [number, number];
};

export const BATTLE_CONTESTS: BattleContest[] = [
  {
    id: "power",
    name: "ちからくらべ",
    description: "正面からぶつかる力勝負！",
    primaryStat: "attack",
    randomRange: [0.85, 1.15],
  },
  {
    id: "race",
    name: "かけっこ",
    description: "スピード対決だ！",
    primaryStat: "speed",
    randomRange: [0.85, 1.15],
  },
  {
    id: "guard",
    name: "まもりあい",
    description: "どっちが頑丈か耐久対決！",
    primaryStat: "defense",
    randomRange: [0.85, 1.15],
  },
  {
    id: "brain",
    name: "ちえくらべ",
    description: "頭脳で勝負！",
    primaryStat: "intelligence",
    randomRange: [0.85, 1.15],
  },
  {
    id: "kindness",
    name: "やさしさバトル",
    description: "どっちがやさしいか対決！",
    primaryStat: "kindness",
    randomRange: [0.85, 1.15],
  },
  {
    id: "luck",
    name: "うんだめし",
    description: "運だけで決まる！何が起きるかわからない！",
    primaryStat: "luck",
    randomRange: [0.5, 1.5],
  },
];

// ===== バトル計算（詳細版） =====
export type BattleScoreDetail = {
  totalScore: number;
  baseStat: number;
  fieldMultiplier: number;
  randomMultiplier: number;
  fieldEffect: "advantage" | "disadvantage" | "neutral";
};

export function calculateBattleScoreDetailed(
  stats: DinosaurStats,
  elementNumber: number,
  field: BattleField,
  contest: BattleContest
): BattleScoreDetail {
  const baseStat = stats[contest.primaryStat];

  let fieldMultiplier = 1.0;
  let fieldEffect: BattleScoreDetail["fieldEffect"] = "neutral";
  if (field.advantageElement.includes(elementNumber)) {
    fieldMultiplier = field.advantageBonus;
    fieldEffect = "advantage";
  } else if (field.disadvantageElement.includes(elementNumber)) {
    fieldMultiplier = field.disadvantagePenalty;
    fieldEffect = "disadvantage";
  }

  const [min, max] = contest.randomRange;
  const randomMultiplier = min + Math.random() * (max - min);

  return {
    totalScore: baseStat * fieldMultiplier * randomMultiplier,
    baseStat,
    fieldMultiplier,
    randomMultiplier,
    fieldEffect,
  };
}

// ===== 勝因テキスト生成 =====
export function getWinReasonText(
  winnerName: string,
  field: BattleField,
  contest: BattleContest,
  wasAdvantage: boolean
): string {
  if (wasAdvantage) {
    return `${field.name}の地の利を活かした${winnerName}の勝利！`;
  }
  const contestTexts: Record<string, string> = {
    power: `${winnerName}のパワーが上回った！`,
    race: `${winnerName}の足の速さが光った！`,
    guard: `${winnerName}の鉄壁の守りが勝利を呼んだ！`,
    brain: `${winnerName}の頭脳プレーが冴えた！`,
    kindness: `${winnerName}のやさしさが相手の心を動かした！`,
    luck: `運命は${winnerName}に味方した！`,
  };
  return contestTexts[contest.id] || `${winnerName}の勝利！`;
}

// ===== ステータス名の日本語マップ =====
export const STAT_LABEL: Record<keyof DinosaurStats, string> = {
  attack: "ATK",
  defense: "DEF",
  speed: "SPD",
  intelligence: "INT",
  kindness: "KND",
  luck: "LUK",
};

// ===== 詳細勝因テキスト =====
export function getDetailedWinReasonText(
  winnerName: string,
  winnerDetail: BattleScoreDetail,
  loserDetail: BattleScoreDetail,
  field: BattleField,
  contest: BattleContest,
  winnerElementName: string
): string {
  const statName = STAT_LABEL[contest.primaryStat];
  const baseWon = winnerDetail.baseStat >= loserDetail.baseStat;
  const fieldHelped = winnerDetail.fieldEffect === "advantage";
  const fieldHurt = winnerDetail.fieldEffect === "disadvantage";
  const baseWithField = winnerDetail.baseStat * winnerDetail.fieldMultiplier;
  const loserBaseWithField = loserDetail.baseStat * loserDetail.fieldMultiplier;
  const wasLosingBeforeRandom = baseWithField < loserBaseWithField;

  if (contest.id === "luck") {
    return `運命のサイコロが転がった…${winnerName}に女神が微笑んだ！`;
  }
  if (wasLosingBeforeRandom) {
    return `奇跡の逆転！ 運の流れが${winnerName}に味方した！`;
  }
  if (fieldHelped) {
    return `${field.name}は${winnerElementName}属性に有利！地の利を活かした${winnerName}の勝利！`;
  }
  if (fieldHurt && baseWon) {
    return `${field.name}では不利だったのに、${winnerName}の${statName}の高さで押し切った！`;
  }
  if (baseWon) {
    return `${contest.name}では${winnerName}の${statName}が圧倒的だった！`;
  }
  return `${winnerName}の${statName}と運の流れが勝利を引き寄せた！`;
}
