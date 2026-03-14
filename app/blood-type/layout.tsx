import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "血液型占い｜性格・恋愛・相性を無料診断",
  description:
    "A型・B型・O型・AB型の性格診断と相性診断が無料で楽しめる血液型占い。恋愛傾向や適職、ラッキーカラーまで。",
};

export default function BloodTypeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
