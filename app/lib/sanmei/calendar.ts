// ─── 算命学 暦計算（干支・節入り） ─────────────────────────
// 節入り（二十四節気のうち十二節）は固定日でなく太陽黄経の天文計算で求める。
// 太陽黄経の計算は Meeus "Astronomical Algorithms" の低精度式（精度 ~0.001° ≒ 数分）。
// 日干支アンカー: 2000-01-01 = 戊午（六十干支 index 54）
//   ※ 3ソース照合済み（zhouyisuanming.net / ibazi.cn / 60干支循環算術・2026-06-04 verify）

export const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

export type Stem = (typeof STEMS)[number];
export type Branch = (typeof BRANCHES)[number];

export type Pillar = {
  stem: Stem;
  branch: Branch;
  stemIndex: number;    // 甲=0 … 癸=9
  branchIndex: number;  // 子=0 … 亥=11
  index60: number;      // 甲子=0 … 癸亥=59
};

function makePillar(index60: number): Pillar {
  const i = ((index60 % 60) + 60) % 60;
  return {
    stem: STEMS[i % 10],
    branch: BRANCHES[i % 12],
    stemIndex: i % 10,
    branchIndex: i % 12,
    index60: i,
  };
}

export function pillarFromStemBranch(stemIndex: number, branchIndex: number): Pillar {
  // 中国剰余：mod10=stem, mod12=branch を満たす 0..59
  for (let i = 0; i < 60; i++) {
    if (i % 10 === stemIndex && i % 12 === branchIndex) return makePillar(i);
  }
  throw new Error(`invalid stem/branch combination: ${stemIndex}/${branchIndex}`);
}

// ── ユリウス日（グレゴリオ暦・UT基準） ──────────────────

/** 暦日（年月日＋時刻UT）→ ユリウス日 */
export function toJulianDay(year: number, month: number, day: number, hourUT = 0): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return (
    Math.floor(365.25 * (y + 4716)) +
    Math.floor(30.6001 * (m + 1)) +
    day + b - 1524.5 + hourUT / 24
  );
}

/** ユリウス日 → JST の暦日時 */
export function julianDayToJst(jd: number): { year: number; month: number; day: number; hour: number; minute: number } {
  const jdJst = jd + 9 / 24; // UT→JST
  const z = Math.floor(jdJst + 0.5);
  const f = jdJst + 0.5 - z;
  let a = z;
  if (z >= 2299161) {
    const alpha = Math.floor((z - 1867216.25) / 36524.25);
    a = z + 1 + alpha - Math.floor(alpha / 4);
  }
  const b = a + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  const hours = f * 24;
  const hour = Math.floor(hours);
  const minute = Math.floor((hours - hour) * 60);
  return { year, month, day, hour, minute };
}

// ── 太陽黄経（視黄経・度） ──────────────────────────────

export function sunApparentLongitude(jd: number): number {
  const t = (jd - 2451545.0) / 36525;
  const deg2rad = Math.PI / 180;
  const l0 = 280.46646 + 36000.76983 * t + 0.0003032 * t * t;
  const m = 357.52911 + 35999.05029 * t - 0.0001537 * t * t;
  const c =
    (1.914602 - 0.004817 * t - 0.000014 * t * t) * Math.sin(m * deg2rad) +
    (0.019993 - 0.000101 * t) * Math.sin(2 * m * deg2rad) +
    0.000289 * Math.sin(3 * m * deg2rad);
  const trueLong = l0 + c;
  const omega = 125.04 - 1934.136 * t;
  const lambda = trueLong - 0.00569 - 0.00478 * Math.sin(omega * deg2rad);
  return ((lambda % 360) + 360) % 360;
}

/** 目標黄経（度）に到達する時刻（JD）を、近似日付の周辺から二分探索 */
function findSolarTermJd(approxJd: number, targetLongitude: number): number {
  let lo = approxJd - 20;
  let hi = approxJd + 20;
  const diff = (jd: number) => {
    // 黄経差を -180..180 に正規化（360°ラップ対応）
    let d = sunApparentLongitude(jd) - targetLongitude;
    d = ((d % 360) + 540) % 360 - 180;
    return d;
  };
  // lo 側が必ず負（目標到達前）になるよう調整
  while (diff(lo) > 0) lo -= 10;
  while (diff(hi) < 0) hi += 10;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (diff(mid) < 0) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

// ── 十二節（月の区切り）────────────────────────────────
// 月支は寅から：立春→寅月、啓蟄→卯月、…、小寒→丑月

export type SolarTerm = {
  name: string;
  longitude: number;      // 太陽黄経（度）
  monthBranchIndex: number; // この節から始まる月の支
  approxMonth: number;    // 概算月（探索初期値用）
  approxDay: number;
};

export const SOLAR_TERMS: SolarTerm[] = [
  { name: "立春", longitude: 315, monthBranchIndex: 2, approxMonth: 2, approxDay: 4 },
  { name: "啓蟄", longitude: 345, monthBranchIndex: 3, approxMonth: 3, approxDay: 6 },
  { name: "清明", longitude: 15, monthBranchIndex: 4, approxMonth: 4, approxDay: 5 },
  { name: "立夏", longitude: 45, monthBranchIndex: 5, approxMonth: 5, approxDay: 6 },
  { name: "芒種", longitude: 75, monthBranchIndex: 6, approxMonth: 6, approxDay: 6 },
  { name: "小暑", longitude: 105, monthBranchIndex: 7, approxMonth: 7, approxDay: 7 },
  { name: "立秋", longitude: 135, monthBranchIndex: 8, approxMonth: 8, approxDay: 8 },
  { name: "白露", longitude: 165, monthBranchIndex: 9, approxMonth: 9, approxDay: 8 },
  { name: "寒露", longitude: 195, monthBranchIndex: 10, approxMonth: 10, approxDay: 8 },
  { name: "立冬", longitude: 225, monthBranchIndex: 11, approxMonth: 11, approxDay: 7 },
  { name: "大雪", longitude: 255, monthBranchIndex: 0, approxMonth: 12, approxDay: 7 },
  { name: "小寒", longitude: 285, monthBranchIndex: 1, approxMonth: 1, approxDay: 6 },
];

/** 指定した西暦年に起きる節の入り時刻（JD・UT） */
export function solarTermJd(year: number, term: SolarTerm): number {
  const approx = toJulianDay(year, term.approxMonth, term.approxDay, 0);
  return findSolarTermJd(approx, term.longitude);
}

// ── 柱の算出 ──────────────────────────────────────────
// 生まれ時刻不明前提のため、日付は JST 正午（12:00）で代表させる。
// 節入り当日生まれは時刻次第で前後するが、正午代表で日単位判定する。

/** JST の日付 → その日の正午の JD（UT） */
function jstNoonJd(year: number, month: number, day: number): number {
  return toJulianDay(year, month, day, 12 - 9); // JST正午 = UT 3:00
}

/** 年柱（立春区切り） */
export function yearPillar(year: number, month: number, day: number): Pillar {
  const birthJd = jstNoonJd(year, month, day);
  const risshun = solarTermJd(year, SOLAR_TERMS[0]); // その年の立春
  const sanmeiYear = birthJd >= risshun ? year : year - 1;
  return makePillar((((sanmeiYear - 4) % 60) + 60) % 60);
}

// 五虎遁：年干 → 寅月の月干
const TIGER_MONTH_STEM: Record<number, number> = {
  0: 2, 5: 2, // 甲・己 → 丙
  1: 4, 6: 4, // 乙・庚 → 戊
  2: 6, 7: 6, // 丙・辛 → 庚
  3: 8, 8: 8, // 丁・壬 → 壬
  4: 0, 9: 0, // 戊・癸 → 甲
};

export type MonthPillarResult = {
  pillar: Pillar;
  /** 節入りからの経過（節入り日を1日目とする日数。蔵干の深浅判定に使う） */
  dayOfTerm: number;
  termName: string;
};

/** 月柱（十二節区切り）＋節入りからの日数 */
export function monthPillar(year: number, month: number, day: number): MonthPillarResult {
  const birthJd = jstNoonJd(year, month, day);
  // 誕生日以前で最も近い節入りを探す（前年大雪・小寒も候補に含める）
  let best: { jd: number; term: SolarTerm } | null = null;
  for (const term of SOLAR_TERMS) {
    for (const y of [year - 1, year]) {
      const jd = solarTermJd(y, term);
      if (jd <= birthJd && (!best || jd > best.jd)) {
        best = { jd, term };
      }
    }
  }
  if (!best) throw new Error("solar term not found");

  const yp = yearPillar(year, month, day);
  const tigerStem = TIGER_MONTH_STEM[yp.stemIndex];
  const offset = (best.term.monthBranchIndex - 2 + 12) % 12; // 寅月からの月数
  const monthStem = (tigerStem + offset) % 10;
  const pillar = pillarFromStemBranch(monthStem, best.term.monthBranchIndex);

  // 節入り日を1日目とする数え（JST日付ベース）
  const termJst = julianDayToJst(best.jd);
  const termDayJd = jstNoonJd(termJst.year, termJst.month, termJst.day);
  const dayOfTerm = Math.round(birthJd - termDayJd) + 1;

  return { pillar, dayOfTerm, termName: best.term.name };
}

/** 日柱（アンカー: 2000-01-01 = 戊午 = index 54） */
export function dayPillar(year: number, month: number, day: number): Pillar {
  const anchorJd = toJulianDay(2000, 1, 1, 0);
  const targetJd = toJulianDay(year, month, day, 0);
  const diff = Math.round(targetJd - anchorJd);
  return makePillar(54 + diff);
}

export type FourPillars = {
  year: Pillar;
  month: Pillar;
  day: Pillar;
  dayOfTerm: number;  // 節入りから何日目か（1始まり）
  termName: string;
};

export function fourPillars(year: number, month: number, day: number): FourPillars {
  const mp = monthPillar(year, month, day);
  return {
    year: yearPillar(year, month, day),
    month: mp.pillar,
    day: dayPillar(year, month, day),
    dayOfTerm: mp.dayOfTerm,
    termName: mp.termName,
  };
}
