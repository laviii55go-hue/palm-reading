import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術でクリエイティブ才能ランキング｜表現・創作に向いている数字は？",
  description:
    "数秘術のライフパスナンバーから、クリエイティブ才能・表現・創作に向いている順にランキング。3・9・11など、表現力が豊かな数字の特徴を解説します。",
  openGraph: {
    title: "数秘術でクリエイティブ才能ランキング",
    description: "3・9・11など、表現・創作に向いているライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/numerology-guide/articles/creative-ranking",
  },
};

const RANKING = [
  { num: 3, reason: "表現者。創造性・表現力・社交性で、アート・音楽・言葉で自分を表現する" },
  { num: 9, reason: "普遍的な愛と芸術性。広い視野で深い表現を生み出す" },
  { num: 11, reason: "直感とインスピレーション。革新的なアイデアとビジョンを形にする" },
  { num: 6, reason: "美的センスと愛情。デザイン・料理・環境づくりで美を創造" },
  { num: 5, reason: "自由と多才さ。変化と冒険を通じて新しい表現を生み出す" },
  { num: 1, reason: "開拓者。創造性とパイオニア精神で、新しいものを生み出す" },
  { num: 33, reason: "癒しと奉仕。芸術を通じて人を癒す表現" },
  { num: 7, reason: "内省と探求。深い分析と独自の視点で表現" },
  { num: 2, reason: "調和と感受性。繊細な感性で表現する" },
  { num: 4, reason: "堅実な建設者。計画性を持って形にする" },
  { num: 8, reason: "実行力は強いが、創造よりビジネス・管理が向く" },
  { num: 22, reason: "ビジョン重視。大規模なプロジェクトの設計が向く" },
];

export default function CreativeRankingArticlePage() {
  const article = getArticleBySlug("creative-ranking");
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
              数秘術でクリエイティブ才能ランキング
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、表現・創作に向いている順にランキングしました。アート・音楽・文章・デザインなど、クリエイティブな活動の参考にしてみてください。
            </p>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-white border-b-2 border-violet-600/50 pb-2">
              📊 ランキング一覧
            </h2>
            <div className="space-y-4">
              {RANKING.map((item, i) => {
                const data = NUMEROLOGY_DATA[item.num];
                const rank = i + 1;
                const rankStyle =
                  rank === 1
                    ? "bg-amber-500/20 border-amber-400/50 text-amber-100"
                    : rank <= 3
                    ? "bg-amber-500/10 border-amber-400/30 text-amber-50"
                    : "bg-white/10 border-violet-600/30 text-slate-200";
                return (
                  <div
                    key={item.num}
                    className={`rounded-2xl border-2 p-4 ${rankStyle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 border-2 border-violet-500/50 flex items-center justify-center font-black text-white shrink-0">
                        {rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{data?.emoji ?? "🔢"}</span>
                          <span className="font-bold text-white">
                            ライフパスナンバー【{item.num}】{data?.title ?? ""}
                          </span>
                        </div>
                        <p className="text-slate-200 text-sm leading-relaxed">
                          {item.reason}
                        </p>
                        {data?.keywords && (
                          <p className="text-xs text-violet-400 mt-2">
                            {data.keywords.slice(0, 3).join("・")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-white border-b-2 border-violet-600/50 pb-2">
              💡 ランキングの見方
            </h2>
            <div className="rounded-2xl bg-white/10 border border-violet-600/30 p-4 space-y-3">
              <p className="text-slate-200 text-sm leading-relaxed">
                このランキングは、数秘術における各ライフパスナンバーの<strong>創造性・表現力・美的センス・インスピレーション</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-slate-200 text-sm leading-relaxed">
                下位の数字だからクリエイティブになれないわけではありません。4は堅実な設計で、22は壮大なビジョンで、それぞれの形で創造しています。自分の表現スタイルを見つけましょう。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-white border-b-2 border-violet-600/50 pb-2">
              🔢 あなたのライフパスナンバーを調べる
            </h2>
            <p className="text-slate-300 text-sm">
              生年月日からライフパスナンバーを計算し、性格・相性・今年のテーマまで診断できます。
            </p>
            <Link
              href="/lucky-number"
              className="block w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-center shadow-md hover:bg-violet-700 transition-colors"
            >
              🔢 数秘術占いで診断する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
