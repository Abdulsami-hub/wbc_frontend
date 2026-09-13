import { queryOptions } from "@tanstack/react-query";
import eventsImg from "@/assets/events.jpg";
import { apiFetch } from "@/lib/api";
import { mapHeroAppearance } from "@/lib/hero-appearance";
import { mapHeroMedia } from "@/lib/hero-media";
import { youtubeEmbedUrlFromLink } from "@/content/hero";
import type {
  EventAgenda,
  EventAgendaColumn,
  EventBrand,
  EventExhibit,
  EventMediaItem,
  EventRecord,
  EventsPageContent,
} from "@/content/events";

type ApiButton = { label: string; url: string };

type ApiPayload = {
  hero: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    buttons: ApiButton[];
    image_url: string | null;
    background_color?: string | null;
    layout?: string | null;
    media_type?: string | null;
    video_source?: string | null;
    video_url?: string | null;
    youtube_url?: string | null;
    youtube_embed_url?: string | null;
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
    social_links: { platform?: string; label?: string; url?: string }[] | null;
    agenda:
      | {
          columns?: { id?: string; label?: string }[];
          rows?: Record<string, string>[];
        }
      | { time?: string; title?: string; description?: string }[]
      | null;
    speakers: { name?: string; role?: string; image?: string | null; image_url?: string | null }[] | null;
    partners: { name?: string; url?: string | null; logo?: string | null; logo_url?: string | null }[] | null;
    sponsors: { name?: string; url?: string | null; logo?: string | null; logo_url?: string | null }[] | null;
    media: {
      type?: string;
      caption?: string | null;
      url?: string | null;
      video_source?: string | null;
      youtube_url?: string | null;
      youtube_embed_url?: string | null;
      video_url?: string | null;
      photos?: { url: string }[];
    }[] | null;
  }[];
  page?: {
    glance?: { label?: string; value?: string }[] | null;
    buttons?: { label?: string; url?: string }[] | null;
    pricing?: {
      columns?: { id?: string; label?: string }[];
      rows?: Record<string, string>[];
    } | null;
    pricing_currency?: string | null;
    participants?: {
      columns?: { id?: string; label?: string }[];
      rows?: Record<string, string>[];
    } | null;
    exhibits?: {
      name?: string;
      booth?: string;
      description?: string;
      partner?: string;
    }[] | null;
    logistics?: string | null;
  } | null;
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
    background: "orange",
    layout: "current",
  },
  categories: [],
  events: [],
  page: {
    glance: [],
    buttons: [],
  },
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
      const videoUrl = item.video_url?.trim() || undefined;
      const youtubeUrl = item.youtube_url?.trim() || undefined;
      const youtubeEmbedUrl =
        item.video_source === "upload"
          ? undefined
          : item.youtube_embed_url?.trim() || youtubeEmbedUrlFromLink(youtubeUrl);
      const url = item.url?.trim() || photos[0]?.url || "";
      if (!url && photos.length === 0 && !youtubeEmbedUrl && !videoUrl) return null;

      return {
        type: item.type?.trim() || "photo",
        url: url || undefined,
        caption: item.caption?.trim() || undefined,
        photos: photos.length > 0 ? photos : undefined,
        youtubeUrl,
        youtubeEmbedUrl,
        videoUrl,
      } satisfies EventMediaItem;
    })
    .filter((item): item is EventMediaItem => item !== null);
}

function mapAgenda(raw: ApiPayload["events"][number]["agenda"]): EventAgenda | undefined {
  if (!raw) return undefined;

  if (Array.isArray(raw)) {
    const hasDescription = raw.some((row) => row.description?.trim());
    const columns: EventAgendaColumn[] = [
      { id: "time", label: "Time" },
      { id: "title", label: "Program" },
      ...(hasDescription ? [{ id: "description", label: "Description" }] : []),
    ];
    const rows = raw
      .map((row) => {
        const mapped: Record<string, string> = {
          time: row.time?.trim() ?? "",
          title: row.title?.trim() ?? "",
        };
        if (hasDescription) mapped.description = row.description?.trim() ?? "";
        return mapped;
      })
      .filter((row) => Object.values(row).some((value) => value !== ""));

    return rows.length > 0 ? { columns, rows } : undefined;
  }

  return mapTable(raw);
}

function mapTable(
  raw:
    | {
        columns?: { id?: string; label?: string }[];
        rows?: Record<string, string>[];
      }
    | null
    | undefined,
): EventAgenda | undefined {
  if (!raw) return undefined;

  const columns = (raw.columns ?? [])
    .map((column, index) => ({
      id: column.id?.trim() || `c${index}`,
      label: column.label?.trim() || "Column",
    }))
    .filter((column) => column.id);

  const columnIds = columns.map((column) => column.id);
  const rows = (raw.rows ?? [])
    .map((row) => {
      const mapped: Record<string, string> = {};
      for (const id of columnIds) {
        mapped[id] = String(row[id] ?? "").trim();
      }
      return mapped;
    })
    .filter((row) => Object.values(row).some((value) => value !== ""));

  if (columns.length === 0 || rows.length === 0) return undefined;

  return { columns, rows };
}

function mapExhibits(items: ApiPayload["events"][number]["exhibits"]): EventExhibit[] {
  return (items ?? [])
    .map((row) => ({
      name: row.name?.trim() ?? "",
      booth: row.booth?.trim() || undefined,
      description: row.description?.trim() || undefined,
      partner: row.partner?.trim() || undefined,
    }))
    .filter((row) => row.name || row.booth || row.description || row.partner);
}

function mapBrands(
  items: ApiPayload["events"][number]["partners"],
): EventBrand[] {
  return (items ?? [])
    .map((row) => ({
      name: row.name?.trim() ?? "",
      logo: row.logo_url?.trim() || undefined,
      href: row.url?.trim() || undefined,
    }))
    .filter((row) => row.name || row.logo);
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
    socialLinks: (item.social_links ?? [])
      .map((link) => ({
        platform: link.platform?.trim() ?? "",
        label: link.label?.trim() || link.platform?.trim() || "Link",
        url: link.url?.trim() ?? "",
      }))
      .filter((link) => link.url),
    agenda: mapAgenda(item.agenda),
    speakers: (item.speakers ?? [])
      .map((row) => ({
        name: row.name?.trim() ?? "",
        role: row.role?.trim() ?? "",
        image: row.image_url?.trim() || undefined,
      }))
      .filter((row) => row.name || row.role || row.image),
    partners: mapBrands(item.partners),
    sponsors: mapBrands(item.sponsors),
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
      ...mapHeroAppearance(payload.hero, "orange"),
      ...mapHeroMedia(payload.hero),
    },
    categories: (payload.categories ?? []).map((category) => ({
      id: category.slug,
      title: category.title,
      desc: category.description?.trim() ?? "",
    })),
    events: (payload.events ?? []).map(mapEvent),
    page: {
      glance: (payload.page?.glance ?? [])
        .map((row) => ({
          label: row.label?.trim() ?? "",
          value: row.value?.trim() ?? "",
        }))
        .filter((row) => row.label || row.value),
      buttons: (payload.page?.buttons ?? [])
        .map((button) => ({
          label: button.label?.trim() ?? "",
          url: button.url?.trim() ?? "",
        }))
        .filter((button) => button.label && button.url),
      pricing: mapTable(payload.page?.pricing),
      pricingCurrency: payload.page?.pricing_currency?.trim() || undefined,
      participants: mapTable(payload.page?.participants),
      exhibits: mapExhibits(payload.page?.exhibits),
      logistics: payload.page?.logistics?.trim() || undefined,
    },
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
