import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で癒し系・相談相手向きランキング｜話を聞く・支える役割が得意な数字は？",
  description:
    "数秘術のライフパスナンバーから、癒し系・相談相手・話を聞く・支える役割が得意な順にランキング。2・6・33など、人を支える力を持つ数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で癒し系・相談相手向きランキング",
    description: "2・6・33など、話を聞く・支える役割が得意なライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/healing-ranking",
  },
};

const RANKING = [
  { num: 2, reason: "調和の人。共感力が高く、相手の気持ちを敏感に察知し、寄り添う力がある" },
  { num: 6, reason: "愛の守護者。深い愛情と責任感で、家族や周囲の人を温かく支える" },
  { num: 33, reason: "無条件の愛と癒しの力。マスターティーチャーとして人を導き、奉仕する" },
  { num: 9, reason: "普遍的な愛と包容力。広い視野で相手を受け入れ、深く理解する" },
  { num: 4, reason: "堅実な建設者。信頼性が高く、安心感を与える存在" },
  { num: 11, reason: "直感とインスピレーションで、相手の本質を見抜き、励ます" },
  { num: 3, reason: "表現力と社交性で、明るく楽しい雰囲気を作り、人を元気にする" },
  { num: 7, reason: "内省と探求。深い対話で相手の本質に寄り添う" },
  { num: 8, reason: "リーダーシップは強いが、支えるより牽引する役割が向く" },
  { num: 1, reason: "独立心が強く、支えるより自分で動く傾向" },
  { num: 5, reason: "自由を愛し、じっくり話を聞くより変化を好む" },
  { num: 22, reason: "ビジョン重視で、個別サポートより大規模なプロジェクトが向く" },
];

export default function HealingRankingArticlePage() {
  const article = getArticleBySlug("healing-ranking");
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
              数秘術で癒し系・相談相手向きランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、話を聞く・支える役割が得意な順にランキングしました。カウンセラー・ヒーラー・相談役を目指す方の参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                「癒し」の形にも、数字によって違いがあります。<strong>言葉で癒す人、行動で癒す人、存在で癒す人</strong>——どれもそれぞれの魅力があります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングのあとに、<strong>数字ごとの癒しの形</strong>や、<strong>癒す側の人ほど「自分を癒す時間」を大事にしてほしい</strong>という話を書いています。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              📊 ランキング一覧
            </h2>
            <div className="space-y-4">
              {RANKING.map((item, i) => {
                const data = NUMEROLOGY_DATA[item.num];
                const rank = i + 1;
                const rankStyle =
                  rank === 1
                    ? "bg-amber-100 border-amber-300 text-amber-900"
                    : rank <= 3
                    ? "bg-amber-50 border-amber-200 text-amber-800"
                    : "bg-white border-violet-200 text-gray-800";
                return (
                  <div
                    key={item.num}
                    className={`rounded-2xl border-2 p-4 ${rankStyle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-violet-100 border-2 border-violet-300 flex items-center justify-center font-black text-violet-700 shrink-0">
                        {rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl">{data?.emoji ?? "🔢"}</span>
                          <span className="font-bold text-violet-900">
                            ライフパスナンバー【{item.num}】{data?.title ?? ""}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.reason}
                        </p>
                        {data?.keywords && (
                          <p className="text-xs text-violet-600 mt-2">
                            {data.keywords.slice(0, 3).join("・")}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              💡 ランキングの見方
            </h2>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                このランキングは、数秘術における各ライフパスナンバーの<strong>共感力・奉仕精神・包容力・安心感</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だから人を支えられないわけではありません。1はリードで、22はビジョンで、それぞれの形で人を支えています。自分の強みを活かしたサポートの形を見つけましょう。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌿 数字ごとの「癒しの形」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術で見る癒しの力は、数字ごとに<strong>表現の仕方</strong>がまるで違います。自分の数字と違う癒し方を求めても噛み合わないことがあるので、数字ごとの特徴を知っておくと、人間関係が少し楽になります。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">2（調和）</strong>：そっと共感してくれる癒し。「わかるよ」と静かに寄り添う。</p>
              <p><strong className="text-violet-700">6（愛）</strong>：世話を焼いてくれる癒し。食事、声かけ、気遣いで支える。</p>
              <p><strong className="text-violet-700">33（マスターティーチャー）</strong>：無条件の愛で包む癒し。存在自体が安心感になる。</p>
              <p><strong className="text-violet-700">9（博愛）</strong>：大きな視点で励ましてくれる癒し。「人生の流れ」から語る。</p>
              <p><strong className="text-violet-700">4（堅実）</strong>：黙って側にいてくれる癒し。何もしなくても安心。</p>
              <p><strong className="text-violet-700">11（直感）</strong>：本質を見抜いてくれる癒し。「あなたは本当はこう思ってる」と言葉にしてくれる。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              相手に求める癒しの形と、自分が出せる癒しの形が違うと、お互いに「伝わらない」と感じてしまうことがあります。<strong>数字を知っておくだけで、人間関係の摩擦はずいぶん減る</strong>——これが数秘術のありがたいところです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 ランキング下位の数字も「違う癒し」を持っている
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>8（成功者）・1（開拓者）・5（自由人）・22（建築家）</strong>は、「感情的な寄り添いは苦手」と書かれていて、少し傷つくかもしれません。でも、これらの数字の人にも<strong>別の形の癒し</strong>があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              8の人は、<strong>「解決策を出してくれる癒し」</strong>が得意です。感情的な共感ではなく、問題の切り分けと具体的な一歩を示してくれる。パニックで動けない人にとって、この種類の癒しは最高のギフトです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              1の人は<strong>「一緒に動いてくれる癒し」</strong>。落ち込んでいるときに「とりあえず外行こう」と腕を引っ張ってくれる。5の人は<strong>「気分を切り替えてくれる癒し」</strong>。深刻モードから引き剥がして、新しい景色に連れて行ってくれます。22の人は<strong>「大きな構想に引き上げてくれる癒し」</strong>。目先の悩みを未来の大きな話に置き換えてくれる。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>癒しの形は、一つじゃない。</strong>これは数秘術が何度も教えてくれる大事なことです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 癒す側の人ほど、自分を癒す時間を
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              最後に、ランキング上位の癒し系タイプの人に向けた話を。2・6・33・9といった上位の数字は、人の感情を受け取るのが得意なぶん、<strong>自分のエネルギーを消耗しやすい</strong>側面があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              私が大事にしている考え方は、「<strong>人を癒す前に、自分を癒しておく</strong>」。これは義務ではなく、癒し続けるための燃料補給です。好きな音楽を聞く、お風呂にじっくり浸かる、占いや診断で自分の状態を可視化する——なんでもいいから、自分を守るルーチンを一つ持っておく。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術や占いは、「今の自分、ちょっと疲れてるな」と気づくためのセルフチェックとしても優秀です。ランキング上位の人も下位の人も、自分自身を大切にする時間を、どうか忘れないでほしいなと思います。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              人を癒すというのは、シンプルに見えてすごく豊かな行為です。数字の力を借りて、自分が得意な癒しの形を知り、相手の欲しい癒しを読み解けるようになれば、家族や友人との関係はぐっと深まります。どの数字であっても、あなたが誰かに向ける小さな気遣いは、ちゃんと誰かの人生を支えているはずです。毎日がんばっているあなた自身も、誰かからの癒しをちゃんと受け取ってくださいね。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🔢 あなたのライフパスナンバーを調べる
            </h2>
            <p className="text-gray-600 text-sm">
              生年月日からライフパスナンバーを計算し、性格・相性・今年のテーマまで診断できます。
            </p>
            <Link
              href="/lucky-number"
              className="block w-full py-4 rounded-2xl bg-violet-600 text-white font-bold text-center shadow-md hover:bg-violet-700 transition-colors"
            >
              🔢 数秘術占いで診断する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
