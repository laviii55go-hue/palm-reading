"use client";

import { useState } from "react";
import { ReadingResult, FortuneType, Selections } from "../types";
import { SECTION_STYLES, FORTUNE_OPTIONS } from "../data/fortunes";
import AdBanner from "./AdBanner";
import RakutenWidget from "./RakutenWidget";
import RakutenFortuneItems from "./RakutenFortuneItems";

interface Props {
  result: ReadingResult;
  fortuneType: FortuneType;
  selections: Selections;
  onReset: () => void;
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-lg ${i <= score ? "opacity-100" : "opacity-20"}`}>
          ⭐
        </span>
      ))}
    </div>
  );
}

export default function Result({ result, fortuneType, selections, onReset }: Props) {
  const fortune = FORTUNE_OPTIONS.find((f) => f.id === fortuneType)!;

  const [harshOpen, setHarshOpen] = useState(false);
  const [harshText, setHarshText] = useState("");
  const [harshLoading, setHarshLoading] = useState(false);

  const handleHarshToggle = async () => {
    if (!harshOpen && !harshText) {
      setHarshLoading(true);
      try {
        const res = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fortuneType, selections, harsh: true }),
        });
        const data = await res.json();
        setHarshText(data.harshSummary ?? "取得できませんでした");
      } catch {
        setHarshText("取得できませんでした");
      } finally {
        setHarshLoading(false);
      }
    }
    setHarshOpen((prev) => !prev);
  };

  const siteUrl = "https://jade-torte-9b5cde.netlify.app/";
  const suffix = `\n\n無料で試せるよ👇\n${siteUrl}\n#手相診断 #占い`;

  // X：280文字制限のため全文が入らない場合は切り詰める
  const xHeader = `手相診断したら衝撃の結果が出た😱\n\n「`;
  const xFooter = `」${suffix}`;
  const xMaxSummary = 280 - xHeader.length - xFooter.length;
  const xSummary = result.summary.length <= xMaxSummary
    ? result.summary
    : result.summary.slice(0, xMaxSummary - 1) + "…";
  const xText = `${xHeader}${xSummary}${xFooter}`;

  // LINE：文字数制限なし。全文そのまま
  const lineText = `手相診断したら衝撃の結果が出た😱\n\n「${result.summary}」${suffix}`;

  const handleShareX = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(xText)}`, "_blank");
  };

  const handleShareLine = () => {
    window.open(`https://line.me/R/msg/text/?${encodeURIComponent(lineText)}`, "_blank");
  };

  return (
    <div className="space-y-5">
      <div className="text-center">
        <div className="text-4xl mb-1">{fortune.emoji}</div>
        <h2 className="text-2xl font-bold text-purple-800">{fortune.label} 鑑定結果</h2>
        <p className="text-gray-400 text-xs mt-1">あなたの手相から読み取りました</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {result.sections.map((section) => {
          const style = SECTION_STYLES[section.key] ?? {
            gradient: "from-gray-50 to-gray-100",
            border: "border-gray-200",
            text: "text-gray-700",
            emoji: "✨",
            title: section.title,
          };
          return (
            <div
              key={section.key}
              className={`rounded-2xl border-2 p-4 bg-gradient-to-br ${style.gradient} ${style.border}`}
            >
              <div className="text-xl mb-1">{style.emoji}</div>
              <div className={`font-bold text-sm ${style.text}`}>{style.title}</div>
              <Stars score={section.score} />
              <p className="text-gray-600 text-xs mt-2 leading-relaxed">{section.text}</p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-100 p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🔮</span>
          <span className="font-bold text-amber-700">総合アドバイス</span>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">{result.summary}</p>
      </div>

      <div className="rounded-2xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
        <button
          onClick={handleHarshToggle}
          className="w-full flex items-center justify-between px-4 py-3 text-left"
        >
          <div className="flex items-center gap-2">
            <span className="text-xl">🔥</span>
            <span className="font-bold text-red-700 text-sm">辛口鑑定を見る（閲覧注意）</span>
          </div>
          <span className="text-red-400 text-sm">{harshOpen ? "▲" : "▼"}</span>
        </button>
        {harshOpen && (
          <div className="px-4 pb-4">
            {harshLoading ? (
              <p className="text-sm text-gray-400 animate-pulse">鑑定中...</p>
            ) : (
              <p className="text-gray-700 text-sm leading-relaxed">{harshText}</p>
            )}
          </div>
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleShareX}
          className="flex-1 py-3 rounded-xl bg-black text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors"
        >
          <span className="font-bold">𝕏</span> でシェア
        </button>
        <button
          onClick={handleShareLine}
          className="flex-1 py-3 rounded-xl bg-green-500 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
        >
          <span>LINE</span> でシェア
        </button>
      </div>

      <RakutenFortuneItems fortuneType={fortuneType} />

      <AdBanner />

      <RakutenWidget />

      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
      >
        もう一度占う
      </button>
    </div>
  );
}
