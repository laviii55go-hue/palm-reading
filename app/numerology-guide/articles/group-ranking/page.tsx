import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術でグループ・集団行動に向いているランキング｜協調性が高い数字は？",
  description:
    "数秘術のライフパスナンバーから、グループワーク・チーム活動・集団行動に向いている順にランキング。協調性、奉仕精神、組織力など、集団で活躍する数字の特徴を解説します。",
  openGraph: {
    title: "数秘術でグループ・集団行動に向いているランキング",
    description: "協調性が高い数字、チームで活躍するライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/numerology-guide/articles/group-ranking",
  },
};

// グループ・集団行動に向いている順（数秘術の特性に基づく）
const GROUP_RANKING = [
  { num: 2, reason: "協調性・共感力・橋渡し役として、チームの調和を自然に作る力がある" },
  { num: 6, reason: "責任感と奉仕精神で、家族やコミュニティを大切にし、集団の絆を深める" },
  { num: 33, reason: "無条件の愛と癒しの力で、多くの人を導き、奉仕の精神が集団を支える" },
  { num: 4, reason: "組織力・忍耐力・信頼性で、チームの基盤を堅実に築く" },
  { num: 9, reason: "普遍的な愛と奉仕の精神で、広い視野を持ち集団のため尽くす" },
  { num: 3, reason: "社交性・表現力・楽観性で、チームの雰囲気を明るく盛り上げる" },
  { num: 22, reason: "壮大なビジョンと組織力で、大規模プロジェクトを牽引する" },
  { num: 8, reason: "リーダーシップ・実行力で組織を動かすが、支配的になりすぎに注意" },
  { num: 11, reason: "直感とインスピレーションで人を鼓舞するが、一人の時間も必要" },
  { num: 1, reason: "リーダーとして先頭に立つが、独立心が強く一人で進みたくなる傾向も" },
  { num: 5, reason: "自由と変化を愛するため、集団のルールや束縛に窮屈さを感じやすい" },
  { num: 7, reason: "内省・探求を好み、一人で深く考える時間を大切にする傾向が強い" },
];

export default function GroupRankingArticlePage() {
  const article = getArticleBySlug("group-ranking");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="numerology">
      <ColumnNavPills variant="numerology" />

        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-violet-500 text-xs font-bold uppercase tracking-wider">
                数秘術コラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-violet-900 leading-tight">
              数秘術でグループ・集団行動に向いているランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、チームワーク・グループ活動・集団行動に向いている順にランキングしました。仕事のチーム、サークル、ボランティアなど、集団で動く場面での参考にしてみてください。
            </p>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              📊 ランキング一覧
            </h2>
            <div className="space-y-4">
              {GROUP_RANKING.map((item, i) => {
                const data = NUMEROLOGY_DATA[item.num];
                const rank = i + 1;
                const rankStyle =
                  rank === 1
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : rank <= 3
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-white border-violet-100 text-violet-700";
                return (
                  <div
                    key={item.num}
                    className={`rounded-2xl border-2 p-4 ${rankStyle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white/80 border-2 border-violet-200 flex items-center justify-center font-black text-violet-700 shrink-0">
                        {rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{data?.emoji ?? "🔢"}</span>
                          <span className="font-bold text-violet-900">
                            ライフパスナンバー【{item.num}】{data?.title ?? ""}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.reason}
                        </p>
                        {data?.keywords && (
                          <p className="text-xs text-violet-600 mt-2">
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
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              💡 ランキングの見方
            </h2>
            <div className="rounded-2xl bg-violet-50 border border-violet-100 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                このランキングは、数秘術における各ライフパスナンバーの<strong>協調性・奉仕精神・組織力・社交性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だから集団行動が苦手というわけではありません。1番はリーダーとして、5番は自由な発想で、7番は深い分析で、それぞれ集団に貢献できます。自分の数字の強みを活かすことが大切です。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🔢 あなたのライフパスナンバーを調べる
            </h2>
            <p className="text-gray-600 text-sm">
              生年月日からライフパスナンバーを計算し、性格・相性・今年のテーマまで診断できます。
            </p>
            <Link
              href="/lucky-number"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
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
