// ─── 開運カレンダー 六曜データ ─────────────────────────────────

// 六曜（簡易計算：2025年1月1日＝先勝を基準に経過日数で算出）
const ROKUYO_ORDER = ["大安", "友引", "先勝", "先負", "赤口", "仏滅"] as const;
const BASE_DATE = new Date(2025, 0, 1); // 2025年1月1日
const BASE_INDEX = 2; // 先勝

export function getRokuyo(year: number, month: number, day: number): string {
  const target = new Date(year, month - 1, day);
  const diffTime = target.getTime() - BASE_DATE.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const index = diffDays >= 0
    ? (diffDays + BASE_INDEX) % 6
    : (6 + ((diffDays + BASE_INDEX) % 6)) % 6;
  return ROKUYO_ORDER[index >= 0 ? index : index + 6];
}

export function getRokuyoStyle(rokuyo: string): { bg: string; text: string; border: string } {
  switch (rokuyo) {
    case "大安": return { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" };
    case "友引": return { bg: "bg-blue-50", text: "text-blue-800", border: "border-blue-200" };
    case "先勝": return { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-200" };
    case "先負": return { bg: "bg-gray-100", text: "text-gray-700", border: "border-gray-200" };
    case "赤口": return { bg: "bg-red-50", text: "text-red-800", border: "border-red-200" };
    case "仏滅": return { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-200" };
    default: return { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" };
  }
}

export const ROKUYO_DESC: Record<string, string> = {
  大安: "大吉。万事に良い日。結婚・契約・開店など最適。",
  友引: "友を引く日。慶事は吉、弔事は凶。",
  先勝: "先んずれば勝つ。午前は吉、午後は凶。",
  先負: "先んずれば負ける。午前は凶、午後は吉。",
  赤口: "凶日。正午のみ吉。",
  仏滅: "大凶。万事に凶。",
};

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month - 1, 1).getDay();
}
