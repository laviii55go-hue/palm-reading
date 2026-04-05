"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { TAROT_MAJOR_ARCANA, TAROT_CARD_IMAGES, TAROT_BACK_IMAGE } from "../../data/tarotData";
import type { TarotCard } from "../../data/tarotData";
import { TAROT_CARD_SEO } from "../../data/tarotSeoData";
import TopBannerLink from "../../components/TopBannerLink";
import AdBanner from "../../components/AdBanner";
import RakutenWidget from "../../components/RakutenWidget";

const SITE_URL = "https://uranai-tenohira.jp";

type DrawnCard = {
  card: TarotCard;
  isReversed: boolean;
};

type AnimationPhase = "idle" | "back" | "flipping" | "done";

function buildShareText(
  cardName: string,
  isReversed: boolean,
  answer: string
): string {
  const pos = isReversed ? "逆位置" : "正位置";
  return `YES/NOタロット占いの結果\n【${cardName}】${pos}\n\n答えは【${answer}】でした！\n\n手のひらの予言者 ${SITE_URL}/tarot/yes-no`;
}

export default function YesNoTarotPage() {
  const [drawn, setDrawn] = useState<DrawnCard | null>(null);
  const [phase, setPhase] = useState<AnimationPhase>("idle");
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const drawCard = useCallback(() => {
    let randomIndex: number;
    do {
      randomIndex = Math.floor(Math.random() * 22);
    } while (randomIndex === prevIndex && TAROT_MAJOR_ARCANA.length > 1);

    const card = TAROT_MAJOR_ARCANA[randomIndex];
    const isReversed = Math.random() > 0.5;

    setPrevIndex(randomIndex);
    setDrawn({ card, isReversed });
    setPhase("back");

    setTimeout(() => setPhase("flipping"), 600);
    setTimeout(() => setPhase("done"), 1200);
  }, [prevIndex]);

  const handleReset = useCallback(() => {
    setDrawn(null);
    setPhase("idle");
  }, []);

  const answer = drawn ? (drawn.isReversed ? "NO" : "YES") : null;
  const seoData = drawn ? TAROT_CARD_SEO[drawn.card.id] : null;
  const yesNoText =
    drawn && seoData
      ? drawn.isReversed
        ? seoData.yesNo.reversed
        : seoData.yesNo.upright
      : null;

  const shareText = drawn
    ? buildShareText(drawn.card.name, drawn.isReversed, answer!)
    : "";
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* ヘッダー */}
        <div className="text-center">
          <div className="flex items-center justify-between">
            <TopBannerLink />
            <div className="flex gap-2">
              <Link
                href="/tarot"
                className="text-xs text-purple-600 border border-purple-300 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors"
              >
                3択タロット
              </Link>
              <Link
                href="/tarot-guide"
                className="text-xs text-purple-600 border border-purple-300 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors"
              >
                ガイド
              </Link>
            </div>
          </div>
          <h1 className="text-2xl font-black text-purple-900 mt-4">
            YES/NOタロット占い
          </h1>
          <p className="text-purple-600 text-sm mt-1">
            1枚引きで、あなたの質問にYES/NOでお答えします
          </p>
        </div>

        {/* 説明 + カードを引くボタン（初期状態） */}
        {phase === "idle" && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-6 space-y-5 text-center">
            <div className="space-y-4">
              <p className="text-purple-800 font-bold text-sm">
                遊び方
              </p>
              <div className="text-left bg-purple-50 rounded-xl p-4 space-y-2">
                <p className="text-purple-800 text-sm leading-relaxed">
                  <span className="font-bold text-purple-600">1.</span> 「はい」か「いいえ」で答えられる質問を考える
                </p>
                <p className="text-purple-500 text-xs pl-4">
                  例:「転職すべき？」「告白してもいい？」「この買い物は正解？」
                </p>
                <p className="text-purple-800 text-sm leading-relaxed">
                  <span className="font-bold text-purple-600">2.</span> 心の中でその質問を唱える
                </p>
                <p className="text-purple-800 text-sm leading-relaxed">
                  <span className="font-bold text-purple-600">3.</span> 「カードを引く」ボタンを押す
                </p>
              </div>
              <p className="text-purple-500 text-xs leading-relaxed">
                カードの正位置はYES寄り、逆位置はNO寄りの答えを示します。
                <br />
                大アルカナ22枚からランダムで1枚を引きます。
              </p>
            </div>
            <button
              type="button"
              onClick={drawCard}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white font-bold text-base shadow-lg hover:from-purple-600 hover:to-violet-700 active:scale-[0.98] transition-all"
            >
              カードを引く
            </button>
          </div>
        )}

        {/* カードアニメーション */}
        {drawn && phase !== "idle" && (
          <div className="flex justify-center py-4">
            <div className="relative w-40 h-60" style={{ perspective: "600px" }}>
              <div
                className="w-full h-full transition-transform duration-[600ms] ease-in-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform:
                    phase === "back"
                      ? "rotateY(0deg)"
                      : "rotateY(180deg)",
                }}
              >
                {/* 裏面 */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={TAROT_BACK_IMAGE}
                    alt="タロットカード裏面"
                    width={160}
                    height={240}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* 表面 */}
                <div
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-xl flex flex-col items-center justify-center bg-white border-2 border-purple-200"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src={TAROT_CARD_IMAGES[drawn.card.id]}
                    alt={drawn.card.name}
                    width={120}
                    height={180}
                    className={`w-28 h-40 object-cover rounded-lg ${drawn.isReversed ? "rotate-180" : ""}`}
                  />
                  <p className="mt-1 text-purple-900 font-bold text-sm">
                    {drawn.card.name}
                  </p>
                  <p className="text-purple-600 text-xs">
                    {drawn.isReversed ? "逆位置" : "正位置"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 結果表示 */}
        {phase === "done" && drawn && (
          <div className="space-y-4">
            {/* YES / NO バナー */}
            <div
              className={`rounded-2xl p-6 text-center shadow-sm ${
                answer === "YES"
                  ? "bg-gradient-to-br from-emerald-50 to-green-100 border-2 border-emerald-200"
                  : "bg-gradient-to-br from-orange-50 to-amber-100 border-2 border-orange-200"
              }`}
            >
              <p
                className={`text-5xl font-black tracking-wider ${
                  answer === "YES" ? "text-emerald-600" : "text-orange-600"
                }`}
              >
                {answer}
              </p>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {drawn.card.emoji} {drawn.card.name}
                {drawn.isReversed ? "（逆位置）" : "（正位置）"}
              </p>
              <Image
                src={TAROT_CARD_IMAGES[drawn.card.id]}
                alt={drawn.card.name}
                width={120}
                height={210}
                className={`mx-auto mt-3 rounded-xl shadow-lg ${drawn.isReversed ? 'rotate-180' : ''}`}
              />
            </div>

            {/* YES/NO 解釈テキスト */}
            {yesNoText && (
              <div className="rounded-2xl p-5 bg-white border-2 border-purple-100 shadow-sm">
                <h2 className="text-purple-700 font-bold text-sm mb-2 flex items-center gap-2">
                  <span>🔮</span> YES/NOの解釈
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {yesNoText}
                </p>
              </div>
            )}

            {/* カードの総合メッセージ */}
            <div className="rounded-2xl p-5 bg-white border-2 border-purple-100 shadow-sm">
              <h2 className="text-purple-700 font-bold text-sm mb-2 flex items-center gap-2">
                <span>✨</span> カードからのメッセージ
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {drawn.isReversed
                  ? drawn.card.reversed.general
                  : drawn.card.upright.general}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3 pt-3 border-t border-purple-50">
                <span className="font-bold text-purple-600 text-xs">
                  💡 アドバイス
                </span>
                <br />
                {drawn.isReversed
                  ? drawn.card.reversed.advice
                  : drawn.card.upright.advice}
              </p>
            </div>

            {/* カード詳細ページへのリンク */}
            <Link
              href={`/tarot-guide/card/${drawn.card.id}`}
              className="block text-center text-sm text-purple-600 hover:underline py-1"
            >
              このカードの詳細解説を見る →
            </Link>

            {/* シェアボタン */}
            <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-4 space-y-3">
              <p className="text-center text-sm font-medium text-purple-500">
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

            {/* もう一度引く / 別の占いへ */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  handleReset();
                  setTimeout(drawCard, 50);
                }}
                className="py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition-colors"
              >
                もう一度引く
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="py-3 rounded-2xl border-2 border-fuchsia-200 text-fuchsia-700 font-semibold text-sm hover:bg-fuchsia-50 transition-colors"
              >
                最初に戻る
              </button>
            </div>
          </div>
        )}

        <AdBanner />
        <RakutenWidget />

        {/* 他のタロットメニューへの導線 */}
        <div className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-3">
          <h2 className="font-bold text-purple-900 text-base text-center">
            他のタロット占い
          </h2>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/tarot"
              className="flex items-center gap-3 p-4 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
            >
              <span className="text-2xl">🔮</span>
              <div>
                <p className="font-bold text-purple-900 text-sm">
                  3択タロット占い
                </p>
                <p className="text-xs text-purple-600/80">
                  テーマを選んで3枚から1枚を引く
                </p>
              </div>
            </Link>
            <Link
              href="/tarot-guide"
              className="flex items-center gap-3 p-4 rounded-2xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-md transition-all"
            >
              <span className="text-2xl">📖</span>
              <div>
                <p className="font-bold text-purple-900 text-sm">
                  タロットカード解説
                </p>
                <p className="text-xs text-purple-600/80">
                  大アルカナ22枚の意味を詳しく解説
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* SEO テキスト */}
        <section className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-3 text-sm text-purple-800/80 leading-relaxed">
          <h2 className="font-bold text-purple-900 text-base">
            YES/NOタロット占いとは？
          </h2>
          <p>
            YES/NOタロット占いは、「はい」か「いいえ」で答えられる質問に対して、タロットカード1枚でシンプルに答えを導く占い方法です。
            大アルカナ22枚の中からランダムに1枚を引き、正位置が出ればYES（肯定的な答え）、逆位置が出ればNO（慎重になるべきという答え）を示します。
          </p>
          <p>
            迷った時や、すぐに答えが欲しい時に最適な占い方法です。
            毎回ランダムでカードが変わるので、何度でもお試しいただけます。
            カードごとの詳しい解釈テキストも表示されるため、単なるYES/NOだけでなく、カードが伝えるメッセージも読み取ることができます。
          </p>
        </section>
      </div>
    </div>
  );
}
