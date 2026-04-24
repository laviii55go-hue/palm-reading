import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import RakutenWidget from "../../components/RakutenWidget";
import { NUMEROLOGY_DATA } from "../../data/numerologyData";
import { NUMEROLOGY_PERSONAL } from "../../data/numerologyPersonalData";

const VALID_NUMBERS = Object.keys(NUMEROLOGY_DATA).map(Number);

type Props = { params: Promise<{ num: string }> };

export async function generateStaticParams() {
  return VALID_NUMBERS.map((num) => ({ num: String(num) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  const numId = parseInt(num, 10);
  const data = NUMEROLOGY_DATA[numId];
  if (!data) return { title: "数秘術" };
  const isMaster = [11, 22, 33].includes(numId);
  return {
    title: `ライフパスナンバー【${numId}】${data.title}の意味・性格・恋愛・仕事【数秘術】`,
    description: `${data.title}（${numId}）の性格、強み・弱み、恋愛、仕事運、相性、ラッキーカラーを詳しく解説。数秘術の各数字の詳細ページです。`,
    openGraph: {
      title: `ライフパスナンバー【${numId}】${data.title}｜数秘術`,
      description: `${data.title}の性格、恋愛、仕事、相性を解説。`,
      url: `https://uranai-tenohira.jp/numerology-guide/${numId}`,
    },
  };
}

export default async function NumerologyNumberPage({ params }: Props) {
  const { num } = await params;
  const numId = parseInt(num, 10);
  const data = NUMEROLOGY_DATA[numId];
  if (!data || !VALID_NUMBERS.includes(numId)) notFound();

  const isMaster = [11, 22, 33].includes(numId);
  const personal = NUMEROLOGY_PERSONAL[numId];

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <div className="bg-white border-b border-violet-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/numerology-guide" className="text-violet-600 text-sm hover:underline">
            ← 数秘術ガイド
          </Link>
          <Link href="/lucky-number" className="text-violet-600 text-xs hover:underline">
            診断する
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* タイトルカード */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white text-center shadow-lg">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center font-black text-2xl">
              {data.number}
            </div>
            <span className="text-4xl">{data.emoji}</span>
          </div>
          <h1 className="text-2xl font-black">{data.title}</h1>
          <p className="text-violet-200 text-sm mt-1">
            ライフパスナンバー【{data.number}】
            {isMaster && (
              <span className="ml-2 bg-amber-400/30 text-amber-100 px-2 py-0.5 rounded-full text-xs font-bold">
                マスターナンバー
              </span>
            )}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {data.keywords.map((k) => (
              <span
                key={k}
                className="text-xs bg-white/20 rounded-full px-3 py-1"
              >
                {k}
              </span>
            ))}
          </div>
        </div>

        {/* 独自メッセージ */}
        {personal && (
          <>
            <section className="rounded-2xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 p-5">
              <h2 className="font-bold text-violet-800 flex items-center gap-2 mb-3">
                <span>💫</span> この数字を持つあなたへ
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {personal.personalMessage}
              </p>
            </section>

            <section className="rounded-2xl border-2 border-violet-100 bg-white p-5">
              <h2 className="font-bold text-violet-800 flex items-center gap-2 mb-3">
                <span>🕰</span> 人生の節目でどう現れるか
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {personal.lifeStage}
              </p>
            </section>

            <section className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-5">
              <h2 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                <span>🌱</span> この数字の人生のレッスン
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                {personal.lifeLesson}
              </p>
            </section>
          </>
        )}

        {/* 性格 */}
        <section className="rounded-2xl border-2 border-violet-100 bg-white p-5">
          <h2 className="font-bold text-violet-800 flex items-center gap-2 mb-3">
            <span>📖</span> 性格
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.personality}</p>
        </section>

        {/* 強み */}
        <section className="rounded-2xl border-2 border-green-100 bg-green-50/50 p-5">
          <h2 className="font-bold text-green-800 flex items-center gap-2 mb-3">
            <span>✨</span> 強み
          </h2>
          <ul className="space-y-2">
            {data.strengths.map((s) => (
              <li key={s} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-green-500 shrink-0">✓</span>
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* 弱み */}
        <section className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-5">
          <h2 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
            <span>💡</span> 注意したい点
          </h2>
          <ul className="space-y-2">
            {data.weaknesses.map((w) => (
              <li key={w} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-amber-500 shrink-0">•</span>
                {w}
              </li>
            ))}
          </ul>
        </section>

        {/* 恋愛 */}
        <section className="rounded-2xl border-2 border-rose-100 bg-rose-50/50 p-5">
          <h2 className="font-bold text-rose-800 flex items-center gap-2 mb-3">
            <span>💕</span> 恋愛
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.love}</p>
        </section>

        {/* 仕事 */}
        <section className="rounded-2xl border-2 border-sky-100 bg-sky-50/50 p-5">
          <h2 className="font-bold text-sky-800 flex items-center gap-2 mb-3">
            <span>💼</span> 仕事・キャリア
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.career}</p>
        </section>

        {/* 相性 */}
        <section className="rounded-2xl border-2 border-violet-100 bg-white p-5">
          <h2 className="font-bold text-violet-800 flex items-center gap-2 mb-3">
            <span>💞</span> 相性
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-green-600 font-semibold mb-1">相性が良い数字</p>
              <div className="flex flex-wrap gap-2">
                {data.compatible.map((n) => {
                  const other = NUMEROLOGY_DATA[n];
                  return (
                    <Link
                      key={n}
                      href={`/numerology-guide/${n}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-800 hover:bg-green-200 transition-colors"
                    >
                      <span className="font-bold">{n}</span>
                      <span className="text-xs">{other?.title ?? ""}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs text-rose-600 font-semibold mb-1">相性が難しい数字</p>
              <div className="flex flex-wrap gap-2">
                {data.incompatible.map((n) => {
                  const other = NUMEROLOGY_DATA[n];
                  return (
                    <Link
                      key={n}
                      href={`/numerology-guide/${n}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-rose-100 px-3 py-1.5 text-sm text-rose-800 hover:bg-rose-200 transition-colors"
                    >
                      <span className="font-bold">{n}</span>
                      <span className="text-xs">{other?.title ?? ""}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ラッキー */}
        <section className="rounded-2xl border-2 border-amber-100 bg-amber-50/50 p-5">
          <h2 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
            <span>🍀</span> ラッキー
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-amber-600 font-semibold mb-1">ラッキーカラー</p>
              <p className="text-sm font-medium text-gray-800">{data.luckyColor}</p>
            </div>
            <div>
              <p className="text-xs text-amber-600 font-semibold mb-1">ラッキーアイテム</p>
              <p className="text-sm font-medium text-gray-800">{data.luckyItem}</p>
            </div>
          </div>
        </section>

        <AdBanner />
        <RakutenWidget />

        {/* CTA */}
        <div className="rounded-3xl bg-gradient-to-br from-violet-500 to-purple-600 p-6 text-white text-center space-y-4">
          <div className="font-bold text-lg">あなたのライフパスナンバーを診断</div>
          <p className="text-violet-200 text-sm">
            生年月日からライフパスナンバーを計算。性格・相性・今年のテーマまで
          </p>
          <Link
            href="/lucky-number"
            className="block bg-white text-violet-600 font-bold py-3 rounded-2xl hover:bg-violet-50 transition-colors"
          >
            🔢 数秘術占いを始める →
          </Link>
        </div>
      </div>
    </div>
  );
}
