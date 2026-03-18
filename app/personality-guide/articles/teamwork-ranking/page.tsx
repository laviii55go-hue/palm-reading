import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプでチームワーク・協調性ランキング｜集団で活躍するタイプは？",
  description:
    "16タイプ性格診断から、チームワーク・協調性・集団行動に向いている順にランキング。ESFJ・ENFJ・ISFJなど、チームで活躍するタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプでチームワーク・協調性ランキング",
    description: "ESFJ・ENFJ・ISFJなど、集団で活躍する16タイプをランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/personality-guide/articles/teamwork-ranking",
  },
};

const RANKING = [
  { code: "ESFJ", reason: "社交的で人の世話を焼くことが好き。調和を大切にし、周囲を明るく盛り上げる" },
  { code: "ENFJ", reason: "人を導き成長させることに喜びを感じ、カリスマ性と共感力でチームをまとめる" },
  { code: "ISFJ", reason: "献身的で細やかな気配り。人のために尽くし、安定した関係を大切にする" },
  { code: "ENFP", reason: "人を惹きつける魅力で周囲を巻き込み、チームの雰囲気を盛り上げる" },
  { code: "ESTJ", reason: "組織をまとめ、ルールに基づいて効率と秩序を重視し、チームで成果を出す" },
  { code: "ESFP", reason: "その場の空気を読んで盛り上げ、周囲に笑顔を届ける" },
  { code: "ISTJ", reason: "責任感と信頼性で、着実にチームの基盤を築く" },
  { code: "INFJ", reason: "人の本質を見抜き、より良いチームのために行動する" },
  { code: "INFP", reason: "価値観を大切にし、人の支えになることを喜びとする" },
  { code: "ENTJ", reason: "リーダーとして組織を動かすが、支配的になりすぎに注意" },
  { code: "ENTP", reason: "アイデアでチームに貢献するが、一人の時間も必要" },
  { code: "ISTP", reason: "実用的に問題解決するが、一人で集中する傾向も" },
  { code: "ISFP", reason: "穏やかで調和を大切にするが、自分のペースを好む" },
  { code: "INTJ", reason: "戦略で貢献するが、独立心が強く一人で進みたくなる傾向" },
  { code: "INTP", reason: "分析で貢献するが、社交より一人で考える時間を好む" },
  { code: "ESTP", reason: "行動力で貢献するが、自由と変化を好み束縛に窮屈さを感じやすい" },
];

export default function TeamworkRankingArticlePage() {
  const article = getArticleBySlug("teamwork-ranking");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="personality">
      <ColumnNavPills variant="personality" />

        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-teal-500 text-xs font-bold uppercase tracking-wider">
                16タイプコラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-teal-900 leading-tight">
              16タイプでチームワーク・協調性ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、チームワーク・グループ活動・集団行動に向いている順にランキングしました。仕事のチーム、サークル、ボランティアなど、集団で動く場面での参考にしてみてください。
            </p>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              📊 ランキング一覧
            </h2>
            <div className="space-y-4">
              {RANKING.map((item, i) => {
                const data = PERSONALITY_TYPES[item.code];
                const rank = i + 1;
                const rankStyle =
                  rank === 1
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : rank <= 3
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-white border-teal-100 text-teal-700";
                return (
                  <div
                    key={item.code}
                    className={`rounded-2xl border-2 p-4 ${rankStyle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-200 flex items-center justify-center font-black text-teal-700 shrink-0">
                        {rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-teal-900">
                            {item.code}
                          </span>
                          <span className="font-bold text-teal-900">
                            {data?.nickname ?? ""}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.reason}
                        </p>
                        {data?.strength && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.strength}
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
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              💡 ランキングの見方
            </h2>
            <div className="rounded-2xl bg-teal-50 border border-teal-100 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                このランキングは、各タイプの<strong>協調性・奉仕精神・組織力・社交性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから集団行動が苦手というわけではありません。INTJは戦略で、ESTPは行動で、それぞれ集団に貢献できます。自分の強みを活かすことが大切です。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🧠 あなたのタイプを調べる
            </h2>
            <p className="text-gray-600 text-sm">
              8問の質問で、あなたの16タイプを診断できます。
            </p>
            <Link
              href="/personality"
              className="block w-full py-4 rounded-2xl bg-teal-600 text-white font-bold text-center shadow-md hover:bg-teal-700 transition-colors"
            >
              🧠 16タイプ診断する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
