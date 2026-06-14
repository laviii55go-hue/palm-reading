import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import ArticlePageLayout from "../../components/ArticlePageLayout";
import ColumnNavPills from "../../components/ColumnNavPills";
import RakutenWidget from "../../components/RakutenWidget";
import { formatArticleDate, getVisibleArticles } from "./articlesConfig";

export const metadata: Metadata = {
  title: "手相占いコラム・記事一覧｜手のひらの予言者",
  description: "手相占いをテーマにしたコラム・記事一覧。基本3線の読み方、左右の手の違いなど、初心者向けにやさしく解説します。",
};

export default function PalmArticlesPage() {
  const articles = getVisibleArticles();
  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
      <div className="text-center space-y-2">
        <p className="text-purple-500 text-xs font-bold uppercase tracking-wider">手相占いコラム</p>
        <h1 className="text-2xl font-black text-purple-900">手相占いコラム・記事一覧</h1>
        <p className="text-gray-600 text-sm">手相占いをテーマにした記事をお届けします</p>
      </div>
      <div className="space-y-4">
        {[...articles].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).map((article) => (
          <Link key={article.slug} href={`/palm-guide/articles/${article.slug}`} className="block rounded-2xl border-2 border-purple-100 bg-white p-5 hover:border-purple-200 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <span className="text-3xl shrink-0">{article.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="text-purple-500 text-xs font-medium">{formatArticleDate(article.publishedAt)} 掲載</p>
                <h2 className="font-bold text-purple-900 text-base leading-snug mt-0.5">{article.title}</h2>
                <p className="text-gray-600 text-sm mt-1">{article.desc}</p>
                <p className="text-purple-400 text-xs mt-2">続きを読む →</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-purple-500 to-violet-700 p-6 text-white text-center space-y-4">
        <div className="font-bold text-lg">手相診断を試す</div>
        <p className="text-purple-200 text-sm">クイズ形式で手相の基本を楽しく学べます</p>
        <Link href="/palm-quiz" className="block bg-white text-purple-600 font-bold py-3 rounded-2xl hover:bg-purple-50 transition-colors">✋ 手相診断を試す →</Link>
      </div>
      <AdBanner />
      <RakutenWidget />
    </ArticlePageLayout>
  );
}
