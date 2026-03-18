import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "タロット3択占い【無料】直感で選ぶ大アルカナ",
  description:
    "大アルカナ22枚から3枚を表示。直感で1枚選ぶと、総合運・恋愛運・仕事運・アドバイスを表示。毎日変わる3枚で今日の運勢を占います。",
};

export default function TarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
