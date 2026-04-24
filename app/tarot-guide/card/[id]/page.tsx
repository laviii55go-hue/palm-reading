import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdBanner from "../../../components/AdBanner";
import RakutenWidget from "../../../components/RakutenWidget";
import {
  TAROT_MAJOR_ARCANA,
  TAROT_CARD_HISTORY,
  TAROT_CARD_IMAGES,
} from "../../../data/tarotData";
import { TAROT_CARD_SEO } from "../../../data/tarotSeoData";
import { TAROT_CARD_PERSONAL } from "../../../data/tarotPersonalData";

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
      url: `https://uranai-tenohira.jp/tarot-guide/card/${card.id}`,
    },
  };
}

export default async function TarotCardDetailPage({ params }: Props) {
  const { id } = await params;
  const cardId = parseInt(id, 10);
  const card = TAROT_MAJOR_ARCANA.find((c) => c.id === cardId);
  if (!card || cardId < 0 || cardId > 21) notFound();

  const history = TAROT_CARD_HISTORY[cardId] ?? "";
  const seo = TAROT_CARD_SEO[cardId];
  const personal = TAROT_CARD_PERSONAL[cardId];

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
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 text-white">
            <span className="text-4xl">{card.emoji}</span>
            <div className="text-left">
              <h1 className="text-2xl font-black">{card.name}</h1>
              <p className="text-violet-200 text-sm">大アルカナ {card.id}番</p>
            </div>
          </div>
          <Image
            src={TAROT_CARD_IMAGES[card.id]}
            alt={card.name}
            width={200}
            height={350}
            className="mx-auto rounded-xl shadow-lg"
          />
        </div>

        {/* カードの歴史・由来 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
            📜 カードの由来・歴史
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{history}</p>
        </section>

        {/* 独自メッセージ：このカードを引いたあなたへ */}
        {personal && (
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
              💫 このカードを引いたあなたへ
            </h2>
            <div className="rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 p-5">
              <p className="text-gray-700 text-sm leading-relaxed">
                {personal.personalMessage}
              </p>
            </div>

            <div className="rounded-2xl bg-white border border-violet-100 p-5 shadow-sm">
              <p className="font-bold text-violet-700 text-sm mb-2">🕰 こんな時に引くと意味があるカード</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {personal.whenToDraw}
              </p>
            </div>

            <div className="rounded-2xl bg-amber-50 border border-amber-100 p-5">
              <p className="font-bold text-amber-700 text-sm mb-2">🌱 日常での受け取り方ミニエピソード</p>
              <p className="text-gray-700 text-sm leading-relaxed">
                {personal.miniEpisode}
              </p>
            </div>
          </section>
        )}

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
          <div className="flex justify-center">
            <Image
              src={TAROT_CARD_IMAGES[card.id]}
              alt={`${card.name}（逆位置）`}
              width={200}
              height={350}
              className="rounded-xl shadow-lg rotate-180"
            />
          </div>
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

        {/* SEO詳細コンテンツ */}
        {seo && (
          <>
            {/* 占星術・数秘術との関連 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                🌟 占星術・数秘術との関連
              </h2>
              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-100">
                  <span className="font-bold text-indigo-700 text-sm">惑星・星座</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.astrology}</p>
                </div>
                <div className="rounded-xl p-4 bg-indigo-50 border border-indigo-100">
                  <span className="font-bold text-indigo-700 text-sm">数字の意味</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.numerology}</p>
                </div>
              </div>
            </section>

            {/* YES/NO占い */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                ✅ YES / NO 占いでの解釈
              </h2>
              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-emerald-50 border border-emerald-100">
                  <span className="font-bold text-emerald-700 text-sm">⬆️ 正位置</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.yesNo.upright}</p>
                </div>
                <div className="rounded-xl p-4 bg-orange-50 border border-orange-100">
                  <span className="font-bold text-orange-700 text-sm">⬇️ 逆位置</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.yesNo.reversed}</p>
                </div>
              </div>
            </section>

            {/* 恋愛シーン別 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                💕 恋愛シーン別の解釈
              </h2>
              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
                  <span className="font-bold text-rose-700 text-sm">片思い・出会い</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.loveDetail.single}</p>
                </div>
                <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
                  <span className="font-bold text-rose-700 text-sm">交際中・夫婦</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.loveDetail.relationship}</p>
                </div>
                <div className="rounded-xl p-4 bg-rose-50 border border-rose-100">
                  <span className="font-bold text-rose-700 text-sm">復縁</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.loveDetail.reconciliation}</p>
                </div>
              </div>
            </section>

            {/* 仕事・キャリア */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                💼 仕事・キャリアの解釈
              </h2>
              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-sky-50 border border-sky-100">
                  <span className="font-bold text-sky-700 text-sm">転職・キャリアチェンジ</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.workDetail.jobChange}</p>
                </div>
                <div className="rounded-xl p-4 bg-sky-50 border border-sky-100">
                  <span className="font-bold text-sky-700 text-sm">チームワーク・職場</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.workDetail.teamwork}</p>
                </div>
                <div className="rounded-xl p-4 bg-sky-50 border border-sky-100">
                  <span className="font-bold text-sky-700 text-sm">金運・財務</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.workDetail.finance}</p>
                </div>
              </div>
            </section>

            {/* 健康 */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                🏥 健康面のアドバイス
              </h2>
              <div className="rounded-xl p-4 bg-green-50 border border-green-100">
                <p className="text-gray-700 text-sm">{seo.health}</p>
              </div>
            </section>

            {/* 行動アドバイス */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                💡 このカードが出たときの行動アドバイス
              </h2>
              <div className="rounded-xl p-4 bg-amber-50 border border-amber-100">
                <p className="text-gray-700 text-sm">{seo.actionAdvice}</p>
              </div>
            </section>

            {/* カード組み合わせ */}
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-violet-900 border-b-2 border-violet-200 pb-2">
                🃏 他のカードとの組み合わせ
              </h2>
              <div className="space-y-3">
                <div className="rounded-xl p-4 bg-violet-50 border border-violet-100">
                  <span className="font-bold text-violet-700 text-sm">相性の良い組み合わせ</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.goodCombination.join("、")}</p>
                </div>
                <div className="rounded-xl p-4 bg-gray-50 border border-gray-200">
                  <span className="font-bold text-gray-700 text-sm">注意が必要な組み合わせ</span>
                  <p className="text-gray-700 text-sm mt-1">{seo.cautionCombination.join("、")}</p>
                </div>
              </div>
            </section>
          </>
        )}

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
            🔮 タロット占いを始める →
          </Link>
        </div>
      </div>
    </div>
  );
}
