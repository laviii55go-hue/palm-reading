import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import RakutenWidget from "../../components/RakutenWidget";
import { PERSONALITY_TYPES, PERSONALITY_TYPE_CODES } from "../../data/personalityData";

type Props = { params: Promise<{ type: string }> };

export async function generateStaticParams() {
  return PERSONALITY_TYPE_CODES.map((type) => ({ type }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { type } = await params;
  const t = PERSONALITY_TYPES[type.toUpperCase()];
  if (!t) return { title: "16タイプ性格診断" };
  return {
    title: `${t.code}（${t.nickname}）の性格・特徴・恋愛・仕事【16タイプ性格診断】`,
    description: `${t.code}（${t.nickname}）タイプの性格、恋愛傾向、仕事の向き、強み・弱みを解説。16タイプ性格診断の各キャラクター詳細ページです。`,
    openGraph: {
      title: `${t.code}（${t.nickname}）の性格・特徴【16タイプ性格診断】`,
      description: `${t.code}（${t.nickname}）タイプの性格、恋愛、仕事、強み・弱みを解説。`,
      url: `https://jade-torte-9b5cde.netlify.app/personality-guide/${type}`,
    },
  };
}

export default async function PersonalityTypePage({ params }: Props) {
  const { type } = await params;
  const t = PERSONALITY_TYPES[type.toUpperCase()];
  if (!t) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* ヘッダー */}
      <div className="bg-white border-b border-teal-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/personality-guide#types" className="text-teal-600 text-sm hover:underline">← 16タイプ一覧へ</Link>
          <Link href="/personality" className="text-teal-600 text-xs hover:underline">診断する</Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        {/* タイプカード */}
        <div className="bg-gradient-to-br from-teal-500 to-cyan-600 rounded-3xl p-6 text-white text-center shadow-lg">
          <div className="text-4xl font-black mb-1">
            {t.code}
            <br />
            （{t.nickname}）
          </div>
          <p className="text-teal-200 text-sm">タイプ</p>
        </div>

        {/* 基本性格 */}
        <section className="bg-white rounded-3xl shadow-sm p-5 space-y-2">
          <h2 className="font-bold text-teal-800 flex items-center gap-2">
            <span>✨</span> 基本性格
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">{t.personality}</p>
        </section>

        {/* 恋愛・仕事 */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-pink-50 rounded-2xl p-4 border border-pink-100">
            <div className="text-pink-600 font-bold text-sm mb-2">💕 恋愛</div>
            <p className="text-gray-600 text-xs leading-relaxed">{t.love}</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <div className="text-blue-600 font-bold text-sm mb-2">💼 仕事</div>
            <p className="text-gray-600 text-xs leading-relaxed">{t.work}</p>
          </div>
        </div>

        {/* 強み・弱み */}
        <div className="bg-white rounded-3xl shadow-sm p-5 space-y-3">
          <div>
            <span className="text-teal-600 font-bold text-sm">💪 強み：</span>
            <span className="text-gray-600 text-sm ml-1">{t.strength}</span>
          </div>
          <div>
            <span className="text-amber-600 font-bold text-sm">⚠️ 弱み：</span>
            <span className="text-gray-600 text-sm ml-1">{t.weakness}</span>
          </div>
        </div>

        <AdBanner />
        <RakutenWidget />

        {/* 診断・一覧へのリンク */}
        <div className="flex gap-3">
          <Link
            href="/personality"
            className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold text-sm text-center shadow-md hover:shadow-lg transition-all"
          >
            🧠 診断を試す
          </Link>
          <Link
            href="/personality-guide#types"
            className="flex-1 py-3 rounded-2xl border-2 border-teal-200 text-teal-600 font-semibold text-sm text-center hover:bg-teal-50 transition-colors"
          >
            📋 他タイプを見る
          </Link>
        </div>
      </div>
    </div>
  );
}
