export const ARTICLE_CUTOFF_DATE = "2026-06-14";

export const ARTICLES = [
  { slug: "kyusei-compatibility", emoji: "⭐", title: "九星気学 相性｜本命星別の相性早見表と見方", desc: "九星気学の相性を本命星別に解説。相生・相剋の関係、恋愛・仕事での相性の見方を紹介します。", publishedAt: "2026-06-14" },
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
