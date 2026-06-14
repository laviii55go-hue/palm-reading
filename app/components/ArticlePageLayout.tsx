import { fortunePageBackground } from "../lib/fortuneDesign";

/**
 * コラム・記事ページ用の共通レイアウト
 */
export default function ArticlePageLayout({
  children,
}: {
  children: React.ReactNode;
  variant?: "numerology" | "personality" | "tarot" | "animal";
}) {
  return (
    <div className={fortunePageBackground}>
      <div className="mx-auto w-full max-w-lg px-4 py-6 space-y-6">
        {children}
      </div>
    </div>
  );
}
