import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../data/personalityData";

export const metadata: Metadata = {
  title: "16タイプ性格診断とは？4つの軸と16タイプの特徴【入門ガイド】",
  description:
    "16タイプ性格診断の基本をわかりやすく解説。E/I・S/N・T/F・J/Pの4つの軸の意味、INTJ（建築家）やENFP（広報運動家）など16タイプの特徴、診断の受け方まで。初めての方でも楽しめる入門ガイドです。",
};

const AXES = [
  {
    dim: "E / I",
    name: "外向・内向",
    e: "E（外向）",
    i: "I（内向）",
    eDesc: "人と関わることでエネルギーが湧く。外の世界に興味が向く",
    iDesc: "一人の時間でエネルギーを回復。内面の世界に興味が向く",
  },
  {
    dim: "S / N",
    name: "感覚・直感",
    e: "S（感覚）",
    i: "N（直感）",
    eDesc: "五感で得た事実や経験を重視。具体的で現実的",
    iDesc: "パターンや可能性を重視。抽象的で想像力豊か",
  },
  {
    dim: "T / F",
    name: "思考・感情",
    e: "T（思考）",
    i: "F（感情）",
    eDesc: "論理や公平性で判断。客観的で冷静",
    iDesc: "相手の気持ちや調和で判断。共感的で温かい",
  },
  {
    dim: "J / P",
    name: "判断・知覚",
    e: "J（判断）",
    i: "P（知覚）",
    eDesc: "計画的で締め切りを守る。決断が早い",
    iDesc: "柔軟でその場の流れに合わせる。選択肢を残す",
  },
];

const FAQS = [
  {
    q: "16タイプ性格診断は科学的に信頼できますか？",
    a: "ユングの心理学的類型論に基づいた性格診断です。科学的な絶対性はありませんが、自己理解のヒントやコミュニケーションの参考として広く活用されています。あくまで傾向を示すツールとして楽しんでください。",
  },
  {
    q: "結果が毎回変わることがあります",
    a: "その時の気分や状況によって回答が変わることはあります。複数回診断して傾向を把握するのもおすすめです。また、8問では簡易版なので、より詳しく知りたい場合は本格的な診断も検討してみてください。",
  },
  {
    q: "同じタイプの人と相性が良いですか？",
    a: "同じタイプでも相性は良い場合も悪い場合もあります。むしろ異なるタイプ同士が補い合う関係になることも。タイプは「傾向」の理解に役立て、相手を型にはめずに接することが大切です。",
  },
  {
    q: "4文字のコード（INTJなど）の意味は？",
    a: "4つの軸の組み合わせを表しています。E/I・S/N・T/F・J/Pの順で、各軸でどちら寄りかを表します。例：INTJは内向・直感・思考・判断の組み合わせです。",
  },
  {
    q: "ニックネーム（建築家など）はどこから？",
    a: "各タイプの特徴を表現する愛称です。世界的に広く使われている呼び名を日本語に訳したものです。",
  },
];

const TOC = [
  { href: "#what", label: "16タイプ性格診断とは？" },
  { href: "#axes", label: "4つの軸の意味" },
  { href: "#types", label: "16タイプ一覧" },
  { href: "#faq", label: "よくある質問" },
];

// 4系統のスタイル（淡い色）
type GroupKey = "NT" | "NF" | "SJ" | "SP";
const GROUP_STYLES: Record<GroupKey, { bg: string; border: string; text: string; subText: string }> = {
  NT: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", subText: "text-purple-600" },
  NF: { bg: "bg-green-50", border: "border-green-200", text: "text-green-800", subText: "text-green-600" },
  SJ: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-800", subText: "text-blue-600" },
  SP: { bg: "bg-orange-50", border: "border-orange-200", text: "text-orange-800", subText: "text-orange-600" },
};

function getTypeGroup(code: string): GroupKey {
  const s = code[1]; // S or N
  const t = code[2]; // T or F
  const j = code[3]; // J or P
  if (s === "N" && t === "T") return "NT";
  if (s === "N" && t === "F") return "NF";
  if (s === "S" && j === "J") return "SJ";
  if (s === "S" && j === "P") return "SP";
  return "NT";
}

export default function PersonalityGuidePage() {
  const typeList = Object.entries(PERSONALITY_TYPES);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-teal-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-teal-600 text-sm hover:underline">← トップへ</Link>
            <Link href="/personality" className="text-teal-600 text-sm hover:underline">16タイプ診断へ</Link>
          </div>
          <span className="text-xs text-gray-400">入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🧠</div>
          <h1 className="text-2xl font-black text-teal-900">16タイプ性格診断とは？</h1>
          <p className="text-teal-600 text-sm">4つの軸と16タイプの特徴 入門ガイド</p>
        </div>

        {/* 目次 */}
        <div className="bg-teal-50 rounded-2xl p-5 border border-teal-100">
          <h2 className="font-bold text-teal-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-teal-600 text-sm hover:underline flex items-center gap-2">
                  <span className="text-teal-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 16タイプ性格診断とは */}
        <section id="what" className="space-y-4">
          <h2 className="text-xl font-black text-teal-900 border-b-2 border-teal-200 pb-2">
            🧠 16タイプ性格診断とは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            16タイプ性格診断は、心理学者ユングの類型論に基づいた性格診断です。
            4つの軸（外向/内向・感覚/直感・思考/感情・判断/知覚）の組み合わせで、<strong>16種類</strong>の性格タイプに分類します。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            各タイプは4文字のコード（例：INTJ）とニックネーム（例：建築家）で表され、性格の傾向・恋愛スタイル・仕事の向き・強み・弱みなどを理解するヒントになります。
            自己理解や人間関係の参考として、多くの人に親しまれています。
          </p>
        </section>

        {/* 4つの軸 */}
        <section id="axes" className="space-y-4">
          <h2 className="text-xl font-black text-teal-900 border-b-2 border-teal-200 pb-2">
            📐 4つの軸の意味
          </h2>
          <p className="text-gray-700 text-sm">診断の軸となる4つの対（8つの傾向）です。</p>
          <div className="space-y-4">
            {AXES.map((axis) => (
              <div key={axis.dim} className="bg-white rounded-2xl p-5 border border-teal-100 shadow-sm">
                <h3 className="font-bold text-teal-800 mb-3">{axis.name}（{axis.dim}）</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-teal-50 rounded-xl p-3">
                    <div className="font-bold text-teal-700 mb-1">{axis.e}</div>
                    <p className="text-gray-600 text-xs leading-relaxed">{axis.eDesc}</p>
                  </div>
                  <div className="bg-cyan-50 rounded-xl p-3">
                    <div className="font-bold text-cyan-700 mb-1">{axis.i}</div>
                    <p className="text-gray-600 text-xs leading-relaxed">{axis.iDesc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 16タイプ一覧 */}
        <section id="types" className="space-y-4">
          <h2 className="text-xl font-black text-teal-900 border-b-2 border-teal-200 pb-2">
            📋 16タイプ一覧
          </h2>
          <p className="text-gray-700 text-sm">4つの軸の組み合わせで16種類のタイプが生まれます。</p>
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="bg-purple-50 border border-purple-200 text-purple-700 rounded-full px-2.5 py-0.5 text-xs">分析家(NT)</span>
            <span className="bg-green-50 border border-green-200 text-green-700 rounded-full px-2.5 py-0.5 text-xs">外交官(NF)</span>
            <span className="bg-blue-50 border border-blue-200 text-blue-700 rounded-full px-2.5 py-0.5 text-xs">番人(SJ)</span>
            <span className="bg-orange-50 border border-orange-200 text-orange-700 rounded-full px-2.5 py-0.5 text-xs">探検家(SP)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {typeList.map(([code, t]) => {
              const group = getTypeGroup(code);
              const s = GROUP_STYLES[group];
              return (
                <Link
                  key={code}
                  href={`/personality-guide/${code}`}
                  className={`${s.bg} rounded-xl p-3 border ${s.border} shadow-sm hover:shadow-md transition-all block`}
                >
                  <div className={`font-black text-sm ${s.text}`}>{code}</div>
                  <div className={`text-xs ${s.subText}`}>（{t.nickname}）</div>
                  <div className={`${s.subText} text-[10px] mt-1 opacity-70`}>→ 詳細を見る</div>
                </Link>
              );
            })}
          </div>
        </section>

        <AdBanner />

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-xl font-black text-teal-900 border-b-2 border-teal-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="font-bold text-teal-700 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RakutenWidget />

        {/* 実際に試す */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">🧠</div>
          <div className="font-black text-xl">実際に16タイプ診断を試す</div>
          <p className="text-teal-200 text-sm">8問の質問であなたの性格タイプを診断</p>
          <Link
            href="/personality"
            className="block bg-white text-teal-600 font-bold py-3 rounded-2xl hover:bg-teal-50 transition-colors"
          >
            🧠 診断を始める →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-teal-400 text-sm hover:underline">△ TOPに戻る</a>
        </div>
      </div>
    </div>
  );
}
