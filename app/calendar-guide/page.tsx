import Link from "next/link";
import PageHeader from "../components/PageHeader";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import RakutenWidget from "../components/RakutenWidget";
import { ROKUYO_DESC, getRokuyoStyle } from "../data/calendarData";
import { ROKUYO_DETAIL } from "../data/rokuyoDetail";

export const metadata: Metadata = {
  title: "六曜・開運カレンダーとは？吉日の選び方【初心者ガイド】",
  description:
    "六曜（大安・友引・先勝・先負・赤口・仏滅）の意味と開運カレンダーの見方をわかりやすく解説。結婚・契約・引っ越しなど、大切な日の吉日選びの参考に。",
};

const ROKUYO_LIST = [
  { name: "大安", emoji: "🟢", slug: "taian" },
  { name: "友引", emoji: "🔵", slug: "tomobiki" },
  { name: "先勝", emoji: "🟡", slug: "senshou" },
  { name: "先負", emoji: "⚪", slug: "senbu" },
  { name: "赤口", emoji: "🔴", slug: "shakkou" },
  { name: "仏滅", emoji: "⚫", slug: "butsumetsu" },
];

const TOC = [
  { href: "#what", label: "六曜・開運カレンダーとは？" },
  { href: "#history", label: "六曜の歴史と順番" },
  { href: "#rokuyo", label: "六曜の詳細解説（6種類）" },
  { href: "#usage", label: "六曜の使い方・活かし方" },
  { href: "#events", label: "イベント別・おすすめ六曜" },
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
    a: "友引は「友を引く」という意味から、弔事を行うと「友（縁者）を冥土に引き寄せる」とされ、避ける習慣があります。火葬場の休業日にもなっていることが多いです。お通夜は翌日の葬儀が友引にあたる場合に注意してください。",
  },
  {
    q: "仏滅は本当に何もしてはいけない日？",
    a: "仏滅は「万事に凶」とされますが、現代では気にしない方も増えています。急ぎの用事や、すでに決まっている予定は問題ありません。また、仏滅は「物事をいったん滅して新しく始める日」という意味もあり、断捨離・大掃除・悪習慣の断ち切りには吉とされる解釈もあります。",
  },
  {
    q: "先勝・先負の「午前・午後」の境界は？",
    a: "一般的に正午（12時）を境にします。先勝は午前中に、先負は午後に用事を済ませると良いとされています。諸説ありますが、「14時以降」を目安に後半戦とする解釈が現代では主流です。",
  },
  {
    q: "赤口はどんな日ですか？",
    a: "赤口（しゃっこう）は、陰陽道の凶神「赤口神」が支配する日とされ、正午前後（11時〜13時）のみ吉で、それ以外は凶とされます。「赤」の字から火の元・刃物・血（事故）を連想させるため、運転や料理、刃物を使う作業は普段より慎重に。",
  },
  {
    q: "六曜の順番はどうして決まる？",
    a: "六曜は旧暦の日付に基づいて巡ります。旧暦1月1日は必ず先勝で、先勝→友引→先負→仏滅→大安→赤口の順で循環します。新暦のカレンダーで見るとランダムに見えるのは、旧暦の月替わりで順番がリセットされるためです。",
  },
  {
    q: "仏滅に結婚式を挙げる人はいますか？",
    a: "います。六曜にこだわらない方や、「仏滅割引」を活用してコストを抑えたい方が選ぶことも多いです。また、最近は「二人の記念日に合わせたい」という理由で仏滅を選ぶカップルも増えています。周囲の理解が得られるなら、自分たちの価値観で選んで大丈夫です。",
  },
  {
    q: "六曜と他の暦注（九星・十二直）の違いは？",
    a: "六曜は6種類が巡る最もシンプルな暦注で、一般の方にも覚えやすいため普及しました。九星気学は9種類、十二直は12種類、二十八宿は28種類と、より複雑で細かい暦注もあります。六曜は入り口として使い、興味が深まったら他の暦注も調べてみると面白いです。",
  },
  {
    q: "赤口の日、普段通りに過ごして大丈夫？",
    a: "問題ありません。赤口は「火の元・刃物・交通事故に普段より注意する日」と捉えれば、むしろ日常の安全意識を高めるきっかけになります。重要な契約や祝い事は避けるのが無難ですが、通常の仕事・家事・学業は特に制限する必要はありません。",
  },
];

export default function CalendarGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <PageHeader
        variant="guide"
        theme="calendar"
        subText="開運カレンダー 入門ガイド"
        links={[
          { type: "fortune", href: "/calendar" },
        ]}
      />

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
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong className="text-amber-800">六曜の4つの使い道</strong>
            </p>
            <ul className="mt-2 space-y-1 text-gray-600 text-xs leading-relaxed list-disc list-inside">
              <li>結婚・入籍など人生の節目の日取り決め</li>
              <li>引越し・契約・開業などの縁起担ぎ</li>
              <li>葬儀・法事の日程（友引は避ける）</li>
              <li>日々の行動の「今日はどんな日？」という目安</li>
            </ul>
          </div>
        </section>

        {/* 歴史と順番 */}
        <section id="history" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            📜 六曜の歴史と順番
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            六曜は<strong>中国の三国志時代（3世紀頃）</strong>に生まれたとされる暦注で、もともとは諸葛孔明が戦の吉凶を占うために考案したという伝承もあります。その後、鎌倉時代末期から室町時代にかけて日本に伝わり、江戸時代末期から明治にかけて庶民の間に広まりました。
          </p>
          <p className="text-gray-700 text-sm leading-relaxed">
            興味深いのは、<strong>六曜は「曜日」ではなく「旧暦の日」に基づいて巡っている</strong>こと。旧暦1月1日は必ず「先勝」から始まり、以下の順で6日ごとに循環します。
          </p>
          <div className="rounded-2xl bg-white border border-amber-200 p-4 text-sm text-gray-700">
            <p className="font-bold text-amber-800 mb-2">基本の順番</p>
            <p className="text-center font-mono text-base">
              先勝 → 友引 → 先負 → 仏滅 → 大安 → 赤口
            </p>
            <p className="text-xs text-gray-500 mt-3">
              ※ 旧暦の月替わりでリセットされ、各月の1日は決まった六曜から始まります（1月と7月＝先勝、2月と8月＝友引、3月と9月＝先負、4月と10月＝仏滅、5月と11月＝大安、6月と12月＝赤口）。
            </p>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            現代のカレンダーでは新暦（太陽暦）に六曜が並ぶため、一見するとランダムに見えますが、旧暦で追うと規則的に巡っています。明治以降、政府は一度「迷信」として六曜の使用を禁じましたが、庶民の間では根強く残り、現代まで使われ続けています。
          </p>
        </section>

        {/* 六曜の詳細解説 */}
        <section id="rokuyo" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            📖 六曜の詳細解説（6種類）
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            六曜それぞれの<strong>読み方・由来・時間帯の吉凶・具体的に向いている行動／避けたい行動・現代的な付き合い方</strong>を詳しく紹介します。
          </p>
          <div className="space-y-5">
            {ROKUYO_LIST.map(({ name, emoji, slug }) => {
              const style = getRokuyoStyle(name);
              const detail = ROKUYO_DETAIL[name];
              return (
                <div
                  key={name}
                  id={`rokuyo-${slug}`}
                  className={`rounded-2xl p-5 border-2 ${style.border} ${style.bg} scroll-mt-20 space-y-3`}
                >
                  <div className="flex items-center gap-3 border-b border-amber-200 pb-2">
                    <span className="text-3xl">{emoji}</span>
                    <div>
                      <div className={`font-black text-xl ${style.text}`}>{name}</div>
                      <div className="text-xs text-gray-500">{detail.yomi}</div>
                    </div>
                    <span className="ml-auto rounded-full bg-white/80 border border-amber-200 px-2.5 py-1 text-[11px] text-amber-800 font-bold">
                      {detail.rating}
                    </span>
                  </div>

                  <div>
                    <p className="font-bold text-gray-700 text-sm mb-1">📜 由来</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail.origin}</p>
                  </div>

                  <div>
                    <p className="font-bold text-gray-700 text-sm mb-1">✨ 概要</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail.summary}</p>
                  </div>

                  <div className="rounded-xl bg-white/80 border border-amber-100 p-3">
                    <p className="font-bold text-amber-800 text-sm mb-1">🕐 時間帯の吉凶</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail.timePhase}</p>
                  </div>

                  {detail.goodActions.length > 0 && (
                    <div className="rounded-xl bg-green-50 border border-green-100 p-3">
                      <p className="font-bold text-green-800 text-sm mb-1">✅ 向いている行動</p>
                      <ul className="space-y-0.5 text-gray-700 text-sm list-disc list-inside">
                        {detail.goodActions.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {detail.badActions.length > 0 && (
                    <div className="rounded-xl bg-rose-50 border border-rose-100 p-3">
                      <p className="font-bold text-rose-800 text-sm mb-1">⚠️ 避けたい行動</p>
                      <ul className="space-y-0.5 text-gray-700 text-sm list-disc list-inside">
                        {detail.badActions.map((a) => (
                          <li key={a}>{a}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div>
                    <p className="font-bold text-gray-700 text-sm mb-1">🏮 伝統的な扱い方</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail.traditionalTips}</p>
                  </div>

                  <div>
                    <p className="font-bold text-gray-700 text-sm mb-1">🌱 現代的な付き合い方</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{detail.modernTake}</p>
                  </div>
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
          <p className="text-gray-700 text-sm leading-relaxed">
            六曜は「守らなければいけないルール」ではなく、<strong>一日の過ごし方のテーマ</strong>として使うのが現代的な楽しみ方です。3つのポイントに絞って紹介します。
          </p>
          <div className="space-y-3">
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <p className="font-bold text-amber-800 text-sm mb-2">① 大きな決断の日取り決めに使う</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                結婚・引っ越し・契約など、人生の節目となる決断の日取りに使います。「大安を選んだ」という事実が、関わる人全員の気持ちを前向きにし、その後のトラブルが起きた時に「日取りのせい」と思わずに済む心理的効果があります。
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <p className="font-bold text-amber-800 text-sm mb-2">② 一日の時間配分のヒントに使う</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                先勝の日は午前中に大事な用事を片付ける、先負の日は午後から本腰を入れる——など、<strong>時間帯の吉凶を生活リズムのガイド</strong>として使う方法。朝型・夜型の目安にもなります。
              </p>
            </div>
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-100">
              <p className="font-bold text-amber-800 text-sm mb-2">③ 現代的な「気分のテーマ」として使う</p>
              <p className="text-gray-600 text-xs leading-relaxed">
                大安＝「新しいことを始めよう」、仏滅＝「不要なものを手放そう」、赤口＝「火の元に気をつけよう」——といったふうに、<strong>各日のテーマ</strong>として緩く取り入れる使い方。小さな意識の切り替えに使うと日常が豊かになります。
              </p>
            </div>
          </div>
        </section>

        {/* イベント別おすすめ */}
        <section id="events" className="space-y-4 scroll-mt-20">
          <h2 className="text-xl font-black text-amber-900 border-b-2 border-amber-200 pb-2">
            🎯 イベント別・おすすめの六曜
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            主要なイベントごとに、選ばれやすい六曜と避けられがちな六曜をまとめました。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-amber-100">
                  <th className="border border-amber-200 px-2 py-2 text-left text-amber-800 font-bold">イベント</th>
                  <th className="border border-amber-200 px-2 py-2 text-left text-amber-800 font-bold">◎ おすすめ</th>
                  <th className="border border-amber-200 px-2 py-2 text-left text-amber-800 font-bold">✕ 避けたい</th>
                </tr>
              </thead>
              <tbody className="text-xs text-gray-700">
                <tr>
                  <td className="border border-amber-100 px-2 py-2 font-medium">結婚式・入籍</td>
                  <td className="border border-amber-100 px-2 py-2">大安・友引</td>
                  <td className="border border-amber-100 px-2 py-2">仏滅・赤口</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="border border-amber-100 px-2 py-2 font-medium">引越し</td>
                  <td className="border border-amber-100 px-2 py-2">大安・友引</td>
                  <td className="border border-amber-100 px-2 py-2">仏滅・赤口</td>
                </tr>
                <tr>
                  <td className="border border-amber-100 px-2 py-2 font-medium">契約・調印</td>
                  <td className="border border-amber-100 px-2 py-2">大安・先勝（午前）</td>
                  <td className="border border-amber-100 px-2 py-2">仏滅</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="border border-amber-100 px-2 py-2 font-medium">開業・開店</td>
                  <td className="border border-amber-100 px-2 py-2">大安・友引</td>
                  <td className="border border-amber-100 px-2 py-2">仏滅・赤口</td>
                </tr>
                <tr>
                  <td className="border border-amber-100 px-2 py-2 font-medium">納車</td>
                  <td className="border border-amber-100 px-2 py-2">大安・友引・先勝（午前）</td>
                  <td className="border border-amber-100 px-2 py-2">仏滅・赤口</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="border border-amber-100 px-2 py-2 font-medium">お宮参り・七五三</td>
                  <td className="border border-amber-100 px-2 py-2">大安・友引・先勝</td>
                  <td className="border border-amber-100 px-2 py-2">仏滅</td>
                </tr>
                <tr>
                  <td className="border border-amber-100 px-2 py-2 font-medium">葬儀・告別式</td>
                  <td className="border border-amber-100 px-2 py-2">先勝・先負・大安・仏滅</td>
                  <td className="border border-amber-100 px-2 py-2 font-bold">友引（絶対避ける）</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="border border-amber-100 px-2 py-2 font-medium">お通夜</td>
                  <td className="border border-amber-100 px-2 py-2">曜日不問</td>
                  <td className="border border-amber-100 px-2 py-2">（友引は翌日の葬儀に注意）</td>
                </tr>
                <tr>
                  <td className="border border-amber-100 px-2 py-2 font-medium">断捨離・大掃除</td>
                  <td className="border border-amber-100 px-2 py-2 font-bold">仏滅（手放しに吉）</td>
                  <td className="border border-amber-100 px-2 py-2">—</td>
                </tr>
                <tr className="bg-amber-50/50">
                  <td className="border border-amber-100 px-2 py-2 font-medium">交渉・勝負事</td>
                  <td className="border border-amber-100 px-2 py-2">先勝（午前）</td>
                  <td className="border border-amber-100 px-2 py-2">先負（午前）</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="rounded-2xl bg-amber-50 border border-amber-100 p-4">
            <p className="text-gray-700 text-xs leading-relaxed">
              <strong className="text-amber-800">💡 六曜と上手に付き合うコツ</strong><br />
              六曜は「絶対」ではなく「一つの目安」。仕事や家族の都合が最優先で、六曜は補助的に使うのが現代的な付き合い方です。結婚式場の空き日程や、会社の休日と合わせて考えましょう。
            </p>
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
