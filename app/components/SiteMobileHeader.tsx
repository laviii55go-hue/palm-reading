"use client";

import Link from "next/link";
import Image from "next/image";
import { useFortuneMenu } from "./FortuneMenuContext";

type SiteMobileHeaderProps = {
  title?: string;
  dark?: boolean;
  showSiteMap?: boolean;
  showMenu?: boolean;
};

export default function SiteMobileHeader({
  title = "手のひらの予言者",
  dark = false,
  showSiteMap = true,
  showMenu = true,
}: SiteMobileHeaderProps) {
  const { toggle } = useFortuneMenu();

  const shellClass = dark
    ? "sticky top-0 z-40 border-b border-white/10 bg-slate-900"
    : "sticky top-0 z-40 border-b border-purple-100/70 bg-white";

  const titleClass = dark
    ? "truncate text-lg font-black tracking-wide text-white"
    : "truncate text-lg font-black tracking-wide text-purple-950";

  const actionClass = dark
    ? "grid h-10 w-10 place-items-center rounded-full border border-transparent text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
    : "grid h-10 w-10 place-items-center rounded-full border border-transparent text-purple-800 transition-colors hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300";

  return (
    <header className={shellClass}>
      <div className="mx-auto flex h-16 w-full max-w-lg items-center justify-between px-4">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2">
          <Image
            src="/app-icon.webp"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-xl object-cover"
            priority
          />
          <span className={titleClass}>{title}</span>
        </Link>
        <div className="flex shrink-0 items-center gap-1">
          {showSiteMap ? (
            <Link href="/site-map" className={actionClass} aria-label="サイト内を探す">
              <span className="text-2xl leading-none">⌕</span>
            </Link>
          ) : null}
          {showMenu ? (
            <button type="button" onClick={toggle} className={actionClass} aria-label="占い一覧を開く">
              <span className="text-3xl leading-none">≡</span>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
