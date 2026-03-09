import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "手相の基本知識｜左手・右手の違いと主要な線の読み方",
  description:
    "手相占いの基本をわかりやすく解説。左手と右手の意味の違い、生命線・感情線・頭脳線・運命線の見方、手の丘の意味、ほくろの基礎知識まで。初めての方でも手相を楽しめる入門ガイドです。",
};

const LINES = [
  {
    emoji: "💚",
    name: "生命線",
    color: "emerald",
    border: "border-emerald-200",
    bg: "from-emerald-50 to-green-50",
    text: "text-emerald-700",
    summary: "親指の付け根を囲むように弧を描く線。健康状態・体力・生命力を示します。",
    details: [
      "長くはっきりしている → 体力・生命力が旺盛で、健康的な人生を歩みやすい",
      "短め・薄め → 体力の消耗に注意。無理をせず休養を大切に",
      "二重になっている → 「二重生命線」と呼ばれ、守護霊や強力なサポートの象徴とされる",
      "途中で切れている → 環境の変化や転機のサイン。必ずしも凶兆ではない",
    ],
  },
  {
    emoji: "💕",
    name: "感情線",
    color: "rose",
    border: "border-rose-200",
    bg: "from-rose-50 to-pink-50",
    text: "text-rose-700",
    summary: "小指の下から人差し指方向へ伸びる線。感情・恋愛・対人関係を示します。",
    details: [
      "長く深い → 感受性豊かで情熱的。恋愛にも真剣に向き合うタイプ",
      "短め → 恋愛よりも現実・実利を重視する傾向。ドライに見られがち",
      "先端が上向きにカーブ → 恋愛運が高く、良縁に恵まれやすい",
      "鎖状（波打っている） → 繊細で傷つきやすい一面がある",
    ],
  },
  {
    emoji: "🧠",
    name: "頭脳線",
    color: "sky",
    border: "border-sky-200",
    bg: "from-sky-50 to-blue-50",
    text: "text-sky-700",
    summary: "人差し指の付け根付近から横に伸びる線。知性・思考スタイル・判断力を示します。",
    details: [
      "まっすぐ横に伸びる → 論理的・現実的な思考タイプ。ビジネスに強い",
      "下向きにカーブ → 芸術的センスや想像力が豊か。クリエイティブな仕事向き",
      "長くはっきり → 集中力・思考力が高く、計画的に物事を進める",
      "生命線と始点がくっついている → 慎重で石橋を叩いて渡るタイプ",
    ],
  },
  {
    emoji: "⭐",
    name: "運命線",
    color: "violet",
    border: "border-violet-200",
    bg: "from-violet-50 to-purple-50",
    text: "text-violet-700",
    summary: "手首から中指に向かって縦に走る線。仕事運・社会的成功・人生の方向性を示します。",
    details: [
      "くっきり長い → 目標に向かって自力で道を切り開く強い意志の持ち主",
      "ない・薄い → 運命線がない人も多い。自由な生き方を選んでいるサイン",
      "途中で変化している → 転職・転機・ライフスタイルの変化を示すことが多い",
      "二股に分かれている → 複数の才能や可能性を持つ",
    ],
  },
];

const HILLS = [
  { name: "木星丘", position: "人差し指の付け根", meaning: "野心・リーダーシップ・社会的地位", emoji: "👑" },
  { name: "土星丘", position: "中指の付け根", meaning: "責任感・忍耐力・運命", emoji: "⏳" },
  { name: "太陽丘", position: "薬指の付け根", meaning: "才能・芸術性・人気運・金運", emoji: "☀️" },
  { name: "水星丘", position: "小指の付け根", meaning: "コミュニケーション能力・商才・恋愛", emoji: "💬" },
  { name: "金星丘", position: "親指の付け根（大きな膨らみ）", meaning: "愛情・活力・魅力・生命力", emoji: "💗" },
  { name: "月丘", position: "小指側の手首寄り", meaning: "直感・想像力・感受性・旅行運", emoji: "🌙" },
];

const FAQS = [
  {
    q: "線が薄くてよく見えない場合はどうすればいいですか？",
    a: "線が薄い・うっすらしているという方は珍しくありません。手を軽く握ってから開くと線が浮き出やすくなります。また、照明を少し暗くして横から光を当てると見やすくなります。",
  },
  {
    q: "左右の手で線が違う場合はどちらを見ればいいですか？",
    a: "基本的には両方を見比べることが理想です。左手（先天的な素質）と右手（後天的な努力・現状）の違いが、あなたの「生まれ持った可能性」と「現在の状態」のギャップを教えてくれます。",
  },
  {
    q: "手相は変わりますか？",
    a: "変わります。手相は皮膚のしわなので、生活習慣・考え方・行動パターンによって少しずつ変化します。3〜6か月に一度見比べてみると、自分の変化に気づきやすくなります。",
  },
  {
    q: "線がたくさんありすぎてどれが何の線かわかりません",
    a: "手相の主要な線は「生命線・感情線・頭脳線・運命線」の4本です。それ以外の細かい線は補助線で、あれば良い方向に働くことが多いと言われています。まず4本に絞って確認してみましょう。",
  },
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="text-purple-500 text-sm hover:underline">← 占いトップ</Link>
          <span className="text-xs text-gray-400">手相入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div className="text-center space-y-2">
          <div className="text-5xl">🖐</div>
          <h1 className="text-2xl font-bold text-purple-900 leading-tight">
            手相の基本知識
          </h1>
          <p className="text-gray-500 text-sm">
            左手・右手の違いから主要な線の読み方まで、手相占いの入門ガイドです
          </p>
        </div>

        {/* 目次 */}
        <nav className="rounded-2xl border-2 border-purple-100 bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 flex items-center gap-2">
            <span className="text-white text-sm">📋</span>
            <span className="text-white font-bold text-sm">目次</span>
          </div>
          <ol className="divide-y divide-purple-50">
            {[
              { href: "#hands",   emoji: "🤲", label: "左手と右手、どちらを見る？" },
              { href: "#lines",   emoji: "✍️", label: "主要な4本の線" },
              { href: "#hills",   emoji: "🏔️", label: "手の丘（マウント）の意味" },
              { href: "#faq",     emoji: "❓", label: "よくある質問" },
              { href: "#fortune", emoji: "🔮", label: "実際に手相診断を試す" },
            ].map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 transition-colors"
              >
                <span className="text-purple-400 text-xs font-bold w-4 shrink-0">{i + 1}</span>
                <span className="text-base shrink-0">{item.emoji}</span>
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <span className="ml-auto text-purple-300 text-xs">↓</span>
              </a>
            ))}
          </ol>
        </nav>

        {/* 左手・右手の違い */}
        <section id="hands" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
            <span>🤲</span> 左手と右手、どちらを見る？
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-4">
              <div className="text-2xl mb-2">🤚</div>
              <div className="font-bold text-purple-800 text-sm mb-1">左手</div>
              <div className="text-xs text-purple-600 font-semibold mb-2">先天的な運勢</div>
              <p className="text-gray-600 text-xs leading-relaxed">
                生まれ持った素質・才能・潜在的な運命。変えにくい「持って生まれたもの」を示します。
              </p>
            </div>
            <div className="rounded-2xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-pink-50 p-4">
              <div className="text-2xl mb-2">✋</div>
              <div className="font-bold text-rose-800 text-sm mb-1">右手</div>
              <div className="text-xs text-rose-600 font-semibold mb-2">後天的な運勢</div>
              <p className="text-gray-600 text-xs leading-relaxed">
                努力・経験・現在の状態。日々の行動や考え方によって変化しやすい「今のあなた」を示します。
              </p>
            </div>
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
            💡 <span className="font-semibold">基本的には利き手と逆の手が「本来の自分」を示すとされています。</span>
            右利きなら左手が先天運、左利きなら右手が先天運です。両手を見比べることで、生まれ持った可能性と現在の状態のギャップがわかります。
          </div>
        </section>

        {/* 主要4本線 */}
        <section id="lines" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
            <span>✍️</span> 主要な4本の線
          </h2>

          {/* 基本4線の画像 */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs rounded-2xl overflow-hidden border-2 border-purple-100 bg-white shadow-sm">
              <Image
                src="/lines/基本4線.png"
                alt="手相の主要4本線（生命線・感情線・頭脳線・運命線）"
                width={800}
                height={1000}
                quality={100}
                unoptimized
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          </div>

          {/* カラー凡例 */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { color: "bg-emerald-500", label: "生命線", sub: "健康・体力・生命力" },
              { color: "bg-sky-500",     label: "頭脳線", sub: "知性・思考・判断力" },
              { color: "bg-pink-500",    label: "感情線", sub: "感情・恋愛・対人" },
              { color: "bg-violet-500",  label: "運命線", sub: "仕事・成功・方向性" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 bg-white rounded-xl border border-gray-100 px-3 py-2 shadow-sm">
                <span className={`w-3 h-3 rounded-full shrink-0 ${item.color}`} />
                <div>
                  <div className="text-xs font-bold text-gray-700">{item.label}</div>
                  <div className="text-[10px] text-gray-400">{item.sub}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {LINES.map((line) => (
              <div
                key={line.name}
                className={`rounded-2xl border-2 ${line.border} bg-gradient-to-br ${line.bg} p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{line.emoji}</span>
                  <span className={`font-bold text-sm ${line.text}`}>{line.name}</span>
                </div>
                <p className="text-gray-600 text-xs mb-3 leading-relaxed">{line.summary}</p>
                <ul className="space-y-1">
                  {line.details.map((d, i) => (
                    <li key={i} className="text-gray-500 text-xs leading-relaxed flex gap-1">
                      <span className="shrink-0 text-gray-300">▸</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* 手の丘 */}
        <section id="hills" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
            <span>🏔️</span> 手の丘（マウント）の意味
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            手のひらにある膨らみを「丘（マウント）」と呼びます。丘が発達しているほど、その分野のエネルギーが強いとされます。
          </p>
          <div className="grid grid-cols-2 gap-3">
            {HILLS.map((hill) => (
              <div key={hill.name} className="rounded-2xl border-2 border-gray-200 bg-white p-3">
                <div className="text-xl mb-1">{hill.emoji}</div>
                <div className="font-bold text-sm text-gray-700">{hill.name}</div>
                <div className="text-[10px] text-purple-500 mb-1">{hill.position}</div>
                <p className="text-gray-500 text-xs leading-relaxed">{hill.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        {/* よくある質問 */}
        <section id="faq" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">
            <span>❓</span> よくある質問
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
                <p className="font-semibold text-sm text-gray-800 mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-xs leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 占いへの導線 */}
        <section id="fortune" className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 text-center space-y-3 scroll-mt-16">
          <div className="text-3xl">🔮</div>
          <p className="font-bold text-purple-800">基礎がわかったら、実際に試してみよう</p>
          <p className="text-gray-500 text-xs">AIが手相から運勢を無料で鑑定します</p>
          <Link
            href="/"
            className="block w-full py-3 rounded-xl bg-purple-600 text-white font-bold text-sm hover:bg-purple-700 transition-colors shadow-md"
          >
            手相診断を始める →
          </Link>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <Link href="/special" className="text-xs text-purple-500 hover:underline">✨ 特殊手相</Link>
            <Link href="/mole" className="text-xs text-purple-500 hover:underline">🔵 ほくろ占い</Link>
            <Link href="/dream" className="text-xs text-purple-500 hover:underline">🌙 夢占い</Link>
          </div>
        </section>

        {/* フッター */}
        <div className="text-center pt-2">
          <a href="/privacy" className="text-gray-400 text-xs hover:underline">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
