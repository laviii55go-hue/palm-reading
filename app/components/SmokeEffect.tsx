"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SmokeEffectProps = {
  isActive: boolean;
  onComplete?: () => void;
};

const SMOKE_LAYERS = [
  {
    src: "/dinosaur/battle/smoke_1.webp",
    alt: "煙（大）",
    className: "w-[55%] sm:w-[50%]",
    animation: "smoke-drift-1 3s ease-in-out infinite",
    delay: "0s",
  },
  {
    src: "/dinosaur/battle/smoke_2.webp",
    alt: "煙（中）",
    className: "w-[40%]",
    animation: "smoke-drift-2 2.5s ease-in-out infinite",
    delay: "0.5s",
  },
  {
    src: "/dinosaur/battle/smoke_3.webp",
    alt: "煙（小）",
    className: "w-[35%]",
    animation: "smoke-drift-3 2s ease-in-out infinite",
    delay: "1s",
  },
];

export default function SmokeEffect({ isActive, onComplete }: SmokeEffectProps) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (isActive) {
      setFading(false);
    } else {
      setFading(true);
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  return (
    <div
      className="pointer-events-none absolute inset-0 flex items-center justify-center z-10 overflow-hidden"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 1s ease-out",
      }}
      aria-hidden
    >
      {SMOKE_LAYERS.map((layer, i) => (
        <div
          key={i}
          className={`absolute ${layer.className}`}
          style={{
            animation: layer.animation,
            animationDelay: layer.delay,
          }}
        >
          <Image
            src={layer.src}
            alt={layer.alt}
            width={300}
            height={300}
            className="w-full h-auto object-contain"
            priority
          />
        </div>
      ))}
    </div>
  );
}
