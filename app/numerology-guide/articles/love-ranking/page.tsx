import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で恋愛運が良いランキング｜恋愛・パートナーシップ向きの数字は？",
  description:
    "数秘術のライフパスナンバーから、恋愛運・パートナーシップに向いている順にランキング。2・6・9など、恋愛に恵まれる数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で恋愛運が良いランキング",
    description: "2・6・9など、恋愛・パートナーシップ向きのライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/numerology-guide/articles/love-ranking",
  },
};

const RANKING = [
  { num: 6, reason: "愛の守護者。深い愛情と責任感で、理想的な恋人・パートナーになれる" },
  { num: 2, reason: "調和の人。献身的で思いやり深く、相手の気持ちを大切にする" },
  { num: 9, reason: "普遍的な愛と包容力で、深く愛し、長続きする関係を築く" },
  { num: 33, reason: "無条件の愛と癒しの力で、パートナーを温かく包み込む" },
  { num: 3, reason: "明るく楽しい恋愛を楽しむ。表現力で相手を喜ばせる" },
  { num: 11, reason: "直感とロマンチックな感性で、特別な恋愛を引き寄せる" },
  { num: 4, reason: "誠実で安定した恋愛。じっくり信頼関係を築く" },
  { num: 1, reason: "情熱的だが束縛を嫌う。対等なパートナーシップを求める" },
  { num: 8, reason: "強烈に惹かれ合うが、主導権争いになりやすい" },
  { num: 5, reason: "自由で刺激的な恋愛を好むが、飽きやすい面も" },
  { num: 22, reason: "ビジョン重視で、恋愛より仕事・目標に注力しがち" },
  { num: 7, reason: "内面重視で、恋愛に慎重。深い理解を求める" },
];

export default function LoveRankingArticlePage() {
  const article = getArticleBySlug("love-ranking");
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
              数秘術で恋愛運が良いランキング
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、恋愛・パートナーシップに向いている順にランキングしました。恋愛の傾向や相性のヒントとして参考にしてみてください。
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>愛情表現・献身性・パートナーシップ適性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-slate-200 text-sm leading-relaxed">
                下位の数字だから恋愛運が悪いわけではありません。7は深い理解を、5は刺激的な恋愛を求めるなど、それぞれの恋愛スタイルがあります。相性を確認するには、相手のライフパスナンバーを調べてみましょう。
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

