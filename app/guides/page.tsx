import Link from "next/link";
import type { Metadata } from "next";
import AdBanner from "../components/AdBanner";
import PageHeader from "../components/PageHeader";
import RakutenWidget from "../components/RakutenWidget";

export const metadata: Metadata = {
  title: "占いの基本知識まとめ｜手のひらの予言者",
  description:
    "手相、今日の運勢、タロット、夢占いなど、各占いの基本知識をまとめたガイド一覧。初めての方でも楽しめる入門解説です。",
};

const GUIDE_ITEMS = [
  { href: "/guide", emoji: "🖐", label: "手相の基本知識", desc: "生命線・感情線・知能線など" },
  { href: "/daily-fortune-ranking-guide", emoji: "🏆", label: "今日の運勢ランキング", desc: "トランシット占星術の見方" },
  { href: "/calendar-guide", emoji: "📅", label: "開運カレンダー", desc: "六曜・吉日の見方" },
  { href: "/numerology-guide", emoji: "🔢", label: "数秘術", desc: "運命数・ライフパスナンバー" },
  { href: "/dinosaur-guide", emoji: "🦖", label: "恐竜占い", desc: "数秘術ベース・12種類の恐竜タイプ" },
  { href: "/numerology-guide/articles", emoji: "📝", label: "数秘術コラム", desc: "グループランキングなど記事一覧" },
  { href: "/personality-guide", emoji: "🧠", label: "16タイプ性格診断", desc: "MBTIベースの性格タイプ" },
  { href: "/personality-guide/articles", emoji: "📝", label: "16タイプコラム", desc: "リーダーシップ・恋愛運ランキングなど記事一覧" },
  { href: "/tarot-guide", emoji: "🔮", label: "タロット占い", desc: "大アルカナ22枚の意味" },
  { href: "/dream-guide", emoji: "🌙", label: "夢占い", desc: "夢のキーワードから読み解く" },
  { href: "/animal-guide", emoji: "🐾", label: "動物占い", desc: "60種の動物キャラ" },
  { href: "/blood-type-guide", emoji: "🩸", label: "血液型占い", desc: "A・B・O・AB型の性格・相性" },
  { href: "/name-fortune-guide", emoji: "✍️", label: "姓名判断", desc: "画数・五格の見方" },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <PageHeader
        variant="guide"
        theme="neutral"
        subText="基本知識まとめ"
      />
      <div className="max-w-lg mx-auto px-4 py-8 space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-black text-slate-800 mt-4">📖 占いの基本知識まとめ</h1>
          <p className="text-slate-600 text-sm mt-1">
            各占いの入門ガイドをまとめました
          </p>
        </div>

        <div className="grid gap-3">
          {GUIDE_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-md transition-all"
            >
              <span className="text-2xl">{item.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800">{item.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{item.desc}</div>
              </div>
              <span className="text-purple-400 text-sm shrink-0">→</span>
            </Link>
          ))}
        </div>

        <AdBanner />
        <RakutenWidget />
      </div>
    </div>
  );
}
