import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術でクリエイティブ才能ランキング｜表現・創作に向いている数字は？",
  description:
    "数秘術のライフパスナンバーから、クリエイティブ才能・表現・創作に向いている順にランキング。3・9・11など、表現力が豊かな数字の特徴を解説します。",
  openGraph: {
    title: "数秘術でクリエイティブ才能ランキング",
    description: "3・9・11など、表現・創作に向いているライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/creative-ranking",
  },
};

const RANKING = [
  { num: 3, reason: "表現者。創造性・表現力・社交性で、アート・音楽・言葉で自分を表現する" },
  { num: 9, reason: "普遍的な愛と芸術性。広い視野で深い表現を生み出す" },
  { num: 11, reason: "直感とインスピレーション。革新的なアイデアとビジョンを形にする" },
  { num: 6, reason: "美的センスと愛情。デザイン・料理・環境づくりで美を創造" },
  { num: 5, reason: "自由と多才さ。変化と冒険を通じて新しい表現を生み出す" },
  { num: 1, reason: "開拓者。創造性とパイオニア精神で、新しいものを生み出す" },
  { num: 33, reason: "癒しと奉仕。芸術を通じて人を癒す表現" },
  { num: 7, reason: "内省と探求。深い分析と独自の視点で表現" },
  { num: 2, reason: "調和と感受性。繊細な感性で表現する" },
  { num: 4, reason: "堅実な建設者。計画性を持って形にする" },
  { num: 8, reason: "実行力は強いが、創造よりビジネス・管理が向く" },
  { num: 22, reason: "ビジョン重視。大規模なプロジェクトの設計が向く" },
];

export default function CreativeRankingArticlePage() {
  const article = getArticleBySlug("creative-ranking");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="numerology">
      <ColumnNavPills variant="numerology" />
        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-violet-600 text-xs font-bold uppercase tracking-wider">
                数秘術コラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-violet-900 leading-tight">
              数秘術でクリエイティブ才能ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、表現・創作に向いている順にランキングしました。アート・音楽・文章・デザインなど、クリエイティブな活動の参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                数秘術の創造性は、<strong>数字それぞれの「表現の方向性」</strong>で形が変わります。生まれた数字によって「自分にとって自然に出てくる表現」が違うので、他人の才能と比べるよりも、自分の方向を知ることが先決です。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングを紹介したあと、<strong>数字ごとのクリエイティブの形</strong>や、<strong>ランキング下位の数字ならではの創造力</strong>についても書いています。
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
                    ? "bg-amber-100 border-amber-300 text-amber-900"
                    : rank <= 3
                    ? "bg-amber-50 border-amber-200 text-amber-800"
                    : "bg-white border-violet-200 text-gray-800";
                return (
                  <div
                    key={item.num}
                    className={`rounded-2xl border-2 p-4 ${rankStyle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center font-black text-violet-700 shrink-0">
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
            <div className="rounded-2xl bg-white border border-violet-200 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                このランキングは、数秘術における各ライフパスナンバーの<strong>創造性・表現力・美的センス・インスピレーション</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だからクリエイティブになれないわけではありません。4は堅実な設計で、22は壮大なビジョンで、それぞれの形で創造しています。自分の表現スタイルを見つけましょう。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🎨 数字ごとの「クリエイティブの形」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術では、ライフパスナンバーによって<strong>表現の得意分野</strong>がはっきりと分かれます。「自分には創造性がない」と感じる人も、実は別の数字が持つ形を参考にしているだけで、自分の形に気づいていないことが多いです。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">3（表現者）</strong>：言葉・歌・SNS・プレゼン。「外に出す」ことで磨かれる創造性。</p>
              <p><strong className="text-violet-700">9（普遍）</strong>：物語・映画・絵本。大きなテーマを深く描く創造性。</p>
              <p><strong className="text-violet-700">11（直感）</strong>：インスピレーション・ビジョン。説明しきれないものを掴む創造性。</p>
              <p><strong className="text-violet-700">6（愛）</strong>：料理・インテリア・ギフト。「誰かを想う」ことから生まれる創造性。</p>
              <p><strong className="text-violet-700">5（自由）</strong>：旅・イベント・コラボ。動きの中から次の一手が生まれる創造性。</p>
              <p><strong className="text-violet-700">7（探求）</strong>：研究・分析・哲学。孤独な思考の果てに立ち上がる創造性。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              「創造性」というたった一つの言葉の裏に、これだけ違う顔があるんですよね。<strong>自分にフィットする形を見つけられれば、表現はぐっと楽になる</strong>——それが数秘術から受け取れる大きなヒントです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 ランキング下位の数字にも「独自の創造力」がある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>8（実行力）・22（ビジョン）・4（堅実）</strong>は、「アートや音楽を作る」という意味では派手に見えにくいかもしれません。でも、<strong>「創造する」という行為の幅を広げて見る</strong>と、これらの数字にも確かな創造力があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              8の人が生み出すのは<strong>「ビジネスモデルという作品」</strong>。誰かの生活を変える仕組みを作ることは、絵を描くのとはまた違う形の創造です。22の人が描くのは<strong>「未来という設計図」</strong>。存在しない世界を構想し、それを現実にする行為は最大級の創造力と言えます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              4の人が作り上げるのは<strong>「仕組みという作品」</strong>。日々を滑らかに回す手順を地道に組み立てる力も、れっきとした創造の一形態です。ランキング下位だからと諦めるのではなく、<strong>自分の数字に合った創造のジャンルを探してみる</strong>——そこに発見があります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 数秘術との、ちょうどいい距離感
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術は生まれた日から決まる数字なので、結果を読むと「自分にはこれしかできないのかな」と窮屈に感じる人もいるかもしれません。でも私は、数字は<strong>「自然に湧いてくる方向を教えてくれる地図」</strong>であって、「他の方向を禁止する鎖」ではないと思っています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              創造性は、数字とは違うベクトルで後から身につけることもできます。大事なのは、<strong>「まず自分の数字に素直に出してみる」</strong>こと。無理に下位の数字が得意な分野に挑むより、自分の数字の得意ゾーンで一度手応えを掴んだほうが、創造性は確実に育ちます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキングを見て嬉しい気持ちも、落ち込む気持ちも、どちらも大切な感情です。それをきっかけに、今日ひとつ何かを作ってみる——それだけで、数秘術はとても優しい存在になってくれるはずです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そしてもうひとつ、覚えておいてほしいのが<strong>「創造性は出し続けることで育つ」</strong>というシンプルな事実です。数字が何であれ、手を止めた瞬間に創造性は錆びつきます。逆に、下位の数字の人でも、毎日少しずつ何かを作り続ければ、自分の数字に合った表現の筋道が見えてきます。数秘術の結果は入り口にすぎず、続けるかどうかはいつだって自分次第。その意味で、占いは「始めるきっかけ」として最高のツールだなと私は思っています。
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
              className="block w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-center shadow-md hover:bg-violet-700 transition-colors"
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
