"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import {
  QUIZ_QUESTIONS,
  QUIZ_QUESTIONS_FULL,
  PERSONALITY_TYPES,
  calcPersonalityType,
} from "../data/personalityData";

type Phase = "start" | "quiz" | "result";
type QuizMode = "short" | "full";

const PAGE_URL = "https://jade-torte-9b5cde.netlify.app/personality";

export default function PersonalityPage() {
  const [phase, setPhase] = useState<Phase>("start");
  const [quizMode, setQuizMode] = useState<QuizMode | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [resultCode, setResultCode] = useState<string | null>(null);

  const questions = quizMode === "full" ? QUIZ_QUESTIONS_FULL : QUIZ_QUESTIONS;
  const question = questions[currentQ];
  const totalQ = questions.length;
  const progress = ((currentQ + 1) / totalQ) * 100;

  const handleAnswer = (value: "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P") => {
    const newScores = { ...scores, [value]: scores[value] + 1 };
    setScores(newScores);
    if (currentQ + 1 < totalQ) {
      setCurrentQ((c) => c + 1);
    } else {
      setResultCode(calcPersonalityType(newScores));
      setPhase("result");
    }
  };

  const handleReset = () => {
    setPhase("start");
    setQuizMode(null);
    setCurrentQ(0);
    setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setResultCode(null);
  };

  const startQuiz = (mode: QuizMode) => {
    setQuizMode(mode);
    setPhase("quiz");
  };

  const result = resultCode ? PERSONALITY_TYPES[resultCode] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50">
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        {/* ヘッダー */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xs text-teal-600 hover:underline">← トップに戻る</Link>
            <Link href="/personality-guide" className="text-xs text-teal-600 border border-teal-300 rounded-full px-3 py-1 hover:bg-teal-50 transition-colors">📖 ガイド</Link>
          </div>
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            <Image
              src="/personality-top.png"
              alt="16タイプ性格診断"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-teal-800 mt-3">🧠 16タイプ性格診断</h1>
          <p className="text-teal-600 text-sm">
            {quizMode ? `${totalQ}問の質問であなたの性格タイプを診断` : "8問 or 24問で性格タイプを診断"}
          </p>
        </div>

        {/* ═══ スタート画面 ═══ */}
        {phase === "start" && (
          <>
            <div className="bg-white rounded-3xl shadow-sm p-6 space-y-4">
              <p className="text-gray-600 text-sm leading-relaxed text-center">
                4つの軸（外向/内向・感覚/直感・思考/感情・判断/知覚）から、あなたに近い性格タイプを16種類の中から診断します。
              </p>
              <p className="text-gray-500 text-xs text-center mb-4">
                診断のバージョンを選んでください
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => startQuiz("short")}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <span className="block text-lg">簡易版（8問）</span>
                  <span className="block text-sm font-normal text-teal-100 mt-0.5">約2分・サクッと診断</span>
                </button>
                <button
                  onClick={() => startQuiz("full")}
                  className="w-full py-4 rounded-2xl border-2 border-teal-300 text-teal-700 font-bold shadow-sm hover:bg-teal-50 transition-all active:scale-95"
                >
                  <span className="block text-lg">詳細版（24問）</span>
                  <span className="block text-sm font-normal text-teal-600 mt-0.5">約5分・より精度の高い診断</span>
                </button>
              </div>
            </div>
            <AdBanner />
          </>
        )}

        {/* ═══ クイズ画面 ═══ */}
        {phase === "quiz" && question && (
          <div className="bg-white rounded-3xl shadow-sm p-6 space-y-6">
            <div className="flex justify-between text-sm text-teal-600">
              <span>質問 {currentQ + 1} / {totalQ}</span>
            </div>
            <div className="h-2 bg-teal-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <h2 className="text-lg font-bold text-gray-800">{question.text}</h2>
            <div className="space-y-3">
              {question.options.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="w-full py-4 px-4 rounded-2xl border-2 border-teal-200 text-teal-800 font-semibold text-left hover:bg-teal-50 hover:border-teal-300 transition-all active:scale-[0.98]"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ═══ 結果画面 ═══ */}
        {phase === "result" && result && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 text-white text-center shadow-lg">
              <p className="text-teal-200 text-sm mb-2">あなたの性格タイプは</p>
              <div className="text-4xl font-black mb-1">
                {result.code}
                <br />
                （{result.nickname}）
              </div>
              <p className="text-teal-200 text-sm">タイプ</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-2">
              <h3 className="font-bold text-teal-800 flex items-center gap-2">
                <span>✨</span> 基本性格
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">{result.personality}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
                <div className="text-pink-600 font-bold text-sm mb-2">💕 恋愛</div>
                <p className="text-gray-600 text-xs leading-relaxed">{result.love}</p>
              </div>
              <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                <div className="text-blue-600 font-bold text-sm mb-2">💼 仕事</div>
                <p className="text-gray-600 text-xs leading-relaxed">{result.work}</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
              <div>
                <span className="text-teal-600 font-bold text-sm">💪 強み：</span>
                <span className="text-gray-600 text-sm ml-1">{result.strength}</span>
              </div>
              <div>
                <span className="text-amber-600 font-bold text-sm">⚠️ 弱み：</span>
                <span className="text-gray-600 text-sm ml-1">{result.weakness}</span>
              </div>
            </div>

            <AdBanner />
            <RakutenWidget />

            {/* シェアボタン */}
            {(() => {
              const shareText = `🧠 16タイプ性格診断の結果\n${result.code}（${result.nickname}）タイプでした！\n\nあなたも試してみてください👇\n${PAGE_URL}\n#16タイプ性格診断 #性格診断 #占い好きな人と繋がりたい`;
              const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
              const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(shareText)}`;
              return (
                <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
                  <p className="text-center text-sm font-bold text-gray-600">結果をシェアする</p>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={xUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-black text-white font-bold text-sm hover:bg-gray-800 transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                      X でシェア
                    </a>
                    <a href={lineUrl} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[#06C755] text-white font-bold text-sm hover:bg-[#05b34c] transition-colors">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.630 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" /></svg>
                      LINE でシェア
                    </a>
                  </div>
                </div>
              );
            })()}

            <button
              onClick={handleReset}
              className="w-full py-3 rounded-2xl border-2 border-teal-200 text-teal-600 font-semibold text-sm hover:bg-teal-50 transition-colors"
            >
              もう一度診断する
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
