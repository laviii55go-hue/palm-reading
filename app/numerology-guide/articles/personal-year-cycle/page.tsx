import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術の9年サイクル｜個人年数で知る「今年のあなたのテーマ」",
  description:
    "数秘術の個人年数（Personal Year Number）の計算方法と、1年〜9年それぞれの意味をやさしく解説。人生を9年の波として捉え、今の流れと向き合うための長編コラムです。",
  openGraph: {
    title: "数秘術の9年サイクル｜個人年数で知る「今年のあなたのテーマ」",
    description: "1年〜9年それぞれのテーマをじっくり紹介。自分が今どの年にいるかがわかる、数秘術の人生カレンダー入門。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/personal-year-cycle",
  },
};

export default function PersonalYearCyclePage() {
  const article = getArticleBySlug("personal-year-cycle");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="numerology">
      <ColumnNavPills variant="numerology" />
        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-violet-600 text-xs font-bold uppercase tracking-wider">
                数秘術コラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-violet-900 leading-tight">
              数秘術の9年サイクル｜個人年数で知る「今年のあなたのテーマ」
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              数秘術では、誰の人生にも<strong>「9年ごとに繰り返されるサイクル」</strong>があると考えられています。この記事では、個人年数（Personal Year Number）の計算方法と、1年〜9年それぞれのテーマを解説します。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                「ライフパスナンバー」が一生変わらない<strong>持って生まれた性質</strong>であるのに対し、個人年数は毎年変わる<strong>その年だけのテーマ</strong>を示します。9年で一周するので、<strong>人生は9年の波が何度も繰り返される</strong>という見方になります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                自分が今どの年にいるのかがわかると、<strong>なぜ今の時期が忙しいのか／動けないのか</strong>の腑に落ちる理由になります。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🧮 個人年数の計算方法
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              計算はとてもシンプルで、<strong>「自分の生まれ月＋生まれ日＋今年の西暦」</strong>を1桁になるまで足すだけです。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-5 text-sm text-gray-700 leading-relaxed space-y-3">
              <p className="font-semibold text-violet-800">📗 例：5月15日生まれ、2026年の場合</p>
              <p>5（月）＋ 1＋5（日）＋ 2＋0＋2＋6（年）= 21</p>
              <p>2 ＋ 1 = 3 → <strong className="text-violet-700">個人年数は「3」</strong></p>
              <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                ※ マスターナンバー（11・22・33）が途中で出ても、個人年数では1桁に還元する流派が主流です。
              </p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              個人年数は<strong>誕生日を境に切り替わる</strong>のが一般的な解釈です。つまり5月15日生まれの人は、毎年5月15日に新しい個人年数がスタートします（1月1日切り替えの流派もあります）。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 9年サイクルの全体像
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              9年のサイクルは、<strong>「種をまく年 → 育てる年 → 花が咲く年 → 休む年」</strong>のような自然のリズムに対応しています。全体像を先に掴んでおくと、各年の意味が理解しやすくなります。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-5 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">前半（1〜4年）</strong>：土を耕し、種をまき、芽を育てる時期。未来のための準備フェーズ。</p>
              <p><strong className="text-violet-700">中盤（5〜6年）</strong>：変化と調整の時期。動きながら軌道修正する。</p>
              <p><strong className="text-violet-700">後半（7〜9年）</strong>：振り返り、収穫、手放しの時期。次のサイクルへの橋渡し。</p>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              📅 1年〜9年それぞれのテーマ
            </h2>

            <div className="space-y-4">
              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">1年（スタートの年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>新しい9年サイクルの始まり。</strong>種をまく年です。挑戦・独立・引っ越し・転職など「新しい一歩」がテーマ。疲れやすいですが、未来の土台が決まる重要な年。迷ったら<strong>「動く」</strong>を選んでください。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">2年（調整の年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>協力・待つ・育てる年。</strong>1年でまいた種をそっと育てる時期。パートナーシップや人間関係が深まります。焦って動かず、<strong>周りとの調和を大切に</strong>。忍耐の年でもあります。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">3年（表現の年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>遊ぶ・表現する・楽しむ年。</strong>創造性や社交性が高まり、チャンスが舞い込みやすい時期。発信・発表・パフォーマンスに向く年で、出会いも多め。ただし<strong>八方美人になりすぎない</strong>バランスも大事。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">4年（基盤の年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>堅実・積み上げ・努力の年。</strong>3年で得たチャンスを形にする時期。コツコツとルーティン仕事を積み重ねる地味なフェーズですが、<strong>この年の努力が5年目以降を決めます</strong>。家計・資格・健康の整備に◎。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">5年（変化の年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>変化・自由・冒険の年。</strong>サイクルの中盤で、大きな転機が訪れやすい時期。旅行・引っ越し・独立・方向転換など、<strong>動きたい衝動</strong>に素直になる年。今までの延長ではないチャンスが来ます。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">6年（愛と責任の年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>家族・愛・責任の年。</strong>結婚・出産・引っ越し・親の介護など、「家庭」にまつわる出来事が多発しやすい時期。<strong>与えることと受け取ることのバランス</strong>が試される年でもあります。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">7年（内省の年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>静かに内面を深める年。</strong>「なぜかやる気が出ない」と感じやすい時期ですが、<strong>それは正しい反応</strong>です。外に動くより、学び直し・読書・瞑想・資格勉強など「自分の内側を耕す」作業が吉。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">8年（実りの年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>収穫・成功・実現の年。</strong>過去7年の努力が形になる時期。金運・仕事運が上がりやすく、大きな成果を手にしやすい年です。<strong>遠慮せず受け取る</strong>ことが大事。ここで謙遜しすぎると流れが止まります。
                </p>
              </div>

              <div className="rounded-2xl border-2 border-violet-100 bg-white p-5 space-y-2">
                <h3 className="font-bold text-violet-900 text-sm">9年（手放しの年）</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  <strong>完了・整理・別れの年。</strong>1サイクルの終わり。合わなくなったものを手放し、次のサイクルに向けて身軽になる時期。新しいことを始めるより、<strong>「終わらせる作業」</strong>に集中して。別れは寂しいですが、新しい出会いのスペースを作ります。
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 今年がどの年なのか、読み解くコツ
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              個人年数を計算してみて「そうそう、今年こんな感じ」と納得できたら、そのサイクルは自分にフィットしている証拠。逆に「全然違うなぁ」と感じる年もあります。その場合は、<strong>ライフパスナンバーとの組み合わせ</strong>で読み解くと、もう少し立体的に見えてきます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえばライフパスが「1（開拓者）」の人が、個人年数「7（内省）」にいると、「動きたいけど動けない」葛藤を感じやすいです。でもそれは、<strong>1の性質を持ちながら、7の学びを受け取る時期</strong>というふうに読めます。矛盾ではなく、あなたに必要な組み合わせなんです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              個人年数は<strong>「頑張る年／頑張らない年」の使い分けのガイド</strong>として使うのが一番しっくりきます。1年・5年・8年はアクセル、2年・7年・9年はブレーキ——そんな大枠の感覚を知っておくだけで、人生の波に乗りやすくなります。
            </p>
          </section>

          <section className="mt-8 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 9年サイクルとの上手な付き合い方
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このサイクルはあくまで<strong>「傾向」</strong>であって、決まった運命ではありません。「7年だから何もできない」と決めつけるのではなく、「7年の自分にとって無理のないペースはどれかな」と考える材料にしてください。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              個人的におすすめの使い方は、<strong>手帳の最初のページに「今年の個人年数」と「その年のキーワード」を書いておく</strong>こと。迷ったときに立ち戻れる指針になります。そして次の誕生日が来たら、その年を振り返って「たしかにこんな年だったな」と記録してみてください。9年分たまると、自分の人生の波が見えてきます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              「今年の自分に無理をさせない」——個人年数は、<strong>自分を守る優しいカレンダー</strong>として使えるツールです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <Link
              href="/lucky-number"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
            >
              🔢 今年の個人年数を計算する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
