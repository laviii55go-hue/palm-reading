"use client";

import Link from "next/link";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { getDailyFortuneRanking } from "../data/dailyFortuneData";

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
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <Link href="/" className="text-xs text-rose-700 hover:underline">← トップに戻る</Link>
          <h1 className="text-2xl font-black text-rose-900 mt-3">🏆 今日の運勢ランキング</h1>
          <p className="text-rose-700 text-sm">
            {CURRENT_YEAR}年{CURRENT_MONTH}月{CURRENT_DAY}日
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
          <p className="text-center text-gray-600 text-sm">12星座の今日の運勢をランキング形式で表示</p>
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
                <div className="text-2xl shrink-0">{sign.emoji}</div>
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
      </div>
    </div>
  );
}
