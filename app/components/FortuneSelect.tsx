"use client";

import Link from "next/link";
import { FortuneType } from "../types";
import { FORTUNE_OPTIONS } from "../data/fortunes";
import AdBanner from "./AdBanner";

interface Props {
  selected: FortuneType | null;
  onSelect: (type: FortuneType) => void;
  onStart: () => void;
}

type CategoryColor = "purple" | "indigo" | "green" | "violet";

const CATEGORY_STYLES: Record<CategoryColor, { bg: string; text: string; border: string }> = {
  purple: { bg: "bg-purple-200", text: "text-purple-800", border: "border-purple-300" },
  indigo: { bg: "bg-indigo-200", text: "text-indigo-800", border: "border-indigo-300" },
  green:  { bg: "bg-green-200",  text: "text-green-800",  border: "border-green-300"  },
  violet: { bg: "bg-violet-200", text: "text-violet-800", border: "border-violet-300" },
};

function CategoryLabel({ emoji, label, color }: { emoji: string; label: string; color: CategoryColor }) {
  const s = CATEGORY_STYLES[color];
  return (
    <div className={`flex items-center rounded-xl overflow-hidden border ${s.border} ${s.bg} px-4 py-2 mt-2`}>
      <span className="text-lg mr-2">{emoji}</span>
      <span className={`font-black text-base ${s.text}`}>{label}</span>
    </div>
  );
}

export default function FortuneSelect({ selected, onSelect, onStart }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-3">🖐</div>
        <h2 className="text-2xl font-bold text-purple-800">何を占いますか？</h2>
        <p className="text-gray-500 text-sm mt-1">カテゴリから選んでください</p>
      </div>

      {/* ── 手相占い ── */}
      <div className="space-y-3">
        <CategoryLabel emoji="🖐" label="手相占い" color="purple" />

        <Link
          href="/guide"
          className="block w-full py-2.5 rounded-xl border-2 border-purple-200 text-purple-600 font-semibold text-sm text-center hover:bg-purple-50 transition-colors"
        >
          📖 手相の基本知識を読む
        </Link>

        <div className="grid grid-cols-2 gap-3">
          {FORTUNE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                selected === opt.id
                  ? `bg-gradient-to-br ${opt.gradient} ${opt.border} shadow-md scale-[1.02]`
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {selected === opt.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <div className="text-2xl mb-1">{opt.emoji}</div>
              <div className={`font-bold text-sm ${selected === opt.id ? opt.text : "text-gray-700"}`}>
                {opt.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{opt.description}</div>
            </button>
          ))}
          <Link
            href="/special"
            className="relative p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="text-2xl mb-1">✨</div>
            <div className="font-bold text-sm text-amber-700">特殊手相</div>
            <div className="text-xs text-amber-500 mt-0.5">ますかけ線・太陽線など</div>
            <div className="absolute bottom-2 right-3 text-amber-400 text-xs">→</div>
          </Link>
          <Link
            href="/mole"
            className="relative p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="text-2xl mb-1">🔵</div>
            <div className="font-bold text-sm text-blue-700">ほくろ占い</div>
            <div className="text-xs text-blue-400 mt-0.5">手のほくろの位置で診断</div>
            <div className="absolute bottom-2 right-3 text-blue-400 text-xs">→</div>
          </Link>
        </div>

        <button
          onClick={onStart}
          disabled={!selected}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
        >
          手相を入力する →
        </button>
      </div>

      <AdBanner />

      {/* ── 夢占い ── */}
      <div className="space-y-3">
        <CategoryLabel emoji="🌙" label="夢占い" color="indigo" />
        <Link
          href="/dream-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-600 font-semibold text-sm text-center hover:bg-indigo-50 transition-colors"
        >
          📖 夢占いの基本知識を読む
        </Link>
        <Link
          href="/dream"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-indigo-50 to-slate-100 border-indigo-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🌙</div>
          <div>
            <div className="font-bold text-sm text-indigo-800">夢占い</div>
            <div className="text-xs text-indigo-500 mt-0.5">見た夢からメッセージを読み解く</div>
          </div>
          <div className="absolute right-4 text-indigo-400 text-sm">→</div>
        </Link>
      </div>

      {/* ── 動物占い ── */}
      <div className="space-y-3">
        <CategoryLabel emoji="🐾" label="動物占い" color="green" />
        <Link
          href="/animal-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-green-200 text-green-600 font-semibold text-sm text-center hover:bg-green-50 transition-colors"
        >
          📖 動物占いの基本知識を読む
        </Link>
        <Link
          href="/animal"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🐾</div>
          <div>
            <div className="font-bold text-sm text-green-800">動物占い</div>
            <div className="text-xs text-green-500 mt-0.5">生年月日で60種の動物キャラを診断</div>
          </div>
          <div className="absolute right-4 text-green-400 text-sm">→</div>
        </Link>
      </div>

      {/* ── 数秘術 ── */}
      <div className="space-y-3">
        <CategoryLabel emoji="🔢" label="数秘術" color="violet" />
        <Link
          href="/numerology-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-violet-200 text-violet-600 font-semibold text-sm text-center hover:bg-violet-50 transition-colors"
        >
          📖 数秘術の基本知識を読む
        </Link>
        <Link
          href="/lucky-number"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-violet-50 to-purple-50 border-violet-300 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🔢</div>
          <div>
            <div className="font-bold text-sm text-violet-800">数秘術占い</div>
            <div className="text-xs text-violet-500 mt-0.5">生年月日で運命数を読み解く</div>
          </div>
          <div className="absolute right-4 text-violet-400 text-sm">→</div>
        </Link>
      </div>

      <AdBanner />
    </div>
  );
}
