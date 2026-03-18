import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA, getCompatibility } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術の相性の組み合わせ解説｜1と2・3と7など代表的な数字の相性",
  description:
    "数秘術のライフパスナンバー同士の相性を解説。「1と2の相性」「3と7の相性」など、代表的な組み合わせを恋愛・仕事・友情の観点から記事形式で紹介します。",
  openGraph: {
    title: "数秘術の相性の組み合わせ解説",
    description: "「1と2の相性」「3と7の相性」など、代表的な数字の組み合わせを数秘術の観点から記事形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/numerology-guide/articles/compatibility-pairs",
  },
};

// 解説する相性の組み合わせ（小→大の順）
const PAIRS: [number, number][] = [
  [1, 2],
  [1, 3],
  [1, 5],
  [2, 4],
  [2, 5],
  [2, 6],
  [3, 4],
  [3, 5],
  [3, 7],
  [4, 6],
  [6, 9],
];

function ScoreStars({ score }: { score: number }) {
  const full = "★";
  const empty = "☆";
  return (
    <span className="text-amber-500 text-sm">
      {full.repeat(score)}
      {empty.repeat(5 - score)}
    </span>
  );
}

export default function CompatibilityPairsArticlePage() {
  const article = getArticleBySlug("compatibility-pairs");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="numerology">
      <ColumnNavPills variant="numerology" />
        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-violet-400 text-xs font-bold uppercase tracking-wider">
                数秘術コラム
              </p>
              {publishedDate && (
                <p className="text-slate-400 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-white leading-tight">
              数秘術の相性の組み合わせ解説
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              「1と2の相性」「3と7の相性」など、代表的なライフパスナンバーの組み合わせを、恋愛・仕事・友情の観点から解説します。相性スコアは★5段階で表示しています。
            </p>
          </header>

          <section className="mt-8 space-y-8">
            {PAIRS.map(([a, b]) => {
              const comp = getCompatibility(a, b);
              const dataA = NUMEROLOGY_DATA[a];
              const dataB = NUMEROLOGY_DATA[b];
              return (
                <div
                  key={`${a}-${b}`}
                  className="rounded-2xl border-2 border-violet-600/50 bg-white/10 p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-white">
                      【{a}】と【{b}】の相性
                    </h2>
                    <ScoreStars score={comp.score} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-violet-400">
                    <span>{dataA?.emoji ?? "🔢"} {dataA?.title ?? ""}</span>
                    <span>×</span>
                    <span>{dataB?.emoji ?? "🔢"} {dataB?.title ?? ""}</span>
                  </div>
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {comp.general}
                  </p>
                  <div className="grid gap-3 text-sm">
                    <div>
                      <span className="font-bold text-violet-400">💕 恋愛：</span>
                      <span className="text-slate-200">{comp.love}</span>
                    </div>
                    <div>
                      <span className="font-bold text-violet-400">💼 仕事：</span>
                      <span className="text-slate-200">{comp.work}</span>
                    </div>
                    <div>
                      <span className="font-bold text-violet-400">🤝 友情：</span>
                      <span className="text-slate-200">{comp.friendship}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-white border-b-2 border-violet-600/50 pb-2">
              💡 相性の見方
            </h2>
            <div className="rounded-2xl bg-white/10 border border-violet-600/30 p-4 space-y-3">
              <p className="text-slate-200 text-sm leading-relaxed">
                相性スコアは★5段階で、5が最高・1が最低です。ただし低いからといって相性が悪いわけではありません。違いが多い組み合わせほど、お互いを補い合い、成長できる可能性があります。
              </p>
              <p className="text-slate-200 text-sm leading-relaxed">
                マスターナンバー（11・22・33）の方は、11→2、22→4、33→6に換算した相性を参照してください。例えば11の方は「2」の相性を、22の方は「4」の相性をご覧ください。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-white border-b-2 border-violet-600/50 pb-2">
              🔢 あなたと相手の相性を調べる
            </h2>
            <p className="text-slate-300 text-sm">
              生年月日からライフパスナンバーを計算し、恋人・友人・家族との相性を診断できます。
            </p>
            <Link
              href="/lucky-number"
              className="block w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-center shadow-md hover:bg-violet-700 transition-colors"
            >
              🔢 数秘術占いで相性診断する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
