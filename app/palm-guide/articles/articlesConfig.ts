export const ARTICLE_CUTOFF_DATE = "2026-06-14";

export const ARTICLES = [
  { slug: "palm-reading-basics", emoji: "✋", title: "手相占い 見方｜基本3線の読み方と左右の手の違い", desc: "手相占いの見方を初心者向けに解説。生命線・感情線・頭脳線の基本3線の読み方、左手と右手の違いを紹介します。", publishedAt: "2026-06-14" },
] as const;

export function formatArticleDate(isoDate: string): string {
  const [y, m, d] = isoDate.split("-").map(Number);
  return `${y}年${m}月${d}日`;
}

export function getArticleBySlug(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getVisibleArticles() {
  return ARTICLES.filter((a) => a.publishedAt <= ARTICLE_CUTOFF_DATE);
}
