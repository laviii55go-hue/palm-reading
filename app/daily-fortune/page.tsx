"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { getDailyFortune } from "../data/dailyFortuneData";
import { NUMEROLOGY_DATA } from "../data/numerologyData";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";

type Mode = "numerology" | "zodiac";

const CURRENT_YEAR = new Date().getFullYear();
const CURRENT_MONTH = new Date().getMonth() + 1;
const CURRENT_DAY = new Date().getDate();

export default function DailyFortunePage() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<Mode>("numerology");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phase, setPhase] = useState<"input" | "result">("input");
  const [hasSaved, setHasSaved] = useState(false);

  useEffect(() => {
    const m = searchParams.get("m");
    const d = searchParams.get("d");
    if (m && d) {
      const month = parseInt(m, 10);
      const day = parseInt(d, 10);
      if (month >= 1 && month <= 12 && day >= 1 && day <= 31) {
        setMode("zodiac");
        setBirthMonth(m);
        setBirthDay(d);
        setPhase("result");
        return;
      }
    }
    const saved = getSavedBirthDate();
    if (saved && (saved.year || saved.month || saved.day)) {
      setBirthYear(saved.year);
      setBirthMonth(saved.month);
      setBirthDay(saved.day);
      setHasSaved(true);
    }
  }, [searchParams]);

  const canCalc = mode === "numerology"
    ? birthYear && birthMonth && birthDay
    : birthMonth && birthDay;

  const handleCalc = () => {
    if (!canCalc) return;
    setPhase("result");
  };

  const fortune = phase === "result" && canCalc
    ? getDailyFortune(
        mode,
        CURRENT_YEAR,
        CURRENT_MONTH,
        CURRENT_DAY,
        mode === "numerology" ? Number(birthYear) : undefined,
        Number(birthMonth),
        Number(birthDay)
      )
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-between gap-2">
            <Link href="/" className="text-xs text-rose-700 hover:underline">← トップに戻る</Link>
            <Link href="/daily-fortune-ranking" className="text-xs text-rose-700 hover:underline">🏆 ランキング</Link>
          </div>
          <h1 className="text-2xl font-black text-rose-900 mt-3">📆 今日の運勢</h1>
          <p className="text-rose-700 text-sm">
            {CURRENT_YEAR}年{CURRENT_MONTH}月{CURRENT_DAY}日
          </p>
        </div>

        {phase === "input" && (
          <>
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setMode("numerology")}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm ${mode === "numerology" ? "bg-violet-500 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  数秘術
                </button>
                <button
                  onClick={() => setMode("zodiac")}
                  className={`flex-1 py-2.5 rounded-xl font-bold text-sm ${mode === "zodiac" ? "bg-violet-500 text-white" : "bg-gray-100 text-gray-600"}`}
                >
                  12星座
                </button>
              </div>

              {mode === "numerology" && (
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm font-bold">生年月日を入力</p>
                  <div className="flex gap-2 flex-wrap">
                    <input
                      type="number"
                      placeholder="年"
                      value={birthYear}
                      onChange={(e) => setBirthYear(e.target.value)}
                      className="w-20 rounded-xl border-2 border-rose-200 px-3 py-2 text-center"
                      min={1900}
                      max={2100}
                    />
                    <input
                      type="number"
                      placeholder="月"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-14 rounded-xl border-2 border-rose-200 px-3 py-2 text-center"
                      min={1}
                      max={12}
                    />
                    <input
                      type="number"
                      placeholder="日"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-14 rounded-xl border-2 border-rose-200 px-3 py-2 text-center"
                      min={1}
                      max={31}
                    />
                  </div>
                </div>
              )}

              {mode === "zodiac" && (
                <div className="space-y-2">
                  <p className="text-gray-600 text-sm font-bold">生まれ月・日を入力</p>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="月"
                      value={birthMonth}
                      onChange={(e) => setBirthMonth(e.target.value)}
                      className="w-20 rounded-xl border-2 border-rose-200 px-3 py-2 text-center"
                      min={1}
                      max={12}
                    />
                    <input
                      type="number"
                      placeholder="日"
                      value={birthDay}
                      onChange={(e) => setBirthDay(e.target.value)}
                      className="w-20 rounded-xl border-2 border-rose-200 px-3 py-2 text-center"
                      min={1}
                      max={31}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                {hasSaved ? (
                  <button
                    type="button"
                    onClick={() => {
                      clearSavedBirthDate();
                      setHasSaved(false);
                    }}
                    className="flex-1 py-2 rounded-xl border-2 border-rose-200 text-rose-600 text-sm font-semibold"
                  >
                    保存を解除
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (birthYear && birthMonth && birthDay) {
                        saveBirthDate(birthYear, birthMonth, birthDay);
                        setHasSaved(true);
                      }
                    }}
                    disabled={mode === "numerology" ? (!birthYear || !birthMonth || !birthDay) : (!birthMonth || !birthDay)}
                    className="flex-1 py-2 rounded-xl border-2 border-rose-200 text-rose-600 text-sm font-semibold disabled:opacity-40"
                  >
                    保存する
                  </button>
                )}
              </div>

              <button
                onClick={handleCalc}
                disabled={!canCalc}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold disabled:opacity-40 shadow-md"
              >
                📆 今日の運勢を見る
              </button>
              <Link
                href="/daily-fortune-ranking"
                className="block w-full py-2.5 rounded-xl border-2 border-amber-200 text-amber-700 text-sm font-semibold text-center hover:bg-amber-50"
              >
                🏆 今日の運勢ランキング
              </Link>
            </div>
            <AdBanner />
          </>
        )}

        {phase === "result" && fortune && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white text-center shadow-lg">
              <p className="text-rose-200 text-sm mb-1">今日の運勢</p>
              {fortune.type === "numerology" && fortune.num && (
                <div className="text-2xl font-black">
                  {NUMEROLOGY_DATA[Number(fortune.num)]?.emoji} ライフパスナンバー【{fortune.num}】
                </div>
              )}
              {fortune.type === "zodiac" && fortune.sign && (
                <div className="text-2xl font-black">
                  {fortune.sign.emoji} {fortune.sign.name}
                </div>
              )}
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-4">
              <div>
                <span className="text-pink-600 font-bold text-sm">💕 恋愛運</span>
                <p className="text-gray-600 text-sm mt-1">{fortune.love}</p>
              </div>
              <div>
                <span className="text-amber-600 font-bold text-sm">💰 金運</span>
                <p className="text-gray-600 text-sm mt-1">{fortune.money}</p>
              </div>
              <div>
                <span className="text-blue-600 font-bold text-sm">💼 仕事運</span>
                <p className="text-gray-600 text-sm mt-1">{fortune.work}</p>
              </div>
              <div>
                <span className="text-rose-600 font-bold text-sm">✨ 総合運</span>
                <p className="text-gray-600 text-sm mt-1">{fortune.total}</p>
              </div>
            </div>

            <AdBanner />
            <RakutenWidget />

            <Link
              href="/daily-fortune-ranking"
              className="block w-full py-3 rounded-2xl border-2 border-amber-200 text-amber-700 font-semibold text-sm text-center hover:bg-amber-50"
            >
              🏆 今日の運勢ランキングを見る
            </Link>
            <button
              onClick={() => setPhase("input")}
              className="w-full py-3 rounded-2xl border-2 border-rose-200 text-rose-600 font-semibold text-sm hover:bg-rose-50"
            >
              別の生年月日で見る
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
