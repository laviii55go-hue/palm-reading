import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "YES/NOタロット占い【無料】1枚引きで迷いに答えを出す",
  description:
    "心の中で質問を唱えてタロットカードを1枚引くだけ。正位置ならYES、逆位置ならNOで、転職・告白・買い物などあなたの迷いにシンプルに答える無料タロット占い。大アルカナ22枚対応。",
  keywords: [
    "YES NO タロット",
    "イエスノー 占い",
    "タロット 1枚引き",
    "無料占い",
    "大アルカナ",
    "YES NO 無料",
    "タロット 質問",
    "迷い 占い",
  ],
  openGraph: {
    title: "YES/NOタロット占い【無料】1枚で答えがわかる",
    description: "質問を唱えてカードを1枚引くだけ。正位置=YES、逆位置=NOであなたの迷いに答えます。",
  },
};

export default function YesNoTarotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
