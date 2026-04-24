"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import AdBanner from "../components/AdBanner";
import PageHeader from "../components/PageHeader";
import RakutenWidget from "../components/RakutenWidget";
import { getDailyFortune } from "../data/dailyFortuneData";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";

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

function DailyFortuneContent() {
  const searchParams = useSearchParams();
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
        setBirthMonth(String(month));
        setBirthDay(String(day));
        setPhase("result");
        return;
      }
    }
    const saved = getSavedBirthDate();
    if (saved && (saved.month || saved.day)) {
      setBirthMonth(saved.month);
      setBirthDay(saved.day);
      setHasSaved(true);
    }
  }, [searchParams]);

  const canCalc = birthMonth && birthDay;

  const handleCalc = () => {
    if (!canCalc) return;
    setPhase("result");
  };

  const fortune = phase === "result" && canCalc
    ? getDailyFortune(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, Number(birthMonth), Number(birthDay))
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50">
      <PageHeader
        variant="fortune"
        theme="daily"
        subText="今日の運勢"
        links={[
          { type: "fortune", href: "/daily-fortune-ranking", label: "ランキング", icon: "🏆" },
          { type: "guide", href: "/daily-fortune-ranking-guide" },
        ]}
      />
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-black text-rose-900 mt-3">📆 今日の運勢</h1>
          <p className="text-rose-700 text-sm">
            {CURRENT_YEAR}年{CURRENT_MONTH}月{CURRENT_DAY}日
          </p>
        </div>

        {phase === "input" && (
          <>
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-4">
              <div className="space-y-2">
                <p className="text-gray-600 text-sm font-bold">生まれ月・日を入力（12星座）</p>
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
                      if (birthMonth && birthDay) {
                        saveBirthDate("", birthMonth, birthDay);
                        setHasSaved(true);
                      }
                    }}
                    disabled={!birthMonth || !birthDay}
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
          </>
        )}

        {phase === "result" && fortune && fortune.type === "zodiac" && fortune.sign && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white text-center shadow-lg">
              <p className="text-rose-200 text-sm mb-1">今日の運勢</p>
              <div className="flex items-center justify-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <Image
                      src={ZODIAC_IMAGES[fortune.sign.id] ?? "/zodiac/aries.webp"}
                      alt={fortune.sign.name}
                      fill
                      className="object-contain"
                      sizes="56px"
                    />
                  </div>
                  <span className="text-2xl font-black">{fortune.sign.name}</span>
                </div>
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
              別の星座で見る
            </button>

            <AdBanner />
            <RakutenWidget />
          </div>
        )}
      </div>
    </div>
  );
}

export default function DailyFortunePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 flex items-center justify-center">
        <p className="text-rose-600 font-medium">読み込み中...</p>
      </div>
    }>
      <DailyFortuneContent />
    </Suspense>
  );
}
