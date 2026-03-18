"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import TopBannerLink from "../components/TopBannerLink";
import RakutenWidget from "../components/RakutenWidget";
import { getDailyTarotCards } from "../data/tarotData";
import type { TarotCard } from "../data/tarotData";

type CardState = { card: TarotCard; isReversed: boolean; flipped: boolean };

const SITE_URL = "https://jade-torte-9b5cde.netlify.app";

function buildShareText(result: CardState): string {
  const pos = result.isReversed ? "逆位置" : "正位置";
  const general = result.isReversed ? result.card.reversed.general : result.card.upright.general;
  return `今日のタロットは【${result.card.name}】${pos}でした！\n✨ ${general}\n\n手のひらの予言者で占ってみて 👉 ${SITE_URL}/tarot`;
}

export default function TarotPage() {
  const [cards, setCards] = useState<CardState[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<CardState | null>(null);

  useEffect(() => {
    const daily = getDailyTarotCards();
    setCards(
      daily.map(({ card, isReversed }) => ({
        card,
        isReversed,
        flipped: false,
      }))
    );
    setSelectedResult(null);
  }, []);

  const handleCardClick = (index: number) => {
    if (!cards || selectedResult) return;
    const target = cards[index];
    setCards((prev) =>
      prev!.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
    setSelectedResult(target);
  };

  const handleReset = () => {
    if (!cards) return;
    setCards(cards.map((c) => ({ ...c, flipped: false })));
    setSelectedResult(null);
  };

  const handleShare = async () => {
    if (!selectedResult) return;
    const text = buildShareText(selectedResult);
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: `今日のタロット【${selectedResult.card.name}】`,
          text,
          url: `${SITE_URL}/tarot`,
        });
      } else {
        await navigator.clipboard.writeText(text);
        alert("結果をコピーしました！");
      }
    } catch (err) {
      if ((err as Error).name !== "AbortError") {
        await navigator.clipboard.writeText(text).catch(() => {});
        alert("結果をコピーしました！");
      }
    }
  };

  if (!cards) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 flex items-center justify-center">
        <p className="text-purple-600 font-medium">読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-between">
            <TopBannerLink />
            <Link href="/tarot-guide" className="text-xs text-purple-600 border border-purple-300 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors">📖 ガイド</Link>
          </div>
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/tarot-top.png"
              alt="タロット占い"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-purple-900 mt-3">
            🎴 タロット3択占い
          </h1>
          <p className="text-purple-600 text-sm mt-1">
            大アルカナ22枚から今日の3枚
          </p>
        </div>

        <div className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-6">
          {!selectedResult ? (
            <>
              <p className="text-center text-purple-700 font-medium text-sm">
                直感で1枚選んでください
              </p>
              <div className="flex justify-center gap-4">
                {cards.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => handleCardClick(i)}
                    className="w-24 h-36 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    {/* カード裏面：ユーザー提供画像 */}
                    <img
                      src="/tarot-back.png"
                      alt="タロットカード"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="space-y-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white">
                  <span className="text-2xl">{selectedResult.card.emoji}</span>
                  <span className="font-bold">
                    {selectedResult.card.name}
                    {selectedResult.isReversed ? "（逆位置）" : "（正位置）"}
                  </span>
                </div>
                <Link
                  href={`/tarot-guide/card/${selectedResult.card.id}`}
                  className="inline-block mt-2 text-xs text-purple-600 hover:underline"
                >
                  📖 このカードの詳細解説を見る
                </Link>
              </div>

              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-purple-50 border border-purple-100">
                  <span className="text-purple-600 font-bold text-sm">✨ 総合運</span>
                  <p className="text-gray-700 text-sm mt-1">
                    {selectedResult.isReversed
                      ? selectedResult.card.reversed.general
                      : selectedResult.card.upright.general}
                  </p>
                </div>
                <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
                  <span className="text-rose-600 font-bold text-sm">💕 恋愛運</span>
                  <p className="text-gray-700 text-sm mt-1">
                    {selectedResult.isReversed
                      ? selectedResult.card.reversed.love
                      : selectedResult.card.upright.love}
                  </p>
                </div>
                <div className="rounded-xl p-4 bg-sky-50 border border-sky-100">
                  <span className="text-sky-600 font-bold text-sm">💼 仕事運</span>
                  <p className="text-gray-700 text-sm mt-1">
                    {selectedResult.isReversed
                      ? selectedResult.card.reversed.work
                      : selectedResult.card.upright.work}
                  </p>
                </div>
                <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
                  <span className="text-amber-600 font-bold text-sm">💡 アドバイス</span>
                  <p className="text-gray-700 text-sm mt-1">
                    {selectedResult.isReversed
                      ? selectedResult.card.reversed.advice
                      : selectedResult.card.upright.advice}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleShare}
                  className="flex-1 py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition-colors flex items-center justify-center gap-2"
                >
                  📤 結果をシェア
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition-colors"
                >
                  もう一度占う
                </button>
              </div>
            </div>
          )}
        </div>

        <AdBanner />
        <RakutenWidget />
      </div>
    </div>
  );
}
