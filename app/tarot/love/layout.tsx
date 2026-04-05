import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "恋愛タロット占い【無料】片思い・復縁・相性を3枚スプレッドで占う",
  description:
    "無料の恋愛タロット占い。大アルカナ22枚から3枚を引き、過去・現在・未来の恋愛の流れを読み解きます。片思い・交際中・復縁のお悩みタイプ別に詳しいメッセージをお届け。",
  keywords: [
    "恋愛タロット",
    "恋愛占い 無料",
    "タロット 3枚スプレッド",
    "片思い タロット",
    "復縁 タロット",
    "恋の行方 占い",
    "タロット 過去現在未来",
    "相性 タロット",
    "告白 占い",
  ],
  openGraph: {
    title: "恋愛タロット占い【無料】3枚で恋の行方を占う",
    description: "片思い・交際中・復縁に対応。大アルカナ3枚スプレッドで過去・現在・未来の恋愛を読み解きます。",
  },
};

export default function LoveTarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
