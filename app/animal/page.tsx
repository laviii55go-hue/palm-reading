"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import {
  ANIMALS,
  SUBTYPES,
  calcAnimalIndices,
  getAnimalCompatibility,
} from "../data/animalData";

type Tab = "personal" | "compatibility";
type PersonalPhase = "input" | "result";
type CompatPhase = "input" | "result";

const CURRENT_YEAR = new Date().getFullYear();
const PAGE_URL = "https://jade-torte-9b5cde.netlify.app/animal";

// ─── 日付入力コンポーネント ──────────────────────────────
type DateInputsProps = {
  labelYear: string; labelMonth: string; labelDay: string;
  valYear: string; valMonth: string; valDay: string;
  setValYear: (v: string) => void;
  setValMonth: (v: string) => void;
  setValDay: (v: string) => void;
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
          className="w-full px-4 py-3 rounded-xl border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-300"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelMonth}</label>
          <select
            value={valMonth}
            onChange={(e) => setValMonth(e.target.value)}
            className="w-full px-3 py-3 rounded-xl border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 bg-white"
          >
            <option value="">月</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={String(m)}>{m}月</option>
            ))}
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">{labelDay}</label>
          <select
            value={valDay}
            onChange={(e) => setValDay(e.target.value)}
            className="w-full px-3 py-3 rounded-xl border border-green-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 bg-white"
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

// ─── 星スコア ────────────────────────────────────────────
function StarScore({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < score ? "text-yellow-400" : "text-gray-200"}>★</span>
      ))}
    </div>
  );
}

// ─── メインページ ─────────────────────────────────────────
export default function AnimalFortunePage() {
  const [tab, setTab] = useState<Tab>("personal");

  // 個人診断
  const [personalPhase, setPersonalPhase] = useState<PersonalPhase>("input");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [animalIdx, setAnimalIdx] = useState(0);
  const [subtypeIdx, setSubtypeIdx] = useState(0);

  // 相性診断
  const [compatPhase, setCompatPhase] = useState<CompatPhase>("input");
  const [myYear, setMyYear] = useState("");
  const [myMonth, setMyMonth] = useState("");
  const [myDay, setMyDay] = useState("");
  const [partnerYear, setPartnerYear] = useState("");
  const [partnerMonth, setPartnerMonth] = useState("");
  const [partnerDay, setPartnerDay] = useState("");
  const [myAnimalIdx, setMyAnimalIdx] = useState(0);
  const [mySubtypeIdx, setMySubtypeIdx] = useState(0);
  const [partnerAnimalIdx, setPartnerAnimalIdx] = useState(0);
  const [partnerSubtypeIdx, setPartnerSubtypeIdx] = useState(0);

  const personalValid = year && month && day;
  const compatValid = myYear && myMonth && myDay && partnerYear && partnerMonth && partnerDay;

  // ─── 個人診断実行 ────────────────────────────────────
  const handlePersonalCalc = () => {
    const { animalIndex, subtypeIndex } = calcAnimalIndices(
      Number(year), Number(month), Number(day)
    );
    setAnimalIdx(animalIndex);
    setSubtypeIdx(subtypeIndex);
    setPersonalPhase("result");
  };

  // ─── 相性診断実行 ────────────────────────────────────
  const handleCompatCalc = () => {
    const mine = calcAnimalIndices(Number(myYear), Number(myMonth), Number(myDay));
    const partner = calcAnimalIndices(Number(partnerYear), Number(partnerMonth), Number(partnerDay));
    setMyAnimalIdx(mine.animalIndex);
    setMySubtypeIdx(mine.subtypeIndex);
    setPartnerAnimalIdx(partner.animalIndex);
    setPartnerSubtypeIdx(partner.subtypeIndex);
    setCompatPhase("result");
  };

  // ─── 個人診断から相性へ（自分の生年月日を引き継ぐ） ────
  const goToCompatWithMyData = () => {
    setMyYear(year);
    setMyMonth(month);
    setMyDay(day);
    setPartnerYear("");
    setPartnerMonth("");
    setPartnerDay("");
    setCompatPhase("input");
    setTab("compatibility");
  };

  // ─── 相性から個人診断へ ───────────────────────────────
  const goToPersonalResult = (y: string, m: string, d: string) => {
    const { animalIndex, subtypeIndex } = calcAnimalIndices(Number(y), Number(m), Number(d));
    setYear(y); setMonth(m); setDay(d);
    setAnimalIdx(animalIndex);
    setSubtypeIdx(subtypeIndex);
    setPersonalPhase("result");
    setTab("personal");
  };

  // ─── 結果データ取得 ──────────────────────────────────
  const animal = ANIMALS[animalIdx];
  const subtype = SUBTYPES[subtypeIdx];
  const myAnimal = ANIMALS[myAnimalIdx];
  const mySubtype = SUBTYPES[mySubtypeIdx];
  const partnerAnimal = ANIMALS[partnerAnimalIdx];
  const partnerSubtype = SUBTYPES[partnerSubtypeIdx];
  const compat = getAnimalCompatibility(myAnimalIdx, partnerAnimalIdx);

  const fullName = `${subtype.name}${animal.name}`;
  const myFullName = `${mySubtype.name}${myAnimal.name}`;
  const partnerFullName = `${partnerSubtype.name}${partnerAnimal.name}`;

  // ─── シェアテキスト ───────────────────────────────────
  const personalShareText = `私の動物占いは「${animal.emoji} ${fullName}」でした！\n${animal.title}タイプ✨\n#動物占い #${fullName} #占い好きな人と繋がりたい #生年月日占い`;
  const compatShareText = `動物占い相性診断結果 ${animal.emoji}×${partnerAnimal.emoji}\n${myFullName} × ${partnerFullName}\n相性スコア ★${compat.score}/5\n#動物占い #相性診断 #占い好きな人と繋がりたい`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">

        {/* ヘッダー */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xs text-green-500 hover:underline">← トップに戻る</Link>
            <Link href="/animal-guide" className="text-xs text-green-600 border border-green-300 rounded-full px-3 py-1 hover:bg-green-50 transition-colors">📖 動物占いガイド</Link>
          </div>
          <div className="mt-3 rounded-2xl overflow-hidden shadow-md">
            <Image
              src="/animal-top.png"
              alt="動物占い"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-green-800 mt-3">動物占い</h1>
          <p className="text-green-600 text-sm">生年月日があなたの動物キャラを教えてくれる</p>
        </div>

        {/* タブ */}
        <div className="flex rounded-2xl overflow-hidden border-2 border-green-200 bg-white">
          <button
            onClick={() => setTab("personal")}
            className={`flex-1 py-3 text-sm font-bold transition-all ${tab === "personal" ? "bg-green-500 text-white" : "text-green-600 hover:bg-green-50"}`}
          >
            🐾 個人診断
          </button>
          <button
            onClick={() => { setTab("compatibility"); if (tab !== "compatibility") { setMyYear(""); setMyMonth(""); setMyDay(""); setPartnerYear(""); setPartnerMonth(""); setPartnerDay(""); setCompatPhase("input"); } }}
            className={`flex-1 py-3 text-sm font-bold transition-all ${tab === "compatibility" ? "bg-green-500 text-white" : "text-green-600 hover:bg-green-50"}`}
          >
            💞 相性診断
          </button>
        </div>

        {/* ══════ 個人診断タブ ══════ */}
        {tab === "personal" && (
          <>
            {personalPhase === "input" && (
              <div className="bg-white rounded-3xl shadow-sm p-6 space-y-5">
                <h2 className="text-center font-bold text-green-800">あなたの生年月日を入力</h2>
                <DateInputs
                  labelYear="生まれ年" labelMonth="月" labelDay="日"
                  valYear={year} valMonth={month} valDay={day}
                  setValYear={setYear} setValMonth={setMonth} setValDay={setDay}
                />
                <button
                  onClick={handlePersonalCalc}
                  disabled={!personalValid}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg disabled:opacity-40 shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  🐾 あなたの動物を診断する
                </button>
                <p className="text-xs text-center text-gray-400">60種類の動物キャラから診断します</p>
              </div>
            )}

            {personalPhase === "result" && (
              <div className="space-y-4">
                {/* 動物カード */}
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white text-center shadow-lg">
                  <p className="text-green-200 text-sm mb-2">あなたの動物は</p>
                  <div className="text-7xl mb-3">{animal.emoji}</div>
                  <div className="text-3xl font-black mb-1">{fullName}</div>
                  <div className="text-green-200 text-sm font-medium">
                    {subtype.modifier}・{animal.title}
                  </div>
                  <div className="mt-3 bg-white/20 rounded-2xl px-4 py-2 text-sm">
                    🎨 ラッキーカラー：{animal.luckyColor}
                  </div>
                </div>

                {/* サブタイプ特徴 */}
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-2">
                  <h3 className="font-bold text-green-800 flex items-center gap-2">
                    <span>✨</span> タイプの特徴
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{subtype.extra}</p>
                </div>

                {/* 基本性格 */}
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-2">
                  <h3 className="font-bold text-green-800 flex items-center gap-2">
                    <span>🌿</span> 基本性格
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{animal.personality}</p>
                </div>

                {/* 恋愛・仕事 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                    <div className="text-pink-600 font-bold text-sm mb-2">💕 恋愛</div>
                    <p className="text-gray-600 text-xs leading-relaxed">{animal.love}</p>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                    <div className="text-blue-600 font-bold text-sm mb-2">💼 仕事</div>
                    <p className="text-gray-600 text-xs leading-relaxed">{animal.work}</p>
                  </div>
                </div>

                {/* 強み・弱み */}
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
                  <div>
                    <span className="text-green-600 font-bold text-sm">💪 強み：</span>
                    <span className="text-gray-600 text-sm ml-1">{animal.strength}</span>
                  </div>
                  <div>
                    <span className="text-amber-600 font-bold text-sm">⚠️ 弱み：</span>
                    <span className="text-gray-600 text-sm ml-1">{animal.weakness}</span>
                  </div>
                  <div>
                    <span className="text-purple-600 font-bold text-sm">🎁 開運アイテム：</span>
                    <span className="text-gray-600 text-sm ml-1">{animal.luckyItem}</span>
                  </div>
                </div>

                {/* 相性診断へ */}
                <button
                  onClick={goToCompatWithMyData}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  💞 相性診断へ行く（相手の情報入力）
                </button>

                <AdBanner />
                <RakutenWidget />

                {/* シェアボタン */}
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
                  <p className="text-center text-sm font-bold text-gray-600">結果をシェアする</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(personalShareText)}&url=${encodeURIComponent(PAGE_URL)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-base">𝕏</span> Xでシェア
                    </a>
                    <a
                      href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(PAGE_URL)}&text=${encodeURIComponent(personalShareText)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#06C755] text-white text-sm font-bold hover:bg-[#05b34d] transition-colors"
                    >
                      <span>💬</span> LINEでシェア
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => setPersonalPhase("input")}
                  className="w-full py-3 rounded-2xl border-2 border-green-200 text-green-600 font-semibold text-sm hover:bg-green-50 transition-colors"
                >
                  別の生年月日で診断する
                </button>
              </div>
            )}
          </>
        )}

        {/* ══════ 相性診断タブ ══════ */}
        {tab === "compatibility" && (
          <>
            {compatPhase === "input" && (
              <div className="bg-white rounded-3xl shadow-sm p-6 space-y-5">
                <h2 className="text-center font-bold text-green-800">2人の生年月日を入力</h2>

                <div className="bg-green-50 rounded-2xl p-4 space-y-3">
                  <p className="text-green-700 font-bold text-sm">🐾 あなた</p>
                  <DateInputs
                    labelYear="生まれ年" labelMonth="月" labelDay="日"
                    valYear={myYear} valMonth={myMonth} valDay={myDay}
                    setValYear={setMyYear} setValMonth={setMyMonth} setValDay={setMyDay}
                  />
                </div>

                <div className="text-center text-2xl text-green-400">💞</div>

                <div className="bg-pink-50 rounded-2xl p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-pink-700 font-bold text-sm">🐾 相手</p>
                    {partnerYear && (
                      <button
                        onClick={() => { setPartnerYear(""); setPartnerMonth(""); setPartnerDay(""); }}
                        className="text-xs text-pink-400 border border-pink-200 rounded-lg px-2 py-1 hover:bg-pink-50"
                      >
                        相手をリセット
                      </button>
                    )}
                  </div>
                  <DateInputs
                    labelYear="生まれ年" labelMonth="月" labelDay="日"
                    valYear={partnerYear} valMonth={partnerMonth} valDay={partnerDay}
                    setValYear={setPartnerYear} setValMonth={setPartnerMonth} setValDay={setPartnerDay}
                  />
                </div>

                <button
                  onClick={handleCompatCalc}
                  disabled={!compatValid}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-lg disabled:opacity-40 shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  💞 相性を診断する
                </button>
              </div>
            )}

            {compatPhase === "result" && (
              <div className="space-y-4">
                {/* 相性スコア */}
                <div className="bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl p-6 text-white text-center shadow-lg">
                  <p className="text-pink-200 text-sm mb-3">2人の動物相性</p>
                  <div className="flex justify-center items-center gap-4 mb-4">
                    <button
                      onClick={() => goToPersonalResult(myYear, myMonth, myDay)}
                      className="text-center flex-1 rounded-2xl border-2 border-white/30 bg-white/20 p-3 hover:bg-white/30 transition-all active:scale-95"
                    >
                      <div className="text-4xl">{myAnimal.emoji}</div>
                      <div className="text-xl font-black">{myAnimal.name}</div>
                      <div className="text-xs text-pink-200">{mySubtype.name}タイプ</div>
                      <div className="text-xs text-pink-100 mt-0.5">あなた（{myYear}/{myMonth}/{myDay}）</div>
                      <div className="text-[10px] text-pink-300 mt-1">タップで個人診断 →</div>
                    </button>
                    <div className="text-3xl">💞</div>
                    <button
                      onClick={() => goToPersonalResult(partnerYear, partnerMonth, partnerDay)}
                      className="text-center flex-1 rounded-2xl border-2 border-white/30 bg-white/20 p-3 hover:bg-white/30 transition-all active:scale-95"
                    >
                      <div className="text-4xl">{partnerAnimal.emoji}</div>
                      <div className="text-xl font-black">{partnerAnimal.name}</div>
                      <div className="text-xs text-pink-200">{partnerSubtype.name}タイプ</div>
                      <div className="text-xs text-pink-100 mt-0.5">相手（{partnerYear}/{partnerMonth}/{partnerDay}）</div>
                      <div className="text-[10px] text-pink-300 mt-1">タップで個人診断 →</div>
                    </button>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <StarScore score={compat.score} />
                    <span className="text-lg font-bold">{compat.score}/5</span>
                  </div>
                </div>

                {/* 総合相性 */}
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-2">
                  <h3 className="font-bold text-pink-700 flex items-center gap-2">
                    <span>🌿</span> 総合相性
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{compat.general}</p>
                </div>

                {/* 恋愛相性 */}
                <div className="bg-pink-50 rounded-3xl p-5 border border-pink-100 space-y-2">
                  <h3 className="font-bold text-pink-700 flex items-center gap-2">
                    <span>💕</span> 恋愛の相性
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{compat.love}</p>
                </div>

                <AdBanner />
                <RakutenWidget />

                {/* シェアボタン */}
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
                  <p className="text-center text-sm font-bold text-gray-600">結果をシェアする</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(compatShareText)}&url=${encodeURIComponent(PAGE_URL)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-black text-white text-sm font-bold hover:bg-gray-800 transition-colors"
                    >
                      <span className="text-base">𝕏</span> Xでシェア
                    </a>
                    <a
                      href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(PAGE_URL)}&text=${encodeURIComponent(compatShareText)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#06C755] text-white text-sm font-bold hover:bg-[#05b34d] transition-colors"
                    >
                      <span>💬</span> LINEでシェア
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setCompatPhase("input")}
                    className="py-3 rounded-2xl border-2 border-pink-200 text-pink-600 font-semibold text-sm hover:bg-pink-50 transition-colors"
                  >
                    別の相手で診断
                  </button>
                  <button
                    onClick={() => { setMyYear(""); setMyMonth(""); setMyDay(""); setPartnerYear(""); setPartnerMonth(""); setPartnerDay(""); setCompatPhase("input"); }}
                    className="py-3 rounded-2xl border-2 border-gray-200 text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors"
                  >
                    最初からやり直す
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
