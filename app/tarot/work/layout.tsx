import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "仕事タロット占い【無料】転職・キャリア・金運を3枚スプレッドで占う",
  description:
    "仕事・キャリア特化の無料タロット占い。大アルカナ22枚から3枚を引き、現状・課題・アドバイスの3枚スプレッドであなたの仕事運を読み解きます。転職・チーム・金運の悩みに対応。",
  keywords: [
    "仕事タロット",
    "タロット 仕事運",
    "キャリア占い",
    "転職占い 無料",
    "3枚スプレッド",
    "タロット占い 無料",
    "仕事 悩み 占い",
    "金運 タロット",
    "職場 人間関係 占い",
  ],
  openGraph: {
    title: "仕事タロット占い【無料】3枚でキャリアを占う",
    description: "転職・チーム・金運に対応。大アルカナ3枚スプレッドで現状・課題・アドバイスを読み解きます。",
    images: [
      {
        url: "https://uranai-tenohira.jp/tarot-top.webp",
        width: 1200,
        height: 630,
        alt: "仕事タロット占い｜手のひらの予言者",
      },
    ],
  },
};

export default function WorkTarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
