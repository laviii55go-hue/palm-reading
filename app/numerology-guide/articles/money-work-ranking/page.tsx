import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で金運・仕事運ランキング｜お金・キャリアに強い数字は？",
  description:
    "数秘術のライフパスナンバーから、金運・仕事運・キャリアに強い順にランキング。4・8・22など、お金を稼ぎ、キャリアを築く力を持つ数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で金運・仕事運ランキング",
    description: "4・8・22など、お金・キャリアに強いライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/money-work-ranking",
  },
};

const RANKING = [
  { num: 8, reason: "権力・富・成功の数字。ビジネスで成果を出し、金運を引き寄せる力が強い" },
  { num: 22, reason: "壮大なビジョンを現実化するマスタービルダー。大規模プロジェクトで成功" },
  { num: 4, reason: "堅実な建設者。コツコツ積み上げ、安定した収入と信頼を築く" },
  { num: 1, reason: "開拓者。新しい事業を始め、キャリアのパイオニアになれる" },
  { num: 6, reason: "責任感と美的センスで、サービス・福祉・デザイン分野で活躍" },
  { num: 9, reason: "人望と奉仕の精神で、多くの人を巻き込むプロジェクトで成功" },
  { num: 3, reason: "表現力と社交性で、クリエイティブ・広報分野で活躍" },
  { num: 11, reason: "直感とインスピレーションで、革新的なアイデアを形にする" },
  { num: 2, reason: "調和とサポートで、チームの要として活躍" },
  { num: 5, reason: "変化と適応力で、マーケティング・営業などで活躍" },
  { num: 33, reason: "癒しと奉仕で、ヒーリング・教育分野で活躍" },
  { num: 7, reason: "分析・研究で、専門家としての価値を高める" },
];

export default function MoneyWorkRankingArticlePage() {
  const article = getArticleBySlug("money-work-ranking");
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
              数秘術で金運・仕事運ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、お金・キャリアに強い順にランキングしました。仕事選びや副業のヒントとして参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                お金との付き合い方は、数字によって<strong>得意なアプローチが大きく変わります</strong>。「攻める」「守る」「好きで稼ぐ」——方向が違うだけで、どの数字にもちゃんと稼ぎ方があります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングのあとに、<strong>数字ごとのお金のアプローチ</strong>や、<strong>ランキング下位の数字は「小さな経済圏」で輝く</strong>という話を書いています。
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>実行力・組織力・忍耐力・ビジョン</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だから金運が悪いわけではありません。7は専門家として、33は奉仕を通じて価値を生みます。自分の数字に合った活躍の場を見つけることが大切です。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              💰 数字ごとの「お金との付き合い方」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術では、お金との付き合い方にも<strong>数字ごとにはっきりした傾向</strong>があります。自分の数字と合わないマネー論を他人から押し付けられると、ストレスになるだけなので注意したいところです。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">8（成功者）</strong>：ビジネスや投資で攻めていく。リスクを取って大きく増やす。</p>
              <p><strong className="text-violet-700">22（建築家）</strong>：大規模プロジェクトで一気に成果を出す。長期ビジョン型。</p>
              <p><strong className="text-violet-700">4（堅実）</strong>：コツコツ積立・長期貯蓄。安定した信頼でお金を貯める。</p>
              <p><strong className="text-violet-700">1（開拓者）</strong>：新規事業・起業・副業で新しい収入源を作る。</p>
              <p><strong className="text-violet-700">6（愛）</strong>：人の役に立つ仕事からの報酬。福祉・サービス分野。</p>
              <p><strong className="text-violet-700">3（表現者）</strong>：創造性や発信力を直接的にマネタイズする。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              「攻めるべきか、守るべきか」という話は、実は<strong>自分の数字次第で答えが違う</strong>。世の中の「今どきは投資しないとダメ」「貯金が一番安全」みたいな話も、全員に当てはまるわけではないんです。自分の数字が示すアプローチを軸にすれば、お金との付き合いは驚くほど楽になります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 下位の数字は「小さな経済圏」で輝く
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>5（自由）・33（マスターティーチャー）・7（探求者）</strong>は、「組織で効率的に稼ぐ」という意味では向きにくい数字かもしれません。でも、<strong>「自分の世界で稼ぐ」</strong>に視点を切り替えると、強力な力を発揮します。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              5の人は、<strong>複数の小さな収入源を軽やかに動かす</strong>のが得意です。副業・フリーランス・複業——柔軟性がそのまま稼ぎに変わります。組織に縛られない働き方が性に合っているので、無理に一か所に留まる必要はありません。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              33の人は、<strong>癒し・教育・奉仕の分野で独自のファンを作る</strong>のが得意。カウンセリング、講師業、コミュニティ運営など、数字ではなく心で繋がる経済圏では強い。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              7の人は、<strong>専門性を深く掘って、分かる人に高く買ってもらう</strong>のが得意です。研究者、コンサルタント、職人——少数精鋭の世界で、他の追随を許さない価値を作れます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>ランキングが低い＝稼げない、ではない。</strong>自分の数字にフィットした「小さな経済圏」を育てれば、どの数字にもちゃんと豊かさが流れ込んできます。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 数字と環境の「噛み合わせ」を見る
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              金運・仕事運を考えるとき、私は<strong>「数字」だけでなく「環境」との噛み合わせ</strong>がすごく大事だと感じています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              8の数字の人が大企業の経営陣にいれば上位ランキングの威力を発揮できますが、クリエイティブなスタートアップでは3や11の方が光るかもしれません。4の数字の人が事務職で盤石な信頼を築ける一方、変化の激しい業界では5や1の方が適応できます。<strong>同じ数字でも、どの環境にいるかで金運・仕事運は大きく変わる</strong>んです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキング下位だったとしても、<strong>「自分の数字が活きる環境を選び直す」</strong>という発想で、いつでもリセットできます。転職・副業・独立・引っ越し——環境を変える選択肢は、実はたくさんあります。数秘術は、<strong>「自分に合う環境を選ぶための地図」</strong>として使ってもらえたら、もっと楽に生きられる人が増えるんじゃないかと思います。今のあなたが仕事で苦しいなら、数字のせいではなく、環境との噛み合わせが今たまたまズレているだけかもしれません。自分を責める前に、まず環境のせいだと仮置きしてみる——それだけで、動ける一歩が見えてくることがあります。
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
