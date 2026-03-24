import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "タロット3択占い【無料】直感で選ぶ大アルカナ",
  description:
    "大アルカナ22枚から3枚を表示。テーマを選び直感で1枚を引くと、AIが今日の天体配置も織り交ぜてあなただけの解釈をお届けします。",
};

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
