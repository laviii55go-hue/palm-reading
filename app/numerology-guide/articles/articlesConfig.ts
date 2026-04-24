// 数秘術コラム記事の設定（掲載日は YYYY-MM-DD 形式）
//
// 【公開日制御】Git push 時に記事を非表示にする方法
// 記事一覧では、publishedAt が ARTICLE_CUTOFF_DATE 以前の記事のみ表示します。
// 新しい記事を公開するタイミングで、この日付を更新してから push してください。
//
// 例:
//   "2026-03-18" → 3/18の記事のみ一覧に表示
//   "2026-03-25" → 3/18〜3/25の記事を表示
//   "9999-12-31" → 全記事を表示（開発・確認用）
//
export const ARTICLE_CUTOFF_DATE = "2026-04-21";

export const ARTICLES = [
  { slug: "group-ranking", emoji: "👥", title: "数秘術でグループ・集団行動に向いているランキング", desc: "協調性が高い数字、チームで活躍するライフパスナンバーをランキング形式で解説。", publishedAt: "2026-03-18" },
  { slug: "leadership-ranking", emoji: "👑", title: "数秘術でリーダーシップが強いランキング", desc: "1・8・22など、先頭に立つ力を持つライフパスナンバーをランキング形式で解説。", publishedAt: "2026-03-25" },
  { slug: "love-ranking", emoji: "💕", title: "数秘術で恋愛運が良いランキング", desc: "2・6・9など、恋愛・パートナーシップ向きのライフパスナンバーをランキング形式で解説。", publishedAt: "2026-04-01" },
  { slug: "money-work-ranking", emoji: "💰", title: "数秘術で金運・仕事運ランキング", desc: "4・8・22など、お金・キャリアに強いライフパスナンバーをランキング形式で解説。", publishedAt: "2026-03-27" },
  { slug: "entrepreneur-ranking", emoji: "🚀", title: "数秘術で独立・起業家向きランキング", desc: "1・5・8など、一人で動く・起業向きのライフパスナンバーをランキング形式で解説。", publishedAt: "2026-04-15" },
  { slug: "healing-ranking", emoji: "🕊️", title: "数秘術で癒し系・相談相手向きランキング", desc: "2・6・33など、話を聞く・支える役割が得意なライフパスナンバーをランキング形式で解説。", publishedAt: "2026-04-22" },
  { slug: "creative-ranking", emoji: "✨", title: "数秘術でクリエイティブ才能ランキング", desc: "3・9・11など、表現・創作に向いているライフパスナンバーをランキング形式で解説。", publishedAt: "2026-04-29" },
  { slug: "compatibility-pairs", emoji: "💞", title: "数秘術の相性の組み合わせ解説", desc: "「1と2の相性」「3と7の相性」など、代表的な数字の組み合わせを記事形式で解説。", publishedAt: "2026-05-06" },
  { slug: "personal-year-cycle", emoji: "🌀", title: "数秘術の9年サイクル｜個人年数で知る「今年のあなたのテーマ」", desc: "数秘術の個人年数（Personal Year Number）の計算方法と、1年〜9年それぞれの意味を解説。人生を9年単位の波として捉える考え方を紹介。", publishedAt: "2026-04-21" },
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
