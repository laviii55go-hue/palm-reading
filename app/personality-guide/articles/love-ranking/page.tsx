import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで恋愛運が良いランキング｜恋愛・パートナーシップ向きのタイプは？",
  description:
    "16タイプ性格診断から、恋愛運・パートナーシップに向いている順にランキング。ENFP・ESFJ・INFPなど、恋愛に恵まれるタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで恋愛運が良いランキング",
    description: "ENFP・ESFJ・INFPなど、恋愛・パートナーシップ向きの16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/love-ranking",
  },
};

const RANKING = [
  { code: "ENFP", reason: "刺激的で楽しい関係を好み、一緒に冒険できる相手と相性が良い" },
  { code: "ESFJ", reason: "家族や友人との絆を大切にし、パートナーを支えて一緒に楽しい時間を過ごす" },
  { code: "INFP", reason: "心の通じ合いを重視し、相手を理解し理解される関係を求める" },
  { code: "ENFJ", reason: "深い絆と成長を共有できる関係を求め、パートナーを支えて一緒に成長する" },
  { code: "ISFJ", reason: "相手を支え守る関係を好み、感謝されることで満足感を得る" },
  { code: "INFJ", reason: "深い精神的なつながりを求め、理解し合える相手と一生のパートナー関係を築く" },
  { code: "ESFP", reason: "楽しく刺激的な関係を好み、一緒に遊び笑い合える相手が理想" },
  { code: "ESTP", reason: "刺激的で楽しい関係を好み、一緒にアクティブに過ごせる相手と相性が良い" },
  { code: "ISFP", reason: "穏やかで温かい関係を好み、相手を尊重し尊重される関係を求める" },
  { code: "ISTJ", reason: "安定した関係を大切にし、約束を守り誠実にパートナーに向き合う" },
  { code: "ESTJ", reason: "安定した家庭を築くことを重視し、パートナーと協力して目標を達成する" },
  { code: "ENTP", reason: "刺激的で飽きのこない関係を好むが、議論好きで感情的配慮が不足しがち" },
  { code: "INTJ", reason: "深い絆を大切にするが、本音を共有できる相手を見つけるまで時間がかかる" },
  { code: "INTP", reason: "知的に刺激し合える相手を求めるが、感情表現が苦手な面も" },
  { code: "ISTP", reason: "干渉されない自由な関係を好むが、感情表現が苦手" },
  { code: "ENTJ", reason: "対等なパートナーシップを好むが、感情的配慮が不足しがち" },
];

export default function LoveRankingArticlePage() {
  const article = getArticleBySlug("love-ranking");
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
              16タイプで恋愛運が良いランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、恋愛・パートナーシップに向いている順にランキングしました。恋愛の傾向や相性のヒントとして参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                ちなみに、この記事を書いている私は<strong>診断するたびに結果がちょっと揺らぐタイプ</strong>で、上位ランキングを見て「え、私そんなに恋愛向きの顔してたっけ？」と驚いたのが出発点でした。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                ランキングのあとに、<strong>趣味のチーム活動で16タイプ診断が流行った話</strong>や、「これは占いより統計学に近いな」と感じた理由、そして<strong>占いに不信感があるあなたに</strong>16タイプ診断をおすすめしたい理由も書きました。読み物として楽しんでもらえたら嬉しいです。
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
                        {data?.love && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.love}
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
                このランキングは、各タイプの<strong>愛情表現・献身性・パートナーシップ適性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから恋愛運が悪いわけではありません。ENTJは対等な関係を、ISTPは自由な関係を求めるなど、それぞれの恋愛スタイルがあります。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌀 チーム活動で起きた16タイプブームの話
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              ちょっと脱線した話をひとつ。以前、趣味で参加しているチーム活動の場で、一時期この16タイプ診断が静かに流行ったことがありました。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              きっかけは待ち時間の雑談。誰かがスマホで診断サイトを開いて「私INFJだった」と言い出したら、連鎖的に「えっ、やってみる」「私もやる」が広がって、その日はすっかり結果を見せ合う時間になっていました。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そうすると、「あ〜、だからあの人の声かけはあのタイミングなんだ」「自分と真逆のタイプじゃん、あの時のすれ違いってそういうことだったのかも」みたいな<strong>納得が一気に起こる</strong>んです。その後のやり取りにも少し影響があって、「この人は静かに考えてから動くタイプだから、急かさずに待とう」と自然に意識するようになりました。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              恋愛ランキングで言えば、「1位のENFPタイプの人は確かに雰囲気を明るくしてくれるし、16位のENTJタイプの人は全体を引っ張る力を持っている」——どちらも必要で、どちらが上ということでもない。<strong>ランキングはあくまで「恋愛という切り口」で並べただけ</strong>で、ほかの切り口なら全然違う順番になるんだなと実感した出来事でした。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🔢 「16タイプ診断」は占いより統計学に近い
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              占いや診断をいろいろ触ってきた中で、私はこの16タイプ診断を<strong>占いというより統計学に近いもの</strong>だと感じています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              仕組みをざっくり言うと、「外向／内向」「感覚／直観」「思考／感情」「判断／知覚」という4つの軸それぞれ2択で、2の4乗＝16パターンに分類する——というシンプルな分類アルゴリズムです。
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed">
              <p className="font-semibold text-gray-800 mb-2">4つの軸（全部2択）</p>
              <ul className="space-y-1">
                <li>・E（外向）↔ I（内向）</li>
                <li>・S（感覚）↔ N（直観）</li>
                <li>・T（思考）↔ F（感情）</li>
                <li>・J（判断）↔ P（知覚）</li>
              </ul>
              <p className="mt-2 text-xs text-gray-500">→ 2 × 2 × 2 × 2 = 16タイプ</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              ここに<strong>世界中で蓄積された何十万人、何百万人という回答データ</strong>が積み重なって、「このパターンの人はこういう恋愛傾向が出やすい」「この組み合わせは噛み合いやすい」という傾向が統計的に浮かび上がってきます。血液型4分類よりも細かく、十二星座より仕組みがはっきりしている。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              だから私は、16タイプ診断は「当たる／当たらない」で語るものではなく、<strong>自分を大きなデータの中に位置づけて眺めてみる地図</strong>のようなものだと思っています。ランキング1位という結果は、「あなたは恋愛が得意な人間です」という予言ではなく、「そのタイプの傾向として、恋愛に前向きに向かえる要素が多い」という統計的な傾向の話、という理解です。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🎯 「占いは信じない」人にこそ診断をおすすめしたい
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              私の身近にも、占いにまったく興味がない人がいます。「あなたのMBTIは？」と聞いても「知らない、やってない」で終わり。そういう反応は決して珍しくないと思います。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そういう<strong>占いに不信感がある方</strong>にこそ、16タイプは入り口として向いていると思うんです。だって、これは厳密には占いではなく<strong>「診断」</strong>だから。カードをめくるわけでも星を読むわけでもなく、質問に答えるだけで、自分の思考パターンや行動傾向の見取り図ができあがります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そして<strong>自分のタイプを知ると、生きるのが少しラクになる</strong>場面があります。たとえばINFPの人が「私、人との雑談でどっと疲れるのは性格の欠陥じゃなくて、単に内向的だからだ」と気づけたら、その後の飲み会の向き合い方は変わります。ENTJの人が「自分は対等なパートナーシップを求めるタイプだから、ベタベタな関係を求める相手とは価値観が合わないんだ」と気づけたら、無理に相手に合わせてストレスを溜めなくて済みます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              恋愛運ランキングも、<strong>自分の強みを活かせる恋愛スタイルはどこか</strong>を探すための地図として使ってもらえたら嬉しいです。順位が低いタイプだったとしても、それは「恋愛に不利」ではなく、「あなたの求める関係性が王道ルートとは違うだけ」というサインだと受け取ってください。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌱 占いとの、ちょうどいい距離感
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              最後に、私自身が占いと付き合ってきたなかで見つけた「距離感」の話を少しだけ。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              私は、占いは<strong>あくまでひとつのエンターテインメント</strong>として見ています。決定論のようにのめり込まないこと、そして「占いが全て」にならないように意識すること。これが自分の中のルールです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ただ、どうしようもなく落ち込んだ日には、そっと運勢のページを開きます。「今日の私はどうなってるかな？」「あ〜、運勢が悪い日だったのか。じゃあ今日のこの失敗もまあ仕方ない。明日また頑張ろう」——<strong>立ち直るきっかけづくり</strong>として、占いはとても優秀な相棒なんです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングも、「1位だから恋愛絶対勝ち組」でも「16位だから恋愛詰んだ」でもなく、<strong>自分の傾向を知って明日の関係づくりに1歩踏み出すためのヒント</strong>として読んでもらえたら、書いた甲斐があります。
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
