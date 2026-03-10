"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import {
  calcLifePathNumber,
  calcPersonalYearNumber,
  NUMEROLOGY_DATA,
  PERSONAL_YEAR_DATA,
} from "../data/numerologyData";
import { buildAffiliateUrl } from "../components/RakutenFortuneItems";

type Phase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();

export default function LuckyNumberPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [lifePathNum, setLifePathNum] = useState(0);
  const [personalYearNum, setPersonalYearNum] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    const y = parseInt(year);
    const m = parseInt(month);
    const d = parseInt(day);

    if (!y || !m || !d || y < 1900 || y > CURRENT_YEAR || m < 1 || m > 12 || d < 1 || d > 31) {
      setError("正しい生年月日を入力してください");
      return;
    }

    const lpn = calcLifePathNumber(y, m, d);
    const pyn = calcPersonalYearNumber(m, d, CURRENT_YEAR);
    setLifePathNum(lpn);
    setPersonalYearNum(pyn);
    setPhase("result");
  };

  const handleReset = () => {
    setPhase("input");
    setYear("");
    setMonth("");
    setDay("");
    setError(null);
  };

  const entry = NUMEROLOGY_DATA[lifePathNum];
  const yearEntry = PERSONAL_YEAR_DATA[personalYearNum];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-900 to-slate-900 flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/" className="text-violet-300 text-sm hover:text-violet-200 hover:underline">
            ← トップに戻る
          </Link>
          <h1 className="text-2xl font-bold text-white mt-2">🔢 数秘術占い</h1>
          <p className="text-slate-400 text-sm mt-1">生年月日からあなたの「ライフパスナンバー」を読み解きます</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-black/20 p-6">
          {phase === "input" ? (
            <div className="space-y-6">
              <div className="text-center space-y-1">
                <p className="text-gray-600 text-sm">生年月日を入力してください</p>
                <p className="text-gray-400 text-xs">すべての数字を足して1桁にした「ライフパスナンバー」を算出します</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">生まれ年</label>
                  <input
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="例：1990"
                    min={1900}
                    max={CURRENT_YEAR}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 placeholder-gray-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">月</label>
                    <select
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-white"
                    >
                      <option value="">-- 月 --</option>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                        <option key={m} value={m}>{m}月</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">日</label>
                    <select
                      value={day}
                      onChange={(e) => setDay(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-white"
                    >
                      <option value="">-- 日 --</option>
                      {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                        <option key={d} value={d}>{d}日</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <button
                onClick={handleSubmit}
                disabled={!year || !month || !day}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
              >
                ライフパスナンバーを調べる →
              </button>

              <div className="bg-violet-50 rounded-2xl p-4 text-xs text-gray-500 space-y-1">
                <p className="font-medium text-violet-700">🔢 ライフパスナンバーとは？</p>
                <p>生年月日のすべての数字を1桁になるまで足し続けた数字です。あなたの人生の目的・性格・才能を示します。</p>
                <p className="text-violet-600 font-medium mt-1">例）1990年3月15日 → 1+9+9+0+3+1+5 = 28 → 2+8 = 10 → 1+0 = 1</p>
              </div>

              <AdBanner />
              <RakutenWidget />
            </div>
          ) : (
            <div className="space-y-5">
              <div className="text-center space-y-1">
                <div className="text-5xl mb-2">{entry.emoji}</div>
                <div className="text-4xl font-black text-purple-700">
                  {lifePathNum}
                  {(lifePathNum === 11 || lifePathNum === 22 || lifePathNum === 33) && (
                    <span className="text-base ml-2 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">
                      Master
                    </span>
                  )}
                </div>
                <p className="text-gray-400 text-xs">あなたのライフパスナンバー</p>
                <h2 className="text-xl font-bold text-purple-800 mt-1">
                  {entry.title}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2 justify-center">
                {entry.keywords.map((kw) => (
                  <span key={kw} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>

              <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-4">
                <p className="font-bold text-purple-700 text-sm mb-2">✨ あなたの本質</p>
                <p className="text-gray-600 text-sm leading-relaxed">{entry.personality}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-3">
                  <p className="text-green-700 font-bold text-xs mb-2">💪 強み</p>
                  <ul className="space-y-1">
                    {entry.strengths.map((s) => (
                      <li key={s} className="text-gray-600 text-xs">・{s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-orange-200 bg-orange-50 p-3">
                  <p className="text-orange-700 font-bold text-xs mb-2">⚠️ 注意点</p>
                  <ul className="space-y-1">
                    {entry.weaknesses.map((w) => (
                      <li key={w} className="text-gray-600 text-xs">・{w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-pink-200 bg-pink-50 p-4">
                <p className="font-bold text-pink-700 text-sm mb-1">💕 恋愛傾向</p>
                <p className="text-gray-600 text-sm leading-relaxed">{entry.love}</p>
              </div>

              <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                <p className="font-bold text-blue-700 text-sm mb-1">💼 仕事・適職</p>
                <p className="text-gray-600 text-sm leading-relaxed">{entry.career}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-purple-200 bg-purple-50 p-3 text-center">
                  <p className="text-purple-600 text-xs font-medium">相性の良い数字</p>
                  <p className="text-purple-800 font-black text-lg mt-1">
                    {entry.compatible.join(" ・ ")}
                  </p>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-3 text-center">
                  <p className="text-gray-500 text-xs font-medium">ラッキーカラー</p>
                  <p className="text-gray-700 font-bold text-sm mt-1">{entry.luckyColor}</p>
                </div>
              </div>

              <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📅</span>
                  <p className="font-bold text-amber-700 text-sm">
                    {CURRENT_YEAR}年の個人年数：{personalYearNum}
                  </p>
                </div>
                <p className="text-amber-800 font-semibold text-sm mb-1">「{yearEntry.theme}」</p>
                <p className="text-gray-600 text-sm leading-relaxed">{yearEntry.message}</p>
              </div>

              <div className="rounded-2xl border-2 border-purple-300 bg-white p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">✨</span>
                  <p className="font-bold text-purple-700 text-sm">開運アイテム</p>
                </div>
                <p className="text-gray-500 text-xs mb-3">
                  ラッキーアイテム：{entry.luckyItem}
                </p>
                <div className="text-center text-xs text-gray-400 mb-2">⭐⭐⭐⭐⭐ おすすめ度</div>
                <a
                  href={buildAffiliateUrl(entry.rakutenKeyword)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 rounded-xl bg-red-500 text-white font-bold text-sm text-center hover:bg-red-600 transition-colors"
                >
                  楽天で開運アイテムを見る →
                </a>
              </div>

              <AdBanner />
              <RakutenWidget />

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
              >
                別の生年月日で調べる
              </button>

              <Link
                href="/"
                className="block w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm text-center hover:bg-purple-700 transition-colors"
              >
                🔮 手相診断を始める
              </Link>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <a href="/privacy" className="text-slate-500 text-xs hover:text-slate-400 hover:underline">
            プライバシーポリシー
          </a>
        </div>
      </div>
    </div>
  );
}
