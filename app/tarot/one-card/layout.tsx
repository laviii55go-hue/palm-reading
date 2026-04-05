import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "今日のワンカードタロット占い【無料】1枚引きで今日のメッセージ",
  description:
    "毎日1枚のタロットカードを引いて、今日のメッセージを受け取る無料占い。大アルカナ22枚から日替わりで選ばれるカードが、恋愛・仕事・健康の行動アドバイスをお届けします。",
  keywords: ["ワンカード タロット", "タロット 1枚引き", "今日のタロット", "タロット占い 無料", "大アルカナ", "今日の運勢 タロット", "タロット 毎日"],
  openGraph: {
    title: "今日のワンカードタロット占い【無料】1枚引き",
    description:
      "毎日1枚のタロットカードを引いて今日のメッセージを受け取ろう。大アルカナ22枚から日替わりカードが恋愛・仕事の行動アドバイスをお届け。",
  },
};

export default function OneCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
