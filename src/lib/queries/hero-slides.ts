import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { HeroSlide } from "@/content/hero";

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
  sort_order: number;
  updated_at: string | null;
};

type HeroSlidesResponse = {
  data: ApiHeroSlide[];
};

const PANEL_CLASSES = ["bg-navy", "bg-orange", "bg-teal"] as const;

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

export function mapApiHeroSlide(slide: ApiHeroSlide, index: number): HeroSlide {
  const buttons = slide.buttons ?? [];
  const titleLines = slide.title.includes("\n")
    ? slide.title.split("\n").map((line) => line.trim()).filter(Boolean)
    : [slide.title];

  return {
    id: String(slide.id),
    layout: "half-color",
    eyebrow: slide.kicker?.trim() || "World Business Council",
    title: titleLines.length > 0 ? titleLines : [slide.title],
    description: slide.description?.trim() ?? "",
    panelClass: PANEL_CLASSES[index % PANEL_CLASSES.length],
    image: slide.image_url ?? undefined,
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
