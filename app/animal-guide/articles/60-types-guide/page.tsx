import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "動物占い60種類の楽しみ方｜12動物×5サブタイプの使いこなし",
  description:
    "動物占いの60種類（12動物×5サブタイプ＝黒・白・赤・青・金）の構造と、色の違いによるキャラの微妙な違いを解説。家族・友人・子供と一緒に楽しむコツも紹介します。",
  openGraph: {
    title: "動物占い60種類の楽しみ方｜12動物×5サブタイプの使いこなし",
    description: "動物占いの60種類構造と、色の違いによるキャラの微妙な差を解説する入門コラム。",
    url: "https://uranai-tenohira.jp/animal-guide/articles/60-types-guide",
  },
};

export default function AnimalTypesGuidePage() {
  const article = getArticleBySlug("60-types-guide");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="animal">
      <ColumnNavPills variant="animal" />
        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-green-600 text-xs font-bold uppercase tracking-wider">
                動物占いコラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-green-900 leading-tight">
              動物占い60種類の楽しみ方｜12動物×5サブタイプの使いこなし
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              動物占いは「12種類の動物キャラ」として広く知られていますが、当サイトでは<strong>5つのサブタイプ（黒・白・赤・青・金）</strong>を組み合わせて、合計60種類のキャラに分類しています。この記事では、その構造と楽しみ方を解説します。
            </p>
            <div className="rounded-2xl border border-green-200 bg-green-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                動物占いは<strong>「見た目のわかりやすさ」と「結果の納得感」が両立</strong>している珍しい占いです。難しい知識なしで始められるので、家族や友人、子供と一緒に盛り上がれるのが大きな魅力。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、<strong>60種類の構造</strong>、<strong>5つの色の違い</strong>、<strong>家族や友人と楽しむコツ</strong>、そして<strong>相性診断の使いこなし方</strong>まで解説します。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
              🐾 12種類の動物キャラ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              まず動物占いの基本は、生年月日から割り出される<strong>12種類の動物</strong>です。それぞれ性格の大枠を表します。
            </p>
            <div className="rounded-2xl bg-white border border-green-200 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
              <p>・<strong className="text-green-700">オオカミ</strong>：独立心、自分のペース</p>
              <p>・<strong className="text-green-700">こじか</strong>：繊細、人なつこい</p>
              <p>・<strong className="text-green-700">猿</strong>：器用、瞬発力</p>
              <p>・<strong className="text-green-700">チータ</strong>：行動力、短期集中</p>
              <p>・<strong className="text-green-700">黒ひょう</strong>：おしゃれ、プライド高め</p>
              <p>・<strong className="text-green-700">ライオン</strong>：威厳、リーダー気質</p>
              <p>・<strong className="text-green-700">虎</strong>：王道、直球勝負</p>
              <p>・<strong className="text-green-700">たぬき</strong>：老獪、懐が深い</p>
              <p>・<strong className="text-green-700">コアラ</strong>：マイペース、癒し系</p>
              <p>・<strong className="text-green-700">ゾウ</strong>：どっしり、誠実</p>
              <p>・<strong className="text-green-700">ひつじ</strong>：協調性、世話好き</p>
              <p>・<strong className="text-green-700">ペガサス</strong>：気分屋、自由</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              ここまでは、一般的な動物占いでおなじみの分類です。でも<strong>「同じ動物なのに、性格が違う人」</strong>がいることに、気づいたことはないでしょうか？その違いを説明するのが<strong>サブタイプ（色）</strong>です。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
              🎨 5つのサブタイプ（色）の違い
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              動物占いには<strong>「黒・白・赤・青・金」の5つのサブタイプ</strong>があります。同じオオカミでも、黒いオオカミと金のオオカミではニュアンスがかなり違う——それが動物占いの面白さです。
            </p>
            <div className="rounded-2xl bg-white border border-green-200 p-5 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-green-800">⚫ 黒：クール・深み・落ち着き</p>
                <p>同じ動物でも、黒のサブタイプは<strong>一歩引いて冷静に見る</strong>傾向。大人っぽさと内省的な雰囲気が加わります。</p>
              </div>
              <div>
                <p className="font-semibold text-green-800">⚪ 白：純粋・上品・繊細</p>
                <p>白のサブタイプは<strong>品の良さと繊細さ</strong>が加わります。人に優しく接する傾向が強まり、清らかな印象に。</p>
              </div>
              <div>
                <p className="font-semibold text-green-800">🔴 赤：情熱・行動・華やか</p>
                <p>赤のサブタイプは<strong>エネルギッシュで存在感</strong>があります。目立つことを恐れず、情熱的に動くタイプ。</p>
              </div>
              <div>
                <p className="font-semibold text-green-800">🔵 青：知性・冷静・探求</p>
                <p>青のサブタイプは<strong>頭脳派で分析好き</strong>。物事を論理的に捉え、感情に流されず判断する傾向です。</p>
              </div>
              <div>
                <p className="font-semibold text-green-800">🟡 金：豊かさ・美・華麗</p>
                <p>金のサブタイプは<strong>華やかで豊かな雰囲気</strong>をまといます。人を惹きつけ、場を華やかにする才能。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえば<strong>「黒のたぬき」と「金のたぬき」</strong>を比べると、前者は「じっくり観察して一手を打つ策士タイプ」、後者は「愛嬌と華やかさで人を引き込む社交タイプ」と、かなり違う顔を見せます。動物の大枠は同じでも、色が違うことで印象が180度変わることもあります。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
              👨‍👩‍👧 家族や友人と一緒に盛り上がる楽しみ方
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              動物占いの一番の魅力は、<strong>「わたしこれ〜！」と盛り上がれるシンプルさ</strong>にあります。占いに不信感がある人でも、動物のイラストと名前を見ると、つい笑顔になってしまう力があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              家族や子供と一緒に試すと、反応がとても良い占いです。「わたしは白のコアラだったー」「お父さんは赤のライオンだって、めっちゃ合ってる」——こんなふうに、<strong>一緒にワイワイ診断し合う時間</strong>そのものが楽しみになります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そして面白いのは、<strong>同じ動物でも色が違うと微妙に違う</strong>ということ。「お父さんと私、同じゾウだけど、色が違うから性格もちょっと違うのかー」と納得したり、「兄弟で同じオオカミなのに、色が違うから合わないんだね」と話のタネになったり。<strong>動物占いは家族の会話を増やす占い</strong>です。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
              💞 相性診断の使いこなし方
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              動物占いの相性診断は、12動物×12動物＝144通りを基本としつつ、サブタイプの組み合わせで<strong>さらに細かな相性</strong>が読めるように設計されています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              使いこなしのコツは、<strong>「相性が良い／悪い」で白黒つけない</strong>こと。動物占いの相性は、<strong>お互いの動き方のクセがどう噛み合うか</strong>の指標として読むのが本来の使い方です。
            </p>
            <div className="rounded-2xl bg-white border border-green-200 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
              <p>・<strong>オオカミ × ひつじ</strong>：独立心と協調性、実は補い合う名コンビ</p>
              <p>・<strong>チータ × ゾウ</strong>：スピードとじっくり、ペース調整が鍵</p>
              <p>・<strong>虎 × コアラ</strong>：直球とマイペース、ゆるく共存するタイプ</p>
              <p>・<strong>黒ひょう × 金のライオン</strong>：華やか同士、ぶつかりやすいが化学反応大</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              相性が「難しい」と出ても、それは<strong>「違いが大きい」というメッセージ</strong>。違うからこそお互いを補い合える、と読み替えるのが動物占いの優しい使い方です。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-green-800 border-b-2 border-green-200 pb-2">
              🌱 動物占いは「会話のきっかけ」として最強
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              個人的に、動物占いがいちばん活きるのは<strong>「占いに興味がない人」との距離を縮めるとき</strong>です。「血液型は？」「MBTIは？」の次の質問として、「ちなみに動物占いは？」を投げると、意外とみんな興味を示してくれます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              診断結果がキャラクターとして出るので、<strong>視覚的に楽しめて覚えやすい</strong>のも強み。「あの人、金のたぬきだったな」と一度覚えると、その人への接し方のヒントにもなります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              占いを深く信じる必要も、長時間かける必要もありません。生年月日を入れれば1秒で結果が出る——<strong>日常の潤滑油</strong>として、動物占いはとても優秀なツールです。ぜひ家族や仲間と一緒に、気軽に試してみてください。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              当サイトの動物占いは、12動物×5サブタイプの<strong>60種類すべてに個別の性格解説</strong>を用意しています。自分のキャラだけでなく、家族や気になるあの人のキャラも、ぜひ調べてみてください。新しい発見が、きっとあります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <Link
              href="/animal"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
            >
              🐾 動物占いで自分のタイプを調べる →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
