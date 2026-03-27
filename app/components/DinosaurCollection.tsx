"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DINOSAUR_DATA } from "../data/dinosaurData";
import { DINOSAUR_CARD_ORDER, ELEMENT_DATA, ELEMENT_NUMBERS, getDinosaurCardNumber } from "../data/dinosaurElementData";
import { clearCollection, getCollection, type CollectionEntry } from "../lib/collectionStorage";

type FilterType = "all" | "discovered" | "undiscovered";

type CardItem = {
  cardNo: number;
  dinoNumber: number;
  elementNumber: number;
};

export default function DinosaurCollection({ onBattle }: { onBattle?: () => void } = {}) {
  const [entries, setEntries] = useState<CollectionEntry[]>([]);
  const [filter, setFilter] = useState<FilterType>("all");

  const allCards = useMemo<CardItem[]>(() => {
    const cards: CardItem[] = [];
    for (const dinoNum of DINOSAUR_CARD_ORDER) {
      for (const elementNum of ELEMENT_NUMBERS) {
        cards.push({
          cardNo: getDinosaurCardNumber(dinoNum, elementNum),
          dinoNumber: dinoNum,
          elementNumber: elementNum,
        });
      }
    }
    return cards;
  }, []);

  const entryMap = useMemo(() => new Map(entries.map((e) => [e.cardNo, e])), [entries]);
  const discoveredCount = entries.length;

  useEffect(() => {
    setEntries(getCollection().entries);
  }, []);

  const filteredCards = useMemo(() => {
    if (filter === "all") return allCards;
    return allCards.filter((card) => {
      const isDiscovered = entryMap.has(card.cardNo);
      return filter === "discovered" ? isDiscovered : !isDiscovered;
    });
  }, [allCards, entryMap, filter]);

  const refreshEntries = () => setEntries(getCollection().entries);

  const handleReset = () => {
    if (!window.confirm("図鑑データをすべて削除しますか？\nこの操作は元に戻せません。")) return;
    clearCollection();
    refreshEntries();
  };

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-cyan-200 bg-cyan-50/70 p-4">
        <p className="font-bold text-cyan-900">🦕 恐竜図鑑 {discoveredCount}/132匹 発見！</p>
        <div className="mt-2 h-2 rounded-full bg-cyan-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 transition-all"
            style={{ width: `${(discoveredCount / 132) * 100}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-cyan-800/80">
          ※図鑑データはこの端末のローカルに保存されます。ブラウザのキャッシュ/サイトデータを削除すると消える場合があります。
        </p>
      </div>

      {/* バトルボタン */}
      {onBattle && (
        <button
          onClick={onBattle}
          disabled={discoveredCount < 2}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-base shadow-md hover:from-red-600 hover:to-orange-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {discoveredCount < 2 ? "🦖 2匹以上集めるとバトルできるよ！" : "⚔ バトルする！"}
        </button>
      )}

      <div className="flex gap-2 items-center flex-wrap">
        {[
          { id: "all", label: "すべて" },
          { id: "discovered", label: "発見済み" },
          { id: "undiscovered", label: "未発見" },
        ].map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id as FilterType)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
              filter === f.id
                ? "bg-cyan-600 text-white border-cyan-600"
                : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
            }`}
          >
            {f.label}
          </button>
        ))}
        <Link
          href="/dinosaur-fortune?tab=personal&mode=input"
          className="px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-400 bg-emerald-500 text-white hover:bg-emerald-600 transition-colors"
        >
          🦖 恐竜占いをする
        </Link>
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {filteredCards.map((card) => {
          const entry = entryMap.get(card.cardNo);
          const isDiscovered = !!entry;
          const dino = DINOSAUR_DATA[card.dinoNumber];
          const element = ELEMENT_DATA[card.elementNumber];
          const cardInner = (
            <div
              className={`rounded-xl border p-2 text-left transition-all ${
                isDiscovered
                  ? "border-cyan-200 bg-white hover:shadow-md"
                  : "border-gray-200 bg-gray-100 cursor-default"
              }`}
            >
              <div
                className={`rounded-lg h-20 flex items-center justify-center mb-1 ${
                  isDiscovered ? `bg-gradient-to-br ${element.bgGradient}` : "bg-gray-300"
                }`}
              >
                {dino.image ? (
                  <Image
                    src={dino.image}
                    alt={dino.name}
                    width={56}
                    height={56}
                    className={`object-contain ${isDiscovered ? "" : "brightness-0 opacity-30"}`}
                  />
                ) : (
                  <span className={`text-3xl ${isDiscovered ? "" : "opacity-30"}`}>{dino.emoji}</span>
                )}
              </div>
              <p className={`text-[11px] font-bold leading-tight ${isDiscovered ? "text-gray-700" : "text-gray-500"}`}>
                {isDiscovered ? `${element.name}の${dino.name}` : "？？？"}
              </p>
              {isDiscovered && entry.nickname ? (
                <p className="text-[10px] text-cyan-700 mt-0.5 truncate">{entry.nickname}</p>
              ) : (
                <p className="text-[10px] text-gray-400 mt-0.5"> </p>
              )}
              <p className="text-[10px] text-gray-500 font-mono">No.{String(card.cardNo).padStart(3, "0")}</p>
            </div>
          );
          return isDiscovered ? (
            <Link
              key={card.cardNo}
              href={`/dinosaur-fortune?tab=personal&num=${card.dinoNumber}&bn=${card.elementNumber}&nick=${encodeURIComponent(
                entry?.nickname ?? ""
              )}`}
              className="block"
            >
              {cardInner}
            </Link>
          ) : (
            <div key={card.cardNo}>{cardInner}</div>
          );
        })}
      </div>

      <div className="pt-1">
        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-2 rounded-lg text-xs font-semibold text-red-600 border border-red-200 hover:bg-red-50"
        >
          🗑️ 図鑑リセット
        </button>
      </div>
    </div>
  );
}
