"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import TopBannerLink from "../components/TopBannerLink";
import RakutenWidget from "../components/RakutenWidget";
import { getDailyTarotCards, TAROT_THEMES, TAROT_CARD_IMAGES, TAROT_BACK_IMAGE, type TarotThemeId } from "../data/tarotData";
import type { TarotCard } from "../data/tarotData";

type CardState = { card: TarotCard; isReversed: boolean; flipped: boolean };

type AiResult = {
  interpretation: string;
  celestialNote: string;
  advice: string;
  keywords: string[];
  fallback: boolean;
};

const SITE_URL = "https://uranai-tenohira.jp";

function buildShareText(
  cardName: string,
  isReversed: boolean,
  themeLabel: string,
  interpretation: string
): string {
  const pos = isReversed ? "逆位置" : "正位置";
  return `今日のタロット【${themeLabel}】\n【${cardName}】${pos}\n\n✨ ${interpretation.slice(0, 120)}${interpretation.length > 120 ? "…" : ""}\n\n手のひらの予言者 👉 ${SITE_URL}/tarot`;
}

function TarotPageInner() {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState<TarotThemeId | null>(null);
  const [cards, setCards] = useState<CardState[] | null>(null);
  const [selectedResult, setSelectedResult] = useState<CardState | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<AiResult | null>(null);
  const [pickHandled, setPickHandled] = useState(false);

  const initCards = useCallback(() => {
    const daily = getDailyTarotCards();
    setCards(
      daily.map(({ card, isReversed }) => ({
        card,
        isReversed,
        flipped: false,
      }))
    );
    setSelectedResult(null);
    setAiResult(null);
  }, []);

  useEffect(() => {
    if (theme) initCards();
  }, [theme, initCards]);

  // X投稿からの pick パラメータ対応: ?pick=1/2/3&theme=general
  useEffect(() => {
    if (pickHandled || !cards || !theme) return;
    const pick = searchParams.get("pick");
    if (!pick) return;
    const pickIndex = parseInt(pick, 10) - 1;
    if (pickIndex >= 0 && pickIndex < cards.length) {
      setPickHandled(true);
      handleCardClick(pickIndex);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards, theme, pickHandled, searchParams]);

  // X投稿からの theme パラメータ自動選択
  useEffect(() => {
    if (theme) return;
    const t = searchParams.get("theme") as TarotThemeId | null;
    if (t && TAROT_THEMES.some((th) => th.id === t)) {
      setTheme(t);
    } else if (searchParams.get("pick")) {
      setTheme("general");
    }
  }, [searchParams, theme]);

  const handleSelectTheme = (id: TarotThemeId) => {
    setTheme(id);
  };

  const handleCardClick = async (index: number) => {
    if (!cards || !theme || selectedResult || aiLoading) return;
    const target = cards[index];
    setCards((prev) =>
      prev!.map((c, i) => (i === index ? { ...c, flipped: true } : c))
    );
    setSelectedResult(target);
    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/tarot-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cardId: target.card.id,
          isReversed: target.isReversed,
          theme,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "request failed");
      setAiResult({
        interpretation: data.interpretation,
        celestialNote: data.celestialNote,
        advice: data.advice,
        keywords: data.keywords ?? [],
        fallback: Boolean(data.fallback),
      });
    } catch {
      setAiResult({
        interpretation: `「${target.card.name}」の解釈を取得できませんでした。通信状況を確認のうえ、もう一度お試しください。`,
        celestialNote: "",
        advice: "",
        keywords: [],
        fallback: true,
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleResetSameTheme = () => {
    if (!cards) return;
    setCards(cards.map((c) => ({ ...c, flipped: false })));
    setSelectedResult(null);
    setAiResult(null);
  };

  const handleChangeTheme = () => {
    setTheme(null);
    setCards(null);
    setSelectedResult(null);
    setAiResult(null);
  };

  const themeInfo = theme ? TAROT_THEMES.find((t) => t.id === theme) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-between">
            <TopBannerLink />
            <Link
              href="/tarot-guide"
              className="text-xs text-purple-600 border border-purple-300 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors"
            >
              📖 ガイド
            </Link>
          </div>
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/tarot-top.webp"
              alt="タロット占い"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-purple-900 mt-3">
            タロット占い｜無料
          </h1>
          <p className="text-purple-600 text-sm mt-1">
            大アルカナ22枚で占う5つのメニュー。ワンカード・YES/NO・恋愛・仕事・AI3択
          </p>
        </div>

        {/* タロットメニュー */}
        {!theme && (
          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/tarot/one-card"
              className="rounded-2xl border-2 border-purple-200 bg-white/80 p-4 hover:border-purple-400 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="text-2xl mb-1">🔮</div>
              <div className="font-bold text-purple-900 text-sm">ワンカード</div>
              <div className="text-[11px] text-purple-600/80 mt-1">今日の1枚を引く</div>
            </Link>
            <Link
              href="/tarot/yes-no"
              className="rounded-2xl border-2 border-purple-200 bg-white/80 p-4 hover:border-purple-400 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="text-2xl mb-1">✅</div>
              <div className="font-bold text-purple-900 text-sm">YES / NO</div>
              <div className="text-[11px] text-purple-600/80 mt-1">質問に答える1枚引き</div>
            </Link>
            <Link
              href="/tarot/love"
              className="rounded-2xl border-2 border-rose-200 bg-white/80 p-4 hover:border-rose-400 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="text-2xl mb-1">💕</div>
              <div className="font-bold text-rose-900 text-sm">恋愛タロット</div>
              <div className="text-[11px] text-rose-600/80 mt-1">3枚で恋の行方を占う</div>
            </Link>
            <Link
              href="/tarot/work"
              className="rounded-2xl border-2 border-sky-200 bg-white/80 p-4 hover:border-sky-400 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <div className="text-2xl mb-1">💼</div>
              <div className="font-bold text-sky-900 text-sm">仕事タロット</div>
              <div className="text-[11px] text-sky-600/80 mt-1">3枚でキャリアを占う</div>
            </Link>
          </div>
        )}

        {/* 3択テーマ選択 */}
        {!theme && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-5 space-y-4">
            <p className="text-center text-purple-800 font-bold text-sm">
              3択AIタロット占い &#8212; テーマを選んでください
            </p>
            <div className="grid grid-cols-2 gap-3">
              {TAROT_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTheme(t.id)}
                  className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-white to-purple-50/80 p-4 text-left hover:border-purple-400 hover:shadow-md transition-all active:scale-[0.98]"
                >
                  <div className="text-2xl mb-1">{t.emoji}</div>
                  <div className="font-bold text-purple-900 text-sm">{t.label}</div>
                  <div className="text-[11px] text-purple-600/90 mt-1 leading-snug">
                    {t.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* カード選択 */}
        {theme && cards && !selectedResult && (
          <div className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-6">
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                {themeInfo?.emoji} {themeInfo?.label}
              </span>
              <button
                type="button"
                onClick={handleChangeTheme}
                className="text-xs text-purple-600 underline"
              >
                テーマを変える
              </button>
            </div>
            <p className="text-center text-purple-700 font-medium text-sm">
              直感で1枚選んでください
            </p>
            <div className="flex justify-center gap-4">
              {cards.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleCardClick(i)}
                  aria-label={`${i + 1}枚目のカードを選ぶ`}
                  className="w-24 h-36 rounded-xl overflow-hidden shadow-lg hover:scale-105 hover:shadow-xl transition-all focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <Image
                    src={TAROT_BACK_IMAGE}
                    alt="タロットカード"
                    width={96}
                    height={144}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ローディング */}
        {theme && selectedResult && aiLoading && (
          <div className="bg-white/90 rounded-3xl shadow-sm p-8 text-center space-y-4">
            <div className="relative h-16 flex items-center justify-center">
              <span className="text-4xl animate-pulse">✨</span>
              <span
                className="absolute text-2xl opacity-60 animate-spin"
                style={{ animationDuration: "3s" }}
              >
                ⭐
              </span>
            </div>
            <p className="text-purple-700 font-medium text-sm leading-relaxed">
              星の声を聴いています…
              <br />
              <span className="text-xs text-purple-500">少しだけお待ちください</span>
            </p>
          </div>
        )}

        {/* 結果 */}
        {theme && selectedResult && !aiLoading && aiResult && (
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2 w-full max-w-md mx-auto text-center">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-bold">
                {themeInfo?.emoji} {themeInfo?.label}
              </span>
              <div className="flex flex-row flex-wrap items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white w-full min-w-0">
                <span className="text-2xl shrink-0 leading-none">{selectedResult.card.emoji}</span>
                <span className="font-bold text-sm sm:text-base leading-snug break-words">
                  {selectedResult.card.name}
                  {selectedResult.isReversed ? "（逆位置）" : "（正位置）"}
                </span>
              </div>
              <Image
                src={TAROT_CARD_IMAGES[selectedResult.card.id]}
                alt={selectedResult.card.name}
                width={160}
                height={280}
                className={`rounded-xl shadow-lg ${selectedResult.isReversed ? 'rotate-180' : ''}`}
              />
              <Link
                href={`/tarot-guide/card/${selectedResult.card.id}`}
                className="block w-full text-xs text-purple-600 hover:underline py-1 leading-snug"
              >
                📖 このカードの詳細解説を見る
              </Link>
            </div>

            {/* 検証用：AI使用の有無を常に表示 */}
            <div
              className={`text-center rounded-xl px-3 py-2.5 text-xs leading-relaxed border ${
                aiResult.fallback
                  ? "bg-amber-50 border-amber-200 text-amber-900"
                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
              }`}
            >
              {aiResult.fallback ? (
                <>
                  <span className="font-bold">📋 基本解釈（テンプレート）</span>
                  <br />
                  <span className="text-[11px] opacity-90">
                    AIキーが未設定のとき、または通信エラー時はカードの定型文＋天体の一言を表示しています。
                  </span>
                </>
              ) : (
                <>
                  <span className="font-bold">✨ AI解釈</span>
                  <br />
                  <span className="text-[11px] opacity-90">
                    今日の天体配置をふまえ、AIがこのテーマ向けの文章を生成しました。
                  </span>
                </>
              )}
            </div>

            <div className="rounded-2xl p-5 bg-white border-2 border-purple-100 shadow-sm">
              <h2 className="text-purple-700 font-bold text-sm mb-2 flex items-center gap-2">
                <span>🔮</span> 今日のメッセージ
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                {aiResult.interpretation}
              </p>
            </div>

            {aiResult.celestialNote && (
              <div className="rounded-xl p-4 bg-indigo-50/80 border border-indigo-100">
                <p className="text-indigo-600 font-bold text-xs mb-1">🌌 天体からのひとこと</p>
                <p className="text-gray-700 text-sm leading-relaxed">{aiResult.celestialNote}</p>
              </div>
            )}

            {aiResult.keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {aiResult.keywords.map((k, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-medium"
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}

            {aiResult.advice && (
              <div className="rounded-xl p-4 bg-amber-50 border-2 border-amber-200/80">
                <p className="text-amber-800 font-bold text-xs mb-1">💡 アドバイス</p>
                <p className="text-gray-800 text-sm">{aiResult.advice}</p>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {(() => {
                const themeLabel = TAROT_THEMES.find((t) => t.id === theme)?.label ?? "";
                const shareText = buildShareText(
                  selectedResult.card.name,
                  selectedResult.isReversed,
                  themeLabel,
                  aiResult.interpretation
                );
                const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
                return (
                  <div className="rounded-2xl border-2 border-purple-200 bg-purple-50/50 p-4 space-y-3">
                    <p className="text-center text-sm font-medium text-purple-500">📣 結果をシェアする</p>
                    <div className="grid grid-cols-2 gap-3">
                      <a href={xUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        X でシェア
                      </a>
                      <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors">
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.630 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                        LINE でシェア
                      </a>
                    </div>
                  </div>
                );
              })()}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={handleResetSameTheme}
                  className="py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-semibold text-sm hover:bg-purple-50 transition-colors"
                >
                  もう一度占う
                </button>
                <button
                  type="button"
                  onClick={handleChangeTheme}
                  className="py-3 rounded-2xl border-2 border-fuchsia-200 text-fuchsia-700 font-semibold text-sm hover:bg-fuchsia-50 transition-colors"
                >
                  別のテーマで占う
                </button>
              </div>
            </div>
          </div>
        )}

        {theme && !cards && (
          <div className="flex justify-center py-8">
            <p className="text-purple-600 font-medium">準備中...</p>
          </div>
        )}

        <AdBanner />
        <RakutenWidget />

        {/* SEO テキストセクション */}
        <section className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-3 text-sm text-purple-800/80 leading-relaxed">
          <h2 className="font-bold text-purple-900 text-base">無料タロット占い 5つのメニュー</h2>
          <p>
            当サイトでは大アルカナ22枚のオリジナルカードを使った5種類のタロット占いを完全無料で提供しています。
          </p>
          <ul className="space-y-1.5 text-sm">
            <li><Link href="/tarot/one-card" className="text-purple-700 underline hover:text-purple-900 font-medium">ワンカードタロット</Link> — 毎日1枚引いて今日のメッセージを受け取る日替わり占い</li>
            <li><Link href="/tarot/yes-no" className="text-purple-700 underline hover:text-purple-900 font-medium">YES/NOタロット</Link> — 質問を唱えてカードを引くだけ。迷いにシンプルに答えます</li>
            <li><Link href="/tarot/love" className="text-purple-700 underline hover:text-purple-900 font-medium">恋愛タロット</Link> — 過去・現在・未来の3枚スプレッドで恋の行方を読み解きます</li>
            <li><Link href="/tarot/work" className="text-purple-700 underline hover:text-purple-900 font-medium">仕事タロット</Link> — 現状・課題・アドバイスの3枚スプレッドでキャリアを占います</li>
            <li><span className="font-medium">3択AIタロット</span> — AIが天体配置とカードを組み合わせ、あなただけの解釈をお届けします</li>
          </ul>
          <p>
            正位置・逆位置も反映されるため、同じカードでも毎回異なるメッセージが届きます。
          </p>
          <p className="text-xs text-purple-600/60">
            <Link href="/tarot-guide" className="underline hover:text-purple-800">タロット大アルカナ22枚の詳しい意味はこちら →</Link>
          </p>
        </section>
      </div>
    </div>
  );
}

export default function TarotPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50 flex items-center justify-center"><p className="text-purple-600">読み込み中...</p></div>}>
      <TarotPageInner />
    </Suspense>
  );
}
