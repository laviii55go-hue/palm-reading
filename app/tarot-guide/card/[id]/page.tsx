import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import RakutenWidget from "../../../components/RakutenWidget";
import {
  TAROT_MAJOR_ARCANA,
  TAROT_CARD_HISTORY,
} from "../../../data/tarotData";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return TAROT_MAJOR_ARCANA.map((card) => ({ id: String(card.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cardId = parseInt(id, 10);
  const card = TAROT_MAJOR_ARCANA.find((c) => c.id === cardId);
  if (!card) return { title: "タロット占い" };
  return {
    title: `${card.name}の意味・歴史｜タロット大アルカナ22枚【詳細解説】`,
    description: `${card.name}の正位置・逆位置の意味、カードの由来と歴史を解説。タロット大アルカナの詳細ページです。`,
    openGraph: {
      title: `${card.name}の意味・歴史｜タロット大アルカナ`,
      description: `${card.name}の正位置・逆位置の意味、カードの由来と歴史を解説。`,
      url: `https://jade-torte-9b5cde.netlify.app/tarot-guide/card/${card.id}`,
    },
  };
}

export default async function TarotCardDetailPage({ params }: Props) {
  const { id } = await params;
  const cardId = parseInt(id, 10);
  const card = TAROT_MAJOR_ARCANA.find((c) => c.id === cardId);
  if (!card || cardId < 0 || cardId > 21) notFound();

  const history = TAROT_CARD_HISTORY[cardId] ?? "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-violet-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/tarot-guide" className="text-violet-500 text-sm hover:underline">
              ← ガイドへ
            </Link>
            <Link href="/tarot" className="text-violet-500 text-sm hover:underline">
              タロット占いへ
            </Link>
          </div>
          <span className="text-xs text-gray-400">カード詳細</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        {/* カードタイトル */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white">
            <span className="text-4xl">{card.emoji}</span>
            <div className="text-left">
              <h1 className="text-2xl font-black">{card.name}</h1>
              <p className="text-violet-200 text-sm">大アルカナ {card.id}番</p>
            </div>
          </div>
        </div>

        {/* カードの歴史・由来 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
            📜 カードの由来・歴史
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{history}</p>
        </section>

        {/* 正位置の意味 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
            ⬆️ 正位置の意味
          </h2>
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-violet-50 border border-violet-100">
              <span className="font-bold text-violet-700 text-sm">✨ 総合運</span>
              <p className="text-gray-700 text-sm mt-1">{card.upright.general}</p>
            </div>
            <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
              <span className="font-bold text-rose-700 text-sm">💕 恋愛運</span>
              <p className="text-gray-700 text-sm mt-1">{card.upright.love}</p>
            </div>
            <div className="rounded-xl p-4 bg-sky-50 border border-sky-100">
              <span className="font-bold text-sky-700 text-sm">💼 仕事運</span>
              <p className="text-gray-700 text-sm mt-1">{card.upright.work}</p>
            </div>
            <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
              <span className="font-bold text-amber-700 text-sm">💡 アドバイス</span>
              <p className="text-gray-700 text-sm mt-1">{card.upright.advice}</p>
            </div>
          </div>
        </section>

        {/* 逆位置の意味 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
            ⬇️ 逆位置の意味
          </h2>
          <div className="space-y-3">
            <div className="rounded-xl p-4 bg-violet-50 border border-violet-100">
              <span className="font-bold text-violet-700 text-sm">✨ 総合運</span>
              <p className="text-gray-700 text-sm mt-1">{card.reversed.general}</p>
            </div>
            <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
              <span className="font-bold text-rose-700 text-sm">💕 恋愛運</span>
              <p className="text-gray-700 text-sm mt-1">{card.reversed.love}</p>
            </div>
            <div className="rounded-xl p-4 bg-sky-50 border border-sky-100">
              <span className="font-bold text-sky-700 text-sm">💼 仕事運</span>
              <p className="text-gray-700 text-sm mt-1">{card.reversed.work}</p>
            </div>
            <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
              <span className="font-bold text-amber-700 text-sm">💡 アドバイス</span>
              <p className="text-gray-700 text-sm mt-1">{card.reversed.advice}</p>
            </div>
          </div>
        </section>

        <AdBanner />
        <RakutenWidget />

        {/* CTA */}
        <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl p-6 text-white text-center space-y-4">
          <div className="font-bold text-lg">タロット3択占いを試す</div>
          <p className="text-violet-200 text-sm">
            大アルカナから3枚。直感で1枚選んで今日の運勢を占う
          </p>
          <Link
            href="/tarot"
            className="block bg-white text-violet-600 font-bold py-3 rounded-2xl hover:bg-violet-50 transition-colors"
          >
            🎴 タロット占いを始める →
          </Link>
        </div>
      </div>
    </div>
  );
}
