import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "タロット占い初心者ガイド｜無料で始める大アルカナ入門",
  description:
    "タロット占いを初めてやる方向けの入門ガイド。大アルカナとは何か、3択占いの仕組み、無料で楽しむ方法まで解説します。",
  openGraph: {
    title: "タロット占い初心者ガイド｜無料で始める大アルカナ入門",
    description:
      "タロット占いを初めてやる方向けの入門ガイド。大アルカナとは何か、3択占いの仕組み、無料で楽しむ方法まで解説します。",
    url: "https://uranai-tenohira.jp/tarot-guide/articles/tarot-beginner-guide",
  },
};

export default function TarotBeginnerGuidePage() {
  const article = getArticleBySlug("tarot-beginner-guide");
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
              タロット占い初心者ガイド｜無料で始める大アルカナ入門
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              タロット占いを始めたい人向けの入門記事。大アルカナとは何か、どう読むか、3択占いの楽しみ方まで解説します。
            </p>
          </header>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🔮 タロット占いって何？
            </h2>
            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                タロット占いは、カードに描かれた象徴やイメージを通じて、今の状況や未来へのヒントを読み解く占いです。占い師がカードを引くイメージがあるかもしれませんが、最近ではオンラインで手軽に楽しめるタロット占いも増えています。
              </p>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              📚 大アルカナと小アルカナ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              タロットには全78枚のカードがあり、大きく2つに分かれます。
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-purple-50">
                    <th className="border border-purple-200 px-3 py-2 text-left text-purple-800 font-bold">種類</th>
                    <th className="border border-purple-200 px-3 py-2 text-left text-purple-800 font-bold">枚数</th>
                    <th className="border border-purple-200 px-3 py-2 text-left text-purple-800 font-bold">役割</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">大アルカナ</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">22枚</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">人生の大きなテーマ・転機</td>
                  </tr>
                  <tr className="bg-purple-50/50">
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">小アルカナ</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">56枚</td>
                    <td className="border border-purple-200 px-3 py-2 text-gray-700">日常的な出来事・感情の変化</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              「手のひらの予言者」では、大アルカナ22枚を使った3択タロットを提供しています。大アルカナは一枚一枚のメッセージが強く、初心者でも直感的に意味を感じ取りやすいのが特徴です。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🔮 3択タロットの仕組み
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              当サイトの3択タロット占いは以下の流れで進みます。
            </p>
            <div className="space-y-3">
              {[
                { step: "1", label: "テーマを選ぶ", desc: "恋愛・仕事・総合・アドバイスの4つから" },
                { step: "2", label: "3枚のカードが表示される", desc: "毎日カードが入れ替わります" },
                { step: "3", label: "直感で1枚を選ぶ", desc: "最初に気になったカードを選びましょう" },
                { step: "4", label: "AIがあなただけの解釈をお届け", desc: "天体配置も加味した、その日限りのメッセージ" },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-3 rounded-2xl border-2 border-purple-100 bg-white p-4">
                  <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-purple-200 flex items-center justify-center font-black text-purple-700 shrink-0 text-sm">
                    {item.step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-purple-900 text-sm">{item.label}</p>
                    <p className="text-gray-600 text-xs mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 space-y-5">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              ❓ よくある質問
            </h2>

            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-2">
              <h3 className="font-bold text-purple-900 text-sm">Q. タロット占いは毎日やっていいの？</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                はい。毎日引いて構いません。当サイトの3択タロットは日替わりでカードが変わるので、日課として楽しめます。テーマを変えて1日に複数回引くのもOKです。
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-2">
              <h3 className="font-bold text-purple-900 text-sm">Q. 逆位置が出たら悪いこと？</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                いいえ。逆位置は「注意」や「別の視点」を示すサインであって、悪い結果を意味するわけではありません。むしろ逆位置のメッセージが一番「今の自分に必要な言葉」であることも多いです。
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-2">
              <h3 className="font-bold text-purple-900 text-sm">Q. 無料で使えるの？</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                はい。「手のひらの予言者」のタロット占いは完全無料です。会員登録も不要で、スマホからすぐに始められます。
              </p>
            </div>

            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-2">
              <h3 className="font-bold text-purple-900 text-sm">Q. AIの解釈って信頼できるの？</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                AIは大アルカナの伝統的な解釈と、その日の天体配置を組み合わせてメッセージを生成しています。占い師の「感覚」とは異なりますが、毎回異なる角度からの気づきを得られるのがAIタロットの面白さです。
              </p>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              💡 まとめ
            </h2>
            <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                タロット占いは、特別な知識がなくても楽しめる占いです。「当たるかどうか」よりも、カードを通じて自分の気持ちに気づくきっかけとして活用してください。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <Link
              href="/tarot"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
            >
              🔮 無料で3択タロット占いを始める →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
