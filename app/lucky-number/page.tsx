"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import PageHeader from "../components/PageHeader";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import {
  calcLifePathNumber,
  calcPersonalYearNumber,
  NUMEROLOGY_DATA,
  PERSONAL_YEAR_DATA,
  getCompatibility,
} from "../data/numerologyData";

type Tab = "personal" | "compatibility";
type PersonalPhase = "input" | "result";
type CompatPhase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://uranai-tenohira.jp/lucky-number";

type DateInputsProps = {
  labelYear: string; labelMonth: string; labelDay: string;
  valYear: string; valMonth: string; valDay: string;
  setValYear: (v: string) => void; setValMonth: (v: string) => void; setValDay: (v: string) => void;
};

function DateInputs({
  labelYear, labelMonth, labelDay,
  valYear, valMonth, valDay,
  setValYear, setValMonth, setValDay,
}: DateInputsProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{labelYear}</label>
        <input
          type="number"
          value={valYear}
          onChange={(e) => setValYear(e.target.value)}
          placeholder="例：1990"
          min={1900}
          max={CURRENT_YEAR}
          className="w-full px-4 py-3 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 placeholder-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelMonth}</label>
          <select
            value={valMonth}
            onChange={(e) => setValMonth(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-purple-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 text-gray-700 bg-white"
          >
            <option value="">-- 月 --</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}月</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelDay}</label>
          <select
            value={valDay}
            onChange={(e) => setValDay(e.target.value)}
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
  );
}

const COMPAT_CATEGORIES = [
  { key: "love", label: "恋愛の相性", emoji: "💕" },
  { key: "work", label: "仕事の相性", emoji: "💼" },
  { key: "friendship", label: "友情の相性", emoji: "🤝" },
  { key: "parent", label: "親子の相性", emoji: "👨‍👩‍👧" },
  { key: "family", label: "家族の相性", emoji: "🏠" },
];

const COMPAT_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

type CompatInputMode = "birthdate" | "number";

function NumberSelector({
  label,
  selectedNum,
  onSelect,
  accentColor,
}: {
  label: string;
  selectedNum: number;
  onSelect: (n: number) => void;
  accentColor: "purple" | "pink";
}) {
  const isPurple = accentColor === "purple";
  return (
    <div className="space-y-2">
      <p className={`text-sm font-bold ${isPurple ? "text-purple-700" : "text-pink-600"}`}>{label}</p>
      <div className="grid grid-cols-4 gap-2">
        {COMPAT_NUMBERS.map((n) => {
          const entry = NUMEROLOGY_DATA[n];
          const isSelected = selectedNum === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onSelect(n)}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 transition-all ${
                isSelected
                  ? isPurple
                    ? "border-purple-500 bg-purple-100 shadow-md"
                    : "border-pink-500 bg-pink-100 shadow-md"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              <span className="text-lg">{entry.emoji}</span>
              <span className={`text-sm font-black ${isPurple ? "text-purple-700" : "text-pink-600"}`}>{n}</span>
              <span className="text-[10px] text-gray-500 truncate w-full text-center">{entry.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StarScore({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < score ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

export default function LuckyNumberPage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  // ── 個人数秘術 ──
  const [personalPhase, setPersonalPhase] = useState<PersonalPhase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [lifePathNum, setLifePathNum] = useState(0);
  const [personalYearNum, setPersonalYearNum] = useState(0);
  const [personalError, setPersonalError] = useState<string | null>(null);

  // ── 相性診断 ──
  const [compatPhase, setCompatPhase] = useState<CompatPhase>("input");
  const [compatInputMode, setCompatInputMode] = useState<CompatInputMode>("birthdate");
  const [myYear, setMyYear] = useState("");
  const [myMonth, setMyMonth] = useState("");
  const [myDay, setMyDay] = useState("");
  const [partnerYear, setPartnerYear] = useState("");
  const [partnerMonth, setPartnerMonth] = useState("");
  const [partnerDay, setPartnerDay] = useState("");
  const [compatMyNum, setCompatMyNum] = useState(0);
  const [compatPartnerNum, setCompatPartnerNum] = useState(0);
  const [myNum, setMyNum] = useState(0);
  const [partnerNum, setPartnerNum] = useState(0);
  const [compatError, setCompatError] = useState<string | null>(null);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    const saved = getSavedBirthDate();
    if (saved && (saved.year || saved.month || saved.day)) {
      setYear(saved.year);
      setMonth(saved.month);
      setDay(saved.day);
      setMyYear(saved.year);
      setMyMonth(saved.month);
      setMyDay(saved.day);
    }
  }, []);

  // ── ハンドラ：個人 ──
  const handlePersonalSubmit = () => {
    setPersonalError(null);
    const y = parseInt(year), m = parseInt(month), d = parseInt(day);
    if (!y || !m || !d || y < 1900 || y > CURRENT_YEAR || m < 1 || m > 12 || d < 1 || d > 31) {
      setPersonalError("正しい生年月日を入力してください");
      return;
    }
    setLifePathNum(calcLifePathNumber(y, m, d));
    setPersonalYearNum(calcPersonalYearNumber(m, d, CURRENT_YEAR));
    setPersonalPhase("result");
  };

  const handlePersonalReset = () => {
    setPersonalPhase("input");
    setYear(""); setMonth(""); setDay("");
    setPersonalError(null);
  };

  // ── ハンドラ：相性 ──
  const handleCompatSubmit = () => {
    setCompatError(null);
    if (compatInputMode === "birthdate") {
      const my = parseInt(myYear), mm = parseInt(myMonth), md = parseInt(myDay);
      const py = parseInt(partnerYear), pm = parseInt(partnerMonth), pd = parseInt(partnerDay);
      if (!my || !mm || !md || my < 1900 || my > CURRENT_YEAR || mm < 1 || mm > 12 || md < 1 || md > 31) {
        setCompatError("あなたの生年月日を正しく入力してください");
        return;
      }
      if (!py || !pm || !pd || py < 1900 || py > CURRENT_YEAR || pm < 1 || pm > 12 || pd < 1 || pd > 31) {
        setCompatError("相手の生年月日を正しく入力してください");
        return;
      }
      setMyNum(calcLifePathNumber(my, mm, md));
      setPartnerNum(calcLifePathNumber(py, pm, pd));
    } else {
      if (!compatMyNum || !compatPartnerNum) {
        setCompatError("あなたと相手の数秘術№を選んでください");
        return;
      }
      setMyNum(compatMyNum);
      setPartnerNum(compatPartnerNum);
    }
    setCompatPhase("result");
    setOpenCategory(null);
  };

  const handleCompatReset = () => {
    setCompatPhase("input");
    setMyYear(""); setMyMonth(""); setMyDay("");
    setPartnerYear(""); setPartnerMonth(""); setPartnerDay("");
    setCompatMyNum(0); setCompatPartnerNum(0);
    setCompatError(null);
    setOpenCategory(null);
  };

  const handleChangePartnerOnly = () => {
    setCompatPhase("input");
    if (compatInputMode === "birthdate") {
      setPartnerYear(""); setPartnerMonth(""); setPartnerDay("");
    } else {
      setCompatPartnerNum(0);
    }
    setCompatError(null);
    setOpenCategory(null);
  };

  const goToPersonalResult = (y: string, m: string, d: string) => {
    const yn = parseInt(y), mn = parseInt(m), dn = parseInt(d);
    setYear(y); setMonth(m); setDay(d);
    setLifePathNum(calcLifePathNumber(yn, mn, dn));
    setPersonalYearNum(calcPersonalYearNumber(mn, dn, CURRENT_YEAR));
    setPersonalPhase("result");
    setActiveTab("personal");
  };

  const personalEntry = NUMEROLOGY_DATA[lifePathNum];
  const yearEntry = PERSONAL_YEAR_DATA[personalYearNum];
  const myEntry = NUMEROLOGY_DATA[myNum];
  const partnerEntry = NUMEROLOGY_DATA[partnerNum];
  const compat = myNum && partnerNum ? getCompatibility(myNum, partnerNum) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-900 to-slate-900 flex flex-col items-center p-0">
      <PageHeader
        variant="fortune"
        theme="numerology"
        subText="数秘術占い"
        dark
        links={[
          { type: "guide", href: "/numerology-guide" },
          { type: "articles", href: "/numerology-guide/articles" },
        ]}
      />
      <div className="w-full max-w-lg p-4">
        <div className="text-center mb-6">
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/30">
            <Image
              src="/numerology-top.webp"
              alt="数秘術占い"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-white mt-3">🔢 数秘術占い</h1>
          <p className="text-slate-400 text-sm mt-1">生年月日からあなたの運命数を読み解きます</p>
        </div>

        {/* タブ */}
        <div className="flex rounded-2xl bg-white/10 p-1 mb-4 gap-1">
          {([
            { id: "personal", label: "🔢 個人数秘術" },
            { id: "compatibility", label: "💞 相性診断" },
          ] as { id: Tab; label: string }[]).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id === "compatibility") {
                  const saved = getSavedBirthDate();
                  if (saved && (saved.year || saved.month || saved.day)) {
                    setMyYear(saved.year);
                    setMyMonth(saved.month);
                    setMyDay(saved.day);
                  }
                }
              }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-white text-purple-700 shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-black/20 p-6">

          {/* ══ 個人数秘術タブ ══ */}
          {activeTab === "personal" && (
            personalPhase === "input" ? (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <p className="text-gray-600 text-sm">生年月日を入力してください</p>
                  <p className="text-gray-400 text-xs">すべての数字を足して1桁にした「ライフパスナンバー」を算出します</p>
                </div>

                <DateInputs
                  labelYear="生まれ年" labelMonth="月" labelDay="日"
                  valYear={year} valMonth={month} valDay={day}
                  setValYear={setYear} setValMonth={setMonth} setValDay={setDay}
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => saveBirthDate(year, month, day)}
                    disabled={!year || !month || !day}
                    className="flex-1 py-2 rounded-xl border-2 border-purple-200 text-purple-600 text-sm font-semibold disabled:opacity-40"
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
                    className="flex-1 py-2 rounded-xl border-2 border-purple-200 text-purple-600 text-sm font-semibold"
                  >
                    保存を解除
                  </button>
                </div>

                {personalError && <p className="text-red-500 text-sm text-center">{personalError}</p>}

                <button
                  onClick={handlePersonalSubmit}
                  disabled={!year || !month || !day}
                  className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
                >
                  ライフパスナンバーを調べる →
                </button>

                <div className="bg-violet-50 rounded-2xl p-4 text-xs text-gray-500 space-y-1">
                  <p className="font-medium text-violet-700">🔢 ライフパスナンバーとは？</p>
                  <p>生年月日のすべての数字を1桁になるまで足し続けた数字です。あなたの人生の目的・性格・才能を示します。</p>
                  <p className="text-violet-600 font-medium mt-1">例）1990年3月15日 → 1+9+9+0+3+1+5 = 28 → 2+8 = 10 → 1+0 = 1</p>
                  <Link href="/numerology-guide" className="block text-center mt-2 text-violet-600 font-semibold hover:underline">
                    📖 数秘術の基本知識を読む →
                  </Link>
                </div>
              </div>
            ) : personalEntry && yearEntry ? (
              <div className="space-y-5">
                <div className="text-center space-y-1">
                  <div className="text-5xl mb-2">{personalEntry.emoji}</div>
                  <div className="text-4xl font-black text-purple-700">
                    {lifePathNum}
                    {(lifePathNum === 11 || lifePathNum === 22 || lifePathNum === 33) && (
                      <span className="text-base ml-2 bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-bold">Master</span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs">あなたのライフパスナンバー</p>
                  <h2 className="text-xl font-bold text-purple-800 mt-1">{personalEntry.title}</h2>
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {personalEntry.keywords.map((kw) => (
                    <span key={kw} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">{kw}</span>
                  ))}
                </div>

                <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-4">
                  <p className="font-bold text-purple-700 text-sm mb-2">✨ あなたの本質</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{personalEntry.personality}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-green-200 bg-green-50 p-3">
                    <p className="text-green-700 font-bold text-xs mb-2">💪 強み</p>
                    <ul className="space-y-1">
                      {personalEntry.strengths.map((s) => <li key={s} className="text-gray-600 text-xs">・{s}</li>)}
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-orange-200 bg-orange-50 p-3">
                    <p className="text-orange-700 font-bold text-xs mb-2">⚠️ 注意点</p>
                    <ul className="space-y-1">
                      {personalEntry.weaknesses.map((w) => <li key={w} className="text-gray-600 text-xs">・{w}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-pink-200 bg-pink-50 p-4">
                  <p className="font-bold text-pink-700 text-sm mb-1">💕 恋愛傾向</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{personalEntry.love}</p>
                </div>

                <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="font-bold text-blue-700 text-sm mb-1">💼 仕事・適職</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{personalEntry.career}</p>
                </div>

                {/* 相性（詳細） */}
                <div className="rounded-2xl border-2 border-violet-100 bg-white p-5">
                  <p className="font-bold text-violet-800 flex items-center gap-2 mb-3">
                    <span>💞</span> 相性
                  </p>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-green-600 font-semibold mb-2">相性が良い数字</p>
                      <div className="flex flex-wrap gap-2">
                        {personalEntry.compatible.map((n) => {
                          const other = NUMEROLOGY_DATA[n];
                          return (
                            <Link
                              key={n}
                              href={`/numerology-guide/${n}`}
                              className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-800 hover:bg-green-200 transition-colors"
                            >
                              <span className="font-bold">{n}</span>
                              <span className="text-xs">{other?.title ?? ""}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-rose-600 font-semibold mb-2">相性が難しい数字</p>
                      <div className="flex flex-wrap gap-2">
                        {personalEntry.incompatible.map((n) => {
                          const other = NUMEROLOGY_DATA[n];
                          return (
                            <Link
                              key={n}
                              href={`/numerology-guide/${n}`}
                              className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-sm text-rose-800 hover:bg-rose-200 transition-colors"
                            >
                              <span className="font-bold">{n}</span>
                              <span className="text-xs">{other?.title ?? ""}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ラッキー（詳細） */}
                <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-5">
                  <p className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                    <span>🍀</span> ラッキー
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-amber-600 font-semibold mb-1">ラッキーカラー</p>
                      <p className="text-sm font-medium text-gray-800">{personalEntry.luckyColor}</p>
                    </div>
                    <div>
                      <p className="text-xs text-amber-600 font-semibold mb-1">ラッキーアイテム</p>
                      <p className="text-sm font-medium text-gray-800">{personalEntry.luckyItem}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">📅</span>
                    <p className="font-bold text-amber-700 text-sm">{CURRENT_YEAR}年の個人年数：{personalYearNum}</p>
                  </div>
                  <p className="text-amber-800 font-semibold text-sm mb-1">「{yearEntry.theme}」</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{yearEntry.message}</p>
                </div>

                <button
                  onClick={() => {
                    setMyYear(year);
                    setMyMonth(month);
                    setMyDay(day);
                    setPartnerYear("");
                    setPartnerMonth("");
                    setPartnerDay("");
                    setCompatPhase("input");
                    setCompatError(null);
                    setOpenCategory(null);
                    setActiveTab("compatibility");
                  }}
                  className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold text-sm hover:bg-pink-600 transition-colors"
                >
                  💞 相性診断へ（相手の情報を入力） →
                </button>

                {(() => {
                  const shareText = `🔢 数秘術占い結果\nライフパスナンバー【${lifePathNum}】${personalEntry.emoji} ${personalEntry.title}\n${personalEntry.keywords.slice(0, 3).join("・")}\n📅 ${CURRENT_YEAR}年のテーマ：${yearEntry.theme}\n\nあなたも試してみてください👇\n${PAGE_URL}\n#数秘術 #占い好きな人と繋がりたい #生年月日占い`;
                  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
                  return (
                    <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 space-y-3">
                      <p className="text-center text-sm font-medium text-gray-500">📣 結果をシェアする</p>
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

                <button onClick={handlePersonalReset}
                  className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors">
                  別の生年月日で調べる
                </button>

                <Link href="/" className="block w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm text-center hover:bg-purple-700 transition-colors">
                  🔮 他の占いを試す
                </Link>

                <AdBanner />
                <RakutenWidget />
              </div>
            ) : null
          )}

          {/* ══ 相性診断タブ ══ */}
          {activeTab === "compatibility" && (
            compatPhase === "input" ? (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <div className="text-4xl">💞</div>
                  <p className="text-gray-600 text-sm mt-1">2人の相性を診断します</p>
                </div>

                {/* 入力モード切替 */}
                <div className="flex rounded-xl bg-gray-100 p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setCompatInputMode("birthdate")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      compatInputMode === "birthdate" ? "bg-white text-purple-700 shadow" : "text-gray-500"
                    }`}
                  >
                    📅 生年月日で選ぶ
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompatInputMode("number")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      compatInputMode === "number" ? "bg-white text-purple-700 shadow" : "text-gray-500"
                    }`}
                  >
                    🔢 数秘術№で選ぶ
                  </button>
                </div>

                {compatInputMode === "birthdate" ? (
                  <>
                    <div className={`rounded-2xl border-2 p-4 space-y-3 ${myYear && myMonth && myDay ? "border-purple-200 bg-purple-50/50" : "border-purple-200"}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-purple-700">👤 あなた</p>
                        {myYear && myMonth && myDay && (
                          <span className="text-xs text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full">
                            {myYear}/{myMonth}/{myDay} 入力済み
                          </span>
                        )}
                      </div>
                      <DateInputs
                        labelYear="生まれ年" labelMonth="月" labelDay="日"
                        valYear={myYear} valMonth={myMonth} valDay={myDay}
                        setValYear={setMyYear} setValMonth={setMyMonth} setValDay={setMyDay}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveBirthDate(myYear, myMonth, myDay)}
                          disabled={!myYear || !myMonth || !myDay}
                          className="flex-1 py-2 rounded-xl border-2 border-purple-200 text-purple-600 text-sm font-semibold disabled:opacity-40"
                        >
                          保存する
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            clearSavedBirthDate();
                            setMyYear("");
                            setMyMonth("");
                            setMyDay("");
                          }}
                          className="flex-1 py-2 rounded-xl border-2 border-purple-200 text-purple-600 text-sm font-semibold"
                        >
                          保存を解除
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border-2 border-pink-200 p-4 space-y-3">
                      <p className="text-sm font-bold text-pink-600">💕 相手</p>
                      <DateInputs
                        labelYear="生まれ年" labelMonth="月" labelDay="日"
                        valYear={partnerYear} valMonth={partnerMonth} valDay={partnerDay}
                        setValYear={setPartnerYear} setValMonth={setPartnerMonth} setValDay={setPartnerDay}
                      />
                    </div>

                    <button
                      onClick={handleCompatSubmit}
                      disabled={!myYear || !myMonth || !myDay || !partnerYear || !partnerMonth || !partnerDay}
                      className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold text-lg disabled:opacity-40 hover:bg-pink-600 transition-colors shadow-md"
                    >
                      相性を診断する →
                    </button>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border-2 border-purple-200 p-4 space-y-3">
                      <NumberSelector
                        label="👤 あなた"
                        selectedNum={compatMyNum}
                        onSelect={setCompatMyNum}
                        accentColor="purple"
                      />
                    </div>

                    <div className="rounded-2xl border-2 border-pink-200 p-4 space-y-3">
                      <NumberSelector
                        label="💕 相手"
                        selectedNum={compatPartnerNum}
                        onSelect={setCompatPartnerNum}
                        accentColor="pink"
                      />
                    </div>

                    <button
                      onClick={handleCompatSubmit}
                      disabled={!compatMyNum || !compatPartnerNum}
                      className="w-full py-3 rounded-xl bg-pink-500 text-white font-bold text-lg disabled:opacity-40 hover:bg-pink-600 transition-colors shadow-md"
                    >
                      相性を診断する →
                    </button>
                  </>
                )}

                {compatError && <p className="text-red-500 text-sm text-center">{compatError}</p>}
              </div>
            ) : compat && myEntry && partnerEntry ? (
              <div className="space-y-5">
                <div className="text-center space-y-2">
                  <div className="text-3xl">💞</div>
                  <h2 className="text-lg font-bold text-gray-800">相性診断結果</h2>
                </div>

                {/* 2人のナンバー表示 */}
                <div className="flex items-center justify-center gap-4">
                  {compatInputMode === "birthdate" && myYear && myMonth && myDay ? (
                    <button
                      onClick={() => goToPersonalResult(myYear, myMonth, myDay)}
                      className="text-center flex-1 rounded-2xl border-2 border-purple-200 bg-purple-50 p-3 hover:bg-purple-100 hover:shadow-md transition-all active:scale-95"
                    >
                      <div className="text-2xl">{myEntry.emoji}</div>
                      <div className="text-2xl font-black text-purple-700">{myNum}</div>
                      <div className="text-xs text-purple-600 font-medium">{myEntry.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        あなた（{myYear}/{myMonth}/{myDay}）
                      </div>
                      <div className="text-[10px] text-purple-400 mt-1">タップで個人鑑定 →</div>
                    </button>
                  ) : (
                    <Link
                      href={`/numerology-guide/${myNum}`}
                      className="text-center flex-1 rounded-2xl border-2 border-purple-200 bg-purple-50 p-3 hover:bg-purple-100 hover:shadow-md transition-all active:scale-95 block"
                    >
                      <div className="text-2xl">{myEntry.emoji}</div>
                      <div className="text-2xl font-black text-purple-700">{myNum}</div>
                      <div className="text-xs text-purple-600 font-medium">{myEntry.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">あなた（№{myNum}）</div>
                      <div className="text-[10px] text-purple-400 mt-1">詳細を見る →</div>
                    </Link>
                  )}
                  <div className="text-3xl text-pink-400">×</div>
                  {compatInputMode === "birthdate" && partnerYear && partnerMonth && partnerDay ? (
                    <button
                      onClick={() => goToPersonalResult(partnerYear, partnerMonth, partnerDay)}
                      className="text-center flex-1 rounded-2xl border-2 border-pink-200 bg-pink-50 p-3 hover:bg-pink-100 hover:shadow-md transition-all active:scale-95"
                    >
                      <div className="text-2xl">{partnerEntry.emoji}</div>
                      <div className="text-2xl font-black text-pink-600">{partnerNum}</div>
                      <div className="text-xs text-pink-600 font-medium">{partnerEntry.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">
                        相手（{partnerYear}/{partnerMonth}/{partnerDay}）
                      </div>
                      <div className="text-[10px] text-pink-400 mt-1">タップで個人鑑定 →</div>
                    </button>
                  ) : (
                    <Link
                      href={`/numerology-guide/${partnerNum}`}
                      className="text-center flex-1 rounded-2xl border-2 border-pink-200 bg-pink-50 p-3 hover:bg-pink-100 hover:shadow-md transition-all active:scale-95 block"
                    >
                      <div className="text-2xl">{partnerEntry.emoji}</div>
                      <div className="text-2xl font-black text-pink-600">{partnerNum}</div>
                      <div className="text-xs text-pink-600 font-medium">{partnerEntry.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">相手（№{partnerNum}）</div>
                      <div className="text-[10px] text-pink-400 mt-1">詳細を見る →</div>
                    </Link>
                  )}
                </div>

                {/* 総合スコア */}
                <div className="rounded-2xl border-2 border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">総合相性スコア</p>
                  <div className="flex justify-center text-2xl mb-1">
                    <StarScore score={compat.score} />
                  </div>
                  <p className="text-amber-700 font-bold text-sm">{compat.score}/5</p>
                </div>

                {/* 総合コメント */}
                <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-violet-50 p-4">
                  <p className="font-bold text-purple-700 text-sm mb-2">✨ 総合相性</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{compat.general}</p>
                </div>

                {/* カテゴリ別（アコーディオン） */}
                <div className="space-y-2">
                  <p className="text-xs font-medium text-gray-400 text-center">カテゴリ別の相性を見る</p>
                  {COMPAT_CATEGORIES.map((cat) => (
                    <div key={cat.key} className="rounded-2xl border-2 border-gray-200 overflow-hidden">
                      <button
                        onClick={() => setOpenCategory(openCategory === cat.key ? null : cat.key)}
                        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{cat.emoji}</span>
                          <span className="font-semibold text-gray-700 text-sm">{cat.label}</span>
                        </div>
                        <span className="text-gray-400 text-sm">{openCategory === cat.key ? "▲" : "▼"}</span>
                      </button>
                      {openCategory === cat.key && (
                        <div className="px-4 pb-4 bg-gray-50">
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {compat[cat.key as keyof typeof compat] as string}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* シェアボタン */}
                {(() => {
                  const shareText = `💞 数秘術 相性診断結果\nライフパスナンバー【${myNum}】×【${partnerNum}】\n総合相性：${"★".repeat(compat.score)}${"☆".repeat(5 - compat.score)}\n\nあなたも試してみてください👇\n${PAGE_URL}\n#数秘術 #相性診断 #占い好きな人と繋がりたい`;
                  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
                  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
                  return (
                    <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 space-y-3">
                      <p className="text-center text-sm font-medium text-gray-500">📣 結果をシェアする</p>
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
                  <button onClick={handleChangePartnerOnly}
                    className="py-3 rounded-xl bg-pink-500 text-white font-bold text-sm hover:bg-pink-600 transition-colors">
                    💕 相手だけ変える
                  </button>
                  <button onClick={handleCompatReset}
                    className="py-3 rounded-xl border-2 border-gray-300 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors">
                    最初からやり直す
                  </button>
                </div>

                <Link href="/" className="block w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm text-center hover:bg-purple-700 transition-colors">
                  🔮 他の占いを試す
                </Link>

                <AdBanner />
                <RakutenWidget />
              </div>
            ) : null
          )}
        </div>

        <FooterLinks className="text-center mt-4" linkClassName="text-slate-500 text-xs hover:text-slate-400 hover:underline" />
      </div>
    </div>
  );
}
