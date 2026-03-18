import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで独立・起業家向きランキング｜一人で動く・起業向きのタイプは？",
  description:
    "16タイプ性格診断から、独立・起業・一人で動く力が強い順にランキング。ENTP・ESTP・ENTJなど、起業家向きのタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで独立・起業家向きランキング",
    description: "ENTP・ESTP・ENTJなど、一人で動く・起業向きの16タイプをランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/personality-guide/articles/entrepreneur-ranking",
  },
};

const RANKING = [
  { code: "ENTP", reason: "起業・コンサル・企画など、新しい挑戦やアイデアで新しい価値を生み出す" },
  { code: "ESTP", reason: "営業・起業・スポーツなど、リスクを恐れず行動力で成果を出す" },
  { code: "ENTJ", reason: "経営・マネジメントで、目標達成のために組織を動かす" },
  { code: "INTJ", reason: "一人で集中して戦略立案。長期的なビジョンを描いて独立" },
  { code: "INTP", reason: "研究・分析・システム設計など、論理的思考で専門家として独立" },
  { code: "ISTP", reason: "エンジニア・整備など、技術や実践で問題を解決して独立" },
  { code: "ESTJ", reason: "管理職・経営で、組織をまとめて確実に成果を出す" },
  { code: "ENFP", reason: "マーケティング・イベントなど、創造性を発揮するが計画が苦手な面も" },
  { code: "ISTJ", reason: "着実に基盤を築くが、変化より安定を好む傾向" },
  { code: "ENFJ", reason: "人を育てる仕事で独立するが、他人の評価を気にしがち" },
  { code: "ESFP", reason: "接客・エンタメで活躍するが、長期的計画より即興が得意" },
  { code: "INFJ", reason: "カウンセリング・NPOなど、理想追求で独立するが疲れやすい" },
  { code: "ISFP", reason: "デザイン・アートで独立するが、衝突を避けがち" },
  { code: "ESFJ", reason: "人と関わる仕事で活躍するが、一人よりチームが向く" },
  { code: "ISFJ", reason: "献身的に支えるが、独立よりサポート役が向く" },
  { code: "INFP", reason: "創作・福祉で独立するが、決断が遅い傾向" },
];

export default function EntrepreneurRankingArticlePage() {
  const article = getArticleBySlug("entrepreneur-ranking");
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
              16タイプで独立・起業家向きランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、一人で動く・起業に向いている順にランキングしました。独立や副業を検討する際の参考にしてみてください。
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
                        {data?.work && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.work}
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
                このランキングは、各タイプの<strong>独立心・行動力・適応力・野心</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから起業できないわけではありません。ISFJはパートナーと、ESFJはチームで、それぞれの強みを活かした形で独立できます。
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
