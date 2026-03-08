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

export default function FortuneSelect({ selected, onSelect, onStart }: Props) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="text-5xl mb-3">🖐</div>
        <h2 className="text-2xl font-bold text-purple-800">何を占いますか？</h2>
        <p className="text-gray-500 text-sm mt-1">知りたい運勢を選んでください</p>
      </div>

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
      </div>

      <button
        onClick={onStart}
        disabled={!selected}
        className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
      >
        手相を入力する →
      </button>

      <AdBanner />
    </div>
  );
}
