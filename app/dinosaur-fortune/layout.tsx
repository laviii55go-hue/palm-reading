import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "恐竜占い【無料】生年月日であなたの恐竜タイプを診断",
  description:
    "生年月日から数秘術でライフパス（恐竜タイプ12種）と、生まれた日からバースデーナンバー（属性11種）を算出。恐竜×属性で132通りのトレカ風診断。相性診断も無料。",
  openGraph: {
    title: "恐竜占い【無料】生年月日であなたの恐竜タイプを診断",
    description:
      "ライフパスで恐竜タイプ12種、バースデーナンバーで属性11種。132通りの組み合わせでトレカ風に診断。相性も無料。",
    url: "https://uranai-tenohira.jp/dinosaur-fortune",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://uranai-tenohira.jp/og-image-v2.webp",
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
      "恐竜タイプ12種×属性11種の132通りトレカ風診断。相性も無料。",
    images: ["https://uranai-tenohira.jp/og-image-v2.webp"],
  },
};

import { Suspense } from "react";

export default function DinosaurFortuneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense>{children}</Suspense>;
}
