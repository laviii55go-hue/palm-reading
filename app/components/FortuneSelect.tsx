"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FortuneType } from "../types";
import { FORTUNE_OPTIONS } from "../data/fortunes";
import { getDailyFortuneRanking } from "../data/dailyFortuneData";
import AdBanner from "./AdBanner";

interface Props {
  selected: FortuneType | null;
  onSelect: (type: FortuneType) => void;
  onStart: () => void;
}

type CategoryColor = "purple" | "indigo" | "green" | "violet" | "teal" | "amber" | "rose" | "cyan";

const CATEGORY_STYLES: Record<CategoryColor, { bg: string; text: string; border: string; sectionBg: string; sectionBorder: string }> = {
  purple: { bg: "bg-purple-200", text: "text-purple-800", border: "border-purple-300", sectionBg: "bg-purple-50",  sectionBorder: "border-purple-200" },
  indigo: { bg: "bg-indigo-200", text: "text-indigo-800", border: "border-indigo-300", sectionBg: "bg-indigo-50",  sectionBorder: "border-indigo-200" },
  green:  { bg: "bg-green-200",  text: "text-green-800",  border: "border-green-300",  sectionBg: "bg-green-50",   sectionBorder: "border-green-200"  },
  violet: { bg: "bg-violet-200", text: "text-violet-800", border: "border-violet-300", sectionBg: "bg-violet-50",  sectionBorder: "border-violet-200" },
  teal:   { bg: "bg-teal-200",   text: "text-teal-800",   border: "border-teal-300",   sectionBg: "bg-teal-50",    sectionBorder: "border-teal-200"   },
  amber:  { bg: "bg-amber-200",  text: "text-amber-800",  border: "border-amber-300",  sectionBg: "bg-amber-50",   sectionBorder: "border-amber-200"  },
  rose:   { bg: "bg-rose-200",   text: "text-rose-800",   border: "border-rose-300",   sectionBg: "bg-rose-50",    sectionBorder: "border-rose-200"   },
  cyan:   { bg: "bg-cyan-200",   text: "text-cyan-800",   border: "border-cyan-300",   sectionBg: "bg-cyan-50",    sectionBorder: "border-cyan-200"   },
};

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

export default function FortuneSelect({ selected, onSelect, onStart }: Props) {
  return (
    <div className="space-y-6">
      <div id="top" className="text-center scroll-mt-0">
        <div className="rounded-2xl overflow-hidden shadow-md mb-4">
          <Image
            src="/title-top.png"
            alt="手のひらの予言者"
            width={600}
            height={300}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
        <h2 className="text-2xl font-bold text-purple-800">何を占いますか？</h2>
        <p className="text-gray-500 text-sm mt-1">カテゴリから選んでください</p>

        {/* 各占いへ飛べるリンク（TOP画面内の対象セクションにフォーカス移動） */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <a href="#palm" className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium hover:bg-purple-200">手相</a>
          <a href="/palm-quiz" className="px-3 py-1.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium hover:bg-purple-200">【簡易】手相タイプ</a>
          <a href="#daily" className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium hover:bg-teal-200">開運カレンダー</a>
          <a href="#daily" className="px-3 py-1.5 rounded-full bg-teal-100 text-teal-700 text-xs font-medium hover:bg-teal-200">今日の運勢</a>
          <a href="#numerology" className="px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 text-xs font-medium hover:bg-violet-200">数秘術</a>
          <a href="#personality" className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium hover:bg-amber-200">16タイプ</a>
          <a href="#dream" className="px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-medium hover:bg-indigo-200">夢占い</a>
          <a href="#animal" className="px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-xs font-medium hover:bg-green-200">動物占い</a>
          <a href="#blood-type" className="px-3 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-medium hover:bg-rose-200">血液型占い</a>
          <a href="#name-fortune" className="px-3 py-1.5 rounded-full bg-cyan-100 text-cyan-700 text-xs font-medium hover:bg-cyan-200">姓名判断</a>
          <a href="#daily" className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium hover:bg-amber-200">運勢ランキング</a>
        </div>
      </div>

      {/* ── 手相占い ── */}
      <CategorySection id="palm" color="purple">
        <CategoryLabel emoji="🖐" label="手相占い" color="purple" />
        <Link
          href="/guide"
          className="block w-full py-2.5 rounded-xl border-2 border-purple-200 text-purple-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 手相の基本知識を読む
        </Link>
        <Link
          href="/palm-quiz"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">📋</div>
          <div>
            <div className="font-bold text-sm text-purple-800">【簡易】手相タイプ診断</div>
            <div className="text-xs text-purple-500 mt-0.5">6問であなたの手相タイプを診断</div>
          </div>
          <div className="absolute right-4 text-purple-400 text-sm">→</div>
        </Link>
        <div className="grid grid-cols-2 gap-3">
          {FORTUNE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={`relative p-4 rounded-2xl border-2 text-left transition-all ${
                selected === opt.id
                  ? `bg-gradient-to-br ${opt.gradient} ${opt.border} shadow-md scale-[1.02]`
                  : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-sm"
              }`}
            >
              {selected === opt.id && (
                <div className="absolute top-2 right-2 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </div>
              )}
              <div className="text-2xl mb-1">{opt.emoji}</div>
              <div className={`font-bold text-sm ${selected === opt.id ? opt.text : "text-gray-700"}`}>
                {opt.label}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">{opt.description}</div>
            </button>
          ))}
          <Link
            href="/special"
            className="relative p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-300 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="text-2xl mb-1">✨</div>
            <div className="font-bold text-sm text-amber-700">特殊手相</div>
            <div className="text-xs text-amber-500 mt-0.5">ますかけ線・太陽線など</div>
            <div className="absolute bottom-2 right-3 text-amber-400 text-xs">→</div>
          </Link>
          <Link
            href="/mole"
            className="relative p-4 rounded-2xl border-2 text-left transition-all bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 hover:shadow-md hover:scale-[1.02]"
          >
            <div className="text-2xl mb-1">🔵</div>
            <div className="font-bold text-sm text-blue-700">ほくろ占い</div>
            <div className="text-xs text-blue-400 mt-0.5">手のほくろの位置で診断</div>
            <div className="absolute bottom-2 right-3 text-blue-400 text-xs">→</div>
          </Link>
          <a
            href="https://px.a8.net/svt/ejp?a8mat=4AZAW7+8XI3G2+2PEO+1BTR0X"
            rel="nofollow"
            target="_blank"
            className="relative p-4 rounded-2xl border-2 text-left transition-all bg-white border-gray-200 hover:border-purple-300 hover:shadow-md hover:scale-[1.02] block"
          >
            <p className="text-xs text-gray-400 mb-1">PR</p>
            <div className="text-2xl mb-1">🔮</div>
            <div className="font-bold text-sm text-purple-700">占い鑑定</div>
            <div className="text-xs text-gray-500 mt-0.5">実績700万件・プロに頼む</div>
            <div className="absolute bottom-2 right-3 text-purple-400 text-xs">→</div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              style={{ border: 0, position: "absolute", width: 1, height: 1, opacity: 0 }}
              src="https://www14.a8.net/0.gif?a8mat=4AZAW7+8XI3G2+2PEO+1BTR0X"
              alt=""
            />
          </a>
        </div>
        <button
          onClick={onStart}
          disabled={!selected}
          className="w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-lg disabled:opacity-40 hover:bg-purple-700 transition-colors shadow-md"
        >
          手相を入力する →
        </button>
      </CategorySection>

      <AdBanner />

      {/* ── 日々使える ── */}
      <CategorySection id="daily" color="teal">
        <CategoryLabel emoji="📅" label="日々使える" color="teal" />
        <FortuneRankingLink />
        <Link
          href="/daily-fortune"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-teal-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">📆</div>
          <div>
            <div className="font-bold text-sm text-teal-800">今日の運勢</div>
            <div className="text-xs text-teal-500 mt-0.5">数秘術・星座で恋愛・金運・仕事運</div>
          </div>
          <div className="absolute right-4 text-teal-400 text-sm">→</div>
        </Link>
        <Link
          href="/calendar-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-teal-200 text-teal-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 開運カレンダーの基本知識を読む
        </Link>
        <Link
          href="/calendar"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-teal-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">📅</div>
          <div>
            <div className="font-bold text-sm text-teal-800">開運カレンダー</div>
            <div className="text-xs text-teal-500 mt-0.5">六曜で吉日をチェック</div>
          </div>
          <div className="absolute right-4 text-teal-400 text-sm">→</div>
        </Link>
      </CategorySection>

      {/* ── 数秘術 ── */}
      <CategorySection id="numerology" color="violet">
        <CategoryLabel emoji="🔢" label="数秘術" color="violet" />
        <Link
          href="/numerology-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-violet-200 text-violet-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 数秘術の基本知識を読む
        </Link>
        <Link
          href="/lucky-number"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-violet-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🔢</div>
          <div>
            <div className="font-bold text-sm text-violet-800">数秘術占い</div>
            <div className="text-xs text-violet-500 mt-0.5">生年月日で運命数を読み解く</div>
          </div>
          <div className="absolute right-4 text-violet-400 text-sm">→</div>
        </Link>
      </CategorySection>

      {/* ── 16タイプ性格診断 ── */}
      <CategorySection id="personality" color="amber">
        <CategoryLabel emoji="🧠" label="16タイプ性格診断" color="amber" />
        <Link
          href="/personality-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-amber-200 text-amber-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 16タイプ診断の基本知識を読む
        </Link>
        <Link
          href="/personality"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-amber-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🧠</div>
          <div>
            <div className="font-bold text-sm text-amber-800">16タイプ性格診断</div>
            <div className="text-xs text-amber-500 mt-0.5">8問の質問で性格タイプを診断</div>
          </div>
          <div className="absolute right-4 text-amber-400 text-sm">→</div>
        </Link>
      </CategorySection>

      {/* ── 夢占い ── */}
      <CategorySection id="dream" color="indigo">
        <CategoryLabel emoji="🌙" label="夢占い" color="indigo" />
        <Link
          href="/dream-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-indigo-200 text-indigo-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 夢占いの基本知識を読む
        </Link>
        <Link
          href="/dream"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-indigo-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🌙</div>
          <div>
            <div className="font-bold text-sm text-indigo-800">夢占い</div>
            <div className="text-xs text-indigo-500 mt-0.5">見た夢からメッセージを読み解く</div>
          </div>
          <div className="absolute right-4 text-indigo-400 text-sm">→</div>
        </Link>
      </CategorySection>

      <AdBanner />

      {/* ── 動物占い ── */}
      <CategorySection id="animal" color="green">
        <CategoryLabel emoji="🐾" label="動物占い" color="green" />
        <Link
          href="/animal-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-green-200 text-green-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 動物占いの基本知識を読む
        </Link>
        <Link
          href="/animal"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-green-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🐾</div>
          <div>
            <div className="font-bold text-sm text-green-800">動物占い</div>
            <div className="text-xs text-green-500 mt-0.5">生年月日で60種の動物キャラを診断</div>
          </div>
          <div className="absolute right-4 text-green-400 text-sm">→</div>
        </Link>
      </CategorySection>

      {/* ── 血液型占い ── */}
      <CategorySection id="blood-type" color="rose">
        <CategoryLabel emoji="🩸" label="血液型占い" color="rose" />
        <Link
          href="/blood-type-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-rose-200 text-rose-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 血液型占いの基本知識を読む
        </Link>
        <Link
          href="/blood-type"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-rose-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">🩸</div>
          <div>
            <div className="font-bold text-sm text-rose-800">血液型占い</div>
            <div className="text-xs text-rose-500 mt-0.5">A・B・O・AB型の性格・相性診断</div>
          </div>
          <div className="absolute right-4 text-rose-400 text-sm">→</div>
        </Link>
      </CategorySection>

      {/* ── 姓名判断 ── */}
      <CategorySection id="name-fortune" color="cyan">
        <CategoryLabel emoji="✍️" label="姓名判断" color="cyan" />
        <Link
          href="/name-fortune-guide"
          className="block w-full py-2.5 rounded-xl border-2 border-cyan-200 text-cyan-600 font-semibold text-sm text-center hover:bg-white transition-colors"
        >
          📖 姓名判断の基本知識を読む
        </Link>
        <Link
          href="/name-fortune"
          className="relative flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-all bg-white border-cyan-200 hover:shadow-md hover:scale-[1.01]"
        >
          <div className="text-3xl">✍️</div>
          <div>
            <div className="font-bold text-sm text-cyan-800">姓名判断</div>
            <div className="text-xs text-cyan-500 mt-0.5">名前の画数で五格・運勢を診断</div>
          </div>
          <div className="absolute right-4 text-cyan-400 text-sm">→</div>
        </Link>
      </CategorySection>

      <AdBanner />
    </div>
  );
}
