import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";

export const metadata: Metadata = {
  title: "今日の運勢ランキングとは？トランシット占星術の見方【入門ガイド】",
  description:
    "今日の運勢ランキングの仕組みをわかりやすく解説。西洋占星術のトランシット（惑星配置）をもとに12星座の運勢を算出する方法、天体の重み、ランキングの活かし方まで。初めての方でも楽しめる入門ガイドです。",
};

const PLANET_WEIGHTS = [
  { name: "太陽", emoji: "☀️", weight: 3, meaning: "日々の活力・自我・生命力" },
  { name: "月", emoji: "🌙", weight: 3, meaning: "感情・ムード・無意識" },
  { name: "火星", emoji: "♂️", weight: 2, meaning: "行動力・エネルギー・情熱" },
  { name: "金星", emoji: "♀️", weight: 2, meaning: "恋愛・調和・美" },
  { name: "木星", emoji: "♃", weight: 2, meaning: "拡大・幸運・成長" },
  { name: "水星", emoji: "☿️", weight: 1, meaning: "コミュニケーション・知性" },
  { name: "土星", emoji: "♄", weight: 1, meaning: "規律・責任・構造" },
];

const ZODIAC_SIGNS = [
  { name: "牡羊座", emoji: "♈", keyword: "情熱・開拓・リーダーシップ" },
  { name: "牡牛座", emoji: "♉", keyword: "安定・豊かさ・五感" },
  { name: "双子座", emoji: "♊", keyword: "知性・コミュニケーション・好奇心" },
  { name: "蟹座", emoji: "♋", keyword: "感情・家庭・守り" },
  { name: "獅子座", emoji: "♌", keyword: "創造性・自己表現・誇り" },
  { name: "乙女座", emoji: "♍", keyword: "分析・奉仕・完璧主義" },
  { name: "天秤座", emoji: "♎", keyword: "調和・美・パートナーシップ" },
  { name: "蠍座", emoji: "♏", keyword: "深さ・変容・洞察" },
  { name: "射手座", emoji: "♐", keyword: "冒険・哲学・自由" },
  { name: "山羊座", emoji: "♑", keyword: "野心・忍耐・達成" },
  { name: "水瓶座", emoji: "♒", keyword: "革新・人道・個性" },
  { name: "魚座", emoji: "♓", keyword: "直感・共感・夢" },
];

const FAQS = [
  {
    q: "ランキングは毎日変わりますか？",
    a: "はい。その日の太陽・月・惑星の位置（トランシット）をもとに算出しているため、惑星が星座を移動するたびにランキングは変わります。同じ日なら誰がアクセスしても同じ結果になります。",
  },
  {
    q: "1位の星座が一番運が良いということですか？",
    a: "ランキングは「その日に多くの天体が滞在している星座」を上位に表示しています。占星術では、天体が集まる星座はその日のエネルギーが強く働くと考えられます。あくまで傾向の参考として、気軽に楽しんでください。",
  },
  {
    q: "自分の星座が下位でも大丈夫？",
    a: "ランキングは「今日どの星座に天体が集まっているか」を示すもので、あなたの生まれ星座の運勢そのものではありません。自分の今日の運勢は、生年月日を入力する「今日の運勢」ページでご確認ください。",
  },
  {
    q: "トランシットとは何ですか？",
    a: "トランシットは、その時点での太陽・月・惑星の実際の空の位置を指します。出生図（生まれた瞬間の惑星配置）と対比され、今の宇宙のエネルギーがどの星座に注がれているかを読み解く占星術の手法です。",
  },
  {
    q: "なぜ太陽と月の重みが大きいのですか？",
    a: "西洋占星術では太陽と月を「光体（ルミナリー）」と呼び、日々の運気に最も影響が大きいとされています。太陽は自我と活力、月は感情とムードを表し、日替わりの運勢を読むうえで重要な指標です。",
  },
];

const TOC = [
  { href: "#what", label: "今日の運勢ランキングとは？" },
  { href: "#transit", label: "トランシット（惑星配置）とは？" },
  { href: "#calc", label: "算出方法と天体の重み" },
  { href: "#zodiac", label: "12星座のキーワード" },
  { href: "#tips", label: "ランキングの活かし方" },
  { href: "#faq", label: "よくある質問" },
];

export default function DailyFortuneRankingGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-rose-500 text-sm hover:underline">← トップへ</Link>
            <Link href="/daily-fortune-ranking" className="text-rose-500 text-sm hover:underline">ランキングへ</Link>
          </div>
          <span className="text-xs text-gray-400">ランキング入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🏆</div>
          <h1 className="text-2xl font-black text-rose-900">今日の運勢ランキングとは？</h1>
          <p className="text-rose-600 text-sm">トランシット占星術の見方 入門ガイド</p>
        </div>

        {/* 目次 */}
        <div className="bg-rose-50 rounded-2xl p-5 border border-rose-100">
          <h2 className="font-bold text-rose-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-rose-600 text-sm hover:underline flex items-center gap-2">
                  <span className="text-rose-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ランキングとは */}
        <section id="what" className="space-y-4">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            🏆 今日の運勢ランキングとは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            今日の運勢ランキングは、<strong>西洋占星術のトランシット</strong>（その日の惑星配置）をもとに、12星座の運勢を1位〜12位で表示する機能です。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            太陽・月・水星・金星・火星・木星・土星の7天体が、その日にどの星座にいるかを計算し、天体が多く滞在している星座ほど上位にランク付けしています。
            占星術の理論に基づいた、日替わりの運勢傾向の参考としてお楽しみください。
          </p>
        </section>

        {/* トランシットとは */}
        <section id="transit" className="space-y-4">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            🌍 トランシット（惑星配置）とは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            トランシットは、<strong>その時点での太陽・月・惑星の実際の空の位置</strong>を指します。
            出生図（生まれた瞬間の惑星配置）と区別され、「今」の宇宙のエネルギーがどの星座に注がれているかを読み解く占星術の基本手法です。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            惑星はそれぞれ異なる速度で黄道（12星座）を巡っています。太陽は約1ヶ月で1星座、月は約2.5日で1星座を移動。
            その日の正午時点の配置をもとに、どの星座にエネルギーが集まっているかを算出しています。
          </p>
        </section>

        {/* 算出方法 */}
        <section id="calc" className="space-y-4">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            ⚖️ 算出方法と天体の重み
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            各天体がその星座にいる場合、以下の重みでスコアを加算します。スコアの合計が高い星座ほど上位に表示されます。
          </p>
          <div className="space-y-2">
            {PLANET_WEIGHTS.map((p) => (
              <div key={p.name} className="flex items-center justify-between gap-3 bg-rose-50 rounded-xl p-3 border border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="font-bold text-rose-800 text-sm">{p.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-amber-600 font-bold text-sm">重み {p.weight}</span>
                  <p className="text-gray-500 text-xs">{p.meaning}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-gray-600 text-xs leading-relaxed">
            ※ 太陽と月を「光体」として重み3、個人惑星・社会惑星を重み1〜2で設定しています。
          </p>
        </section>

        {/* 12星座のキーワード */}
        <section id="zodiac" className="space-y-4">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            ♈ 12星座のキーワード
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            各星座が持つ基本的なエネルギー。ランキング上位の星座は、その日の世の中の流れにこのエネルギーが強く働いている傾向があります。
          </p>
          <div className="grid grid-cols-2 gap-2">
            {ZODIAC_SIGNS.map((z) => (
              <div key={z.name} className="bg-white rounded-xl p-3 border border-rose-100">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{z.emoji}</span>
                  <span className="font-bold text-rose-800 text-sm">{z.name}</span>
                </div>
                <p className="text-gray-500 text-xs mt-0.5">{z.keyword}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 活かし方 */}
        <section id="tips" className="space-y-4">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            💡 ランキングの活かし方
          </h2>
          <div className="space-y-3">
            {[
              { emoji: "📅", tip: "朝の習慣に", desc: "今日の流れを掴む参考として、朝チェックする習慣をつけると一日の過ごし方のヒントになります。" },
              { emoji: "🔗", tip: "自分の運勢と組み合わせて", desc: "ランキングは全体の傾向。自分の今日の運勢は「今日の運勢」ページで生年月日を入力して確認しましょう。" },
              { emoji: "🌟", tip: "上位星座のエネルギーを参考に", desc: "1位の星座のキーワード（情熱・安定・知性など）を意識すると、その日の流れに乗りやすくなります。" },
              { emoji: "😊", tip: "気軽に楽しむ", desc: "占いはあくまで参考。ランキングを気にしすぎず、良い日もそうでない日も前向きに過ごすことが大切です。" },
            ].map((item) => (
              <div key={item.tip} className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="font-bold text-rose-800 text-sm">{item.tip}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-xl font-black text-rose-900 border-b-2 border-rose-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="font-bold text-rose-700 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <AdBanner />
        <RakutenWidget />

        {/* 実際に試す */}
        <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">🏆</div>
          <div className="font-black text-xl">今日のランキングをチェック</div>
          <p className="text-rose-200 text-sm">その日の惑星配置をもとに12星座の運勢を表示</p>
          <Link
            href="/daily-fortune-ranking"
            className="block bg-white text-rose-600 font-bold py-3 rounded-2xl hover:bg-rose-50 transition-colors"
          >
            🏆 ランキングを見る →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-rose-400 text-sm hover:underline">△ TOPに戻る</a>
        </div>
      </div>
    </div>
  );
}
