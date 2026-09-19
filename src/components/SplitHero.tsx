import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import type { HeroBackground, PageHeroLayout } from "@/content/hero";
import { PAGE_HERO_PANEL, youtubeBackgroundSrc } from "@/content/hero";

export type HeroTone = HeroBackground;

function HeroFill({
  image,
  imageAlt,
  videoUrl,
  youtubeEmbedUrl,
  imageFit = "cover",
}: {
  image?: string;
  imageAlt: string;
  videoUrl?: string;
  youtubeEmbedUrl?: string;
  imageFit?: "cover" | "contain";
}) {
  const fitClass = imageFit === "contain" ? "object-contain object-center" : "object-cover";

  if (youtubeEmbedUrl) {
    return (
      <iframe
        src={youtubeBackgroundSrc(youtubeEmbedUrl)}
        title={imageAlt}
        className="pointer-events-none absolute top-1/2 left-1/2 aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 scale-125 border-0"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (videoUrl) {
    return (
      <video
        className={`absolute inset-0 size-full ${fitClass}`}
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        aria-label={imageAlt}
      />
    );
  }

  if (!image) return null;

  return (
    <img
      src={image}
      alt={imageAlt}
      width={1600}
      height={900}
      fetchPriority="high"
      decoding="async"
      className={`absolute inset-0 size-full ${fitClass}`}
    />
  );
}

function PageHeroFrame({
  layout = "current",
  tone = "navy",
  image,
  imageAlt,
  imageFit = "cover",
  videoUrl,
  youtubeEmbedUrl,
  children,
}: {
  layout?: PageHeroLayout;
  tone?: HeroTone;
  image: string;
  imageAlt: string;
  imageFit?: "cover" | "contain";
  videoUrl?: string;
  youtubeEmbedUrl?: string;
  children: ReactNode;
}) {
  const panel = PAGE_HERO_PANEL[tone];
  const fill = (
    <HeroFill
      image={image}
      imageAlt={imageAlt}
      videoUrl={videoUrl}
      youtubeEmbedUrl={youtubeEmbedUrl}
      imageFit={imageFit}
    />
  );

  if (layout === "full") {
    return (
      <section className="relative flex flex-col overflow-hidden bg-navy">
        <div className="relative min-h-[38rem] lg:min-h-[560px]">
          {fill}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/15" aria-hidden="true" />
          <div className="container-wbc relative flex min-h-[38rem] items-center py-16 lg:min-h-[560px] lg:py-24">
            <div className="max-w-xl">{children}</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex flex-col">
      <div className={`absolute inset-y-0 start-0 hidden w-1/2 lg:block ${panel}`} aria-hidden="true" />
      <div className={`${panel} lg:bg-transparent`}>
        <div className="container-wbc py-16 lg:py-24">
          <div className="max-w-xl">{children}</div>
        </div>
      </div>
      <div className="hero-media-right bg-navy-deep">{fill}</div>
    </section>
  );
}

export function SplitHero({
  eyebrow,
  title,
  description,
  tags,
  image,
  imageAlt,
  ctaLabel,
  ctaTo,
  ctaHref,
  ctaDownload,
  ctaHash,
  tone = "navy",
  layout = "current",
  imageFit = "cover",
  videoUrl,
  youtubeEmbedUrl,
}: {
  eyebrow: string;
  title: string;
  description: string;
  tags?: readonly string[];
  image: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaTo?: string;
  /** External or file URL (used instead of `ctaTo` when set). */
  ctaHref?: string;
  ctaDownload?: string | boolean;
  ctaHash?: string;
  /** Brand panel color: navy #0c3163 · orange #fe4812 · blue #0d67c2 */
  tone?: HeroTone;
  layout?: PageHeroLayout;
  /** `contain` shows the full photo without cropping left or right. */
  imageFit?: "cover" | "contain";
  videoUrl?: string;
  youtubeEmbedUrl?: string;
}) {
  return (
    <PageHeroFrame
      layout={layout}
      tone={tone}
      image={image}
      imageAlt={imageAlt}
      imageFit={imageFit}
      videoUrl={videoUrl}
      youtubeEmbedUrl={youtubeEmbedUrl}
    >
      <p data-dynamic className="intro-1 hero-kicker">
        {eyebrow}
      </p>
      <h1
        data-dynamic
        className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]"
      >
        {title}
      </h1>
      <p data-dynamic className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
        {description}
      </p>
      {tags && tags.length > 0 && (
        <ul className="intro-4 mt-9 flex flex-wrap gap-3">
          {tags.map((t) => (
            <li
              key={t}
              data-dynamic
              className="border border-white/60 px-4 py-2.5 text-[14px] font-semibold text-white"
            >
              {t}
            </li>
          ))}
        </ul>
      )}
      {ctaLabel && (ctaHref || ctaTo) && (
        ctaHref ? (
          <a
            href={ctaHref}
            download={ctaDownload ?? true}
            data-dynamic
            className="intro-4 mt-8 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
          >
            {ctaLabel}{" "}
            <span aria-hidden="true" className="rtl-mirror">
              →
            </span>
          </a>
        ) : (
          <Link
            to={ctaTo!}
            {...(ctaHash ? { hash: ctaHash } : {})}
            data-dynamic
            className="intro-4 mt-8 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
          >
            {ctaLabel}{" "}
            <span aria-hidden="true" className="rtl-mirror">
              →
            </span>
          </Link>
        )
      )}
    </PageHeroFrame>
  );
}

export { PageHeroFrame };
