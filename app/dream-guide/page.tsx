import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";

export const metadata: Metadata = {
  title: "夢占いとは？夢の意味と読み解き方【初心者ガイド】",
  description:
    "夢占いの基本をわかりやすく解説。夢が持つ意味、よく見る夢のテーマ別解釈（空を飛ぶ・追われる・歯が抜けるなど）、夢日記のつけ方、夢占いのコツまで。初めての方でも楽しめる入門ガイドです。",
};

const COMMON_DREAMS = [
  {
    emoji: "🌤️", theme: "空を飛ぶ夢",
    meaning: "自由への強い憧れや、現実のストレスから解放されたい気持ちの表れ。高く飛べるほど自信が高まっているサインです。",
    keyword: "自由・開放感・上昇志向",
    color: "from-sky-50 to-blue-50", border: "border-sky-200", text: "text-sky-700",
  },
  {
    emoji: "🏃", theme: "追いかけられる夢",
    meaning: "逃げたい問題や責任、プレッシャーが心の奥にある状態。向き合えずにいる課題を意識しているサインです。",
    keyword: "不安・逃避・プレッシャー",
    color: "from-red-50 to-orange-50", border: "border-red-200", text: "text-red-700",
  },
  {
    emoji: "🦷", theme: "歯が抜ける夢",
    meaning: "自信喪失や老化への不安、対人関係での不安を表すことが多い夢。外見や言葉に対する意識の高まりも。",
    keyword: "不安・自己評価・変化",
    color: "from-yellow-50 to-amber-50", border: "border-yellow-200", text: "text-yellow-700",
  },
  {
    emoji: "🌊", theme: "水・海の夢",
    meaning: "感情の状態を映す夢。穏やかな海は精神的安定、荒れた海は感情の乱れや試練を示します。",
    keyword: "感情・無意識・変化",
    color: "from-teal-50 to-cyan-50", border: "border-teal-200", text: "text-teal-700",
  },
  {
    emoji: "⬇️", theme: "落ちる夢",
    meaning: "コントロールを失う不安や、何かを失う恐怖心の表れ。睡眠の入眠時に多く見られる夢でもあります。",
    keyword: "不安・喪失・緊張",
    color: "from-purple-50 to-violet-50", border: "border-purple-200", text: "text-purple-700",
  },
  {
    emoji: "🧪", theme: "試験・テストの夢",
    meaning: "評価されることへのプレッシャーや、準備不足への焦りを表します。重要な局面を前にしているときに多い夢です。",
    keyword: "評価・緊張・挑戦",
    color: "from-green-50 to-emerald-50", border: "border-green-200", text: "text-green-700",
  },
  {
    emoji: "👤", theme: "知らない人が出てくる夢",
    meaning: "自分の内面にある別の側面（シャドー）を象徴することが多い夢。その人物の印象があなたへのメッセージです。",
    keyword: "自己認識・内面・無意識",
    color: "from-indigo-50 to-blue-50", border: "border-indigo-200", text: "text-indigo-700",
  },
  {
    emoji: "🔑", theme: "道に迷う・迷子になる夢",
    meaning: "人生の目標や方向性が見えなくなっているサイン。現在の選択や進路について悩みを抱えているときに多い夢です。",
    keyword: "迷い・方向性・決断",
    color: "from-pink-50 to-rose-50", border: "border-pink-200", text: "text-pink-700",
  },
  {
    emoji: "💸", theme: "お金・財布の夢",
    meaning: "財布を落とす夢は不安の表れ、お金をもらう夢は何かを得る予感や自己価値の向上を意味します。",
    keyword: "豊かさ・価値・自己評価",
    color: "from-amber-50 to-yellow-50", border: "border-amber-200", text: "text-amber-700",
  },
];

const DREAM_COLORS = [
  { color: "赤", emoji: "🔴", meaning: "情熱・怒り・エネルギー・愛情の強さ" },
  { color: "青", emoji: "🔵", meaning: "冷静さ・信頼・悲しみ・知性" },
  { color: "黄", emoji: "🟡", meaning: "喜び・好奇心・希望・注意信号" },
  { color: "緑", emoji: "🟢", meaning: "成長・癒し・安定・自然への回帰" },
  { color: "黒", emoji: "⚫", meaning: "恐怖・未知・無意識・深層心理" },
  { color: "白", emoji: "⚪", meaning: "純粋・新始まり・平和・神聖さ" },
  { color: "紫", emoji: "🟣", meaning: "直感・霊的感受性・創造性・変容" },
];

const FAQS = [
  {
    q: "夢占いは当たりますか？",
    a: "夢占いは「予言」ではなく、潜在意識のメッセージを読み解くツールです。心理学的にも夢には深層心理の状態が反映されるとされています。あくまで自己理解や気づきを得るための参考として活用してください。",
  },
  {
    q: "悪夢ばかり見るのはなぜ？",
    a: "悪夢はストレス・不安・トラウマが影響していることが多いです。睡眠の質が下がっているサインでもあります。悪夢の内容を書き留めて「自分は何を恐れているのか」を考えてみると、気持ちの整理に役立ちます。",
  },
  {
    q: "夢を覚えていないのはなぜ？",
    a: "夢は主にレム睡眠中に見ますが、目覚め方や睡眠の深さによって記憶に残りにくいことがあります。起きた直後にすぐメモする習慣をつけると、夢の記憶が定着しやすくなります。",
  },
  {
    q: "同じ夢を繰り返し見るのはどういう意味？",
    a: "繰り返す夢（リカーリングドリーム）は、まだ解決されていない問題や感情が心の中にあるサインです。夢のテーマを参考に、現実の生活で向き合えていない課題を探ってみましょう。",
  },
  {
    q: "夢の内容は他人に話しても大丈夫？",
    a: "夢を話すこと自体は問題ありません。ただし夢は個人の深層心理を映すことが多いため、すべてを共有することは必ずしも必要ではありません。信頼できる人に話すことで、新しい気づきが得られることもあります。",
  },
];

const TOC = [
  { href: "#what", label: "夢占いとは？" },
  { href: "#psychology", label: "夢と心理学の関係" },
  { href: "#common", label: "よく見る夢テーマ9選" },
  { href: "#colors", label: "夢の中の色が持つ意味" },
  { href: "#diary", label: "夢日記のつけ方" },
  { href: "#tips", label: "夢占いを活かすコツ" },
  { href: "#faq", label: "よくある質問" },
];

export default function DreamGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-indigo-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-indigo-500 text-sm hover:underline">← トップへ</Link>
            <Link href="/dream" className="text-indigo-500 text-sm hover:underline">夢占いへ</Link>
          </div>
          <span className="text-xs text-gray-400">夢占い入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🌙</div>
          <h1 className="text-2xl font-black text-indigo-900">夢占いとは？</h1>
          <p className="text-indigo-600 text-sm">夢の意味と読み解き方 入門ガイド</p>
        </div>

        {/* 目次 */}
        <div className="bg-indigo-50 rounded-2xl p-5 border border-indigo-100">
          <h2 className="font-bold text-indigo-800 mb-3 text-sm">📋 目次</h2>
          <ul className="space-y-2">
            {TOC.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-indigo-600 text-sm hover:underline flex items-center gap-2">
                  <span className="text-indigo-300">▶</span> {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 夢占いとは */}
        <section id="what" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            🌙 夢占いとは？
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            夢占いは、睡眠中に見た夢の内容から、潜在意識のメッセージや心理状態を読み解く占術です。
            古代エジプト・ギリシャ・日本の神社でも夢は神のお告げとして重視されてきました。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            現代では心理学的なアプローチとも結びつき、夢はストレス・願望・恐怖・解決されていない感情を映し出す「心の鏡」として捉えられています。
            夢占いは予言ではなく、<strong>「今の自分の心に気づくヒント」</strong>として活用するのが最も有効です。
          </p>
          <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
            <p className="text-indigo-800 text-sm font-medium">✨ 夢占いで分かること</p>
            <ul className="mt-2 space-y-1 text-sm text-gray-600">
              <li>・今の心理状態・ストレスの原因</li>
              <li>・深層心理にある願望や恐怖</li>
              <li>・解決できていない問題のヒント</li>
              <li>・直感的なアドバイスやメッセージ</li>
            </ul>
          </div>
        </section>

        {/* 夢と心理学 */}
        <section id="psychology" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            🧠 夢と心理学の関係
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            精神分析の創始者フロイトは「夢は抑圧された欲望の表れ」と述べ、心理学者ユングは「夢は自己成長のためのメッセージ」と位置づけました。
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
              <div className="font-bold text-blue-700 text-sm mb-2">💤 レム睡眠</div>
              <p className="text-xs text-gray-600">鮮明な夢を見るのはレム睡眠中。眠りが浅く脳が活発に動いている状態で、記憶の整理も行われます。</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
              <div className="font-bold text-purple-700 text-sm mb-2">🌙 ノンレム睡眠</div>
              <p className="text-xs text-gray-600">深い眠りの状態。この時期の夢は断片的で記憶に残りにくいですが、身体の回復に重要な役割を果たします。</p>
            </div>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            夢を見ることは脳の正常な働きであり、感情の処理・記憶の整理・創造的な問題解決にも関わっていると言われています。
            多くの発明家や芸術家が夢からインスピレーションを得たエピソードも数多く残っています。
          </p>
        </section>

        {/* よく見る夢テーマ */}
        <section id="common" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            🌟 よく見る夢テーマ9選
          </h2>
          <p className="text-gray-700 text-sm">特定のテーマの夢は多くの人が共通して見ます。それぞれの意味を知っておきましょう。</p>
          <div className="space-y-3">
            {COMMON_DREAMS.map((dream) => (
              <div key={dream.theme} className={`bg-gradient-to-r ${dream.color} rounded-2xl p-4 border ${dream.border}`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{dream.emoji}</span>
                  <div>
                    <div className={`font-bold text-sm ${dream.text}`}>{dream.theme}</div>
                    <div className="text-xs text-gray-400">{dream.keyword}</div>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{dream.meaning}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center">※夢の解釈は夢全体の文脈や感情によって異なります</p>
        </section>

        <AdBanner />

        {/* 夢の色 */}
        <section id="colors" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            🎨 夢の中の色が持つ意味
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            夢の中で印象的だった色は、感情状態のヒントになります。目覚めたときに「何色が印象的だったか」を意識してみましょう。
          </p>
          <div className="grid grid-cols-1 gap-2">
            {DREAM_COLORS.map((c) => (
              <div key={c.color} className="flex items-center gap-3 bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
                <span className="text-2xl">{c.emoji}</span>
                <div>
                  <span className="font-bold text-gray-800 text-sm">{c.color}：</span>
                  <span className="text-gray-600 text-sm">{c.meaning}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 夢日記 */}
        <section id="diary" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            📓 夢日記のつけ方
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            夢は目覚めから5〜10分で急速に忘れてしまいます。夢日記をつけることで夢の記憶力が向上し、パターンや深層心理の傾向が見えてきます。
          </p>
          <div className="space-y-3">
            {[
              { step: "1", title: "枕元にメモを置く", desc: "スマホのメモアプリでもOK。目覚めてすぐに記録できる環境を整えておきましょう。" },
              { step: "2", title: "起きた直後に書く", desc: "夢の記憶は急速に消えるため、目覚め直後すぐに書き始めることが大切です。" },
              { step: "3", title: "感情も記録する", desc: "ストーリーだけでなく「嬉しかった」「怖かった」など感情も記録することで解釈の精度が上がります。" },
              { step: "4", title: "印象的な場面・色・人物を書く", desc: "細部まで思い出せなくても大丈夫。印象に残った断片だけでも記録しましょう。" },
              { step: "5", title: "週に一度読み返す", desc: "繰り返すテーマや象徴に気づくことで、潜在意識のパターンが見えてきます。" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-black text-sm flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <div className="font-bold text-gray-800 text-sm">{item.title}</div>
                  <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 活かすコツ */}
        <section id="tips" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            💡 夢占いを活かすコツ
          </h2>
          <div className="space-y-3">
            {[
              { emoji: "🎯", tip: "夢全体の「感情」を重視する", desc: "出来事の内容より、夢の中で感じた感情（怖い・嬉しい・悲しい）がより重要なメッセージを持っています。" },
              { emoji: "🔄", tip: "繰り返し見る夢に注目する", desc: "同じテーマの夢を何度も見るなら、解決できていない問題や深層心理からの強いメッセージである可能性があります。" },
              { emoji: "📅", tip: "現実の出来事と照らし合わせる", desc: "夢は現実の体験と強く結びついています。最近のストレスや感情的な出来事と関連させて解釈しましょう。" },
              { emoji: "🌸", tip: "良い夢はそのまま楽しむ", desc: "すべての夢を深読みする必要はありません。楽しい夢は心が求めている喜びのサインとして素直に受け取りましょう。" },
              { emoji: "🎭", tip: "登場人物は自分の一面かもしれない", desc: "夢に出てくる他人は、自分自身の内面の別の側面を象徴することが多いです。その人物の印象や感情に注目しましょう。" },
            ].map((item) => (
              <div key={item.tip} className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{item.emoji}</span>
                  <span className="font-bold text-indigo-800 text-sm">{item.tip}</span>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="space-y-4">
          <h2 className="text-xl font-black text-indigo-900 border-b-2 border-indigo-200 pb-2">
            ❓ よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                <p className="font-bold text-indigo-700 text-sm mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-sm leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <RakutenWidget />

        {/* 実際に試す */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="text-4xl">🌙</div>
          <div className="font-black text-xl">実際に夢占いを試す</div>
          <p className="text-indigo-200 text-sm">見た夢のキーワードを入力するとAIが詳しく解釈します</p>
          <Link
            href="/dream"
            className="block bg-white text-indigo-600 font-bold py-3 rounded-2xl hover:bg-indigo-50 transition-colors"
          >
            🌙 夢占いを始める →
          </Link>
        </div>

        <div className="text-center">
          <a href="#top" className="text-indigo-400 text-sm hover:underline">△ TOPに戻る</a>
        </div>
      </div>
    </div>
  );
}
