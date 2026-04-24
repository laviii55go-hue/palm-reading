import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { PERSONALITY_TYPES } from "../../../data/personalityData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "16タイプで独立・起業家向きランキング｜一人で動く・起業向きのタイプは？",
  description:
    "16タイプ性格診断から、独立・起業・一人で動く力が強い順にランキング。ENTP・ESTP・ENTJなど、起業家向きのタイプの特徴を解説します。",
  openGraph: {
    title: "16タイプで独立・起業家向きランキング",
    description: "ENTP・ESTP・ENTJなど、一人で動く・起業向きの16タイプをランキング形式で解説。",
    url: "https://uranai-tenohira.jp/personality-guide/articles/entrepreneur-ranking",
  },
};

const RANKING = [
  { code: "ENTP", reason: "起業・コンサル・企画など、新しい挑戦やアイデアで新しい価値を生み出す" },
  { code: "ESTP", reason: "営業・起業・スポーツなど、リスクを恐れず行動力で成果を出す" },
  { code: "ENTJ", reason: "経営・マネジメントで、目標達成のために組織を動かす" },
  { code: "INTJ", reason: "一人で集中して戦略立案。長期的なビジョンを描いて独立" },
  { code: "INTP", reason: "研究・分析・システム設計など、論理的思考で専門家として独立" },
  { code: "ISTP", reason: "エンジニア・整備など、技術や実践で問題を解決して独立" },
  { code: "ESTJ", reason: "管理職・経営で、組織をまとめて確実に成果を出す" },
  { code: "ENFP", reason: "マーケティング・イベントなど、創造性を発揮するが計画が苦手な面も" },
  { code: "ISTJ", reason: "着実に基盤を築くが、変化より安定を好む傾向" },
  { code: "ENFJ", reason: "人を育てる仕事で独立するが、他人の評価を気にしがち" },
  { code: "ESFP", reason: "接客・エンタメで活躍するが、長期的計画より即興が得意" },
  { code: "INFJ", reason: "カウンセリング・NPOなど、理想追求で独立するが疲れやすい" },
  { code: "ISFP", reason: "デザイン・アートで独立するが、衝突を避けがち" },
  { code: "ESFJ", reason: "人と関わる仕事で活躍するが、一人よりチームが向く" },
  { code: "ISFJ", reason: "献身的に支えるが、独立よりサポート役が向く" },
  { code: "INFP", reason: "創作・福祉で独立するが、決断が遅い傾向" },
];

export default function EntrepreneurRankingArticlePage() {
  const article = getArticleBySlug("entrepreneur-ranking");
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
              16タイプで独立・起業家向きランキング
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              16タイプの特性から、一人で動く・起業に向いている順にランキングしました。独立や副業を検討する際の参考にしてみてください。
            </p>
            <div className="rounded-2xl border border-teal-100 bg-teal-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事では、ランキングを紹介したうえで、私が見聞きしてきた<strong>「独立・起業にも実は4タイプある」</strong>という話や、<strong>「独立に向いていないと言われるタイプ」こそ、小さく始めると強い</strong>という話を書いています。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                独立って、ゼロから会社を立ち上げることだけじゃないんですよね。ランキングを眺めつつ、自分に合う「独立の形」を探してもらえたら嬉しいです。
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
                        {data?.work && (
                          <p className="text-xs text-teal-600 mt-2">
                            {data.work}
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
                このランキングは、各タイプの<strong>独立心・行動力・適応力・野心</strong>などの特性を総合的に考慮したものです。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed">
                下位のタイプだから起業できないわけではありません。ISFJはパートナーと、ESFJはチームで、それぞれの強みを活かした形で独立できます。
              </p>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🚀 独立・起業にも4タイプある
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              「独立・起業」と一括りに言われますが、実際には<strong>動き方の違う4タイプ</strong>があると感じています。ランキング上位のタイプも、得意な進み方が違うんです。
            </p>
            <div className="rounded-2xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-teal-800">① 勢い型（ENTP・ESTP）</p>
                <p>まず動いてみて、走りながら形を整えるタイプ。初速と行動量で勝負する。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">② 経営型（ENTJ・ESTJ）</p>
                <p>組織と目標を設計してから動き出すタイプ。人を巻き込んで大きく伸ばす。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">③ 専門家型（INTJ・INTP・ISTP）</p>
                <p>自分のスキル・技術を武器に一人で独立するタイプ。少人数・高単価の仕事に強い。</p>
              </div>
              <div>
                <p className="font-semibold text-teal-800">④ 想い型（INFJ・INFP・ISFP・ENFP）</p>
                <p>自分の価値観や表現を軸に独立するタイプ。共感する人が集まってゆるく広がっていく。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              どれが正解ということはなく、<strong>自分のタイプに合った「走り方」で独立するのが一番続く</strong>と思います。勢い型の人に「しっかり経営計画を」と言うのも、経営型の人に「まず動け」と言うのも、両方かえって苦しくなります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌱 「起業向きじゃない」タイプほど、小さく始めると強い
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              このランキングで下位になっている<strong>ISFJ・INFP・ESFJ・ISFP</strong>あたりのタイプは、「やっぱり自分は独立には向かないんだ」と諦めてしまうかもしれません。でも、<strong>「小さく始める」という前提に切り替えると、むしろ強い</strong>のがこれらのタイプだと思います。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえばINFPやISFPは、「まず月1万円だけ副業でやってみる」「好きな分野のコンテンツを週1本だけ出してみる」といった<strong>負担の軽い入り口</strong>なら、自分の価値観を守りながら続けられます。ISFJやESFJは、身近な人の役に立つことから始めれば、評判が自然に広がっていくタイプ。大きなリスクを取らなくても、自分のペースで独立の芽を育てられます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              逆にランキング上位の勢い型は、スピード感がある反面、「走り出したものを止められずに消耗する」という落とし穴もあります。<strong>ランキングが高い＝成功しやすい、とは限らない</strong>——これが独立・起業を取り巻くリアルだと思っています。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-teal-800 border-b-2 border-teal-200 pb-2">
              🌀 独立は「タイプ×タイミング」で決まる
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              独立や起業を考えるとき、私は<strong>「タイプ」だけでなく「タイミング」が大事</strong>だと感じています。同じタイプの人でも、体力・家族の状況・お金の余裕・心の状態によって、動ける時期と動けない時期があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              ランキング上位だからといって今すぐ独立すべき、という話ではなくて。今は会社員として力を蓄える時期かもしれないし、副業で実験する時期かもしれないし、完全独立の時期かもしれない。<strong>診断結果は「自分の走り方の地図」で、歩き出すタイミングはまた別の話</strong>——そんな距離感で読んでもらえたら嬉しいです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              迷ったときにまたこの記事を開いて、「ああ、自分はこの走り方が合うんだよな」と思い出してもらえたら、書いた甲斐があります。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              独立というと「勇気を出して飛び込む」イメージで語られがちですが、私は<strong>「戻れる経路を残しながら、段階を踏んで進む」</strong>のが一番健康的だと思っています。副業から始めて、少しずつ比率を増やしていけば、ある日気づいたら独立しているということもあり得ます。ランキング下位のタイプにとってはとくに、この「段階を踏む独立」のほうが向いているはずです。いきなり会社を辞めなくていい、いきなり全部を投げ出さなくていい——自分のペースで、自分のタイプに合った形で、ゆっくり独立の芽を育てていきましょう。
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
