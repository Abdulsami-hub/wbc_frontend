import type { HeroBackground, PageHeroLayout } from "@/content/hero";
import { normalizeHeroBackground, normalizePageHeroLayout } from "@/content/hero";

export type ApiHeroAppearance = {
  background_color?: string | null;
  layout?: string | null;
};

export function mapHeroAppearance(
  hero: ApiHeroAppearance | null | undefined,
  fallbackBackground: HeroBackground = "navy",
): { background: HeroBackground; layout: PageHeroLayout } {
  return {
    background: hero?.background_color
      ? normalizeHeroBackground(hero.background_color)
      : fallbackBackground,
    layout: normalizePageHeroLayout(hero?.layout),
  };
}
