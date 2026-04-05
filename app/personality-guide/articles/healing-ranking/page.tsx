import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで癒し系・相談相手向きランキング｜話を聞く・支える役割が得意なタイプは？",
  description:
    "16タイプ性格診断から、癒し系・相談相手・話を聞く・支える役割が得意な順にランキング。INFJ・ISFJ・ENFJなど、人を支える力を持つタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで癒し系・相談相手向きランキング",
    description: "INFJ・ISFJ・ENFJなど、話を聞く・支える役割が得意な16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/healing-ranking",
  },
};

const RANKING = [
  { code: "INFJ", reason: "理想主義的で深い洞察力。人の本質を見抜き、より良い世界のために行動する" },
  { code: "ISFJ", reason: "献身的で細やかな気配り。人のために尽くすことを喜びとし、安定した関係を大切にする" },
  { code: "ENFJ", reason: "人を導き成長させることに喜びを感じ、共感力で周囲を支える" },
  { code: "INFP", reason: "感受性豊かで価値観を大切に。創造的な表現や人の支えになることを喜びとする" },
  { code: "ESFJ", reason: "社交的で人の世話を焼くことが好き。調和を大切にし、周囲を明るく支える" },
  { code: "ENFP", reason: "人を惹きつける魅力で、周囲を盛り上げて元気づける" },
  { code: "ISFP", reason: "穏やかで美的感覚に優れ、相手を尊重し尊重される関係を大切にする" },
  { code: "INTP", reason: "論理的に分析して助言するが、感情面のサポートは苦手な面も" },
  { code: "ISTJ", reason: "責任感と信頼性で安心感を与えるが、感情的配慮より実務サポートが得意" },
  { code: "INTJ", reason: "洞察力はあるが、支えるより戦略を立てる役割が向く" },
  { code: "ENTP", reason: "アイデアで助けるが、感情的寄り添いは苦手な面も" },
  { code: "ESTJ", reason: "組織をまとめるが、感情的配慮が不足しがち" },
  { code: "ISTP", reason: "実用的に問題解決するが、感情表現が苦手" },
  { code: "ESTP", reason: "行動力はあるが、じっくり話を聞くより動く方が得意" },
  { code: "ESFP", reason: "明るく盛り上げるが、深い相談相手より楽しい相手が向く" },
  { code: "ENTJ", reason: "リーダーシップは強いが、支えるより牽引する役割が向く" },
];

export default function HealingRankingArticlePage() {
  const article = getArticleBySlug("healing-ranking");
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
              16タイプで癒し系・相談相手向きランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、話を聞く・支える役割が得意な順にランキングしました。カウンセラー・ヒーラー・相談役を目指す方の参考にしてみてください。
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
                このランキングは、各タイプの<strong>共感力・奉仕精神・包容力・安心感</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから人を支えられないわけではありません。ENTJはリードで、ESTPは行動で、それぞれの形で人を支えています。
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
