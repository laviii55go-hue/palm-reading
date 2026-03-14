import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import FooterLinks from "../components/FooterLinks";
import { GAKU_LABELS } from "../data/nameFortuneData";

export const metadata: Metadata = {
  title: "姓名判断とは？五格・画数の見方【入門ガイド】",
  description:
    "姓名判断の基本をわかりやすく解説。天格・人格・地格・外格・総格の五格の意味、画数の数え方、81画の吉凶、よくある質問まで。初めての方でも楽しめる入門ガイドです。",
};

const FAQS = [
  {
    q: "姓名判断の画数はどう数える？",
    a: "漢字の画数は、その文字を書くときの「線の数」です。一般的には康熙字典（こうきじてん）を基準とした画数が使われます。本サイトでは約13,000字の漢字データベースを使用しています。",
  },
  {
    q: "ひらがなでも診断できますか？",
    a: "はい。ひらがな・カタカナの画数でも診断できます。漢字がわからない場合や、ひらがなで入力したい場合にご利用ください。",
  },
  {
    q: "五格は何を表す？",
    a: "天格は先祖・家系の運、人格は本人の性格・才能、地格は基礎運・幼少期、外格は対人関係・社会運、総格は人生全体の運勢を表します。",
  },
  {
    q: "凶の画数があると悪い？",
    a: "五格のバランスが大切です。一つの格が凶でも、他の格が吉であれば補うことができます。姓名判断はあくまで参考として、気にしすぎないようお楽しみください。",
  },
  {
    q: "81画を超える場合は？",
    a: "姓名判断では81画が最大とされ、82画以上は1画に還元されます（81画＝1画と同等）。81を超える画数は自動的に1〜81の範囲に変換して判定します。",
  },
];

const TOC = [
  { href: "#what", label: "姓名判断とは？" },
  { href: "#gaku", label: "五格の意味" },
  { href: "#fortune", label: "吉凶の種類" },
  { href: "#faq", label: "よくある質問" },
];

export default function NameFortuneGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      <div className="bg-white border-b border-cyan-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-cyan-600 text-sm hover:underline">
              ← トップへ
            </Link>
            <Link href="/name-fortune" className="text-cyan-600 text-sm hover:underline">
              姓名判断へ
            </Link>
          </div>
          <span className="text-xs text-gray-400">姓名判断入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">✍️</div>
          <h1 className="text-2xl font-black text-cyan-900">姓名判断とは？</h1>
          <p className="text-cyan-600 text-sm">五格・画数の見方 入門ガイド</p>
        </div>

        <div className="bg-cyan-50 rounded-2xl p-5 border border-cyan-100">
          <h2 className="font-bold text-cyan-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="text-cyan-600 text-sm hover:underline flex items-center gap-2"
                >
                  <span className="text-cyan-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <section id="what" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-cyan-900 border-b-2 border-cyan-200 pb-2">
            ✍️ 姓名判断とは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            姓名判断は、名前の漢字の画数から運勢を読み解く占術です。姓と名の画数をもとに「五格」を計算し、天格・人格・地格・外格・総格それぞれの吉凶を判定します。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            赤ちゃんの名付けや改名の参考として、多くの方に親しまれています。流派によって画数の数え方や吉凶の解釈が異なることがあります。
          </p>
        </section>

        <section id="gaku" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-cyan-900 border-b-2 border-cyan-200 pb-2">
            📐 五格の意味
          </h2>
          <div className="space-y-3">
            {Object.entries(GAKU_LABELS).map(([key, info]) => (
              <div
                key={key}
                className="rounded-2xl border-2 border-cyan-200 bg-cyan-50/50 p-4"
              >
                <div className="font-bold text-cyan-800">{info.name}</div>
                <p className="text-gray-600 text-xs mt-1 leading-relaxed">
                  {info.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner />

        <section id="fortune" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-cyan-900 border-b-2 border-cyan-200 pb-2">
            ✨ 吉凶の種類
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            1〜81画のそれぞれに吉凶が割り当てられています。最大吉・大吉・吉・吉凶・凶・大凶・最大凶の7段階で判定します。
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl border-2 border-emerald-300 bg-emerald-50 p-3 text-center">
              <div className="font-bold text-emerald-800 text-sm">最大吉</div>
              <div className="text-xs text-emerald-600">1,11,15,32,41,63,65,81画</div>
            </div>
            <div className="rounded-xl border-2 border-green-300 bg-green-50 p-3 text-center">
              <div className="font-bold text-green-800 text-sm">大吉</div>
              <div className="text-xs text-green-600">3,5,6,13,16,21,23,24,25,31,37,39,45,47,52,61,67画</div>
            </div>
            <div className="rounded-xl border-2 border-amber-300 bg-amber-50 p-3 text-center">
              <div className="font-bold text-amber-800 text-sm">凶</div>
              <div className="text-xs text-amber-600">12,22,27,36,42,43,46,50,62,72,78画</div>
            </div>
            <div className="rounded-xl border-2 border-red-300 bg-red-50 p-3 text-center">
              <div className="font-bold text-red-800 text-sm">最大凶</div>
              <div className="text-xs text-red-600">10,20,34,44,60,69,70,80画</div>
            </div>
          </div>
        </section>

        <section id="faq" className="space-y-4 scroll-mt-16">
          <h2 className="text-xl font-black text-cyan-900 border-b-2 border-cyan-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
              >
                <p className="font-bold text-cyan-700 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RakutenWidget />

        <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">✍️</div>
          <div className="font-black text-xl">実際に姓名判断を試す</div>
          <p className="text-cyan-200 text-sm">
            漢字・ひらがな・カタカナの名前から五格を無料診断
          </p>
          <Link
            href="/name-fortune"
            className="block bg-white text-cyan-600 font-bold py-3 rounded-2xl hover:bg-cyan-50 transition-colors"
          >
            ✍️ 姓名判断を始める →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-cyan-400 text-sm hover:underline">
            △ TOPに戻る
          </a>
        </div>

        <FooterLinks className="text-center pt-2" />
      </div>
    </div>
  );
}
