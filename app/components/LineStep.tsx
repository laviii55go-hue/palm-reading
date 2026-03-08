"use client";

import Image from "next/image";
import { LineDefinition, Selections } from "../types";

interface Props {
  step: LineDefinition;
  selections: Selections;
  onChange: (key: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function LineStep({
  step,
  selections,
  onChange,
  onNext,
  onBack,
  isFirst,
  isLast,
}: Props) {
  const visibleQuestions = step.questions.filter((q) => {
    if (!q.dependsOn) return true;
    return selections[q.dependsOn.key] === q.dependsOn.value;
  });

  const isComplete = visibleQuestions.every((q) => {
    if (selections[q.key] === "other") {
      return !!selections[`${q.key}_other`]?.trim();
    }
    return !!selections[q.key];
  });

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-purple-800">{step.title}</h2>
        <p className="text-gray-500 text-sm mt-1">{step.description}</p>
      </div>

      <div className="flex justify-center">
        <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-purple-100 bg-purple-50">
          <Image
            src={step.image}
            alt={`${step.title}の参考画像`}
            width={400}
            height={280}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      <div className="space-y-5">
        {visibleQuestions.map((q) => (
          <div key={q.key} className="space-y-2">
            <p className="font-medium text-gray-700">{q.label}</p>
            <div className="flex flex-wrap gap-2">
              {q.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => onChange(q.key, opt.value)}
                  className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                    selections[q.key] === opt.value
                      ? "bg-purple-600 text-white border-purple-600"
                      : "bg-white text-gray-600 border-gray-300 hover:border-purple-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
              <button
                onClick={() => onChange(q.key, "other")}
                className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                  selections[q.key] === "other"
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-white text-gray-600 border-gray-300 hover:border-purple-400"
                }`}
              >
                その他
              </button>
            </div>
            {selections[q.key] === "other" && (
              <input
                type="text"
                placeholder="手相の特徴を入力してください"
                value={selections[`${q.key}_other`] ?? ""}
                onChange={(e) => onChange(`${q.key}_other`, e.target.value)}
                className="w-full mt-2 px-4 py-2 rounded-xl border border-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <button
          onClick={onBack}
          className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
        >
          戻る
        </button>
        <button
          onClick={onNext}
          disabled={!isComplete}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold disabled:opacity-40 hover:bg-purple-700 transition-colors"
        >
          {isLast ? "鑑定する" : "次へ"}
        </button>
      </div>
    </div>
  );
}
