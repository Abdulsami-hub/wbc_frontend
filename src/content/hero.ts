/**
 * Homepage hero slider types and timing constants.
 * Slide data is loaded from the backend API — see `@/lib/queries/hero-slides`.
 */
export type HeroLayout = "half-color" | "full";

export type HeroBackground = "navy" | "blue" | "orange";

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
  /** Tailwind panel class for the solid brand color */
  panelClass: string;
  /** Overlay used on full-bleed image layouts */
  overlayClass: string;
  background: HeroBackground;
  image?: string;
  videoUrl?: string;
  alt?: string;
  primary: HeroCta;
  secondary?: HeroCta;
};

export const HERO_BACKGROUND_STYLES: Record<HeroBackground, { panelClass: string; overlayClass: string }> = {
  navy: { panelClass: "bg-navy", overlayClass: "bg-navy/55" },
  blue: { panelClass: "bg-blue", overlayClass: "bg-blue/55" },
  orange: { panelClass: "bg-orange", overlayClass: "bg-orange/55" },
};

export function normalizeHeroBackground(value: string | null | undefined): HeroBackground {
  if (value === "blue" || value === "orange" || value === "navy") return value;
  return "navy";
}

export function normalizeHeroLayout(value: string | null | undefined): HeroLayout {
  return value === "full" ? "full" : "half-color";
}

export type PageHeroLayout = "current" | "full";

export type PageHeroAppearance = {
  background: HeroBackground;
  layout: PageHeroLayout;
};

export function normalizePageHeroLayout(value: string | null | undefined): PageHeroLayout {
  return value === "full" ? "full" : "current";
}

export const PAGE_HERO_PANEL: Record<HeroBackground, string> = {
  navy: "bg-navy",
  blue: "bg-blue",
  orange: "bg-orange",
};

export const HERO_INTERVAL_MS = 6000;
