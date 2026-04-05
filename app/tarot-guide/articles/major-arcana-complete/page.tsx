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
