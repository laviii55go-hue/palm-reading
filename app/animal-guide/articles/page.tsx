import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import ArticlePageLayout from "../../components/ArticlePageLayout";
import ColumnNavPills from "../../components/ColumnNavPills";
import RakutenWidget from "../../components/RakutenWidget";
import { formatArticleDate, getVisibleArticles } from "./articlesConfig";

export const metadata: Metadata = {
  title: "動物占いコラム・記事一覧｜手のひらの予言者",
  description:
    "動物占いをテーマにしたコラム・記事一覧。12動物×5サブタイプ（黒・白・赤・青・金）の楽しみ方、家族や友人との使い方を解説します。",
};

export default function AnimalArticlesPage() {
  const articles = getVisibleArticles();

  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />

        <div className="text-center space-y-2">
          <p className="text-green-600 text-xs font-bold uppercase tracking-wider">
            動物占いコラム
          </p>
          <h1 className="text-2xl font-black text-green-900">
            動物占いコラム・記事一覧
          </h1>
          <p className="text-gray-600 text-sm">
            動物占いをテーマにした記事をお届けします
          </p>
        </div>

        <div className="space-y-4">
          {[...articles]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .map((article) => (
            <Link
              key={article.slug}
              href={`/animal-guide/articles/${article.slug}`}
              className="block rounded-2xl border-2 border-green-100 bg-white p-5 hover:border-green-200 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl shrink-0">{article.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-green-500 text-xs font-medium">
                    {formatArticleDate(article.publishedAt)} 掲載
                  </p>
                  <h2 className="font-bold text-green-900 text-base leading-snug mt-0.5">
                    {article.title}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{article.desc}</p>
                  <p className="text-green-500 text-xs mt-2">続きを読む →</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 p-6 text-white text-center space-y-4">
          <div className="font-bold text-lg">動物占いを試す</div>
          <p className="text-green-100 text-sm">
            12動物×5サブタイプの60種類から、あなたの動物キャラを診断
          </p>
          <Link
            href="/animal"
            className="block bg-white text-green-600 font-bold py-3 rounded-2xl hover:bg-green-50 transition-colors"
          >
            🐾 動物占いを試す →
          </Link>
        </div>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
