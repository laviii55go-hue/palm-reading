import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "3択タロット占い【無料】大アルカナで今日の運勢を占う",
  description:
    "無料の3択タロット占い。大アルカナ22枚から直感で1枚を選ぶと、AIが今日の天体配置とともにあなただけの運勢を解釈します。恋愛・仕事・総合・アドバイスの4テーマ対応。",
  keywords: ["3択タロット", "タロット占い", "三択占い", "3択占い", "大アルカナ", "無料占い", "今日の運勢", "タロット無料"],
};

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
