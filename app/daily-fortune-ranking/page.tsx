"use client";

import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import FortunePageHero from "../components/FortunePageHero";
import FortunePageShell from "../components/FortunePageShell";
import RakutenWidget from "../components/RakutenWidget";
import { fortuneContentCard } from "../lib/fortuneDesign";
import { getDailyFortuneRanking } from "../data/dailyFortuneData";

// 星座ID → 画像パス（牡羊座0〜魚座11）
const ZODIAC_IMAGES: Record<number, string> = {
  0: "/zodiac/aries.webp",
  1: "/zodiac/taurus.webp",
  2: "/zodiac/gemini.webp",
  3: "/zodiac/cancer.webp",
  4: "/zodiac/leo.webp",
  5: "/zodiac/virgo.webp",
  6: "/zodiac/libra.webp",
  7: "/zodiac/scorpio.webp",
  8: "/zodiac/sagittarius.webp",
  9: "/zodiac/capricorn.webp",
  10: "/zodiac/aquarius.webp",
  11: "/zodiac/pisces.webp",
};

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;
const CURRENT_DAY = new Date().getDate();

const RANK_STYLES: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "bg-amber-100", text: "text-amber-800", border: "border-amber-300" },
  2: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  3: { bg: "bg-orange-100", text: "text-orange-800", border: "border-orange-300" },
};

export default function DailyFortuneRankingPage() {
  const ranking = getDailyFortuneRanking(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY);

  return (
    <FortunePageShell
      variant="fortune"
      theme="daily"
      subText="今日の運勢ランキング"
      links={[
        { type: "guide", href: "/daily-fortune-ranking-guide" },
        { type: "fortune", href: "/daily-fortune", label: "個人運勢", icon: "📆" },
      ]}
    >
      <FortunePageHero
        theme="daily"
        badge="毎日更新"
        imageSrc="/daily-fortune-ranking-top.webp"
        title="🏆 今日の運勢ランキング"
        description={`${CURRENT_YEAR}年${CURRENT_MONTH}月${CURRENT_DAY}日`}
      />

        <div className={`${fortuneContentCard} p-5 space-y-3`}>
          <p className="text-center text-gray-600 text-xs leading-relaxed">
            その日の惑星配置（トランシット）をもとに
            <br />
            12星座の運勢をランキング表示
          </p>
          {ranking.map(({ rank, sign, advice }) => {
            const style = RANK_STYLES[rank] ?? { bg: "bg-white", text: "text-gray-700", border: "border-gray-200" };
            const href = `/daily-fortune?m=${sign.month}&d=${sign.day}`;
            return (
              <Link
                key={sign.id}
                href={href}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 ${style.border} ${style.bg} hover:shadow-md transition-all active:scale-[0.99]`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black ${style.text} shrink-0`}>
                  {rank}
                </div>
                <div className="w-12 h-12 shrink-0 relative">
                  <Image
                    src={ZODIAC_IMAGES[sign.id] ?? "/zodiac/aries.webp"}
                    alt={sign.name}
                    fill
                    className="object-contain"
                    sizes="48px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`font-bold ${style.text}`}>{sign.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{advice}</div>
                </div>
                <div className="text-teal-400 text-sm shrink-0">→</div>
              </Link>
            );
          })}
        </div>

        <Link
          href="/daily-fortune"
          className="block w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-center shadow-md"
        >
          📆 あなたの今日の運勢を見る
        </Link>

        <AdBanner />
        <RakutenWidget />
    </FortunePageShell>
  );
}
