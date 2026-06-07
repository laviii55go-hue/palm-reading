"use client";

import { useState, useEffect } from "react";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";
import AdBanner from "../components/AdBanner";
import PageHeader from "../components/PageHeader";
import RakutenWidget from "../components/RakutenWidget";
import { KYUSEI_DATA, calcHonmeisei, kyuseiYearOf } from "../data/kyuseiData";

type Phase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://uranai-tenohira.jp/kyusei";

// 星番号別カラーテーマ（五行ベース：水/土/木/金/火）
type StarTheme = {
  cardGradient: string;
  subText: string;
  badge: string;
  darkText?: boolean;
};

const STAR_THEMES: Record<number, StarTheme> = {
  1: { cardGradient: "from-slate-600 via-blue-800 to-slate-900", subText: "text-blue-200", badge: "bg-white/15 text-blue-100" },
  2: { cardGradient: "from-amber-200 via-yellow-300 to-amber-400", subText: "text-amber-800", badge: "bg-amber-900/15 text-amber-900", darkText: true },
  3: { cardGradient: "from-emerald-400 via-teal-500 to-cyan-600", subText: "text-emerald-100", badge: "bg-white/20 text-white" },
  4: { cardGradient: "from-green-400 via-emerald-500 to-green-600", subText: "text-green-100", badge: "bg-white/20 text-white" },
  5: { cardGradient: "from-yellow-400 via-amber-500 to-yellow-600", subText: "text-yellow-100", badge: "bg-white/20 text-white" },
  6: { cardGradient: "from-slate-200 via-gray-300 to-slate-400", subText: "text-slate-600", badge: "bg-gray-600/15 text-gray-700", darkText: true },
  7: { cardGradient: "from-rose-400 via-pink-500 to-rose-600", subText: "text-rose-100", badge: "bg-white/20 text-white" },
  8: { cardGradient: "from-stone-500 via-amber-700 to-stone-700", subText: "text-stone-200", badge: "bg-white/15 text-stone-100" },
  9: { cardGradient: "from-red-500 via-rose-600 to-purple-700", subText: "text-red-100", badge: "bg-white/20 text-white" },
};

function DateInputs({
  valYear, valMonth, valDay,
  setValYear, setValMonth, setValDay,
}: {
  valYear: string; valMonth: string; valDay: string;
  setValYear: (v: string) => void;
  setValMonth: (v: string) => void;
  setValDay: (v: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">生まれ年</label>
        <input
          type="number"
          value={valYear}
          onChange={(e) => setValYear(e.target.value)}
          placeholder="例：1990"
          min={1900}
          max={CURRENT_YEAR}
          className="w-full px-4 py-3 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 placeholder-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">月</label>
          <select
            value={valMonth}
            onChange={(e) => setValMonth(e.target.value)}
            className="w-full px-3 py-3 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 bg-white"
          >
            <option value="">月</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={String(m)}>{m}月</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">日</label>
          <select
            value={valDay}
            onChange={(e) => setValDay(e.target.value)}
            className="w-full px-3 py-3 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 bg-white"
          >
            <option value="">日</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={String(d)}>{d}日</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default function KyuseiPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [starNum, setStarNum] = useState(0);
  const [adjustedYear, setAdjustedYear] = useState(0);

  const valid = year && month && day;

  useEffect(() => {
    const saved = getSavedBirthDate();
    if (saved && (saved.year || saved.month || saved.day)) {
      setYear(saved.year);
      setMonth(saved.month);
      setDay(saved.day);
    }
  }, []);

  const handleCalc = () => {
    const y = Number(year);
    const m = Number(month);
    const d = Number(day);
    setStarNum(calcHonmeisei(y, m, d));
    setAdjustedYear(kyuseiYearOf(y, m, d));
    setPhase("result");
  };

  const star = KYUSEI_DATA[starNum];
  const theme = STAR_THEMES[starNum];
  const isRisshunAdjusted = starNum > 0 && adjustedYear !== Number(year);

  const shareText = star
    ? `私の本命星は「${star.emoji} ${star.name}」でした！\n${star.title}タイプ✨\n\nあなたも試してみてください👇\n${PAGE_URL}\n#九星気学 #${star.name} #占い好きな人と繋がりたい #生年月日占い`
    : "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-blue-50">
      <PageHeader
        variant="fortune"
        theme="dream"
        subText="九星気学占い"
        links={[
          { type: "fortune", href: "/sanmeigaku", label: "算命学占い" },
          { type: "fortune", href: "/lucky-number", label: "数秘術占い" },
        ]}
      />
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">

        {/* タイトル */}
        <div className="text-center space-y-1">
          <div className="text-5xl mt-3">🧭</div>
          <h1 className="text-2xl font-black text-indigo-800 mt-2">九星気学占い</h1>
          <p className="text-indigo-600 text-sm">生年月日から「本命星」を割り出す東洋の運命学</p>
        </div>

        {phase === "input" && (
          <div className="bg-white rounded-3xl shadow-sm p-6 space-y-5">
            <h2 className="text-center font-bold text-indigo-800">あなたの生年月日を入力</h2>
            <DateInputs
              valYear={year} valMonth={month} valDay={day}
              setValYear={setYear} setValMonth={setMonth} setValDay={setDay}
            />
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => saveBirthDate(year, month, day)}
                disabled={!valid}
                className="flex-1 py-2 rounded-xl border-2 border-indigo-200 text-indigo-600 text-sm font-semibold disabled:opacity-40"
              >
                保存する
              </button>
              <button
                type="button"
                onClick={() => {
                  clearSavedBirthDate();
                  setYear("");
                  setMonth("");
                  setDay("");
                }}
                className="flex-1 py-2 rounded-xl border-2 border-indigo-200 text-indigo-600 text-sm font-semibold"
              >
                保存を解除
              </button>
            </div>
            <button
              onClick={handleCalc}
              disabled={!valid}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold text-lg disabled:opacity-40 shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              🧭 あなたの本命星を診断する
            </button>
            <p className="text-xs text-center text-gray-400">
              九星（一白水星〜九紫火星）から診断します
              <br />
              ※本命星は立春区切り。立春前の生まれは前年の九星になります
            </p>
          </div>
        )}

        {phase === "result" && star && theme && (
          <div className="space-y-4">
            {/* 本命星カード */}
            <div className={`bg-gradient-to-br ${theme.cardGradient} rounded-3xl p-6 text-center shadow-lg`}>
              <p className={`${theme.subText} text-sm mb-2`}>あなたの本命星は</p>
              <div className="text-7xl mb-3 drop-shadow-md">{star.emoji}</div>
              <div className={`text-3xl font-black mb-1 ${theme.darkText ? "text-gray-800" : "text-white"}`}>{star.name}</div>
              <div className={`${theme.subText} text-sm font-medium`}>
                {star.reading}・{star.title}
              </div>
              <div className={`mt-3 rounded-2xl px-4 py-2 text-sm inline-block ${theme.badge}`}>
                五行：{star.element}（{star.symbol}）
              </div>
              <div className={`mt-2 rounded-2xl px-4 py-2 text-sm ${theme.badge}`}>
                🎨 ラッキーカラー：{star.luckyColor}
              </div>
            </div>

            {/* 立春補正の注記 */}
            {isRisshunAdjusted && (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 text-xs text-indigo-700 leading-relaxed">
                📅 {year}年{month}月{day}日は立春より前の生まれのため、九星気学では
                <span className="font-bold">{adjustedYear}年生まれ</span>
                として本命星を割り出しています。
              </div>
            )}

            {/* 基本性格 */}
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-2">
              <h3 className="font-bold text-indigo-800 flex items-center gap-2">
                <span>🌿</span> 基本性格
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{star.personality}</p>
            </div>

            {/* 恋愛・仕事 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                <div className="text-pink-600 font-bold text-sm mb-2">💕 恋愛</div>
                <p className="text-gray-600 text-xs leading-relaxed">{star.love}</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-blue-600 font-bold text-sm mb-2">💼 仕事</div>
                <p className="text-gray-600 text-xs leading-relaxed">{star.work}</p>
              </div>
            </div>

            {/* 強み・弱み */}
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
              <div>
                <span className="text-indigo-600 font-bold text-sm">💪 強み：</span>
                <span className="text-gray-600 text-sm ml-1">{star.strengths.join("・")}</span>
              </div>
              <div>
                <span className="text-amber-600 font-bold text-sm">⚠️ 弱み：</span>
                <span className="text-gray-600 text-sm ml-1">{star.weaknesses.join("・")}</span>
              </div>
              <div>
                <span className="text-purple-600 font-bold text-sm">🎁 開運アイテム：</span>
                <span className="text-gray-600 text-sm ml-1">{star.luckyItem}</span>
              </div>
            </div>

            {/* シェアボタン */}
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
              <p className="text-center text-sm font-bold text-gray-600">結果をシェアする</p>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                >
                  <span className="text-base">𝕏</span> Xでシェア
                </a>
                <a
                  href={`https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#06C755] text-white text-sm font-bold hover:bg-[#05b34d] transition-colors"
                >
                  <span>💬</span> LINEでシェア
                </a>
              </div>
            </div>

            <button
              onClick={() => setPhase("input")}
              className="w-full py-3 rounded-2xl border-2 border-indigo-200 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors"
            >
              別の生年月日で診断する
            </button>

            <AdBanner />
            <RakutenWidget />
          </div>
        )}
      </div>
    </div>
  );
}
