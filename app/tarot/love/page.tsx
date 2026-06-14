"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import AdBanner from "../../components/AdBanner";
import FortunePageShell from "../../components/FortunePageShell";
import { fortunePageDescription, fortunePageTitle } from "../../lib/fortuneDesign";
import RakutenWidget from "../../components/RakutenWidget";
import Image from "next/image";
import { TAROT_MAJOR_ARCANA, TAROT_CARD_IMAGES, TAROT_BACK_IMAGE } from "../../data/tarotData";
import type { TarotCard } from "../../data/tarotData";
import { TAROT_CARD_SEO } from "../../data/tarotSeoData";

// ─── 型定義 ───────────────────────────────────────────────
type LoveType = "single" | "relationship" | "reconciliation";

type DrawnCard = {
  card: TarotCard;
  isReversed: boolean;
  flipped: boolean;
};

type PositionLabel = "過去" | "現在" | "未来";

const POSITIONS: { label: PositionLabel; description: string }[] = [
  { label: "過去", description: "これまでの恋愛の流れ" },
  { label: "現在", description: "今の恋愛の状況" },
  { label: "未来", description: "これからの恋愛の展開" },
];

const LOVE_TYPES: { id: LoveType; label: string; emoji: string; description: string }[] = [
  { id: "single", label: "片思い", emoji: "💭", description: "気になるあの人への想い" },
  { id: "relationship", label: "交際中", emoji: "💑", description: "今の関係をもっと深めたい" },
  { id: "reconciliation", label: "復縁", emoji: "🔄", description: "もう一度やり直したい" },
];

const SITE_URL = "https://uranai-tenohira.jp";

// ─── ランダム3枚（重複なし） ─────────────────────────────────
function drawThreeCards(): DrawnCard[] {
  const indices = new Set<number>();
  while (indices.size < 3) {
    indices.add(Math.floor(Math.random() * 22));
  }
  return [...indices].map((i) => ({
    card: TAROT_MAJOR_ARCANA[i],
    isReversed: Math.random() > 0.5,
    flipped: false,
  }));
}

// ─── 総合アドバイス（テンプレート） ─────────────────────────────
function buildOverallAdvice(cards: DrawnCard[]): string {
  const reversedCount = cards.filter((c) => c.isReversed).length;
  if (reversedCount === 0) {
    return "3枚すべてが正位置で出ています。恋愛に対して前向きなエネルギーが満ちている時期です。自分の気持ちに素直に行動することで、良い展開が期待できるでしょう。";
  }
  if (reversedCount === 3) {
    return "3枚すべてが逆位置です。今は焦らず、自分自身と向き合う時期かもしれません。内面を見つめ直すことで、本当に大切なものが見えてくるはずです。";
  }
  if (reversedCount === 1) {
    return "全体的に良い流れですが、一部で注意が必要なポイントがあります。逆位置のカードが示すメッセージに耳を傾けることで、より良い方向へ進めるでしょう。";
  }
  return "正位置と逆位置が混在しています。良い面と課題の両方を受け止め、バランスを意識することが大切です。課題を乗り越えた先に、新しい恋の可能性が広がっています。";
}

// ─── シェアテキスト ──────────────────────────────────────────
function buildShareText(cards: DrawnCard[], loveType: LoveType): string {
  const typeLabel = LOVE_TYPES.find((t) => t.id === loveType)?.label ?? "";
  const cardNames = cards
    .map((c, i) => {
      const pos = c.isReversed ? "逆" : "正";
      return `${POSITIONS[i].label}:${c.card.name}(${pos})`;
    })
    .join("／");
  return `恋愛タロット【${typeLabel}】\n${cardNames}\n\n手のひらの予言者で恋の行方を占おう\n${SITE_URL}/tarot/love`;
}

// ─── メインコンポーネント ────────────────────────────────────
export default function LoveTarotPage() {
  const [loveType, setLoveType] = useState<LoveType | null>(null);
  const [cards, setCards] = useState<DrawnCard[] | null>(null);
  const [allFlipped, setAllFlipped] = useState(false);

  const handleDraw = useCallback(() => {
    setCards(drawThreeCards());
    setAllFlipped(false);
  }, []);

  const handleFlipCard = (index: number) => {
    if (!cards) return;
    setCards((prev) =>
      prev!.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
  };

  const handleFlipAll = () => {
    if (!cards) return;
    setCards((prev) => prev!.map((c) => ({ ...c, flipped: true })));
    setAllFlipped(true);
  };

  const handleReset = () => {
    setCards(null);
    setAllFlipped(false);
  };

  const handleChangeLoveType = () => {
    setLoveType(null);
    setCards(null);
    setAllFlipped(false);
  };

  const allRevealed = cards?.every((c) => c.flipped) ?? false;

  return (
    <FortunePageShell
      theme="tarot"
      subText="恋愛タロット"
      links={[
        { type: "fortune", href: "/tarot", label: "タロットTOP" },
        { type: "guide", href: "/tarot-guide" },
      ]}
    >
        <div className="text-center space-y-2">
          <h1 className={fortunePageTitle}>恋愛タロット占い</h1>
          <p className={fortunePageDescription}>
            大アルカナ3枚スプレッドで、過去・現在・未来の恋の流れを読み解きます
          </p>
        </div>

        {/* お悩みタイプ選択 */}
        {!loveType && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-5 space-y-4">
            <p className="text-center text-rose-800 font-bold text-sm">
              あなたの恋愛のお悩みは?
            </p>
            <div className="space-y-3">
              {LOVE_TYPES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setLoveType(t.id)}
                  className="w-full rounded-2xl border-2 border-rose-200 bg-gradient-to-r from-white to-rose-50/80 p-4 text-left hover:border-rose-400 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{t.emoji}</span>
                    <div>
                      <div className="font-bold text-rose-900 text-sm">
                        {t.label}
                      </div>
                      <div className="text-[11px] text-rose-600/90 mt-0.5 leading-snug">
                        {t.description}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* カードを引く */}
        {loveType && !cards && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {LOVE_TYPES.find((t) => t.id === loveType)?.emoji}{" "}
                {LOVE_TYPES.find((t) => t.id === loveType)?.label}
              </span>
              <button
                type="button"
                onClick={handleChangeLoveType}
                className="text-xs text-rose-600 underline"
              >
                タイプを変える
              </button>
            </div>
            <p className="text-center text-rose-700 text-sm leading-relaxed">
              心を落ち着けて、恋のことを思い浮かべてください。
              <br />
              準備ができたらボタンを押しましょう。
            </p>
            <button
              type="button"
              onClick={handleDraw}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-sm shadow-lg hover:from-rose-600 hover:to-pink-600 transition-all active:scale-[0.98]"
            >
              カードを引く
            </button>
          </div>
        )}

        {/* カード表示 */}
        {loveType && cards && (
          <div className="space-y-4">
            {/* タイプバッジ */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {LOVE_TYPES.find((t) => t.id === loveType)?.emoji}{" "}
                {LOVE_TYPES.find((t) => t.id === loveType)?.label}
              </span>
              {!allRevealed && (
                <button
                  type="button"
                  onClick={handleFlipAll}
                  className="text-xs text-rose-600 underline"
                >
                  全部めくる
                </button>
              )}
            </div>

            {/* 3枚のカード */}
            <div className="flex justify-center gap-3">
              {cards.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5">
                  <span className="text-[11px] font-bold text-rose-700">
                    {POSITIONS[i].label}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleFlipCard(i)}
                    disabled={item.flipped}
                    aria-label={`${POSITIONS[i].label}のカードをめくる`}
                    className={`w-24 h-40 rounded-xl overflow-hidden shadow-lg transition-all ${
                      item.flipped
                        ? item.isReversed ? "ring-2 ring-blue-400" : "ring-2 ring-rose-400"
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
                        <span className={`text-[10px] font-bold mt-0.5 text-center leading-tight ${item.isReversed ? "text-blue-700" : "text-rose-900"}`}>
                          {item.card.name}
                        </span>
                        <span className={`text-[9px] font-semibold ${item.isReversed ? "text-blue-500" : "text-rose-500"}`}>
                          {item.isReversed ? "逆位置" : "正位置"}
                        </span>
                      </div>
                    ) : (
                      <Image
                        src={TAROT_BACK_IMAGE}
                        alt="タロットカード"
                        width={96}
                        height={144}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </button>
                  {item.flipped && (
                    <span className="text-[10px] text-rose-600 font-medium">
                      {item.isReversed ? "逆位置" : "正位置"}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* めくりガイド */}
            {!allRevealed && (
              <div className="text-center space-y-1">
                <p className="text-rose-500 text-xs animate-pulse">
                  カードをタップしてめくってください
                </p>
                <p className="text-rose-400 text-[11px]">
                  3枚すべてめくると鑑定結果が表示されます
                </p>
              </div>
            )}

            {/* 結果表示 */}
            {allRevealed && (
              <div className="space-y-4">
                {cards.map((item, i) => {
                  const seoData = TAROT_CARD_SEO[item.card.id];
                  const loveMessage = item.isReversed
                    ? item.card.reversed.love
                    : item.card.upright.love;
                  const loveDetail = seoData?.loveDetail?.[loveType] ?? "";

                  return (
                    <div
                      key={i}
                      className="rounded-2xl p-5 bg-white border-2 border-rose-100 shadow-sm space-y-3"
                    >
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-rose-500 text-white text-xs font-bold">
                          {i + 1}
                        </span>
                        <div>
                          <span className="text-rose-700 font-bold text-sm">
                            {POSITIONS[i].label}
                          </span>
                          <span className="text-rose-400 text-[11px] ml-1.5">
                            {POSITIONS[i].description}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white">
                        <span className="text-xl">{item.card.emoji}</span>
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

                      <div>
                        <p className="text-rose-700 font-bold text-xs mb-1">
                          恋愛メッセージ
                        </p>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {loveMessage}
                        </p>
                      </div>

                      {loveDetail && (
                        <div className="rounded-xl p-3 bg-rose-50/80 border border-rose-100">
                          <p className="text-rose-600 font-bold text-xs mb-1">
                            {LOVE_TYPES.find((t) => t.id === loveType)?.label}の方へ
                          </p>
                          <p className="text-gray-700 text-sm leading-relaxed">
                            {loveDetail}
                          </p>
                        </div>
                      )}

                      <Link
                        href={`/tarot-guide/card/${item.card.id}`}
                        className="block text-xs text-rose-500 hover:underline leading-snug"
                      >
                        このカードの詳細解説を見る
                      </Link>
                    </div>
                  );
                })}

                {/* 総合アドバイス */}
                <div className="rounded-2xl p-5 bg-gradient-to-br from-rose-100 to-pink-100 border-2 border-rose-200 shadow-sm">
                  <p className="text-rose-800 font-bold text-sm mb-2 flex items-center gap-2">
                    <span>💕</span> 総合アドバイス
                  </p>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {buildOverallAdvice(cards)}
                  </p>
                </div>

                {/* シェア */}
                {(() => {
                  const shareText = buildShareText(cards, loveType);
                  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
                  return (
                    <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-4 space-y-3">
                      <p className="text-center text-sm font-medium text-rose-500">
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
                    className="py-3 rounded-2xl border-2 border-rose-200 text-rose-600 font-semibold text-sm hover:bg-rose-50 transition-colors"
                  >
                    もう一度占う
                  </button>
                  <button
                    type="button"
                    onClick={handleChangeLoveType}
                    className="py-3 rounded-2xl border-2 border-pink-200 text-pink-700 font-semibold text-sm hover:bg-pink-50 transition-colors"
                  >
                    タイプを変えて占う
                  </button>
                </div>

                {/* 他メニューへの導線 */}
                <div className="rounded-2xl border-2 border-rose-100 bg-white/80 p-4 space-y-2">
                  <p className="text-rose-700 font-bold text-xs text-center">
                    他の占いも試してみませんか?
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      href="/tarot"
                      className="text-center py-2.5 rounded-xl bg-purple-50 text-purple-700 text-xs font-medium hover:bg-purple-100 transition-colors"
                    >
                      3択タロット占い
                    </Link>
                    <Link
                      href="/palm-quiz"
                      className="text-center py-2.5 rounded-xl bg-amber-50 text-amber-700 text-xs font-medium hover:bg-amber-100 transition-colors"
                    >
                      簡易手相タイプ診断
                    </Link>
                    <Link
                      href="/daily-fortune-ranking"
                      className="text-center py-2.5 rounded-xl bg-indigo-50 text-indigo-700 text-xs font-medium hover:bg-indigo-100 transition-colors"
                    >
                      今日の運勢ランキング
                    </Link>
                    <Link
                      href="/name-fortune"
                      className="text-center py-2.5 rounded-xl bg-teal-50 text-teal-700 text-xs font-medium hover:bg-teal-100 transition-colors"
                    >
                      姓名判断
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <AdBanner />
        <RakutenWidget />

        {/* SEO テキストセクション */}
        <section className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-3 text-sm text-rose-800/80 leading-relaxed">
          <h2 className="font-bold text-rose-900 text-base">
            恋愛タロット占いとは?
          </h2>
          <p>
            恋愛タロット占いは、大アルカナ22枚の中からランダムに3枚を引き、過去・現在・未来の3つの視点であなたの恋愛の流れを読み解く無料の占いです。
            カードは毎回ランダムに選ばれ、正位置・逆位置も反映されます。
          </p>
          <p>
            片思い・交際中・復縁の3つのお悩みタイプに対応しており、選んだタイプに応じてカードごとに詳しいメッセージをお届けします。
            あなたの恋の行方を知りたいとき、ぜひお試しください。
          </p>
          <p className="text-xs text-rose-600/60">
            <Link
              href="/tarot-guide"
              className="underline hover:text-rose-800"
            >
              タロット大アルカナ22枚の詳しい意味はこちら
            </Link>
          </p>
        </section>
    </FortunePageShell>
  );
}
