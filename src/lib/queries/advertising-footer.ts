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
  buttonLabel: string;
  buttonUrl: string;
};

type ApiFooterCarouselItem = {
  id: number;
  kicker: string | null;
  title: string;
  description: string | null;
  media_type?: string | null;
  image_url: string | null;
  video_url?: string | null;
  video_source?: string | null;
  youtube_url?: string | null;
  button_label?: string | null;
  button_url?: string | null;
  sort_order: number;
  updated_at: string | null;
};

type FooterCarouselResponse = {
  data: ApiFooterCarouselItem[];
};

const FALLBACK_IMAGES = [eventsImg, forumImg] as const;
const DEFAULT_BUTTON_LABEL = "Enquire about advertising";
const DEFAULT_BUTTON_URL = "/advertising";

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
    buttonLabel: item.button_label?.trim() || DEFAULT_BUTTON_LABEL,
    buttonUrl: item.button_url?.trim() || DEFAULT_BUTTON_URL,
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
