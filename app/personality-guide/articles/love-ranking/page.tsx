import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで恋愛運が良いランキング｜恋愛・パートナーシップ向きのタイプは？",
  description:
    "16タイプ性格診断から、恋愛運・パートナーシップに向いている順にランキング。ENFP・ESFJ・INFPなど、恋愛に恵まれるタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで恋愛運が良いランキング",
    description: "ENFP・ESFJ・INFPなど、恋愛・パートナーシップ向きの16タイプをランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/personality-guide/articles/love-ranking",
  },
};

const RANKING = [
  { code: "ENFP", reason: "刺激的で楽しい関係を好み、一緒に冒険できる相手と相性が良い" },
  { code: "ESFJ", reason: "家族や友人との絆を大切にし、パートナーを支えて一緒に楽しい時間を過ごす" },
  { code: "INFP", reason: "心の通じ合いを重視し、相手を理解し理解される関係を求める" },
  { code: "ENFJ", reason: "深い絆と成長を共有できる関係を求め、パートナーを支えて一緒に成長する" },
  { code: "ISFJ", reason: "相手を支え守る関係を好み、感謝されることで満足感を得る" },
  { code: "INFJ", reason: "深い精神的なつながりを求め、理解し合える相手と一生のパートナー関係を築く" },
  { code: "ESFP", reason: "楽しく刺激的な関係を好み、一緒に遊び笑い合える相手が理想" },
  { code: "ESTP", reason: "刺激的で楽しい関係を好み、一緒にアクティブに過ごせる相手と相性が良い" },
  { code: "ISFP", reason: "穏やかで温かい関係を好み、相手を尊重し尊重される関係を求める" },
  { code: "ISTJ", reason: "安定した関係を大切にし、約束を守り誠実にパートナーに向き合う" },
  { code: "ESTJ", reason: "安定した家庭を築くことを重視し、パートナーと協力して目標を達成する" },
  { code: "ENTP", reason: "刺激的で飽きのこない関係を好むが、議論好きで感情的配慮が不足しがち" },
  { code: "INTJ", reason: "深い絆を大切にするが、本音を共有できる相手を見つけるまで時間がかかる" },
  { code: "INTP", reason: "知的に刺激し合える相手を求めるが、感情表現が苦手な面も" },
  { code: "ISTP", reason: "干渉されない自由な関係を好むが、感情表現が苦手" },
  { code: "ENTJ", reason: "対等なパートナーシップを好むが、感情的配慮が不足しがち" },
];

export default function LoveRankingArticlePage() {
  const article = getArticleBySlug("love-ranking");
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
              16タイプで恋愛運が良いランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、恋愛・パートナーシップに向いている順にランキングしました。恋愛の傾向や相性のヒントとして参考にしてみてください。
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
                        {data?.love && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.love}
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
                このランキングは、各タイプの<strong>愛情表現・献身性・パートナーシップ適性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから恋愛運が悪いわけではありません。ENTJは対等な関係を、ISTPは自由な関係を求めるなど、それぞれの恋愛スタイルがあります。
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
