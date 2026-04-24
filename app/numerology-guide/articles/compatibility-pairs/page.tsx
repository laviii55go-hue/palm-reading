import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA, getCompatibility } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術の相性の組み合わせ解説｜1と2・3と7など代表的な数字の相性",
  description:
    "数秘術のライフパスナンバー同士の相性を解説。「1と2の相性」「3と7の相性」など、代表的な組み合わせを恋愛・仕事・友情の観点から記事形式で紹介します。",
  openGraph: {
    title: "数秘術の相性の組み合わせ解説",
    description: "「1と2の相性」「3と7の相性」など、代表的な数字の組み合わせを数秘術の観点から記事形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/compatibility-pairs",
  },
};

// 解説する相性の組み合わせ（小→大の順）
const PAIRS: [number, number][] = [
  [1, 2],
  [1, 3],
  [1, 5],
  [2, 4],
  [2, 5],
  [2, 6],
  [3, 4],
  [3, 5],
  [3, 7],
  [4, 6],
  [6, 9],
];

function ScoreStars({ score }: { score: number }) {
  const full = "★";
  const empty = "☆";
  return (
    <span className="text-amber-500 text-sm">
      {full.repeat(score)}
      {empty.repeat(5 - score)}
    </span>
  );
}

export default function CompatibilityPairsArticlePage() {
  const article = getArticleBySlug("compatibility-pairs");
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
              数秘術の相性の組み合わせ解説
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              「1と2の相性」「3と7の相性」など、代表的なライフパスナンバーの組み合わせを、恋愛・仕事・友情の観点から解説します。相性スコアは★5段階で表示しています。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                数秘術の相性は、16タイプの性格診断とは違って<strong>生年月日から自動的に決まる数字</strong>がベースになっています。つまり、「その人がどんなつもりで生きてきたか」ではなく、<strong>その人の持って生まれた性質</strong>で相性が読み解かれるのが特徴です。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、11組の代表的な相性ペアを紹介したあと、<strong>数字それぞれの性質から見る相性の読み方</strong>や、<strong>相性が低いペアほど実は成長できる</strong>という話、そして<strong>家族・友人・恋人で読み方を変えるコツ</strong>を書いています。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-8">
            {PAIRS.map(([a, b]) => {
              const comp = getCompatibility(a, b);
              const dataA = NUMEROLOGY_DATA[a];
              const dataB = NUMEROLOGY_DATA[b];
              return (
                <div
                  key={`${a}-${b}`}
                  className="rounded-2xl border-2 border-violet-200 bg-white p-5 space-y-4"
                >
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-violet-900">
                      【{a}】と【{b}】の相性
                    </h2>
                    <ScoreStars score={comp.score} />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-violet-600">
                    <span>{dataA?.emoji ?? "🔢"} {dataA?.title ?? ""}</span>
                    <span>×</span>
                    <span>{dataB?.emoji ?? "🔢"} {dataB?.title ?? ""}</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {comp.general}
                  </p>
                  <div className="grid gap-3 text-sm">
                    <div>
                      <span className="font-bold text-violet-600">💕 恋愛：</span>
                      <span className="text-gray-700">{comp.love}</span>
                    </div>
                    <div>
                      <span className="font-bold text-violet-600">💼 仕事：</span>
                      <span className="text-gray-700">{comp.work}</span>
                    </div>
                    <div>
                      <span className="font-bold text-violet-600">🤝 友情：</span>
                      <span className="text-gray-700">{comp.friendship}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              💡 相性の見方
            </h2>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                相性スコアは★5段階で、5が最高・1が最低です。ただし低いからといって相性が悪いわけではありません。違いが多い組み合わせほど、お互いを補い合い、成長できる可能性があります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                マスターナンバー（11・22・33）の方は、11→2、22→4、33→6に換算した相性を参照してください。例えば11の方は「2」の相性を、22の方は「4」の相性をご覧ください。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🧮 数字の「性質」から相性を読み解く
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術では、1〜9の数字それぞれに<strong>古代から託されてきた性質</strong>があります。相性がなぜそう出るのかは、その性質同士の<strong>重なり方</strong>を見るとわかってきます。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">1（開拓）×2（調和）</strong>：前に進みたい人と、そっと支えたい人。動きと静けさが補い合う組み合わせ。</p>
              <p><strong className="text-violet-700">3（表現）×7（探求）</strong>：明るく外に出す人と、深く内に潜る人。見た目は正反対だけど、尊敬し合える関係になりやすい。</p>
              <p><strong className="text-violet-700">6（愛）×9（博愛）</strong>：身近な人を守る愛と、広い世界への愛。ベクトルは近いけど届ける範囲が違う。</p>
              <p><strong className="text-violet-700">4（安定）×6（愛）</strong>：堅実に積み重ねる人と、温かく包み込む人。家庭をつくる相性としてとても強い。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              こういう<strong>「数字の性質がどう重なるか」</strong>を意識すると、相性スコアの裏にある物語が見えてきます。単に数字を足し算しているのではなく、<strong>古代から積み重なってきた意味のレイヤー</strong>が下敷きになっているんです。記事の冒頭の相性ペアも、このレイヤーを踏まえて読み返してみると、解説文のニュアンスがぐっと身近になるはずです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 相性が低いペアほど、実は「成長ペア」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              相性スコアが★2や★3だったとき、落ち込む必要はまったくありません。むしろ、<strong>違いが大きいペアほど、お互いから学べることが多い</strong>というのが数秘術の大事な考え方です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえば<strong>1（開拓者）と 4（安定）</strong>は、前に進みたい人と慎重に積み重ねたい人で、最初はぶつかりやすい組み合わせです。でも、お互いを認め合えるようになると、1は4から「じっくり考える力」をもらい、4は1から「一歩踏み出す勇気」をもらう。<strong>★が低いペアは、相性が悪いのではなく、お互いを成長させるために一緒にいるペア</strong>だと読み解けます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              私自身、身近な人と診断してみて「え、この人とこんなに違うんだ」と驚いた経験が何度もあります。でもそれは「離れなさい」というサインではなく、<strong>「相手の違う部分を受け入れるステップにいる」</strong>というサインだと受け取るようにしています。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 恋人・家族・友人で、読み方を変えるコツ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              相性スコアは同じ数字同士なら同じ結果が出ますが、<strong>関係性によって「使い方」を変える</strong>と、読み解きの精度が上がります。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">💕 恋人・夫婦</strong>：毎日顔を合わせるので「違い」が摩擦になりやすい。★が低くても、違いをゲーム感覚で楽しめる関係を目指す。</p>
              <p><strong className="text-violet-700">👪 家族</strong>：選べない関係だからこそ、★が高い家族メンバーをとくに大事に。低いメンバーとは「距離の取り方」を工夫する余地。</p>
              <p><strong className="text-violet-700">🤝 友人</strong>：会う頻度を自分で選べる。★が低くても、会うたびに気づきをくれる刺激的な友人として付き合える。</p>
              <p><strong className="text-violet-700">💼 仕事</strong>：一緒にいる時間が限られる分、★が低くてもプロとして役割分担すれば問題にならない。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術の相性は、<strong>「離れるべきかどうか」を決めるジャッジ</strong>ではなく、<strong>「どう付き合うかの設計図」</strong>として読むのが、私の中で一番健康的な使い方です。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🎭 同じ数字同士は「鏡の関係」になる
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              1と1、3と3、5と5のように<strong>同じ数字同士</strong>の組み合わせは、この記事では取り上げていませんが、数秘術では独特の読み方があります。一般的には「似た者同士だから楽」と言われがちですが、実際には<strong>鏡を見せ合う関係</strong>になるので、いい部分も悪い部分も増幅されます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              同じ数字の相手といると、自分の強みも弱みも<strong>そっくりそのまま相手に映し出されて戻ってくる</strong>感覚になります。居心地が良い反面、似ているからこそ見えてしまう弱点に気づいて、距離を置きたくなるタイミングも訪れやすい。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              同じ数字同士のペアは、<strong>「相手を通して自分を見る」体験を一番濃く味わえる関係</strong>です。自分を育てたいと思っている時期には、この鏡のような関係が最高の学びの場になります。逆に、自分を守りたい時期には、違う数字の相手と過ごす方が消耗しにくいかもしれません。診断結果を見たときは、自分が今どちらの時期にいるかも合わせて考えてみると、より納得のいく読み方ができると思います。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🔢 あなたと相手の相性を調べる
            </h2>
            <p className="text-gray-600 text-sm">
              生年月日からライフパスナンバーを計算し、恋人・友人・家族との相性を診断できます。
            </p>
            <Link
              href="/lucky-number"
              className="block w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-center shadow-md hover:bg-violet-700 transition-colors"
            >
              🔢 数秘術占いで相性診断する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
