/**
 * Homepage hero slider types and timing constants.
 * Slide data is loaded from the backend API — see `@/lib/queries/hero-slides`.
 */
export type HeroLayout = "split" | "full" | "half-color" | "media";

export type HeroCta = {
  label: string;
  to: string;
  variant?: "outline" | "solid" | "ghost";
};

export type HeroSlide = {
  id: string;
  layout: HeroLayout;
  eyebrow: string;
  title: string[];
  description: string;
  /** Tailwind panel / overlay classes for brand color control */
  panelClass: string;
  image?: string;
  videoUrl?: string;
  alt?: string;
  primary: HeroCta;
  secondary?: HeroCta;
};

export const HERO_INTERVAL_MS = 6000;
