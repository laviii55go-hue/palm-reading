import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "動物占い 相性ランキング｜最も相性のいい組み合わせは？",
  description: "動物占いの相性ランキングを紹介。12動物の中で相性の良い組み合わせ、恋愛・友人関係での相性の見方を解説します。",
  openGraph: {
    title: "動物占い 相性ランキング｜最も相性のいい組み合わせは？",
    description: "動物占いで相性の良い組み合わせランキングと、グループ別の相性傾向を解説します。",
    url: "https://uranai-tenohira.jp/animal-guide/articles/animal-compatibility-ranking",
  },
};

const FAQS = [
  { q: "動物占いの相性は当たりますか？", a: "動物占いの相性は、行動パターンやコミュニケーションスタイルの傾向をもとにしています。「当たる・当たらない」よりも、相手との違いを理解するきっかけとして活用するのがおすすめです。" },
  { q: "相性が悪い組み合わせだとうまくいきませんか？", a: "そんなことはありません。相性が合いにくい組み合わせでも、違いを知ることで歩み寄り方が見えてきます。むしろ異なるタイプ同士が補い合うケースも多くあります。" },
  { q: "相性ランキングは何をもとにしていますか？", a: "動物占いの3グループ（月・地球・太陽）の分類と、各動物の行動パターンの相性傾向をもとに構成しています。" },
] as const;

export default function AnimalCompatibilityRankingPage() {
  const article = getArticleBySlug("animal-compatibility-ranking");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <article>
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-green-600 text-xs font-bold uppercase tracking-wider">動物占いコラム</p>
            {publishedDate && <p className="text-gray-500 text-xs">{publishedDate} 掲載</p>}
          </div>
          <h1 className="text-2xl font-black text-green-900 leading-tight">動物占い 相性ランキング｜最も相性のいい組み合わせは？</h1>
          <p className="text-gray-600 text-sm leading-relaxed">「動物占いで相性がいいのはどの組み合わせ？」という方へ。この記事では、12動物のグループ分類をもとに、相性の良い組み合わせの傾向をまとめます。</p>
          <Link href="/animal" className="block rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md hover:opacity-95">動物占いで相性診断する →</Link>
        </header>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">相性の良い組み合わせの傾向</h2>
          <p className="text-gray-700 text-sm leading-relaxed">動物占いの12動物は「月グループ」「地球グループ」「太陽グループ」の3つに分類されます。同じグループ内は価値観やペースが似ているため、自然体で付き合いやすい傾向があります。</p>
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 text-sm leading-relaxed text-gray-700 space-y-3">
            <p><strong>月グループ</strong>（こじか・黒ひょう・たぬき・ひつじ）：相手の気持ちを大切にするタイプ同士。共感力が高く、穏やかな関係を築きやすいとされます。</p>
            <p><strong>地球グループ</strong>（狼・猿・虎・子守熊）：自分のペースを大切にするタイプ同士。互いの自立心を尊重し合える関係です。</p>
            <p><strong>太陽グループ</strong>（チータ・ライオン・ゾウ・ペガサス）：行動力と存在感があるタイプ同士。一緒にいるとエネルギーが増す組み合わせです。</p>
          </div>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">グループをまたぐ相性</h2>
          <p className="text-gray-700 text-sm leading-relaxed">異なるグループの組み合わせでは、お互いにない視点を補い合える関係になることがあります。たとえば、月グループの繊細さと太陽グループの行動力が合わさると、片方だけでは到達できない成果を生むこともあります。</p>
          <p className="text-gray-700 text-sm leading-relaxed">ただし、ペースや価値観が異なるため、最初は戸惑うことがあるかもしれません。「この人は自分とは違うグループなんだ」と意識するだけで、違いを受け入れやすくなります。</p>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">相性を活かすコツ</h2>
          <p className="text-gray-700 text-sm leading-relaxed">動物占いの相性は、関係の「取扱説明書」のようなものです。相性が良いとされる組み合わせでも努力は必要ですし、相性が難しいとされる組み合わせでも工夫次第で良い関係を築けます。</p>
          <p className="text-gray-700 text-sm leading-relaxed">大切なのは、相手の動物キャラを知って「この人はこういうタイプなのか」と理解すること。自分の常識を押し付けるのではなく、相手のグループ特性を踏まえた関わり方を意識するだけで、コミュニケーションが円滑になります。</p>
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
