"use client";

import { useState } from "react";
import { Selections, FortuneType, ReadingResult, LineDefinition } from "../types";
import { LINE_DEFINITIONS } from "../data/lines";
import { FORTUNE_LINE_KEYS } from "../data/fortuneSteps";
import FortuneSelect from "./FortuneSelect";
import StepIndicator from "./StepIndicator";
import LineStep from "./LineStep";
import Result from "./Result";

type Phase = "select" | "steps" | "result";

export default function PalmReading() {
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
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-purple-900">手相診断</h1>
          <p className="text-gray-500 text-sm mt-1">あなたの手相から運勢を鑑定します</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          {loading ? (
            <div className="text-center py-12 space-y-3">
              <div className="text-5xl animate-pulse">🔮</div>
              <p className="text-purple-700 font-medium">鑑定中です...</p>
              <p className="text-gray-400 text-xs">少々お待ちください</p>
            </div>
          ) : phase === "select" ? (
            <FortuneSelect
              selected={fortuneType}
              onSelect={setFortuneType}
              onStart={handleStart}
            />
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
            <Result result={result} fortuneType={fortuneType!} onReset={handleReset} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
