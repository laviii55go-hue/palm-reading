import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "手相占い 見方｜基本3線の読み方と左右の手の違い",
  description: "手相占いの見方を初心者向けに解説。生命線・感情線・頭脳線の基本3線の読み方、左手と右手の違いを紹介します。",
  openGraph: {
    title: "手相占い 見方｜基本3線の読み方と左右の手の違い",
    description: "手相占いの基本3線の読み方と、左右の手の意味の違いをわかりやすく解説します。",
    url: "https://uranai-tenohira.jp/animal-guide/articles/palm-reading-basics",
  },
};

const FAQS = [
  { q: "手相は左右どちらの手を見ればいいですか？", a: "一般的に、利き手は「現在〜未来の傾向」、反対の手は「生まれ持った素質」を表すとされています。迷ったら両手を見比べるのがおすすめです。" },
  { q: "手相は変わることがありますか？", a: "はい。手相は数か月〜数年単位で変化することがあります。生活習慣や考え方の変化が線に表れるといわれています。" },
  { q: "手相占いは無料でできますか？", a: "はい。手のひらの予言者では、手相に関するクイズ形式の診断を無料で楽しめます。" },
] as const;

export default function PalmReadingBasicsPage() {
  const article = getArticleBySlug("palm-reading-basics");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;
  const faqJsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQS.map((faq) => ({ "@type": "Question", name: faq.q, acceptedAnswer: { "@type": "Answer", text: faq.a } })) };

  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <article>
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <p className="text-purple-600 text-xs font-bold uppercase tracking-wider">手相占いコラム</p>
            {publishedDate && <p className="text-gray-500 text-xs">{publishedDate} 掲載</p>}
          </div>
          <h1 className="text-2xl font-black text-green-900 leading-tight">手相占い 見方｜基本3線の読み方と左右の手の違い</h1>
          <p className="text-gray-600 text-sm leading-relaxed">「手相を見てみたいけど、どこを見ればいいの？」という方へ。この記事では、手相占いで最初に覚える基本3線と、左右の手の意味の違いをわかりやすくまとめます。</p>
          <Link href="/palm-quiz" className="block rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 px-5 py-4 text-center text-sm font-bold text-white shadow-md hover:opacity-95">手相診断を試す →</Link>
        </header>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">基本3線の読み方</h2>
          <p className="text-gray-700 text-sm leading-relaxed">手相占いで最初に見るのは、手のひらを横切る3本の大きな線です。それぞれが異なるテーマを表しており、線の長さ・深さ・カーブの仕方で読み取る内容が変わります。</p>
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 text-sm leading-relaxed text-gray-700 space-y-3">
            <p><strong>生命線</strong>：親指と人差し指の間から手首方向へ伸びる線。体力や生活の充実度の傾向を表します。長くてはっきりしているほどエネルギッシュな傾向があるとされます。</p>
            <p><strong>感情線</strong>：小指の下から人差し指方向へ伸びる線。感情表現や恋愛の傾向を表します。カーブが大きいほど感情豊かなタイプといわれます。</p>
            <p><strong>頭脳線</strong>：生命線の起点付近から手のひらを横切る線。考え方や判断のスタイルを表します。まっすぐなら論理的、下に曲がっていれば想像力豊かなタイプとされます。</p>
          </div>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">左手と右手の違い</h2>
          <p className="text-gray-700 text-sm leading-relaxed">手相占いでよく聞かれるのが「左右どちらを見ればいいのか」という疑問です。流派によって解釈は異なりますが、一般的には次のように考えられています。</p>
          <div className="rounded-2xl border border-green-100 bg-green-50/70 p-5 text-sm leading-relaxed text-gray-700 space-y-2">
            <p><strong>利き手</strong>：後天的な運勢、つまり自分の行動や努力で変化してきた傾向を表すとされます。</p>
            <p><strong>反対の手</strong>：先天的な運勢、つまり生まれ持った素質や才能を表すとされます。</p>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">両手を見比べて、違いが大きいほど「元の自分」から変化してきたと読み取ることができます。どちらか一方だけを見るのではなく、両方を比較することでより深い理解につながります。</p>
        </section>
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">手相占いを楽しむコツ</h2>
          <p className="text-gray-700 text-sm leading-relaxed">手相は「当たる・当たらない」で判断するよりも、自分を見つめ直すきっかけとして使うのがおすすめです。基本3線を知るだけでも、自分の傾向を言葉にしやすくなります。</p>
          <p className="text-gray-700 text-sm leading-relaxed">友人や家族と手のひらを見せ合いながら「この線が似てるね」「ここが全然違う」と話すだけでも、会話のきっかけになります。数か月後にもう一度見て、変化を楽しむのも手相占いならではの面白さです。</p>
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
