"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useFortuneMenu } from "./FortuneMenuContext";

const TOP_HEADER_HEIGHT = 64; // mobile top header h-16

const MENU_ITEMS = [
  {
    label: "今日のおすすめ",
    links: [
      { href: "/daily-fortune-ranking", label: "今日の運勢ランキング", imageSrc: "/v2-daily-moon.png" },
      { href: "/tarot", label: "タロット占い", imageSrc: "/v2-daily-tarot-card.png" },
      { href: "/calendar", label: "開運カレンダー", imageSrc: "/v2-daily-calendar.png" },
    ],
  },
  {
    label: "自分を診断",
    links: [
      { href: "/jibun-koyomi", label: "じぶん暦", imageSrc: "/v2-diagnosis-jibun-koyomi.png" },
      { href: "/palm-quiz", label: "手相タイプ診断", imageSrc: "/v2-diagnosis-palm.png" },
      { href: "/personality", label: "16タイプ性格診断", imageSrc: "/v2-diagnosis-personality.png" },
      { href: "/animal", label: "動物占い", imageSrc: "/v2-diagnosis-animal.png" },
      { href: "/lucky-number", label: "数秘術占い", imageSrc: "/v2-diagnosis-numerology.png" },
      { href: "/dinosaur-fortune", label: "恐竜占い", imageSrc: "/v2-diagnosis-dinosaur.png" },
      { href: "/sanmeigaku", label: "算命学占い", imageSrc: "/v2-diagnosis-sanmeigaku.png" },
      { href: "/kyusei", label: "九星気学占い", imageSrc: "/v2-diagnosis-kyusei.png" },
    ],
  },
  {
    label: "気になったら",
    links: [
      { href: "/blood-type", label: "血液型占い", imageSrc: "/v2-diagnosis-blood-type.png" },
      { href: "/name-fortune", label: "姓名判断", imageSrc: "/v2-diagnosis-name-fortune.png" },
    ],
  },
  {
    label: "その他",
    links: [
      { href: "/guides", label: "基本知識まとめ", imageSrc: "/icons/icon04.webp" },
      { href: "/articles", label: "記事一覧", imageSrc: "/icons/icon05.webp" },
    ],
  },
] as const;

export default function FortuneMenuSheet() {
  const { isOpen, close } = useFortuneMenu();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  if (!isOpen) return null;

  return (
    <>
      {/* 薄いオーバーレイ（クリックで閉じる・ヘッダーは覆わない） */}
      <div
        role="button"
        tabIndex={0}
        onClick={close}
        className="fixed left-0 right-0 z-[60] bg-black/20 transition-opacity duration-200"
        style={{ top: TOP_HEADER_HEIGHT, bottom: 0 }}
        aria-hidden
      />

      {/* ドロップダウン（上部ヘッダーに合わせる） */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[70] w-[min(380px,calc(100vw-24px))] max-h-[calc(100vh-88px)] overflow-hidden rounded-[26px] border border-purple-100 bg-gradient-to-b from-white via-violet-50/80 to-rose-50/70 shadow-2xl shadow-purple-950/18 flex flex-col"
        style={{ top: TOP_HEADER_HEIGHT + 8 }}
      >
        <div className="flex items-center justify-between border-b border-purple-100/80 bg-white/82 px-5 py-3.5 shrink-0 backdrop-blur">
          <div>
            <p className="text-[10px] font-black tracking-[0.18em] text-amber-400">FORTUNE MENU</p>
            <h3 className="mt-0.5 text-[18px] font-black leading-none text-purple-950 [font-family:var(--font-jp-display)]">
              占い一覧
            </h3>
          </div>
          <button
            type="button"
            onClick={close}
            className="grid h-9 w-9 place-items-center rounded-full bg-white text-purple-700 shadow-md shadow-purple-100 transition-colors hover:bg-purple-700 hover:text-white focus-visible:bg-purple-700 focus-visible:text-white focus-visible:outline-none touch-manipulation"
            aria-label="閉じる"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain px-3.5 py-4 space-y-4">
          {MENU_ITEMS.map((group) => (
            <div key={group.label}>
              <div className="mb-2 flex items-center justify-center gap-2 text-center">
                <span className="text-amber-400">✦</span>
                <span className="text-[13px] font-black tracking-wide text-purple-950 [font-family:var(--font-jp-sans)]">
                  {group.label}
                </span>
                <span className="text-amber-400">✦</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="group relative min-h-[78px] overflow-hidden rounded-2xl border border-white bg-white/86 px-2.5 py-2.5 shadow-sm shadow-purple-100/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:bg-white hover:shadow-md hover:shadow-purple-200/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-200"
                  >
                    <div className="absolute -bottom-2 -right-2 h-16 w-16 opacity-90 transition-transform duration-200 group-hover:scale-105">
                      <Image src={link.imageSrc} alt="" fill sizes="64px" className="object-contain" />
                    </div>
                    <div className="relative z-10 flex min-h-[58px] flex-col">
                      <span className="max-w-[5.8rem] text-[12px] font-black leading-[1.35] text-purple-950 [font-family:var(--font-jp-sans)]">
                        {link.label}
                      </span>
                      <span className="mt-auto grid h-6 w-6 place-items-center rounded-full bg-violet-50 text-base font-black text-purple-700 shadow-sm shadow-purple-100 transition-colors group-hover:bg-purple-700 group-hover:text-white">
                        ›
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
