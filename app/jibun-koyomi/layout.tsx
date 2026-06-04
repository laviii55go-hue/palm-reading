import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "じぶん暦【無料】算命学×数秘術のオリジナル総合鑑定",
  description:
    "算命学と数秘術を組み合わせた当サイト独自の総合鑑定。生年月日だけで「外の顔×内の原動力」の統合タイプと、今年・今日の流れを2つの暦で読み解きます。",
  openGraph: {
    title: "じぶん暦【無料】算命学×数秘術のオリジナル総合鑑定",
    description:
      "算命学と数秘術を組み合わせた当サイト独自の総合鑑定。生年月日だけで「外の顔×内の原動力」の統合タイプと、今年・今日の流れを2つの暦で読み解きます。",
    url: "https://uranai-tenohira.jp/jibun-koyomi",
    siteName: "手のひらの予言者",
    images: [
      {
        url: "https://uranai-tenohira.jp/jibun-koyomi-og.webp",
        width: 1200,
        height: 630,
        alt: "じぶん暦 算命学×数秘術 オリジナル総合鑑定",
      },
    ],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "じぶん暦【無料】算命学×数秘術のオリジナル総合鑑定",
    description:
      "算命学×数秘術の独自総合鑑定。「外の顔×内の原動力」の統合タイプと今の流れを無料診断。",
    images: ["https://uranai-tenohira.jp/jibun-koyomi-og.webp"],
  },
};

export default function JibunKoyomiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
