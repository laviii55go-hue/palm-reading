"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDailyFortuneRanking } from "../data/dailyFortuneData";
import { POPULAR_FORTUNE_HREFS } from "../data/popularFortunes";

type CategoryColor = "purple" | "indigo" | "green" | "violet" | "teal" | "amber" | "rose" | "cyan";

type FortuneItem = {
  href: string;
  title: string;
  desc: ReactNode;
  color: CategoryColor;
  emoji: string;
  imageSrc?: string;
  imageAlt?: string;
  bannerSrc?: string;
  iconSrc?: string;
  badge?: string;
};

type FortuneGroup = {
  id: string;
  label: string;
  lead: string;
  items: FortuneItem[];
};

const CATEGORY_STYLES: Record<
  CategoryColor,
  {
    accent: string;
    icon: string;
    panel: string;
    ring: string;
    button: string;
  }
> = {
  purple: {
    accent: "text-purple-800",
    icon: "from-purple-100 to-indigo-100",
    panel: "bg-white border-purple-100",
    ring: "ring-purple-100",
    button: "bg-purple-700 text-white hover:bg-purple-800",
  },
  indigo: {
    accent: "text-indigo-800",
    icon: "from-indigo-100 to-sky-100",
    panel: "bg-white border-indigo-100",
    ring: "ring-indigo-100",
    button: "bg-indigo-700 text-white hover:bg-indigo-800",
  },
  green: {
    accent: "text-emerald-800",
    icon: "from-green-100 to-emerald-100",
    panel: "bg-white border-emerald-100",
    ring: "ring-emerald-100",
    button: "bg-emerald-700 text-white hover:bg-emerald-800",
  },
  violet: {
    accent: "text-violet-800",
    icon: "from-violet-100 to-fuchsia-100",
    panel: "bg-white border-violet-100",
    ring: "ring-violet-100",
    button: "bg-violet-700 text-white hover:bg-violet-800",
  },
  teal: {
    accent: "text-teal-800",
    icon: "from-teal-100 to-cyan-100",
    panel: "bg-white border-teal-100",
    ring: "ring-teal-100",
    button: "bg-teal-700 text-white hover:bg-teal-800",
  },
  amber: {
    accent: "text-amber-800",
    icon: "from-amber-100 to-orange-100",
    panel: "bg-white border-amber-100",
    ring: "ring-amber-100",
    button: "bg-amber-700 text-white hover:bg-amber-800",
  },
  rose: {
    accent: "text-rose-800",
    icon: "from-rose-100 to-pink-100",
    panel: "bg-white border-rose-100",
    ring: "ring-rose-100",
    button: "bg-rose-700 text-white hover:bg-rose-800",
  },
  cyan: {
    accent: "text-cyan-800",
    icon: "from-cyan-100 to-sky-100",
    panel: "bg-white border-cyan-100",
    ring: "ring-cyan-100",
    button: "bg-cyan-700 text-white hover:bg-cyan-800",
  },
};

const GROUPS: FortuneGroup[] = [
  {
    id: "daily",
    label: "今日のおすすめ",
    lead: "朝や休憩中にすぐ見られる、軽めの占いです。",
    items: [
      {
        href: "/daily-fortune-ranking",
        title: "今日の運勢ランキング",
        desc: "12星座の1位から12位までをチェック",
        color: "amber",
        emoji: "🏆",
        imageSrc: "/v2-daily-moon.png",
        iconSrc: "/v2-daily-moon.png",
        bannerSrc: "/v2-banner-daily-ranking.png",
        badge: "毎日更新",
      },
      {
        href: "/tarot",
        title: "タロット占い 無料",
        desc: "ワンカード・YES/NO・恋愛・仕事を無料で占う",
        color: "violet",
        emoji: "🔮",
        imageSrc: "/v2-daily-tarot-card.png",
        iconSrc: "/v2-daily-tarot-card.png",
        bannerSrc: "/v2-banner-tarot.png",
      },
      {
        href: "/calendar",
        title: "開運カレンダー",
        desc: "六曜で吉日や動きやすい日を確認",
        color: "teal",
        emoji: "📅",
        bannerSrc: "/v2-banner-calendar.png",
      },
    ],
  },
  {
    id: "diagnose",
    label: "自分を診断",
    lead: "生年月日や質問から、自分の傾向を読み解きます。",
    items: [
      {
        href: "/jibun-koyomi",
        title: "じぶん暦",
        desc: "算命学と数秘術を合わせた総合鑑定",
        color: "indigo",
        emoji: "🌈",
        imageSrc: "/jibun-koyomi-og.webp",
        iconSrc: "/v2-diagnosis-jibun-koyomi.png",
      },
      {
        href: "/palm-quiz",
        title: "簡易手相タイプ診断",
        desc: "6問で手相タイプを診断",
        color: "purple",
        emoji: "🖐",
        imageSrc: "/title-top.webp",
        iconSrc: "/v2-diagnosis-palm.png",
        badge: "入口におすすめ",
      },
      {
        href: "/personality",
        title: "16タイプ性格診断",
        desc: "8問の質問で性格タイプを診断",
        color: "amber",
        emoji: "🧠",
        imageSrc: "/personality-top.webp",
        iconSrc: "/v2-diagnosis-personality.png",
      },
      {
        href: "/animal",
        title: "動物占い 無料",
        desc: "生年月日で60種類の動物キャラと相性を診断",
        color: "green",
        emoji: "🐾",
        imageSrc: "/animal-top.webp",
        iconSrc: "/v2-diagnosis-animal.png",
      },
      {
        href: "/lucky-number",
        title: "数秘術占い",
        desc: "運命数から性格と流れを読み解く",
        color: "violet",
        emoji: "🔢",
        imageSrc: "/numerology-top.webp",
        iconSrc: "/v2-diagnosis-numerology.png",
      },
      {
        href: "/dinosaur-fortune",
        title: "恐竜占い",
        desc: "生年月日から恐竜タイプを診断",
        color: "teal",
        emoji: "🦖",
        imageSrc: "/dinosaur-top.webp",
        iconSrc: "/v2-diagnosis-dinosaur.png",
      },
      {
        href: "/sanmeigaku",
        title: "算命学占い",
        desc: "命式と今日の流れを診断",
        color: "amber",
        emoji: "🌅",
        imageSrc: "/sanmeigaku-og.webp",
        iconSrc: "/v2-diagnosis-sanmeigaku.png",
      },
      {
        href: "/kyusei",
        title: "九星気学占い",
        desc: "本命星から性格と相性を確認",
        color: "indigo",
        emoji: "🧭",
        iconSrc: "/v2-diagnosis-kyusei.png",
      },
    ],
  },
  {
    id: "more",
    label: "気になったら",
    lead: "話題にしやすい占いを、短い時間で楽しめます。",
    items: [
      {
        href: "/blood-type",
        title: "血液型占い",
        desc: "A・B・O・AB型の性格と相性診断",
        color: "rose",
        emoji: "🩸",
        iconSrc: "/v2-diagnosis-blood-type.png",
      },
      {
        href: "/name-fortune",
        title: "姓名判断",
        desc: "名前の画数で五格と運勢を診断",
        color: "cyan",
        emoji: "✍️",
        iconSrc: "/v2-diagnosis-name-fortune.png",
      },
    ],
  },
];

const ALL_FORTUNE_ITEMS = GROUPS.flatMap((group) => group.items);

const POPULAR_GROUP: FortuneGroup = {
  id: "popular-fortunes",
  label: "人気の占い一覧",
  lead: "検索状況やアクセス状況を見ながら、手動で入れ替えるおすすめ枠です。",
  items: POPULAR_FORTUNE_HREFS.map((href) => ALL_FORTUNE_ITEMS.find((item) => item.href === href)).filter(
    (item): item is FortuneItem => Boolean(item)
  ),
};

function FortuneRankingSummary() {
  const [ranking] = useState(() => {
    const now = new Date();
    const result = getDailyFortuneRanking(now.getFullYear(), now.getMonth() + 1, now.getDate());
    return {
      first: `${result[0].sign.emoji} ${result[0].sign.name}`,
      last: `${result[11].sign.emoji} ${result[11].sign.name}`,
    };
  });

  return (
    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
      <div className="rounded-xl bg-amber-50 px-3 py-2 text-amber-800">
        <span className="font-black">1位</span> {ranking.first}
      </div>
      <div className="rounded-xl bg-slate-50 px-3 py-2 text-slate-600">
        <span className="font-black">12位</span> {ranking.last}
      </div>
    </div>
  );
}

function GroupNav() {
  return (
    <nav className="hidden gap-2 overflow-x-auto px-1 py-2" aria-label="占いカテゴリ">
      {GROUPS.map((group) => (
        <a
          key={group.id}
          href={`#${group.id}`}
          className="shrink-0 rounded-full border border-white bg-white/90 px-4 py-2 text-xs font-bold text-slate-700 shadow-sm backdrop-blur transition-colors hover:bg-slate-900 hover:text-white focus-visible:bg-slate-900 focus-visible:text-white focus-visible:outline-none"
        >
          {group.label}
        </a>
      ))}
    </nav>
  );
}

function FortuneCard({ item, compact = false }: { item: FortuneItem; compact?: boolean }) {
  const style = CATEGORY_STYLES[item.color];

  if (!compact) {
    return (
      <>
        <Link
          href={item.href}
          className={`group relative flex min-h-[112px] overflow-hidden rounded-[22px] border ${style.panel} shadow-md shadow-purple-100/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-200/70 focus-visible:outline-none focus-visible:ring-2 ${style.ring}`}
        >
          <Image
            src={item.bannerSrc ?? item.imageSrc ?? "/v2-banner-daily-ranking.png"}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/35 via-white/72 to-white/55 transition-colors duration-200 group-hover:from-purple-50/25 group-hover:via-white/50 group-hover:to-rose-50/45" />
          <div className="relative flex min-w-0 flex-1 flex-col justify-center px-5 py-3 pr-14">
            <h3 className="text-[16.5px] font-extrabold leading-5 tracking-normal text-purple-900 transition-colors duration-200 group-hover:text-violet-800 [font-family:var(--font-jp-sans)]">
              {item.title}
            </h3>
            <p className="mt-1.5 max-w-[13rem] text-[11.5px] font-medium leading-[1.5] text-purple-950/72 transition-colors duration-200 group-hover:text-purple-950/90 [font-family:var(--font-jp-sans)]">
              {item.desc}
            </p>
          </div>
          <span className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/92 text-2xl font-black text-purple-700 shadow-md shadow-purple-100 transition-all duration-200 group-hover:bg-purple-700 group-hover:text-white group-hover:shadow-purple-300">
            ›
          </span>
        </Link>

        <Link
          href={item.href}
          className={`group hidden h-full flex-col overflow-hidden rounded-2xl border ${style.panel} shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 ${style.ring}`}
        >
          <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${style.icon}`}>
            {item.imageSrc ? (
              <Image
                src={item.imageSrc}
                alt={item.imageAlt ?? item.title}
                width={640}
                height={360}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-5xl">{item.emoji}</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-white/10" />
            <div className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-lg shadow-sm">
              {item.emoji}
            </div>
            {item.badge && (
              <div className="absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
                {item.badge}
              </div>
            )}
          </div>
          <div className="flex flex-1 flex-col p-4">
            <h3 className={`text-base font-black ${style.accent}`}>{item.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{item.desc}</p>
            {item.href === "/daily-fortune-ranking" ? <FortuneRankingSummary /> : null}
            <div className="mt-4 flex items-center justify-between">
              <span className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${style.button}`}>
                開く
              </span>
              <span className={`${style.accent} text-sm font-black transition-transform group-hover:translate-x-1`}>
                →
              </span>
            </div>
          </div>
        </Link>
      </>
    );
  }

  if (item.iconSrc) {
    return (
      <Link
        href={item.href}
        className={`group relative min-h-[128px] overflow-hidden rounded-2xl border ${style.panel} bg-gradient-to-br ${style.icon} p-3 shadow-sm shadow-purple-100/70 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-200/70 focus-visible:outline-none focus-visible:ring-2 ${style.ring}`}
      >
        <div className="absolute inset-0 bg-white/42 transition-colors duration-200 group-hover:bg-white/28" />
        <Image
          src={item.iconSrc}
          alt=""
          width={120}
          height={120}
          className="absolute -bottom-3 -right-3 h-[88px] w-[88px] object-contain opacity-95 transition-transform duration-200 group-hover:scale-105 md:h-[112px] md:w-[112px]"
        />
        <div className="relative z-10 flex min-h-[104px] flex-col">
          <h3 className="max-w-[7.2rem] text-[13.5px] font-extrabold leading-[1.35] text-purple-950 [font-family:var(--font-jp-sans)]">
            {item.title}
          </h3>
          <p className="mt-1 max-w-[6.8rem] text-[10.5px] font-medium leading-[1.45] text-purple-950/72 [font-family:var(--font-jp-sans)]">
            {item.desc}
          </p>
          <span className="mt-auto grid h-7 w-7 place-items-center rounded-full bg-white/92 text-lg font-black text-purple-700 shadow-sm shadow-purple-100 transition-colors duration-200 group-hover:bg-purple-700 group-hover:text-white">
            ›
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      className={`group relative flex h-full overflow-hidden border ${style.panel} shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 ${style.ring} ${
          compact
          ? "min-h-[112px] flex-row rounded-2xl"
          : "min-h-[108px] flex-row rounded-[22px]"
      }`}
    >
      <div
        className={`relative shrink-0 overflow-hidden bg-gradient-to-br ${style.icon} ${
          compact ? "w-[38%]" : "w-[36%]"
        }`}
      >
        {item.imageSrc ? (
          <Image
            src={item.imageSrc}
            alt={item.imageAlt ?? item.title}
            width={640}
            height={360}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl">{item.emoji}</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 md:bg-gradient-to-t md:from-slate-950/40 md:via-transparent md:to-white/10" />
        <div className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-base shadow-sm">
          {item.emoji}
        </div>
        {item.badge && (
          <div className="absolute bottom-2 left-2 hidden rounded-full bg-slate-950/75 px-3 py-1 text-[11px] font-bold text-white backdrop-blur">
            {item.badge}
          </div>
        )}
      </div>
      <div className={`flex min-w-0 flex-1 flex-col justify-center ${compact ? "p-3 pr-9" : "p-4 pr-12"}`}>
        <h3 className={`${compact ? "text-[13px] leading-5" : "text-lg leading-6"} font-black ${style.accent}`}>
          {item.title}
        </h3>
        <p className={`${compact ? "mt-1 text-[11px] leading-4" : "mt-1.5 text-[13px] leading-5"} flex-1 text-slate-600`}>
          {item.desc}
        </p>
        <div className="hidden">{item.href === "/daily-fortune-ranking" ? <FortuneRankingSummary /> : null}</div>
        <div className="mt-4 hidden items-center justify-between">
          <span className={`rounded-full px-4 py-2 text-xs font-bold transition-colors ${style.button}`}>
            開く
          </span>
          <span className={`${style.accent} text-sm font-black transition-transform group-hover:translate-x-1`}>
            →
          </span>
        </div>
      </div>
      <span className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-xl font-black text-purple-700 shadow-md shadow-purple-100">
        ›
      </span>
    </Link>
  );
}

function FortuneGroupSection({ group, index }: { group: FortuneGroup; index: number }) {
  const isDaily = group.id === "daily";
  const isDiagnose = group.id === "diagnose";

  return (
    <section id={group.id} className="scroll-mt-24">
      <div className="mb-4 flex flex-col items-center gap-1 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
        <div>
          <p className="hidden text-xs font-black uppercase tracking-wider text-slate-400">0{index + 1}</p>
          <h2 className="flex items-center justify-center gap-2 text-[22px] font-black tracking-wide text-purple-950">
            <span className="text-amber-400">✦</span>
            {group.label}
            <span className="text-amber-400">✦</span>
          </h2>
        </div>
        <p className="hidden max-w-lg text-sm leading-6 text-slate-500">{group.lead}</p>
      </div>
      <div
        className={`grid gap-3 md:gap-4 ${
          isDaily ? "grid-cols-1" : isDiagnose ? "grid-cols-2" : "grid-cols-2"
        }`}
      >
        {group.items.map((item) => (
          <FortuneCard key={item.href} item={item} compact={!isDaily} />
        ))}
      </div>
    </section>
  );
}

export default function FortuneSelect() {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3">
        <GroupNav />
      </div>

      <div className="space-y-6">
        <FortuneGroupSection group={POPULAR_GROUP} index={0} />
      </div>

      {GROUPS.map((group, index) => (
        <div key={group.id} className={index === 0 ? "space-y-6" : "space-y-8"}>
          <FortuneGroupSection group={group} index={index + 1} />
        </div>
      ))}
    </div>
  );
}
