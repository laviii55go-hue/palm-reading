import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "動物占い 無料｜生年月日で60種類の動物キャラ診断",
  description:
    "動物占いを無料で診断。生年月日を入力するだけで、12動物×5サブタイプの60種類からあなたの動物キャラ、性格、恋愛、仕事、相性をチェックできます。",
  openGraph: {
    title: "動物占い 無料｜生年月日で60種類の動物キャラ診断",
    description:
      "生年月日でわかる無料の動物占い。60種類の動物キャラから性格・恋愛・仕事・相性を診断します。",
    url: "https://uranai-tenohira.jp/animal",
  },
};

export default function AnimalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
