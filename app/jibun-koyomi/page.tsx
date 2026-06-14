"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";
import FortunePageShell from "../components/FortunePageShell";
import { fortunePageDescription, fortunePageTitle } from "../lib/fortuneDesign";
import FooterLinks from "../components/FooterLinks";
import { calcJibunKoyomi, type JibunKoyomiResult } from "../lib/jibunKoyomi";
import { MAIN_STARS, SUB_STARS, ENERGY_BANDS } from "../data/sanmeiTextData";
import { NUMEROLOGY_DATA, PERSONAL_YEAR_DATA } from "../data/numerologyData";
import { AXES, RELATION_INFO, YEAR_CROSS_TEXTS } from "../data/jibunKoyomiData";

type Phase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://uranai-tenohira.jp/jibun-koyomi";

export default function JibunKoyomiPage() {
  const [phase, setPhase] = useState<Phase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<JibunKoyomiResult | null>(null);

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
    setResult(
      calcJibunKoyomi(
        { year: y, month: m, day: d },
        { year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate() }
      )
    );
    setPhase("result");
  };

  const chestStar = result ? MAIN_STARS[result.sanmei.jintai.chest] : null;
  const numEntry = result ? NUMEROLOGY_DATA[result.lifePath] : null;
  const pyEntry = result ? PERSONAL_YEAR_DATA[result.personalYear] : null;
  const relInfo = result ? RELATION_INFO[result.relation] : null;
  const bandInfo = result ? ENERGY_BANDS[result.sanmei.energyBand] : null;

  const shareText =
    result && numEntry
      ? `私のじぶん暦は「${result.cross.typeName}」タイプでした！\n外の顔は ${MAIN_STARS[result.sanmei.jintai.chest].emoji} ${result.sanmei.jintai.chest}、内の原動力は ${numEntry.emoji} ライフパス${result.lifePath}✨\n\n算命学×数秘術のオリジナル総合鑑定👇\n${PAGE_URL}\n#じぶん暦 #算命学 #数秘術 #占い好きな人と繋がりたい`
      : "";

  return (
    <FortunePageShell
      variant="fortune"
      theme="violet"
      subText="じぶん暦"
      links={[
        { type: "fortune", href: "/sanmeigaku", label: "算命学占い" },
        { type: "fortune", href: "/lucky-number", label: "数秘術占い" },
      ]}
    >
        <div className="text-center space-y-2">
          <h1 className={fortunePageTitle}>🌈 じぶん暦</h1>
          <p className="text-xs font-semibold tracking-wide text-violet-700">算命学 × 数秘術 オリジナル総合鑑定</p>
          <p className={fortunePageDescription}>
            2つの暦であなたの「外の顔」と「内の原動力」を
            <br />
            重ねて読み解く、当サイトだけの鑑定です
          </p>
        </div>

        {phase === "input" ? (
          <div className="bg-white rounded-3xl shadow-md p-6 space-y-6">
            <div className="text-center space-y-1">
              <p className="text-gray-600 text-sm">生年月日を入力してください</p>
              <p className="text-gray-400 text-xs">
                算命学（干支暦）と数秘術（誕生数）の2系統で同時に診断します
              </p>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">生まれ年</label>
                <input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
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
                    value={month}
                    onChange={(e) => setMonth(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 bg-white"
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
                    className="w-full px-4 py-3 rounded-xl border border-indigo-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700 bg-white"
                  >
                    <option value="">-- 日 --</option>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                      <option key={d} value={d}>{d}日</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => saveBirthDate(year, month, day)}
                disabled={!year || !month || !day}
                className="flex-1 py-2 rounded-xl border-2 border-indigo-200 text-indigo-600 text-sm font-semibold disabled:opacity-40"
              >
                保存する
              </button>
              <button
                type="button"
                onClick={() => {
                  clearSavedBirthDate();
                  setYear(""); setMonth(""); setDay("");
                }}
                className="flex-1 py-2 rounded-xl border-2 border-indigo-200 text-indigo-600 text-sm font-semibold"
              >
                保存を解除
              </button>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              onClick={handleSubmit}
              disabled={!year || !month || !day}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:opacity-90 transition-opacity shadow-md"
            >
              じぶん暦を見る →
            </button>

            <div className="bg-indigo-50 rounded-2xl p-4 text-xs text-gray-500 space-y-1">
              <p className="font-medium text-indigo-700">🌈 じぶん暦とは？</p>
              <p>
                生まれた日を「干支の暦（算命学）」と「数の暦（数秘術）」の2つで読み、
                <strong>外から見えるふるまい</strong>と<strong>内側の原動力</strong>を重ねて診断する、当サイト独自の総合鑑定です。
              </p>
              <p>
                2つの暦が一致する人、支え合う人、ギャップがある人——組み合わせはあなただけのものです。
              </p>
            </div>
          </div>
        ) : result && chestStar && numEntry && pyEntry && relInfo && bandInfo ? (
          <div className="space-y-5">

            {/* 統合タイプ */}
            <div className="bg-white rounded-3xl shadow-md p-6 text-center space-y-3">
              <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                {relInfo.badge}
              </span>
              <div>
                <p className="text-gray-400 text-xs">あなたのじぶん暦タイプは</p>
                <h2 className="text-2xl font-black text-indigo-900 mt-1">
                  「{result.cross.typeName}」
                </h2>
                <p className="text-indigo-400 text-xs font-semibold mt-1">{relInfo.label}</p>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed text-left">{result.cross.text}</p>
              <div className="rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 p-3 text-left">
                <p className="text-indigo-700 text-xs font-bold mb-0.5">🔑 活かし方のヒント</p>
                <p className="text-gray-600 text-xs leading-relaxed">{result.cross.hint}</p>
              </div>
            </div>

            {/* 2つの暦の根拠 */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white rounded-3xl shadow-sm p-4 space-y-1.5">
                <p className="text-[10px] text-amber-600 font-bold">外の顔（算命学）</p>
                <p className="text-lg font-black text-stone-800">
                  {chestStar.emoji} {chestStar.name}
                </p>
                <p className="text-[10px] text-gray-400">{chestStar.reading}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{chestStar.catchphrase}</p>
                <p className="text-[10px] text-indigo-500 font-semibold">
                  {AXES[result.outerAxis].emoji} 「{AXES[result.outerAxis].label}」の気質
                </p>
              </div>
              <div className="bg-white rounded-3xl shadow-sm p-4 space-y-1.5">
                <p className="text-[10px] text-violet-600 font-bold">内の原動力（数秘術）</p>
                <p className="text-lg font-black text-stone-800">
                  {numEntry.emoji} ライフパス{result.lifePath}
                </p>
                <p className="text-[10px] text-gray-400">{numEntry.title}</p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {numEntry.keywords.slice(0, 3).join("・")}
                </p>
                <p className="text-[10px] text-indigo-500 font-semibold">
                  {AXES[result.innerAxis].emoji} 「{AXES[result.innerAxis].label}」の原動力
                </p>
              </div>
            </div>

            {/* 外と内の解説 */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-3">
              <p className="font-bold text-indigo-900 text-sm text-center">🧭 外の顔と内の原動力</p>
              <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
                <p className="text-amber-700 text-xs font-bold mb-1">
                  外の顔：{AXES[result.outerAxis].emoji} {AXES[result.outerAxis].label}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {AXES[result.outerAxis].outerNote}。{chestStar.core}
                </p>
              </div>
              <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4">
                <p className="text-violet-700 text-xs font-bold mb-1">
                  内の原動力：{AXES[result.innerAxis].emoji} {AXES[result.innerAxis].label}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {AXES[result.innerAxis].innerNote}。{numEntry.personality}
                </p>
              </div>
              <p className="text-gray-400 text-[10px] text-center">{relInfo.note}</p>
            </div>

            {/* エネルギー */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-bold text-indigo-900 text-sm">🔥 エネルギーのかたち</p>
                <p className="text-sm font-black text-indigo-700">
                  {result.sanmei.energyTotal}
                  <span className="text-[10px] font-normal text-gray-400">/36点・{bandInfo.label}</span>
                </p>
              </div>
              <div className="h-2 rounded-full bg-indigo-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                  style={{ width: `${Math.round((result.sanmei.energyTotal / 36) * 100)}%` }}
                />
              </div>
              <p className="text-gray-600 text-xs leading-relaxed">{bandInfo.description}</p>
              <p className="text-gray-400 text-[10px]">
                現在のエネルギー：{SUB_STARS[result.sanmei.jusei.middle].name}（{SUB_STARS[result.sanmei.jusei.middle].points}点・{SUB_STARS[result.sanmei.jusei.middle].stageLabel}）
              </p>
            </div>

            {/* 今年のW暦 */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-3">
              <p className="font-bold text-indigo-900 text-sm text-center">📅 今年のW暦リーディング</p>

              <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-4 space-y-1">
                <p className="text-sm font-bold">{YEAR_CROSS_TEXTS[result.yearRelation].title}</p>
                <p className="text-white/85 text-xs leading-relaxed">
                  {YEAR_CROSS_TEXTS[result.yearRelation].text}
                </p>
              </div>

              <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4 space-y-1">
                <p className="text-amber-700 text-[10px] font-bold">干支の暦（算命学の年運）</p>
                <p className="font-bold text-stone-800 text-sm">
                  {MAIN_STARS[result.fortune.year.mainStar].yearTheme.title}
                </p>
                <p className="text-gray-600 text-xs leading-relaxed">
                  {MAIN_STARS[result.fortune.year.mainStar].yearTheme.text}
                </p>
                {result.fortune.year.isTenchusatsu && (
                  <p className="text-stone-500 text-[11px]">
                    🌙 今年はあなたの天中殺の年。広げるより、学び・整理・足元固めが実りやすい時期です。
                  </p>
                )}
              </div>

              <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4 space-y-1">
                <p className="text-violet-700 text-[10px] font-bold">
                  数の暦（パーソナルイヤー{result.personalYear}）
                </p>
                <p className="font-bold text-stone-800 text-sm">{pyEntry.theme}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{pyEntry.message}</p>
              </div>
            </div>

            {/* 今日のひとこと */}
            <div className="bg-white rounded-3xl shadow-md p-5 space-y-1">
              <p className="text-rose-600 text-xs font-semibold">今日の流れ</p>
              <p className="font-bold text-stone-800">
                「{MAIN_STARS[result.fortune.day.mainStar].dayTheme.tag}」
              </p>
              <p className="text-gray-600 text-xs leading-relaxed">
                {MAIN_STARS[result.fortune.day.mainStar].dayTheme.text}
              </p>
              <p className="text-rose-700 text-xs font-medium">
                → {MAIN_STARS[result.fortune.day.mainStar].dayTheme.action}
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

            {/* 根拠をくわしく */}
            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
              <p className="text-center text-sm font-bold text-gray-600">根拠をくわしく見る</p>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/sanmeigaku"
                  className="text-center py-3 rounded-2xl border-2 border-amber-200 text-amber-600 text-sm font-bold hover:bg-amber-50 transition-colors"
                >
                  🌅 算命学の命式
                </Link>
                <Link
                  href="/lucky-number"
                  className="text-center py-3 rounded-2xl border-2 border-violet-200 text-violet-600 text-sm font-bold hover:bg-violet-50 transition-colors"
                >
                  🔢 数秘術の詳細
                </Link>
              </div>
            </div>

            <button
              onClick={() => setPhase("input")}
              className="w-full py-3 rounded-2xl border-2 border-indigo-200 text-indigo-600 font-semibold text-sm hover:bg-indigo-50 transition-colors"
            >
              ← 別の生年月日で見る
            </button>
          </div>
        ) : null}

        <p className="text-gray-400 text-[10px] text-center leading-relaxed">
          じぶん暦は、算命学と数秘術をもとにした当サイト独自の総合鑑定（自己理解・エンタメコンテンツ）です。
          <br />
          未来や運命を断定するものではありません。
        </p>

        <FooterLinks />
    </FortunePageShell>
  );
}
