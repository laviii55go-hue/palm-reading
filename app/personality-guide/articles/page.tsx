import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import ArticlePageLayout from "../../components/ArticlePageLayout";
import ColumnNavPills from "../../components/ColumnNavPills";
import RakutenWidget from "../../components/RakutenWidget";
import { formatArticleDate, getVisibleArticles } from "./articlesConfig";

export const metadata: Metadata = {
  title: "16タイプ性格診断コラム・記事一覧｜手のひらの予言者",
  description:
    "16タイプ性格診断をテーマにしたコラム・記事一覧。リーダーシップランキング、恋愛運ランキングなど、16タイプの魅力をブログ形式でお届けします。",
};

export default function PersonalityArticlesPage() {
  const articles = getVisibleArticles();

  return (
    <ArticlePageLayout variant="personality">
      <ColumnNavPills variant="personality" />

        <div className="text-center space-y-2">
          <p className="text-teal-500 text-xs font-bold uppercase tracking-wider">
            16タイプコラム
          </p>
          <h1 className="text-2xl font-black text-teal-900">
            16タイプ性格診断コラム・記事一覧
          </h1>
          <p className="text-teal-600 text-sm">
            16タイプをテーマにした記事をお届けします
          </p>
        </div>

        <div className="space-y-4">
          {[...articles]
            .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
            .map((article) => (
              <Link
                key={article.slug}
                href={`/personality-guide/articles/${article.slug}`}
                className="block rounded-2xl border-2 border-teal-100 bg-white p-5 hover:border-teal-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl shrink-0">{article.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-teal-500 text-xs font-medium">
                      {formatArticleDate(article.publishedAt)} 掲載
                    </p>
                    <h2 className="font-bold text-teal-900 text-base leading-snug mt-0.5">
                      {article.title}
                    </h2>
                    <p className="text-teal-600 text-sm mt-1">{article.desc}</p>
                    <p className="text-teal-400 text-xs mt-2">続きを読む →</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 p-6 text-white text-center space-y-4">
          <div className="font-bold text-lg">16タイプ診断を試す</div>
          <p className="text-teal-100 text-sm">
            8問の質問であなたの性格タイプを診断
          </p>
          <Link
            href="/personality"
            className="block bg-white text-teal-600 font-bold py-3 rounded-2xl hover:bg-teal-50 transition-colors"
          >
            🧠 16タイプ診断を始める →
          </Link>
        </div>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
