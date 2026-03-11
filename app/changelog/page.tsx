import Link from "next/link";

export const metadata = {
  title: "更新履歴｜手のひらの予言者",
  description: "手のひらの予言者の更新履歴です。",
};

const CHANGELOG = [
  {
    date: "2026-03-12",
    items: [
      "特殊手相に財運線・結婚線を追加",
      "更新履歴ページを新設",
    ],
  },
  {
    date: "2026-03-11",
    items: [
      "【簡易】手相タイプ診断に左手・右手の選択を追加",
      "質問画面で各線の画像（感情線・生命線・頭脳線・運命線）を表示",
      "トップの手相占いグリッドにココナラ占い広告を追加",
    ],
  },
  {
    date: "2026-03-08",
    items: [
      "【簡易】手相タイプ診断を追加",
      "ほくろ占いを追加",
      "開運カレンダー・今日の運勢を追加",
      "主要4線の詳細ガイド（生命線・感情線・頭脳線・運命線）を追加",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-purple-900 mb-6">📋 更新履歴</h1>

        <div className="space-y-8">
          {CHANGELOG.map((entry) => (
            <section key={entry.date}>
              <h2 className="font-bold text-purple-800 mb-3">{entry.date}</h2>
              <ul className="space-y-2 text-gray-700 text-sm leading-relaxed list-disc list-inside">
                {entry.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-8 text-center space-x-4">
          <Link href="/privacy" className="text-purple-600 hover:underline text-sm">
            プライバシーポリシー
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/" className="text-purple-600 hover:underline text-sm">
            ← トップに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
