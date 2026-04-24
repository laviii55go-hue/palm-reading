import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプでクリエイティブ才能ランキング｜表現・創作に向いているタイプは？",
  description:
    "16タイプ性格診断から、クリエイティブ才能・表現・創作に向いている順にランキング。INFP・ENFP・ENTPなど、表現力が豊かなタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプでクリエイティブ才能ランキング",
    description: "INFP・ENFP・ENTPなど、表現・創作に向いている16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/creative-ranking",
  },
};

const RANKING = [
  { code: "INFP", reason: "感受性豊かで価値観を大切に。創造的な表現や信念に従った創作を喜びとする" },
  { code: "ENFP", reason: "自由で創造的、人を惹きつける魅力。新しい可能性にワクワクし、周囲を巻き込む" },
  { code: "ENTP", reason: "アイデア豊富で議論を楽しむ。常識に疑問を投げかけ、新しい価値を生み出す" },
  { code: "ISFP", reason: "穏やかで美的感覚に優れ、自分のペースで創造的な活動を楽しむ" },
  { code: "INFJ", reason: "理想主義的で深い洞察力。人の本質を見抜き、より良い世界のために表現する" },
  { code: "INTP", reason: "好奇心旺盛で理論を追求。新しいアイデアやパターンに惹かれる" },
  { code: "ENFJ", reason: "人を導き、創造的な表現で人を成長させる" },
  { code: "INTJ", reason: "論理的で戦略的。創造性とパイオニア精神で新しいものを生み出す" },
  { code: "ESFP", reason: "明るく人を楽しませる。その場の空気を読んで表現で盛り上げる" },
  { code: "ESTP", reason: "行動力で新しい体験を創造するが、計画より即興が得意" },
  { code: "ISTP", reason: "物事の仕組みを理解し、手を動かして実用的なものを創造" },
  { code: "ESFJ", reason: "調和を大切に、人を喜ばせる表現が得意" },
  { code: "ISTJ", reason: "堅実に形にするが、創造より計画実行が得意" },
  { code: "ESTJ", reason: "組織で成果を出すが、創造より管理が得意" },
  { code: "ISFJ", reason: "献身的に支えるが、創造よりサポートが得意" },
  { code: "ENTJ", reason: "戦略立案は得意だが、創造より実行・管理が向く" },
];

export default function CreativeRankingArticlePage() {
  const article = getArticleBySlug("creative-ranking");
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
              16タイプでクリエイティブ才能ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、表現・創作に向いている順にランキングしました。アート・音楽・文章・デザインなど、クリエイティブな活動の参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事を書いている私は、個人で文章を書いたり、ちょっとしたモノづくりをしたりするのが好きなタイプです。そういう経験のなかで、<strong>「クリエイティブには実は3種類ある」</strong>と感じるようになりました。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                ランキングの紹介のあとに、その3種類の話や、<strong>ランキング下位のタイプにこそ強い創造性がある</strong>という話を書いています。読み物として楽しんでもらえたら嬉しいです。
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
                        {data?.work && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.work}
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
                このランキングは、各タイプの<strong>創造性・表現力・美的センス・インスピレーション</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだからクリエイティブになれないわけではありません。ESTJは組織設計で、ISTJは堅実な構築で、それぞれの形で創造しています。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🎨 クリエイティブには3種類ある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              ひとくちに「クリエイティブ」と言っても、私は大きく分けて<strong>3つの方向性</strong>があると思っています。ランキング上位のタイプも、それぞれ得意な方向が違います。
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-teal-800">① 感情・世界観を表現するクリエイティブ（INFP・ISFP・INFJ）</p>
                <p>心の奥にある景色を絵や音楽、文章にして差し出す方向。「自分の中にしかない色」で勝負するタイプ。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">② アイデア・発想で切り開くクリエイティブ（ENFP・ENTP・INTP）</p>
                <p>誰も思いつかない組み合わせや切り口を持ってくる方向。既存のものをつなぎ直すことで新しい価値を作るタイプ。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">③ 実装・形にするクリエイティブ（ISTP・INTJ・ISTJ）</p>
                <p>アイデアや世界観を具体物に落とし込む方向。物の構造や仕組みを理解して「動くもの」を作るタイプ。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              本当に強いクリエイティブは、この3つが<strong>バランスよく組み合わさったとき</strong>に生まれることが多いなと感じます。一人で全部やろうとして苦しくなるときは、自分が得意じゃない方向を誰かと補い合うのも立派なクリエイティブのやり方です。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌱 ランキング下位にも確かな創造性がある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっているのは<strong>ESFJ・ISTJ・ESTJ・ISFJ・ENTJ</strong>あたり。一見すると「管理・実行タイプで創造性が低い」と読めるかもしれません。でも、私はそうは思いません。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ESFJやISFJが家族や友人のためにさりげなく作る料理、記念日のプレゼントの選び方、場に合わせた一言——これらは立派な創造性だと思います。「誰かの笑顔を想像して、そこにフィットするものを形にする力」は、アートでも音楽でもない形のクリエイティブです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ISTJやESTJが業務フローや家事の手順を「もっと楽に回るように」と組み替えていくのも創造性の一種。<strong>仕組みを設計するクリエイティブ</strong>とでも言えばいいでしょうか。表に出にくいけれど、日常を支えているのはこういう人たちの見えない創造力だったりします。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ENTJが長期ビジョンを描いて、そこに向けて組織を動かす力も、広い意味ではクリエイティブと呼んでいいはず。「まだ存在していない未来」を頭の中に作り出して、それを現実に変えていく作業だからです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌀 創造性は「出し方」を変えると伸びる
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              私自身、何かを作っているとき「他の人みたいに絵を描くのは得意じゃないな」と思うことがあります。でも文章なら書ける、企画なら立てられる、仕組みなら組める——<strong>出し方を変えるだけで、自分の中の創造性は必ずどこかに出口を見つけてくれる</strong>というのが、色々なものを作ってきて得た実感です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングも、「自分は何位だから創造性がある／ない」と白黒つけるのではなく、<strong>「自分にとって自然に湧いてくる創造の方向はどれか」を知る地図</strong>として使ってもらえたら嬉しいです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              絵が描けなくても、音楽が作れなくても、あなたが今日そこで誰かのために選んだ言葉や、作ったごはんや、組み立てた予定表——それはすべて、あなたのクリエイティブの結晶です。そこに気づけるかどうかで、毎日の手応えはずいぶん変わると思っています。
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
