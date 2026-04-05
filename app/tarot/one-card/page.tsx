"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopBannerLink from "../../components/TopBannerLink";
import AdBanner from "../../components/AdBanner";
import RakutenWidget from "../../components/RakutenWidget";
import Image from "next/image";
import { getDailyTarotCards, TAROT_MAJOR_ARCANA, TAROT_CARD_IMAGES, TAROT_BACK_IMAGE } from "../../data/tarotData";
import type { TarotCard } from "../../data/tarotData";
import { TAROT_CARD_SEO } from "../../data/tarotSeoData";

const SITE_URL = "https://uranai-tenohira.jp";

type DailyCard = {
  card: TarotCard;
  isReversed: boolean;
};

type Phase = "intro" | "back" | "revealed";

export default function OneCardPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [dailyCard, setDailyCard] = useState<DailyCard | null>(null);

  useEffect(() => {
    const cards = getDailyTarotCards();
    setDailyCard(cards[0]);
  }, []);

  const handleDraw = () => {
    setPhase("back");
  };

  const handleFlip = () => {
    if (phase === "back") {
      setPhase("revealed");
    }
  };

  const handleReset = () => {
    setPhase("intro");
    setTimeout(() => {
      setPhase("intro");
    }, 0);
  };

  if (!dailyCard) return null;

  const { card, isReversed } = dailyCard;
  const position = isReversed ? "逆位置" : "正位置";
  const reading = isReversed ? card.reversed : card.upright;
  const seo = TAROT_CARD_SEO[card.id];

  const shareText = `今日のワンカードタロット\n${card.emoji}【${card.name}】${position}\n\n${reading.general.slice(0, 80)}...\n\n手のひらの予言者`;
  const shareUrl = `${SITE_URL}/tarot/one-card`;
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const lineShareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
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

        {/* タイトル */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-purple-900 mb-2">
            今日のワンカード
          </h1>
          <p className="text-sm text-purple-600">
            1枚のカードが、今日のあなたにメッセージを届けます
          </p>
        </div>

        {/* フェーズ: intro */}
        {phase === "intro" && (
          <div className="text-center">
            <div className="mb-8">
              <Image
                src={TAROT_BACK_IMAGE}
                alt="タロットカード"
                width={180}
                height={300}
                className="mx-auto rounded-xl shadow-xl object-contain"
              />
            </div>
            <button
              onClick={handleDraw}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 text-lg"
            >
              今日のワンカードを引く
            </button>
          </div>
        )}

        {/* フェーズ: back / revealed (カード表示) */}
        {(phase === "back" || phase === "revealed") && (
          <div className="text-center">
            {/* カードのフリップ */}
            <div
              className="perspective-1000 mb-8 cursor-pointer"
              onClick={handleFlip}
            >
              <div
                className={`relative w-48 h-80 mx-auto transition-transform duration-700 ${
                  phase === "revealed" ? "rotate-y-180" : ""
                }`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* 裏面 */}
                <div
                  className="absolute inset-0 rounded-xl shadow-xl overflow-hidden backface-hidden"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <Image
                    src={TAROT_BACK_IMAGE}
                    alt="タロットカード裏面"
                    fill
                    className="object-contain"
                  />
                  <div className="absolute inset-0 flex items-end justify-center pb-3">
                    <p className="text-purple-200 text-xs bg-black/30 px-3 py-1 rounded-full">
                      タップしてめくる
                    </p>
                  </div>
                </div>

                {/* 表面 */}
                <div
                  className="absolute inset-0 rounded-xl bg-white shadow-xl flex flex-col items-center justify-center border-2 border-purple-200 rotate-y-180 overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <Image
                    src={TAROT_CARD_IMAGES[card.id]}
                    alt={card.name}
                    width={176}
                    height={280}
                    className={`w-40 h-60 object-contain rounded-lg ${isReversed ? "rotate-180" : ""}`}
                  />
                  <p className="text-sm font-bold text-purple-900 mt-1">
                    {card.name}
                  </p>
                  <p
                    className={`text-xs font-semibold ${
                      isReversed ? "text-rose-500" : "text-violet-600"
                    }`}
                  >
                    {position}
                  </p>
                </div>
              </div>
            </div>

            {phase === "back" && (
              <p className="text-purple-500 text-sm animate-pulse">
                カードをタップしてめくってください
              </p>
            )}

            {/* めくった後の結果表示 */}
            {phase === "revealed" && (
              <div className="mt-6 space-y-5 text-left animate-fade-in">
                {/* 鑑定結果ヘッダー */}
                <div className="text-center">
                  <div className={`inline-block px-6 py-2 rounded-full text-sm font-bold ${isReversed ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}`}>
                    鑑定結果: {card.emoji} {card.name}（{position}）
                  </div>
                </div>

                {/* 総合メッセージ */}
                <div className="bg-white rounded-xl shadow-md p-5 border border-purple-100">
                  <h3 className="text-sm font-bold text-purple-700 mb-2 flex items-center gap-1">
                    <span>🔮</span> 今日のメッセージ
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {reading.general}
                  </p>
                </div>

                {/* 恋愛・仕事 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl shadow-md p-4 border border-purple-100">
                    <h3 className="text-xs font-bold text-pink-600 mb-1">
                      💕 恋愛
                    </h3>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {reading.love}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-4 border border-purple-100">
                    <h3 className="text-xs font-bold text-blue-600 mb-1">
                      💼 仕事
                    </h3>
                    <p className="text-gray-700 text-xs leading-relaxed">
                      {reading.work}
                    </p>
                  </div>
                </div>

                {/* 行動アドバイス (SEOデータ) */}
                {seo && (
                  <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50 rounded-xl shadow-md p-5 border border-purple-200">
                    <h3 className="text-sm font-bold text-purple-800 mb-2 flex items-center gap-1">
                      <span>🌟</span> 今日の行動アドバイス
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {seo.actionAdvice}
                    </p>
                  </div>
                )}

                {/* 健康 (SEOデータ) */}
                {seo && (
                  <div className="bg-white rounded-xl shadow-md p-5 border border-purple-100">
                    <h3 className="text-sm font-bold text-green-700 mb-2 flex items-center gap-1">
                      <span>🍀</span> 健康のヒント
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {seo.health}
                    </p>
                  </div>
                )}

                {/* カードのアドバイス */}
                <div className="bg-white rounded-xl shadow-md p-5 border border-purple-100">
                  <h3 className="text-sm font-bold text-amber-700 mb-2 flex items-center gap-1">
                    <span>💡</span> カードからのアドバイス
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {reading.advice}
                  </p>
                </div>

                {/* カード詳細リンク */}
                <div className="text-center">
                  <Link
                    href={`/tarot-guide/card/${card.id}`}
                    className="inline-block text-sm text-purple-600 hover:text-purple-800 underline"
                  >
                    「{card.name}」の詳しい意味を見る →
                  </Link>
                </div>

                {/* シェアボタン */}
                <div className="flex justify-center gap-4 pt-2">
                  <a
                    href={xShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    𝕏 でシェア
                  </a>
                  <a
                    href={lineShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 bg-[#06C755] text-white rounded-full text-sm font-semibold hover:bg-[#05b34c] transition-colors"
                  >
                    LINE でシェア
                  </a>
                </div>

                <AdBanner />

                {/* もう一度引く & 導線 */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleReset}
                    className="w-full py-3 bg-white border-2 border-purple-300 text-purple-700 font-bold rounded-full hover:bg-purple-50 transition-colors"
                  >
                    もう一度引く
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      href="/tarot"
                      className="block text-center py-3 bg-gradient-to-r from-purple-500 to-violet-500 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity"
                    >
                      3択タロット占い
                    </Link>
                    <Link
                      href="/tarot-guide"
                      className="block text-center py-3 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity"
                    >
                      タロットガイド
                    </Link>
                  </div>
                </div>

                <RakutenWidget />
              </div>
            )}
          </div>
        )}

        {/* フッター導線（intro/back時） */}
        {phase !== "revealed" && (
          <div className="mt-12 space-y-4">
            <AdBanner />
            <div className="text-center space-y-2">
              <Link
                href="/tarot"
                className="block text-sm text-purple-600 hover:text-purple-800 underline"
              >
                3択タロット占いを試す →
              </Link>
              <Link
                href="/tarot-guide"
                className="block text-sm text-purple-600 hover:text-purple-800 underline"
              >
                タロット大アルカナ22枚の意味 →
              </Link>
              <Link
                href="/"
                className="block text-sm text-purple-600 hover:text-purple-800 underline"
              >
                手のひらの予言者トップへ →
              </Link>
            </div>
            <RakutenWidget />
          </div>
        )}
      </div>

      {/* CSSアニメーション */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
