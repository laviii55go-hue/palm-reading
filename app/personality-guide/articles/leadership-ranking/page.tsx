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
    url: "https://uranai-tenohira.jp/personality-guide/articles/leadership-ranking",
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
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事では、ランキングを紹介したうえで、私がこれまで色々なチームや場で見てきた<strong>「4種類のリーダー像」</strong>や、<strong>「リーダー向きじゃない」と諦めている人にこそ読んでほしい話</strong>を書いています。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                ランキングは一つの見方にすぎません。下位タイプでも「そのタイプにしか担えないリーダーシップ」があるので、ぜひ最後まで読んでもらえたら嬉しいです。
              </p>
            </div>
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
              👑 「リーダー」には4種類いる、という話
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              これまで色々なチームや集まりに関わってきて、「リーダー」と呼べる人にも<strong>大きく分けて4種類</strong>いると感じるようになりました。ランキング上位の人たちは、実はそれぞれ違う種類のリーダーだったりします。
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-teal-800">① ビジョン型リーダー（ENTJ・INTJ）</p>
                <p>目標を描いて「あっちに行くぞ」と旗を立てる人。3年先、5年先を見据えて動く。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">② 組織型リーダー（ESTJ・ISTJ）</p>
                <p>ルールと手順を整えて、チームが迷わず動ける仕組みを作る人。現場の安心感を作る。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">③ 共感型リーダー（ENFJ・ESFJ）</p>
                <p>メンバーの気持ちを汲み取って、一人一人が動きやすくなる環境を整える人。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">④ ひらめき型リーダー（ENTP・ENFP）</p>
                <p>新しい切り口を次々に持ち込んで、チームの可能性を広げる人。停滞を打破する役。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              どれが正解ということはなく、<strong>チームが置かれたフェーズと目的に応じて、必要なリーダー像は変わる</strong>んですよね。立ち上げ期はビジョン型、運営期は組織型、停滞期はひらめき型、疲弊期は共感型——というふうに。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌱 「リーダー向きじゃない」と諦めている人へ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキング下位になっている<strong>ISFP・INFP・ESFP</strong>あたりのタイプの方は、「やっぱり自分はリーダーには向かないんだ」と受け取ってしまうかもしれません。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              でも、私はこう思います。このランキングで測られている「リーダーシップ」は、<strong>「組織を正面から動かす力」という特定の定義に絞った場合のランキング</strong>でしかありません。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえば、ISFPの美的感覚に惹きつけられて人が集まってくる「カリスマ型」のリーダーもいれば、INFPの価値観の強さが周囲を動かす「信念型」のリーダーもいます。ESFPの場を盛り上げる力は、疲弊したチームを生き返らせる「空気のリーダー」としてかけがえのない存在です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>リーダーとは、前に立つ人ではなく、人が自然についていきたくなる人</strong>——そう考えると、ランキング下位のタイプにも、それぞれの形のリーダーシップが確かにあります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌀 リーダーシップも、時期によって揺らぐ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              占いや診断全般に対する私の考え方にも通じる話ですが、<strong>リーダーシップの発揮のしかたは、人生のフェーズや状況によって揺らぐもの</strong>だと思っています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              若い頃は前に立ってグイグイ引っ張るスタイルが得意だった人が、年齢を重ねるうちに後ろからそっと支える共感型に変わっていく。逆に、ずっとサポート役だった人が、あるタイミングで急にビジョンを語り始める——そういう変化は珍しくありません。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              だから16タイプの結果も、「私は◯◯タイプだからリーダーになれない」と決めつけるのではなく、<strong>「今の自分に合うリーダーシップの出し方はこれかもしれない」というヒント</strong>として使うのがいちばん健康的だと思います。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキングを見て落ち込んだ日も、「今日は運勢が悪かっただけ、明日また別の自分で頑張ろう」くらいの距離感で付き合ってもらえたら嬉しいです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              私自身、なにか新しいことを始めるたびに「自分のリーダーシップの出し方ってこれでいいのかな」と悩む瞬間があります。そんな時にこの診断を開いて、「ああ、自分は前に立つより、アイデアで支えるほうが向いてるんだよな」と再確認する——そういう使い方をしています。診断は答えを押し付けるものではなく、<strong>迷ったときに立ち戻る自分の地図</strong>。そういう存在として付き合ってもらえるのが一番だなと思っています。
            </p>
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
