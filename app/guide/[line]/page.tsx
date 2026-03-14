import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdBanner from "../../components/AdBanner";
import RakutenWidget from "../../components/RakutenWidget";
import { LINE_GUIDES, type LineKey } from "../../data/lineGuideData";

const LINE_KEYS: LineKey[] = ["life-line", "heart-line", "head-line", "fate-line", "marriage-line", "money-line"];

export async function generateStaticParams() {
  return LINE_KEYS.map((line) => ({ line }));
}

export async function generateMetadata({ params }: { params: Promise<{ line: string }> }): Promise<Metadata> {
  const { line } = await params;
  const guide = LINE_KEYS.includes(line as LineKey) ? LINE_GUIDES[line as LineKey] : null;
  if (!guide) return { title: "手相ガイド" };
  return {
    title: `${guide.name}の見方・意味｜手相の詳細ガイド`,
    description: `${guide.summary} ${guide.name}のパターン別の読み方、よくある質問までわかりやすく解説。`,
  };
}

export default async function LineGuidePage({ params }: { params: Promise<{ line: string }> }) {
  const { line } = await params;
  const guide = LINE_KEYS.includes(line as LineKey) ? LINE_GUIDES[line as LineKey] : null;
  if (!guide) notFound();

  const otherLines = LINE_KEYS.filter((k) => k !== line);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="bg-white border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex gap-3">
            <Link href="/" className="text-purple-500 text-sm hover:underline">← トップへ</Link>
            <Link href="/guide" className="text-purple-500 text-sm hover:underline">手相ガイド</Link>
          </div>
          <span className="text-xs text-gray-400">線別ガイド</span>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 space-y-10">
        <div id="top" className="text-center space-y-2">
          <div className="text-5xl">{guide.emoji}</div>
          <h1 className="text-2xl font-black text-purple-900">{guide.name}の見方</h1>
          <p className="text-gray-500 text-sm">{guide.summary}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">📍 線の位置</h2>
          <div className={`rounded-2xl border-2 ${guide.border} bg-gradient-to-br ${guide.bg} p-4`}>
            <p className={`font-medium ${guide.text} text-sm`}>{guide.position}</p>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">📖 パターン別の意味</h2>
          <div className="space-y-3">
            {guide.patterns.map((p, i) => (
              <div key={i} className="rounded-2xl border-2 border-gray-100 bg-white p-4">
                <div className="font-bold text-sm text-gray-800 mb-1">{p.name}</div>
                <p className="text-gray-600 text-xs leading-relaxed">{p.meaning}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">💡 読むときのポイント</h2>
          <ul className="space-y-2">
            {guide.tips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-gray-600 text-sm">
                <span className="text-purple-400 shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-purple-800 flex items-center gap-2">❓ よくある質問</h2>
          <div className="space-y-3">
            {guide.faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl border border-purple-100 bg-white p-4">
                <p className="font-bold text-sm text-gray-800 mb-2">Q. {faq.q}</p>
                <p className="text-gray-600 text-xs leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <p className="text-center text-gray-600 text-sm font-medium">他の線のガイド</p>
          <div className="grid grid-cols-2 gap-2">
            {otherLines.map((key) => {
              const g = LINE_GUIDES[key];
              return (
                <Link
                  key={key}
                  href={`/guide/${key}`}
                  className={`rounded-xl border-2 ${g.border} bg-gradient-to-br ${g.bg} p-3 text-center hover:shadow-md transition-all`}
                >
                  <span className="text-xl">{g.emoji}</span>
                  <div className={`font-bold text-sm mt-1 ${g.text}`}>{g.name}</div>
                </Link>
              );
            })}
          </div>
        </section>

        <Link
          href="/"
          className="block w-full py-4 rounded-2xl bg-purple-600 text-white font-bold text-center shadow-md hover:bg-purple-700 transition-colors"
        >
          🔮 手相診断を始める
        </Link>

        <AdBanner />
        <RakutenWidget />
      </div>
    </div>
  );
}
