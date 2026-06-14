"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";
import FortunePageShell from "../components/FortunePageShell";
import { fortunePageDescription, fortunePageTitle } from "../lib/fortuneDesign";
import FooterLinks from "../components/FooterLinks";
import {
  calcSanmei,
  calcFortune,
  nextTenchusatsuYears,
  type SanmeiResult,
  type FortuneNow,
  type TenchusatsuYears,
} from "../lib/sanmei/engine";
import { sanmeiYearNumber } from "../lib/sanmei/calendar";
import {
  MAIN_STARS,
  SUB_STARS,
  ENERGY_BANDS,
  POSITION_LABELS,
  TENCHUSATSU_INFO,
} from "../data/sanmeiTextData";

type Phase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://uranai-tenohira.jp/sanmeigaku";

// ── 入力フォーム ──────────────────────────────────────

function DateInputs({
  valYear, valMonth, valDay,
  setValYear, setValMonth, setValDay,
}: {
  valYear: string; valMonth: string; valDay: string;
  setValYear: (v: string) => void; setValMonth: (v: string) => void; setValDay: (v: string) => void;
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
          className="w-full px-4 py-3 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700 placeholder-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">月</label>
          <select
            value={valMonth}
            onChange={(e) => setValMonth(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700 bg-white"
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
            value={valDay}
            onChange={(e) => setValDay(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-amber-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-700 bg-white"
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

// ── 人体星図セル ──────────────────────────────────────

function StarCell({
  posKey,
  starName,
}: {
  posKey: keyof typeof POSITION_LABELS;
  starName: keyof typeof MAIN_STARS;
}) {
  const pos = POSITION_LABELS[posKey];
  const star = MAIN_STARS[starName];
  return (
    <div className="rounded-xl border-2 border-amber-200 bg-white p-2 text-center space-y-0.5">
      <p className="text-[10px] text-amber-600 font-semibold">{pos.label}（{pos.relation}）</p>
      <p className="text-sm font-black text-gray-800">{star.emoji} {star.name}</p>
      <p className="text-[10px] text-gray-400">{star.reading}</p>
    </div>
  );
}

// ── ページ本体 ────────────────────────────────────────

export default function SanmeigakuPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<SanmeiResult | null>(null);
  const [fortune, setFortune] = useState<FortuneNow | null>(null);
  const [tenchuYears, setTenchuYears] = useState<TenchusatsuYears | null>(null);

  useEffect(() => {
    const saved = getSavedBirthDate();
    if (saved && (saved.year || saved.month || saved.day)) {
      setYear(saved.year);
      setMonth(saved.month);
      setDay(saved.day);
    }
  }, []);

  const handleSubmit = () => {
    setError(null);
    const y = parseInt(year), m = parseInt(month), d = parseInt(day);
    if (!y || !m || !d || y < 1900 || y > CURRENT_YEAR || m < 1 || m > 12 || d < 1 || d > 31) {
      setError("正しい生年月日を入力してください");
      return;
    }
    const dateCheck = new Date(y, m - 1, d);
    if (dateCheck.getMonth() !== m - 1 || dateCheck.getDate() !== d) {
      setError("存在しない日付です");
      return;
    }
    const now = new Date();
    const sanmeiResult = calcSanmei(y, m, d);
    setResult(sanmeiResult);
    setFortune(
      calcFortune(
        { year: y, month: m, day: d },
        { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
      )
    );
    setTenchuYears(
      nextTenchusatsuYears(
        sanmeiResult.tenchusatsu,
        sanmeiYearNumber(now.getFullYear(), now.getMonth() + 1, now.getDate())
      )
    );
    setPhase("result");
  };

  const chestStar = result ? MAIN_STARS[result.jintai.chest] : null;
  const bandInfo = result ? ENERGY_BANDS[result.energyBand] : null;
  const tenchu = result ? TENCHUSATSU_INFO[result.tenchusatsu] : null;

  const shareText = result
    ? `私の算命学タイプは「${result.typeName}」でした！\n中心の星は ${MAIN_STARS[result.jintai.chest].emoji} ${result.jintai.chest}✨\nエネルギーは ${result.energyTotal}点（${bandInfo?.typeLabel}）\n\nあなたも生年月日だけで試せます👇\n${PAGE_URL}\n#算命学 #占い好きな人と繋がりたい #生年月日占い`
    : "";

  return (
    <FortunePageShell
      variant="fortune"
      theme="amber"
      subText="算命学占い"
      links={[
        { type: "fortune", href: "/lucky-number", label: "数秘術占い" },
        { type: "fortune", href: "/daily-fortune", label: "今日の運勢" },
      ]}
    >
        <div className="text-center space-y-2">
          <h1 className={fortunePageTitle}>🌅 算命学占い</h1>
          <p className={fortunePageDescription}>
            生年月日から命式を算出し、あなたの持ち味と
            <br />
            今年・今月・今日の流れをやさしく読み解きます
          </p>
        </div>

        {phase === "input" ? (
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-6">
            <div className="text-center space-y-1">
              <p className="text-gray-600 text-sm">生年月日を入力してください</p>
              <p className="text-gray-400 text-xs">十大主星・十二大従星・エネルギー点数を無料で算出します</p>
            </div>

            <DateInputs
              valYear={year} valMonth={month} valDay={day}
              setValYear={setYear} setValMonth={setMonth} setValDay={setDay}
            />

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => saveBirthDate(year, month, day)}
                disabled={!year || !month || !day}
                className="flex-1 py-2 rounded-xl border-2 border-amber-200 text-amber-600 text-sm font-semibold disabled:opacity-40"
              >
                保存する
              </button>
              <button
                type="button"
                onClick={() => {
                  clearSavedBirthDate();
                  setYear(""); setMonth(""); setDay("");
                }}
                className="flex-1 py-2 rounded-xl border-2 border-amber-200 text-amber-600 text-sm font-semibold"
              >
                保存を解除
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={!year || !month || !day}
              className="w-full py-3 rounded-xl bg-amber-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-amber-700 transition-colors shadow-md"
            >
              命式を見る →
            </button>

            <div className="bg-amber-50 rounded-2xl p-4 text-xs text-gray-500 space-y-1">
              <p className="font-medium text-amber-700">🌅 算命学とは？</p>
              <p>
                生年月日を干支暦に置き換えて、生まれ持った性質（十大主星）とエネルギーのかたち（十二大従星）を読み解く、古くから伝わる自己理解の体系です。
              </p>
              <p>
                当たる・当たらないで占うより、「自分の持ち味と、今の流れを知る」ための暦として楽しめます。
              </p>
            </div>
          </div>
        ) : result && fortune && chestStar && bandInfo && tenchu ? (
          <div className="space-y-5">

            {/* タイプ名 */}
            <div className="bg-white rounded-3xl shadow-md p-6 text-center space-y-2">
              <p className="text-gray-400 text-xs">あなたは</p>
              <h2 className="text-2xl font-black text-stone-800">「{result.typeName}」</h2>
              <div className="flex flex-wrap gap-2 justify-center mt-2">
                {chestStar.keywords.map((kw) => (
                  <span key={kw} className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                    {kw}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 text-[11px] mt-2">
                命式：{result.pillars.year.stem}{result.pillars.year.branch}年・
                {result.pillars.month.stem}{result.pillars.month.branch}月・
                {result.pillars.day.stem}{result.pillars.day.branch}日生まれ
              </p>
            </div>

            {/* 人体星図 */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-3">
              <p className="font-bold text-stone-700 text-sm text-center">🗺️ あなたの人体星図（五つの星）</p>
              <div className="grid grid-cols-3 gap-2">
                <div />
                <StarCell posKey="head" starName={result.jintai.head} />
                <div />
                <StarCell posKey="rightHand" starName={result.jintai.rightHand} />
                <StarCell posKey="chest" starName={result.jintai.chest} />
                <StarCell posKey="leftHand" starName={result.jintai.leftHand} />
                <div />
                <StarCell posKey="belly" starName={result.jintai.belly} />
                <div />
              </div>
              <p className="text-gray-400 text-[10px] text-center">
                それぞれの場所は、その相手・場面であなたが見せる顔を表します
              </p>
            </div>

            {/* 本質（胸の星） */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-4">
              <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
                <p className="font-bold text-amber-700 text-sm mb-2">
                  ✨ あなたの本質 — {chestStar.emoji} {chestStar.name}（{chestStar.reading}）
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">{chestStar.core}</p>
              </div>

              <div className="space-y-3">
                {(
                  [
                    ["head", result.jintai.head],
                    ["belly", result.jintai.belly],
                    ["rightHand", result.jintai.rightHand],
                    ["leftHand", result.jintai.leftHand],
                  ] as const
                ).map(([posKey, starName]) => (
                  <div key={posKey} className="rounded-xl bg-stone-50 p-3">
                    <p className="text-xs font-bold text-stone-600 mb-1">
                      {POSITION_LABELS[posKey].label}（{POSITION_LABELS[posKey].relation}）：{MAIN_STARS[starName].name}
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed">
                      {MAIN_STARS[starName].positions[posKey]}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-blue-200 bg-blue-50 p-4">
                <p className="font-bold text-blue-700 text-sm mb-1">💼 向いている働き方</p>
                <p className="text-gray-600 text-sm leading-relaxed">{chestStar.workStyle}</p>
              </div>
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4">
                <p className="font-bold text-green-700 text-sm mb-1">🤝 人間関係の傾向</p>
                <p className="text-gray-600 text-sm leading-relaxed">{chestStar.relation}</p>
              </div>
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="font-bold text-rose-700 text-sm mb-1">🍀 無理しない方がいいこと</p>
                <p className="text-gray-600 text-sm leading-relaxed">{chestStar.selfCare}</p>
              </div>
            </div>

            {/* エネルギー（十二大従星） */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-4">
              <p className="font-bold text-stone-700 text-sm text-center">🔥 あなたのエネルギー（十二大従星）</p>

              {(
                [
                  ["early", "初年期（〜20代前半）", result.jusei.early],
                  ["middle", "中年期（20代後半〜60代）", result.jusei.middle],
                  ["late", "晩年期（60代以降）", result.jusei.late],
                ] as const
              ).map(([key, label, starName]) => {
                const star = SUB_STARS[starName];
                return (
                  <div key={key} className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-amber-600 font-semibold">{label}</p>
                      <p className="text-xs font-black text-amber-700">{star.points}点</p>
                    </div>
                    <p className="font-bold text-stone-800 text-sm">
                      {star.name}（{star.reading}）<span className="text-gray-400 text-xs font-normal">— {star.stageLabel}</span>
                    </p>
                    <p className="text-gray-600 text-xs leading-relaxed">{star.periods[key]}</p>
                  </div>
                );
              })}

              <div className="rounded-2xl bg-gradient-to-br from-stone-700 to-stone-800 text-white p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold">エネルギー総点数</p>
                  <p className="text-xl font-black">{result.energyTotal}<span className="text-xs font-normal text-white/60">/36点</span></p>
                </div>
                <div className="h-2 rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${Math.round((result.energyTotal / 36) * 100)}%` }}
                  />
                </div>
                <p className="text-sm font-bold text-amber-300">{bandInfo.label}・{bandInfo.typeLabel}</p>
                <p className="text-white/80 text-xs leading-relaxed">{bandInfo.description}</p>
              </div>
            </div>

            {/* 天中殺 */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-2">
              <p className="font-bold text-stone-700 text-sm">🌙 あなたの天中殺：{tenchu.name}</p>
              <p className="text-gray-600 text-xs leading-relaxed">{tenchu.trait}</p>
              {tenchuYears && (
                <div
                  className={`rounded-xl p-3 ${
                    tenchuYears.isNow ? "bg-indigo-50 border border-indigo-200" : "bg-stone-50"
                  }`}
                >
                  <p className="text-xs font-bold text-stone-700">
                    {tenchuYears.isNow
                      ? `🌙 いまは天中殺の期間中です（${tenchuYears.startYear}年〜${tenchuYears.endYear}年）`
                      : `次の天中殺の年：${tenchuYears.startYear}年・${tenchuYears.endYear}年`}
                  </p>
                  <p className="text-gray-500 text-[10px] mt-0.5">
                    {tenchuYears.isNow
                      ? "焦って広げるより、学び・整理・足元固めがいっそう実りやすい2年間です。"
                      : "前もって知っておくと、その2年間を「整える時間」として上手に使えます。"}
                  </p>
                </div>
              )}
              <p className="text-gray-400 text-[10px]">
                ※ 天中殺は「悪い時期」ではなく、整理・充電・学びに向く時間帯の目印です（年の区切りは立春）
              </p>
            </div>

            {/* 今の流れ（年・月・日） */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-4">
              <p className="font-bold text-stone-700 text-sm text-center">📅 いまのあなたの流れ</p>

              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4 space-y-1">
                <p className="text-xs text-amber-600 font-semibold">今年のテーマ</p>
                <p className="font-bold text-stone-800">
                  {MAIN_STARS[fortune.year.mainStar].yearTheme.title}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {MAIN_STARS[fortune.year.mainStar].yearTheme.text}
                </p>
                <p className="text-amber-700 text-xs font-medium">
                  → {MAIN_STARS[fortune.year.mainStar].yearTheme.action}
                </p>
                {fortune.year.isTenchusatsu && (
                  <p className="text-stone-500 text-[11px] mt-1">
                    🌙 今年はあなたの天中殺の年。新しく広げるより、学び・整理・足元固めがいっそう実りやすい時期です。
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-orange-200 bg-orange-50 p-4 space-y-1">
                <p className="text-xs text-orange-600 font-semibold">今月のテーマ</p>
                <p className="font-bold text-stone-800">
                  {MAIN_STARS[fortune.month.mainStar].monthTheme.title}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {MAIN_STARS[fortune.month.mainStar].monthTheme.text}
                </p>
                <p className="text-orange-700 text-xs font-medium">
                  → {MAIN_STARS[fortune.month.mainStar].monthTheme.action}
                </p>
                {fortune.month.isTenchusatsu && (
                  <p className="text-stone-500 text-[11px] mt-1">
                    🌙 今月はあなたの天中殺の月。判断を急がず、見直しと準備に向いています。
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 space-y-1">
                <p className="text-xs text-rose-600 font-semibold">今日の流れ</p>
                <p className="font-bold text-stone-800">
                  「{MAIN_STARS[fortune.day.mainStar].dayTheme.tag}」
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {MAIN_STARS[fortune.day.mainStar].dayTheme.text}
                </p>
                <p className="text-rose-700 text-xs font-medium">
                  → {MAIN_STARS[fortune.day.mainStar].dayTheme.action}
                </p>
              </div>

              <p className="text-gray-400 text-[10px] text-center">
                流れは毎日変わります。ブックマークして毎日チェックがおすすめです
              </p>
            </div>

            {/* シェア */}
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

            {/* 他の占いへ */}
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
              <p className="text-center text-sm font-bold text-gray-600">あわせて楽しむ</p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/lucky-number"
                  className="text-center py-3 rounded-2xl border-2 border-violet-200 text-violet-600 text-sm font-bold hover:bg-violet-50 transition-colors"
                >
                  🔢 数秘術占い
                </Link>
                <Link
                  href="/daily-fortune"
                  className="text-center py-3 rounded-2xl border-2 border-rose-200 text-rose-600 text-sm font-bold hover:bg-rose-50 transition-colors"
                >
                  🌅 今日の運勢
                </Link>
              </div>
            </div>

            <button
              onClick={() => setPhase("input")}
              className="w-full py-3 rounded-2xl border-2 border-amber-200 text-amber-600 font-semibold text-sm hover:bg-amber-50 transition-colors"
            >
              ← 別の生年月日で見る
            </button>
          </div>
        ) : null}

        <p className="text-gray-400 text-[10px] text-center leading-relaxed">
          本コンテンツは算命学の考え方をもとにした自己理解・エンタメコンテンツです。
          <br />
          未来や運命を断定するものではありません。
        </p>

        <FooterLinks />
    </FortunePageShell>
  );
}
