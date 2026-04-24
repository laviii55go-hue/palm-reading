// 動物占いコラム記事の設定（掲載日は YYYY-MM-DD 形式）
//
// 【公開日制御】Git push 時に記事を非表示にする方法
// 記事一覧では、publishedAt が ARTICLE_CUTOFF_DATE 以前の記事のみ表示します。
// 新しい記事を公開するタイミングで、この日付を更新してから push してください。
//
export const ARTICLE_CUTOFF_DATE = "2026-04-21";

export const ARTICLES = [
  { slug: "60-types-guide", emoji: "🐾", title: "動物占い60種類の楽しみ方｜12動物×5サブタイプの使いこなし", desc: "動物占いの60種類（12動物×5サブタイプ＝黒・白・赤・青・金）の構造と、色の違いによるキャラの微妙な違いを解説。家族や友人で楽しむコツも紹介。", publishedAt: "2026-04-21" },
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
