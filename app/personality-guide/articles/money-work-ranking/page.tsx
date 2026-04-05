import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで金運・仕事運ランキング｜お金・キャリアに強いタイプは？",
  description:
    "16タイプ性格診断から、金運・仕事運・キャリアに強い順にランキング。ENTJ・ESTJ・INTJなど、お金を稼ぎキャリアを築く力を持つタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで金運・仕事運ランキング",
    description: "ENTJ・ESTJ・INTJなど、お金・キャリアに強い16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/money-work-ranking",
  },
};

const RANKING = [
  { code: "ENTJ", reason: "経営・マネジメント・プロジェクトリーダーで、効率的に成果を出す" },
  { code: "ESTJ", reason: "管理職・経営・法務など、組織を動かし確実に成果を出す" },
  { code: "INTJ", reason: "戦略立案や専門分野の深掘りで、長期的なプロジェクトを成功させる" },
  { code: "ISTJ", reason: "事務・経理・品質管理など、正確さと継続性で信頼を築く" },
  { code: "ENTP", reason: "起業・コンサル・企画など、新しい挑戦やアイデアで価値を生む" },
  { code: "ESTP", reason: "営業・起業・スポーツなど、行動力で成果を出す" },
  { code: "ENFJ", reason: "教育・人事・コーチングなど、人を育てる仕事で真価を発揮" },
  { code: "ENFP", reason: "マーケティング・イベント・クリエイティブなど、人と関わり創造性を発揮" },
  { code: "INTP", reason: "研究・分析・システム設計など、論理的思考で専門性を高める" },
  { code: "ESFJ", reason: "接客・人事・教育など、人と関わる仕事で力を発揮" },
  { code: "ISTP", reason: "エンジニア・整備・スポーツなど、技術や実践で価値を生む" },
  { code: "INFJ", reason: "カウンセリング・教育・NPOなど、社会貢献に関わる仕事で活躍" },
  { code: "ISFJ", reason: "医療・介護・事務など、人を支える仕事で信頼を築く" },
  { code: "ISFP", reason: "デザイン・アート・美容など、創造性を活かす仕事が向く" },
  { code: "INFP", reason: "創作・カウンセリング・福祉など、価値観が活かせる仕事が向く" },
  { code: "ESFP", reason: "接客・エンタメ・イベントなど、人を楽しませる仕事で活躍" },
];

export default function MoneyWorkRankingArticlePage() {
  const article = getArticleBySlug("money-work-ranking");
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
              16タイプで金運・仕事運ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、お金・キャリアに強い順にランキングしました。仕事選びやキャリアのヒントとして参考にしてみてください。
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
                このランキングは、各タイプの<strong>実行力・組織力・忍耐力・専門性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから金運が悪いわけではありません。ESFPは接客で、INFPは創作で、それぞれの形で価値を生み出しています。
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
