import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "3択タロット占いの当たる引き方｜直感を信じるコツ",
  description:
    "3択タロットで「当たった！」と感じるための引き方のコツ。直感の磨き方、テーマ選びのポイント、カードの読み方まで解説します。",
  openGraph: {
    title: "3択タロット占いの当たる引き方｜直感を信じるコツ",
    description:
      "3択タロットで「当たった！」と感じるための引き方のコツ。直感の磨き方、テーマ選びのポイント、カードの読み方まで解説します。",
    url: "https://uranai-tenohira.jp/tarot-guide/articles/how-to-enjoy-3choice",
  },
};

export default function HowToEnjoy3ChoicePage() {
  const article = getArticleBySlug("how-to-enjoy-3choice");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="tarot">
      <ColumnNavPills variant="tarot" />

        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-purple-500 text-xs font-bold uppercase tracking-wider">
                タロットコラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-purple-900 leading-tight">
              3択タロット占いの当たる引き方｜直感を信じるコツ
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              3択タロットで「当たった！」と感じるための引き方のコツ。直感の磨き方と、テーマ選びで変わる占いの深さを解説します。
            </p>
          </header>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🔮 3択タロット占いとは？
            </h2>
            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                3択タロット占い（三択タロット）は、大アルカナ22枚の中から3枚のカードが提示され、直感で1枚を選ぶ占いです。シンプルだからこそ、「どう選ぶか」で結果の受け取り方が大きく変わります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                「手のひらの予言者」の3択タロットでは、恋愛・仕事・総合・アドバイスの4つのテーマを選んでから、カードを引くことができます。毎日カードが入れ替わるので、日課として楽しめるのも特徴です。
              </p>
            </div>
          </section>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              ✨ 「当たる」と感じる引き方のコツ
            </h2>

            <div className="space-y-5">
              <div className="rounded-2xl border-2 border-purple-100 bg-white p-4 space-y-2">
                <h3 className="font-bold text-purple-900">コツ1: テーマを明確にしてから引く</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  漠然と「今日の運勢」と考えるより、「今日の仕事で気をつけることは？」のように具体的な問いを頭に浮かべてからテーマを選びましょう。問いが具体的であるほど、カードのメッセージが自分ごととして刺さります。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-purple-100 bg-white p-4 space-y-2">
                <h3 className="font-bold text-purple-900">コツ2: 最初に目に入ったカードを信じる</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  3枚のカードが表示されたとき、最初に「気になった」カードが直感の答えです。「こっちのほうがいいかも」と迷い始めると、思考が直感を上書きしてしまいます。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  タロットは「正解を当てる」占いではなく、「直感が何を教えてくれるか」を受け取る占いです。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-purple-100 bg-white p-4 space-y-2">
                <h3 className="font-bold text-purple-900">コツ3: 逆位置を恐れない</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  カードが逆位置（リバース）で出ると、ネガティブな印象を受けるかもしれません。でも逆位置は「警告」ではなく「視点を変えてみて」というメッセージです。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  例えば「太陽」の逆位置は「失敗」ではなく、「今は目立つより内面を充実させるとき」という読み方ができます。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-purple-100 bg-white p-4 space-y-2">
                <h3 className="font-bold text-purple-900">コツ4: 結果を記録する</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  毎日引いた結果を、日記のように振り返る習慣をつけると、カードとの対話が深まります。「あのとき塔が出たけど、確かに変化があった」など、後から読み返すと驚くほどリンクしていることがあります。
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🎯 テーマ選びで変わる占いの深さ
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border border-purple-200 px-3 py-2 text-left text-purple-800 font-bold">テーマ</th>
                    <th className="border border-purple-200 px-3 py-2 text-left text-purple-800 font-bold">向いている問い</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">総合</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">「今日1日をどう過ごすといいか」</td>
                  </tr>
                  <tr className="bg-purple-50/50">
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">恋愛</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">「あの人との関係で大事なことは」</td>
                  </tr>
                  <tr>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">仕事</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">「今のプロジェクトで意識すべきことは」</td>
                  </tr>
                  <tr className="bg-purple-50/50">
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">アドバイス</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">「今の自分に必要なメッセージは」</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              テーマを変えて同じ日に何度か引いても構いません。違うテーマで引くと、同じカードでも全く違う解釈が返ってくるのが3択タロットの面白さです。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              💡 まとめ
            </h2>
            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                3択タロット占いは「当たるかどうか」よりも、「今の自分に必要なメッセージを受け取る」ツールです。直感を信じて、毎日のちょっとした指針として楽しんでください。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <Link
              href="/tarot"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
            >
              🔮 3択タロット占いを試す →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
