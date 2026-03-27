"use client";

import { forwardRef, type CSSProperties } from "react";
import Image from "next/image";
import type { DinosaurStats } from "../data/dinosaurElementData";

type Props = {
  dinoName: string;
  elementName: string;
  elementEmoji: string;
  bgGradientClass: string;
  /** 属性背景（webp 等）。未配置時は bgGradientClass のグラデにフォールバック */
  bgImageSrc?: string;
  cardNo: number;
  imageSrc?: string;
  dinoEmoji: string;
  stats: DinosaurStats;
  talentLine: string;
  comboComment: string;
  shimmerFrom: string;
  shimmerTo: string;
  glowRgb: string;
  captureMode?: boolean;
};

const STAT_ROWS: { key: keyof DinosaurStats; label: string }[] = [
  { key: "attack", label: "こうげき力" },
  { key: "defense", label: "まもり力" },
  { key: "speed", label: "すばやさ" },
  { key: "intelligence", label: "かしこさ" },
  { key: "kindness", label: "やさしさ" },
  { key: "luck", label: "うん" },
];

const DinosaurTradingCard = forwardRef<HTMLDivElement, Props>(function DinosaurTradingCard({
  dinoName,
  elementName,
  elementEmoji,
  bgGradientClass,
  bgImageSrc,
  cardNo,
  imageSrc,
  dinoEmoji,
  stats,
  talentLine,
  comboComment,
  shimmerFrom,
  shimmerTo,
  glowRgb,
  captureMode = false,
}: Props, ref) {
  const style = {
    ["--d-shimmer-1" as string]: shimmerFrom,
    ["--d-shimmer-2" as string]: shimmerTo,
    ["--d-glow-rgb" as string]: glowRgb,
  } as CSSProperties;

  const bgStyle: CSSProperties | undefined = bgImageSrc
    ? {
        backgroundImage: `url(${bgImageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : undefined;

  return (
    <div ref={ref} className="dinosaur-tcard-border rounded-3xl p-1 max-w-md mx-auto" style={style}>
      <div className="rounded-[1.35rem] overflow-hidden bg-white shadow-inner">
        <div
          className={`relative px-4 pt-5 pb-4 text-white min-h-[200px] flex flex-col items-center justify-center ${
            !bgImageSrc ? `bg-gradient-to-br ${bgGradientClass}` : ""
          }`}
          style={bgStyle}
        >
          <div
            className={`absolute inset-0 pointer-events-none ${captureMode ? "bg-black/4" : bgImageSrc ? "bg-black/8" : "bg-black/0"}`}
          />
          {!captureMode && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <span className="glint glint-a" />
              <span className="glint glint-b" />
              <span className="aurora aurora-a" />
              <span className="aurora aurora-b" />
              <span className="sparkle sparkle-1" />
              <span className="sparkle sparkle-2" />
              <span className="sparkle sparkle-3" />
              <span className="sparkle sparkle-4" />
              <span className="sparkle sparkle-5" />
              <span className="sparkle sparkle-6" />
              <span className="sparkle sparkle-7" />
              <span className="sparkle sparkle-8" />
              <span className="sparkle-star sparkle-star-1" />
              <span className="sparkle-star sparkle-star-2" />
              <span className="sparkle-star sparkle-star-3" />
              <span className="sparkle-star sparkle-star-4" />
              <span className="sparkle-star sparkle-star-5" />
              <span className="shine-ring" />
            </div>
          )}
          <div className={`relative z-10 w-[60%] max-w-[220px] flex justify-center mb-2 ${captureMode ? "" : "dino-sway"}`}>
            {imageSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imageSrc}
                alt={dinoName}
                className="object-contain drop-shadow-lg w-full h-auto"
                width={220}
                height={220}
                loading="eager"
                decoding="sync"
                draggable={false}
              />
            ) : (
              <span className="text-[100px] leading-none drop-shadow-lg">{dinoEmoji}</span>
            )}
          </div>
          <p className="relative z-10 text-lg sm:text-xl font-black text-center leading-tight card-title-text">
            {elementEmoji} {elementName}の{dinoName}
          </p>
          <p className="relative z-10 text-xs mt-1 opacity-90 font-mono card-no-text">
            No.{String(cardNo).padStart(3, "0")}
          </p>
        </div>

        <div className="px-3 py-3 space-y-2 bg-gradient-to-b from-slate-50 to-white border-t border-slate-100">
          {STAT_ROWS.map(({ key, label }) => {
            const v = stats[key];
            return (
              <div key={key} className="flex items-center gap-2 text-xs">
                <span className="w-24 shrink-0 text-slate-600 font-medium">{label}</span>
                <div className="flex-1 h-2.5 rounded-full bg-slate-200 overflow-hidden min-w-0">
                  <div
                    className="stat-bar-fill h-full rounded-full transition-all"
                    style={{ width: `${v * 10}%` }}
                  />
                </div>
                <span className="w-5 text-right font-bold text-slate-700 tabular-nums">{v}</span>
              </div>
            );
          })}
        </div>

        <div className="px-4 pb-4 pt-1 space-y-2">
          <p className="text-xs font-bold text-emerald-800">才能：{talentLine}</p>
          <p className="text-xs text-slate-600 leading-relaxed">{comboComment}</p>
        </div>
      </div>
      <style jsx>{`
        .dino-sway {
          transform-origin: 50% 85%;
          animation: dinoSway 3.2s ease-in-out infinite;
          will-change: transform;
        }

        .card-title-text,
        .card-no-text {
          text-shadow:
            0 0 8px rgba(0, 0, 0, 0.7),
            0 2px 4px rgba(0, 0, 0, 0.5);
        }

        .sparkle {
          position: absolute;
          display: block;
          width: 11px;
          height: 11px;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0) 70%);
          filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.9));
          opacity: 0.55;
          animation: sparkleTwinkle 2.1s ease-in-out infinite;
        }

        .glint {
          position: absolute;
          width: 42%;
          height: 180%;
          top: -40%;
          background: linear-gradient(
            110deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.18) 40%,
            rgba(255, 255, 255, 0.6) 52%,
            rgba(255, 255, 255, 0.18) 64%,
            rgba(255, 255, 255, 0) 100%
          );
          mix-blend-mode: screen;
          filter: blur(1px);
          opacity: 0;
          transform: rotate(16deg);
        }

        .stat-bar-fill {
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            100deg,
            var(--d-shimmer-1) 0%,
            rgba(255, 255, 255, 0.72) 42%,
            var(--d-shimmer-2) 100%
          );
          background-size: 180% 100%;
          animation: statGradientShift 3.4s ease-in-out infinite;
        }

        .stat-bar-fill::after {
          content: "";
          position: absolute;
          top: -120%;
          left: -28%;
          width: 34%;
          height: 340%;
          background: linear-gradient(
            120deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.7) 48%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: rotate(18deg);
          animation: statSparkleSweep 1.9s linear infinite;
          filter: blur(0.4px);
        }

        .glint-a {
          left: -55%;
          animation: glintSweep 2.8s linear infinite;
        }

        .glint-b {
          left: -65%;
          animation: glintSweep 3.8s linear infinite;
          animation-delay: 1.1s;
        }

        .aurora {
          position: absolute;
          width: 60%;
          height: 45%;
          border-radius: 9999px;
          filter: blur(18px);
          opacity: 0.45;
          mix-blend-mode: screen;
        }

        .aurora-a {
          top: -10%;
          left: -8%;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0));
          animation: auroraFloatA 4.6s ease-in-out infinite;
        }

        .aurora-b {
          bottom: -12%;
          right: -10%;
          background: radial-gradient(circle at center, rgba(255, 245, 180, 0.45), rgba(255, 255, 255, 0));
          animation: auroraFloatB 5.1s ease-in-out infinite;
        }

        .sparkle-star {
          position: absolute;
          display: block;
          width: 18px;
          height: 18px;
          background: rgba(255, 255, 255, 0.96);
          clip-path: polygon(50% 0%, 62% 34%, 100% 50%, 62% 66%, 50% 100%, 38% 66%, 0% 50%, 38% 34%);
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.95));
          opacity: 0.72;
          animation: starPulse 1.8s ease-in-out infinite;
        }

        .sparkle-1 {
          top: 18%;
          left: 20%;
          animation-delay: 0s;
        }

        .sparkle-2 {
          top: 30%;
          right: 18%;
          width: 10px;
          height: 10px;
          animation-delay: 0.9s;
        }

        .sparkle-3 {
          bottom: 24%;
          right: 34%;
          width: 9px;
          height: 9px;
          animation-delay: 1.6s;
        }

        .sparkle-4 {
          top: 14%;
          right: 42%;
          width: 13px;
          height: 13px;
          animation-delay: 0.45s;
        }

        .sparkle-5 {
          bottom: 18%;
          left: 30%;
          width: 10px;
          height: 10px;
          animation-delay: 1.2s;
        }

        .sparkle-6 {
          top: 44%;
          left: 12%;
          width: 8px;
          height: 8px;
          animation-delay: 0.35s;
        }

        .sparkle-7 {
          top: 58%;
          right: 10%;
          width: 12px;
          height: 12px;
          animation-delay: 1.05s;
        }

        .sparkle-8 {
          top: 9%;
          right: 6%;
          width: 9px;
          height: 9px;
          animation-delay: 1.75s;
        }

        .sparkle-star-1 {
          top: 12%;
          left: 44%;
          animation-delay: 0.15s;
        }

        .sparkle-star-2 {
          top: 27%;
          right: 24%;
          width: 15px;
          height: 15px;
          animation-delay: 0.85s;
        }

        .sparkle-star-3 {
          bottom: 20%;
          left: 18%;
          width: 14px;
          height: 14px;
          animation-delay: 1.35s;
        }

        .sparkle-star-4 {
          top: 8%;
          left: 10%;
          width: 13px;
          height: 13px;
          animation-delay: 0.55s;
        }

        .sparkle-star-5 {
          bottom: 12%;
          right: 14%;
          width: 12px;
          height: 12px;
          animation-delay: 1.55s;
        }

        .shine-ring {
          position: absolute;
          inset: 10% 8% 12% 8%;
          border-radius: 26px;
          border: 1px solid rgba(255, 255, 255, 0.38);
          box-shadow:
            inset 0 0 16px rgba(255, 255, 255, 0.16),
            0 0 20px rgba(255, 255, 255, 0.2);
          animation: ringPulse 2.7s ease-in-out infinite;
          opacity: 0.7;
        }

        @keyframes dinoSway {
          0% {
            transform: rotate(-1.8deg) translateY(0);
          }
          50% {
            transform: rotate(1.8deg) translateY(-1px);
          }
          100% {
            transform: rotate(-1.8deg) translateY(0);
          }
        }

        @keyframes sparkleTwinkle {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(0.75);
          }
          50% {
            opacity: 1;
            transform: scale(1.45);
          }
        }

        @keyframes glintSweep {
          0% {
            left: -65%;
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          45% {
            opacity: 0.85;
          }
          65% {
            opacity: 0.25;
          }
          100% {
            left: 125%;
            opacity: 0;
          }
        }

        @keyframes statGradientShift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes statSparkleSweep {
          0% {
            left: -34%;
            opacity: 0;
          }
          18% {
            opacity: 0.85;
          }
          60% {
            opacity: 0.25;
          }
          100% {
            left: 112%;
            opacity: 0;
          }
        }

        @keyframes auroraFloatA {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.36;
          }
          50% {
            transform: translate(12px, 8px) scale(1.15);
            opacity: 0.62;
          }
        }

        @keyframes auroraFloatB {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-10px, -6px) scale(1.12);
            opacity: 0.52;
          }
        }

        @keyframes starPulse {
          0%,
          100% {
            opacity: 0.45;
            transform: scale(0.7) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1.35) rotate(14deg);
          }
        }

        @keyframes ringPulse {
          0%,
          100% {
            opacity: 0.42;
            transform: scale(0.992);
          }
          50% {
            opacity: 0.88;
            transform: scale(1.004);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .dino-sway {
            animation: none;
          }
          .glint,
          .aurora,
          .shine-ring {
            animation: none;
          }
          .stat-bar-fill,
          .stat-bar-fill::after {
            animation: none;
          }
          .sparkle {
            animation: none;
            opacity: 0.3;
          }
          .sparkle-star {
            animation: none;
            opacity: 0.45;
          }
        }
      `}</style>
    </div>
  );
});

export default DinosaurTradingCard;
