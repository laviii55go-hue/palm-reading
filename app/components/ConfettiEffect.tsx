"use client";

import { useEffect, useState, useMemo } from "react";

type ConfettiEffectProps = {
  isActive: boolean;
  color?: string;
  duration?: number;
};

type Particle = {
  id: number;
  left: number;
  size: number;
  delay: number;
  rotation: number;
  hueShift: number;
  shape: "square" | "circle";
  drift: number;
  fallDuration: number;
  lightness: number;
};

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

export default function ConfettiEffect({
  isActive,
  color = "#EAB308",
  duration = 2000,
}: ConfettiEffectProps) {
  const [visible, setVisible] = useState(false);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: 4 + Math.random() * 6,
      delay: Math.random() * 0.6,
      rotation: Math.random() * 360,
      hueShift: (Math.random() - 0.5) * 60,
      shape: Math.random() > 0.5 ? "square" : "circle",
      drift: (Math.random() - 0.5) * 80,
      fallDuration: 1.2 + Math.random() * 0.8,
      lightness: Math.max(30, Math.min(80, 50 + (Math.random() - 0.5) * 30)),
    }));
  }, []);

  useEffect(() => {
    if (!isActive) {
      setVisible(false);
      return;
    }
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [isActive, duration]);

  if (!visible) return null;

  const [h, s] = hexToHsl(color);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden
    >
      {particles.map((p) => {
        const ph = (h + p.hueShift + 360) % 360;
        return (
          <div
            key={p.id}
            className="absolute will-change-transform"
            style={{
              left: `${p.left}%`,
              top: "-10px",
              width: p.size,
              height: p.size,
              borderRadius: p.shape === "circle" ? "50%" : "2px",
              backgroundColor: `hsl(${ph}, ${s}%, ${p.lightness}%)`,
              transform: `rotate(${p.rotation}deg)`,
              "--confetti-drift": `${p.drift}px`,
              animation: `confetti-fall ${p.fallDuration}s ease-out ${p.delay}s forwards`,
              opacity: 0,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}
