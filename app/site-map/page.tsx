import Link from "next/link";
import type { Metadata } from "next";
import TopBannerLink from "../components/TopBannerLink";
import { PERSONALITY_TYPE_CODES } from "../data/personalityData";
import { NUMEROLOGY_DATA } from "../data/numerologyData";
import { TAROT_MAJOR_ARCANA } from "../data/tarotData";
import { ARTICLES as NUMEROLOGY_ARTICLES } from "../numerology-guide/articles/articlesConfig";
import { ARTICLES as PERSONALITY_ARTICLES } from "../personality-guide/articles/articlesConfig";

export const metadata: Metadata = {
  title: "サイトマップ｜手のひらの予言者",
  description:
    "手のひらの予言者の全ページ一覧。手相・夢占い・数秘術・16タイプ性格診断など、占いをテーマにしたコラム・記事へのリンク集です。",
  robots: { index: true, follow: true },
};

const STATIC_PAGES = [
  { href: "/", label: "トップ" },
  { href: "/daily-fortune-ranking", label: "今日の運勢ランキング" },
  { href: "/guides", label: "基本知識まとめ" },
  { href: "/articles", label: "記事一覧" },
  { href: "/guide", label: "手相の基本知識" },
  { href: "/palm-quiz", label: "簡易手相タイプ診断" },
  { href: "/ai-palm", label: "AI手相診断" },
  { href: "/numerology-guide", label: "数秘術ガイド" },
  { href: "/lucky-number", label: "数秘術占い" },
  { href: "/personality", label: "16タイプ性格診断" },
  { href: "/personality-guide", label: "16タイプガイド" },
  { href: "/tarot", label: "タロット3択占い" },
  { href: "/tarot-guide", label: "タロットガイド" },
  { href: "/dream", label: "夢占い" },
  { href: "/dream-guide", label: "夢占いガイド" },
  { href: "/calendar", label: "開運カレンダー" },
  { href: "/calendar-guide", label: "開運カレンダーガイド" },
  { href: "/animal", label: "動物占い" },
  { href: "/animal-guide", label: "動物占いガイド" },
  { href: "/blood-type", label: "血液型占い" },
  { href: "/blood-type-guide", label: "血液型占いガイド" },
  { href: "/name-fortune", label: "姓名判断" },
  { href: "/name-fortune-guide", label: "姓名判断ガイド" },
  { href: "/mole", label: "ほくろ占い" },
  { href: "/special", label: "特殊手相" },
  { href: "/daily-fortune", label: "今日の運勢" },
  { href: "/daily-fortune-ranking-guide", label: "今日の運勢ランキングガイド" },
  { href: "/privacy", label: "プライバシーポリシー" },
  { href: "/changelog", label: "更新履歴" },
];

export default function SitemapPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <TopBannerLink />
          <h1 className="text-2xl font-black text-slate-800 mt-4">🗺️ サイトマップ</h1>
          <p className="text-slate-600 text-sm mt-1">
            サイト内の全ページへのリンク一覧です
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">メインページ</h2>
          <ul className="space-y-2">
            {STATIC_PAGES.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-violet-600 hover:underline text-sm">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">手相ガイド（線別）</h2>
          <ul className="space-y-2">
            {["life-line", "heart-line", "head-line", "fate-line", "marriage-line", "money-line"].map((line) => (
              <li key={line}>
                <Link href={`/guide/${line}`} className="text-violet-600 hover:underline text-sm">
                  {line === "life-line" && "生命線"}
                  {line === "heart-line" && "感情線"}
                  {line === "head-line" && "知能線"}
                  {line === "fate-line" && "運命線"}
                  {line === "marriage-line" && "結婚線"}
                  {line === "money-line" && "金運線"}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">数秘術コラム</h2>
          <ul className="space-y-2">
            {NUMEROLOGY_ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link href={`/numerology-guide/articles/${a.slug}`} className="text-violet-600 hover:underline text-sm">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">16タイプコラム</h2>
          <ul className="space-y-2">
            {PERSONALITY_ARTICLES.map((a) => (
              <li key={a.slug}>
                <Link href={`/personality-guide/articles/${a.slug}`} className="text-violet-600 hover:underline text-sm">
                  {a.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">16タイプ別ガイド</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {PERSONALITY_TYPE_CODES.map((code) => (
              <li key={code}>
                <Link href={`/personality-guide/${code}`} className="text-violet-600 hover:underline">
                  {code}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">数秘術（ライフパス別）</h2>
          <ul className="grid grid-cols-3 gap-2 text-sm">
            {Object.keys(NUMEROLOGY_DATA).map((num) => (
              <li key={num}>
                <Link href={`/numerology-guide/${num}`} className="text-violet-600 hover:underline">
                  {num}番
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-slate-700 mb-3">タロットカード</h2>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {TAROT_MAJOR_ARCANA.map((card) => (
              <li key={card.id}>
                <Link href={`/tarot-guide/card/${card.id}`} className="text-violet-600 hover:underline">
                  {card.id}番 {card.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-slate-500 text-xs">
          <Link href="/sitemap.xml" className="text-violet-500 hover:underline">
            XMLサイトマップ（sitemap.xml）
          </Link>
        </p>
      </div>
    </div>
  );
}
