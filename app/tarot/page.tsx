import Link from "next/link";
import Image from "next/image";
import AdBanner from "../components/AdBanner";
import PageHeader from "../components/PageHeader";
import RakutenWidget from "../components/RakutenWidget";

export default function TarotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-fuchsia-50">
      <PageHeader
        variant="fortune"
        theme="tarot"
        subText="タロット占い"
        links={[
          { type: "guide", href: "/tarot-guide" },
          { type: "articles", href: "/tarot-guide/articles" },
        ]}
      />
      <div className="max-w-md mx-auto px-4 py-6 space-y-6">
        <div className="text-center">
          <div className="mt-4 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="/tarot-top.webp"
              alt="タロット占い"
              width={600}
              height={300}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-black text-purple-900 mt-3">
            タロット占い｜無料
          </h1>
          <p className="text-purple-600 text-sm mt-1">
            大アルカナ22枚で占う4つのメニュー。ワンカード・YES/NO・恋愛・仕事
          </p>
        </div>

        {/* タロットメニュー */}
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/tarot/one-card"
            className="rounded-2xl border-2 border-purple-200 bg-white/80 p-4 hover:border-purple-400 hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="text-2xl mb-1">🔮</div>
            <div className="font-bold text-purple-900 text-sm">ワンカード</div>
            <div className="text-[11px] text-purple-600/80 mt-1">今日の1枚を引く</div>
          </Link>
          <Link
            href="/tarot/yes-no"
            className="rounded-2xl border-2 border-purple-200 bg-white/80 p-4 hover:border-purple-400 hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="text-2xl mb-1">✅</div>
            <div className="font-bold text-purple-900 text-sm">YES / NO</div>
            <div className="text-[11px] text-purple-600/80 mt-1">質問に答える1枚引き</div>
          </Link>
          <Link
            href="/tarot/love"
            className="rounded-2xl border-2 border-rose-200 bg-white/80 p-4 hover:border-rose-400 hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="text-2xl mb-1">💕</div>
            <div className="font-bold text-rose-900 text-sm">恋愛タロット</div>
            <div className="text-[11px] text-rose-600/80 mt-1">3枚で恋の行方を占う</div>
          </Link>
          <Link
            href="/tarot/work"
            className="rounded-2xl border-2 border-sky-200 bg-white/80 p-4 hover:border-sky-400 hover:shadow-md transition-all active:scale-[0.98]"
          >
            <div className="text-2xl mb-1">💼</div>
            <div className="font-bold text-sky-900 text-sm">仕事タロット</div>
            <div className="text-[11px] text-sky-600/80 mt-1">3枚でキャリアを占う</div>
          </Link>
        </div>

        <AdBanner />
        <RakutenWidget />

        {/* SEO テキストセクション */}
        <section className="bg-white/80 rounded-3xl shadow-sm p-5 space-y-3 text-sm text-purple-800/80 leading-relaxed">
          <h2 className="font-bold text-purple-900 text-base">無料タロット占い 4つのメニュー</h2>
          <p>
            当サイトでは大アルカナ22枚のオリジナルカードを使った4種類のタロット占いを完全無料で提供しています。
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
      </div>
    </div>
  );
}
