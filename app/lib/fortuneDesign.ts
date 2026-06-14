/** トップページと統一した占いサイト共通デザイントークン */

export const fortunePageBackground =
  "min-h-screen bg-[linear-gradient(180deg,#fffaf8_0%,#fff7fb_38%,#ffffff_100%)] text-slate-900";

export const fortuneContentContainer =
  "mx-auto w-full max-w-lg px-4 pb-10 pt-3 space-y-6";

export const yuGothic =
  "[font-family:var(--font-jp-sans)]";

export const yuMincho =
  "[font-family:var(--font-jp-display)]";

export const fortunePageTitle = `text-2xl font-black leading-tight tracking-wide text-purple-950 ${yuMincho}`;

export const fortunePageDescription = `text-[12.5px] font-medium leading-5 text-purple-950/80 ${yuGothic}`;

export const fortuneContentCard =
  "rounded-[22px] border border-purple-100 bg-white shadow-md shadow-purple-100/60";

export const fortuneMenuCard =
  "rounded-[22px] border border-purple-100 bg-white/90 p-4 shadow-sm shadow-purple-100/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-purple-200 hover:shadow-lg hover:shadow-purple-200/70 active:scale-[0.99]";

export type FortuneTheme =
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
  | "neutral"
  | "indigo"
  | "amber"
  | "cyan"
  | "rose"
  | "violet"
  | "teal"
  | "green";

export const THEME_ACCENT: Record<
  FortuneTheme,
  { pillBorder: string; pillText: string; pillHover: string; badge: string }
> = {
  animal: {
    pillBorder: "border-emerald-200",
    pillText: "text-emerald-700",
    pillHover: "hover:bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  tarot: {
    pillBorder: "border-purple-200",
    pillText: "text-purple-700",
    pillHover: "hover:bg-purple-50",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  numerology: {
    pillBorder: "border-violet-200",
    pillText: "text-violet-700",
    pillHover: "hover:bg-violet-50",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  personality: {
    pillBorder: "border-teal-200",
    pillText: "text-teal-700",
    pillHover: "hover:bg-teal-50",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
  },
  palm: {
    pillBorder: "border-purple-200",
    pillText: "text-purple-700",
    pillHover: "hover:bg-purple-50",
    badge: "bg-purple-50 text-purple-700 border-purple-200",
  },
  dinosaur: {
    pillBorder: "border-emerald-200",
    pillText: "text-emerald-700",
    pillHover: "hover:bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  "blood-type": {
    pillBorder: "border-rose-200",
    pillText: "text-rose-700",
    pillHover: "hover:bg-rose-50",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  dream: {
    pillBorder: "border-indigo-200",
    pillText: "text-indigo-700",
    pillHover: "hover:bg-indigo-50",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  "name-fortune": {
    pillBorder: "border-cyan-200",
    pillText: "text-cyan-700",
    pillHover: "hover:bg-cyan-50",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  calendar: {
    pillBorder: "border-amber-200",
    pillText: "text-amber-700",
    pillHover: "hover:bg-amber-50",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  daily: {
    pillBorder: "border-rose-200",
    pillText: "text-rose-700",
    pillHover: "hover:bg-rose-50",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  neutral: {
    pillBorder: "border-slate-200",
    pillText: "text-slate-600",
    pillHover: "hover:bg-slate-50",
    badge: "bg-slate-50 text-slate-600 border-slate-200",
  },
  indigo: {
    pillBorder: "border-indigo-200",
    pillText: "text-indigo-700",
    pillHover: "hover:bg-indigo-50",
    badge: "bg-indigo-50 text-indigo-700 border-indigo-200",
  },
  amber: {
    pillBorder: "border-amber-200",
    pillText: "text-amber-700",
    pillHover: "hover:bg-amber-50",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  cyan: {
    pillBorder: "border-cyan-200",
    pillText: "text-cyan-700",
    pillHover: "hover:bg-cyan-50",
    badge: "bg-cyan-50 text-cyan-700 border-cyan-200",
  },
  rose: {
    pillBorder: "border-rose-200",
    pillText: "text-rose-700",
    pillHover: "hover:bg-rose-50",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
  violet: {
    pillBorder: "border-violet-200",
    pillText: "text-violet-700",
    pillHover: "hover:bg-violet-50",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  teal: {
    pillBorder: "border-teal-200",
    pillText: "text-teal-700",
    pillHover: "hover:bg-teal-50",
    badge: "bg-teal-50 text-teal-700 border-teal-200",
  },
  green: {
    pillBorder: "border-emerald-200",
    pillText: "text-emerald-700",
    pillHover: "hover:bg-emerald-50",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};
