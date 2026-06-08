"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import FortuneSelect from "./FortuneSelect";
import FooterLinks from "./FooterLinks";
import { useFortuneMenu } from "./FortuneMenuContext";

const DESKTOP_NAV = [
  { href: "/daily-fortune-ranking", label: "今日の運勢" },
  { href: "/guides", label: "基本知識" },
  { href: "/articles", label: "記事" },
  { href: "/site-map", label: "サイトマップ" },
] as const;

type PreviewMode = "web" | "mobile";

export default function PalmReading() {
  const { toggle } = useFortuneMenu();
  const [isEmbeddedPreview] = useState(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("device") === "mobile";
  });
  const [previewMode, setPreviewMode] = useState<PreviewMode>(() => {
    if (typeof window === "undefined") return "web";
    if (new URLSearchParams(window.location.search).get("device") === "mobile") return "web";
    return window.localStorage.getItem("palmReadingPreviewMode") === "mobile" ? "mobile" : "web";
  });
  const showPreviewSwitch = !isEmbeddedPreview;

  const changePreviewMode = (mode: PreviewMode) => {
    setPreviewMode(mode);
    window.localStorage.setItem("palmReadingPreviewMode", mode);
  };

  if (showPreviewSwitch && previewMode === "mobile") {
    return (
      <main className="min-h-screen bg-slate-950 px-3 py-4 text-white">
        <div className="mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-6xl flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
            <div>
              <div className="text-sm font-black">手のひらの予言者</div>
              <div className="text-xs text-white/60">スマホ版プレビュー</div>
            </div>
            <div className="flex rounded-full border border-white/20 bg-black/20 p-1">
              <button
                type="button"
                onClick={() => changePreviewMode("web")}
                className="rounded-full px-4 py-2 text-xs font-bold text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                WEB
              </button>
              <button
                type="button"
                onClick={() => changePreviewMode("mobile")}
                className="rounded-full bg-white px-4 py-2 text-xs font-black text-slate-950 shadow-sm"
              >
                スマホ
              </button>
            </div>
          </div>

          <div className="flex flex-1 items-start justify-center overflow-auto">
            <div className="rounded-[36px] border border-white/15 bg-slate-900 p-3 shadow-2xl">
              <iframe
                title="スマホ版プレビュー"
                src="/?device=mobile"
                className="h-[844px] w-[390px] rounded-[28px] border-0 bg-white"
              />
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf8_0%,#fff7fb_38%,#ffffff_100%)] text-slate-900 md:bg-[radial-gradient(circle_at_top_left,#fef3c7_0,#fdf2f8_24%,#f8fafc_58%,#ffffff_100%)]">
      {showPreviewSwitch ? (
        <div className="fixed right-4 top-4 z-[90] hidden rounded-full border border-purple-100 bg-white/95 p-1 shadow-lg shadow-purple-100/70 backdrop-blur md:flex">
          <button
            type="button"
            onClick={() => changePreviewMode("web")}
            className="rounded-full bg-purple-700 px-4 py-2 text-xs font-black text-white shadow-sm"
          >
            WEB
          </button>
          <button
            type="button"
            onClick={() => changePreviewMode("mobile")}
            className="rounded-full px-4 py-2 text-xs font-bold text-purple-800 transition-colors hover:bg-purple-50"
          >
            スマホ
          </button>
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-6xl px-3 pb-10 pt-0 sm:px-6 md:pt-4 lg:px-8 lg:pb-14 lg:pt-6">
        <header className="hidden items-center justify-between rounded-2xl border border-white/80 bg-white/75 px-5 py-3 shadow-sm backdrop-blur md:flex">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/app-icon.webp"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 rounded-xl object-cover"
              priority
            />
            <div>
              <div className="text-sm font-black text-slate-900">手のひらの予言者</div>
              <div className="text-xs text-slate-500">無料で楽しめる総合占いサイト</div>
            </div>
          </Link>
          <nav className="flex items-center gap-1" aria-label="ブラウザ版ナビゲーション">
            {DESKTOP_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-colors hover:bg-white hover:text-slate-950 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        <header className="sticky top-0 z-40 -mx-3 flex h-16 items-center justify-between border-b border-purple-100/80 bg-white/95 px-4 shadow-sm backdrop-blur md:hidden">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src="/app-icon.webp"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 shrink-0 rounded-xl object-cover"
              priority
            />
            <span className="truncate text-xl font-black tracking-wide text-purple-950">手のひらの予言者</span>
          </Link>
          <div className="flex items-center gap-2 text-purple-800">
            <Link
              href="/site-map"
              className="grid h-10 w-10 place-items-center rounded-full border border-transparent transition-colors hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
              aria-label="サイト内を探す"
            >
              <span className="text-2xl leading-none">⌕</span>
            </Link>
            <button
              type="button"
              onClick={toggle}
              className="grid h-10 w-10 place-items-center rounded-full border border-transparent transition-colors hover:bg-purple-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300"
              aria-label="占い一覧を開く"
            >
              <span className="text-3xl leading-none">≡</span>
            </button>
          </div>
        </header>

        <section className="grid gap-4 pb-5 pt-3 md:gap-6 md:py-10 md:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] md:items-center lg:gap-10">
          <div className="space-y-5 md:space-y-5">
            <div className="hidden md:block">
              <Image
                src="/top-banner.webp"
                alt="手のひらの予言者"
                width={400}
                height={120}
                className="h-12 w-auto object-contain"
                priority
              />
            </div>

            <div className="relative isolate overflow-hidden rounded-[28px] border border-purple-100 bg-white shadow-xl shadow-purple-100/70 md:hidden">
              <Image
                src="/v2-hero-bg1.png"
                alt=""
                width={900}
                height={720}
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-95"
                priority
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/86 via-white/52 to-white/10" />
              <div className="min-h-[410px] px-5 py-8">
                <h1 className="max-w-[17rem] text-[28px] font-black leading-[1.32] tracking-wide text-purple-950 [font-family:'Yu_Mincho','YuMincho','Hiragino_Mincho_ProN',var(--font-geist-sans),serif]">
                  総合占いで、<br />
                  あなたの未来を<br />
                  楽しく紐解く
                </h1>
                <p className="mt-5 max-w-[17rem] text-[12.5px] font-medium leading-5 text-purple-950/80 [font-family:'Yu_Gothic','YuGothic','Hiragino_Kaku_Gothic_ProN',var(--font-geist-sans),sans-serif]">
                  手相・タロット・星占い・数秘術など、さまざまな占いであなたの「今」と「未来」を優しく照らします。
                </p>
                <div className="mt-5 flex max-w-[16rem] flex-col gap-3">
                  <Link
                    href="/daily-fortune-ranking"
                    className="rounded-full bg-gradient-to-r from-purple-700 to-violet-500 px-5 py-3 text-center text-sm font-black text-white shadow-lg shadow-purple-300/60"
                  >
                    今日の運勢をみる　→
                  </Link>
                  <a
                    href="#fortune-menu"
                    className="rounded-full border border-purple-200 bg-white/90 px-5 py-3 text-center text-sm font-black text-purple-900 shadow-sm"
                  >
                    人気の占い一覧　→
                  </a>
                </div>
              </div>
            </div>

            <div className="hidden space-y-4 md:block">
              <div className="inline-flex rounded-full border border-rose-200 bg-white/80 px-3 py-1 text-xs font-bold text-rose-700 shadow-sm">
                手相・タロット・数秘術・性格診断
              </div>
              <div>
                <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">
                  手のひらの予言者
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                  その日の気分や知りたいことに合わせて、気軽に占いを選べます。毎日の運勢から自分らしさの診断まで、今のあなたに合う入口を探してみてください。
                </p>
              </div>
            </div>

            <div className="hidden grid-cols-3 gap-2 rounded-2xl border border-white/80 bg-white/70 p-2 shadow-sm backdrop-blur md:grid">
              {[
                ["12+", "占いメニュー"],
                ["毎日", "運勢チェック"],
                ["無料", "登録なし"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl bg-white px-2 py-3 text-center">
                  <div className="text-lg font-black text-slate-950">{value}</div>
                  <div className="mt-1 text-[11px] font-semibold text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden overflow-hidden rounded-3xl border border-white bg-white/70 shadow-xl shadow-rose-100/60 backdrop-blur md:block">
            <Image
              src="/title-top.webp"
              alt="手のひらの予言者の占いイメージ"
              width={900}
              height={520}
              className="aspect-[16/10] w-full object-cover"
              priority
            />
          </div>
        </section>

        <div id="fortune-menu" className="scroll-mt-6">
          <FortuneSelect />
        </div>

        <FooterLinks className="mt-8 text-center" />
      </div>
    </main>
  );
}
