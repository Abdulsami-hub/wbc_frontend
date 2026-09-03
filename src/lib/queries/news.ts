import { queryOptions } from "@tanstack/react-query";
import newsHero from "@/assets/news-hero.png";
import { apiFetch } from "@/lib/api";
import type { NewsItem, NewsPageContent } from "@/content/news";

type ApiButton = { label: string; url: string };

type ApiPayload = {
  hero: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    buttons: ApiButton[];
    image_url: string | null;
  } | null;
  articles: {
    id: number;
    slug: string;
    category: string;
    title: string;
    summary: string | null;
    published_at: string | null;
    image_url: string | null;
    image_alt: string | null;
    cta: string | null;
    detail: string | null;
    bullets: string[] | null;
    source_label: string | null;
    source_url: string | null;
  }[];
};

type NewsResponse = { data: ApiPayload };

const DEFAULTS: NewsPageContent = {
  hero: {
    kicker: "Updates",
    title: "News & Blogs",
    description: "Institutional activities, market signals, and stories from across the WBC network.",
    cta: { label: "Contact the Team", url: "/contact" },
    image: newsHero,
    imageAlt: "WBC colleagues reviewing reports and market insights",
  },
  articles: [],
};

let cachedEtag: string | null = null;
let cachedContent: NewsPageContent = DEFAULTS;

function firstCta(buttons: ApiButton[]): { label: string; url: string } | undefined {
  for (const button of buttons) {
    const label = button.label?.trim();
    const url = button.url?.trim();
    if (label && url) return { label, url };
  }
  return undefined;
}

export function formatNewsDate(value: string | null | undefined): string {
  if (!value) return "";

  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function mapArticle(item: ApiPayload["articles"][number]): NewsItem {
  const dateLabel = formatNewsDate(item.published_at);

  return {
    id: String(item.id),
    slug: item.slug,
    image: item.image_url ?? newsHero,
    alt: item.image_alt?.trim() || item.title,
    category: item.category,
    title: item.title,
    body: item.summary?.trim() ?? "",
    detail: item.detail?.trim() || item.summary?.trim() || "",
    bullets: (item.bullets ?? []).map((b) => b.trim()).filter(Boolean),
    sourceLabel: item.source_label?.trim() ?? "",
    sourceUrl: item.source_url?.trim() ?? "",
    cta: item.cta?.trim() || "Explore story",
    dateLabel,
    publishedAt: item.published_at,
  };
}

export function mapNewsPayload(payload: ApiPayload): NewsPageContent {
  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      cta: firstCta(payload.hero?.buttons ?? []) ?? DEFAULTS.hero.cta,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    articles: (payload.articles ?? []).map(mapArticle),
  };
}

export async function fetchNewsPage(): Promise<NewsPageContent> {
  const { data, etag, status } = await apiFetch<NewsResponse>("/api/news", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapNewsPayload(data.data);
  return cachedContent;
}

export const newsQueryKey = ["news-page"] as const;

export const newsQueryOptions = queryOptions({
  queryKey: newsQueryKey,
  queryFn: fetchNewsPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
