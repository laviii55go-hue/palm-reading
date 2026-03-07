"use client";

import { ReadingResult, FortuneType } from "../types";
import { SECTION_STYLES, FORTUNE_OPTIONS } from "../data/fortunes";
import AdBanner from "./AdBanner";

interface Props {
  result: ReadingResult;
  fortuneType: FortuneType;
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

export default function Result({ result, fortuneType, onReset }: Props) {
  const fortune = FORTUNE_OPTIONS.find((f) => f.id === fortuneType)!;

  const siteUrl = "https://jade-torte-9b5cde.netlify.app/";
  const quote = result.summary.slice(0, 45);
  const shareText = `手相診断したら衝撃の結果が出た😱\n\n「${quote}...」\n\n無料で試せるよ👇\n${siteUrl}\n#手相診断 #占い`;

  const handleShareX = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
  };

  const handleShareLine = () => {
    const url = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
    window.open(url, "_blank");
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

      <AdBanner />

      <button
        onClick={onReset}
        className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
      >
        もう一度占う
      </button>
    </div>
  );
}
