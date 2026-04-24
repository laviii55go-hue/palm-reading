import Link from "next/link";

type Variant = "numerology" | "personality" | "tarot" | "animal";

const STYLES = {
  numerology: {
    base: "border-violet-300 bg-violet-50 text-violet-700 hover:bg-violet-100",
  },
  personality: {
    base: "border-teal-300 bg-teal-50 text-teal-700 hover:bg-teal-100",
  },
  tarot: {
    base: "border-purple-300 bg-purple-50 text-purple-700 hover:bg-purple-100",
  },
  animal: {
    base: "border-green-300 bg-green-50 text-green-700 hover:bg-green-100",
  },
} as const;

const LINKS = {
  numerology: [
    { href: "/lucky-number", label: "数秘術占い" },
    { href: "/articles", label: "記事一覧（共通）" },
    { href: "/numerology-guide", label: "ガイド" },
  ],
  personality: [
    { href: "/personality", label: "16タイプ診断" },
    { href: "/articles", label: "記事一覧（共通）" },
    { href: "/personality-guide", label: "ガイド" },
  ],
  tarot: [
    { href: "/tarot", label: "タロット占い" },
    { href: "/articles", label: "記事一覧（共通）" },
    { href: "/tarot-guide", label: "ガイド" },
  ],
  animal: [
    { href: "/animal", label: "動物占い" },
    { href: "/articles", label: "記事一覧（共通）" },
    { href: "/animal-guide", label: "ガイド" },
  ],
} as const;

export default function ColumnNavPills({ variant }: { variant: Variant }) {
  const style = STYLES[variant];
  const links = LINKS[variant];

  return (
    <div className="flex flex-wrap gap-2">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${style.base}`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
