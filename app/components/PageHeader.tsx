"use client";

import Link from "next/link";
import { type FortuneTheme, THEME_ACCENT } from "../lib/fortuneDesign";

export type LinkType = "fortune" | "guide" | "articles" | "back";

export type PageLink = {
  type: LinkType;
  href: string;
  label?: string;
  icon?: string;
};

export type PageHeaderProps = {
  variant?: "fortune" | "guide" | "article";
  theme: FortuneTheme;
  subText?: string;
  links?: PageLink[];
  sticky?: boolean;
  dark?: boolean;
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

function HeaderPill({
  href,
  icon,
  label,
  dark,
  theme,
}: {
  href: string;
  icon: string;
  label: string;
  dark?: boolean;
  theme: FortuneTheme;
}) {
  const style = THEME_ACCENT[theme];

  if (dark) {
    return (
      <Link
        href={href}
        className="inline-flex shrink-0 items-center rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 transition-colors hover:bg-white/10 focus-visible:bg-white/10 focus-visible:outline-none"
      >
        {icon} {label}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 ${style.pillBorder} ${style.pillText} ${style.pillHover}`}
    >
      {icon} {label}
    </Link>
  );
}

export default function PageHeader({
  variant = "fortune",
  theme,
  subText,
  links = [],
  dark = false,
}: PageHeaderProps) {
  const style = THEME_ACCENT[theme];

  if (variant === "article") {
    const backLink = links.find((link) => link.type === "back");
    const otherLinks = links.filter((link) => link.type !== "back");

    return (
      <>
        {links.length > 0 ? (
          <div className={`mx-auto flex max-w-lg gap-2 overflow-x-auto px-4 py-2 ${dark ? "bg-slate-900/80" : "bg-white/80"}`}>
            {backLink ? (
              <Link
                href={backLink.href}
                className={`inline-flex shrink-0 items-center rounded-full border px-3 py-1 text-xs font-semibold ${dark ? "border-white/20 text-white/90" : `${style.pillBorder} ${style.pillText}`}`}
              >
                {LINK_ICONS.back} {backLink.label ?? LINK_DEFAULT_LABELS.back}
              </Link>
            ) : null}
            {otherLinks.map((link) => (
              <HeaderPill
                key={link.href}
                href={link.href}
                icon={link.icon ?? LINK_ICONS[link.type]}
                label={link.label ?? LINK_DEFAULT_LABELS[link.type]}
                dark={dark}
                theme={theme}
              />
            ))}
          </div>
        ) : null}
      </>
    );
  }

  return (
    <>
      {links.length > 0 ? (
        <div
          className="mx-auto flex max-w-lg gap-2 overflow-x-auto px-4 py-2"
        >
          {links.map((link) => (
            <HeaderPill
              key={link.href}
              href={link.href}
              icon={link.icon ?? LINK_ICONS[link.type]}
              label={link.label ?? LINK_DEFAULT_LABELS[link.type]}
              dark={dark}
              theme={theme}
            />
          ))}
        </div>
      ) : null}
    </>
  );
}
