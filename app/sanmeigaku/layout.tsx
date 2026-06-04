import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "算命学占い【無料】生年月日で命式・人体星図を診断",
  description:
    "生年月日から算命学の命式（十大主星・十二大従星・エネルギー点数）を無料で算出。あなたの本質と、今年・今月・今日の流れをやさしく読み解きます。",
  openGraph: {
    title: "算命学占い【無料】生年月日で命式・人体星図を診断",
    description:
      "生年月日から算命学の命式（十大主星・十二大従星・エネルギー点数）を無料で算出。あなたの本質と、今年・今月・今日の流れをやさしく読み解きます。",
    url: "https://uranai-tenohira.jp/sanmeigaku",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://uranai-tenohira.jp/sanmeigaku-og.webp",
        width: 1200,
        height: 630,
        alt: "算命学占い 生年月日で命式・人体星図を診断",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "算命学占い【無料】生年月日で命式・人体星図を診断",
    description:
      "生年月日から算命学の命式（十大主星・十二大従星・エネルギー点数）を無料で算出。今年・今月・今日の流れもわかります。",
    images: ["https://uranai-tenohira.jp/sanmeigaku-og.webp"],
  },
};

export default function SanmeigakuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
