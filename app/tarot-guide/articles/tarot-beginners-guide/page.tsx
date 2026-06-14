import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "タロット占い やり方｜初心者向けワンカードの引き方と解釈",
  description: "タロット占いのやり方を初心者向けに解説。ワンカードの引き方、YES/NO占い、カードの意味の読み方を紹介します。",
  openGraph: {
    title: "タロット占い やり方｜初心者向けワンカードの引き方と解釈",
    description: "タロット占い初心者向けに、ワンカードの引き方とカードの読み方をわかりやすく解説します。",
    url: "https://uranai-tenohira.jp/animal-guide/articles/tarot-beginners-guide",
  },
};

const FAQS = [
  { q: "タロット占いは初心者でもできますか？", a: "はい。ワンカード（1枚引き）なら、質問を心に浮かべてカードを1枚選ぶだけで始められます。手のひらの予言者では無料で体験できます。" },
  { q: "ワンカードとは何ですか？", a: "タロットカードを1枚だけ引いて、その日のメッセージやヒントを受け取る方法です。毎朝の習慣にする方も多いです。" },
  { q: "逆位置はどう読めばいいですか？", a: "逆位置は、カードの意味がブロックされていたり、過剰に出ている状態を示すとされます。否定的な意味だけではなく「注意して見るべきポイント」として読むのがおすすめです。" },
] as const;

export default function TarotBeginnersGuidePage() {
  const article = getArticleBySlug("tarot-beginners-guide");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

  return (
    <ArticlePageLayout variant="tarot">
      <ColumnNavPills variant="animal" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <article>
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-violet-600 text-xs font-bold uppercase tracking-wider">タロット占いコラム</p>
            {publishedDate && <p className="text-gray-500 text-xs">{publishedDate} 掲載</p>}
          </div>
          <h1 className="text-2xl font-black text-green-900 leading-tight">タロット占い やり方｜初心者向けワンカードの引き方と解釈</h1>
          <p className="text-gray-600 text-sm leading-relaxed">「タロット占いをやってみたいけど、難しそう」という方へ。この記事では、初心者がすぐに始められるワンカードの引き方と、カードの意味の読み方をまとめます。</p>
          <Link href="/tarot" className="block rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md hover:opacity-95">タロット占いを無料で試す →</Link>
        </header>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">ワンカードの引き方</h2>
          <p className="text-gray-700 text-sm leading-relaxed">ワンカードは、タロットカードを1枚だけ引いてメッセージを受け取る方法です。複数枚のスプレッドに比べてシンプルで、初心者が最初に試すのに向いています。</p>
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 text-sm leading-relaxed text-gray-700 space-y-2">
            <p>1. 心を落ち着けて、知りたいことを1つ思い浮かべる</p>
            <p>2. カードを1枚選ぶ（オンラインならタップするだけ）</p>
            <p>3. 出たカードの意味を読み、自分の状況に当てはめて考える</p>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">質問は「はい/いいえ」で答えられるものよりも、「今日意識すべきことは？」のようなオープンな問いかけの方が、カードの意味を受け取りやすくなります。</p>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">YES/NO占いのやり方</h2>
          <p className="text-gray-700 text-sm leading-relaxed">「迷っていることがあるけど、決められない」というときに便利なのがYES/NO占いです。タロットカードの正位置・逆位置を使って、シンプルにYESかNOかを判断します。</p>
          <p className="text-gray-700 text-sm leading-relaxed">ただし、YESが出たから絶対にそうすべき、というものではありません。結果を「背中を押してくれるヒント」として受け取り、最終的な判断は自分でするのがタロット占いとの健全な付き合い方です。</p>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">カードの意味を読むコツ</h2>
          <p className="text-gray-700 text-sm leading-relaxed">タロットカードは全部で78枚あり、それぞれに固有の意味があります。最初から全部覚える必要はありません。まずは大アルカナ22枚の基本的な意味を知ることから始めるのがおすすめです。</p>
          <p className="text-gray-700 text-sm leading-relaxed">カードを読むときは、絵柄をよく見ることも大切です。描かれている人物の表情、背景の色、持っているものなどから、直感的に感じたことをそのまま受け取ってみてください。正解を探すよりも、自分が感じたことを大切にするのがタロットを楽しむ秘訣です。</p>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">よくある質問</h2>
          {FAQS.map((faq) => (<details key={faq.q} className="rounded-2xl border border-green-100 bg-green-50/60 p-4"><summary className="font-bold text-green-800 text-sm cursor-pointer">{faq.q}</summary><p className="mt-2 text-gray-700 text-sm leading-relaxed">{faq.a}</p></details>))}
        </section>
      </article>
      <AdBanner />
      <RakutenWidget />
    </ArticlePageLayout>
  );
}
