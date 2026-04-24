import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "毎朝タロットを1枚引く習慣を3ヶ月続けた記録｜日常の見え方はどう変わるか",
  description:
    "毎朝タロットを1枚引く習慣を3ヶ月続けた記録。直感・感情の解像度・自分との対話がどう変わるか、始め方のコツと挫折しない工夫を実体験から解説します。",
  openGraph: {
    title: "毎朝タロットを1枚引く習慣を3ヶ月続けた記録",
    description: "日常の見え方はどう変わるのか。直感・感情の解像度・自分との対話の深まりを実体験で綴る長編コラム。",
    url: "https://uranai-tenohira.jp/tarot-guide/articles/morning-tarot-3months",
  },
};

export default function MorningTarot3MonthsPage() {
  const article = getArticleBySlug("morning-tarot-3months");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="tarot">
      <ColumnNavPills variant="tarot" />
        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-purple-500 text-xs font-bold uppercase tracking-wider">
                タロットコラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-purple-900 leading-tight">
              毎朝タロットを1枚引く習慣を3ヶ月続けた記録
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              「タロットを毎朝引く」というシンプルな習慣を、3ヶ月続けてみました。派手な変化はありません。でも、日常の見え方が静かに変わっていった実感があります。始め方のコツ、挫折しない工夫、実際に起きた変化を綴ります。
            </p>
            <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事は「タロットに興味はあるけど、重く考えると始められない」という方へ向けて書きました。<strong>占いの深い知識は不要</strong>。手元にカードがなくてもスマホの無料タロットでOK。準備のハードルを可能な限り下げた「日記としてのタロット」をご紹介します。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🌅 始めたきっかけ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              毎朝タロットを引くようになったきっかけは、単純に「朝の自分の状態がよくわからなくなっていたから」でした。起きた瞬間から頭の中が予定で埋まり、自分の気分や感情をスルーしたまま1日が始まってしまう——そんな日々が続いていた時期でした。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              タロットを引いてから30秒、出たカードを眺めながら<strong>「今の私はどんな気持ちかな」</strong>と問いかける。ただそれだけの習慣を、とりあえず1週間だけ試してみることにしたのが始まりでした。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              📓 記録の方法（ごくシンプル）
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              続けるコツは、とにかく<strong>ルールを軽くすること</strong>。以下のような手順にしました。
            </p>
            <div className="rounded-2xl bg-white border border-purple-200 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
              <p>・朝、スマホで3択タロット占いを開く（所要10秒）</p>
              <p>・出た3枚の中から、直感で1枚を選ぶ（所要10秒）</p>
              <p>・カードの意味をざっと読む（所要30秒）</p>
              <p>・メモアプリに「日付／カード名／ひとこと感想」だけ書く（所要30秒）</p>
              <p className="font-semibold text-purple-700 pt-2 border-t border-purple-100">合計1分20秒。朝ごはんを食べる前に終わる。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              「ちゃんと日記に書こう」「深く解釈しよう」と意気込むと、3日で挫折するのが目に見えていました。なので最低限、<strong>「今日のカードは何だったか」を記録することだけ</strong>をルールにしました。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🌱 3ヶ月で起きた4つの変化
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-purple-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-purple-900 text-sm">① 朝の自分の感情がわかるようになった</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  これが一番大きな変化でした。「今日は戦車のカードが出た。でもなんだか腑に落ちない」と感じた日は、自分が本音では「動きたくない」と思っていることに気づけるようになりました。カードが<strong>感情のリトマス試験紙</strong>のように働いてくれるのです。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-purple-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-purple-900 text-sm">② 出来事の解釈が優しくなった</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  その日思い通りに進まないことがあっても、「朝『吊るされた男』だったから、今日は待つ日なんだな」と受け止められるようになりました。<strong>イライラに飲まれず、流れを観察する視点</strong>が持てるのが、思ったより大きな効果でした。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-purple-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-purple-900 text-sm">③ 悪いカードへの耐性がついた</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  「塔」や「死神」が出ても動じなくなりました。最初は「今日大丈夫かな……」と不安になっていたのが、3ヶ月経つ頃には<strong>「変化の合図ね、承知」</strong>と受け止められるように。繰り返し出会ううちに、カードたちは「怖い敵」ではなく「正直な友達」に変わっていきました。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-purple-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-purple-900 text-sm">④ 自分の変化に気づきやすくなった</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  面白かったのは、同じカードが違う時期に出たとき、<strong>「前回と今回で受け取り方が全然違う」</strong>ことに気づけることです。「太陽」が出て素直に嬉しかった日と、「太陽か、今日は光を出す気力がないな」と感じる日がある。この差に、自分の心の状態が映ります。
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🌀 うまくいかなかった日の話
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              毎日必ず続いたかというと、そうでもありません。疲れていて朝スマホを開きたくない日もあったし、カードが気に入らなくて「もう一回引こうかな」と誘惑された日もありました。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そんな時は、<strong>「1つの問いには1回だけ」</strong>というルールを自分に戒めにしました。気に入らないから引き直す——これをやり始めると、タロットが「自分に都合の良い答えを出させるマシーン」になってしまい、直感との対話が壊れます。出たカードが気に入らない日は、「その気に入らなさ自体が今日のメッセージ」と思うようにしました。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              引き忘れた日もありました。でもそれも<strong>「今日は自分の直感に頼らない日だった」</strong>と受け止めるだけ。毎日完璧に続ける必要はなくて、9割続けば十分です。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🌿 始める人への5つのコツ
            </h2>
            <div className="rounded-2xl bg-purple-50 border border-purple-200 p-5 text-sm text-gray-700 leading-relaxed space-y-3">
              <p><strong className="text-purple-800">① 最初は「記録だけ」にする</strong>：深い解釈は後から自然に出てきます。まずは続けることが目的。</p>
              <p><strong className="text-purple-800">② 毎回同じ時間・同じ場所で引く</strong>：習慣化には環境のトリガーが必要。朝ごはん前、コーヒーを淹れる横など、決めておく。</p>
              <p><strong className="text-purple-800">③ 同じ問いを繰り返さない</strong>：気に入らなくても1回で終了。それが直感との信頼関係。</p>
              <p><strong className="text-purple-800">④ 週に1回、振り返る</strong>：7日分のカードを眺めると、自分の1週間の流れが見える。</p>
              <p><strong className="text-purple-800">⑤ 続かない日があってもOK</strong>：完璧を求めず、9割続く仕組みを。</p>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              💡 まとめ：タロットは「日記」になれる
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              3ヶ月続けてわかったのは、タロットは<strong>「当てるもの」ではなく「日記の代わり」</strong>として使うといちばん長続きするということでした。カードは鏡のように、その日のあなたの状態をそっと映し出してくれます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              運命を占うためではなく、<strong>自分との対話を続けるため</strong>に1日1枚。そんな気軽な付き合い方から始めてみてください。3ヶ月後のあなたは、きっと今より自分の感情に敏感になっています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              最後にひとつ。毎朝のタロットは、人生を大きく変える魔法ではありません。でも<strong>「自分を少しだけ丁寧に扱う時間」</strong>を毎朝5分、確保してくれます。忙しい毎日の中でそれだけでも、じわじわと効いてくる習慣だと思います。カードがあなたの朝の静かなパートナーになりますように。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <Link
              href="/tarot"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
            >
              🔮 今朝のタロットを引いてみる →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
