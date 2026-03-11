import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "【簡易】手相タイプ診断｜6問であなたの手相タイプを診断",
  description:
    "感情線・生命線・頭脳線・運命線の特徴を選ぶだけで、あなたの手相タイプを診断。恋愛重視型・キャリア重視型・クリエイティブ型など、12種類のタイプから診断結果をお届けします。",
};

export default function PalmQuizLayout({ children }: { children: React.ReactNode }) {
  return children;
}
