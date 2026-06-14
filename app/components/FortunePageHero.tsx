import Image from "next/image";
import { fortunePageDescription, fortunePageTitle, type FortuneTheme, THEME_ACCENT } from "../lib/fortuneDesign";

type FortunePageHeroProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
  theme?: FortuneTheme;
  badge?: string;
};

export default function FortunePageHero({
  title,
  description,
  imageSrc,
  imageAlt,
  theme = "neutral",
  badge,
}: FortunePageHeroProps) {
  const accent = THEME_ACCENT[theme];

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[22px] border border-purple-100 shadow-lg shadow-purple-100/70">
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          width={640}
          height={320}
          className="aspect-[2/1] w-full object-cover"
          priority
        />
      </div>
      <div className="space-y-2 text-center">
        {badge ? (
          <div
            className={`inline-flex rounded-full border px-3 py-1 text-[11px] font-bold ${accent.badge}`}
          >
            {badge}
          </div>
        ) : null}
        <h1 className={fortunePageTitle}>{title}</h1>
        <p className={`mx-auto max-w-md ${fortunePageDescription}`}>{description}</p>
      </div>
    </div>
  );
}
