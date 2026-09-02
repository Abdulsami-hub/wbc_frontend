import { queryOptions } from "@tanstack/react-query";
import heroImg from "@/assets/affiliates-hero.png";
import { apiFetch } from "@/lib/api";
import type {
  AffiliateCity,
  AffiliateCountry,
  AffiliateProfile,
  AffiliateRegion,
  AffiliateStatus,
} from "@/content/affiliates";
import type {
  AffiliateDetails,
  AffiliateFaq,
  AffiliatesPageContent,
} from "@/content/affiliate-details";
import { emptyAffiliateDetails, flagUrlFromIso } from "@/content/affiliate-details";

type ApiButton = { label: string; url: string };

type ApiCity = {
  id: number;
  name: string;
  slug: string;
  public_slug?: string;
  is_active: boolean;
};

type ApiCountry = {
  id: number;
  name: string;
  slug: string;
  iso2: string | null;
  flag_url: string | null;
  is_active: boolean;
  cities: ApiCity[];
};

type ApiRegion = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  countries: ApiCountry[];
};

type ApiProfile = {
  id: number;
  hero_image_url: string | null;
  logo_url: string | null;
  location_intro: string | null;
  about: string | null;
  established: string | null;
  members_count: string | null;
  programmes_per_year: string | null;
  address: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  map_embed_url: string | null;
  services: { id: number; body: string }[];
  activities: { id: number; body: string }[];
  officers: {
    id: number;
    name: string;
    position: string;
    photo_url: string | null;
    email: string | null;
    phone: string | null;
  }[];
  media: {
    id: number;
    kind: string;
    display_url: string | null;
  }[];
  socials: { id: number; label: string; url: string }[];
} | null;

type ApiListPayload = {
  hero: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    buttons: ApiButton[];
    image_url: string | null;
  } | null;
  regions: ApiRegion[];
  faqs: { id: number; question: string; answer: string | null }[];
};

type ApiDetailPayload =
  | {
      kind: "region";
      id: number;
      name: string;
      slug: string;
      description: string | null;
      countries: ApiCountry[];
    }
  | {
      kind: "country";
      id: number;
      name: string;
      slug: string;
      iso2: string | null;
      flag_url: string | null;
      is_active: boolean;
      region: { id: number; name: string; slug: string } | null;
      cities: ApiCity[];
      profile: ApiProfile;
    }
  | {
      kind: "city";
      id: number;
      name: string;
      slug: string;
      public_slug: string | null;
      is_active: boolean;
      region: { id: number; name: string; slug: string } | null;
      country: {
        id: number;
        name: string;
        slug: string;
        iso2: string | null;
        flag_url: string | null;
      } | null;
      profile: ApiProfile;
    };

type ListResponse = { data: ApiListPayload };
type DetailResponse = { data: ApiDetailPayload };

const DEFAULT_FAQS: AffiliateFaq[] = [
  {
    id: "1",
    question: "What is a WBC affiliate?",
    answer:
      "A WBC affiliate is a country or city presence that connects local businesses and institutions with the global WBC network under shared standards and coordination from headquarters.",
  },
  {
    id: "2",
    question: "How do Active and Inactive statuses differ?",
    answer:
      "Active locations are currently engaged or operating. Inactive locations remain in the network record but are not currently operating.",
  },
  {
    id: "3",
    question: "How can we establish an affiliate?",
    answer:
      "Organizations and executives can contact WBC to discuss establishing presence in a city or country. A tailored support package is available.",
  },
];

const DEFAULTS: AffiliatesPageContent = {
  hero: {
    kicker: "Affiliates",
    title: "WBC Affiliates",
    description:
      "WBC affiliates play a key role in connecting entrepreneurs, institutions, and the wider business community with the global WBC network.",
    tags: ["Institutional Alignment", "Network Access", "Partnership Continuity"],
    cta: { label: "Fill the Application Form", url: "/contact" },
    image: heroImg,
    imageAlt: "WBC affiliate representatives meeting in front of a global network map",
  },
  regions: [],
  faqs: DEFAULT_FAQS,
};

let cachedEtag: string | null = null;
let cachedContent: AffiliatesPageContent = DEFAULTS;

function statusFrom(active: boolean): AffiliateStatus {
  return active ? "active" : "inactive";
}

function splitHeroButtons(buttons: ApiButton[]): { tags: string[]; cta?: { label: string; url: string } } {
  const tags: string[] = [];
  let cta: { label: string; url: string } | undefined;

  for (const button of buttons) {
    const label = button.label?.trim();
    const url = button.url?.trim();
    if (!label) continue;
    if (url) {
      if (!cta) cta = { label, url };
    } else {
      tags.push(label);
    }
  }

  return { tags, cta };
}

function mapCity(city: ApiCity, countrySlug: string): AffiliateCity {
  return {
    name: city.name,
    status: statusFrom(city.is_active),
    slug: city.public_slug || `${countrySlug}-${city.slug}`,
  };
}

function mapCountry(country: ApiCountry): AffiliateCountry {
  return {
    name: country.name,
    status: statusFrom(country.is_active),
    slug: country.slug,
    iso2: country.iso2 ?? undefined,
    flagUrl: country.flag_url || flagUrlFromIso(country.iso2),
    cities: (country.cities ?? []).map((city) => mapCity(city, country.slug)),
  };
}

function mapRegion(region: ApiRegion): AffiliateRegion {
  return {
    name: region.name,
    slug: region.slug,
    blurb: region.description?.trim() ?? "",
    countries: (region.countries ?? []).map(mapCountry),
  };
}

export function mapAffiliatesListPayload(payload: ApiListPayload): AffiliatesPageContent {
  const { tags, cta } = splitHeroButtons(payload.hero?.buttons ?? []);
  const regions = (payload.regions ?? []).map(mapRegion);
  const faqs: AffiliateFaq[] = (payload.faqs ?? []).map((faq) => ({
    id: String(faq.id),
    question: faq.question,
    answer: faq.answer?.trim() ?? "",
  }));

  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      tags: tags.length > 0 ? tags : DEFAULTS.hero.tags,
      cta: cta ?? DEFAULTS.hero.cta,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    regions,
    faqs: faqs.length > 0 ? faqs : DEFAULTS.faqs,
  };
}

export function mapProfileToDetails(
  profile: ApiProfile,
  fallbackLogo?: string,
): AffiliateDetails {
  if (!profile) {
    return { ...emptyAffiliateDetails(), logo: fallbackLogo };
  }

  const flyer = profile.media.find((m) => m.kind === "flyer" && m.display_url)?.display_url;
  const photos = profile.media
    .filter((m) => m.kind === "photo" && m.display_url)
    .map((m) => m.display_url!) ;
  const videos = profile.media
    .filter((m) => m.kind === "video" && m.display_url)
    .map((m) => m.display_url!);

  return {
    heroImage: profile.hero_image_url ?? undefined,
    logo: profile.logo_url || fallbackLogo,
    locationIntro: profile.location_intro?.trim() ?? "",
    about: profile.about?.trim() ?? "",
    services: profile.services.map((s) => s.body).filter(Boolean),
    activities: profile.activities.map((a) => a.body).filter(Boolean),
    officers: profile.officers.map((o) => ({
      name: o.name,
      position: o.position,
      photo: o.photo_url ?? undefined,
      email: o.email ?? undefined,
      phone: o.phone ?? undefined,
    })),
    contact: {
      address: profile.address ?? undefined,
      website: profile.website ?? undefined,
      email: profile.email ?? undefined,
      phone: profile.phone ?? undefined,
      mapEmbedUrl: profile.map_embed_url ?? undefined,
      socials: profile.socials.map((s) => ({ label: s.label, href: s.url })),
    },
    media: {
      flyer: flyer ?? undefined,
      photos,
      videos,
    },
    established: profile.established ?? undefined,
    membersCount: profile.members_count ?? undefined,
    programmesPerYear: profile.programmes_per_year ?? undefined,
  };
}

export type AffiliateDetailContent = {
  profile: AffiliateProfile;
  details?: AffiliateDetails;
};

export function mapAffiliateDetailPayload(payload: ApiDetailPayload): AffiliateDetailContent {
  if (payload.kind === "region") {
    return {
      profile: {
        kind: "region",
        name: payload.name,
        slug: payload.slug,
        blurb: payload.description?.trim() ?? "",
        countries: (payload.countries ?? []).map(mapCountry),
      },
    };
  }

  if (payload.kind === "country") {
    const flag = payload.flag_url || flagUrlFromIso(payload.iso2);
    return {
      profile: {
        kind: "country",
        name: payload.name,
        slug: payload.slug,
        status: statusFrom(payload.is_active),
        region: payload.region?.name ?? "",
        regionSlug: payload.region?.slug ?? "",
        cities: (payload.cities ?? []).map((city) => mapCity(city, payload.slug)),
        iso2: payload.iso2 ?? undefined,
        flagUrl: flag,
      },
      details: mapProfileToDetails(payload.profile, flag),
    };
  }

  const countryFlag = payload.country?.flag_url || flagUrlFromIso(payload.country?.iso2);
  return {
    profile: {
      kind: "city",
      name: payload.name,
      slug: payload.public_slug || `${payload.country?.slug ?? ""}-${payload.slug}`,
      status: statusFrom(payload.is_active),
      region: payload.region?.name ?? "",
      regionSlug: payload.region?.slug ?? "",
      countryName: payload.country?.name ?? "",
      countrySlug: payload.country?.slug ?? "",
    },
    details: mapProfileToDetails(payload.profile, countryFlag),
  };
}

export async function fetchAffiliatesPage(): Promise<AffiliatesPageContent> {
  const { data, etag, status } = await apiFetch<ListResponse>("/api/affiliates", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapAffiliatesListPayload(data.data);
  return cachedContent;
}

export async function fetchAffiliateDetail(slug: string): Promise<AffiliateDetailContent> {
  const { data, status } = await apiFetch<DetailResponse>(`/api/affiliates/${encodeURIComponent(slug)}`);
  if (status === 404) {
    throw new Error("Affiliate not found");
  }
  return mapAffiliateDetailPayload(data.data);
}

export const affiliatesQueryKey = ["affiliates-page"] as const;

export const affiliatesQueryOptions = queryOptions({
  queryKey: affiliatesQueryKey,
  queryFn: fetchAffiliatesPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});

export function affiliateDetailQueryOptions(slug: string) {
  return queryOptions({
    queryKey: ["affiliate-detail", slug] as const,
    queryFn: () => fetchAffiliateDetail(slug),
    staleTime: 2_000,
    refetchInterval: 3_000,
    refetchOnWindowFocus: true,
  });
}
