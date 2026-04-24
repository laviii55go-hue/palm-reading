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
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                数秘術では、「リーダーシップ」にも数字ごとに<strong>まったく違う顔</strong>があります。前に立って引っ張るだけがリーダーではなく、後ろから支える、横に並んで歩く、そんなリーダーシップもあります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングのあとに、<strong>数字ごとのリーダーシップの形</strong>や、<strong>ランキング下位の数字にも確かなリーダーシップがある</strong>という話を書いています。
              </p>
            </div>
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
              👑 数字ごとの「リーダーシップの形」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              リーダーシップは、数字によって発揮される場面も、発揮のされ方も大きく違います。ランキング上位の数字も、それぞれ<strong>リードする領域</strong>がはっきり分かれています。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">8（成功者）</strong>：結果を出すリーダーシップ。「数字で勝つ」組織づくりが得意。</p>
              <p><strong className="text-violet-700">22（建築家）</strong>：構想を具現化するリーダーシップ。長期プロジェクトの司令塔。</p>
              <p><strong className="text-violet-700">1（開拓者）</strong>：ゼロから始めるリーダーシップ。誰もやっていない道を切り開く。</p>
              <p><strong className="text-violet-700">11（直感）</strong>：ビジョンで鼓舞するリーダーシップ。「そっちじゃない」と方向を示す。</p>
              <p><strong className="text-violet-700">4（堅実）</strong>：基盤を作るリーダーシップ。組織の土台をじっくり整える。</p>
              <p><strong className="text-violet-700">9（普遍）</strong>：理念で繋ぐリーダーシップ。「なぜこれをやるのか」を語る。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              同じ「強いリーダー」でも、これだけ違う形があります。<strong>どのタイプのリーダーが自分に向いているか</strong>を知っておけば、組織の中で無理なく力を発揮できます。無理に別の数字のリーダー像に寄せようとすると、本来の強みが薄まってしまうので注意。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 ランキング下位の数字にも「別の形のリーダー」がある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>33（奉仕）・5（自由）・7（探求）</strong>は、「表舞台に立つリーダー」としては向きにくい数字かもしれません。でも、<strong>リーダーという言葉の定義を広げる</strong>と、これらの数字にも独特のリーダーシップが見えてきます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              33の人は、<strong>「人を育てるリーダーシップ」</strong>。先頭に立つのではなく、メンバー一人一人を後ろから照らして伸ばす、教育者のような立ち位置です。直接指示を出さなくても、関わった人が自然に成長していく力があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              5の人は、<strong>「変化を起こすリーダーシップ」</strong>。停滞している組織に新しい風を吹き込み、「このままじゃダメだ」と気づかせる存在です。組織のトップには向かなくても、組織を柔軟にする上では欠かせない存在。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              7の人は、<strong>「知恵で導くリーダーシップ」</strong>。表舞台には立たないけれど、意思決定の裏で鋭い洞察を提供し、組織を賢くする参謀のような役割を担えます。裏方だから価値がないのではなく、裏方だからこそ見える景色があるんです。優れたリーダーの背後には、たいてい7的な参謀が一人は控えていると言われるほどです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 リーダーシップは、時期によっても形を変える
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術のライフパスナンバーは生年月日から決まる固定の数字ですが、<strong>リーダーシップの発揮の仕方は年齢や経験によって変わっていく</strong>ものです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              若い頃は「1」的な開拓者として先頭を走っていた人が、年齢を重ねるうちに「9」的な理念を語る人になったり。ずっとサポート役だった人が、あるタイミングで「22」的な大きな構想を語り始めることもあります。数字は<strong>「得意な走り方の傾向」</strong>を示してくれるだけで、リーダーシップそのものは練習と経験で育っていきます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキング上位だからといって、いきなり完璧なリーダーになれるわけでもありません。<strong>数字はスタート地点、育てていくのは自分自身</strong>——そう考えると、下位の数字の人も、ゆっくり自分のリーダーシップを育てていけると思えてきます。今のポジションがしっくり来ないなら、もしかしたら別の形のリーダーシップを試すタイミングなのかもしれません。自分の数字が示す「自然な領域」から少しずらして、一歩踏み出してみる——そんな使い方も数秘術の味わい深い側面だなと思っています。
            </p>
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
