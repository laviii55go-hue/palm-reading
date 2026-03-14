import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "姓名判断｜名前の画数で五格・運勢を無料診断",
  description:
    "漢字・ひらがなの名前から天格・人格・地格・外格・総格の五格を計算し、運勢を無料で診断。約13,000字の漢字データベースに対応。",
};

export default function NameFortuneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
