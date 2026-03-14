"use client";

import { useState } from "react";
import Link from "next/link";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import {
  BLOOD_TYPE_DATA,
  BLOOD_TYPE_COMPAT,
  type BloodType,
} from "../data/bloodTypeData";

type Tab = "personal" | "compatibility";

const BLOOD_TYPES: BloodType[] = ["A", "B", "O", "AB"];

export default function BloodTypePage() {
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [myType, setMyType] = useState<BloodType | null>(null);
  const [partnerType, setPartnerType] = useState<BloodType | null>(null);

  const myEntry = myType ? BLOOD_TYPE_DATA[myType] : null;
  const partnerEntry = partnerType ? BLOOD_TYPE_DATA[partnerType] : null;
  const compat =
    myType && partnerType ? BLOOD_TYPE_COMPAT[myType][partnerType] : null;

  const compatColor =
    compat?.level === "good"
      ? "border-green-300 bg-green-50"
      : compat?.level === "caution"
        ? "border-amber-300 bg-amber-50"
        : "border-gray-200 bg-gray-50";

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* ヘッダー */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-rose-600 text-sm hover:underline"
          >
            ← トップに戻る
          </Link>
        </div>

        <div className="text-center space-y-2">
          <div className="text-5xl">🩸</div>
          <h1 className="text-2xl font-bold text-rose-800">血液型占い</h1>
          <p className="text-gray-500 text-sm">
            血液型から性格・恋愛・相性を診断
          </p>
        </div>

        {/* タブ */}
        <div className="flex rounded-2xl bg-white/80 p-1 gap-1 border border-rose-100">
          {(
            [
              { id: "personal" as Tab, label: "🩸 性格診断" },
              { id: "compatibility" as Tab, label: "💕 相性診断" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-rose-500 text-white shadow"
                  : "text-rose-600 hover:bg-rose-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg border border-rose-100 p-6">
          {/* ══ 性格診断タブ ══ */}
          {activeTab === "personal" && (
            <div className="space-y-6">
              <p className="text-center text-gray-600 text-sm">
                あなたの血液型を選んでください
              </p>

              <div className="grid grid-cols-4 gap-3">
                {BLOOD_TYPES.map((type) => {
                  const entry = BLOOD_TYPE_DATA[type];
                  const isSelected = myType === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setMyType(type)}
                      className={`rounded-2xl border-2 p-4 text-center transition-all ${
                        isSelected
                          ? "border-rose-400 bg-rose-50 shadow-md scale-105"
                          : "border-gray-200 hover:border-rose-200 hover:bg-rose-50/50"
                      }`}
                    >
                      <span className="text-2xl block mb-1">{entry.emoji}</span>
                      <span className="font-bold text-rose-800 text-lg">
                        {type}型
                      </span>
                    </button>
                  );
                })}
              </div>

              {myEntry && (
                <div className="space-y-4 pt-4 border-t border-rose-100">
                  <div className="text-center space-y-1">
                    <div className="text-4xl">{myEntry.emoji}</div>
                    <h2 className="text-xl font-bold text-rose-800">
                      {myEntry.type}型
                    </h2>
                    <p className="text-sm text-rose-600 font-medium">
                      {myEntry.title}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center">
                    {myEntry.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>

                  <div className="rounded-2xl border-2 border-rose-200 bg-rose-50/50 p-4">
                    <p className="font-bold text-rose-700 text-sm mb-2">
                      ✨ 性格
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {myEntry.personality}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-green-200 bg-green-50 p-3">
                      <p className="text-green-700 font-bold text-xs mb-2">
                        💪 強み
                      </p>
                      <ul className="space-y-1">
                        {myEntry.strengths.map((s) => (
                          <li key={s} className="text-gray-600 text-xs">
                            ・{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3">
                      <p className="text-amber-700 font-bold text-xs mb-2">
                        ⚠️ 注意点
                      </p>
                      <ul className="space-y-1">
                        {myEntry.weaknesses.map((w) => (
                          <li key={w} className="text-gray-600 text-xs">
                            ・{w}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="rounded-2xl border-2 border-pink-200 bg-pink-50 p-4">
                    <p className="font-bold text-pink-700 text-sm mb-1">
                      💕 恋愛傾向
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {myEntry.love}
                    </p>
                  </div>

                  <div className="rounded-2xl border-2 border-blue-200 bg-blue-50 p-4">
                    <p className="font-bold text-blue-700 text-sm mb-1">
                      💼 仕事・適職
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {myEntry.career}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <div className="flex-1 rounded-2xl border border-rose-200 bg-rose-50 p-3 text-center">
                      <p className="text-rose-600 text-xs font-medium">
                        ラッキーカラー
                      </p>
                      <p className="text-rose-800 font-bold text-sm mt-1">
                        {myEntry.luckyColor}
                      </p>
                    </div>
                    <div className="flex-1 rounded-2xl border border-gray-200 bg-gray-50 p-3 text-center">
                      <p className="text-gray-500 text-xs font-medium">
                        ラッキーアイテム
                      </p>
                      <p className="text-gray-700 font-bold text-sm mt-1">
                        {myEntry.luckyItem}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setMyType(null)}
                    className="w-full py-3 rounded-xl border-2 border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
                  >
                    別の血液型で見る
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ══ 相性診断タブ ══ */}
          {activeTab === "compatibility" && (
            <div className="space-y-6">
              <p className="text-center text-gray-600 text-sm">
                あなたと相手の血液型を選んでください
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-bold text-rose-700 mb-2">
                    👤 あなた
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setMyType(type)}
                        className={`rounded-xl border-2 py-2 text-center text-sm font-bold transition-all ${
                          myType === type
                            ? "border-rose-400 bg-rose-50 text-rose-800"
                            : "border-gray-200 text-gray-500 hover:border-rose-200"
                        }`}
                      >
                        {type}型
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-bold text-pink-600 mb-2">
                    💕 相手
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {BLOOD_TYPES.map((type) => (
                      <button
                        key={type}
                        onClick={() => setPartnerType(type)}
                        className={`rounded-xl border-2 py-2 text-center text-sm font-bold transition-all ${
                          partnerType === type
                            ? "border-pink-400 bg-pink-50 text-pink-800"
                            : "border-gray-200 text-gray-500 hover:border-pink-200"
                        }`}
                      >
                        {type}型
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {compat && myEntry && partnerEntry && (
                <div className="space-y-4 pt-4 border-t border-rose-100">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-center flex-1 rounded-2xl border-2 border-rose-200 bg-rose-50 p-3">
                      <span className="text-2xl">{myEntry.emoji}</span>
                      <div className="font-bold text-rose-800">{myEntry.type}型</div>
                    </div>
                    <span className="text-2xl text-rose-400">×</span>
                    <div className="text-center flex-1 rounded-2xl border-2 border-pink-200 bg-pink-50 p-3">
                      <span className="text-2xl">{partnerEntry.emoji}</span>
                      <div className="font-bold text-pink-800">
                        {partnerEntry.type}型
                      </div>
                    </div>
                  </div>

                  <div
                    className={`rounded-2xl border-2 p-4 ${compatColor}`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">
                        {compat.level === "good"
                          ? "✨"
                          : compat.level === "caution"
                            ? "⚠️"
                            : "📌"}
                      </span>
                      <span className="font-bold text-sm">
                        {compat.level === "good"
                          ? "相性バッチリ"
                          : compat.level === "caution"
                            ? "相性に注意"
                            : "相性は普通"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {compat.message}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setMyType(null);
                      setPartnerType(null);
                    }}
                    className="w-full py-3 rounded-xl border-2 border-rose-200 text-rose-600 font-semibold hover:bg-rose-50 transition-colors"
                  >
                    最初からやり直す
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <AdBanner />
        <RakutenWidget />
        <FooterLinks className="text-center" />
      </div>
    </div>
  );
}
