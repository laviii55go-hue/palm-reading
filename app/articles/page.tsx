import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";

export const metadata: Metadata = {
  title: "記事一覧｜手のひらの予言者",
  description:
    "数秘術・16タイプ性格診断など、占いをテーマにしたコラム・記事一覧。ランキング形式の解説や相性の組み合わせなど、楽しく読める記事をお届けします。",
};

const ARTICLE_CATEGORIES = [
  {
    href: "/numerology-guide/articles",
    emoji: "🔢",
    label: "数秘術コラム",
    desc: "ライフパスナンバーをテーマにしたランキング・相性解説",
  },
  {
    href: "/personality-guide/articles",
    emoji: "🧠",
    label: "16タイプコラム",
    desc: "性格タイプ別の恋愛・仕事・才能ランキング",
  },
  // 将来: タロット、夢占いなどの記事カテゴリを追加
] as const;

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <div className="text-center space-y-2">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
            コラム・記事
          </p>
          <h1 className="text-2xl font-black text-slate-800">
            📝 記事一覧
          </h1>
          <p className="text-slate-600 text-sm">
            占いをテーマにしたコラム・記事をお届けします
          </p>
        </div>

        <div className="space-y-4">
          {ARTICLE_CATEGORIES.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-5 rounded-2xl bg-white border-2 border-slate-200 hover:border-violet-300 hover:shadow-md transition-all"
            >
              <span className="text-3xl shrink-0">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-slate-800 text-base">{item.label}</h2>
                <p className="text-slate-500 text-sm mt-0.5">{item.desc}</p>
                <p className="text-violet-500 text-xs mt-2">記事一覧を見る →</p>
              </div>
            </Link>
          ))}
        </div>

        <AdBanner />
      </div>
    </div>
  );
}
