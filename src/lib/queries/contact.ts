import { queryOptions } from "@tanstack/react-query";
import contactHero from "@/assets/contact-hero.png";
import { apiFetch } from "@/lib/api";

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
  info: {
    section_title: string | null;
    section_description: string | null;
    address_label: string | null;
    address: string | null;
    email: string | null;
    website_url: string | null;
    website_label: string | null;
    map_lat: number | null;
    map_lng: number | null;
    map_embed_url: string | null;
    map_link_url: string | null;
  } | null;
};

type ContactResponse = { data: ApiPayload };

export type ContactPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    cta?: { label: string; url: string };
    image: string;
    imageAlt: string;
  };
  info: {
    sectionTitle: string;
    sectionDescription: string;
    addressLabel: string;
    address: string;
    email: string;
    websiteUrl: string;
    websiteLabel: string;
    mapLat: number | null;
    mapLng: number | null;
    mapLinkUrl: string;
    hasMap: boolean;
  };
};

const DEFAULTS: ContactPageContent = {
  hero: {
    kicker: "Get in Touch",
    title: "Contact Us",
    description: "Questions about membership, partnerships, or events? Our team is here to help.",
    image: contactHero,
    imageAlt: "World Business Council contact",
  },
  info: {
    sectionTitle: "Contact Information",
    sectionDescription: "",
    addressLabel: "Address",
    address: "",
    email: "",
    websiteUrl: "",
    websiteLabel: "",
    mapLat: null,
    mapLng: null,
    mapLinkUrl: "",
    hasMap: false,
  },
};

let cachedEtag: string | null = null;
let cachedContent: ContactPageContent = DEFAULTS;

function firstCta(buttons: ApiButton[]): { label: string; url: string } | undefined {
  for (const button of buttons) {
    const label = button.label?.trim();
    const url = button.url?.trim();
    if (label && url) return { label, url };
  }
  return undefined;
}

export function mapContactPayload(payload: ApiPayload): ContactPageContent {
  const info = payload.info;
  const mapLat = typeof info?.map_lat === "number" ? info.map_lat : null;
  const mapLng = typeof info?.map_lng === "number" ? info.map_lng : null;
  const mapLinkUrl = info?.map_link_url?.trim() || "";

  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      cta: firstCta(payload.hero?.buttons ?? []),
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    info: {
      sectionTitle: info?.section_title?.trim() || DEFAULTS.info.sectionTitle,
      sectionDescription: info?.section_description?.trim() || "",
      addressLabel: info?.address_label?.trim() || DEFAULTS.info.addressLabel,
      address: info?.address?.trim() || "",
      email: info?.email?.trim() || "",
      websiteUrl: info?.website_url?.trim() || "",
      websiteLabel: info?.website_label?.trim() || info?.website_url?.trim() || "",
      mapLat,
      mapLng,
      mapLinkUrl,
      hasMap: mapLat != null && mapLng != null,
    },
  };
}

export async function fetchContactPage(): Promise<ContactPageContent> {
  const { data, etag, status } = await apiFetch<ContactResponse>("/api/contact", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapContactPayload(data.data);
  return cachedContent;
}

export const contactQueryKey = ["contact-page"] as const;

export const contactQueryOptions = queryOptions({
  queryKey: contactQueryKey,
  queryFn: fetchContactPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
