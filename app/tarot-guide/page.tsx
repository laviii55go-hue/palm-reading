import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { TAROT_MAJOR_ARCANA } from "../data/tarotData";

export const metadata: Metadata = {
  title: "タロット占いとは？大アルカナ22枚の意味と正逆位置【入門ガイド】",
  description:
    "タロット占いの基本をわかりやすく解説。大アルカナ22枚の意味、正位置・逆位置の違い、3択占いの楽しみ方まで。初めての方でも楽しめる入門ガイドです。",
};

const FAQS = [
  {
    q: "タロット3択占いは毎日変わりますか？",
    a: "はい。日付に基づいたシードで3枚が決まるため、毎日異なる3枚が表示されます。同じ日なら誰がアクセスしても同じ3枚が出ます。",
  },
  {
    q: "正位置と逆位置の違いは？",
    a: "正位置はカード本来のポジティブな意味が強く出ます。逆位置は、意味が弱まる・遅れる・内面化する・注意が必要、などと解釈されます。",
  },
  {
    q: "なぜ直感で選ぶのですか？",
    a: "タロットでは「偶然」に意味があると考えます。直感で選んだカードは、無意識が引き寄せたメッセージとされ、今のあなたに必要な答えを示すとされています。",
  },
  {
    q: "大アルカナと小アルカナの違いは？",
    a: "大アルカナは22枚で、人生の大きな流れや精神的なテーマを表します。小アルカナは56枚で、日常の具体的な出来事を表します。当サイトでは大アルカナのみを使用しています。",
  },
  {
    q: "悪いカードが出たらどうすれば？",
    a: "「死神」や「塔」など一見ネガティブなカードも、変化や浄化のメッセージです。恐れず、アドバイスを参考に前向きに受け止めてください。",
  },
];

const TOC = [
  { href: "#what", label: "タロット占いとは？" },
  { href: "#major", label: "大アルカナ22枚一覧" },
  { href: "#position", label: "正位置・逆位置の意味" },
  { href: "#tips", label: "3択占いの楽しみ方" },
  { href: "#faq", label: "よくある質問" },
];

export default function TarotGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-violet-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-violet-500 text-sm hover:underline">
              ← トップへ
            </Link>
            <Link href="/tarot" className="text-violet-500 text-sm hover:underline">
              タロット占いへ
            </Link>
          </div>
          <span className="text-xs text-gray-400">タロット入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">
        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🎴</div>
          <h1 className="text-2xl font-black text-violet-900">タロット占いとは？</h1>
          <p className="text-violet-600 text-sm">大アルカナ22枚の意味と正逆位置 入門ガイド</p>
        </div>

        {/* 目次 */}
        <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
          <h2 className="font-bold text-violet-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-violet-600 text-sm hover:underline flex items-center gap-2"
                >
                  <span className="text-violet-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* タロットとは */}
        <section id="what" className="space-y-4">
          <h2 className="text-xl font-black text-violet-900 border-b-2 border-violet-200 pb-2">
            🎴 タロット占いとは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            タロットは、15世紀頃のヨーロッパで生まれたカードを使った占術です。
            <strong>78枚のカード</strong>（大アルカナ22枚＋小アルカナ56枚）で、現在の状況や未来の傾向、アドバイスを読み解きます。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            当サイトの「タロット3択占い」では、<strong>大アルカナ22枚</strong>から毎日3枚を表示。
            直感で1枚選ぶと、総合運・恋愛運・仕事運・アドバイスが表示されます。カードの正位置・逆位置によって意味が変わり、日替わりで異なる3枚が出るので、毎日楽しめます。
          </p>
        </section>

        {/* 大アルカナ22枚 */}
        <section id="major" className="space-y-4">
          <h2 className="text-xl font-black text-violet-900 border-b-2 border-violet-200 pb-2">
            🃏 大アルカナ22枚一覧
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            大アルカナは「愚者の旅」と呼ばれる物語を描いており、人生の大きな流れや精神的な成長を表します。
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TAROT_MAJOR_ARCANA.map((card) => (
              <div
                key={card.id}
                className="flex items-center gap-2 rounded-xl p-3 bg-white border border-violet-100"
              >
                <span className="text-xl">{card.emoji}</span>
                <div>
                  <span className="font-bold text-violet-800 text-sm">{card.name}</span>
                  <span className="text-gray-400 text-xs ml-1">({card.id})</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 正位置・逆位置 */}
        <section id="position" className="space-y-4">
          <h2 className="text-xl font-black text-violet-900 border-b-2 border-violet-200 pb-2">
            ⬆️ 正位置・逆位置の意味
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            タロットカードは<strong>正位置</strong>（通常の向き）と<strong>逆位置</strong>（上下逆）で意味が変わります。
          </p>
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-violet-50 border border-violet-100">
              <div className="font-bold text-violet-800 text-sm mb-1">正位置（⬆️）</div>
              <p className="text-gray-600 text-xs leading-relaxed">
                カード本来のポジティブな意味が強く出ます。素直に前向きに受け止めて。
              </p>
            </div>
            <div className="rounded-xl p-4 bg-violet-50 border border-violet-100">
              <div className="font-bold text-violet-800 text-sm mb-1">逆位置（⬇️）</div>
              <p className="text-gray-600 text-xs leading-relaxed">
                意味が弱まる・遅れる・内面化する・注意が必要、など。ネガティブというより「今はそういう時期」というメッセージです。
              </p>
            </div>
          </div>
        </section>

        {/* 楽しみ方 */}
        <section id="tips" className="space-y-4">
          <h2 className="text-xl font-black text-violet-900 border-b-2 border-violet-200 pb-2">
            💡 3択占いの楽しみ方
          </h2>
          <div className="space-y-3">
            {[
              {
                emoji: "🌅",
                tip: "朝の習慣に",
                desc: "一日の始まりに今日の運勢をチェック。選んだカードのアドバイスを意識して過ごしてみて。",
              },
              {
                emoji: "💭",
                tip: "直感を信じて選ぶ",
                desc: "考えすぎず、パッと目に入ったカードや「これ」と感じたカードを選ぶのがコツ。",
              },
              {
                emoji: "📝",
                tip: "結果をメモする",
                desc: "選んだカードとアドバイスをメモしておくと、後で振り返って気づきが得られます。",
              },
              {
                emoji: "🔄",
                tip: "もう一度占う",
                desc: "同じ日の別の時間に「もう一度占う」で再挑戦。同じ3枚から別のカードを選ぶと、違う視点が得られます。",
              },
            ].map((item) => (
              <div
                key={item.tip}
                className="bg-violet-50 rounded-2xl p-4 border border-violet-100"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="font-bold text-violet-800 text-sm">{item.tip}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-xl font-black text-violet-900 border-b-2 border-violet-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <p className="font-bold text-violet-700 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner />
        <RakutenWidget />

        {/* 実際に試す */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">🎴</div>
          <div className="font-black text-xl">タロット3択占いを試す</div>
          <p className="text-violet-200 text-sm">
            大アルカナから3枚。直感で1枚選んで今日の運勢を占う
          </p>
          <Link
            href="/tarot"
            className="block bg-white text-violet-600 font-bold py-3 rounded-2xl hover:bg-violet-50 transition-colors"
          >
            🎴 タロット占いを始める →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-violet-400 text-sm hover:underline">
            △ TOPに戻る
          </a>
        </div>
      </div>
    </div>
  );
}
