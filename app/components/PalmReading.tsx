"use client";

import Link from "next/link";
import Image from "next/image";
import FortuneSelect from "./FortuneSelect";
import FooterLinks from "./FooterLinks";

export default function PalmReading() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#fffaf8_0%,#fff7fb_38%,#ffffff_100%)] text-slate-900">
      <div className="mx-auto w-full max-w-lg px-3 pb-10 pt-0">
        <section className="pb-5 pt-3">
          <div className="space-y-5">
            <div className="relative isolate overflow-hidden rounded-[28px] border border-purple-100 bg-white shadow-xl shadow-purple-100/70">
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
                <h1 className="max-w-[17rem] text-[28px] font-black leading-[1.32] tracking-wide text-purple-950 [font-family:var(--font-jp-display)]">
                  総合占いで、<br />
                  あなたの未来を<br />
                  楽しく紐解く
                </h1>
                <p className="mt-5 max-w-[17rem] text-[12.5px] font-medium leading-5 text-purple-950/80 [font-family:var(--font-jp-sans)]">
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
                    href="#popular-fortunes"
                    className="rounded-full border border-purple-200 bg-white/90 px-5 py-3 text-center text-sm font-black text-purple-900 shadow-sm"
                  >
                    人気の占い一覧　→
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div id="fortune-menu" className="scroll-mt-6">
          <section className="mb-4 rounded-2xl border border-green-100 bg-white/82 p-4 text-sm leading-relaxed text-slate-700 shadow-sm shadow-purple-100/50">
            <h2 className="text-base font-black text-purple-950">無料で楽しめる占いメニュー</h2>
            <p className="mt-2">
              生年月日でわかる
              <Link href="/animal" className="font-bold text-green-700 underline hover:text-green-900">
                動物占い 無料診断
              </Link>
              や、ワンカード・YES/NOで占える
              <Link href="/tarot" className="font-bold text-purple-700 underline hover:text-purple-900">
                タロット占い 無料
              </Link>
              など、登録なしで使える占いをまとめています。
            </p>
          </section>
          <FortuneSelect />
        </div>

        <FooterLinks className="mt-8 text-center" />
      </div>
    </main>
  );
}
