import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { ROKUYO_DESC, getRokuyoStyle } from "../data/calendarData";

export const metadata: Metadata = {
  title: "六曜・開運カレンダーとは？吉日の選び方【初心者ガイド】",
  description:
    "六曜（大安・友引・先勝・先負・赤口・仏滅）の意味と開運カレンダーの見方をわかりやすく解説。結婚・契約・引っ越しなど、大切な日の吉日選びの参考に。",
};

const ROKUYO_LIST = [
  { name: "大安", emoji: "🟢" },
  { name: "友引", emoji: "🔵" },
  { name: "先勝", emoji: "🟡" },
  { name: "先負", emoji: "⚪" },
  { name: "赤口", emoji: "🔴" },
  { name: "仏滅", emoji: "⚫" },
];

const TOC = [
  { href: "#what", label: "六曜・開運カレンダーとは？" },
  { href: "#rokuyo", label: "六曜の意味一覧" },
  { href: "#usage", label: "六曜の使い方・活かし方" },
  { href: "#faq", label: "よくある質問" },
];

const FAQS = [
  {
    q: "六曜は科学的に根拠がありますか？",
    a: "六曜は中国発祥の暦注の一つで、古くから日本で親しまれてきました。科学的な根拠はありませんが、大切な日に「縁起を担ぐ」という心理的効果や、スケジュールの目安として多くの方に活用されています。",
  },
  {
    q: "結婚式は大安がいいですか？",
    a: "大安は「万事に良い日」とされ、結婚式に選ばれることが多いです。ただし、会場の空き状況やご家族の都合も大切です。六曜はあくまで参考として、無理のない日程選びを。",
  },
  {
    q: "友引に葬儀を避けるのはなぜ？",
    a: "友引は「友を引く」という意味から、弔事を行うと「友（縁者）を冥土に引き寄せる」とされ、避ける習慣があります。火葬場の休業日にもなっていることが多いです。",
  },
  {
    q: "仏滅は本当に何もしてはいけない日？",
    a: "仏滅は「万事に凶」とされますが、現代では気にしない方も増えています。急ぎの用事や、すでに決まっている予定は問題ありません。過度に気にしすぎず、心の余裕を持って。",
  },
  {
    q: "先勝・先負の「午前・午後」の境界は？",
    a: "一般的に正午（12時）を境にします。先勝は午前中に、先負は午後に用事を済ませると良いとされています。",
  },
];

export default function CalendarGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-amber-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-amber-600 text-sm hover:underline">← トップへ</Link>
            <Link href="/calendar" className="text-amber-600 text-sm hover:underline">開運カレンダーへ</Link>
          </div>
          <span className="text-xs text-gray-400">開運カレンダー入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">📅</div>
          <h1 className="text-2xl font-black text-amber-900">六曜・開運カレンダーとは？</h1>
          <p className="text-amber-600 text-sm">吉日の選び方 入門ガイド</p>
        </div>

        {/* 目次 */}
        <div className="bg-amber-50 rounded-2xl p-5 border border-amber-100">
          <h2 className="font-bold text-amber-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-amber-600 text-sm hover:underline flex items-center gap-2">
                  <span className="text-amber-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 六曜とは */}
        <section id="what" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            📅 六曜・開運カレンダーとは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            六曜（ろくよう）は、中国で生まれた暦注の一つで、日本では江戸時代から広く使われてきました。1日ごとに「大安」「友引」「先勝」「先負」「赤口」「仏滅」の6種類が順番に巡り、その日の吉凶を示します。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            開運カレンダーは、この六曜をカレンダー形式で表示し、結婚・契約・引っ越し・開店など、大切な日の吉日選びの参考にできるツールです。縁起を担ぎたいときや、スケジュールの目安として活用してみてください。
          </p>
        </section>

        {/* 六曜の意味一覧 */}
        <section id="rokuyo" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            📖 六曜の意味一覧
          </h2>
          <div className="space-y-3">
            {ROKUYO_LIST.map(({ name, emoji }) => {
              const style = getRokuyoStyle(name);
              return (
                <div key={name} className={`rounded-2xl p-4 border-2 ${style.border} ${style.bg}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{emoji}</span>
                    <span className={`font-black text-lg ${style.text}`}>{name}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{ROKUYO_DESC[name]}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 使い方 */}
        <section id="usage" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            ✨ 六曜の使い方・活かし方
          </h2>
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <p className="font-bold text-amber-800 text-sm mb-2">🟢 大安にやりたいこと</p>
              <p className="text-gray-600 text-xs leading-relaxed">結婚式・入籍・契約・開店・引っ越し・新規事業のスタートなど、人生の節目となる大切なことに最適です。</p>
            </div>
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <p className="font-bold text-blue-800 text-sm mb-2">🔵 友引の注意点</p>
              <p className="text-gray-600 text-xs leading-relaxed">慶事（結婚・お祝い）は吉ですが、弔事（葬儀・法事）は避ける習慣があります。昼は凶とされることも。</p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <p className="font-bold text-amber-800 text-sm mb-2">🟡 先勝・先負のコツ</p>
              <p className="text-gray-600 text-xs leading-relaxed">先勝は午前中に、先負は午後に用事を済ませると良いとされています。急ぎの用事は午前中に。</p>
            </div>
          </div>
        </section>

        {/* よくある質問 */}
        <section id="faq" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-amber-100 bg-white p-4">
                <p className="font-bold text-amber-800 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center space-y-3">
          <p className="text-amber-600 text-sm font-medium">開運カレンダーで吉日をチェック</p>
          <Link
            href="/calendar"
            className="block w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold text-center shadow-md hover:opacity-90 transition-opacity"
          >
            📅 開運カレンダーを開く
          </Link>
        </section>

        <AdBanner />
        <RakutenWidget />
      </div>
    </div>
  );
}
