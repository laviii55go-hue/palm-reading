import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI手相診断｜手のひらの予言者",
  description:
    "総合運・恋愛運・金運など、選んだ運勢に合わせて手相を入力。AIがあなたの運勢を読み解きます。",
};

export default function AiPalmLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
