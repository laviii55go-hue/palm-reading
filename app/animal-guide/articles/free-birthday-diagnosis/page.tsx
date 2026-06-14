import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "動物占い 無料診断｜生年月日でわかる動物キャラと相性の見方",
  description:
    "動物占いを無料で試したい人向けに、生年月日で何がわかるのか、60種類の動物キャラ、相性診断の楽しみ方をやさしく解説します。",
  openGraph: {
    title: "動物占い 無料診断｜生年月日でわかる動物キャラと相性の見方",
    description:
      "無料の動物占いで生年月日からわかること、60種類の動物キャラ、相性診断の楽しみ方を解説します。",
    url: "https://uranai-tenohira.jp/animal-guide/articles/free-birthday-diagnosis",
  },
};

const FAQS = [
  {
    q: "動物占いは無料で診断できますか？",
    a: "はい。手のひらの予言者では、生年月日を入力するだけで動物占いを無料で診断できます。",
  },
  {
    q: "動物占いでは何がわかりますか？",
    a: "12動物と5つのサブタイプを組み合わせた60種類の動物キャラから、性格、恋愛、仕事の傾向、相性のヒントがわかります。",
  },
  {
    q: "相手の生年月日があれば相性も見られますか？",
    a: "はい。自分と相手の生年月日を入力すると、2人の動物キャラをもとに相性診断を楽しめます。",
  },
] as const;

export default function FreeBirthdayDiagnosisArticlePage() {
  const article = getArticleBySlug("free-birthday-diagnosis");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <article>
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-green-600 text-xs font-bold uppercase tracking-wider">
              動物占いコラム
            </p>
            {publishedDate && (
              <p className="text-gray-500 text-xs">📅 {publishedDate} 掲載</p>
            )}
          </div>
          <h1 className="text-2xl font-black text-green-900 leading-tight">
            動物占い 無料診断｜生年月日でわかる動物キャラと相性の見方
          </h1>
          <p className="text-gray-600 text-sm leading-relaxed">
            「動物占いを無料で試したい」「生年月日を入れると何がわかるの？」という方へ。
            この記事では、動物占いの無料診断でわかること、60種類の動物キャラの見方、相性診断の楽しみ方をまとめます。
          </p>
          <Link
            href="/animal"
            className="block rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md hover:opacity-95"
          >
            生年月日で動物占いを無料診断する →
          </Link>
        </header>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
            動物占いの無料診断でわかること
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            動物占いは、生年月日からあなたの性格や行動パターンを動物キャラに置き換えて見る占いです。
            手のひらの予言者では、12種類の動物と5つのサブタイプを組み合わせた<strong>60種類の動物キャラ</strong>から診断できます。
          </p>
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 text-sm leading-relaxed text-gray-700 space-y-2">
            <p>・自分の基本性格</p>
            <p>・恋愛で出やすい傾向</p>
            <p>・仕事で活かしやすい強み</p>
            <p>・相手との動物占い相性</p>
            <p>・ラッキーカラーや開運アイテム</p>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
            生年月日だけで診断できる理由
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            動物占いでは、生年月日から導いた数値をもとに、まず12種類の動物を判定します。
            さらに5つのサブタイプを掛け合わせることで、「黒いライオン」「金のコアラ」のような細かなキャラが決まります。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            名前やメールアドレスは不要です。生まれ年・月・日だけを入れればすぐに結果が出るので、家族や友人と一緒に試しやすいのも特徴です。
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
            大人の動物占いとして楽しむコツ
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            大人が動物占いを使うなら、「当たる・当たらない」だけでなく、コミュニケーションのヒントとして見るのがおすすめです。
            自分の強みや弱みを軽く言語化できるので、恋愛、家族関係、職場での相性を話すきっかけになります。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            たとえば、スピード重視の動物と慎重派の動物では、物事を決めるペースが違います。
            相性診断は、その違いを責めるためではなく「どう歩み寄ると楽か」を見つけるために使うと、ぐっと実用的になります。
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
            動物占いの関連記事
          </h2>
          <div className="space-y-3">
            <Link
              href="/animal-guide"
              className="block rounded-2xl border border-green-100 bg-white p-4 text-sm font-bold text-green-800 shadow-sm hover:bg-green-50"
            >
              動物占いとは？12動物の特徴と相性の見方
            </Link>
            <Link
              href="/animal-guide/articles/60-types-guide"
              className="block rounded-2xl border border-green-100 bg-white p-4 text-sm font-bold text-green-800 shadow-sm hover:bg-green-50"
            >
              動物占い60種類の楽しみ方
            </Link>
          </div>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
            よくある質問
          </h2>
          {FAQS.map((faq) => (
            <details key={faq.q} className="rounded-2xl border border-green-100 bg-green-50/60 p-4">
              <summary className="cursor-pointer text-sm font-bold text-green-900">{faq.q}</summary>
              <p className="mt-2 text-sm leading-relaxed text-gray-700">{faq.a}</p>
            </details>
          ))}
        </section>

        <section className="mt-10">
          <Link
            href="/animal"
            className="block w-full rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md hover:opacity-95"
          >
            動物占いを無料で診断する →
          </Link>
        </section>
      </article>

      <AdBanner />
      <RakutenWidget />
    </ArticlePageLayout>
  );
}
