// 16タイプ性格診断コラム記事の設定（掲載日は YYYY-MM-DD 形式・表示用）
//
// 【公開日制御】Git push 時に記事を非表示にする方法
// 記事一覧では、publishedAt が ARTICLE_CUTOFF_DATE 以前の記事のみ表示します。
// 新しい記事を公開するタイミングで、この日付を更新してから push してください。
//
// 例:
//   "2026-03-19" → 3/19の記事のみ一覧に表示
//   "2026-03-26" → 3/19〜3/26の記事を表示
//   "2026-04-02" → 3/19〜4/02の記事を表示
//   "9999-12-31" → 全記事を表示（開発・確認用）
//
export const ARTICLE_CUTOFF_DATE = "2026-03-19";

export const ARTICLES = [
  { slug: "leadership-ranking", emoji: "👑", title: "16タイプでリーダーシップが強いランキング", desc: "ENTJ・ESTJ・ENFJなど、先頭に立つ力を持つタイプをランキング形式で解説。", publishedAt: "2026-03-19" },
  { slug: "love-ranking", emoji: "💕", title: "16タイプで恋愛運が良いランキング", desc: "ENFP・ESFJ・INFPなど、恋愛・パートナーシップ向きのタイプをランキング形式で解説。", publishedAt: "2026-03-26" },
  { slug: "money-work-ranking", emoji: "💰", title: "16タイプで金運・仕事運ランキング", desc: "ENTJ・ESTJ・INTJなど、お金・キャリアに強いタイプをランキング形式で解説。", publishedAt: "2026-04-02" },
  { slug: "entrepreneur-ranking", emoji: "🚀", title: "16タイプで独立・起業家向きランキング", desc: "ENTP・ESTP・ENTJなど、一人で動く・起業向きのタイプをランキング形式で解説。", publishedAt: "2026-04-09" },
  { slug: "healing-ranking", emoji: "🕊️", title: "16タイプで癒し系・相談相手向きランキング", desc: "INFJ・ISFJ・ENFJなど、話を聞く・支える役割が得意なタイプをランキング形式で解説。", publishedAt: "2026-04-16" },
  { slug: "creative-ranking", emoji: "✨", title: "16タイプでクリエイティブ才能ランキング", desc: "INFP・ENFP・ENTPなど、表現・創作に向いているタイプをランキング形式で解説。", publishedAt: "2026-04-23" },
  { slug: "teamwork-ranking", emoji: "👥", title: "16タイプでチームワーク・協調性ランキング", desc: "ESFJ・ENFJ・ISFJなど、集団で活躍するタイプをランキング形式で解説。", publishedAt: "2026-04-30" },
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
