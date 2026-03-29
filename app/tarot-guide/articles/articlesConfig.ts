// タロットコラム記事の設定（掲載日は YYYY-MM-DD 形式）
//
// 【公開日制御】Git push 時に記事を非表示にする方法
// 記事一覧では、publishedAt が ARTICLE_CUTOFF_DATE 以前の記事のみ表示します。
// 新しい記事を公開するタイミングで、この日付を更新してから push してください。
//
export const ARTICLE_CUTOFF_DATE = "2026-03-29";

export const ARTICLES = [
  { slug: "how-to-enjoy-3choice", emoji: "🎯", title: "3択タロット占いの当たる引き方｜直感を信じるコツ", desc: "3択タロットで「当たった！」と感じるための引き方のコツ。直感の磨き方と、テーマ選びで変わる占いの深さを解説。", publishedAt: "2026-03-29" },
  { slug: "major-arcana-complete", emoji: "🔮", title: "大アルカナ22枚の意味一覧｜正位置・逆位置を完全解説", desc: "タロット大アルカナ22枚の意味を正位置・逆位置に分けて一覧で解説。初心者でもカードの世界観がわかる入門ガイド。", publishedAt: "2026-03-29" },
  { slug: "tarot-beginner-guide", emoji: "📖", title: "タロット占い初心者ガイド｜無料で始める大アルカナ入門", desc: "タロット占いを始めたい人向けの入門記事。大アルカナとは何か、どう読むか、3択占いの楽しみ方まで。", publishedAt: "2026-03-29" },
] as const;

export function formatArticleDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

/** 公開日以前の記事のみ取得（ARTICLE_CUTOFF_DATE で制御） */
export function getVisibleArticles() {
  return ARTICLES.filter((a) => a.publishedAt <= ARTICLE_CUTOFF_DATE);
}
