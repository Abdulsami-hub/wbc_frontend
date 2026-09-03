import { queryOptions } from "@tanstack/react-query";
import eventsImg from "@/assets/events.jpg";
import { apiFetch } from "@/lib/api";
import type { EventMediaItem, EventRecord, EventsPageContent } from "@/content/events";

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
  categories: {
    id: number;
    slug: string;
    title: string;
    description: string | null;
  }[];
  events: {
    id: number;
    slug: string;
    category_id: string | null;
    title: string;
    summary: string | null;
    description: string | null;
    date_label: string | null;
    location: string | null;
    image_url: string | null;
    registration_url: string | null;
    registration_fee: string | null;
    agenda: { time?: string; title?: string }[] | null;
    speakers: { name?: string; role?: string }[] | null;
    media: {
      type?: string;
      caption?: string | null;
      url?: string | null;
      photos?: { url: string }[];
    }[] | null;
  }[];
};

type EventsResponse = { data: ApiPayload };

const DEFAULTS: EventsPageContent = {
  hero: {
    kicker: "Global Programme",
    title: "Events",
    description:
      "Special events, business programmes, workshops, and network events bringing the WBC community together.",
    cta: { label: "Get Event Updates", url: "/contact" },
    image: eventsImg,
    imageAlt: "Delegates attending an international WBC business forum",
  },
  categories: [],
  events: [],
};

let cachedEtag: string | null = null;
let cachedContent: EventsPageContent = DEFAULTS;

/** First button with both label and URL becomes the hero CTA. Empty-url labels are ignored (no tags). */
function firstCta(buttons: ApiButton[]): { label: string; url: string } | undefined {
  for (const button of buttons) {
    const label = button.label?.trim();
    const url = button.url?.trim();
    if (label && url) return { label, url };
  }
  return undefined;
}

function mapMedia(items: ApiPayload["events"][number]["media"]): EventMediaItem[] {
  return (items ?? [])
    .map((item) => {
      const photos = (item.photos ?? [])
        .map((photo) => ({ url: photo.url?.trim() ?? "" }))
        .filter((photo) => photo.url);
      const url = item.url?.trim() || photos[0]?.url || "";
      if (!url && photos.length === 0) return null;

      return {
        type: item.type?.trim() || "photo",
        url,
        caption: item.caption?.trim() || undefined,
        photos: photos.length > 0 ? photos : undefined,
      } satisfies EventMediaItem;
    })
    .filter((item): item is EventMediaItem => item !== null);
}

function mapEvent(item: ApiPayload["events"][number]): EventRecord {
  return {
    id: String(item.id),
    slug: item.slug,
    categoryId: item.category_id?.trim() ?? "",
    title: item.title,
    summary: item.summary?.trim() ?? "",
    description: item.description?.trim() ?? "",
    dateLabel: item.date_label?.trim() || "Date TBA",
    location: item.location?.trim() || "Location TBA",
    image: item.image_url ?? eventsImg,
    registrationUrl: item.registration_url?.trim() || undefined,
    registrationFee: item.registration_fee?.trim() || undefined,
    agenda: (item.agenda ?? [])
      .map((row) => ({
        time: row.time?.trim() ?? "",
        title: row.title?.trim() ?? "",
      }))
      .filter((row) => row.time || row.title),
    speakers: (item.speakers ?? [])
      .map((row) => ({
        name: row.name?.trim() ?? "",
        role: row.role?.trim() ?? "",
      }))
      .filter((row) => row.name),
    media: mapMedia(item.media),
  };
}

export function mapEventsPayload(payload: ApiPayload): EventsPageContent {
  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      cta: firstCta(payload.hero?.buttons ?? []) ?? DEFAULTS.hero.cta,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    categories: (payload.categories ?? []).map((category) => ({
      id: category.slug,
      title: category.title,
      desc: category.description?.trim() ?? "",
    })),
    events: (payload.events ?? []).map(mapEvent),
  };
}

export async function fetchEventsPage(): Promise<EventsPageContent> {
  const { data, etag, status } = await apiFetch<EventsResponse>("/api/events", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapEventsPayload(data.data);
  return cachedContent;
}

export const eventsQueryKey = ["events-page"] as const;

export const eventsQueryOptions = queryOptions({
  queryKey: eventsQueryKey,
  queryFn: fetchEventsPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
