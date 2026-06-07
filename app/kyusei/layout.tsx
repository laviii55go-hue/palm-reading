import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "九星気学占い【無料】生年月日で本命星を診断",
  description: "生年月日から「本命星」（一白水星〜九紫火星）を立春区切りで正確に割り出し、あなたの性格・恋愛・仕事運を無料で診断します。",
  openGraph: {
    title: "九星気学占い【無料】生年月日で本命星を診断",
    description: "生年月日から「本命星」（一白水星〜九紫火星）を立春区切りで正確に割り出し、性格・恋愛・仕事運を無料で診断します。",
    url: "https://uranai-tenohira.jp/kyusei",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://uranai-tenohira.jp/og-image-v2.webp",
        width: 1200,
        height: 630,
        alt: "九星気学占い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "九星気学占い【無料】生年月日で本命星を診断",
    description: "生年月日から「本命星」（一白水星〜九紫火星）を立春区切りで正確に割り出し、性格・恋愛・仕事運を無料で診断します。",
    images: ["https://uranai-tenohira.jp/og-image-v2.webp"],
  },
};

export default function KyuseiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
