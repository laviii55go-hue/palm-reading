import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "恐竜占い【無料】生年月日であなたの恐竜タイプを診断",
  description:
    "生年月日から数秘術で算出した「ライフパスナンバー」で、あなたの恐竜タイプを診断！ティラノサウルス、トリケラトプスなど12種類。相性診断も無料。",
  openGraph: {
    title: "恐竜占い【無料】生年月日であなたの恐竜タイプを診断",
    description:
      "生年月日から数秘術で算出したライフパスナンバーで、あなたの恐竜タイプを診断！12種類の恐竜から性格・相性がわかります。",
    url: "https://jade-torte-9b5cde.netlify.app/dinosaur-fortune",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://jade-torte-9b5cde.netlify.app/og-image-v2.png",
        width: 1200,
        height: 630,
        alt: "恐竜占い",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "恐竜占い【無料】生年月日であなたの恐竜タイプを診断",
    description:
      "生年月日から数秘術で算出したライフパスナンバーで、あなたの恐竜タイプを診断！12種類の恐竜から性格・相性がわかります。",
    images: ["https://jade-torte-9b5cde.netlify.app/og-image-v2.png"],
  },
};

export default function DinosaurFortuneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
