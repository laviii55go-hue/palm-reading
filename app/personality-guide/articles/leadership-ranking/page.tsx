import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプでリーダーシップが強いランキング｜先頭に立つタイプは？",
  description:
    "16タイプ性格診断から、リーダーシップ・先頭に立つ力を持つ順にランキング。ENTJ・ESTJ・ENFJなど、組織を牽引するタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプでリーダーシップが強いランキング",
    description: "ENTJ・ESTJ・ENFJなど、先頭に立つ力を持つ16タイプをランキング形式で解説。",
    url: "https://jade-torte-9b5cde.netlify.app/personality-guide/articles/leadership-ranking",
  },
};

const RANKING = [
  { code: "ENTJ", reason: "リーダーシップと決断力に優れ、目標達成のために組織を動かす" },
  { code: "ESTJ", reason: "組織をまとめ、ルールに基づいて効率的に成果を出す" },
  { code: "ENFJ", reason: "人を導き成長させることに喜びを感じ、カリスマ性で周囲を巻き込む" },
  { code: "INTJ", reason: "論理的で戦略的。長期的ビジョンを描き、一人で集中して牽引する" },
  { code: "ENTP", reason: "アイデア豊富で議論を楽しみ、新しい価値を生み出す" },
  { code: "ESFJ", reason: "調和を大切にし、人の世話を焼いてチームをまとめる" },
  { code: "ISTJ", reason: "責任感と信頼性で、着実に基盤を築く" },
  { code: "ESTP", reason: "行動力と適応力で、その場の状況に合わせて素早く動く" },
  { code: "ENFP", reason: "人を惹きつける魅力で周囲を盛り上げるが、計画より即興が得意" },
  { code: "INFJ", reason: "洞察力で人を導くが、表舞台より裏方で支える傾向" },
  { code: "INTP", reason: "理論追求は得意だが、人を動かすより一人で分析する傾向" },
  { code: "ISFJ", reason: "献身的に支えるが、先頭に立つよりサポート役が向く" },
  { code: "ISTP", reason: "実用的に問題解決するが、組織のトップより専門家として活躍" },
  { code: "ISFP", reason: "穏やかで美的感覚に優れるが、リーダーより自分のペースを大切に" },
  { code: "INFP", reason: "価値観を大切にするが、先頭に立つより信念に従って支える傾向" },
  { code: "ESFP", reason: "場を盛り上げるが、深い計画や長期的リーダーより即興が得意" },
];

export default function LeadershipRankingArticlePage() {
  const article = getArticleBySlug("leadership-ranking");
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
              16タイプでリーダーシップが強いランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、先頭に立つ力・リーダーシップが強い順にランキングしました。仕事、チーム、プロジェクトなどでリードする場面の参考にしてみてください。
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
                このランキングは、各タイプの<strong>決断力・実行力・組織力・人望</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだからリーダーになれないわけではありません。ISFPは創造型、INFPは信念型など、リーダーシップのスタイルはタイプによって異なります。自分の強みを活かしたリーダー像を探してみてください。
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
