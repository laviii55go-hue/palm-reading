"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toPng } from "html-to-image";
import { getSavedBirthDate, saveBirthDate, clearSavedBirthDate } from "../lib/birthDateStorage";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import FortunePageShell from "../components/FortunePageShell";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import { calcLifePathNumber } from "../data/numerologyData";
import { DINOSAUR_DATA } from "../data/dinosaurData";
import {
  calcBirthdayNumber,
  ELEMENT_DATA,
  getDinoElementComboLine,
  getDinosaurCardNumber,
  mergeDinosaurStats,
} from "../data/dinosaurElementData";
import DinosaurTradingCard from "../components/DinosaurTradingCard";
import DinosaurCollection from "../components/DinosaurCollection";
import DinosaurBattle from "../components/DinosaurBattle";
import { getCollection, saveToCollection } from "../lib/collectionStorage";

type Tab = "personal" | "collection" | "battle";
type PersonalPhase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://uranai-tenohira.jp/dinosaur-fortune";
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
          className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 placeholder-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelMonth}</label>
          <select
            value={valMonth}
            onChange={(e) => setValMonth(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 bg-white"
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
            className="w-full px-4 py-3 rounded-xl border border-emerald-200 text-base focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700 bg-white"
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

export default function DinosaurFortunePage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [battleCollection, setBattleCollection] = useState<ReturnType<typeof getCollection>["entries"]>([]);

  // 個人診断
  const [personalPhase, setPersonalPhase] = useState<PersonalPhase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [lifePathNum, setLifePathNum] = useState(0);
  const [personalBirthdayNumOverride, setPersonalBirthdayNumOverride] = useState<number | null>(null);
  const [personalError, setPersonalError] = useState<string | null>(null);
  const [isSavingCardImage, setIsSavingCardImage] = useState(false);
  const [nickname, setNickname] = useState("");
  const [saveNotice, setSaveNotice] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = getSavedBirthDate();
    if (saved && (saved.year || saved.month || saved.day)) {
      setYear(saved.year);
      setMonth(saved.month);
      setDay(saved.day);
    }
  }, []);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const numParam = searchParams.get("num");
    const bnParam = searchParams.get("bn");
    const nickParam = searchParams.get("nick");
    const modeParam = searchParams.get("mode");

    if (tabParam === "battle") {
      setBattleCollection(getCollection().entries);
      setActiveTab("battle");
      return;
    }

    if (tabParam === "collection") {
      setActiveTab("collection");
      return;
    }

    if (tabParam === "personal" && modeParam === "input") {
      setActiveTab("personal");
      setPersonalPhase("input");
      setPersonalBirthdayNumOverride(null);
      return;
    }

    if (tabParam !== "personal" || !numParam || !bnParam) return;

    const parsedNum = parseInt(numParam, 10);
    const parsedBn = parseInt(bnParam, 10);
    if (!DINOSAUR_DATA[parsedNum] || !ELEMENT_DATA[parsedBn]) return;

    setActiveTab("personal");
    setLifePathNum(parsedNum);
    setPersonalBirthdayNumOverride(parsedBn);
    setPersonalError(null);
    setNickname(nickParam ?? "");
    setPersonalPhase("result");
  }, [searchParams]);

  const handlePersonalSubmit = () => {
    setPersonalError(null);
    setPersonalBirthdayNumOverride(null);
    setNickname("");
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
    setPersonalBirthdayNumOverride(null);
    setPersonalError(null);
    setNickname("");
  };

  const personalEntry = DINOSAUR_DATA[lifePathNum];
  const personalBirthdayNum = personalPhase === "result"
    ? (personalBirthdayNumOverride ?? (day ? calcBirthdayNumber(parseInt(day, 10)) : 0))
    : 0;
  const personalElement =
    personalBirthdayNum && ELEMENT_DATA[personalBirthdayNum]
      ? ELEMENT_DATA[personalBirthdayNum]
      : null;
  const personalMergedStats =
    personalEntry && personalElement
      ? mergeDinosaurStats(personalEntry.baseStats, personalElement.statBonus)
      : null;
  const personalCardNo =
    personalEntry && personalBirthdayNum
      ? getDinosaurCardNumber(lifePathNum, personalBirthdayNum)
      : 0;
  const xShareText =
    personalElement && personalEntry && personalMergedStats
      ? encodeURIComponent(
          `🦖 恐竜占い結果：${personalElement.name}の${personalEntry.name}${personalEntry.emoji}\n` +
            `こうげき力${personalMergedStats.attack} / まもり力${personalMergedStats.defense} / すばやさ${personalMergedStats.speed}\n` +
            `#恐竜数秘術 #恐竜占い\n` +
            PAGE_URL
        )
      : "";
  const lineShareText =
    personalElement && personalEntry && personalMergedStats
      ? encodeURIComponent(
          `🦖 恐竜占い結果：${personalElement.name}の${personalEntry.name}${personalEntry.emoji}\n` +
            `こうげき力${personalMergedStats.attack} / まもり力${personalMergedStats.defense} / すばやさ${personalMergedStats.speed}\n` +
            PAGE_URL
        )
      : "";
  const handleSaveCardImage = useCallback(async () => {
    if (!personalElement || !personalEntry) return;

    try {
      setIsSavingCardImage(true);
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const cardEl = cardRef.current;
      if (!cardEl) return;

      const rawDataUrl = await toPng(cardEl, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "#ffffff",
        filter: (node) => {
          if (!(node instanceof HTMLElement)) return true;
          return !(
            node.classList.contains("glint") ||
            node.classList.contains("aurora") ||
            node.classList.contains("sparkle") ||
            node.classList.contains("sparkle-star") ||
            node.classList.contains("shine-ring")
          );
        },
      });

      // 影や角丸が切れないよう最小パディングを付与
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const i = new window.Image();
        i.onload = () => resolve(i);
        i.onerror = reject;
        i.src = rawDataUrl;
      });
      const PADDING = 12 * 2; // pixelRatio:2 を考慮
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = img.width + PADDING * 2;
      outputCanvas.height = img.height + PADDING * 2;
      const outCtx = outputCanvas.getContext("2d");
      if (!outCtx) throw new Error("Canvas context unavailable");
      outCtx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
      outCtx.drawImage(img, PADDING, PADDING);

      const link = document.createElement("a");
      link.download = `恐竜占い_${personalElement.name}の${personalEntry.name}.webp`;
      link.href = outputCanvas.toDataURL("image/png");
      link.click();
    } catch (error) {
      console.error("画像保存に失敗しました:", error);
      alert("画像の保存に失敗しました。もう一度お試しください。");
    } finally {
      setIsSavingCardImage(false);
    }
  }, [personalElement, personalEntry]);

  const handleSaveToCollection = useCallback(() => {
    if (!personalEntry || !personalElement) return;
    const cardNo = getDinosaurCardNumber(personalEntry.number, personalElement.number);
    saveToCollection({
      cardNo,
      dinoNumber: personalEntry.number,
      elementNumber: personalElement.number,
      dinoName: personalEntry.name,
      elementName: personalElement.name,
      nickname: nickname.trim(),
      discoveredAt: new Date().toISOString(),
    });
    setSaveNotice(`${personalElement.name}の${personalEntry.name}を保存しました`);
    setTimeout(() => setSaveNotice(null), 1800);
  }, [personalEntry, personalElement, nickname]);

  useEffect(() => {
    if (!personalEntry || !personalElement || personalPhase !== "result") return;
    saveToCollection({
      cardNo: getDinosaurCardNumber(personalEntry.number, personalElement.number),
      dinoNumber: personalEntry.number,
      elementNumber: personalElement.number,
      dinoName: personalEntry.name,
      elementName: personalElement.name,
      nickname: "",
      discoveredAt: new Date().toISOString(),
    });
  }, [personalEntry, personalElement, personalPhase]);

  return (
    <FortunePageShell
      variant="fortune"
      theme="dinosaur"
      subText="恐竜占い"
      dark
      backgroundClassName="relative min-h-screen flex flex-col items-center p-0"
      contentClassName="w-full max-w-lg p-4 pb-10 space-y-6"
      links={[
        { type: "guide", href: "/dinosaur-guide", label: "恐竜ずかん" },
      ]}
    >
      <div
        className="fixed inset-0 -z-10 bg-slate-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/dinosaur-bg.webp')" }}
        aria-hidden
      />
        <div className="text-center mb-6">
          <div className="relative rounded-2xl overflow-hidden border border-cyan-300/40 shadow-xl shadow-indigo-950/60 bg-gradient-to-b from-slate-900 via-indigo-900 to-emerald-800 p-5">
            <span className="absolute top-4 left-5 text-yellow-200/80 text-xs animate-pulse">✦</span>
            <span className="absolute top-8 right-8 text-cyan-100/70 text-sm animate-pulse [animation-delay:300ms]">✧</span>
            <span className="absolute bottom-24 left-8 text-yellow-100/70 text-xs animate-pulse [animation-delay:700ms]">✦</span>
            <span className="absolute bottom-8 right-6 text-cyan-100/70 text-xs animate-pulse [animation-delay:1100ms]">✧</span>

            <Image
              src="/dinosaur/characters/01_tyrannosaurus.webp"
              alt=""
              width={120}
              height={120}
              aria-hidden
              className="absolute -left-3 top-12 opacity-35 rotate-[-8deg] pointer-events-none select-none"
            />
            <Image
              src="/dinosaur/characters/10_quetzalcoatlus.webp"
              alt=""
              width={140}
              height={140}
              aria-hidden
              className="absolute -right-6 top-10 opacity-30 rotate-[10deg] pointer-events-none select-none"
            />
            <Image
              src="/dinosaur/characters/06_triceratops.webp"
              alt=""
              width={110}
              height={110}
              aria-hidden
              className="absolute right-6 -bottom-2 opacity-30 pointer-events-none select-none"
            />

            <div className="rounded-xl overflow-hidden border border-cyan-300/50 shadow-md shadow-cyan-500/20 mb-3 relative z-10">
              <Image
                src="/dinosaur-top.webp"
                alt="恐竜占いトップ"
                width={720}
                height={360}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            <div className="relative z-10 mt-1 inline-flex items-center gap-2 rounded-lg border border-amber-300/60 bg-slate-900/55 px-3 py-1.5 text-[11px] text-amber-100 shadow-md shadow-black/30">
              <span>◈</span>
              <span>石板の数字がキミの運命恐竜を呼び覚ます</span>
            </div>
          </div>
        </div>

        <div className="flex rounded-2xl bg-slate-900/70 border border-emerald-400/35 p-1 mb-4 gap-1 shadow-lg shadow-black/30">
          {[
            { id: "personal" as Tab, label: "🦖 自分の恐竜" },
            { id: "collection" as Tab, label: "📖 マイ図鑑" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-emerald-200 to-cyan-200 text-slate-900 shadow"
                  : "text-emerald-100/75 hover:text-emerald-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white/95 rounded-3xl border border-emerald-300/40 shadow-xl shadow-black/25 p-6">
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
                    className="flex-1 py-2 rounded-xl border-2 border-emerald-300 text-emerald-700 bg-emerald-50/70 text-sm font-semibold disabled:opacity-40"
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
                    className="flex-1 py-2 rounded-xl border-2 border-emerald-300 text-emerald-700 bg-white text-sm font-semibold"
                  >
                    保存を解除
                  </button>
                </div>

                {personalError && <p className="text-red-500 text-sm text-center">{personalError}</p>}

                <button
                  onClick={handlePersonalSubmit}
                  disabled={!year || !month || !day}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-700 to-green-600 text-white font-bold text-lg disabled:opacity-40 hover:from-emerald-800 hover:to-green-700 transition-all shadow-md"
                >
                  恐竜タイプを診断する →
                </button>

                <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-4 text-xs text-gray-600 space-y-1">
                  <p className="font-medium text-emerald-800">🦖 診断の仕組みが知りたい？</p>
                  <p>恐竜図鑑で詳しく解説してるよ！</p>
                  <Link
                    href="/dinosaur-guide#how"
                    className="block text-center mt-2 text-emerald-600 font-semibold hover:underline"
                  >
                    📖 恐竜図鑑で仕組みを見る →
                  </Link>
                </div>
              </div>
            ) : personalEntry && personalElement && personalMergedStats ? (
              <div className="space-y-5">
                <p className="text-center text-emerald-700 font-bold text-sm">
                  発見！あなたの恐竜は…バースデーナンバーで属性が決まるよ
                </p>

                <DinosaurTradingCard
                  ref={cardRef}
                  captureMode={isSavingCardImage}
                  dinoName={personalEntry.name}
                  elementName={personalElement.name}
                  elementEmoji={personalElement.emoji}
                  bgGradientClass={personalElement.bgGradient}
                  bgImageSrc={personalElement.bgImage}
                  cardNo={personalCardNo}
                  imageSrc={personalEntry.image}
                  dinoEmoji={personalEntry.emoji}
                  stats={personalMergedStats}
                  talentLine={personalElement.talent}
                  comboComment={getDinoElementComboLine(personalEntry.name, personalElement)}
                  shimmerFrom={personalElement.shimmerFrom}
                  shimmerTo={personalElement.shimmerTo}
                  glowRgb={personalElement.glowRgb}
                />

                <div className="flex items-center justify-center gap-2 mt-4 mb-1 flex-wrap">
                  <label className="text-sm text-gray-600">📝</label>
                  <input
                    type="text"
                    placeholder="だれの恐竜？（例：お母さん）"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    maxLength={20}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-base w-52 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                  <button
                    onClick={handleSaveToCollection}
                    className="px-4 py-2 bg-emerald-500 text-white text-sm font-bold rounded-lg hover:bg-emerald-600 transition-colors"
                  >
                    図鑑に保存
                  </button>
                </div>
                <p className="text-center text-xs text-gray-400">
                  名前をメモしておくと、図鑑であとから見返せるよ！
                </p>
                {saveNotice && (
                  <p className="text-center text-xs font-semibold text-emerald-700">{saveNotice}</p>
                )}

                <div className="flex justify-center mt-2 mb-4">
                  <button
                    onClick={handleSaveCardImage}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
                  >
                    <span>📥</span>
                    <span>カード画像を保存する</span>
                  </button>
                </div>

                {(lifePathNum === 11 || lifePathNum === 22 || lifePathNum === 33) && (
                  <p className="text-center text-amber-700 text-xs font-bold">
                    ⭐ マスターナンバーのレア恐竜タイプ！
                  </p>
                )}

                <div className="rounded-2xl border-2 border-emerald-200 bg-white p-4 shadow-sm space-y-3">
                  <p className="font-bold text-emerald-800 text-sm">🦕 キミの恐竜タイプ</p>
                  <div className="flex flex-wrap gap-2">
                    {personalEntry.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-2 text-sm leading-relaxed">
                    <p className="text-gray-700">
                      {personalEntry.shortDesc}
                    </p>
                    <p className="text-gray-700">
                      まわりから見ると、「{personalEntry.keywords[0]}」がとくに目立つタイプ。自分らしさを出すほど、強みがどんどん伸びるよ！
                    </p>
                    <p className="text-emerald-700 font-semibold">
                      {personalElement.emoji} {personalElement.name}の力で、「{personalElement.talent}」がパワーアップ！
                    </p>
                    <p className="text-gray-600">
                      ヒント: {personalElement.advice}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-4">
                  <p className="font-bold text-amber-800 text-sm mb-2">💪 きみのすごいところ＆ちょっときをつけよう</p>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-green-700 font-semibold mb-1">✨ すごいところ</p>
                      <ul className="space-y-1 text-gray-600 leading-relaxed">
                        {personalEntry.strengths.map((s) => (
                          <li key={s}>・{s}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-amber-700 font-semibold mb-1">🛡️ ちょっときをつけよう</p>
                      <ul className="space-y-1 text-gray-600 leading-relaxed">
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

                {personalElement && (
                  <div className="rounded-2xl border-2 border-gray-200 bg-gray-50 p-4 space-y-3">
                    <p className="text-center text-sm font-medium text-gray-500">📣 結果をシェア</p>
                    <div className="grid grid-cols-2 gap-3">
                      <a
                        href={`https://twitter.com/intent/tweet?text=${xShareText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors"
                      >
                        X でシェア
                      </a>
                      <a
                        href={`https://line.me/R/msg/text/?${lineShareText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors"
                      >
                        LINE でシェア
                      </a>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2">
                      💡 カード画像を保存して、投稿に添付するとフォロワーに見てもらえるよ！
                    </p>
                  </div>
                )}

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

          {activeTab === "collection" && (
            <DinosaurCollection onBattle={() => {
              setBattleCollection(getCollection().entries);
              setActiveTab("battle");
            }} />
          )}

          {activeTab === "battle" && (
            <DinosaurBattle
              collection={battleCollection}
              onBack={() => setActiveTab("collection")}
            />
          )}
        </div>

        <FooterLinks className="text-center mt-4" linkClassName="text-emerald-200 text-xs hover:text-white hover:underline" />
    </FortunePageShell>
  );
}
