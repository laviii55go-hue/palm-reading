import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "動物占い【無料】生年月日で60種類の動物キャラを診断",
  description: "生年月日から12動物×5サブタイプ＝60キャラの中からあなたの動物を診断。相性診断も無料で楽しめます。",
  openGraph: {
    title: "動物占い【無料】生年月日で60種類の動物キャラを診断",
    description: "生年月日から12動物×5サブタイプ＝60キャラの中からあなたの動物を診断。相性診断も無料で楽しめます。",
    url: "https://jade-torte-9b5cde.netlify.app/animal",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/animal-top.png",
        width: 1200,
        height: 630,
        alt: "動物占い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "動物占い【無料】生年月日で60種類の動物キャラを診断",
    description: "生年月日から12動物×5サブタイプ＝60キャラの中からあなたの動物を診断。相性診断も無料で楽しめます。",
    images: ["https://jade-torte-9b5cde.netlify.app/animal-top.png"],
  },
};

export default function AnimalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
