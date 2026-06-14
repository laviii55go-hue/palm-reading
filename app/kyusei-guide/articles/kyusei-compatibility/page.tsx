import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "九星気学 相性｜本命星別の相性早見表と見方",
  description: "九星気学の相性を本命星別に解説。相生・相剋の関係、恋愛・仕事での相性の見方を紹介します。",
  openGraph: {
    title: "九星気学 相性｜本命星別の相性早見表と見方",
    description: "九星気学で本命星別の相性を確認。相生・相剋の関係と、恋愛・仕事での活かし方を解説します。",
    url: "https://uranai-tenohira.jp/animal-guide/articles/kyusei-compatibility",
  },
};

const FAQS = [
  { q: "九星気学の相性はどうやって見ますか？", a: "自分と相手の本命星を調べ、五行（木・火・土・金・水）の相生・相剋の関係を確認します。相生は支え合う関係、相剋は刺激し合う関係です。" },
  { q: "本命星はどうやってわかりますか？", a: "生まれ年から計算で求めます。手のひらの予言者では、生年月日を入力するだけで本命星を自動判定できます。" },
  { q: "相剋の相手とは合わないのですか？", a: "相剋は「合わない」という意味ではなく、互いに刺激を与え合う関係です。ビジネスパートナーとして相性が良いケースもあります。" },
] as const;

export default function KyuseiCompatibilityPage() {
  const article = getArticleBySlug("kyusei-compatibility");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <article>
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-amber-600 text-xs font-bold uppercase tracking-wider">九星気学コラム</p>
            {publishedDate && <p className="text-gray-500 text-xs">{publishedDate} 掲載</p>}
          </div>
          <h1 className="text-2xl font-black text-green-900 leading-tight">九星気学 相性｜本命星別の相性早見表と見方</h1>
          <p className="text-gray-600 text-sm leading-relaxed">「九星気学で相性を調べたい」「本命星が違うと合わないの？」という方へ。この記事では、九星気学の相性の見方と、恋愛・仕事での活かし方をまとめます。</p>
          <Link href="/kyusei" className="block rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md hover:opacity-95">九星気学占いを試す →</Link>
        </header>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">九星気学とは</h2>
          <p className="text-gray-700 text-sm leading-relaxed">九星気学は、生まれ年から導かれる「本命星」をもとに、性格や運勢、人との相性を読み解く東洋の占術です。一白水星から九紫火星まで9つの星があり、それぞれが五行（木・火・土・金・水）のいずれかに属しています。</p>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">相性の見方：相生と相剋</h2>
          <p className="text-gray-700 text-sm leading-relaxed">九星気学の相性は、五行の「相生（そうじょう）」と「相剋（そうこく）」の関係で読み取ります。</p>
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 text-sm leading-relaxed text-gray-700 space-y-3">
            <p><strong>相生の関係</strong>：一方が他方を育てる、支え合う関係です。木は火を生み、火は土を生み、土は金を生み、金は水を生み、水は木を生む、という循環になっています。自然体で一緒にいられる組み合わせが多いとされます。</p>
            <p><strong>相剋の関係</strong>：互いに刺激し合う、緊張感のある関係です。合わないという意味ではなく、成長のきっかけを与え合う関係として読みます。</p>
            <p><strong>比和の関係</strong>：同じ五行同士の組み合わせです。価値観が似ているため共感しやすい反面、似た弱点を持つため注意が必要です。</p>
          </div>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">恋愛と仕事での活かし方</h2>
          <p className="text-gray-700 text-sm leading-relaxed">恋愛では、相生の関係にある相手とは自然体でリラックスできる傾向があります。一方、相剋の関係でも「この人といると刺激を受ける」と感じるなら、成長し合えるパートナーになれる可能性があります。</p>
          <p className="text-gray-700 text-sm leading-relaxed">仕事では、相生の組み合わせはチーム内の安定感、相剋の組み合わせは新しいアイデアや改善のきっかけとして機能することがあります。相性の結果を「良い・悪い」の二択で判断するのではなく、関係の特徴を理解して付き合い方を工夫する材料として使うのがおすすめです。</p>
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
