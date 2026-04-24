import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../../data/numerologyData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "数秘術で独立・起業家向きランキング｜一人で動く・起業向きの数字は？",
  description:
    "数秘術のライフパスナンバーから、独立・起業・一人で動く力が強い順にランキング。1・5・8など、起業家向きの数字の特徴を解説します。",
  openGraph: {
    title: "数秘術で独立・起業家向きランキング",
    description: "1・5・8など、一人で動く・起業向きのライフパスナンバーを数秘術の観点からランキング形式で解説。",
    url: "https://uranai-tenohira.jp/numerology-guide/articles/entrepreneur-ranking",
  },
};

const RANKING = [
  { num: 1, reason: "生まれながらの開拓者。独立心が強く、自分の道を切り開く力がある" },
  { num: 8, reason: "権力・実行力で、ビジネスを成功させる野心と才覚がある" },
  { num: 5, reason: "自由と変化を愛し、フリーランス・起業に適した適応力がある" },
  { num: 22, reason: "壮大なビジョンを現実化する。大規模プロジェクトを一人で牽引" },
  { num: 3, reason: "創造性と表現力で、クリエイティブな仕事を独立で展開" },
  { num: 11, reason: "直感とインスピレーションで、革新的なアイデアを形にする" },
  { num: 4, reason: "堅実に基盤を築く。一人でコツコツと事業を構築" },
  { num: 9, reason: "人望と奉仕で、多くの人を巻き込むプロジェクトを主導" },
  { num: 7, reason: "専門性を深め、独立したコンサルタント・研究者として活躍" },
  { num: 6, reason: "責任感で家族やチームを支えるが、独立より協働が向く" },
  { num: 2, reason: "調和を大切にし、一人よりパートナーを求める傾向" },
  { num: 33, reason: "奉仕の精神で、独立より組織やコミュニティでの活動が向く" },
];

export default function EntrepreneurRankingArticlePage() {
  const article = getArticleBySlug("entrepreneur-ranking");
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
              数秘術で独立・起業家向きランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              ライフパスナンバーごとの特性から、一人で動く・起業に向いている順にランキングしました。独立や副業を検討する際の参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-violet-200 bg-violet-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                「独立・起業」と言っても、数字によって<strong>向いている走り方</strong>は大きく異なります。1の人が得意な独立と、2の人が得意な独立はまったく違う景色になります。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                この記事では、ランキングを紹介したあと、<strong>数字ごとの独立スタイル</strong>や、<strong>ランキング下位の数字こそ向いている「共創型の独立」</strong>について書いています。
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
                このランキングは、数秘術における各ライフパスナンバーの<strong>独立心・行動力・適応力・野心</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位の数字だから起業できないわけではありません。2はパートナーと、6はチームで、それぞれの強みを活かした形で独立できます。協働型の起業も選択肢です。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🚀 数字ごとの「独立スタイル」
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              数秘術で独立適性を見るときに大事なのは、<strong>「向いているかどうか」ではなく「どう独立するのが合うか」</strong>という観点です。数字ごとに独立の仕方の色がはっきり出ます。
            </p>
            <div className="rounded-2xl bg-white border border-violet-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p><strong className="text-violet-700">1（開拓者）</strong>：誰もやっていない道を最初に歩く。ゼロから一を作るタイプ。</p>
              <p><strong className="text-violet-700">8（成功者）</strong>：ビジネスモデルを磨き、組織を拡大していくタイプ。</p>
              <p><strong className="text-violet-700">5（自由人）</strong>：副業・フリーランスで軽やかに動くタイプ。複数の収入源を持つ。</p>
              <p><strong className="text-violet-700">22（建築家）</strong>：壮大な構想を長期で実現する。プロジェクト型の独立。</p>
              <p><strong className="text-violet-700">3（表現者）</strong>：クリエイティブ・発信業・SNSで身を立てるタイプ。</p>
              <p><strong className="text-violet-700">7（探求者）</strong>：深い専門性で一人コンサル・研究者として独立するタイプ。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              自分の数字と合うスタイルを選べば、独立は続けやすくなります。逆に合わない走り方を真似すると、短期間で疲弊してしまうことも。数字は<strong>「自分の自然な走り方」を教えてくれるコンパス</strong>として読むといいなと思います。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌱 下位の数字こそ「共創型独立」が向いている
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>2（調和）・6（愛）・33（奉仕）</strong>は、「一人で独立する」という意味では向きにくいかもしれません。でも、<strong>「誰かと一緒に独立する」「コミュニティと一緒に育てる」</strong>というスタイルに切り替えた瞬間、とても強い力を発揮します。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              2の人は、パートナーと二人三脚で事業を育てるのが抜群に得意です。自分が前に立たなくても、後方支援で相手を光らせることで大きな成果を作れます。6の人は、家族や地域を巻き込んだ小さな商いに強い。33の人は、癒しや教育のコミュニティを作ることで収益化できます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              「独立＝一人で戦う」ではなく、<strong>「独立＝自分に合った関係性の中で自由に動く」</strong>と捉え直すだけで、下位の数字の人の選択肢はぐっと広がります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-violet-800 border-b-2 border-violet-200 pb-2">
              🌀 数秘術との、ちょうどいい距離感
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              独立を考えるとき、数秘術の結果は参考になります。でもそれ以上に大事なのは、<strong>「今の自分のタイミングと生活を冷静に見る」</strong>ことだと私は思っています。体調、家族の状況、お金の余裕、時間——数字ではなく現実の要素が、独立のタイミングを決める最終審判員です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキング上位でも「今は動く時期じゃない」人はいますし、下位でも「今が絶好のタイミング」の人もいます。数秘術は<strong>「走り方の好み」を教えてくれるだけ</strong>——そのくらいの気軽さで読んでもらえたら嬉しいです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              独立を目指している方にとって、この記事が背中を少し押す一枚になりますように。そして、慎重に選び直す一枚にもなりますように、と願いながら書いています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              もうひとつ、独立に関して私が大切にしている考え方をお伝えします。それは<strong>「いきなり全部賭けない」</strong>ということ。ランキング上位の勢い型の数字でも、副業から始めて少しずつ独立していくのは、まったく悪いことではありません。むしろそのほうが、失敗しても戻れる余地を確保できて長続きします。数字は<strong>向いている方向</strong>を示してくれるだけで、どのくらいのスピードで走るかは自分で決めていい。ゆっくり歩き始めるのも、一気に走り出すのも、どちらも正解です。自分の数字を信じつつ、自分の呼吸で進んでいく——これが数秘術と上手に付き合う独立の始め方だと思います。迷ったときにこのランキングを開いて、自分の走り方を確認する。それだけで、独立という大きな挑戦は少し安心できるものになります。
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
