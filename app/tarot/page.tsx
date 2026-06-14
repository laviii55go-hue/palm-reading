import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import FortunePageHero from "../components/FortunePageHero";
import FortunePageShell from "../components/FortunePageShell";
import RakutenWidget from "../components/RakutenWidget";
import { fortuneContentCard, fortuneMenuCard, yuGothic } from "../lib/fortuneDesign";

export const metadata: Metadata = {
  title: "タロット占い 無料｜3択・YES/NO・恋愛・仕事のカード占い",
  description:
    "無料のタロット占い。ワンカード、YES/NO、恋愛、仕事の4メニューで、大アルカナ22枚から今のあなたへのメッセージを読み解きます。",
  openGraph: {
    title: "タロット占い 無料｜3択・YES/NO・恋愛・仕事のカード占い",
    description:
      "ワンカード・YES/NO・恋愛・仕事を無料で楽しめるタロット占い。大アルカナ22枚からメッセージを受け取れます。",
    url: "https://uranai-tenohira.jp/tarot",
  },
};

export default function TarotPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "タロット占いは無料でできますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "はい。ワンカード、YES/NO、恋愛、仕事のタロット占いを無料で利用できます。",
        },
      },
      {
        "@type": "Question",
        name: "YES/NOタロットでは何を占えますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "迷っている質問に対して、カードの正位置・逆位置をもとにYES寄り、NO寄り、保留などのメッセージを表示します。",
        },
      },
      {
        "@type": "Question",
        name: "恋愛や仕事のタロットもありますか？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "恋愛タロットと仕事タロットは、それぞれ3枚のカードで現在の状況、課題、アドバイスを読み解きます。",
        },
      },
    ],
  };

  return (
    <FortunePageShell
      variant="fortune"
      theme="tarot"
      subText="タロット占い"
      links={[
        { type: "guide", href: "/tarot-guide" },
        { type: "articles", href: "/tarot-guide/articles" },
      ]}
    >
      <FortunePageHero
        theme="tarot"
        imageSrc="/tarot-top.webp"
        title="タロット占い｜無料"
        description="3択感覚で楽しめるワンカード・YES/NO・恋愛・仕事のカード占い"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="grid grid-cols-2 gap-3">
        {[
          { href: "/tarot/one-card", emoji: "🔮", title: "ワンカード", desc: "今日の1枚を引く" },
          { href: "/tarot/yes-no", emoji: "✅", title: "YES / NO", desc: "質問に答える1枚引き" },
          { href: "/tarot/love", emoji: "💕", title: "恋愛タロット", desc: "3枚で恋の行方を占う" },
          { href: "/tarot/work", emoji: "💼", title: "仕事タロット", desc: "3枚でキャリアを占う" },
        ].map((item) => (
          <Link key={item.href} href={item.href} className={fortuneMenuCard}>
            <div className="text-2xl mb-1">{item.emoji}</div>
            <div className={`font-bold text-purple-950 text-sm ${yuGothic}`}>{item.title}</div>
            <div className={`text-[11px] text-purple-950/70 mt-1 ${yuGothic}`}>{item.desc}</div>
          </Link>
        ))}
      </div>

      <AdBanner />
      <RakutenWidget />

      <section className={`${fortuneContentCard} p-5 space-y-3 text-sm text-purple-950/80 leading-relaxed ${yuGothic}`}>
        <h1 className="font-black text-purple-950 text-lg">タロット占い 無料｜3択・YES/NO・恋愛・仕事</h1>
        <p>
          当サイトでは大アルカナ22枚のオリジナルカードを使った4種類のタロット占いを完全無料で提供しています。
        </p>
        <p>
          「今日の一枚を知りたい」「YESかNOで迷っている」「恋愛や仕事の流れを見たい」など、短い時間でカードからヒントを受け取りたい時に使えます。
        </p>
        <ul className="space-y-1.5 text-sm">
          <li><Link href="/tarot/one-card" className="text-purple-700 underline hover:text-purple-900 font-medium">ワンカードタロット</Link> — 毎日1枚引いて今日のメッセージを受け取る日替わり占い</li>
          <li><Link href="/tarot/yes-no" className="text-purple-700 underline hover:text-purple-900 font-medium">YES/NOタロット</Link> — 質問を唱えてカードを引くだけ。迷いにシンプルに答えます</li>
          <li><Link href="/tarot/love" className="text-purple-700 underline hover:text-purple-900 font-medium">恋愛タロット</Link> — 過去・現在・未来の3枚スプレッドで恋の行方を読み解きます</li>
          <li><Link href="/tarot/work" className="text-purple-700 underline hover:text-purple-900 font-medium">仕事タロット</Link> — 現状・課題・アドバイスの3枚スプレッドでキャリアを占います</li>
        </ul>
        <p>
          正位置・逆位置も反映されるため、同じカードでも毎回異なるメッセージが届きます。
        </p>
        <p>
          <Link href="/tarot-guide" className="text-purple-700 underline hover:text-purple-900 font-medium">タロットガイド</Link> では大アルカナ22枚それぞれの意味・キーワード・解釈のコツを解説しています。
        </p>
      </section>

      <section className={`${fortuneContentCard} p-5 space-y-3 text-sm text-purple-950/80 leading-relaxed ${yuGothic}`}>
        <h2 className="font-bold text-purple-950 text-base">無料タロット占いのよくある質問</h2>
        <details className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
          <summary className="cursor-pointer font-bold text-purple-950">タロット占いは無料でできますか？</summary>
          <p className="mt-2">はい。ワンカード、YES/NO、恋愛、仕事のタロット占いを無料で利用できます。</p>
        </details>
        <details className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
          <summary className="cursor-pointer font-bold text-purple-950">YES/NOタロットでは何を占えますか？</summary>
          <p className="mt-2">迷っている質問に対して、カードの正位置・逆位置をもとにYES寄り、NO寄り、保留などのメッセージを表示します。</p>
        </details>
        <details className="rounded-2xl border border-purple-100 bg-purple-50/60 p-4">
          <summary className="cursor-pointer font-bold text-purple-950">恋愛や仕事のタロットもありますか？</summary>
          <p className="mt-2">恋愛タロットと仕事タロットは、それぞれ3枚のカードで現在の状況、課題、アドバイスを読み解きます。</p>
        </details>
      </section>
    </FortunePageShell>
  );
}
