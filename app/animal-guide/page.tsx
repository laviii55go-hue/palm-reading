import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { ANIMALS, SUBTYPES } from "../data/animalData";

export const metadata: Metadata = {
  title: "動物占いとは？12動物の特徴と相性の見方【入門ガイド】",
  description:
    "動物占いの基本をわかりやすく解説。生年月日から分かる60種の動物キャラクター、12動物の性格・相性・恋愛傾向、5つのサブタイプの意味まで。初めての方でも楽しめる入門ガイドです。",
};

const GROUP_INFO = [
  { id: 0, name: "行動派", emoji: "🔥", desc: "情熱的で積極的、リーダーシップを持つグループ", animals: ["ライオン", "トラ", "チーター"] },
  { id: 1, name: "安定派", emoji: "🌳", desc: "誠実で堅実、信頼できる安定感を持つグループ", animals: ["オオカミ", "クマ", "ゾウ"] },
  { id: 2, name: "社交派", emoji: "✨", desc: "明るく社交的、人を楽しませる才能を持つグループ", animals: ["サル", "タヌキ", "ペガサス"] },
  { id: 3, name: "感性派", emoji: "🌸", desc: "繊細で感受性豊か、深い共感力を持つグループ", animals: ["コアラ", "ヒツジ", "ウサギ"] },
];

const COMPAT_TABLE = [
  { groupA: "行動派🔥", groupB: "行動派🔥", score: 3, comment: "競合しやすいが同じ目標を持てば最強" },
  { groupA: "行動派🔥", groupB: "安定派🌳", score: 4, comment: "行動力と安定感が補い合う良い組み合わせ" },
  { groupA: "行動派🔥", groupB: "社交派✨", score: 5, comment: "情熱と機転が融合する最高の相性" },
  { groupA: "行動派🔥", groupB: "感性派🌸", score: 2, comment: "ペースの違いが摩擦になりやすい" },
  { groupA: "安定派🌳", groupB: "安定派🌳", score: 5, comment: "深い信頼で結ばれる理想の関係" },
  { groupA: "安定派🌳", groupB: "社交派✨", score: 3, comment: "価値観の違いはあるが補完し合える" },
  { groupA: "安定派🌳", groupB: "感性派🌸", score: 5, comment: "安定感と繊細さが深い絆を育てる" },
  { groupA: "社交派✨", groupB: "社交派✨", score: 4, comment: "楽しく明るい関係、飽きない工夫を" },
  { groupA: "社交派✨", groupB: "感性派🌸", score: 4, comment: "明るさと共感力が引き立て合う" },
  { groupA: "感性派🌸", groupB: "感性派🌸", score: 4, comment: "深く理解し合える繊細な関係" },
];

const FAQS = [
  {
    q: "動物占いの計算方法は？",
    a: "生年月日をもとにした数値計算で、12種類の動物（ライオン・トラ・チーター・オオカミ・クマ・ゾウ・サル・タヌキ・コアラ・ヒツジ・ウサギ・ペガサス）と5種類のサブタイプ（黒い・白い・赤い・青い・金の）の組み合わせ、60種類のキャラクターから判定します。",
  },
  {
    q: "60種類の動物キャラはどう決まる？",
    a: "生年月日から算出した数値を12で割った余りで動物の種類が、12で割った商を5で割った余りでサブタイプが決まります。この2つの組み合わせで12×5=60種類のキャラクターが生まれます。",
  },
  {
    q: "サブタイプの「黒い・白い・赤い・青い・金の」は何を意味する？",
    a: "サブタイプは動物の基本性格に対するアクセント（修飾）です。黒い：強さと野心、白い：純粋と誠実、赤い：情熱と行動力、青い：クールと知性、金の：バランスと輝き、を表します。同じ動物でもサブタイプが違うと性格の表れ方が異なります。",
  },
  {
    q: "相性が悪い動物とは付き合えませんか？",
    a: "相性スコアはあくまで傾向を示すものです。低い相性でも互いの違いを理解し尊重することで良い関係を築けます。むしろ相性の「違い」を知ることで、どこに配慮が必要かが分かり、関係が改善することもあります。",
  },
  {
    q: "動物占いはいつ頃から始まったの？",
    a: "現代の動物占いは、東洋占星術・四柱推命・西洋占星術などを融合させた占術がベースになっています。生年月日から動物キャラクターに変換するスタイルは、古来の十二支占いをより親しみやすくアレンジしたものです。",
  },
];

const TOC = [
  { href: "#what", label: "動物占いとは？" },
  { href: "#calc", label: "判定の仕組み（60種類の理由）" },
  { href: "#animals", label: "12動物の特徴一覧" },
  { href: "#subtypes", label: "5つのサブタイプの意味" },
  { href: "#groups", label: "4グループと相性の基本" },
  { href: "#compat", label: "グループ別相性表" },
  { href: "#faq", label: "よくある質問" },
];

export default function AnimalGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-green-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-green-500 text-sm hover:underline">← トップへ</Link>
            <Link href="/animal" className="text-green-500 text-sm hover:underline">動物占いへ</Link>
          </div>
          <span className="text-xs text-gray-400">動物占い入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🐾</div>
          <h1 className="text-2xl font-black text-green-900">動物占いとは？</h1>
          <p className="text-green-600 text-sm">12動物の特徴と相性の見方 入門ガイド</p>
        </div>

        {/* 目次 */}
        <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
          <h2 className="font-bold text-green-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-green-600 text-sm hover:underline flex items-center gap-2">
                  <span className="text-green-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 動物占いとは */}
        <section id="what" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            🐾 動物占いとは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            動物占いは、生年月日から算出した数値をもとに、あなたの性格・行動傾向・対人関係のスタイルを「動物キャラクター」で表現する占術です。
            東洋占星術の十二支を発展させ、現代的に親しみやすくアレンジした手法がルーツになっています。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            12種類の動物と5種類のサブタイプの組み合わせで合計<strong>60種類</strong>のキャラクターがあり、同じ動物でも性格の表れ方に違いが生まれます。
            自分のキャラクターを知ることで、強みの活かし方・相性の良いパートナー・仕事のスタイルなどへの理解が深まります。
          </p>
        </section>

        {/* 仕組み */}
        <section id="calc" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            🔢 判定の仕組み（60種類の理由）
          </h2>
          <div className="space-y-3">
            <div className="bg-green-50 rounded-2xl p-4 border border-green-100">
              <p className="font-bold text-green-800 text-sm mb-2">🦁 動物の種類（12種類）</p>
              <p className="text-gray-600 text-xs leading-relaxed">生年月日の数値を12で割った余りで決まります。ライオン・トラ・チーター・オオカミ・クマ・ゾウ・サル・タヌキ・コアラ・ヒツジ・ウサギ・ペガサスの12種類です。</p>
            </div>
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100">
              <p className="font-bold text-emerald-800 text-sm mb-2">🎨 サブタイプ（5種類）</p>
              <p className="text-gray-600 text-xs leading-relaxed">動物の数値を5で割った余りで決まります。黒い・白い・赤い・青い・金の5種類が動物の基本性格に「色」として修飾を加えます。</p>
            </div>
            <div className="bg-teal-50 rounded-2xl p-4 border border-teal-100">
              <p className="font-bold text-teal-800 text-sm mb-2">✨ 組み合わせ = 60種類</p>
              <p className="text-gray-600 text-xs leading-relaxed">12種類の動物 × 5種類のサブタイプ = 60種類のユニークなキャラクターが生まれます。「黒いライオン」「白いコアラ」など、同じ動物でも全く異なる個性になります。</p>
            </div>
          </div>
        </section>

        {/* 12動物一覧 */}
        <section id="animals" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            🦁 12動物の特徴一覧
          </h2>
          <div className="space-y-3">
            {ANIMALS.map((animal) => (
              <div key={animal.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{animal.emoji}</span>
                  <div>
                    <div className="font-black text-gray-800">{animal.name}</div>
                    <div className="text-xs text-green-600 font-medium">{animal.title}　|　{["行動派🔥","安定派🌳","社交派✨","感性派🌸"][animal.group]}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-2">{animal.personality}</p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5">💪 {animal.strength}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <AdBanner />

        {/* サブタイプ */}
        <section id="subtypes" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            🎨 5つのサブタイプの意味
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            サブタイプは動物の基本性格に「色」のアクセントを加えるものです。同じ動物でもサブタイプが違うと性格の表れ方が大きく変わります。
          </p>
          <div className="space-y-3">
            {SUBTYPES.map((subtype) => {
              const colors = ["bg-gray-50 border-gray-200", "bg-white border-gray-200", "bg-red-50 border-red-200", "bg-blue-50 border-blue-200", "bg-yellow-50 border-yellow-200"];
              const textColors = ["text-gray-700", "text-gray-700", "text-red-700", "text-blue-700", "text-yellow-700"];
              const emojis = ["⚫", "⚪", "🔴", "🔵", "🟡"];
              return (
                <div key={subtype.id} className={`rounded-2xl p-4 border ${colors[subtype.id]}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{emojis[subtype.id]}</span>
                    <div className={`font-black ${textColors[subtype.id]}`}>{subtype.name}〇〇（{subtype.modifier}）</div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{subtype.extra}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* グループ */}
        <section id="groups" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            👥 4グループと相性の基本
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            12動物は4つのグループに分類されます。グループの傾向を知ることで、相性の方向性が大まかに分かります。
          </p>
          <div className="space-y-3">
            {GROUP_INFO.map((group) => (
              <div key={group.id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{group.emoji}</span>
                  <div className="font-black text-gray-800">{group.name}</div>
                </div>
                <p className="text-gray-500 text-xs mb-2">{group.desc}</p>
                <div className="flex gap-2 flex-wrap">
                  {group.animals.map((name) => {
                    const a = ANIMALS.find((a) => a.name === name);
                    return (
                      <span key={name} className="bg-green-50 text-green-700 rounded-full px-3 py-1 text-xs font-medium">
                        {a?.emoji} {name}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* グループ別相性表 */}
        <section id="compat" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            💞 グループ別相性表
          </h2>
          <p className="text-gray-700 text-sm">グループの組み合わせごとの相性の傾向です。</p>
          <div className="space-y-2">
            {COMPAT_TABLE.map((row, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span className="text-sm font-bold text-gray-700">{row.groupA} × {row.groupB}</span>
                  <div className="flex gap-0.5 ml-auto">
                    {Array.from({ length: 5 }, (_, j) => (
                      <span key={j} className={j < row.score ? "text-yellow-400 text-sm" : "text-gray-200 text-sm"}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-500 text-xs">{row.comment}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center">※個別の相性は動物占いページの相性診断でご確認ください</p>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-xl font-black text-green-900 border-b-2 border-green-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="font-bold text-green-700 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RakutenWidget />

        {/* 実際に試す */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">🐾</div>
          <div className="font-black text-xl">実際に動物占いを試す</div>
          <p className="text-green-200 text-sm">生年月日を入力するだけで60種類の動物キャラを判定します</p>
          <Link
            href="/animal"
            className="block bg-white text-green-600 font-bold py-3 rounded-2xl hover:bg-green-50 transition-colors"
          >
            🐾 動物占いを始める →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-green-400 text-sm hover:underline">△ TOPに戻る</a>
        </div>
      </div>
    </div>
  );
}
