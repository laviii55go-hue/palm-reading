import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で金運・仕事運ランキング｜お金・キャリアに強い数字は？",
  description:
    "数秘術のライフパスナンバーから、金運・仕事運・キャリアに強い順にランキング。4・8・22など、お金を稼ぎ、キャリアを築く力を持つ数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で金運・仕事運ランキング",
    description: "4・8・22など、お金・キャリアに強いライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/money-work-ranking",
  },
};

const RANKING = [
  { num: 8, reason: "権力・富・成功の数字。ビジネスで成果を出し、金運を引き寄せる力が強い" },
  { num: 22, reason: "壮大なビジョンを現実化するマスタービルダー。大規模プロジェクトで成功" },
  { num: 4, reason: "堅実な建設者。コツコツ積み上げ、安定した収入と信頼を築く" },
  { num: 1, reason: "開拓者。新しい事業を始め、キャリアのパイオニアになれる" },
  { num: 6, reason: "責任感と美的センスで、サービス・福祉・デザイン分野で活躍" },
  { num: 9, reason: "人望と奉仕の精神で、多くの人を巻き込むプロジェクトで成功" },
  { num: 3, reason: "表現力と社交性で、クリエイティブ・広報分野で活躍" },
  { num: 11, reason: "直感とインスピレーションで、革新的なアイデアを形にする" },
  { num: 2, reason: "調和とサポートで、チームの要として活躍" },
  { num: 5, reason: "変化と適応力で、マーケティング・営業などで活躍" },
  { num: 33, reason: "癒しと奉仕で、ヒーリング・教育分野で活躍" },
  { num: 7, reason: "分析・研究で、専門家としての価値を高める" },
];

export default function MoneyWorkRankingArticlePage() {
  const article = getArticleBySlug("money-work-ranking");
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
              数秘術で金運・仕事運ランキング
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、お金・キャリアに強い順にランキングしました。仕事選びや副業のヒントとして参考にしてみてください。
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>実行力・組織力・忍耐力・ビジョン</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-slate-200 text-sm leading-relaxed">
                下位の数字だから金運が悪いわけではありません。7は専門家として、33は奉仕を通じて価値を生みます。自分の数字に合った活躍の場を見つけることが大切です。
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
