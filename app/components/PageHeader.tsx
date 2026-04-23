import Link from "next/link";
import TopBannerLink from "./TopBannerLink";

type LinkType = "fortune" | "guide" | "articles" | "back";
type Variant = "fortune" | "guide" | "article";
type Theme =
  | "animal"
  | "tarot"
  | "numerology"
  | "personality"
  | "palm"
  | "dinosaur"
  | "blood-type"
  | "dream"
  | "name-fortune"
  | "calendar"
  | "daily"
  | "neutral";

type PageLink = {
  type: LinkType;
  href: string;
  label?: string; // 省略時は type のデフォルトラベル
  icon?: string; // 省略時は type のデフォルト絵文字。「ランキング」など個別用途向け
};

const LINK_ICONS: Record<LinkType, string> = {
  fortune: "🔮",
  guide: "📖",
  articles: "📝",
  back: "←",
};

const LINK_DEFAULT_LABELS: Record<LinkType, string> = {
  fortune: "占いへ",
  guide: "ガイド",
  articles: "コラム",
  back: "戻る",
};

// Tailwind JIT のために完全クラス名で列挙（動的 ${theme} は使わない）
const THEME_CLASSES: Record<
  Theme,
  { pillBorder: string; pillText: string; pillHover: string; borderBottom: string }
> = {
  animal: {
    pillBorder: "border-green-300",
    pillText: "text-green-600",
    pillHover: "hover:bg-green-50",
    borderBottom: "border-green-100",
  },
  tarot: {
    pillBorder: "border-purple-300",
    pillText: "text-purple-600",
    pillHover: "hover:bg-purple-50",
    borderBottom: "border-purple-100",
  },
  numerology: {
    pillBorder: "border-violet-300",
    pillText: "text-violet-600",
    pillHover: "hover:bg-violet-50",
    borderBottom: "border-violet-100",
  },
  personality: {
    pillBorder: "border-teal-300",
    pillText: "text-teal-600",
    pillHover: "hover:bg-teal-50",
    borderBottom: "border-teal-100",
  },
  palm: {
    pillBorder: "border-purple-300",
    pillText: "text-purple-600",
    pillHover: "hover:bg-purple-50",
    borderBottom: "border-purple-100",
  },
  dinosaur: {
    pillBorder: "border-emerald-300",
    pillText: "text-emerald-600",
    pillHover: "hover:bg-emerald-50",
    borderBottom: "border-emerald-100",
  },
  "blood-type": {
    pillBorder: "border-rose-300",
    pillText: "text-rose-600",
    pillHover: "hover:bg-rose-50",
    borderBottom: "border-rose-100",
  },
  dream: {
    pillBorder: "border-indigo-300",
    pillText: "text-indigo-600",
    pillHover: "hover:bg-indigo-50",
    borderBottom: "border-indigo-100",
  },
  "name-fortune": {
    pillBorder: "border-cyan-300",
    pillText: "text-cyan-600",
    pillHover: "hover:bg-cyan-50",
    borderBottom: "border-cyan-100",
  },
  calendar: {
    pillBorder: "border-amber-300",
    pillText: "text-amber-600",
    pillHover: "hover:bg-amber-50",
    borderBottom: "border-amber-100",
  },
  daily: {
    pillBorder: "border-rose-300",
    pillText: "text-rose-600",
    pillHover: "hover:bg-rose-50",
    borderBottom: "border-rose-100",
  },
  neutral: {
    pillBorder: "border-gray-300",
    pillText: "text-gray-600",
    pillHover: "hover:bg-gray-50",
    borderBottom: "border-gray-100",
  },
};

export default function PageHeader({
  variant = "fortune",
  theme,
  subText,
  links = [],
  sticky = true,
  dark = false,
}: {
  variant?: Variant;
  theme: Theme;
  /** 右端に表示する小さな補助テキスト（ページの種別表示など）。任意 */
  subText?: string;
  /** 左側に並べるピル型リンク。順序通りに表示される */
  links?: PageLink[];
  /** 画面にピン留めするか。デフォルト true */
  sticky?: boolean;
  /** ダーク背景ページ用（violet-950系・slate-900系）。半透明ダーク＋明色テキスト */
  dark?: boolean;
}) {
  const style = THEME_CLASSES[theme];
  const stickyClass = sticky ? "sticky top-0 z-10" : "";
  const containerBg = dark
    ? "bg-slate-900/80 backdrop-blur border-b border-white/10"
    : `bg-white border-b ${style.borderBottom}`;
  const pillText = dark ? "text-white/90" : style.pillText;
  const pillBorder = dark ? "border-white/20" : style.pillBorder;
  const pillHover = dark ? "hover:bg-white/10" : style.pillHover;
  const subTextClass = dark ? "text-gray-400" : "text-gray-400";
  const backTextClass = dark ? "text-white/90" : style.pillText;

  // article variant: 左に back リンク、右に TopBanner の特殊構成
  if (variant === "article") {
    const backLink = links.find((l) => l.type === "back");
    const otherLinks = links.filter((l) => l.type !== "back");
    return (
      <div className={`w-full ${stickyClass} ${containerBg}`}>
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {backLink && (
              <Link
                href={backLink.href}
                className={`text-sm ${backTextClass} hover:underline`}
              >
                {LINK_ICONS.back} {backLink.label ?? LINK_DEFAULT_LABELS.back}
              </Link>
            )}
            {otherLinks.map((link) => {
              const icon = link.icon ?? LINK_ICONS[link.type];
              const label = link.label ?? LINK_DEFAULT_LABELS[link.type];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs ${pillText} border ${pillBorder} rounded-full px-3 py-1 ${pillHover} transition-colors`}
                >
                  {icon} {label}
                </Link>
              );
            })}
          </div>
          <TopBannerLink />
        </div>
      </div>
    );
  }

  // fortune / guide: 左に TopBanner + ピル型リンク、右に subText
  return (
    <div className={`w-full ${stickyClass} ${containerBg}`}>
      <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TopBannerLink />
          {links.map((link) => {
            const icon = link.icon ?? LINK_ICONS[link.type];
            const label = link.label ?? LINK_DEFAULT_LABELS[link.type];
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs ${pillText} border ${pillBorder} rounded-full px-3 py-1 ${pillHover} transition-colors whitespace-nowrap`}
              >
                {icon} {label}
              </Link>
            );
          })}
        </div>
        {subText && (
          <span className={`text-xs ${subTextClass} whitespace-nowrap`}>{subText}</span>
        )}
      </div>
    </div>
  );
}
