import { Link } from "@tanstack/react-router";

export type HeroTone = "navy" | "orange" | "blue";

const TONE_BG: Record<HeroTone, string> = {
  navy: "bg-navy",
  orange: "bg-orange",
  blue: "bg-teal",
};

export function SplitHero({
  eyebrow,
  title,
  description,
  tags,
  image,
  imageAlt,
  ctaLabel,
  ctaTo,
  ctaHash,
  tone = "navy",
}: {
  eyebrow: string;
  title: string;
  description: string;
  tags?: readonly string[];
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaTo?: string;
  ctaHash?: string;
  /** Brand panel color: navy #0c3163 · orange #fe4812 · blue #0d67c2 */
  tone?: HeroTone;
}) {
  return (
    <section className="grid lg:grid-cols-[1.15fr_1fr]">
      <div className={`${TONE_BG[tone]} px-6 py-16 sm:px-10 lg:py-24 xl:px-20`}>
        <div className="mx-auto max-w-xl">
          <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white uppercase">{eyebrow}</p>
          <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
            {title}
          </h1>
          <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">{description}</p>
          {tags && tags.length > 0 && (
            <ul className="intro-4 mt-9 flex flex-wrap gap-3">
              {tags.map((t) => (
                <li key={t} className="border border-white/60 px-4 py-2.5 text-[14px] font-semibold text-white">
                  {t}
                </li>
              ))}
            </ul>
          )}
          {ctaLabel && ctaTo && (
            <Link
              to={ctaTo}
              {...(ctaHash ? { hash: ctaHash } : {})}
              className="intro-4 mt-8 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
            >
              {ctaLabel} <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          )}
        </div>
      </div>
      <div className="relative min-h-[280px] bg-navy-deep lg:min-h-0">
        <img
          src={image}
          alt={imageAlt}
          width={1200}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 size-full object-cover"
        />
      </div>
    </section>
  );
}
