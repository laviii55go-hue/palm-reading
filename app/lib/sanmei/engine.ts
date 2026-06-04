// ─── 算命学 鑑定エンジン ─────────────────────────────────
// 暦計算は calendar.ts、鑑定文データは app/data/sanmeiTextData.ts に分離。
// （将来の Android アプリ化時にこの2ファイル＋calendar.ts をそのまま移植する想定）

import {
  fourPillars,
  dayPillar as calcDayPillar,
  type FourPillars,
  type Pillar,
  STEMS,
  BRANCHES,
} from "./calendar";
import type {
  MainStarName,
  SubStarName,
  EnergyBand,
  TenchusatsuGroup,
} from "../../data/sanmeiTextData";
import { TYPE_NAMES, SUB_STARS } from "../../data/sanmeiTextData";

// ── 五行・陰陽 ────────────────────────────────────────

// 干 index（甲0..癸9）→ 五行（0木 1火 2土 3金 4水）
const STEM_ELEMENT = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4];
// 干 index → 陽(true)/陰(false)
const STEM_YANG = [true, false, true, false, true, false, true, false, true, false];

// ── 十大主星（日干 × 対象干） ─────────────────────────

export function mainStar(dayStemIndex: number, targetStemIndex: number): MainStarName {
  const de = STEM_ELEMENT[dayStemIndex];
  const te = STEM_ELEMENT[targetStemIndex];
  const samePolarity = STEM_YANG[dayStemIndex] === STEM_YANG[targetStemIndex];

  if (te === de) return samePolarity ? "貫索星" : "石門星";          // 比肩 / 劫財
  if (te === (de + 1) % 5) return samePolarity ? "鳳閣星" : "調舒星"; // 食神 / 傷官（日干が生む）
  if (te === (de + 2) % 5) return samePolarity ? "禄存星" : "司禄星"; // 偏財 / 正財（日干が剋す）
  if (te === (de + 3) % 5) return samePolarity ? "車騎星" : "牽牛星"; // 偏官 / 正官（日干を剋す）
  return samePolarity ? "龍高星" : "玉堂星";                          // 偏印 / 印綬（日干を生む）
}

// ── 十二大従星（日干 × 対象支） ────────────────────────

// 十二運の並び（長生から）
const JUNI_UN_SUB_STARS: SubStarName[] = [
  "天貴星", // 長生
  "天恍星", // 沐浴
  "天南星", // 冠帯
  "天禄星", // 建禄
  "天将星", // 帝旺
  "天堂星", // 衰
  "天胡星", // 病
  "天極星", // 死
  "天庫星", // 墓
  "天馳星", // 絶
  "天報星", // 胎
  "天印星", // 養
];

// 各干の長生の支（陽干＝順行、陰干＝逆行）
const CHOSEI_BRANCH = [11, 6, 2, 9, 2, 9, 5, 0, 8, 3];
// 甲:亥(11) 乙:午(6) 丙:寅(2) 丁:酉(9) 戊:寅(2) 己:酉(9) 庚:巳(5) 辛:子(0) 壬:申(8) 癸:卯(3)

export function subStar(dayStemIndex: number, targetBranchIndex: number): SubStarName {
  const start = CHOSEI_BRANCH[dayStemIndex];
  const yang = STEM_YANG[dayStemIndex];
  const pos = yang
    ? (targetBranchIndex - start + 12) % 12
    : (start - targetBranchIndex + 12) % 12;
  return JUNI_UN_SUB_STARS[pos];
}

// ── 蔵干（算命学式・二十八元） ─────────────────────────
// thresholds: [日数上限, 干index] を順に評価（節入り日を1日目とする経過日数）
// 出典: 算命学アカデミーオンライン系の蔵干表（⚠️四柱推命の月律分野表とは日数配分が異なる）

type HiddenStemRule = { upTo: number; stemIndex: number }[];

const HIDDEN_STEMS: HiddenStemRule[] = [
  /* 子 */ [{ upTo: 99, stemIndex: 9 }],                                                  // 癸
  /* 丑 */ [{ upTo: 9, stemIndex: 9 }, { upTo: 12, stemIndex: 7 }, { upTo: 99, stemIndex: 5 }], // 癸辛己
  /* 寅 */ [{ upTo: 7, stemIndex: 4 }, { upTo: 14, stemIndex: 2 }, { upTo: 99, stemIndex: 0 }], // 戊丙甲
  /* 卯 */ [{ upTo: 99, stemIndex: 1 }],                                                  // 乙
  /* 辰 */ [{ upTo: 9, stemIndex: 1 }, { upTo: 12, stemIndex: 9 }, { upTo: 99, stemIndex: 4 }], // 乙癸戊
  /* 巳 */ [{ upTo: 5, stemIndex: 4 }, { upTo: 14, stemIndex: 6 }, { upTo: 99, stemIndex: 2 }], // 戊庚丙
  /* 午 */ [{ upTo: 19, stemIndex: 5 }, { upTo: 99, stemIndex: 3 }],                      // 己丁
  /* 未 */ [{ upTo: 9, stemIndex: 3 }, { upTo: 12, stemIndex: 1 }, { upTo: 99, stemIndex: 5 }], // 丁乙己
  /* 申 */ [{ upTo: 10, stemIndex: 4 }, { upTo: 13, stemIndex: 8 }, { upTo: 99, stemIndex: 6 }], // 戊壬庚
  /* 酉 */ [{ upTo: 99, stemIndex: 7 }],                                                  // 辛
  /* 戌 */ [{ upTo: 9, stemIndex: 7 }, { upTo: 12, stemIndex: 3 }, { upTo: 99, stemIndex: 4 }], // 辛丁戊
  /* 亥 */ [{ upTo: 12, stemIndex: 0 }, { upTo: 99, stemIndex: 8 }],                      // 甲壬
];

/** 蔵干（経過日数による深浅） */
export function hiddenStemByDay(branchIndex: number, dayOfTerm: number): number {
  const rules = HIDDEN_STEMS[branchIndex];
  for (const r of rules) {
    if (dayOfTerm <= r.upTo) return r.stemIndex;
  }
  return rules[rules.length - 1].stemIndex;
}

/** 蔵干（本元のみ） */
export function hiddenStemMain(branchIndex: number): number {
  const rules = HIDDEN_STEMS[branchIndex];
  return rules[rules.length - 1].stemIndex;
}

// ── 人体星図（陽占） ──────────────────────────────────
// 位置対応は3ソース一致＋計算実例で確定（2026-06-04 verify）：
//   頭(北)=年干／腹(南)=月干／左手(東)=年支蔵干(本元)／胸(中央)=月支蔵干(経過日数)／右手(西)=日支蔵干(本元)
//   出典: ameblo.jp/arion0000/entry-12734463253.html（規則＋実例）/ kantei-yui.com / cocoloni.me
//   ⚠️ 年支・日支の蔵干は「本元固定」が多数派運用（流派差あり）→ hiddenDepth: "main"

export type JintaiSource =
  | "yearStem"
  | "monthStem"
  | "yearBranchHidden"
  | "monthBranchHidden"
  | "dayBranchHidden";

export type JintaiConfig = {
  head: JintaiSource;
  chest: JintaiSource;
  belly: JintaiSource;
  rightHand: JintaiSource;
  leftHand: JintaiSource;
  /** 蔵干の深浅: "byDay"=経過日数適用 / "main"=本元固定（月支以外に適用） */
  hiddenDepth: "byDay" | "main";
};

export const DEFAULT_JINTAI_CONFIG: JintaiConfig = {
  head: "yearStem",
  chest: "monthBranchHidden",
  belly: "monthStem",
  rightHand: "dayBranchHidden",
  leftHand: "yearBranchHidden",
  hiddenDepth: "main",
};

function resolveSourceStem(src: JintaiSource, fp: FourPillars, depth: "byDay" | "main"): number {
  switch (src) {
    case "yearStem":
      return fp.year.stemIndex;
    case "monthStem":
      return fp.month.stemIndex;
    case "yearBranchHidden":
      return depth === "byDay"
        ? hiddenStemByDay(fp.year.branchIndex, fp.dayOfTerm)
        : hiddenStemMain(fp.year.branchIndex);
    case "monthBranchHidden":
      // 月支（元命）は経過日数で深浅を取るのが標準
      return hiddenStemByDay(fp.month.branchIndex, fp.dayOfTerm);
    case "dayBranchHidden":
      return depth === "byDay"
        ? hiddenStemByDay(fp.day.branchIndex, fp.dayOfTerm)
        : hiddenStemMain(fp.day.branchIndex);
  }
}

export type JintaiMap = {
  head: MainStarName;
  chest: MainStarName;
  belly: MainStarName;
  rightHand: MainStarName;
  leftHand: MainStarName;
};

export function jintaiMap(fp: FourPillars, config: JintaiConfig = DEFAULT_JINTAI_CONFIG): JintaiMap {
  const d = fp.day.stemIndex;
  const get = (src: JintaiSource) => mainStar(d, resolveSourceStem(src, fp, config.hiddenDepth));
  return {
    head: get(config.head),
    chest: get(config.chest),
    belly: get(config.belly),
    rightHand: get(config.rightHand),
    leftHand: get(config.leftHand),
  };
}

// ── 十二大従星（初年・中年・晩年） ──────────────────────

export type JuseiMap = {
  early: SubStarName;   // 初年期: 日干 × 年支
  middle: SubStarName;  // 中年期: 日干 × 月支
  late: SubStarName;    // 晩年期: 日干 × 日支
};

export function juseiMap(fp: FourPillars): JuseiMap {
  const d = fp.day.stemIndex;
  return {
    early: subStar(d, fp.year.branchIndex),
    middle: subStar(d, fp.month.branchIndex),
    late: subStar(d, fp.day.branchIndex),
  };
}

// ── エネルギー点数・身弱身中身強 ─────────────────────────
// ⚠️ 閾値は流派差あり（合計9以下=身弱/28以上=身強とする説、本実装は壁打ちサンプル
//    のレンジ（13=身弱・15/21=身中・25=身強）に整合する閾値を採用）

export const ENERGY_THRESHOLDS = { weakMax: 14, strongMin: 24 };

export function energyBandOf(total: number): EnergyBand {
  if (total <= ENERGY_THRESHOLDS.weakMax) return "weak";
  if (total >= ENERGY_THRESHOLDS.strongMin) return "strong";
  return "middle";
}

// ── 天中殺 ────────────────────────────────────────────

const TENCHUSATSU_GROUPS: TenchusatsuGroup[] = ["戌亥", "申酉", "午未", "辰巳", "寅卯", "子丑"];

/** 日柱の六十干支 index から宿命天中殺グループを求める */
export function tenchusatsuOf(dayIndex60: number): TenchusatsuGroup {
  return TENCHUSATSU_GROUPS[Math.floor(dayIndex60 / 10)];
}

/** 支がそのグループに含まれるか（年運・月運・日運の天中殺判定） */
export function branchInTenchusatsu(branchIndex: number, group: TenchusatsuGroup): boolean {
  const branch = BRANCHES[branchIndex];
  return group.includes(branch);
}

// 天中殺グループ → 該当する年支 index（連続する2支）
const TENCHUSATSU_BRANCH_INDEXES: Record<TenchusatsuGroup, [number, number]> = {
  子丑: [0, 1],
  寅卯: [2, 3],
  辰巳: [4, 5],
  午未: [6, 7],
  申酉: [8, 9],
  戌亥: [10, 11],
};

export type TenchusatsuYears = {
  startYear: number; // 天中殺2年間の開始年（立春区切り）
  endYear: number;   // 終了年
  isNow: boolean;    // 現在が天中殺期間中か
};

/** 次に来る（または現在進行中の）天中殺の年を求める。currentSanmeiYear は立春区切りの年 */
export function nextTenchusatsuYears(group: TenchusatsuGroup, currentSanmeiYear: number): TenchusatsuYears {
  const [first, second] = TENCHUSATSU_BRANCH_INDEXES[group];
  const branchOf = (y: number) => (((y - 4) % 12) + 12) % 12;
  const cur = branchOf(currentSanmeiYear);
  if (cur === first) return { startYear: currentSanmeiYear, endYear: currentSanmeiYear + 1, isNow: true };
  if (cur === second) return { startYear: currentSanmeiYear - 1, endYear: currentSanmeiYear, isNow: true };
  let y = currentSanmeiYear + 1;
  while (branchOf(y) !== first) y++;
  return { startYear: y, endYear: y + 1, isNow: false };
}

// ── 鑑定結果（本人） ──────────────────────────────────

export type SanmeiResult = {
  pillars: FourPillars;
  jintai: JintaiMap;
  jusei: JuseiMap;
  juseiPoints: { early: number; middle: number; late: number };
  energyTotal: number;
  energyBand: EnergyBand;
  dominantStar: MainStarName;
  typeName: string;
  tenchusatsu: TenchusatsuGroup;
};

export function calcSanmei(
  year: number,
  month: number,
  day: number,
  config: JintaiConfig = DEFAULT_JINTAI_CONFIG
): SanmeiResult {
  const fp = fourPillars(year, month, day);
  const jintai = jintaiMap(fp, config);
  const jusei = juseiMap(fp);
  const points = {
    early: SUB_STARS[jusei.early].points,
    middle: SUB_STARS[jusei.middle].points,
    late: SUB_STARS[jusei.late].points,
  };
  const energyTotal = points.early + points.middle + points.late;
  const energyBand = energyBandOf(energyTotal);

  // タイプ名: 人体星図で最も多い主星（同数なら胸を優先）× エネルギー帯
  const stars: MainStarName[] = [jintai.head, jintai.chest, jintai.belly, jintai.rightHand, jintai.leftHand];
  const counts = new Map<MainStarName, number>();
  for (const s of stars) counts.set(s, (counts.get(s) ?? 0) + 1);
  let dominantStar = jintai.chest;
  let max = counts.get(jintai.chest) ?? 0;
  for (const [s, c] of counts) {
    if (c > max) {
      dominantStar = s;
      max = c;
    }
  }
  const typeName = TYPE_NAMES[dominantStar][energyBand];

  return {
    pillars: fp,
    jintai,
    jusei,
    juseiPoints: points,
    energyTotal,
    energyBand,
    dominantStar,
    typeName,
    tenchusatsu: tenchusatsuOf(fp.day.index60),
  };
}

// ── 後天運（年運・月運・日運） ──────────────────────────

export type PeriodFortune = {
  pillar: Pillar;
  mainStar: MainStarName;   // 日干 × その期間の干
  subStar: SubStarName;     // 日干 × その期間の支
  isTenchusatsu: boolean;
};

export type FortuneNow = {
  year: PeriodFortune;
  month: PeriodFortune;
  day: PeriodFortune;
};

export function calcFortune(
  birth: { year: number; month: number; day: number },
  current: { year: number; month: number; day: number }
): FortuneNow {
  const birthDay = calcDayPillar(birth.year, birth.month, birth.day);
  const d = birthDay.stemIndex;
  const group = tenchusatsuOf(birthDay.index60);

  const nowFp = fourPillars(current.year, current.month, current.day);

  const periodOf = (p: Pillar): PeriodFortune => ({
    pillar: p,
    mainStar: mainStar(d, p.stemIndex),
    subStar: subStar(d, p.branchIndex),
    isTenchusatsu: branchInTenchusatsu(p.branchIndex, group),
  });

  return {
    year: periodOf(nowFp.year),
    month: periodOf(nowFp.month),
    day: periodOf(nowFp.day),
  };
}

export { STEMS, BRANCHES };
export type { FourPillars, Pillar };
