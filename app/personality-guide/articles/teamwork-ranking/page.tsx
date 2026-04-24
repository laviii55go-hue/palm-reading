import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプでチームワーク・協調性ランキング｜集団で活躍するタイプは？",
  description:
    "16タイプ性格診断から、チームワーク・協調性・集団行動に向いている順にランキング。ESFJ・ENFJ・ISFJなど、チームで活躍するタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプでチームワーク・協調性ランキング",
    description: "ESFJ・ENFJ・ISFJなど、集団で活躍する16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/teamwork-ranking",
  },
};

const RANKING = [
  { code: "ESFJ", reason: "社交的で人の世話を焼くことが好き。調和を大切にし、周囲を明るく盛り上げる" },
  { code: "ENFJ", reason: "人を導き成長させることに喜びを感じ、カリスマ性と共感力でチームをまとめる" },
  { code: "ISFJ", reason: "献身的で細やかな気配り。人のために尽くし、安定した関係を大切にする" },
  { code: "ENFP", reason: "人を惹きつける魅力で周囲を巻き込み、チームの雰囲気を盛り上げる" },
  { code: "ESTJ", reason: "組織をまとめ、ルールに基づいて効率と秩序を重視し、チームで成果を出す" },
  { code: "ESFP", reason: "その場の空気を読んで盛り上げ、周囲に笑顔を届ける" },
  { code: "ISTJ", reason: "責任感と信頼性で、着実にチームの基盤を築く" },
  { code: "INFJ", reason: "人の本質を見抜き、より良いチームのために行動する" },
  { code: "INFP", reason: "価値観を大切にし、人の支えになることを喜びとする" },
  { code: "ENTJ", reason: "リーダーとして組織を動かすが、支配的になりすぎに注意" },
  { code: "ENTP", reason: "アイデアでチームに貢献するが、一人の時間も必要" },
  { code: "ISTP", reason: "実用的に問題解決するが、一人で集中する傾向も" },
  { code: "ISFP", reason: "穏やかで調和を大切にするが、自分のペースを好む" },
  { code: "INTJ", reason: "戦略で貢献するが、独立心が強く一人で進みたくなる傾向" },
  { code: "INTP", reason: "分析で貢献するが、社交より一人で考える時間を好む" },
  { code: "ESTP", reason: "行動力で貢献するが、自由と変化を好み束縛に窮屈さを感じやすい" },
];

export default function TeamworkRankingArticlePage() {
  const article = getArticleBySlug("teamwork-ranking");
  const publishedDate = article ? formatArticleDate(article.publishedAt) : null;

  return (
    <ArticlePageLayout variant="personality">
      <ColumnNavPills variant="personality" />

        <article>
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="text-teal-500 text-xs font-bold uppercase tracking-wider">
                16タイプコラム
              </p>
              {publishedDate && (
                <p className="text-gray-500 text-xs">
                  📅 {publishedDate} 掲載
                </p>
              )}
            </div>
            <h1 className="text-2xl font-black text-teal-900 leading-tight">
              16タイプでチームワーク・協調性ランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、チームワーク・グループ活動・集団行動に向いている順にランキングしました。仕事のチーム、サークル、ボランティアなど、集団で動く場面での参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事を書いている私は、<strong>趣味のチーム活動と過去のプロジェクト仕事の両方で「タイプが違う人同士がどう噛み合うか」を間近で見てきた</strong>ので、その体験を織り交ぜながらランキングを紹介します。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                とくに<strong>ランキング下位のタイプほどチームで光る瞬間がある</strong>という話は、ぜひ最後まで読んでほしいところです。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              📊 ランキング一覧
            </h2>
            <div className="space-y-4">
              {RANKING.map((item, i) => {
                const data = PERSONALITY_TYPES[item.code];
                const rank = i + 1;
                const rankStyle =
                  rank === 1
                    ? "bg-amber-100 border-amber-300 text-amber-800"
                    : rank <= 3
                    ? "bg-amber-50 border-amber-200 text-amber-700"
                    : "bg-white border-teal-100 text-teal-700";
                return (
                  <div
                    key={item.code}
                    className={`rounded-2xl border-2 p-4 ${rankStyle}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-white border-2 border-teal-200 flex items-center justify-center font-black text-teal-700 shrink-0">
                        {rank}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-teal-900">
                            {item.code}
                          </span>
                          <span className="font-bold text-teal-900">
                            {data?.nickname ?? ""}
                          </span>
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {item.reason}
                        </p>
                        {data?.strength && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.strength}
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
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              💡 ランキングの見方
            </h2>
            <div className="rounded-2xl bg-teal-50 border border-teal-100 p-4 space-y-3">
              <p className="text-gray-700 text-sm leading-relaxed">
                このランキングは、各タイプの<strong>協調性・奉仕精神・組織力・社交性</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから集団行動が苦手というわけではありません。INTJは戦略で、ESTPは行動で、それぞれ集団に貢献できます。自分の強みを活かすことが大切です。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌀 チーム活動で「配役」が見えるようになった話
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              以前参加していた趣味のチーム活動で、一時期この16タイプ診断が流行ったことがありました。待ち時間の雑談で誰かが診断を始めたのがきっかけで、気がつけば全員の結果をなんとなく共有している状態になっていたんです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そうすると、それまで「なんとなく場の雰囲気を作ってくれる人」「細かく気遣いしてくれる人」「状況を冷静に整理してくれる人」と感じていたメンバーの役割が、<strong>タイプという言葉で急に輪郭を持ってきた</strong>んですよね。
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed space-y-2">
              <p>・<strong>ESFJ／ENFJ</strong>タイプのメンバーは、声かけや連絡の取りまとめを自然にやってくれる「場を作る人」。</p>
              <p>・<strong>ISFJ／ISTJ</strong>タイプは、裏方作業を黙々と引き受ける「土台を支える人」。</p>
              <p>・<strong>ENFP／ESFP</strong>タイプは、失敗も笑いに変えて空気を軽くしてくれる「ムードメーカー」。</p>
              <p>・<strong>INTJ／ISTP</strong>タイプは、冷静に状況を見て的確な指示を出してくれる「参謀」。</p>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              全員がESFJだったら裏方作業は誰もやらないし、全員がINTJだったら場が盛り上がらない。<strong>タイプがバラけているチームこそ、実は機能する</strong>——ランキング下位のタイプにも絶対に必要な役割があるのだと、この経験で実感しました。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              💼 仕事のプロジェクトチームでも同じ光景を見た
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              過去にプロジェクト単位で動く仕事に関わっていた頃にも、同じような光景がありました。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              企画や方向性を決めるフェーズで光るのは、<strong>ENFJやENTJのような人を動かすのが得意なタイプ</strong>と、<strong>INFJやINTJのように本質を掘るタイプ</strong>の組み合わせ。そこから実務フェーズに入ると、黙々と手を動かす<strong>ISTJやISTP</strong>が一気に頼もしくなります。問題が起きた土壇場で、淡々と原因を追いかけて修正するタイプの人の存在感は本当にありがたかった。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              一方で、雰囲気を作る<strong>ESFJ・ENFP</strong>がいないチームは、会議や雑談の空気がどうにもピリつく。スキルだけではチームは回らないんだなと痛感した経験です。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              こうして振り返ると、趣味のチーム活動と仕事のプロジェクトで、<strong>機能している「役割の配分」は意外と似ている</strong>と気づきます。遊びであれ、仕事であれ、人が集まって何かを成す場では、やっぱり同じ原理が働いているんですね。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🎯 「協調性ランキング下位」が教えてくれること
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで最下位になっている<strong>ESTP</strong>や、下位に並ぶ<strong>INTJ・INTP・ISFP</strong>は、「協調性」という単一の尺度で見ると確かに点数が低くなるタイプです。でも、それは<strong>「集団に合わせて動く」という軸で測った場合の話</strong>でしかありません。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              実際のチームで見ると、こういう人たちは<strong>誰も思いつかない突破口を開いてくれる存在</strong>だったりします。みんなが「どうするどうする」となっているときに、ESTPがひとりサラッと動いて流れを変えたり、INTJが全体のゴールを描き直してくれたり。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>協調性が高い＝良いチームメンバー、ではない</strong>と、いまの私は思います。協調性が高すぎると、全員が同じ意見に流れてしまう「集団思考」のリスクも出てきます。ランキング下位の独立性が、チームを健全にブレーキをかける役割を果たしている——そんな見方もあっていいはずです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌱 自分のタイプを知ると、チームで居場所が見つかる
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              最後に、16タイプ診断をチームの文脈で使うときの私なりの使い方を紹介させてください。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              私は診断するたびに結果が少し揺らぐタイプで、ランキング上位に入ることが多いです。でも「雰囲気を作る役」が向いていると言われても、調子が悪い日もあれば、静かにしていたい日もあります。ランキングや診断結果は、<strong>「絶対こうあるべき」という鎖ではなく、「こういう自分でもいいんだな」という許可証</strong>として使うといいなと思っています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              逆に「自分は下位タイプだから協調性がない」と落ち込む必要もまったくなくて、<strong>そのタイプでしか出せない色がチームには必要</strong>です。あなたが静かに戦略を考えるタイプなら、その戦略が誰かの動きを助けています。あなたが細かく気遣うタイプなら、その気遣いが誰かの疲れを救っています。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>チームはランキング上位だけで回らない。</strong>そのことをぜひ、自分のタイプを知る入り口として持ち帰ってもらえたら嬉しいです。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🧠 あなたのタイプを調べる
            </h2>
            <p className="text-gray-600 text-sm">
              8問の質問で、あなたの16タイプを診断できます。
            </p>
            <Link
              href="/personality"
              className="block w-full py-4 rounded-2xl bg-teal-600 text-white font-bold text-center shadow-md hover:bg-teal-700 transition-colors"
            >
              🧠 16タイプ診断する →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
