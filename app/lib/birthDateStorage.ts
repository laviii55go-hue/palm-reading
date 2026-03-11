// ─── 生年月日 localStorage（DBなし） ─────────────────────────────

const STORAGE_KEY = "palm-reading-birth-date";

export type SavedBirthDate = {
  year: string;
  month: string;
  day: string;
};

export function getSavedBirthDate(): SavedBirthDate | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as unknown;
    if (
      data &&
      typeof data === "object" &&
      "year" in data &&
      "month" in data &&
      "day" in data
    ) {
      const { year, month, day } = data as Record<string, unknown>;
      return {
        year: String(year ?? ""),
        month: String(month ?? ""),
        day: String(day ?? ""),
      };
    }
  } catch {
    // ignore
  }
  return null;
}

export function saveBirthDate(year: string, month: string, day: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ year, month, day })
    );
  } catch {
    // ignore
  }
}

export function clearSavedBirthDate(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
