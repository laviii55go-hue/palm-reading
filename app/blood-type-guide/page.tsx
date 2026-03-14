import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import { BLOOD_TYPE_DATA, type BloodType } from "../data/bloodTypeData";

export const metadata: Metadata = {
  title: "血液型占いとは？A・B・O・AB型の性格と相性【入門ガイド】",
  description:
    "血液型占いの基本をわかりやすく解説。A型・B型・O型・AB型の性格特徴、恋愛傾向、相性の基本、よくある質問まで。初めての方でも楽しめる入門ガイドです。",
};

const BLOOD_TYPES: BloodType[] = ["A", "B", "O", "AB"];

const FAQS = [
  {
    q: "血液型占いは科学的に根拠がありますか？",
    a: "血液型と性格の関係は、医学的・科学的には証明されていません。血液型の分類（ABO式）は血液の抗原の違いによるもので、性格とは無関係です。ただし日本では古くから親しまれており、コミュニケーションのきっかけや自己理解の参考として楽しまれています。",
  },
  {
    q: "血液型占いはいつ頃から始まったの？",
    a: "現代の血液型性格論は、1920年代に日本の心理学者・古川竹二が提唱したのが始まりとされています。1970年代に能見正比古氏の著書がベストセラーとなり、日本で広く普及しました。",
  },
  {
    q: "相性が悪い血液型とは付き合えませんか？",
    a: "相性はあくまで傾向を示すものです。相性が「注意」とされる組み合わせでも、お互いの違いを理解し尊重することで良い関係を築けます。むしろ相性を知ることで、どこに配慮が必要かが分かり、関係が改善することもあります。",
  },
  {
    q: "Rh（＋/−）の違いは性格に影響しますか？",
    a: "一般的な血液型占いでは、A・B・O・ABの4型のみを扱います。Rh（＋/−）は性格診断には含まれていません。",
  },
  {
    q: "血液型の割合は？",
    a: "日本人の割合はおおよそ、A型約40%、O型約30%、B型約20%、AB型約10%です。国によって割合は大きく異なります。",
  },
];

const TOC = [
  { href: "#what", label: "血液型占いとは？" },
  { href: "#types", label: "4つの血液型の特徴" },
  { href: "#compat", label: "相性の基本" },
  { href: "#faq", label: "よくある質問" },
];

export default function BloodTypeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-rose-600 text-sm hover:underline">
              ← トップへ
            </Link>
            <Link href="/blood-type" className="text-rose-600 text-sm hover:underline">
              血液型占いへ
            </Link>
          </div>
          <span className="text-xs text-gray-400">血液型占い入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">
        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🩸</div>
          <h1 className="text-2xl font-black text-rose-900">血液型占いとは？</h1>
          <p className="text-rose-600 text-sm">
            A・B・O・AB型の性格と相性 入門ガイド
          </p>
        </div>

        {/* 目次 */}
        <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
          <h2 className="font-bold text-rose-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-rose-600 text-sm hover:underline flex items-center gap-2"
                >
                  <span className="text-rose-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 血液型占いとは */}
        <section id="what" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            🩸 血液型占いとは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            血液型占いは、A型・B型・O型・AB型の4つの血液型によって、性格・行動傾向・恋愛スタイル・相性を読み解く占術です。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            日本では古くから親しまれており、初対面の話題や自己理解のヒントとして多くの人に愛用されています。
            科学的な根拠はありませんが、コミュニケーションのきっかけや「自分を知る」参考として活用されています。
          </p>
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
            💡 <span className="font-semibold">血液型占いはエンターテイメントです。</span>
            性格や相性は人それぞれ。あくまで楽しむための参考としてお使いください。
          </div>
        </section>

        {/* 4つの血液型の特徴 */}
        <section id="types" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            🩸 4つの血液型の特徴
          </h2>
          <div className="space-y-4">
            {BLOOD_TYPES.map((type) => {
              const entry = BLOOD_TYPE_DATA[type];
              const colors: Record<BloodType, string> = {
                A: "border-red-200 bg-red-50",
                B: "border-yellow-200 bg-yellow-50",
                O: "border-blue-200 bg-blue-50",
                AB: "border-purple-200 bg-purple-50",
              };
              return (
                <div
                  key={type}
                  className={`rounded-2xl p-4 border-2 ${colors[type]} shadow-sm`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-3xl">{entry.emoji}</span>
                    <div>
                      <div className="font-black text-gray-800">
                        {entry.type}型
                      </div>
                      <div className="text-xs text-rose-600 font-medium">
                        {entry.title}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed mb-2">
                    {entry.personality}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="bg-white/80 text-rose-700 rounded-full px-2 py-0.5 text-xs font-medium"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <AdBanner />

        {/* 相性の基本 */}
        <section id="compat" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            💕 相性の基本
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            血液型占いでは、組み合わせによって相性の傾向があるとされています。以下はよく言われる相性の例です。
          </p>
          <div className="space-y-3">
            <div className="rounded-2xl border-2 border-green-200 bg-green-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">✨</span>
                <span className="font-bold text-green-800 text-sm">
                  相性バッチリの例
                </span>
              </div>
              <ul className="text-gray-600 text-xs space-y-1">
                <li>・A型 × O型：お互いの強みを活かせる</li>
                <li>・B型 × O型：大らかさが自由さを包み込む</li>
                <li>・B型 × AB型：個性を理解し合える</li>
              </ul>
            </div>
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">⚠️</span>
                <span className="font-bold text-amber-800 text-sm">
                  相性に注意の例
                </span>
              </div>
              <ul className="text-gray-600 text-xs space-y-1">
                <li>・A型 × B型：ペースの違いが気になることも</li>
                <li>・お互いのスタイルを認め合うことが大切</li>
              </ul>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center">
            ※相性の詳細は血液型占いページの相性診断でご確認ください
          </p>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <p className="font-bold text-rose-700 text-sm mb-2">
                  Q. {faq.q}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A. {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        <RakutenWidget />

        {/* 実際に試す */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">🩸</div>
          <div className="font-black text-xl">実際に血液型占いを試す</div>
          <p className="text-rose-200 text-sm">
            性格診断と相性診断が無料で楽しめます
          </p>
          <Link
            href="/blood-type"
            className="block bg-white text-rose-600 font-bold py-3 rounded-2xl hover:bg-rose-50 transition-colors"
          >
            🩸 血液型占いを始める →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-rose-400 text-sm hover:underline">
            △ TOPに戻る
          </a>
        </div>

        <FooterLinks className="text-center pt-2" />
      </div>
    </div>
  );
}
