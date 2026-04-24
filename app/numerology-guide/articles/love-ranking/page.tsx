import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で恋愛運が良いランキング｜恋愛・パートナーシップ向きの数字は？",
  description:
    "数秘術のライフパスナンバーから、恋愛運・パートナーシップに向いている順にランキング。2・6・9など、恋愛に恵まれる数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で恋愛運が良いランキング",
    description: "2・6・9など、恋愛・パートナーシップ向きのライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/love-ranking",
  },
};

const RANKING = [
  { num: 6, reason: "愛の守護者。深い愛情と責任感で、理想的な恋人・パートナーになれる" },
  { num: 2, reason: "調和の人。献身的で思いやり深く、相手の気持ちを大切にする" },
  { num: 9, reason: "普遍的な愛と包容力で、深く愛し、長続きする関係を築く" },
  { num: 33, reason: "無条件の愛と癒しの力で、パートナーを温かく包み込む" },
  { num: 3, reason: "明るく楽しい恋愛を楽しむ。表現力で相手を喜ばせる" },
  { num: 11, reason: "直感とロマンチックな感性で、特別な恋愛を引き寄せる" },
  { num: 4, reason: "誠実で安定した恋愛。じっくり信頼関係を築く" },
  { num: 1, reason: "情熱的だが束縛を嫌う。対等なパートナーシップを求める" },
  { num: 8, reason: "強烈に惹かれ合うが、主導権争いになりやすい" },
  { num: 5, reason: "自由で刺激的な恋愛を好むが、飽きやすい面も" },
  { num: 22, reason: "ビジョン重視で、恋愛より仕事・目標に注力しがち" },
  { num: 7, reason: "内面重視で、恋愛に慎重。深い理解を求める" },
];

export default function LoveRankingArticlePage() {
  const article = getArticleBySlug("love-ranking");
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
              数秘術で恋愛運が良いランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、恋愛・パートナーシップに向いている順にランキングしました。恋愛の傾向や相性のヒントとして参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                数秘術の恋愛運は、MBTIのように「質問に答えて出る結果」ではなく、<strong>生年月日から自動的に決まる数字の性質</strong>で読み解かれます。だからこそ、「私は◯番タイプだから」と納得したり、「相手と数字が違うから相性が悪い」と落ち込んでしまいやすい占いでもあります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングのあとに、<strong>数字ごとの恋愛パターン</strong>や、<strong>ランキング下位の数字ほど独特な恋愛の美しさがある</strong>という話、そして<strong>数秘術との健康的な付き合い方</strong>を書いています。
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>愛情表現・献身性・パートナーシップ適性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だから恋愛運が悪いわけではありません。7は深い理解を、5は刺激的な恋愛を求めるなど、それぞれの恋愛スタイルがあります。相性を確認するには、相手のライフパスナンバーを調べてみましょう。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              💘 数字ごとの「恋愛パターン」を読み解く
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術の面白さは、<strong>1〜9の数字それぞれに恋愛パターンが違う</strong>ことを教えてくれる点です。ランキング順位に関わらず、数字ごとの恋愛の美しさを知っておくと、自分や相手を責めずに済みます。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">6（愛の守護者）</strong>：相手を守り育てる愛。家庭的な安心感をくれるタイプ。</p>
              <p><strong className="text-violet-700">2（調和）</strong>：そっと寄り添う愛。「あなたが幸せならそれでいい」という献身。</p>
              <p><strong className="text-violet-700">9（博愛）</strong>：大きく包み込む愛。個人を超えた深さで相手を受け入れる。</p>
              <p><strong className="text-violet-700">1（開拓者）</strong>：対等であろうとする愛。束縛は嫌うが、誠実さは強い。</p>
              <p><strong className="text-violet-700">7（探求者）</strong>：深く理解し合う愛。言葉より沈黙で通じ合うことを重視。</p>
              <p><strong className="text-violet-700">5（自由人）</strong>：刺激と変化を共有する愛。一緒に新しい景色を見る恋を求める。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>どの愛も美しい</strong>——これが数秘術から受け取れる一番のメッセージだと私は思います。ランキングはあくまで「パートナーシップに向きやすさ」という一つの切り口で並べただけ。7や5のように下位に出てくる数字も、「他の数字とは違う種類の愛を持っている」だけなんです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 ランキング下位の数字には独特の美しさがある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングの下位にある<strong>7（探求者）・22（ビジョン）・5（自由人）</strong>は、「恋愛に向かない数字」というレッテルを貼られやすいですが、実はそれぞれに<strong>独特の恋愛の美しさ</strong>があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              7の人が選ぶパートナーとの関係は、<strong>量より質、言葉より沈黙</strong>。静かに一緒にいるだけで満たされる、そんな関係性を作れる数少ない数字です。頻繁に会ったり、頻繁に連絡を取ったりしなくても、ちゃんと繋がっていられる。それは他の数字にはなかなか真似できない深さです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              22や5の数字の人は、<strong>人生の主軸に「恋愛以外の大きなもの」を持っている</strong>タイプ。夢・ビジョン・旅・学び——こういう主軸に惹かれて寄ってくる相手との恋愛は、普通の恋愛とはちょっと違う、一緒に何かを追いかける同志のような関係になります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>「恋愛運が低い」ではなく「恋愛の形が違う」</strong>と読み替えるだけで、数秘術のランキングはずっと優しいものになります。下位の数字の人はぜひ、自分の恋愛の形に誇りを持ってもらえたら嬉しいです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 数秘術と、ちょうどいい距離感
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術は生年月日という変えられない情報から数字が出るので、MBTIのような診断と違って<strong>結果を「納得」するしかない</strong>という側面があります。だからこそ、落ち込みやすい占いでもあります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              私は数秘術の結果を、「絶対こうなる」という運命論ではなく、<strong>「自分の出発点を知るための足元のマップ」</strong>として扱うようにしています。数字はあなたの「性質の傾向」を教えてくれますが、人生の選択はあなた自身が積み上げていくもの。どんな数字でも、行動次第で自分の物語は塗り替えられます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              恋愛運ランキング上位だから幸せになれるわけでも、下位だから恋愛に失敗するわけでもありません。<strong>数字はヒント、行動はあなた自身の選択</strong>——この距離感が、占いと上手に付き合うコツだと思っています。ランキングを読んで気持ちが上向いたらそれで十分、そう受け取ってもらえたら嬉しいです。
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

