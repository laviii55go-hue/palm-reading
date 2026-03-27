const STORAGE_KEY = "dinosaur-collection";

export type CollectionEntry = {
  cardNo: number;
  dinoNumber: number;
  elementNumber: number;
  dinoName: string;
  elementName: string;
  nickname: string;
  discoveredAt: string;
};

export type Collection = {
  entries: CollectionEntry[];
};

export function getCollection(): Collection {
  if (typeof window === "undefined") return { entries: [] };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { entries: [] };
    return JSON.parse(raw) as Collection;
  } catch {
    return { entries: [] };
  }
}

export function saveToCollection(entry: CollectionEntry): void {
  const col = getCollection();
  const idx = col.entries.findIndex((e) => e.cardNo === entry.cardNo);
  if (idx >= 0) {
    if (entry.nickname && !col.entries[idx].nickname.includes(entry.nickname)) {
      col.entries[idx].nickname = col.entries[idx].nickname
        ? `${col.entries[idx].nickname}、${entry.nickname}`
        : entry.nickname;
    }
    if (!col.entries[idx].discoveredAt) col.entries[idx].discoveredAt = entry.discoveredAt;
  } else {
    col.entries.push(entry);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(col));
}

export function updateNickname(cardNo: number, nickname: string): void {
  const col = getCollection();
  const entry = col.entries.find((e) => e.cardNo === cardNo);
  if (entry) {
    entry.nickname = nickname;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(col));
  }
}

export function getDiscoveredCardNos(): Set<number> {
  const col = getCollection();
  return new Set(col.entries.map((e) => e.cardNo));
}

export function clearCollection(): void {
  localStorage.removeItem(STORAGE_KEY);
}
