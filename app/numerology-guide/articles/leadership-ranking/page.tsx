import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術でリーダーシップが強いランキング｜先頭に立つ数字は？",
  description:
    "数秘術のライフパスナンバーから、リーダーシップ・先頭に立つ力を持つ順にランキング。1・8・22など、組織を牽引する数字の特徴を解説します。",
  openGraph: {
    title: "数秘術でリーダーシップが強いランキング",
    description: "1・8・22など、先頭に立つ力を持つライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/leadership-ranking",
  },
};

const RANKING = [
  { num: 8, reason: "権力・実行力・組織運営の才で、リーダーとして最も力強い存在" },
  { num: 22, reason: "壮大なビジョンと組織力で、大規模プロジェクトを牽引するマスタービルダー" },
  { num: 1, reason: "生まれながらの開拓者。強い意志と独立心で先頭に立つ" },
  { num: 11, reason: "直感とインスピレーションで人を鼓舞し、ビジョンを伝える力がある" },
  { num: 4, reason: "堅実な組織力と信頼性で、チームの基盤を築くリーダー" },
  { num: 9, reason: "普遍的な愛と人望で、多くの人をまとめる包容力がある" },
  { num: 3, reason: "表現力と社交性で、チームの雰囲気を盛り上げる" },
  { num: 6, reason: "愛情と責任感で、家族やチームを守るリーダー" },
  { num: 2, reason: "調和を大切にし、橋渡し役として間接的にリードする" },
  { num: 33, reason: "癒しと奉仕で導くが、先頭に立つより支える役割が得意" },
  { num: 5, reason: "自由を愛するため、組織のトップより自由な立場を好む" },
  { num: 7, reason: "内省・探求を好み、表舞台より裏方・分析役が向いている" },
];

export default function LeadershipRankingArticlePage() {
  const article = getArticleBySlug("leadership-ranking");
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
              数秘術でリーダーシップが強いランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、先頭に立つ力・リーダーシップが強い順にランキングしました。仕事、チーム、プロジェクトなどでリードする場面の参考にしてみてください。
            </p>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              📊 ランキング一覧
            </h2>
            <div className="space-y-4">
              {RANKING.map((item, i) => {
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>決断力・実行力・組織力・人望</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だからリーダーになれないわけではありません。2は調和型、7は分析型など、リーダーシップのスタイルは数字によって異なります。自分の強みを活かしたリーダー像を探してみてください。
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
