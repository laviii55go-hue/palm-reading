import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "16タイプ性格診断【無料】8問で性格タイプを診断",
  description: "4つの軸からあなたの性格タイプを16種類の中から診断。INTJ（建築家）やENFP（広報運動家）など、8問の質問でわかります。",
  openGraph: {
    title: "16タイプ性格診断【無料】8問で性格タイプを診断",
    description: "4つの軸からあなたの性格タイプを16種類の中から診断。8問の質問でわかります。",
    url: "https://jade-torte-9b5cde.netlify.app/personality",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/personality-top.png",
        width: 1200,
        height: 630,
        alt: "16タイプ性格診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "16タイプ性格診断【無料】8問で性格タイプを診断",
    description: "4つの軸からあなたの性格タイプを16種類の中から診断。8問の質問でわかります。",
    images: ["https://jade-torte-9b5cde.netlify.app/personality-top.png"],
  },
};

export default function PersonalityLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
