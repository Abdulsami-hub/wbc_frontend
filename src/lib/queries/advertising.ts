import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { AdvertisingFormat, AdvertisingPageContent } from "@/content/advertising";

export type ApiAdvertisingButton = {
  label: string;
  url: string;
};

type ApiAdvertisingHero = {
  id: number;
  kicker: string | null;
  title: string;
  description: string | null;
  buttons: ApiAdvertisingButton[];
  image_url: string | null;
  updated_at: string | null;
};

type ApiAdvertisingOverview = {
  id: number;
  kicker: string | null;
  title: string;
  description: string | null;
  updated_at: string | null;
};

type ApiAdvertisingFormat = {
  id: number;
  title: string;
  description: string | null;
  sort_order: number;
  updated_at: string | null;
};

type ApiAdvertisingPdf = {
  id: number;
  kicker: string | null;
  title: string | null;
  description: string | null;
  button_label: string | null;
  file_url: string | null;
  file_name: string | null;
  updated_at: string | null;
};

type ApiAdvertisingPayload = {
  hero: ApiAdvertisingHero | null;
  overview: ApiAdvertisingOverview | null;
  formats: ApiAdvertisingFormat[];
  pdf: ApiAdvertisingPdf | null;
};

type AdvertisingResponse = {
  data: ApiAdvertisingPayload;
};

const DEFAULTS: AdvertisingPageContent = {
  hero: {
    eyebrow: "Advertising",
    title: "Advertising",
    description:
      "The World Business Council (WBC) offers advertising opportunities through its website to help businesses, organizations and institutions increase their visibility and promote their products, services, events and initiatives to an international business audience.",
    tags: [],
    imageAlt: "Business audience at a WBC programme",
  },
  overview: {
    kicker: "Website advertising",
    title: "Reach an international business audience",
    description:
      "Advertising space is available in the WBC website footer, providing opportunities to display engaging promotional content and direct visitors to your business or campaign.",
  },
  formats: [],
  pdf: {
    kicker: "Media kit",
    title: "WBC Advertising Media Kit",
    description:
      "Technical specifications, copy guidelines, and submission requirements for video and poster/banner advertising.",
    buttonLabel: "WBC Advertising Media Kit",
    fileUrl: "/advertising-rates.pdf",
    fileName: "WBC-Advertising-Media-Kit.pdf",
  },
};

let cachedEtag: string | null = null;
let cachedContent: AdvertisingPageContent = DEFAULTS;

export function mapAdvertisingPayload(payload: ApiAdvertisingPayload): AdvertisingPageContent {
  const heroButtons = payload.hero?.buttons ?? [];
  const tags = heroButtons.map((b) => b.label?.trim()).filter(Boolean);

  const pdf = payload.pdf;

  return {
    hero: {
      eyebrow: payload.hero?.kicker?.trim() || DEFAULTS.hero.eyebrow,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      tags: tags.length > 0 ? tags : DEFAULTS.hero.tags,
      image: payload.hero?.image_url ?? undefined,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    overview: {
      kicker: payload.overview?.kicker?.trim() || DEFAULTS.overview.kicker,
      title: payload.overview?.title?.trim() || DEFAULTS.overview.title,
      description: payload.overview?.description?.trim() || DEFAULTS.overview.description,
    },
    formats: (payload.formats ?? []).map(
      (format): AdvertisingFormat => ({
        id: String(format.id),
        title: format.title,
        summary: format.description?.trim() ?? "",
      }),
    ),
    pdf: {
      kicker: pdf?.kicker?.trim() || DEFAULTS.pdf.kicker,
      title: pdf?.title?.trim() || DEFAULTS.pdf.title,
      description: pdf?.description?.trim() || DEFAULTS.pdf.description,
      buttonLabel: pdf?.button_label?.trim() || DEFAULTS.pdf.buttonLabel,
      fileUrl: pdf?.file_url?.trim() || DEFAULTS.pdf.fileUrl,
      fileName: pdf?.file_name?.trim() || DEFAULTS.pdf.fileName,
    },
  };
}

export async function fetchAdvertisingPage(): Promise<AdvertisingPageContent> {
  const { data, etag, status } = await apiFetch<AdvertisingResponse>("/api/advertising", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) {
    return cachedContent;
  }

  cachedEtag = etag;
  cachedContent = mapAdvertisingPayload(data.data);
  return cachedContent;
}

export const advertisingQueryKey = ["advertising-page"] as const;

export const advertisingQueryOptions = queryOptions({
  queryKey: advertisingQueryKey,
  queryFn: fetchAdvertisingPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
