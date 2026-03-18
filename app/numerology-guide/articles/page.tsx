import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import ArticlePageLayout from "../../components/ArticlePageLayout";
import ColumnNavPills from "../../components/ColumnNavPills";
import RakutenWidget from "../../components/RakutenWidget";
import { formatArticleDate, getVisibleArticles } from "./articlesConfig";

export const metadata: Metadata = {
  title: "数秘術コラム・記事一覧｜手のひらの予言者",
  description:
    "数秘術のライフパスナンバーをテーマにしたコラム・記事一覧。グループ行動ランキングなど、数秘術の魅力をブログ形式でお届けします。",
};

export default function NumerologyArticlesPage() {
  const articles = getVisibleArticles();

  return (
    <ArticlePageLayout variant="numerology">
      <ColumnNavPills variant="numerology" />

        <div className="text-center space-y-2">
          <p className="text-violet-500 text-xs font-bold uppercase tracking-wider">
            数秘術コラム
          </p>
          <h1 className="text-2xl font-black text-violet-900">
            数秘術コラム・記事一覧
          </h1>
          <p className="text-gray-600 text-sm">
            ライフパスナンバーをテーマにした記事をお届けします
          </p>
        </div>

        <div className="space-y-4">
          {[...articles]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .map((article) => (
            <Link
              key={article.slug}
              href={`/numerology-guide/articles/${article.slug}`}
              className="block rounded-2xl border-2 border-violet-100 bg-white p-5 hover:border-violet-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{article.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-violet-500 text-xs font-medium">
                    {formatArticleDate(article.publishedAt)} 掲載
                  </p>
                  <h2 className="font-bold text-violet-900 text-base leading-snug mt-0.5">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{article.desc}</p>
                  <p className="text-violet-400 text-xs mt-2">続きを読む →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white text-center space-y-4">
          <div className="font-bold text-lg">数秘術占いを試す</div>
          <p className="text-violet-200 text-sm">
            生年月日からライフパスナンバーを診断。性格・相性・今年のテーマまで
          </p>
          <Link
            href="/lucky-number"
            className="block bg-white text-violet-600 font-bold py-3 rounded-2xl hover:bg-violet-50 transition-colors"
          >
            🔢 数秘術占いを始める →
          </Link>
        </div>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}

