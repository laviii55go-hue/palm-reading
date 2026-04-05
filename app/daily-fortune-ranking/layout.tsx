import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "今日の運勢ランキング | 手のひらの予言者",
  description:
    "惑星配置（トランシット）をもとに12星座の運勢をランキング表示。今日のラッキー星座をチェック！",
  openGraph: {
    title: "🏆 今日の運勢ランキング | 手のひらの予言者",
    description:
      "惑星配置（トランシット）をもとに12星座の運勢をランキング表示。今日のラッキー星座をチェック！",
    images: [
      {
        url: "/ogp/daily-ranking.webp",
        width: 1200,
        height: 630,
        alt: "今日の運勢ランキング",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "🏆 今日の運勢ランキング | 手のひらの予言者",
    description:
      "惑星配置（トランシット）をもとに12星座の運勢をランキング表示。今日のラッキー星座をチェック！",
    images: ["/ogp/daily-ranking.webp"],
  },
};

export default function DailyFortuneRankingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
