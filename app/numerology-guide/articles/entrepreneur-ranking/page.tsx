import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で独立・起業家向きランキング｜一人で動く・起業向きの数字は？",
  description:
    "数秘術のライフパスナンバーから、独立・起業・一人で動く力が強い順にランキング。1・5・8など、起業家向きの数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で独立・起業家向きランキング",
    description: "1・5・8など、一人で動く・起業向きのライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/numerology-guide/articles/entrepreneur-ranking",
  },
};

const RANKING = [
  { num: 1, reason: "生まれながらの開拓者。独立心が強く、自分の道を切り開く力がある" },
  { num: 8, reason: "権力・実行力で、ビジネスを成功させる野心と才覚がある" },
  { num: 5, reason: "自由と変化を愛し、フリーランス・起業に適した適応力がある" },
  { num: 22, reason: "壮大なビジョンを現実化する。大規模プロジェクトを一人で牽引" },
  { num: 3, reason: "創造性と表現力で、クリエイティブな仕事を独立で展開" },
  { num: 11, reason: "直感とインスピレーションで、革新的なアイデアを形にする" },
  { num: 4, reason: "堅実に基盤を築く。一人でコツコツと事業を構築" },
  { num: 9, reason: "人望と奉仕で、多くの人を巻き込むプロジェクトを主導" },
  { num: 7, reason: "専門性を深め、独立したコンサルタント・研究者として活躍" },
  { num: 6, reason: "責任感で家族やチームを支えるが、独立より協働が向く" },
  { num: 2, reason: "調和を大切にし、一人よりパートナーを求める傾向" },
  { num: 33, reason: "奉仕の精神で、独立より組織やコミュニティでの活動が向く" },
];

export default function EntrepreneurRankingArticlePage() {
  const article = getArticleBySlug("entrepreneur-ranking");
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
              数秘術で独立・起業家向きランキング
            </h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、一人で動く・起業に向いている順にランキングしました。独立や副業を検討する際の参考にしてみてください。
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>独立心・行動力・適応力・野心</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-slate-200 text-sm leading-relaxed">
                下位の数字だから起業できないわけではありません。2はパートナーと、6はチームで、それぞれの強みを活かした形で独立できます。協働型の起業も選択肢です。
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
