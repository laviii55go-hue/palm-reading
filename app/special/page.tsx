"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SPECIAL_LINE_DEFINITIONS, SpecialLineDefinition } from "../data/specialLines";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";

type Phase = "select" | "questions" | "result";

interface SpecialResult {
  title: string;
  overview: string;
  personality: string;
  fortune: string;
  lucky: string;
  score: number;
}

function Stars({ score }: { score: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`text-lg ${i <= score ? "opacity-100" : "opacity-20"}`}>⭐</span>
      ))}
    </div>
  );
}

export default function SpecialPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [selectedLine, setSelectedLine] = useState<SpecialLineDefinition | null>(null);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [result, setResult] = useState<SpecialResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectLine = (line: SpecialLineDefinition) => {
    setSelectedLine(line);
    setSelections({});
    setResult(null);
    setError(null);
  };

  const handleStart = () => {
    if (!selectedLine) return;
    setPhase("questions");
  };

  const handleChange = (key: string, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const isComplete = selectedLine?.questions.every((q) => {
    if (selections[q.key] === "free") return !!selections[`${q.key}_free`]?.trim();
    return !!selections[q.key];
  }) ?? false;

  const handleSubmit = async () => {
    if (!selectedLine) return;
    setLoading(true);
    setError(null);

    const finalSelections: Record<string, string> = {};
    for (const q of selectedLine.questions) {
      if (selections[q.key] === "free") {
        finalSelections[q.key] = selections[`${q.key}_free`] ?? "その他";
      } else {
        finalSelections[q.key] = selections[q.key];
      }
    }

    try {
      const res = await fetch("/api/special", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lineKey: selectedLine.key, selections: finalSelections }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "API error");
      setResult(data.result);
      setPhase("result");
    } catch (e) {
      setError(e instanceof Error ? e.message : "エラーが発生しました");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setPhase("select");
    setSelectedLine(null);
    setSelections({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <Link href="/" className="text-purple-400 text-sm hover:underline">← 手相診断に戻る</Link>
          <h1 className="text-2xl font-bold text-purple-900 mt-2">✨ 特殊手相チェッカー</h1>
          <p className="text-gray-500 text-sm mt-1">あなたの手にある？幸運の特別な手相</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-5xl animate-pulse">✨</div>
              <p className="text-purple-700 font-medium">鑑定中です...</p>
              <p className="text-gray-400 text-xs">少々お待ちください</p>
            </div>
          ) : phase === "select" ? (
            <div className="space-y-5">
              <div className="text-center">
                <p className="text-gray-600 text-sm">あなたの手にある特殊な手相を選んでください</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {SPECIAL_LINE_DEFINITIONS.map((line) => (
                  <button
                    key={line.key}
                    onClick={() => handleSelectLine(line)}
                    className={`rounded-2xl border-2 p-3 text-left transition-all ${
                      selectedLine?.key === line.key
                        ? "border-purple-500 bg-purple-50 shadow-md scale-[1.02]"
                        : "border-gray-200 bg-white hover:border-purple-300"
                    }`}
                  >
                    {selectedLine?.key === line.key && (
                      <div className="flex justify-end mb-1">
                        <div className="w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      </div>
                    )}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2 bg-purple-50">
                      <Image src={line.image} alt={line.name} fill className="object-contain" />
                    </div>
                    <div className="text-lg mb-0.5">{line.emoji}</div>
                    <div className="font-bold text-sm text-purple-800">{line.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{line.description}</div>
                  </button>
                ))}
              </div>

              <button
                onClick={handleStart}
                disabled={!selectedLine}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
              >
                鑑定を始める →
              </button>
            </div>
          ) : phase === "questions" && selectedLine ? (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl mb-1">{selectedLine.emoji}</div>
                <h2 className="text-xl font-bold text-purple-800">{selectedLine.name}</h2>
                <p className="text-gray-500 text-sm mt-1">特徴を教えてください</p>
              </div>

              <div className="flex justify-center">
                <div className="relative w-full max-w-xs rounded-xl overflow-hidden border border-purple-100 bg-purple-50">
                  <Image
                    src={selectedLine.image}
                    alt={selectedLine.name}
                    width={400}
                    height={280}
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>

              <div className="space-y-5">
                {selectedLine.questions.map((q) => (
                  <div key={q.key} className="space-y-2">
                    <p className="font-medium text-gray-700">{q.label}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => handleChange(q.key, opt.value)}
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
                        onClick={() => handleChange(q.key, "free")}
                        className={`px-4 py-2 rounded-full border text-sm transition-colors ${
                          selections[q.key] === "free"
                            ? "bg-purple-600 text-white border-purple-600"
                            : "bg-white text-gray-600 border-gray-300 hover:border-purple-400"
                        }`}
                      >
                        その他
                      </button>
                    </div>
                    {selections[q.key] === "free" && (
                      <input
                        type="text"
                        placeholder="手相の特徴を入力してください"
                        value={selections[`${q.key}_free`] ?? ""}
                        onChange={(e) => handleChange(`${q.key}_free`, e.target.value)}
                        className="w-full mt-2 px-4 py-2 rounded-xl border border-purple-300 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                      />
                    )}
                  </div>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm text-center">{error}</p>}

              <div className="flex justify-between pt-2">
                <button
                  onClick={() => setPhase("select")}
                  className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  戻る
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!isComplete}
                  className="px-6 py-2 rounded-lg bg-purple-600 text-white font-semibold disabled:opacity-40 hover:bg-purple-700 transition-colors"
                >
                  鑑定する
                </button>
              </div>
            </div>
          ) : phase === "result" && result && selectedLine ? (
            <div className="space-y-5">
              <div className="text-center">
                <div className="text-4xl mb-1">{selectedLine.emoji}</div>
                <h2 className="text-xl font-bold text-purple-800">{result.title}</h2>
                <p className="text-gray-400 text-xs mt-1">あなたの手相から読み取りました</p>
              </div>

              <div className="flex justify-center">
                <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl px-6 py-3 flex items-center gap-3">
                  <span className="text-sm font-bold text-amber-700">希少度・強運度</span>
                  <Stars score={result.score} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">✨</span>
                    <span className="font-bold text-purple-700 text-sm">この手相の意味</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.overview}</p>
                </div>

                <div className="rounded-2xl border-2 border-pink-200 bg-gradient-to-br from-pink-50 to-rose-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">💎</span>
                    <span className="font-bold text-pink-700 text-sm">性格・気質</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.personality}</p>
                </div>

                <div className="rounded-2xl border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">🔮</span>
                    <span className="font-bold text-amber-700 text-sm">運勢・アドバイス</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{result.fortune}</p>
                </div>

                <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 p-4 flex items-center gap-3">
                  <span className="text-2xl">🍀</span>
                  <div>
                    <div className="font-bold text-green-700 text-sm">ラッキーポイント</div>
                    <div className="text-gray-600 text-sm mt-0.5">{result.lucky}</div>
                  </div>
                </div>
              </div>

              <AdBanner />

              <RakutenWidget />

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl border-2 border-purple-300 text-purple-700 font-semibold hover:bg-purple-50 transition-colors"
              >
                別の手相を見る
              </button>

              <Link
                href="/"
                className="block w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm text-center hover:bg-purple-700 transition-colors"
              >
                🔮 手相診断を始める
              </Link>
            </div>
          ) : null}
        </div>

        <div className="text-center mt-4">
          <a href="/privacy" className="text-gray-400 text-xs hover:underline">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
