import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで金運・仕事運ランキング｜お金・キャリアに強いタイプは？",
  description:
    "16タイプ性格診断から、金運・仕事運・キャリアに強い順にランキング。ENTJ・ESTJ・INTJなど、お金を稼ぎキャリアを築く力を持つタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで金運・仕事運ランキング",
    description: "ENTJ・ESTJ・INTJなど、お金・キャリアに強い16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/money-work-ranking",
  },
};

const RANKING = [
  { code: "ENTJ", reason: "経営・マネジメント・プロジェクトリーダーで、効率的に成果を出す" },
  { code: "ESTJ", reason: "管理職・経営・法務など、組織を動かし確実に成果を出す" },
  { code: "INTJ", reason: "戦略立案や専門分野の深掘りで、長期的なプロジェクトを成功させる" },
  { code: "ISTJ", reason: "事務・経理・品質管理など、正確さと継続性で信頼を築く" },
  { code: "ENTP", reason: "起業・コンサル・企画など、新しい挑戦やアイデアで価値を生む" },
  { code: "ESTP", reason: "営業・起業・スポーツなど、行動力で成果を出す" },
  { code: "ENFJ", reason: "教育・人事・コーチングなど、人を育てる仕事で真価を発揮" },
  { code: "ENFP", reason: "マーケティング・イベント・クリエイティブなど、人と関わり創造性を発揮" },
  { code: "INTP", reason: "研究・分析・システム設計など、論理的思考で専門性を高める" },
  { code: "ESFJ", reason: "接客・人事・教育など、人と関わる仕事で力を発揮" },
  { code: "ISTP", reason: "エンジニア・整備・スポーツなど、技術や実践で価値を生む" },
  { code: "INFJ", reason: "カウンセリング・教育・NPOなど、社会貢献に関わる仕事で活躍" },
  { code: "ISFJ", reason: "医療・介護・事務など、人を支える仕事で信頼を築く" },
  { code: "ISFP", reason: "デザイン・アート・美容など、創造性を活かす仕事が向く" },
  { code: "INFP", reason: "創作・カウンセリング・福祉など、価値観が活かせる仕事が向く" },
  { code: "ESFP", reason: "接客・エンタメ・イベントなど、人を楽しませる仕事で活躍" },
];

export default function MoneyWorkRankingArticlePage() {
  const article = getArticleBySlug("money-work-ranking");
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
              16タイプで金運・仕事運ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、お金・キャリアに強い順にランキングしました。仕事選びやキャリアのヒントとして参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事では、ランキングを紹介したうえで、私が色々な人を見てきて感じる<strong>「お金との付き合い方には3種類ある」</strong>という話や、<strong>ランキング下位のタイプほど自分に合った稼ぎ方を見つけると強い</strong>という話を書いています。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                「仕事運ランキング下位だから自分はお金に縁がない」と決めつけるのはちょっと早いです。ぜひ最後まで読んでもらえたら嬉しいです。
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
                このランキングは、各タイプの<strong>実行力・組織力・忍耐力・専門性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから金運が悪いわけではありません。ESFPは接客で、INFPは創作で、それぞれの形で価値を生み出しています。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              💰 お金との付き合い方には3種類ある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              お金との向き合い方にも、16タイプによって<strong>大きく3つの方向性</strong>があると感じます。「お金を増やす」という一つの言葉の中に、まったく異なる行動パターンが隠れています。
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-teal-800">① 攻めの運用型（ENTJ・ENTP・ESTP・INTJ）</p>
                <p>リスクを取って大きく増やすアプローチ。投資・起業・新規事業で成果を出すタイプ。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">② 守りの積立型（ISTJ・ESTJ・ISFJ・INFJ）</p>
                <p>コツコツ堅実に積み上げるアプローチ。長期投資・貯金・ローン返済などで力を発揮するタイプ。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">③ 好きで稼ぐ型（INFP・ENFP・ISFP・ESFP）</p>
                <p>「好きなこと」を仕事にしてお金につなげるアプローチ。クリエイティブ・接客・エンタメ・福祉などで輝く。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              問題は、<strong>自分に合わない型を他人から押し付けられたときに苦しくなる</strong>ことです。守りの積立型の人が「今どきは攻めないとダメだよ」と投資を勧められて疲弊したり、好きで稼ぐ型の人が「もっと効率よく稼げる仕事にしたら？」と言われて自分を見失ったり。<strong>自分のタイプに合った付き合い方をすること</strong>が、長い目で見ると一番お金とも仲良くなれる方法だと思います。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌱 下位タイプは「小さな経済圏」で勝負すると強い
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>INFP・ISFP・ESFP</strong>といったタイプは、一般的な「仕事運」の尺度で測ると確かに低めに見えます。でも、<strong>「大きな会社で出世する」「効率的に組織で稼ぐ」</strong>という前提が変わった瞬間、状況はがらりと変わります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえばINFPの人が、好きな分野で少数の熱心なファンに向けてコンテンツを届ける——そういう「小さな経済圏」では、このタイプの持つ世界観の強さがそのまま収益に変わります。ISFPのデザインや美的感覚も、同じように「分かる人に届けば高く買ってもらえる」世界です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ESFPの場を盛り上げる力は、接客やエンタメで直接的にお金になる才能です。大きな組織の中で評価されにくくても、「一人の顧客を楽しませる」仕事では圧倒的な強みになります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>ランキングが下のタイプは、「大きな組織で稼ぐ」ではなく「自分の色で稼ぐ」に軸を変えると、急に景色が変わる</strong>——これは私が強く伝えたい視点です。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌀 仕事運・金運は「環境との噛み合わせ」で決まる
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              最後に、ちょっと哲学的な話を。私はこのランキングを眺めていて、<strong>仕事運や金運は「タイプ」単体で決まるのではなく、「タイプ × 環境」の噛み合わせで決まる</strong>と感じています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ENTJが大企業の経営陣にいれば上位ランキングの威力を発揮しますが、クリエイティブなスタートアップの中ではENTPやENFPのほうが光るかもしれません。ISTJが事務職で盤石な信頼を築ける一方、変化の激しいIT業界ではISTPのほうが適応できる。<strong>同じタイプでも、どの環境にいるかで仕事運・金運は大きく変わる</strong>のです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              だから、このランキングで下位だったとしても、<strong>「自分のタイプが活きる環境を選び直す」</strong>という発想で、いつでもリセットできます。転職・副業・独立・引っ越し——環境を変えるチャンスは意外とたくさんあります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              占いや診断は、「今の環境に合わせて自分を変える」のではなく、<strong>「自分に合う環境を選ぶための地図」</strong>として使ってもらえたら、もっと楽に生きられる人が増えるんじゃないかと思っています。今のあなたが苦しいなら、タイプのせいではなく、環境との噛み合わせが今たまたまズレているだけ、かもしれません。
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
