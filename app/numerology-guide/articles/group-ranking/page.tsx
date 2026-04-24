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
    url: "https://uranai-tenohira.jp/numerology-guide/articles/group-ranking",
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
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                集団で活きる数字と、一人で輝く数字——数秘術では、この違いがわりとはっきり出ます。ただし、<strong>「集団に向いていない」と「集団の役に立たない」はイコールではありません</strong>。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングのあとに、<strong>数字ごとのチームでの役割</strong>や、<strong>ランキング下位の数字（1・5・7）が集団に与える価値</strong>、そして<strong>数秘術と距離感</strong>についても書いています。
              </p>
            </div>
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
              👥 数字ごとの「チームでの役割」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              同じ「チームに貢献する」といっても、数字ごとに<strong>担う役割がはっきり違います</strong>。全員が同じ役割をやろうとするとチームは回らないので、役割の違いを知っておくことはチーム設計の土台になります。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">2（調和）</strong>：メンバー同士の橋渡し役。対立を和らげ、話を聞く。</p>
              <p><strong className="text-violet-700">6（愛）</strong>：メンバーを気遣う世話役。差し入れ、声かけ、ケアを引き受ける。</p>
              <p><strong className="text-violet-700">4（堅実）</strong>：仕組みを整える管理役。ルーティンを決めて回す。</p>
              <p><strong className="text-violet-700">9（普遍）</strong>：チームの理念を掲げる役。「なぜこれをやるのか」を語る。</p>
              <p><strong className="text-violet-700">3（表現）</strong>：場を盛り上げる賑やかし役。空気を軽くする。</p>
              <p><strong className="text-violet-700">22（建築家）</strong>：長期プロジェクトの司令塔。大きな構想を持つ。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              この6種類のうち、どれかひとつでも欠けるとチームは少し回りにくくなります。「自分の役割は何か」を数字から逆算できれば、<strong>チームに入るときの自分の立ち位置が明確になる</strong>——それが数秘術のチーム応用の嬉しいところです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 ランキング下位の数字も「チームに必要な存在」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>1（開拓者）・5（自由人）・7（探求者）</strong>は、「集団行動が苦手」と書かれていて少し傷つくかもしれません。でも、こういう数字の人も、<strong>チームの中で独特の重要な役割</strong>を果たしています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              1の人は、チームが停滞したときに<strong>「じゃあ、やるよ」と最初に動く</strong>存在です。集団の中にいても、自分の判断で一歩踏み出せるから、周りがついていくきっかけを作れる。これは協調性とは違う形の、大切な力です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              5の人は、チームに<strong>変化と刺激</strong>を持ち込む存在。「いつもこうだから」を壊して、新しい視点を入れてくれるから、停滞を防げます。7の人は、<strong>深く考える時間</strong>をチームに持ち込みます。みんなが勢いで動こうとしたとき、「ちょっと待って、これで合ってる？」と立ち止まらせる知恵の役割です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>協調性ランキング下位＝チームで無価値、ではない</strong>——むしろこれらの数字がいないチームは、同調圧力に弱くて柔軟性を失います。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 数秘術と、ちょうどいい距離感
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術のランキングを見て「私はチームに向かない数字なんだ」と受け取ってしまうのは、ちょっともったいない読み方です。数字が教えてくれるのは、<strong>「自然にできること」と「意識して取り組むべきこと」</strong>の区別です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              協調性が自然に出てくる数字の人は、その力を活かせばいい。協調性が出にくい数字の人は、意識的に「今日はチームに合わせよう」と選択できればそれで十分です。毎日完璧にやらなくていいし、数字通りに振る舞わなくてもいい。<strong>自然にできないことを意識的にやれること</strong>が、人の成長の本質だと私は思います。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキングは、あなたを縛る鎖ではありません。自分の自然な立ち位置を知るための地図として、今日一歩でも前に進める材料として受け取ってもらえたら嬉しいです。チームでの役割は、その日ごとに変わっても全然OK。大切なのは「今の自分にできる形」を選ぶことだと思います。
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
