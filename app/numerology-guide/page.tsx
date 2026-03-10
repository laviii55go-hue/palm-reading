import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";

export const metadata: Metadata = {
  title: "数秘術とは？ライフパスナンバーの計算方法と各数字の意味",
  description:
    "数秘術の基本をわかりやすく解説。ライフパスナンバーの計算方法、1〜9とマスターナンバー（11・22・33）の意味、今年の個人年数、相性診断の見方まで。初めての方でも楽しめる入門ガイドです。",
};

const NUMBERS = [
  { num: 1,  emoji: "🔥", title: "開拓者",        keywords: "リーダーシップ・独立・行動力",  color: "from-red-50 to-orange-50",    border: "border-red-200",    text: "text-red-700" },
  { num: 2,  emoji: "🌙", title: "調和の人",      keywords: "協調・直感・思いやり",          color: "from-slate-50 to-blue-50",   border: "border-slate-200",  text: "text-slate-700" },
  { num: 3,  emoji: "✨", title: "表現者",        keywords: "創造性・社交性・楽観性",        color: "from-yellow-50 to-amber-50", border: "border-yellow-200", text: "text-yellow-700" },
  { num: 4,  emoji: "🏛️", title: "堅実な建設者",  keywords: "誠実・忍耐・組織力",            color: "from-green-50 to-emerald-50",border: "border-green-200",  text: "text-green-700" },
  { num: 5,  emoji: "🌟", title: "自由人",        keywords: "自由・冒険・変化・多才",        color: "from-teal-50 to-cyan-50",    border: "border-teal-200",   text: "text-teal-700" },
  { num: 6,  emoji: "💖", title: "愛の守護者",    keywords: "愛情・責任感・奉仕・美",        color: "from-pink-50 to-rose-50",    border: "border-pink-200",   text: "text-pink-700" },
  { num: 7,  emoji: "🔮", title: "探求者",        keywords: "知性・内省・霊性・分析力",      color: "from-purple-50 to-violet-50",border: "border-purple-200", text: "text-purple-700" },
  { num: 8,  emoji: "💎", title: "権力者",        keywords: "野心・成功・リーダーシップ",    color: "from-gray-50 to-slate-50",   border: "border-gray-200",   text: "text-gray-700" },
  { num: 9,  emoji: "🌏", title: "人道主義者",    keywords: "奉仕・慈悲・普遍的な愛",        color: "from-indigo-50 to-blue-50",  border: "border-indigo-200", text: "text-indigo-700" },
];

const MASTER_NUMBERS = [
  { num: 11, emoji: "⚡", title: "光の使者",          desc: "極めて高い直感力と霊的感受性を持つ。インスピレーションで周囲を照らす存在。" },
  { num: 22, emoji: "🏗️", title: "マスタービルダー",  desc: "壮大なビジョンを現実に変える実行力を持つ。世界規模の遺産を残す可能性がある。" },
  { num: 33, emoji: "🕊️", title: "奉仕の師",          desc: "無条件の愛と深い慈悲心を持つ最高位の数字。愛によって世界を変える使命を持つ。" },
];

const PERSONAL_YEAR_THEMES = [
  { year: 1, theme: "新しいスタートの年",    hint: "挑戦・種まき" },
  { year: 2, theme: "関係と協力の年",        hint: "忍耐・パートナー" },
  { year: 3, theme: "表現と創造の年",        hint: "喜び・発信" },
  { year: 4, theme: "基盤固めの年",          hint: "努力・土台作り" },
  { year: 5, theme: "変化と自由の年",        hint: "転換・冒険" },
  { year: 6, theme: "愛と責任の年",          hint: "家族・奉仕" },
  { year: 7, theme: "内省と成長の年",        hint: "学び・内面充実" },
  { year: 8, theme: "豊かさと達成の年",      hint: "成功・収穫" },
  { year: 9, theme: "完成と手放しの年",      hint: "感謝・締めくくり" },
];

const FAQS = [
  {
    q: "数秘術は科学的に証明されていますか？",
    a: "数秘術は科学的な根拠を持つものではなく、古代から伝わる伝統的な象徴体系です。ピタゴラスの時代から数字には神聖な意味があるとされてきました。占いと同様に、自己理解のヒントや人生の傾向を探るためのツールとして楽しんでください。",
  },
  {
    q: "マスターナンバーは特別に良い（または悪い）のですか？",
    a: "マスターナンバー（11・22・33）は「特別な使命を持つ数字」とされますが、良い・悪いという評価はありません。むしろ高い感受性やプレッシャーを抱えやすい側面もあります。重要なのはその数字のエネルギーをどう活かすかです。",
  },
  {
    q: "ライフパスナンバーが同じ人は同じ運命ですか？",
    a: "いいえ。ライフパスナンバーは生まれ持った傾向・素質を示すものであり、実際の人生は環境・努力・選択によって大きく異なります。同じ数字でも表れ方は人それぞれです。あくまで自己理解の参考としてお使いください。",
  },
  {
    q: "個人年数はいつから始まりますか？",
    a: "個人年数は1月1日から12月31日までの暦年で区切ります。誕生日からではなくその年の1月1日から新しい個人年が始まります。年末年始に翌年の個人年数を確認しておくと、年間計画の参考になります。",
  },
  {
    q: "相性が低い数字の人とは付き合えませんか？",
    a: "相性スコアはあくまで傾向であり、低い相性でもうまくいくカップルや友人は多くいます。むしろ相性の「違い」を知ることで、お互いの摩擦ポイントを理解し対処できるようになります。数字に縛られすぎずに活用してください。",
  },
];

export default function NumerologyGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-violet-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/lucky-number" className="text-violet-500 text-sm hover:underline">← 数秘術占いへ</Link>
          <span className="text-xs text-gray-400">数秘術入門ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">

        {/* タイトル */}
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">🔢</div>
          <h1 className="text-2xl font-bold text-violet-900 leading-tight">
            数秘術の基本知識
          </h1>
          <p className="text-gray-500 text-sm">
            ライフパスナンバーの計算方法から各数字の意味まで、数秘術の入門ガイドです
          </p>
        </div>

        {/* 目次 */}
        <nav className="rounded-2xl border-2 border-violet-100 bg-white shadow-sm overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-purple-600 px-4 py-2.5 flex items-center gap-2">
            <span className="text-white text-sm">📋</span>
            <span className="text-white font-bold text-sm">目次</span>
          </div>
          <ol className="divide-y divide-violet-50">
            {[
              { href: "#what",     emoji: "📖", label: "数秘術とは？" },
              { href: "#calc",     emoji: "🔢", label: "ライフパスナンバーの計算方法" },
              { href: "#numbers",  emoji: "✨", label: "1〜9の各数字の意味" },
              { href: "#master",   emoji: "⚡", label: "マスターナンバー（11・22・33）" },
              { href: "#year",     emoji: "📅", label: "今年の個人年数とは？" },
              { href: "#compat",   emoji: "💞", label: "相性診断の見方" },
              { href: "#faq",      emoji: "❓", label: "よくある質問" },
              { href: "#try",      emoji: "🔮", label: "実際に数秘術を試す" },
            ].map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-violet-50 transition-colors"
              >
                <span className="text-violet-400 text-xs font-bold w-4 shrink-0">{i + 1}</span>
                <span className="text-base shrink-0">{item.emoji}</span>
                <span className="text-sm text-gray-700 font-medium">{item.label}</span>
                <span className="ml-auto text-violet-300 text-xs">↓</span>
              </a>
            ))}
          </ol>
        </nav>

        {/* 数秘術とは */}
        <section id="what" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <span>📖</span> 数秘術とは？
          </h2>
          <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-4 space-y-3">
            <p className="text-gray-600 text-sm leading-relaxed">
              数秘術（Numerology）は、古代から伝わる「数字に宇宙のエネルギーが宿る」という考え方に基づいた占術です。古代ギリシャの数学者ピタゴラスが体系化したとされ、数千年の歴史を持ちます。
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              生年月日から算出した「ライフパスナンバー」は、あなたの性格・才能・人生のテーマを示す最も重要な数字です。手相占いが「手の形」から運命を読むように、数秘術は「数字」から本質を読み解きます。
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { emoji: "🏛️", label: "起源", sub: "古代ギリシャ" },
              { emoji: "🔢", label: "基本", sub: "1〜9の数字" },
              { emoji: "⚡", label: "特別", sub: "マスターナンバー" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-violet-100 bg-white p-3 shadow-sm">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-xs font-bold text-violet-700">{item.label}</div>
                <div className="text-[10px] text-gray-400">{item.sub}</div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* 計算方法 */}
        <section id="calc" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <span>🔢</span> ライフパスナンバーの計算方法
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            生年月日のすべての数字を足し合わせ、1桁になるまで繰り返します。ただし 11・22・33 が出た場合はマスターナンバーとしてそのまま残します。
          </p>

          {/* 計算例 */}
          <div className="rounded-2xl border-2 border-violet-200 bg-white p-4 space-y-3">
            <p className="font-bold text-violet-700 text-sm">📌 計算例：1990年3月15日生まれ</p>
            <div className="space-y-2">
              {[
                { step: "①", label: "生年月日の数字をすべて並べる", val: "1, 9, 9, 0, 3, 1, 5" },
                { step: "②", label: "すべて足す", val: "1+9+9+0+3+1+5 = 28" },
                { step: "③", label: "2桁なのでさらに足す", val: "2+8 = 10" },
                { step: "④", label: "まだ2桁なのでもう一度", val: "1+0 = 1" },
              ].map((s) => (
                <div key={s.step} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center shrink-0">{s.step}</span>
                  <div>
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-sm font-bold text-violet-800 font-mono">{s.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-violet-50 border border-violet-200 px-4 py-3 text-center">
              <span className="text-xs text-gray-500">ライフパスナンバー → </span>
              <span className="text-2xl font-black text-violet-700">1</span>
              <span className="text-sm text-violet-600 ml-2">🔥 開拓者</span>
            </div>
          </div>

          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
            💡 <span className="font-semibold">マスターナンバーに注意：</span>
            途中の合計が 11、22、33 になった場合はそれ以上足さず、マスターナンバーとして扱います。例：合計が 29 → 2+9=11 → そのまま 11（マスターナンバー）。
          </div>
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* 各数字の意味 */}
        <section id="numbers" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <span>✨</span> 1〜9の各数字の意味
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {NUMBERS.map((n) => (
              <div key={n.num} className={`rounded-2xl border-2 ${n.border} bg-gradient-to-br ${n.color} p-4`}>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center font-black text-lg ${n.text} shadow-sm shrink-0`}>
                    {n.num}
                  </div>
                  <div className="text-2xl">{n.emoji}</div>
                  <div>
                    <p className={`font-bold text-sm ${n.text}`}>{n.title}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{n.keywords}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* マスターナンバー */}
        <section id="master" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <span>⚡</span> マスターナンバー（11・22・33）
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            マスターナンバーは通常の1〜9より高い波動を持つとされる特別な数字です。非常に稀で、その数字を持つ人は強い使命感や感受性を抱えやすいとされています。
          </p>
          <div className="space-y-3">
            {MASTER_NUMBERS.map((m) => (
              <div key={m.num} className="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center font-black text-sm text-white shadow-sm shrink-0">
                    {m.num}
                  </div>
                  <div className="text-2xl">{m.emoji}</div>
                  <div>
                    <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full font-bold">Master</span>
                    <p className="font-bold text-sm text-yellow-800 mt-0.5">{m.title}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* 個人年数 */}
        <section id="year" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <span>📅</span> 今年の個人年数とは？
          </h2>
          <div className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-purple-50 p-4 space-y-2">
            <p className="text-gray-600 text-sm leading-relaxed">
              数秘術には9年で一巡する「個人年サイクル」があります。今年の西暦＋生まれ月・日を足して1桁にした数字が「個人年数」です。
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーが「生涯を通じた本質」なのに対し、個人年数は「今年1年間のテーマ」を示します。
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {PERSONAL_YEAR_THEMES.map((p) => (
              <div key={p.year} className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-2.5 shadow-sm">
                <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 font-black text-sm flex items-center justify-center shrink-0">
                  {p.year}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-gray-700">{p.theme}</span>
                </div>
                <span className="text-xs text-violet-500 shrink-0">{p.hint}</span>
              </div>
            ))}
          </div>
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* 相性診断の見方 */}
        <section id="compat" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
            <span>💞</span> 相性診断の見方
          </h2>
          <p className="text-gray-500 text-xs leading-relaxed">
            2人のライフパスナンバーを組み合わせることで、関係の傾向を読み解けます。相性スコア（★1〜5）と3つのカテゴリで確認できます。
          </p>
          <div className="grid grid-cols-3 gap-2 text-center">
            {[
              { emoji: "💕", label: "恋愛の相性", sub: "恋人・夫婦" },
              { emoji: "💼", label: "仕事の相性", sub: "同僚・上司" },
              { emoji: "🤝", label: "友情の相性", sub: "友人・知人" },
            ].map((c) => (
              <div key={c.label} className="rounded-xl border border-pink-100 bg-pink-50 p-3">
                <div className="text-xl mb-1">{c.emoji}</div>
                <div className="text-xs font-bold text-pink-700">{c.label}</div>
                <div className="text-[10px] text-gray-400">{c.sub}</div>
              </div>
            ))}
          </div>
          <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800 leading-relaxed">
            💡 <span className="font-semibold">相性スコアは参考程度に：</span>
            スコアが低くても実際にうまくいくカップルや友人は多くいます。「違い」を知って理解し合うためのツールとして活用してください。
          </div>
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* よくある質問 */}
        <section id="faq" className="space-y-4 scroll-mt-16">
          <h2 className="text-lg font-bold text-violet-800 flex items-center gap-2">
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
          <div className="text-right">
            <a href="#top" className="text-xs text-violet-400 hover:text-violet-600 hover:underline">△ TOPに戻る</a>
          </div>
        </section>

        {/* 導線 */}
        <section id="try" className="rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50 to-indigo-50 p-5 text-center space-y-3 scroll-mt-16">
          <div className="text-3xl">🔢</div>
          <p className="font-bold text-violet-800">基礎がわかったら、実際に試してみよう</p>
          <p className="text-gray-500 text-xs">生年月日を入力するだけで無料で診断できます</p>
          <Link
            href="/lucky-number"
            className="block w-full py-3 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-700 transition-colors shadow-md"
          >
            数秘術占いを始める →
          </Link>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <Link href="/"       className="text-xs text-violet-500 hover:underline">🖐 手相診断</Link>
            <Link href="/dream"  className="text-xs text-violet-500 hover:underline">🌙 夢占い</Link>
            <Link href="/guide"  className="text-xs text-violet-500 hover:underline">📖 手相ガイド</Link>
          </div>
        </section>

        <AdBanner />
        <RakutenWidget />

        <div className="text-center pt-2">
          <a href="/privacy" className="text-gray-400 text-xs hover:underline">プライバシーポリシー</a>
        </div>
      </div>
    </div>
  );
}
