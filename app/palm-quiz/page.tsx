"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { QUIZ_QUESTIONS, QUIZ_RESULTS } from "../data/palmQuizData";

type HandChoice = "left" | "right";

export default function PalmQuizPage() {
  const [selectedHand, setSelectedHand] = useState<HandChoice | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<keyof typeof QUIZ_RESULTS | null>(null);

  const currentQ = QUIZ_QUESTIONS[step];
  const isLastStep = step === QUIZ_QUESTIONS.length - 1;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQ.id]: value };
    setAnswers(newAnswers);

    if (isLastStep) {
      const typeCounts: Record<string, number> = {};
      QUIZ_QUESTIONS.forEach((q) => {
        const opt = q.options.find((o) => o.value === newAnswers[q.id]);
        if (opt) {
          typeCounts[opt.type] = (typeCounts[opt.type] || 0) + 1;
        }
      });
      const sorted = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
      const winner = sorted[0]?.[0] || "balance";
      setResult(winner as keyof typeof QUIZ_RESULTS);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setSelectedHand(null);
    }
  };

  const handleReset = () => {
    setSelectedHand(null);
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  // 手の選択画面
  if (selectedHand === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          <div className="text-center">
            <Link href="/" className="text-xs text-purple-600 hover:underline">← トップに戻る</Link>
            <h1 className="text-2xl font-black text-purple-900 mt-3">🖐 【簡易】手相タイプ診断</h1>
            <p className="text-purple-600 text-sm mt-1">どちらの手で診断しますか？</p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 space-y-4">
            <p className="text-gray-600 text-sm text-center">
              手相では左右で意味が異なります。左手は生まれ持った性質、右手は現在の姿を表します。
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setSelectedHand("left")}
                className="p-6 rounded-2xl border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all text-center"
              >
                <span className="text-4xl block mb-2">🤚</span>
                <span className="font-bold text-purple-800">左手</span>
                <p className="text-xs text-gray-500 mt-1">生まれ持った性質・潜在能力</p>
              </button>
              <button
                onClick={() => setSelectedHand("right")}
                className="p-6 rounded-2xl border-2 border-purple-200 hover:bg-purple-50 hover:border-purple-300 transition-all text-center"
              >
                <span className="text-4xl block mb-2">✋</span>
                <span className="font-bold text-purple-800">右手</span>
                <p className="text-xs text-gray-500 mt-1">現在の姿・社会生活での傾向</p>
              </button>
            </div>
          </div>

          <AdBanner />
        </div>
      </div>
    );
  }

  if (result && QUIZ_RESULTS[result]) {
    const r = QUIZ_RESULTS[result];
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          <div className="text-center">
            <Link href="/" className="text-xs text-purple-600 hover:underline">← トップに戻る</Link>
            <h1 className="text-2xl font-black text-purple-900 mt-3">🖐 【簡易】手相タイプ診断</h1>
            <p className="text-purple-600 text-sm">
              {selectedHand === "left" ? "左手" : "右手"}の診断結果
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-6 text-center">
            <p className="text-xs text-purple-600 font-medium mb-2">
              {selectedHand === "left"
                ? "🤚 左手：生まれ持った性質・潜在能力"
                : "✋ 右手：現在の姿・社会生活での傾向"}
            </p>
            <div className="text-6xl mb-3">{r.emoji}</div>
            <h2 className="text-xl font-black text-purple-800 mb-2">{r.name}</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">{r.description}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {r.keywords.map((kw) => (
                <span key={kw} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                  {kw}
                </span>
              ))}
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-left">
              <p className="text-amber-800 text-sm font-medium">💡 アドバイス</p>
              <p className="text-gray-600 text-sm mt-1">{r.advice}</p>
            </div>
          </div>

          <Link
            href="/"
            className="block w-full py-4 rounded-2xl bg-purple-600 text-white font-bold text-center shadow-md"
          >
            🔮 手相診断を始める
          </Link>
          <button
            onClick={handleReset}
            className="block w-full py-3 rounded-2xl border-2 border-purple-200 text-purple-600 font-semibold text-sm"
          >
            もう一度診断する
          </button>

          <AdBanner />
          <RakutenWidget />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <Link href="/" className="text-xs text-purple-600 hover:underline">← トップに戻る</Link>
          <h1 className="text-2xl font-black text-purple-900 mt-3">🖐 【簡易】手相タイプ診断</h1>
          <p className="text-purple-600 text-sm">
            あなたの手相から性格タイプを診断（{step + 1}/{QUIZ_QUESTIONS.length}）
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 space-y-6">
          {"image" in currentQ && currentQ.image && (
            <div className="text-center">
              <p className="text-xs text-purple-600 font-medium mb-2">
                {"lineName" in currentQ && currentQ.lineName ? `📌 ${currentQ.lineName}` : null}
              </p>
              <div className="relative w-full max-w-[200px] mx-auto aspect-square">
                <Image
                  src={currentQ.image}
                  alt={("lineName" in currentQ && currentQ.lineName) || "手相の線"}
                  fill
                  className="object-contain"
                  sizes="200px"
                />
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <span className="text-4xl">{currentQ.emoji}</span>
            <h2 className="text-lg font-bold text-purple-800">{currentQ.question}</h2>
          </div>
          <div className="space-y-3">
            {currentQ.options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => handleAnswer(opt.value)}
                className="w-full p-4 rounded-2xl border-2 border-purple-200 text-left hover:bg-purple-50 hover:border-purple-300 transition-all font-medium text-gray-700"
              >
                {opt.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleBack}
            className="text-sm text-purple-500 hover:underline"
          >
            ← {step > 0 ? "前の質問に戻る" : "手の選択に戻る"}
          </button>
        </div>

        <AdBanner />
      </div>
    </div>
  );
}
