import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "数秘術占い【無料】生年月日で運命数を診断",
  description: "生年月日から「ライフパスナンバー」を計算し、あなたの運命・性格・今年の運勢を無料で診断します。相性診断も対応。",
  openGraph: {
    title: "数秘術占い【無料】生年月日で運命数を診断",
    description: "生年月日から「ライフパスナンバー」を計算し、あなたの運命・性格・今年の運勢を無料で診断します。",
    url: "https://jade-torte-9b5cde.netlify.app/lucky-number",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/numerology-top.png",
        width: 1200,
        height: 630,
        alt: "数秘術占い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "数秘術占い【無料】生年月日で運命数を診断",
    description: "生年月日から「ライフパスナンバー」を計算し、あなたの運命・性格・今年の運勢を無料で診断します。",
    images: ["https://jade-torte-9b5cde.netlify.app/numerology-top.png"],
  },
};

export default function LuckyNumberLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
