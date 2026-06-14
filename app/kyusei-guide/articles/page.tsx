import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import ArticlePageLayout from "../../components/ArticlePageLayout";
import ColumnNavPills from "../../components/ColumnNavPills";
import RakutenWidget from "../../components/RakutenWidget";
import { formatArticleDate, getVisibleArticles } from "./articlesConfig";

export const metadata: Metadata = {
  title: "九星気学コラム・記事一覧｜手のひらの予言者",
  description: "九星気学をテーマにしたコラム・記事一覧。本命星別の相性、相生・相剋の関係、恋愛や仕事での活かし方を解説します。",
};

export default function KyuseiArticlesPage() {
  const articles = getVisibleArticles();
  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
      <div className="text-center space-y-2">
        <p className="text-amber-600 text-xs font-bold uppercase tracking-wider">九星気学コラム</p>
        <h1 className="text-2xl font-black text-amber-900">九星気学コラム・記事一覧</h1>
        <p className="text-gray-600 text-sm">九星気学をテーマにした記事をお届けします</p>
      </div>
      <div className="space-y-4">
        {[...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map((article) => (
          <Link key={article.slug} href={`/kyusei-guide/articles/${article.slug}`} className="block rounded-2xl border-2 border-amber-100 bg-white p-5 hover:border-amber-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">{article.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-amber-500 text-xs font-medium">{formatArticleDate(article.publishedAt)} 掲載</p>
                <h2 className="font-bold text-amber-900 text-base leading-snug mt-0.5">{article.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{article.desc}</p>
                <p className="text-amber-500 text-xs mt-2">続きを読む →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white text-center space-y-4">
        <div className="font-bold text-lg">九星気学占いを試す</div>
        <p className="text-amber-100 text-sm">生年月日から本命星を判定し、運勢や相性を診断します</p>
        <Link href="/kyusei" className="block bg-white text-amber-600 font-bold py-3 rounded-2xl hover:bg-amber-50 transition-colors">⭐ 九星気学占いを試す →</Link>
      </div>
      <AdBanner />
      <RakutenWidget />
    </ArticlePageLayout>
  );
}
