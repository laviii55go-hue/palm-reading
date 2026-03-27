"use client";

import { useMemo } from "react";

type VictoryEffectProps = {
  isActive: boolean;
};

type Sparkle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  color: string;
};

const SPARKLE_COLORS = ["#FFD700", "#FFFFFF", "#FFFACD", "#FFA500", "#FFD700", "#FFFFFF"];

export default function VictoryEffect({ isActive }: VictoryEffectProps) {
  const sparkles = useMemo<Sparkle[]>(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: 10 + Math.random() * 80,
      top: 5 + Math.random() * 90,
      size: 4 + Math.random() * 8,
      delay: Math.random() * 2,
      duration: 1 + Math.random() * 1.5,
      color: SPARKLE_COLORS[i % SPARKLE_COLORS.length],
    }));
  }, []);

  if (!isActive) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden>
      {/* 層1: 放射状ゴールドバースト */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-[180%] h-[180%] will-change-transform"
          style={{
            background: "conic-gradient(from 0deg, transparent 0deg, rgba(255,215,0,0.25) 10deg, transparent 20deg, transparent 40deg, rgba(255,165,0,0.2) 50deg, transparent 60deg, transparent 80deg, rgba(255,215,0,0.25) 90deg, transparent 100deg, transparent 120deg, rgba(255,165,0,0.2) 130deg, transparent 140deg, transparent 160deg, rgba(255,215,0,0.25) 170deg, transparent 180deg, transparent 200deg, rgba(255,165,0,0.2) 210deg, transparent 220deg, transparent 240deg, rgba(255,215,0,0.25) 250deg, transparent 260deg, transparent 280deg, rgba(255,165,0,0.2) 290deg, transparent 300deg, transparent 320deg, rgba(255,215,0,0.25) 330deg, transparent 340deg, transparent 360deg)",
            mask: "radial-gradient(circle, transparent 15%, black 40%, transparent 80%)",
            WebkitMask: "radial-gradient(circle, transparent 15%, black 40%, transparent 80%)",
            animation: "victory-rotate 20s linear infinite",
          }}
        />
      </div>

      {/* 層2: キラキラ星パーティクル */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute will-change-transform"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            borderRadius: s.size > 8 ? "1px" : "50%",
            boxShadow: `0 0 ${s.size}px ${s.color}`,
            animation: `sparkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            opacity: 0,
            transform: s.size > 8 ? "rotate(45deg)" : undefined,
          }}
        />
      ))}

      {/* 層3: 拡大リングエフェクト（1回だけ） */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="rounded-full border-4 border-yellow-300/70 will-change-transform"
          style={{
            width: 60,
            height: 60,
            animation: "victory-ring 1s ease-out forwards",
            boxShadow: "0 0 20px rgba(255,215,0,0.4)",
          }}
        />
      </div>
    </div>
  );
}
