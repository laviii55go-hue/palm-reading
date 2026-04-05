"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import AdBanner from "../../components/AdBanner";
import TopBannerLink from "../../components/TopBannerLink";
import RakutenWidget from "../../components/RakutenWidget";
import Image from "next/image";
import { TAROT_MAJOR_ARCANA, TAROT_CARD_IMAGES, TAROT_BACK_IMAGE } from "../../data/tarotData";
import type { TarotCard } from "../../data/tarotData";
import { TAROT_CARD_SEO } from "../../data/tarotSeoData";

// --- 型定義 ---
type WorkConcernType = "jobChange" | "teamwork" | "finance";

type CardState = {
  card: TarotCard;
  isReversed: boolean;
  flipped: boolean;
};

type SpreadPosition = {
  label: string;
  description: string;
  emoji: string;
};

const SPREAD_POSITIONS: SpreadPosition[] = [
  { label: "現状", description: "今の仕事の状況", emoji: "📍" },
  { label: "課題", description: "乗り越えるべきポイント", emoji: "🔑" },
  { label: "アドバイス", description: "これからの行動指針", emoji: "💡" },
];

const CONCERN_OPTIONS: { id: WorkConcernType; label: string; emoji: string; description: string }[] = [
  { id: "jobChange", label: "転職・キャリア", emoji: "🚀", description: "転職・キャリアチェンジ・スキルアップ" },
  { id: "teamwork", label: "チーム・職場", emoji: "🤝", description: "職場の人間関係・チームワーク" },
  { id: "finance", label: "金運・収入", emoji: "💰", description: "収入アップ・副業・お金の悩み" },
];

const SITE_URL = "https://uranai-tenohira.jp";

// --- ランダム3枚（重複なし） ---
function drawRandomCards(): CardState[] {
  const indices: number[] = [];
  while (indices.length < 3) {
    const idx = Math.floor(Math.random() * TAROT_MAJOR_ARCANA.length);
    if (!indices.includes(idx)) indices.push(idx);
  }
  return indices.map((idx) => ({
    card: TAROT_MAJOR_ARCANA[idx],
    isReversed: Math.random() > 0.5,
    flipped: false,
  }));
}

// --- 総合アドバイス生成 ---
function buildOverallAdvice(cards: CardState[]): string {
  const names = cards.map(
    (c) => `${c.card.name}${c.isReversed ? "(逆位置)" : "(正位置)"}`
  );
  return `${names[0]}が示す現状を踏まえ、${names[1]}が指し示す課題に向き合いながら、${names[2]}のメッセージを行動に移していくことで、仕事運がより良い方向へ動き出すでしょう。焦らず一歩ずつ進んでいきましょう。`;
}

// --- シェアテキスト ---
function buildShareText(cards: CardState[], concern: WorkConcernType): string {
  const concernLabel = CONCERN_OPTIONS.find((c) => c.id === concern)?.label ?? "仕事";
  const cardNames = cards
    .map(
      (c, i) =>
        `${SPREAD_POSITIONS[i].label}:${c.card.name}${c.isReversed ? "(逆)" : "(正)"}`
    )
    .join(" / ");
  return `仕事タロット【${concernLabel}】\n${cardNames}\n\n手のひらの予言者で仕事運を占おう\n${SITE_URL}/tarot/work`;
}

export default function WorkTarotPage() {
  const [concern, setConcern] = useState<WorkConcernType | null>(null);
  const [cards, setCards] = useState<CardState[] | null>(null);
  const [allRevealed, setAllRevealed] = useState(false);

  const handleSelectConcern = (id: WorkConcernType) => {
    setConcern(id);
  };

  const handleDraw = useCallback(() => {
    const drawn = drawRandomCards();
    setCards(drawn);
    setAllRevealed(false);
  }, []);

  const handleFlipCard = useCallback((index: number) => {
    if (!cards || cards[index].flipped) return;
    setCards((prev) =>
      prev!.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
  }, [cards]);

  const handleFlipAll = useCallback(() => {
    if (!cards) return;
    setCards((prev) => prev!.map((c) => ({ ...c, flipped: true })));
  }, [cards]);

  // allRevealed の自動検出
  const computedAllRevealed = cards ? cards.every((c) => c.flipped) : false;
  if (computedAllRevealed && !allRevealed) {
    setTimeout(() => setAllRevealed(true), 300);
  }

  const handleReset = () => {
    setCards(null);
    setAllRevealed(false);
  };

  const handleChangeConcern = () => {
    setConcern(null);
    setCards(null);
    setAllRevealed(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* ヘッダー */}
        <div className="text-center">
          <div className="flex items-center justify-between">
            <TopBannerLink />
            <div className="flex gap-2">
              <Link
                href="/tarot"
                className="text-xs text-blue-600 border border-blue-300 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
              >
                3択タロット
              </Link>
              <Link
                href="/tarot-guide"
                className="text-xs text-blue-600 border border-blue-300 rounded-full px-3 py-1 hover:bg-blue-50 transition-colors"
              >
                ガイド
              </Link>
            </div>
          </div>
          <h1 className="text-2xl font-black text-indigo-900 mt-4">
            仕事タロット
          </h1>
          <p className="text-blue-600 text-sm mt-1">
            大アルカナ3枚スプレッドで、あなたの仕事運を読み解きます
          </p>
          <p className="text-blue-400 text-xs mt-1">
            現状・課題・アドバイスの3枚があなたへのメッセージを届けます
          </p>
        </div>

        {/* 悩みタイプ選択 */}
        {!concern && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-5 space-y-4">
            <p className="text-center text-indigo-800 font-bold text-sm">
              仕事の悩みのタイプを選んでください
            </p>
            <div className="space-y-3">
              {CONCERN_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectConcern(opt.id)}
                  className="w-full rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-white to-blue-50/80 p-4 text-left hover:border-indigo-400 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{opt.emoji}</span>
                    <div>
                      <div className="font-bold text-indigo-900 text-sm">
                        {opt.label}
                      </div>
                      <div className="text-[11px] text-blue-600/90 mt-0.5 leading-snug">
                        {opt.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* カードを引くボタン */}
        {concern && !cards && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {CONCERN_OPTIONS.find((c) => c.id === concern)?.emoji}{" "}
                {CONCERN_OPTIONS.find((c) => c.id === concern)?.label}
              </span>
              <button
                type="button"
                onClick={handleChangeConcern}
                className="text-xs text-blue-600 underline"
              >
                タイプを変える
              </button>
            </div>
            <p className="text-center text-indigo-700 text-sm">
              心を落ち着けて、準備ができたらカードを引いてください
            </p>
            <button
              type="button"
              onClick={handleDraw}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold text-base shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all active:scale-[0.98]"
            >
              カードを引く
            </button>
          </div>
        )}

        {/* カード表示 */}
        {concern && cards && (
          <div className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-5">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                {CONCERN_OPTIONS.find((c) => c.id === concern)?.emoji}{" "}
                {CONCERN_OPTIONS.find((c) => c.id === concern)?.label}
              </span>
              {!cards.every((c) => c.flipped) && (
                <button
                  type="button"
                  onClick={handleFlipAll}
                  className="text-xs text-indigo-600 underline hover:text-indigo-800"
                >
                  全部めくる
                </button>
              )}
            </div>

            <div className="flex justify-center gap-3">
              {cards.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-bold text-indigo-600">
                    {SPREAD_POSITIONS[i].label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleFlipCard(i)}
                    disabled={item.flipped}
                    aria-label={`${SPREAD_POSITIONS[i].label}のカードをめくる`}
                    className={`w-24 h-40 rounded-xl overflow-hidden shadow-lg transition-all ${
                      item.flipped
                        ? item.isReversed ? "ring-2 ring-blue-400" : "ring-2 ring-indigo-400"
                        : "hover:scale-105 hover:shadow-xl cursor-pointer"
                    }`}
                  >
                    {item.flipped ? (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-white p-1">
                        <Image
                          src={TAROT_CARD_IMAGES[item.card.id]}
                          alt={item.card.name}
                          width={80}
                          height={120}
                          className={`w-20 h-28 object-contain rounded-md ${item.isReversed ? "rotate-180" : ""}`}
                        />
                        <span className={`text-[10px] font-bold mt-0.5 text-center leading-tight ${item.isReversed ? "text-blue-700" : "text-indigo-900"}`}>
                          {item.card.name}
                        </span>
                        <span className={`text-[9px] font-semibold ${item.isReversed ? "text-blue-500" : "text-indigo-600"}`}>
                          {item.isReversed ? "逆位置" : "正位置"}
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={TAROT_BACK_IMAGE}
                        alt="タロットカード"
                        width={96}
                        height={160}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {!cards.every((c) => c.flipped) && (
              <div className="text-center space-y-1">
                <p className="text-indigo-500 text-xs animate-pulse">
                  カードをタップしてめくってください
                </p>
                <p className="text-sky-400 text-[11px]">
                  3枚すべてめくると鑑定結果が表示されます
                </p>
              </div>
            )}
          </div>
        )}

        {/* 結果表示 */}
        {concern && cards && allRevealed && (
          <div className="space-y-4">
            {/* 各カードの結果 */}
            {cards.map((item, i) => {
              const seo = TAROT_CARD_SEO[item.card.id];
              const workMessage = item.isReversed
                ? item.card.reversed.work
                : item.card.upright.work;
              const workDetailText = seo?.workDetail
                ? seo.workDetail[concern]
                : "";

              return (
                <div
                  key={i}
                  className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm p-5 space-y-3"
                >
                  {/* 位置ラベル */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold">
                      {SPREAD_POSITIONS[i].emoji} {SPREAD_POSITIONS[i].label}
                    </span>
                    <span className="text-[10px] text-blue-500">
                      {SPREAD_POSITIONS[i].description}
                    </span>
                  </div>

                  {/* カード名と正逆 */}
                  <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                    <span
                      className={`text-xl ${
                        item.isReversed ? "rotate-180" : ""
                      }`}
                    >
                      {item.card.emoji}
                    </span>
                    <span className="font-bold text-sm">
                      {item.card.name}
                      {item.isReversed ? "（逆位置）" : "（正位置）"}
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <Image
                      src={TAROT_CARD_IMAGES[item.card.id]}
                      alt={item.card.name}
                      width={120}
                      height={210}
                      className={`rounded-xl shadow-md ${item.isReversed ? 'rotate-180' : ''}`}
                    />
                  </div>

                  {/* 仕事メッセージ */}
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {workMessage}
                  </p>

                  {/* SEO workDetail */}
                  {workDetailText && (
                    <div className="rounded-xl p-3 bg-blue-50/80 border border-blue-100">
                      <p className="text-blue-700 font-bold text-xs mb-1">
                        {CONCERN_OPTIONS.find((c) => c.id === concern)?.emoji}{" "}
                        {CONCERN_OPTIONS.find((c) => c.id === concern)?.label}の詳細
                      </p>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {workDetailText}
                      </p>
                    </div>
                  )}

                  {/* カード詳細リンク */}
                  <Link
                    href={`/tarot-guide/card/${item.card.id}`}
                    className="block text-xs text-blue-600 hover:underline py-0.5"
                  >
                    このカードの詳細解説を見る
                  </Link>
                </div>
              );
            })}

            {/* 総合アドバイス */}
            <div className="rounded-2xl p-5 bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 shadow-sm">
              <h2 className="text-indigo-800 font-bold text-sm mb-2 flex items-center gap-2">
                <span>📋</span> 総合アドバイス
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {buildOverallAdvice(cards)}
              </p>
            </div>

            {/* シェア */}
            {(() => {
              const shareText = buildShareText(cards, concern);
              const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
              const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
              return (
                <div className="rounded-2xl border-2 border-blue-200 bg-blue-50/50 p-4 space-y-3">
                  <p className="text-center text-sm font-medium text-blue-500">
                    結果をシェアする
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={xUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-white"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      X でシェア
                    </a>
                    <a
                      href={lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-white"
                      >
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.630 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                      </svg>
                      LINE でシェア
                    </a>
                  </div>
                </div>
              );
            })()}

            {/* 操作ボタン */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="py-3 rounded-2xl border-2 border-blue-200 text-blue-600 font-semibold text-sm hover:bg-blue-50 transition-colors"
              >
                もう一度占う
              </button>
              <button
                type="button"
                onClick={handleChangeConcern}
                className="py-3 rounded-2xl border-2 border-indigo-200 text-indigo-700 font-semibold text-sm hover:bg-indigo-50 transition-colors"
              >
                別のタイプで占う
              </button>
            </div>

            {/* 他メニューへの導線 */}
            <div className="bg-white/80 rounded-2xl p-4 space-y-2">
              <p className="text-center text-xs font-bold text-indigo-700">
                他の占いも試してみる
              </p>
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/tarot"
                  className="text-center py-2.5 rounded-xl border border-purple-200 text-purple-700 text-xs font-medium hover:bg-purple-50 transition-colors"
                >
                  3択タロット占い
                </Link>
                <Link
                  href="/"
                  className="text-center py-2.5 rounded-xl border border-amber-200 text-amber-700 text-xs font-medium hover:bg-amber-50 transition-colors"
                >
                  手相占い
                </Link>
              </div>
            </div>
          </div>
        )}

        <AdBanner />
        <RakutenWidget />

        {/* SEO テキストセクション */}
        <section className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-3 text-sm text-indigo-800/80 leading-relaxed">
          <h2 className="font-bold text-indigo-900 text-base">
            仕事タロット占いとは？
          </h2>
          <p>
            仕事タロット占いは、大アルカナ22枚の中からランダムに3枚を引き、「現状」「課題」「アドバイス」の3枚スプレッドであなたの仕事運を読み解く無料の占いです。
          </p>
          <p>
            転職・キャリアチェンジ、職場の人間関係やチームワーク、金運・収入アップなど、仕事に関するさまざまな悩みに対応しています。
            正位置・逆位置も反映されるため、毎回異なるメッセージが届きます。
          </p>
          <p className="text-xs text-indigo-600/60">
            <Link href="/tarot-guide" className="underline hover:text-indigo-800">
              タロット大アルカナ22枚の詳しい意味はこちら
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
