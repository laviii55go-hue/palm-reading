import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "タロット占い【完全無料】ワンカード・YES/NO・恋愛・仕事・AI3択",
  description:
    "無料タロット占い5メニュー。ワンカード1枚引き、YES/NO占い、恋愛タロット、仕事タロット、AI解釈付き3択タロット。大アルカナ22枚のオリジナルカードで毎日占えます。",
  keywords: ["タロット占い", "タロット占い 無料", "ワンカード タロット", "YES NO タロット", "恋愛タロット", "仕事タロット", "3択タロット", "大アルカナ", "今日の運勢", "タロット 当たる"],
};

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
