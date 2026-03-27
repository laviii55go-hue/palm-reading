"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useFortuneMenu } from "./FortuneMenuContext";

const HEADER_HEIGHT = 56; // BottomHeader h-14

const MENU_ITEMS = [
  {
    label: "毎日チェック",
    emoji: "☀️",
    links: [
      { href: "/daily-fortune-ranking", label: "今日の運勢ランキング", emoji: "🏆" },
      { href: "/tarot", label: "タロット3択占い", emoji: "🔮" },
      { href: "/calendar", label: "開運カレンダー", emoji: "📅" },
    ],
  },
  {
    label: "自分を診断",
    emoji: "🔍",
    links: [
      { href: "/palm-quiz", label: "簡易手相タイプ診断", emoji: "📋" },
      { href: "/ai-palm", label: "AI手相診断", emoji: "🔮" },
      { href: "/personality", label: "16タイプ性格診断", emoji: "🧠" },
      { href: "/animal", label: "動物占い", emoji: "🐾" },
      { href: "/lucky-number", label: "数秘術占い", emoji: "🔢" },
      { href: "/dinosaur-fortune", label: "恐竜占い", emoji: "🦖" },
      { href: "/dinosaur-fortune?tab=collection", label: "マイ図鑑", emoji: "📖" },
      { href: "/dinosaur-guide", label: "恐竜図鑑", emoji: "📚" },
    ],
  },
  {
    label: "気になったら",
    emoji: "✨",
    links: [
      { href: "/dream", label: "夢占い", emoji: "🌙" },
      { href: "/blood-type", label: "血液型占い", emoji: "🩸" },
      { href: "/name-fortune", label: "姓名判断", emoji: "✍️" },
      { href: "/mole", label: "ほくろ占い", emoji: "🔵" },
      { href: "/special", label: "特殊手相", emoji: "✨" },
    ],
  },
  {
    label: "その他",
    emoji: "📖",
    links: [
      { href: "/guides", label: "基本知識まとめ", emoji: "📖" },
      { href: "/articles", label: "記事一覧", emoji: "📝" },
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
        className="fixed left-0 right-0 top-0 z-[60] bg-black/20 transition-opacity duration-200"
        style={{ bottom: HEADER_HEIGHT }}
        aria-hidden
      />

      {/* ドロップダウン（ヘッダー直上・中央配置） */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[70] w-[min(320px,calc(100vw-32px))] max-h-[70vh] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col"
        style={{ bottom: HEADER_HEIGHT + 8 }}
      >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 shrink-0">
          <h3 className="font-bold text-slate-800 text-sm">占い一覧</h3>
          <button
            type="button"
            onClick={close}
            className="p-2 -m-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors touch-manipulation"
            aria-label="閉じる"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto overscroll-contain py-3 px-3 space-y-4">
          {MENU_ITEMS.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-1.5 mb-1.5 px-2">
                <span className="text-base">{group.emoji}</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{group.label}</span>
              </div>
              <div className="space-y-0.5">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <span className="text-lg">{link.emoji}</span>
                    <span className="font-medium text-sm">{link.label}</span>
                    <span className="ml-auto text-slate-400 text-xs">→</span>
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
