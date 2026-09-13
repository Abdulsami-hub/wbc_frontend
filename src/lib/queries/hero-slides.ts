import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { HeroSlide } from "@/content/hero";
import { HERO_BACKGROUND_STYLES, normalizeHeroBackground, normalizeHeroLayout } from "@/content/hero";
import { mapHeroMedia } from "@/lib/hero-media";

export type ApiHeroButton = {
  label: string;
  url: string;
};

export type ApiHeroSlide = {
  id: number;
  kicker: string | null;
  title: string;
  description: string | null;
  buttons: ApiHeroButton[];
  image_url: string | null;
  background_color?: string | null;
  layout?: string | null;
  media_type?: string | null;
  video_source?: string | null;
  video_url?: string | null;
  youtube_url?: string | null;
  youtube_embed_url?: string | null;
  sort_order: number;
  updated_at: string | null;
};

type HeroSlidesResponse = {
  data: ApiHeroSlide[];
};

let cachedEtag: string | null = null;
let cachedSlides: HeroSlide[] = [];

function mapButton(
  button: ApiHeroButton | undefined,
  fallback: HeroSlide["primary"],
): HeroSlide["primary"] | undefined {
  if (!button?.label?.trim()) return undefined;
  return {
    label: button.label.trim(),
    to: button.url?.trim() || fallback.to,
    variant: fallback.variant,
  };
}

export function mapApiHeroSlide(slide: ApiHeroSlide): HeroSlide {
  const buttons = slide.buttons ?? [];
  const titleLines = slide.title.includes("\n")
    ? slide.title.split("\n").map((line) => line.trim()).filter(Boolean)
    : [slide.title];
  const background = normalizeHeroBackground(slide.background_color);
  const styles = HERO_BACKGROUND_STYLES[background];

  return {
    id: String(slide.id),
    layout: normalizeHeroLayout(slide.layout),
    eyebrow: slide.kicker?.trim() || "World Business Council",
    title: titleLines.length > 0 ? titleLines : [slide.title],
    description: slide.description?.trim() ?? "",
    background,
    panelClass: styles.panelClass,
    overlayClass: styles.overlayClass,
    image: slide.image_url ?? undefined,
    ...mapHeroMedia(slide),
    alt: slide.title,
    primary: mapButton(buttons[0], {
      label: "Who We Are",
      to: "/who-we-are",
      variant: "outline",
    })!,
    secondary: mapButton(buttons[1], {
      label: "What We Do",
      to: "/what-we-do",
      variant: "ghost",
    }),
  };
}

export async function fetchHeroSlides(): Promise<HeroSlide[]> {
  const { data, etag, status } = await apiFetch<HeroSlidesResponse>("/api/hero-slides", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) {
    return cachedSlides;
  }

  cachedEtag = etag;
  cachedSlides = (data.data ?? []).map(mapApiHeroSlide);
  return cachedSlides;
}

export const heroSlidesQueryKey = ["hero-slides"] as const;

/** Prefetch on route load; poll so admin edits appear within a few seconds. */
export const heroSlidesQueryOptions = queryOptions({
  queryKey: heroSlidesQueryKey,
  queryFn: fetchHeroSlides,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
