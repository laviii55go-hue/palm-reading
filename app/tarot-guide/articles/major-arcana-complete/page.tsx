import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import ArticlePageLayout from "../../../components/ArticlePageLayout";
import ColumnNavPills from "../../../components/ColumnNavPills";
import RakutenWidget from "../../../components/RakutenWidget";
import { TAROT_MAJOR_ARCANA } from "../../../data/tarotData";
import { formatArticleDate, getArticleBySlug } from "../articlesConfig";

export const metadata: Metadata = {
  title: "大アルカナ22枚の意味一覧｜正位置・逆位置を完全解説",
  description:
    "タロット大アルカナ22枚すべての意味を正位置・逆位置に分けて解説。愚者から世界まで、カード1枚ずつの象徴とメッセージがわかる完全ガイド。",
  openGraph: {
    title: "大アルカナ22枚の意味一覧｜正位置・逆位置を完全解説",
    description:
      "タロット大アルカナ22枚すべての意味を正位置・逆位置に分けて解説。愚者から世界まで、カード1枚ずつの象徴とメッセージがわかる完全ガイド。",
    url: "https://uranai-tenohira.jp/tarot-guide/articles/major-arcana-complete",
  },
};

export default function MajorArcanaCompletePage() {
  const article = getArticleBySlug("major-arcana-complete");
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
              大アルカナ22枚の意味一覧｜正位置・逆位置を完全解説
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed">
              タロットカードは全78枚ありますが、そのうち特に重要な22枚を「大アルカナ（Major Arcana）」と呼びます。大アルカナは人生の大きなテーマや転機を表すカードで、「手のひらの予言者」の3択タロットではこの22枚を使用しています。
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              0番「愚者」から21番「世界」まで、一枚一枚が「人生の旅路」を物語のように表現しています。
            </p>
            <div className="rounded-2xl border border-purple-200 bg-purple-50/70 p-4 mt-4">
              <p className="text-gray-700 text-sm leading-relaxed">
                この記事では、22枚の意味一覧に加えて、<strong>大アルカナの「愚者の旅」としての構造</strong>、<strong>22枚を3つのグループに分けて理解するコツ</strong>、<strong>毎日のタロットで大アルカナがどう効いてくるか</strong>などを書いています。
              </p>
              <p className="text-gray-700 text-sm leading-relaxed mt-2">
                「一覧を見ても意味が頭に入らない」と感じる方にこそ、後半の構造の話が役に立つはずです。
              </p>
            </div>
          </header>

          <section className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🔮 大アルカナ22枚 一覧
            </h2>
            <div className="space-y-4">
              {TAROT_MAJOR_ARCANA.map((card) => (
                <div
                  key={card.id}
                  className="rounded-2xl border-2 border-purple-100 bg-white p-4 space-y-3"
                >
                  <h3 className="font-bold text-purple-900 flex items-center gap-2">
                    <span className="text-2xl">{card.emoji}</span>
                    <span>{card.id}. {card.name}</span>
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-700">
                      <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-2 py-0.5 rounded mr-2">正位置</span>
                      {card.upright.general}
                    </p>
                    <p className="text-gray-700">
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded mr-2">逆位置</span>
                      {card.reversed.general}
                    </p>
                  </div>
                  <Link
                    href={`/tarot-guide/card/${card.id}`}
                    className="text-purple-500 text-xs hover:text-purple-700 transition-colors"
                  >
                    詳しく見る →
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              📖 カードの読み方のポイント
            </h2>

            <div className="space-y-5">
              <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-3">
                <h3 className="font-bold text-purple-900">正位置と逆位置</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  カードが正位置で出た場合はそのカード本来のエネルギーがストレートに表れています。逆位置では、そのエネルギーが過剰・不足・内向きになっていると読みます。
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">
                  逆位置＝悪い意味、ではありません。「別の角度から見てみて」というサインです。
                </p>
              </div>

              <div className="rounded-2xl bg-purple-50 border border-purple-100 p-4 space-y-3">
                <h3 className="font-bold text-purple-900">1枚引きと3択の違い</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  1枚引きは「今日のメッセージ」をシンプルに受け取る方法。3択は「選ぶ」という行為が加わるため、自分の直感が反映されやすくなります。当サイトでは3択方式を採用し、さらにAIが天体配置も加味して解釈をお届けしています。
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🌀 大アルカナは「愚者の旅」という一本の物語
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              大アルカナ22枚は、実はバラバラの意味を持つカードの寄せ集めではありません。<strong>0番の愚者が1番の魔術師、2番の女教皇……と順番に出会いながら、最終的に21番の世界に至る</strong>——そんな「愚者の旅（フールズジャーニー）」という物語として読むことができます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              0番の愚者は、純粋で身軽で、何も持たずに旅立つ若者。1番の魔術師からは「能動性」を、2番の女教皇からは「直観」を学びます。やがて3番の女帝で「豊かさ」を知り、4番の皇帝で「秩序」を身につけ、物語は進んでいきます。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              そして13番の死神、16番の塔のような<strong>「破壊と再生のカード」</strong>を経て、愚者は成熟し、最後の21番「世界」で完成と統合を迎えます。このストーリーを一度掴んでおくと、タロットで引いたカードが<strong>「旅のどのあたりのメッセージか」</strong>を直感的に読み取れるようになります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🎴 22枚を「3つのグループ」に分けて理解する
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              22枚を一度に覚えようとすると大変なので、<strong>3つのグループ</strong>に分けて捉えるのが私のおすすめです。愚者の旅を「3つの章」に分ける見方で、多くの入門書でも紹介されています。
            </p>
            <div className="rounded-2xl bg-white border border-purple-200 p-4 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-purple-800">第1章：外の世界との出会い（0〜7番）</p>
                <p>愚者・魔術師・女教皇・女帝・皇帝・教皇・恋人・戦車。世の中の仕組みを学び、社会的な役割を身につける段階。</p>
              </div>
              <div>
                <p className="font-semibold text-purple-800">第2章：内面との対話（8〜14番）</p>
                <p>力・隠者・運命の輪・正義・吊るされた男・死神・節制。内側に潜り、自分の真実や変容と向き合う段階。</p>
              </div>
              <div>
                <p className="font-semibold text-purple-800">第3章：統合と完成（15〜21番）</p>
                <p>悪魔・塔・星・月・太陽・審判・世界。内と外が統合され、真の自由と完成に至る段階。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              このグループ分けを知っておくと、<strong>「いま自分はどの章の試練を味わっているか」</strong>という視点でカードを読めるようになります。塔が出たら「第3章の大きな転換期かも」、吊るされた男が出たら「第2章の内省の時期かも」という具合です。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              ✨ 特に気になる「4つの転換点」のカード
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              22枚の中でも、引いたときにドキッとしやすい<strong>4つの転換点のカード</strong>があります。初心者のうちは怖く感じることが多いので、落ち着いて読み解くコツをここに置いておきます。
            </p>
            <div className="rounded-2xl bg-white border border-purple-200 p-4 text-sm text-gray-700 leading-relaxed space-y-3">
              <div>
                <p className="font-semibold text-purple-800">13番「死神」</p>
                <p>死を意味するのではなく、<strong>「終わりと始まり」</strong>を告げるカード。古いやり方を手放して新しい段階に進む準備ができた、というメッセージです。</p>
              </div>
              <div>
                <p className="font-semibold text-purple-800">15番「悪魔」</p>
                <p>悪運ではなく、<strong>「執着・依存」</strong>に気づかせてくれるカード。手放したいのに手放せない何かがあるとき、冷静にそれを見つめるきっかけをくれます。</p>
              </div>
              <div>
                <p className="font-semibold text-purple-800">16番「塔」</p>
                <p>破壊の象徴に見えますが、実は<strong>「古い価値観が崩れる瞬間」</strong>。新しい土台を築くためには一度壊れるしかない、という真実を教えてくれるカード。</p>
              </div>
              <div>
                <p className="font-semibold text-purple-800">18番「月」</p>
                <p>不安・混乱の象徴ですが、<strong>「まだ見えていないものに目を向けて」</strong>という促し。闇の中に真実の手がかりが隠れている、という読み方ができます。</p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              これらのカードは怖いものではなく、<strong>人生の深い場所に連れて行ってくれる案内役</strong>。出たときは落ち込むのではなく、「今、何かを変えるタイミングなのかもしれない」と受け取ってみてください。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-lg font-bold text-purple-800 border-b-2 border-purple-200 pb-2">
              🌱 毎日のタロットで大アルカナが出たときの受け取り方
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              当サイトの3択タロットでは大アルカナ22枚のみを使っているので、引いたカードはすべて<strong>「人生の大きな流れに関するメッセージ」</strong>という位置づけになります。軽い日常のことを聞いても、そこには大きな示唆が返ってきやすいんです。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              たとえば「太陽」が出たら、<strong>「あなたは自分の光を出していい時期にいる」</strong>という応援のカード。月が出たら、<strong>「見えない不安があるかも、その奥を確かめてみて」</strong>という内省のカード。塔が出たら、<strong>「今、大きな価値観の転換が起きようとしている」</strong>というサイン。
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              22枚のうちどれが出ても、<strong>あなたの人生の今の章とちゃんと繋がっています</strong>。一覧だけ読むと「ただの意味の羅列」に見えても、愚者の旅という物語と3つの章を頭に入れておけば、カードが急に親しみやすくなります。
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <Link
              href="/tarot"
              className="block w-full py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold text-center shadow-md hover:opacity-95 transition-opacity"
            >
              🔮 3択タロット占いで今日の運勢を占う →
            </Link>
          </section>
        </article>

        <AdBanner />
        <RakutenWidget />
    </ArticlePageLayout>
  );
}
