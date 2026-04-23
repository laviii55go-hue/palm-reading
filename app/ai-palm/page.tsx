"use client";

import { useState } from "react";
import Link from "next/link";
import { Selections, FortuneType, ReadingResult, LineDefinition } from "../types";
import { LINE_DEFINITIONS } from "../data/lines";
import { FORTUNE_LINE_KEYS } from "../data/fortuneSteps";
import { FORTUNE_OPTIONS } from "../data/fortunes";
import StepIndicator from "../components/StepIndicator";
import LineStep from "../components/LineStep";
import Result from "../components/Result";
import FooterLinks from "../components/FooterLinks";
import TopBannerLink from "../components/TopBannerLink";

type Phase = "select" | "steps" | "result";

export default function AiPalmPage() {
  const [phase, setPhase] = useState<Phase>("select");
  const [fortuneType, setFortuneType] = useState<FortuneType | null>(null);
  const [steps, setSteps] = useState<LineDefinition[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Selections>({});
  const [result, setResult] = useState<ReadingResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    if (!fortuneType) return;
    const lineKeys = FORTUNE_LINE_KEYS[fortuneType];
    setSteps(lineKeys.map((k) => LINE_DEFINITIONS[k]));
    setCurrentStep(0);
    setSelections({});
    setPhase("steps");
  };

  const handleChange = (key: string, value: string) => {
    setSelections((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      await fetchReading();
    }
  };

  const handleBack = () => {
    if (currentStep === 0) {
      setPhase("select");
    } else {
      setCurrentStep((s) => s - 1);
    }
  };

  const fetchReading = async () => {
    setLoading(true);
    setError(null);

    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetch("/api/reading", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ selections, fortuneType }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "API error");
        }
        setResult(data.result);
        setPhase("result");
        setLoading(false);
        return;
      } catch (e) {
        if (attempt === MAX_RETRIES) {
          setError(`エラー: ${e instanceof Error ? e.message : String(e)}`);
          setLoading(false);
          return;
        }
        await new Promise((r) => setTimeout(r, RETRY_DELAY));
      }
    }
    setLoading(false);
  };

  const handleReset = () => {
    setPhase("select");
    setFortuneType(null);
    setSteps([]);
    setCurrentStep(0);
    setSelections({});
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <TopBannerLink />
          <Link
            href="/"
            className="text-purple-600 text-xs border border-purple-300 rounded-full px-3 py-1 hover:bg-purple-50 transition-colors"
          >
            ← トップへ
          </Link>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-purple-900">AI手相診断</h1>
          <p className="text-gray-500 text-sm mt-1">手相からあなたの運勢をAIが読み解きます</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-5xl animate-pulse">🔮</div>
              <p className="text-purple-700 font-medium">鑑定中です...</p>
              <p className="text-gray-400 text-xs">少々お待ちください</p>
            </div>
          ) : phase === "select" ? (
            <div className="space-y-6">
              <p className="text-center text-gray-600 text-sm">
                どの運勢を占いますか？運勢を選んで手相を入力してください
              </p>

              <div className="grid grid-cols-2 gap-3">
                {FORTUNE_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setFortuneType(opt.id)}
                    className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                      fortuneType === opt.id
                        ? `bg-gradient-to-br ${opt.gradient} ${opt.border} shadow-md scale-[1.02]`
                        : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    {fortuneType === opt.id && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                    <div className="text-2xl mb-1">{opt.emoji}</div>
                    <div
                      className={`font-bold text-sm ${fortuneType === opt.id ? opt.text : "text-gray-700"}`}
                    >
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
                {/* Vercel Hobby プラン 商用利用NG規約対応のため A8.net 広告タイル（占い鑑定 PR枠）を削除（2026/04/23） */}
                {/* 収益化見込みが立った段階で Vercel Pro 切替＋元の <a href="https://px.a8.net/svt/ejp?a8mat=..."> 復活 */}
              </div>

              <button
                onClick={handleStart}
                disabled={!fortuneType}
                className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
              >
                手相を入力する →
              </button>
            </div>
          ) : phase === "steps" ? (
            <>
              <StepIndicator steps={steps} currentStep={currentStep} />
              {error && (
                <p className="text-red-500 text-sm text-center mb-4">{error}</p>
              )}
              <LineStep
                step={steps[currentStep]}
                selections={selections}
                onChange={handleChange}
                onNext={handleNext}
                onBack={handleBack}
                isFirst={false}
                isLast={currentStep === steps.length - 1}
              />
            </>
          ) : result ? (
            <Result
              result={result}
              fortuneType={fortuneType!}
              selections={selections}
              onReset={handleReset}
            />
          ) : null}
        </div>

        <FooterLinks className="text-center mt-4" />
      </div>
    </div>
  );
}
