"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFortuneMenu } from "./FortuneMenuContext";

const NAV_LINKS = [
  { href: "/", label: "トップ", icon: "/icons/icon01.png" },
  { href: "/daily-fortune-ranking", label: "今日の運勢", icon: "/icons/icon02.png" },
  { href: "/guides", label: "基本知識", icon: "/icons/icon04.png" },
  { href: "/articles", label: "記事", icon: "/icons/icon05.png" },
] as const;

export default function BottomHeader() {
  const pathname = usePathname();
  const { isOpen, toggle } = useFortuneMenu();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-[80] border-t border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
      aria-label="メインナビゲーション"
    >
      <div className="flex items-center justify-around h-14 max-w-lg mx-auto px-2">
        {NAV_LINKS.slice(0, 2).map(({ href, label, icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1 rounded-lg text-[10px] transition-colors hover:bg-violet-100 active:bg-violet-200 focus-visible:bg-violet-100 focus-visible:outline-none ${
                isActive ? "text-violet-600 font-semibold bg-violet-100" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Image src={icon} alt="" width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
              <span className="mt-0.5 truncate max-w-full text-[10px]">{label}</span>
            </Link>
          );
        })}
        <button
          type="button"
          onClick={toggle}
          className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1 rounded-lg text-[10px] transition-colors hover:bg-violet-100 active:bg-violet-200 focus-visible:bg-violet-100 focus-visible:outline-none ${
            isOpen ? "text-violet-600 font-semibold bg-violet-100" : "text-slate-500 hover:text-slate-700"
          }`}
          aria-label={isOpen ? "占い一覧を閉じる" : "占い一覧を開く"}
        >
          <Image src="/icons/icon03.png" alt="" width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
          <span className="mt-0.5 truncate max-w-full">占い</span>
        </button>
        {NAV_LINKS.slice(2).map(({ href, label, icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-1 rounded-lg text-[10px] transition-colors hover:bg-violet-100 active:bg-violet-200 focus-visible:bg-violet-100 focus-visible:outline-none ${
                isActive ? "text-violet-600 font-semibold bg-violet-100" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Image src={icon} alt="" width={32} height={32} className="w-8 h-8 object-contain" unoptimized />
              <span className="mt-0.5 truncate max-w-full text-[10px]">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
