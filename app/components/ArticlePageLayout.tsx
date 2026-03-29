/**
 * コラム・記事ページ用の共通レイアウト
 * 数秘術占い・血液型占いなど他占い画面と統一したスタイル（max-w-lg, px-4, py-6）
 */
export default function ArticlePageLayout({
  children,
  variant,
}: {
  children: React.ReactNode;
  variant: "numerology" | "personality" | "tarot";
}) {
  const bgClass =
    variant === "numerology"
      ? "min-h-screen bg-gradient-to-b from-violet-50 to-white"
      : variant === "tarot"
      ? "min-h-screen bg-gradient-to-b from-purple-50 via-violet-50 to-white"
      : "min-h-screen bg-gradient-to-b from-teal-50 to-white";

  return (
    <div className={bgClass}>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
