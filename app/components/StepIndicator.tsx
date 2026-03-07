"use client";

import { LineDefinition } from "../types";

interface Props {
  steps: LineDefinition[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={step.lineKey} className="flex items-center gap-2">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
              i < currentStep
                ? "bg-purple-600 text-white"
                : i === currentStep
                ? "bg-purple-400 text-white ring-2 ring-purple-300"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {i < currentStep ? "✓" : i + 1}
          </div>
          <span
            className={`text-xs hidden sm:block ${
              i === currentStep ? "text-purple-700 font-semibold" : "text-gray-400"
            }`}
          >
            {step.title}
          </span>
          {i < steps.length - 1 && (
            <div
              className={`w-6 h-0.5 ${i < currentStep ? "bg-purple-600" : "bg-gray-200"}`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
