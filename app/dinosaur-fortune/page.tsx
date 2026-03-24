"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import TopBannerLink from "../components/TopBannerLink";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import { calcLifePathNumber } from "../data/numerologyData";
import { DINOSAUR_DATA, getDinosaurCompatibility } from "../data/dinosaurData";

type Tab = "personal" | "compatibility";
type PersonalPhase = "input" | "result";
type CompatPhase = "input" | "result";
type CompatInputMode = "birthdate" | "number";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://jade-torte-9b5cde.netlify.app/dinosaur-fortune";
const DINOSAUR_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33] as const;

const COMPAT_CATEGORIES = [
  { key: "love", label: "恋愛の相性", emoji: "💕" },
  { key: "work", label: "仕事の相性", emoji: "💼" },
  { key: "friendship", label: "友情の相性", emoji: "🤝" },
  { key: "parent", label: "親子の相性", emoji: "👨‍👩‍👧" },
  { key: "family", label: "家族の相性", emoji: "🏠" },
];

function DateInputs({
  labelYear,
  labelMonth,
  labelDay,
  valYear,
  valMonth,
  valDay,
  setValYear,
  setValMonth,
  setValDay,
}: {
  labelYear: string;
  labelMonth: string;
  labelDay: string;
  valYear: string;
  valMonth: string;
  valDay: string;
  setValYear: (v: string) => void;
  setValMonth: (v: string) => void;
  setValDay: (v: string) => void;
}) {
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
          className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelMonth}</label>
          <select
            value={valMonth}
            onChange={(e) => setValMonth(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 bg-white"
          >
            <option value="">-- 月 --</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}月
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelDay}</label>
          <select
            value={valDay}
            onChange={(e) => setValDay(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 bg-white"
          >
            <option value="">-- 日 --</option>
            {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
              <option key={d} value={d}>
                {d}日
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

function NumberSelector({
  label,
  selectedNum,
  onSelect,
  accentColor,
}: {
  label: string;
  selectedNum: number;
  onSelect: (n: number) => void;
  accentColor: "emerald" | "amber";
}) {
  const isEmerald = accentColor === "emerald";
  return (
    <div className="space-y-2">
      <p className={`text-sm font-bold ${isEmerald ? "text-emerald-700" : "text-amber-700"}`}>
        {label}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {DINOSAUR_NUMBERS.map((n) => {
          const entry = DINOSAUR_DATA[n];
          const isSelected = selectedNum === n;
          return (
            <button
              key={n}
              type="button"
              onClick={() => onSelect(n)}
              className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 transition-all ${
                isSelected
                  ? isEmerald
                    ? "border-emerald-500 bg-emerald-100 shadow-md"
                    : "border-amber-500 bg-amber-100 shadow-md"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              {entry.image ? (
                <Image
                  src={entry.image}
                  alt={entry.name}
                  width={40}
                  height={40}
                  className="object-contain mb-0.5"
                />
              ) : (
                <span className="text-2xl">{entry.emoji}</span>
              )}
              <span className="text-[10px] text-gray-600 truncate w-full text-center font-medium">
                {entry.name}
              </span>
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
        <span key={i} className={i < score ? "text-amber-400" : "text-gray-200"}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function DinosaurFortunePage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");

  // 個人診断
  const [personalPhase, setPersonalPhase] = useState<PersonalPhase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [lifePathNum, setLifePathNum] = useState(0);
  const [personalError, setPersonalError] = useState<string | null>(null);

  // 相性診断
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

  const handlePersonalSubmit = () => {
    setPersonalError(null);
    const y = parseInt(year),
      m = parseInt(month),
      d = parseInt(day);
    if (!y || !m || !d || y < 1900 || y > CURRENT_YEAR || m < 1 || m > 12 || d < 1 || d > 31) {
      setPersonalError("正しい生年月日を入力してください");
      return;
    }
    setLifePathNum(calcLifePathNumber(y, m, d));
    setPersonalPhase("result");
  };

  const handlePersonalReset = () => {
    setPersonalPhase("input");
    setYear("");
    setMonth("");
    setDay("");
    setPersonalError(null);
  };

  const handleCompatSubmit = () => {
    setCompatError(null);
    if (compatInputMode === "birthdate") {
      const my = parseInt(myYear),
        mm = parseInt(myMonth),
        md = parseInt(myDay);
      const py = parseInt(partnerYear),
        pm = parseInt(partnerMonth),
        pd = parseInt(partnerDay);
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
        setCompatError("あなたと相手の恐竜タイプを選んでください");
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
    setMyYear("");
    setMyMonth("");
    setMyDay("");
    setPartnerYear("");
    setPartnerMonth("");
    setPartnerDay("");
    setCompatMyNum(0);
    setCompatPartnerNum(0);
    setCompatError(null);
    setOpenCategory(null);
  };

  const handleChangePartnerOnly = () => {
    setCompatPhase("input");
    if (compatInputMode === "birthdate") {
      setPartnerYear("");
      setPartnerMonth("");
      setPartnerDay("");
    } else {
      setCompatPartnerNum(0);
    }
    setCompatError(null);
    setOpenCategory(null);
  };

  const personalEntry = DINOSAUR_DATA[lifePathNum];
  const myEntry = DINOSAUR_DATA[myNum];
  const partnerEntry = DINOSAUR_DATA[partnerNum];
  const compat = myNum && partnerNum ? getDinosaurCompatibility(myNum, partnerNum) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-green-800 to-teal-900 flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-between mb-3 gap-2">
            <TopBannerLink />
            <Link
              href="/dinosaur-guide"
              className="text-emerald-200 text-xs border border-emerald-500 rounded-full px-3 py-1 hover:bg-emerald-500/20 transition-colors"
            >
              📖 恐竜図鑑
            </Link>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg shadow-black/30 bg-gradient-to-br from-emerald-600 to-teal-600 p-8">
            <div className="text-6xl mb-2">🦖🦕</div>
            <h1 className="text-2xl font-bold text-white">恐竜占い</h1>
            <p className="text-emerald-100 text-sm mt-1">生年月日からあなたの恐竜タイプを診断！</p>
          </div>
        </div>

        <div className="flex rounded-2xl bg-white/10 p-1 mb-4 gap-1">
          {[
            { id: "personal" as Tab, label: "🦖 自分の恐竜" },
            { id: "compatibility" as Tab, label: "💞 相性診断" },
          ].map((tab) => (
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
                  ? "bg-white text-emerald-700 shadow"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-black/20 p-6">
          {/* 個人診断 */}
          {activeTab === "personal" && (
            personalPhase === "input" ? (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <p className="text-gray-600 text-sm">生年月日を入力してください</p>
                  <p className="text-gray-400 text-xs">
                    生年月日からあなたの恐竜タイプを診断するよ！
                  </p>
                </div>

                <DateInputs
                  labelYear="生まれ年"
                  labelMonth="月"
                  labelDay="日"
                  valYear={year}
                  valMonth={month}
                  valDay={day}
                  setValYear={setYear}
                  setValMonth={setMonth}
                  setValDay={setDay}
                />

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => saveBirthDate(year, month, day)}
                    disabled={!year || !month || !day}
                    className="flex-1 py-2 rounded-xl border-2 border-emerald-200 text-emerald-600 text-sm font-semibold disabled:opacity-40"
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
                    className="flex-1 py-2 rounded-xl border-2 border-emerald-200 text-emerald-600 text-sm font-semibold"
                  >
                    保存を解除
                  </button>
                </div>

                {personalError && <p className="text-red-500 text-sm text-center">{personalError}</p>}

                <button
                  onClick={handlePersonalSubmit}
                  disabled={!year || !month || !day}
                  className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-emerald-700 transition-colors shadow-md"
                >
                  恐竜タイプを診断する →
                </button>

                <div className="bg-emerald-50 rounded-2xl p-4 text-xs text-gray-500 space-y-1">
                  <p className="font-medium text-emerald-700">🦖 診断の仕組みが知りたい？</p>
                  <p>恐竜図鑑で詳しく解説してるよ！</p>
                  <Link
                    href="/dinosaur-guide#how"
                    className="block text-center mt-2 text-emerald-600 font-semibold hover:underline"
                  >
                    📖 恐竜図鑑で仕組みを見る →
                  </Link>
                </div>

                <AdBanner />
                <RakutenWidget />
              </div>
            ) : personalEntry ? (
              <div className="space-y-5">
                {/* 発見スタイルのメインカード */}
                <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white text-center shadow-lg">
                  <p className="text-emerald-100 text-sm mb-2">発見！あなたの恐竜は…</p>
                  <div className="flex justify-center mb-3">
                    {personalEntry.image ? (
                      <Image
                        src={personalEntry.image}
                        alt={personalEntry.name}
                        width={96}
                        height={96}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-7xl">{personalEntry.emoji}</span>
                    )}
                  </div>
                  <h2 className="text-2xl font-black">{personalEntry.name}</h2>
                  {(lifePathNum === 11 || lifePathNum === 22 || lifePathNum === 33) && (
                    <span className="inline-block mt-2 bg-amber-400/30 text-amber-100 px-3 py-1 rounded-full text-xs font-bold">
                      レアタイプ！
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 justify-center">
                  {personalEntry.keywords.map((kw) => (
                    <span
                      key={kw}
                      className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                    >
                      {kw}
                    </span>
                  ))}
                </div>

                <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-sm">
                  <p className="text-gray-600 text-sm leading-relaxed">{personalEntry.personality}</p>
                </div>

                <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4">
                  <p className="font-bold text-amber-800 text-sm mb-2">💪 きみのすごいところ＆ちょっときをつけよう</p>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p className="text-green-700 font-semibold mb-1">✨ すごいところ</p>
                      <ul className="space-y-0.5 text-gray-600">
                        {personalEntry.strengths.map((s) => (
                          <li key={s}>・{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-amber-700 font-semibold mb-1">🛡️ ちょっときをつけよう</p>
                      <ul className="space-y-0.5 text-gray-600">
                        {personalEntry.weaknesses.map((w) => (
                          <li key={w}>・{w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border-2 border-pink-200 bg-pink-50 p-4">
                    <p className="font-bold text-pink-700 text-xs mb-1">💕 恋愛</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{personalEntry.love}</p>
                  </div>
                  <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                    <p className="font-bold text-blue-700 text-xs mb-1">💼 仕事</p>
                    <p className="text-gray-600 text-xs leading-relaxed">{personalEntry.career}</p>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
                  <p className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
                    <span>💞</span> 相性が良い恐竜
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {personalEntry.compatible.map((n) => {
                      const other = DINOSAUR_DATA[n];
                      return (
                        <Link
                          key={n}
                          href={`/dinosaur-guide/${n}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-800 hover:bg-green-200 transition-colors"
                        >
                          {other?.image ? (
                            <Image src={other.image} alt={other.name} width={20} height={20} className="object-contain" />
                          ) : (
                            <span>{other?.emoji}</span>
                          )}
                          <span className="font-bold">{other?.name ?? ""}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">相性が難しい恐竜</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {personalEntry.incompatible.map((n) => {
                      const other = DINOSAUR_DATA[n];
                      return (
                        <Link
                          key={n}
                          href={`/dinosaur-guide/${n}`}
                          className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm text-amber-800 hover:bg-amber-200 transition-colors"
                        >
                          {other?.image ? (
                            <Image src={other.image} alt={other.name} width={20} height={20} className="object-contain" />
                          ) : (
                            <span>{other?.emoji}</span>
                          )}
                          <span className="font-bold">{other?.name ?? ""}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>

                <Link
                  href={`/dinosaur-guide/${lifePathNum}`}
                  className="block w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-lg text-center hover:bg-emerald-700 transition-colors shadow-md"
                >
                  📖 {personalEntry.name}の詳細を見る →
                </Link>

                <button
                  onClick={handlePersonalReset}
                  className="w-full py-3 rounded-xl border-2 border-emerald-300 text-emerald-700 font-semibold hover:bg-emerald-50 transition-colors"
                >
                  別の生年月日で調べる
                </button>

                <Link
                  href="/lucky-number"
                  className="block w-full py-3 rounded-xl bg-violet-600 text-white font-semibold text-sm text-center hover:bg-violet-700 transition-colors"
                >
                  🔢 数秘術占いも試す
                </Link>

                <AdBanner />
                <RakutenWidget />
              </div>
            ) : null
          )}

          {/* 相性診断 */}
          {activeTab === "compatibility" && (
            compatPhase === "input" ? (
              <div className="space-y-6">
                <div className="text-center space-y-1">
                  <div className="text-4xl">💞</div>
                  <p className="text-gray-600 text-sm mt-1">2人の恐竜タイプの相性を診断します</p>
                </div>

                <div className="flex rounded-xl bg-gray-100 p-1 gap-1">
                  <button
                    type="button"
                    onClick={() => setCompatInputMode("birthdate")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      compatInputMode === "birthdate" ? "bg-white text-emerald-700 shadow" : "text-gray-500"
                    }`}
                  >
                    📅 生年月日で選ぶ
                  </button>
                  <button
                    type="button"
                    onClick={() => setCompatInputMode("number")}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                      compatInputMode === "number" ? "bg-white text-emerald-700 shadow" : "text-gray-500"
                    }`}
                  >
                    🦖 恐竜タイプで選ぶ
                  </button>
                </div>

                {compatInputMode === "birthdate" ? (
                  <>
                    <div
                      className={`rounded-2xl border-2 p-4 space-y-3 ${
                        myYear && myMonth && myDay ? "border-emerald-200 bg-emerald-50/50" : "border-emerald-200"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-bold text-emerald-700">👤 あなた</p>
                        {myYear && myMonth && myDay && (
                          <span className="text-xs text-emerald-500 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {myYear}/{myMonth}/{myDay} 入力済み
                          </span>
                        )}
                      </div>
                      <DateInputs
                        labelYear="生まれ年"
                        labelMonth="月"
                        labelDay="日"
                        valYear={myYear}
                        valMonth={myMonth}
                        valDay={myDay}
                        setValYear={setMyYear}
                        setValMonth={setMyMonth}
                        setValDay={setMyDay}
                      />
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => saveBirthDate(myYear, myMonth, myDay)}
                          disabled={!myYear || !myMonth || !myDay}
                          className="flex-1 py-2 rounded-xl border-2 border-emerald-200 text-emerald-600 text-sm font-semibold disabled:opacity-40"
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
                          className="flex-1 py-2 rounded-xl border-2 border-emerald-200 text-emerald-600 text-sm font-semibold"
                        >
                          保存を解除
                        </button>
                      </div>
                    </div>

                    <div className="rounded-2xl border-2 border-amber-200 p-4 space-y-3">
                      <p className="text-sm font-bold text-amber-800">🦖 相手</p>
                      <DateInputs
                        labelYear="生まれ年"
                        labelMonth="月"
                        labelDay="日"
                        valYear={partnerYear}
                        valMonth={partnerMonth}
                        valDay={partnerDay}
                        setValYear={setPartnerYear}
                        setValMonth={setPartnerMonth}
                        setValDay={setPartnerDay}
                      />
                    </div>

                    <button
                      onClick={handleCompatSubmit}
                      disabled={
                        !myYear ||
                        !myMonth ||
                        !myDay ||
                        !partnerYear ||
                        !partnerMonth ||
                        !partnerDay
                      }
                      className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold text-lg disabled:opacity-40 hover:bg-amber-600 transition-colors shadow-md"
                    >
                      相性を診断する →
                    </button>
                  </>
                ) : (
                  <>
                    <div className="rounded-2xl border-2 border-emerald-200 p-4 space-y-3">
                      <NumberSelector
                        label="👤 あなた"
                        selectedNum={compatMyNum}
                        onSelect={setCompatMyNum}
                        accentColor="emerald"
                      />
                    </div>

                    <div className="rounded-2xl border-2 border-amber-200 p-4 space-y-3">
                      <NumberSelector
                        label="🦖 相手"
                        selectedNum={compatPartnerNum}
                        onSelect={setCompatPartnerNum}
                        accentColor="amber"
                      />
                    </div>

                    <button
                      onClick={handleCompatSubmit}
                      disabled={!compatMyNum || !compatPartnerNum}
                      className="w-full py-3 rounded-xl bg-amber-500 text-white font-bold text-lg disabled:opacity-40 hover:bg-amber-600 transition-colors shadow-md"
                    >
                      相性を診断する →
                    </button>
                  </>
                )}

                {compatError && <p className="text-red-500 text-sm text-center">{compatError}</p>}

                <AdBanner />
                <RakutenWidget />
              </div>
            ) : compat && myEntry && partnerEntry ? (
              <div className="space-y-5">
                <div className="text-center space-y-2">
                  <div className="text-3xl">💞</div>
                  <h2 className="text-lg font-bold text-gray-800">恐竜相性診断結果</h2>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Link
                    href={`/dinosaur-guide/${myNum}`}
                    className="text-center flex-1 rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-3 hover:bg-emerald-100 hover:shadow-md transition-all active:scale-95 block"
                  >
                    <div className="flex justify-center">
                      {myEntry.image ? (
                        <Image src={myEntry.image} alt={myEntry.name} width={48} height={48} className="object-contain" />
                      ) : (
                        <span className="text-2xl">{myEntry.emoji}</span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-emerald-700">{myEntry.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">あなた</div>
                    <div className="text-[10px] text-emerald-400 mt-1">詳細を見る →</div>
                  </Link>
                  <div className="text-3xl text-amber-400">×</div>
                  <Link
                    href={`/dinosaur-guide/${partnerNum}`}
                    className="text-center flex-1 rounded-2xl border-2 border-amber-200 bg-amber-50 p-3 hover:bg-amber-100 hover:shadow-md transition-all active:scale-95 block"
                  >
                    <div className="flex justify-center">
                      {partnerEntry.image ? (
                        <Image src={partnerEntry.image} alt={partnerEntry.name} width={48} height={48} className="object-contain" />
                      ) : (
                        <span className="text-2xl">{partnerEntry.emoji}</span>
                      )}
                    </div>
                    <div className="text-sm font-bold text-amber-700">{partnerEntry.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">相手</div>
                    <div className="text-[10px] text-amber-400 mt-1">詳細を見る →</div>
                  </Link>
                </div>

                <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 to-yellow-50 p-4 text-center">
                  <p className="text-xs text-gray-500 mb-1">総合相性スコア</p>
                  <div className="flex justify-center text-2xl mb-1">
                    <StarScore score={compat.score} />
                  </div>
                  <p className="text-amber-700 font-bold text-sm">{compat.score}/5</p>
                </div>

                <div className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
                  <p className="font-bold text-emerald-700 text-sm mb-2">✨ 総合相性</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{compat.general}</p>
                </div>

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
                        <span className="text-gray-400 text-sm">
                          {openCategory === cat.key ? "▲" : "▼"}
                        </span>
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

                <AdBanner />
                <RakutenWidget />

                <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 space-y-3">
                  <p className="text-center text-sm font-medium text-gray-500">📣 結果をシェアする</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `🦖 恐竜占い 相性診断結果\n${myEntry.name} × ${partnerEntry.name}\n総合相性：${"★".repeat(compat.score)}${"☆".repeat(5 - compat.score)}\n\nあなたも試してみて！\n${PAGE_URL}\n#恐竜占い #相性診断`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                    >
                      X でシェア
                    </a>
                    <a
                      href={`https://line.me/R/msg/text/?${encodeURIComponent(
                        `🦖 恐竜占い 相性診断結果\n${myEntry.name} × ${partnerEntry.name}\n総合相性：${"★".repeat(compat.score)}${"☆".repeat(5 - compat.score)}\n\nあなたも試してみて！\n${PAGE_URL}\n#恐竜占い #相性診断`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors"
                    >
                      LINE でシェア
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleChangePartnerOnly}
                    className="py-3 rounded-xl bg-amber-500 text-white font-bold text-sm hover:bg-amber-600 transition-colors"
                  >
                    🦖 相手だけ変える
                  </button>
                  <button
                    onClick={handleCompatReset}
                    className="py-3 rounded-xl border-2 border-gray-300 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    最初からやり直す
                  </button>
                </div>

                <Link
                  href="/"
                  className="block w-full py-3 rounded-xl bg-emerald-600 text-white font-semibold text-sm text-center hover:bg-emerald-700 transition-colors"
                >
                  🔮 手相診断を始める
                </Link>
              </div>
            ) : null
          )}
        </div>

        <FooterLinks className="text-center mt-4" linkClassName="text-emerald-200 text-xs hover:text-white hover:underline" />
      </div>
    </div>
  );
}
