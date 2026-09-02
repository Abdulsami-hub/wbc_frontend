import { queryOptions } from "@tanstack/react-query";
import eventsImg from "@/assets/events.jpg";
import forumImg from "@/assets/news-forum.jpg";
import { apiFetch } from "@/lib/api";

export type FooterCarouselItem = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

type ApiFooterCarouselItem = {
  id: number;
  kicker: string | null;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
  updated_at: string | null;
};

type FooterCarouselResponse = {
  data: ApiFooterCarouselItem[];
};

const FALLBACK_IMAGES = [eventsImg, forumImg] as const;

function deriveKicker(title: string, kicker: string | null): string {
  if (kicker?.trim()) return kicker.trim();
  if (/video/i.test(title)) return "Video";
  if (/poster|banner|visual/i.test(title)) return "Visual";
  return title.split(/\s+/)[0] ?? "Format";
}

export function mapFooterCarouselItem(
  item: ApiFooterCarouselItem,
  index: number,
): FooterCarouselItem {
  return {
    id: String(item.id),
    kicker: deriveKicker(item.title, item.kicker),
    title: item.title,
    body: item.description?.trim() ?? "",
    image: item.image_url ?? FALLBACK_IMAGES[index % FALLBACK_IMAGES.length],
    alt: item.title,
  };
}

let cachedEtag: string | null = null;
let cachedItems: FooterCarouselItem[] = [];

export async function fetchFooterCarousel(): Promise<FooterCarouselItem[]> {
  const { data, etag, status } = await apiFetch<FooterCarouselResponse>(
    "/api/advertising/footer-carousel",
    { etag: cachedEtag ?? undefined },
  );

  if (status === 304) {
    return cachedItems;
  }

  cachedEtag = etag;
  cachedItems = (data.data ?? []).map(mapFooterCarouselItem);
  return cachedItems;
}

export const footerCarouselQueryKey = ["advertising-footer-carousel"] as const;

export const footerCarouselQueryOptions = queryOptions({
  queryKey: footerCarouselQueryKey,
  queryFn: fetchFooterCarousel,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
