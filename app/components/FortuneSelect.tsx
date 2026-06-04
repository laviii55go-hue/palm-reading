"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDailyFortuneRanking } from "../data/dailyFortuneData";
import AdBanner from "./AdBanner";


type CategoryColor = "purple" | "indigo" | "green" | "violet" | "teal" | "amber" | "rose" | "cyan";

const CATEGORY_STYLES: Record<CategoryColor, { bg: string; text: string; border: string; sectionBg: string; sectionBorder: string; panelGradient: string; panelBorder: string }> = {
  purple: { bg: "bg-purple-200", text: "text-purple-800", border: "border-purple-300", sectionBg: "bg-purple-50", sectionBorder: "border-purple-200", panelGradient: "bg-gradient-to-br from-purple-50 to-indigo-50", panelBorder: "border-purple-200" },
  indigo: { bg: "bg-indigo-200", text: "text-indigo-800", border: "border-indigo-300", sectionBg: "bg-indigo-50", sectionBorder: "border-indigo-200", panelGradient: "bg-gradient-to-br from-indigo-50 to-violet-50", panelBorder: "border-indigo-200" },
  green: { bg: "bg-green-200", text: "text-green-800", border: "border-green-300", sectionBg: "bg-green-50", sectionBorder: "border-green-200", panelGradient: "bg-gradient-to-br from-green-50 to-emerald-50", panelBorder: "border-green-200" },
  violet: { bg: "bg-violet-200", text: "text-violet-800", border: "border-violet-300", sectionBg: "bg-violet-50", sectionBorder: "border-violet-200", panelGradient: "bg-gradient-to-br from-violet-50 to-purple-50", panelBorder: "border-violet-200" },
  teal: { bg: "bg-teal-200", text: "text-teal-800", border: "border-teal-300", sectionBg: "bg-teal-50", sectionBorder: "border-teal-200", panelGradient: "bg-gradient-to-br from-teal-50 to-cyan-50", panelBorder: "border-teal-200" },
  amber: { bg: "bg-amber-200", text: "text-amber-800", border: "border-amber-300", sectionBg: "bg-amber-50", sectionBorder: "border-amber-200", panelGradient: "bg-gradient-to-br from-amber-50 to-yellow-50", panelBorder: "border-amber-200" },
  rose: { bg: "bg-rose-200", text: "text-rose-800", border: "border-rose-300", sectionBg: "bg-rose-50", sectionBorder: "border-rose-200", panelGradient: "bg-gradient-to-br from-rose-50 to-pink-50", panelBorder: "border-rose-200" },
  cyan: { bg: "bg-cyan-200", text: "text-cyan-800", border: "border-cyan-300", sectionBg: "bg-cyan-50", sectionBorder: "border-cyan-200", panelGradient: "bg-gradient-to-br from-cyan-50 to-sky-50", panelBorder: "border-cyan-200" },
};

function GroupLabel({ emoji, label }: { emoji: string; label: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-xl">{emoji}</span>
      <h3 className="text-lg font-black text-slate-800">{label}</h3>
    </div>
  );
}

function CategoryLabel({ emoji, label, color }: { emoji: string; label: string; color: CategoryColor }) {
  const s = CATEGORY_STYLES[color];
  return (
    <div className={`flex items-center justify-between rounded-xl overflow-hidden border ${s.border} ${s.bg} px-4 py-2`}>
      <div className="flex items-center">
        <span className="text-lg mr-2">{emoji}</span>
        <span className={`font-black text-base ${s.text}`}>{label}</span>
      </div>
      <a href="#top" className={`text-xs font-medium ${s.text} hover:underline shrink-0`}>TOPへ戻る</a>
    </div>
  );
}

function CategorySection({ color, id, children }: { color: CategoryColor; id?: string; children: React.ReactNode }) {
  const s = CATEGORY_STYLES[color];
  return (
    <div id={id} className={`rounded-2xl border ${s.sectionBorder} ${s.sectionBg} p-4 space-y-3 scroll-mt-20`}>
      {children}
    </div>
  );
}

function FortuneRankingLink() {
  const [ranking, setRanking] = useState<{ first: { emoji: string; name: string }; last: { emoji: string; name: string } } | null>(null);
  useEffect(() => {
    const now = new Date();
    const r = getDailyFortuneRanking(now.getFullYear(), now.getMonth() + 1, now.getDate());
    setRanking({
      first: { emoji: r[0].sign.emoji, name: r[0].sign.name },
      last: { emoji: r[11].sign.emoji, name: r[11].sign.name },
    });
  }, []);
  return (
    <Link
      href="/daily-fortune-ranking"
      className="relative flex flex-col gap-2 p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:shadow-md hover:scale-[1.01]"
    >
      <div className="flex items-center gap-2">
        <div className="text-2xl">🏆</div>
        <div>
          <div className="font-bold text-sm text-amber-800">今日の運勢ランキング</div>
          <div className="text-xs text-amber-600 mt-0.5">1位〜12位をチェック</div>
        </div>
        <div className="absolute right-4 text-amber-400 text-sm">→</div>
      </div>
      {ranking && (
        <div className="flex items-center justify-between text-xs bg-white/60 rounded-xl px-3 py-2">
          <span className="text-amber-700">
            <span className="font-bold">1位</span> {ranking.first.emoji} {ranking.first.name}
          </span>
          <span className="text-gray-400">〜</span>
          <span className="text-amber-700">
            <span className="font-bold">12位</span> {ranking.last.emoji} {ranking.last.name}
          </span>
        </div>
      )}
    </Link>
  );
}

function FortuneLink({
  href,
  emoji,
  title,
  desc,
  color,
  imageSrc,
  imageAlt,
}: {
  href: string;
  emoji?: string;
  title: string;
  desc: ReactNode;
  color: CategoryColor;
  /** 指定時は左に画像を表示（絵文字の代わり） */
  imageSrc?: string;
  imageAlt?: string;
}) {
  const s = CATEGORY_STYLES[color];
  return (
    <Link
      href={href}
      className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all ${s.panelGradient} ${s.panelBorder} hover:shadow-md hover:scale-[1.01]`}
    >
      {imageSrc ? (
        <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden border border-violet-200/70 shadow-sm bg-white">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            width={48}
            height={48}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="text-3xl">{emoji}</div>
      )}
      <div>
        <div className={`font-bold text-sm ${s.text}`}>{title}</div>
        <div className="text-xs text-gray-600 mt-0.5">{desc}</div>
      </div>
      <div className={`absolute right-4 ${s.text} opacity-60 text-sm`}>→</div>
    </Link>
  );
}

export default function FortuneSelect() {
  return (
    <div className="space-y-8">
      <div id="top" className="text-center scroll-mt-0">
        <div className="rounded-2xl overflow-hidden shadow-md mb-4">
          <Image
            src="/title-top.webp"
            alt="手のひらの予言者"
            width={600}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-purple-800">何を占いますか？</h2>
        <p className="text-gray-500 text-sm mt-1">毎日チェックから気軽に始めよう</p>
      </div>

      {/* ── 【毎日チェック】 ── */}
      <section id="daily">
        <GroupLabel emoji="☀️" label="毎日チェック" />
        <div className="space-y-4">
          <FortuneRankingLink />
          <FortuneLink
            href="/tarot"
            title="タロット占い"
            imageSrc="/tarot-back.webp"
            imageAlt="タロットカード"
            desc={
              <>
                ワンカード・YES/NO・恋愛・仕事・3択の5メニュー。
                <br />
                大アルカナ22枚で今日の運勢を占おう
              </>
            }
            color="violet"
          />
          <FortuneLink
            href="/calendar"
            emoji="📅"
            title="開運カレンダー"
            desc="六曜で吉日をチェック"
            color="teal"
          />
        </div>
      </section>

      <AdBanner />

      {/* ── 【自分を診断】 ── */}
      <section id="diagnose">
        <GroupLabel emoji="🔍" label="自分を診断" />
        <div className="space-y-4">
          <CategorySection id="palm" color="purple">
            <CategoryLabel emoji="🖐" label="手相占い" color="purple" />
            <Link
              href="/palm-quiz"
              className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-md hover:scale-[1.01]"
            >
              <div className="text-3xl">📋</div>
              <div>
                <div className="font-bold text-sm text-purple-800">簡易手相タイプ診断</div>
                <div className="text-xs text-purple-500 mt-0.5">6問であなたの手相タイプを診断</div>
              </div>
              <div className="absolute right-4 text-purple-400 text-sm">→</div>
            </Link>
          </CategorySection>

          <FortuneLink
            href="/personality"
            emoji="🧠"
            title="16タイプ性格診断"
            desc="8問の質問で性格タイプを診断"
            color="amber"
          />
          <FortuneLink
            href="/animal"
            emoji="🐾"
            title="動物占い"
            desc="生年月日で60種の動物キャラを診断"
            color="green"
          />
          <FortuneLink
            href="/lucky-number"
            emoji="🔢"
            title="数秘術占い"
            desc="生年月日で運命数を読み解く"
            color="violet"
          />
          <FortuneLink
            href="/jibun-koyomi"
            emoji="🌈"
            title="じぶん暦（総合鑑定）"
            desc="算命学×数秘術のオリジナル統合タイプ診断"
            color="indigo"
          />
          <FortuneLink
            href="/sanmeigaku"
            emoji="🌅"
            title="算命学占い"
            desc="生年月日で命式と今日の流れを診断"
            color="amber"
          />
          <FortuneLink
            href="/dinosaur-fortune"
            emoji="🦖"
            title="恐竜占い"
            desc="生年月日から恐竜タイプを診断"
            color="teal"
          />
          <FortuneLink
            href="/dinosaur-fortune?tab=collection"
            emoji="📖"
            title="マイ図鑑"
            desc="診断して集めた恐竜カードを確認"
            color="cyan"
          />
          <FortuneLink
            href="/dinosaur-guide"
            emoji="📚"
            title="恐竜図鑑"
            desc="全タイプの性格・特徴を解説"
            color="indigo"
          />
        </div>
      </section>

      <AdBanner />

      {/* ── 【気になったら】 ── */}
      <section id="more">
        <GroupLabel emoji="✨" label="気になったら" />
        <div className="space-y-4">
          <FortuneLink
            href="/blood-type"
            emoji="🩸"
            title="血液型占い"
            desc="A・B・O・AB型の性格・相性診断"
            color="rose"
          />
          <FortuneLink
            href="/name-fortune"
            emoji="✍️"
            title="姓名判断"
            desc="名前の画数で五格・運勢を診断"
            color="cyan"
          />
        </div>
      </section>

      <AdBanner />
    </div>
  );
}
