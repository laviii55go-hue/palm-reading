import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdBanner from "../../components/AdBanner";
import RakutenWidget from "../../components/RakutenWidget";
import { DINOSAUR_DATA } from "../../data/dinosaurData";


const VALID_NUMBERS = Object.keys(DINOSAUR_DATA).map(Number);

type Props = { params: Promise<{ num: string }> };

export async function generateStaticParams() {
  return VALID_NUMBERS.map((num) => ({ num: String(num) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { num } = await params;
  const numId = parseInt(num, 10);
  const data = DINOSAUR_DATA[numId];
  if (!data) return { title: "恐竜占い" };
  const isMaster = [11, 22, 33].includes(numId);
  return {
    title: `${data.name}の性格・恋愛・相性｜恐竜占い`,
    description: `${data.name}タイプの性格、強み・弱み、恋愛、仕事、相性の良い恐竜を詳しく解説。恐竜占いの各タイプ詳細ページです。`,
    openGraph: {
      title: `${data.name}｜恐竜占い`,
      description: `${data.name}の性格、恋愛、仕事、相性を解説。`,
      url: `https://uranai-tenohira.jp/dinosaur-guide/${numId}`,
    },
  };
}

export default async function DinosaurNumberPage({ params }: Props) {
  const { num } = await params;
  const numId = parseInt(num, 10);
  const data = DINOSAUR_DATA[numId];
  if (!data || !VALID_NUMBERS.includes(numId)) notFound();

  const isMaster = [11, 22, 33].includes(numId);

  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 -z-10 bg-slate-100 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/dinosaur-bg.webp')" }}
        aria-hidden
      />
      <div className="bg-slate-950/90 border-b border-cyan-700/40 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <Link href="/dinosaur-guide" className="text-cyan-200 text-sm hover:underline">
            ← 恐竜図鑑
          </Link>
          <Link href="/dinosaur-fortune" className="text-cyan-200 text-xs hover:underline">
            診断する
          </Link>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-6">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white text-center shadow-lg">
          <div className="flex justify-center mb-3">
            {data.image ? (
              <Image src={data.image} alt={data.name} width={96} height={96} className="object-contain" />
            ) : (
              <span className="text-6xl">{data.emoji}</span>
            )}
          </div>
          <h1 className="text-2xl font-black">{data.name}</h1>
          {isMaster && (
            <span className="inline-block mt-2 bg-amber-400/30 text-amber-100 px-3 py-1 rounded-full text-xs font-bold">
              レアタイプ
            </span>
          )}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {data.keywords.map((k) => (
              <span key={k} className="text-xs bg-white/20 rounded-full px-3 py-1">
                {k}
              </span>
            ))}
          </div>
        </div>

        <section className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
            <span>📖</span> 性格
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.personality}</p>
        </section>

        <section className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
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

        <section className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
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

        <section className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
            <span>💕</span> 恋愛傾向
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.love}</p>
        </section>

        <section className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
            <span>💼</span> 仕事・適職
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">{data.career}</p>
        </section>

        <section className="rounded-2xl border-2 border-emerald-100 bg-white p-5">
          <h2 className="font-bold text-emerald-800 flex items-center gap-2 mb-3">
            <span>💞</span> 相性
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-green-600 font-semibold mb-2">相性が良い恐竜</p>
              <div className="flex flex-wrap gap-2">
                {data.compatible.map((n) => {
                  const other = DINOSAUR_DATA[n];
                  return (
                    <Link
                      key={n}
                      href={`/dinosaur-guide/${n}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1.5 text-sm text-green-800 hover:bg-green-200 transition-colors"
                    >
                      {other?.image ? (
                        <Image src={other.image} alt={other.name} width={20} height={20} className="object-contain" />
                      ) : (
                        <span>{other?.emoji}</span>
                      )}
                      <span className="font-bold">{other?.name ?? ""}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
            <div>
              <p className="text-xs text-amber-600 font-semibold mb-2">相性が難しい恐竜</p>
              <div className="flex flex-wrap gap-2">
                {data.incompatible.map((n) => {
                  const other = DINOSAUR_DATA[n];
                  return (
                    <Link
                      key={n}
                      href={`/dinosaur-guide/${n}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1.5 text-sm text-amber-800 hover:bg-amber-200 transition-colors"
                    >
                      {other?.image ? (
                        <Image src={other.image} alt={other.name} width={20} height={20} className="object-contain" />
                      ) : (
                        <span>{other?.emoji}</span>
                      )}
                      <span className="font-bold">{other?.name ?? ""}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-2xl border-2 border-emerald-100 bg-white p-4 text-xs text-gray-600">
          <p className="font-semibold text-emerald-700 mb-1">📖 診断の仕組みについて</p>
          <p>この恐竜タイプは、数秘術の計算で出る「{data.number}」に対応しています。詳しくは<Link href="/dinosaur-guide#how" className="text-emerald-600 hover:underline font-medium">恐竜図鑑の仕組み</Link>をご覧ください。</p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href="/dinosaur-fortune"
            className="block w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-center hover:bg-emerald-700 transition-colors"
          >
            🦖 恐竜占いで診断する →
          </Link>
          <Link
            href="/dinosaur-guide"
            className="block w-full py-3 rounded-xl border-2 border-emerald-300 bg-white/90 text-emerald-700 font-semibold text-center hover:bg-white transition-colors"
          >
            ← 恐竜図鑑に戻る
          </Link>
        </div>

        <AdBanner />
        <RakutenWidget />
      </div>
    </div>
  );
}
