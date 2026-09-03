import { queryOptions } from "@tanstack/react-query";
import networkBg from "@/assets/network-bg.jpg";
import { apiFetch } from "@/lib/api";
import type { AffiliateGuidePageContent } from "@/content/affiliate-guide";
import {
  eligibilityKindLabel,
  typeKindLabel,
} from "@/content/affiliate-guide";

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
  overview: {
    id: number;
    title: string;
    description_left: string | null;
    description_right: string | null;
  } | null;
  benefits: { id: number; description: string }[];
  types: {
    id: number;
    kind: string;
    title: string;
    description: string | null;
    items: string[];
    footer_note: string | null;
  }[];
  eligibility_blocks: {
    id: number;
    kind: string;
    title: string;
    description: string | null;
    items: string[];
  }[];
  process: {
    id: number;
    title: string;
    description: string | null;
  } | null;
  process_steps: {
    id: number;
    title: string;
    description: string | null;
    items: string[];
  }[];
  supports: {
    id: number;
    title: string;
    description: string | null;
  }[];
  financial: {
    id: number;
    title: string;
    description: string | null;
    button_label: string | null;
    button_url: string | null;
  } | null;
  compliance: {
    id: number;
    title: string;
    description: string | null;
    items: string[];
  } | null;
  next_step: {
    id: number;
    title: string;
    description: string | null;
  } | null;
};

type AffiliateGuideResponse = { data: ApiPayload };

const DEFAULTS: AffiliateGuidePageContent = {
  hero: {
    kicker: "WBC Affiliate Establishment Guide",
    title: "Establish an Official WBC Affiliate",
    description: "Join a Global Network Connecting Businesses and Creating Opportunities",
    tags: [],
    cta: { label: "Fill the Application Form", url: "/contact" },
    image: networkBg,
    imageAlt: "Global network map representing WBC affiliate development",
  },
  overview: {
    title: "",
    descriptionLeft: "",
    descriptionRight: "",
  },
  benefits: [],
  types: [],
  eligibilityBlocks: [],
  process: {
    title: "",
    description: "",
    steps: [],
  },
  supports: [],
  financial: {
    title: "",
    description: "",
  },
  compliance: {
    title: "",
    description: "",
    items: [],
  },
  nextStep: {
    title: "",
    description: "",
  },
};

let cachedEtag: string | null = null;
let cachedContent: AffiliateGuidePageContent = DEFAULTS;

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

export function mapAffiliateGuidePayload(payload: ApiPayload): AffiliateGuidePageContent {
  const { tags, cta } = splitHeroButtons(payload.hero?.buttons ?? []);

  const benefits = (payload.benefits ?? [])
    .map((item) => item.description?.trim())
    .filter((item): item is string => Boolean(item));

  const types = (payload.types ?? []).map((item) => ({
    id: String(item.id),
    kind: (item.kind === "national" ? "national" : "local") as "national" | "local",
    kindLabel: typeKindLabel(item.kind),
    title: item.title,
    description: item.description?.trim() ?? "",
    items: (item.items ?? []).filter(Boolean),
    footerNote: item.footer_note?.trim() || undefined,
  }));

  const eligibilityBlocks = (payload.eligibility_blocks ?? []).map((item) => ({
    id: String(item.id),
    kind: (item.kind === "qualifications" ? "qualifications" : "eligibility") as
      | "eligibility"
      | "qualifications",
    kindLabel: eligibilityKindLabel(item.kind),
    title: item.title,
    description: item.description?.trim() ?? "",
    items: (item.items ?? []).filter(Boolean),
  }));

  const processSteps = (payload.process_steps ?? []).map((item, index) => ({
    id: String(item.id),
    step: String(index + 1).padStart(2, "0"),
    title: item.title,
    intro: item.description?.trim() ?? "",
    items: (item.items ?? []).filter(Boolean),
  }));

  const supports = (payload.supports ?? []).map((item) => ({
    id: String(item.id),
    title: item.title,
    body: item.description?.trim() ?? "",
  }));

  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      tags,
      cta: cta ?? DEFAULTS.hero.cta,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    overview: {
      title: payload.overview?.title?.trim() ?? "",
      descriptionLeft: payload.overview?.description_left?.trim() ?? "",
      descriptionRight: payload.overview?.description_right?.trim() ?? "",
    },
    benefits,
    types,
    eligibilityBlocks,
    process: {
      title: payload.process?.title?.trim() ?? "",
      description: payload.process?.description?.trim() ?? "",
      steps: processSteps,
    },
    supports,
    financial: {
      title: payload.financial?.title?.trim() ?? "",
      description: payload.financial?.description?.trim() ?? "",
      buttonLabel: payload.financial?.button_label?.trim() || undefined,
      buttonUrl: payload.financial?.button_url?.trim() || undefined,
    },
    compliance: {
      title: payload.compliance?.title?.trim() ?? "",
      description: payload.compliance?.description?.trim() ?? "",
      items: (payload.compliance?.items ?? []).filter(Boolean),
    },
    nextStep: {
      title: payload.next_step?.title?.trim() ?? "",
      description: payload.next_step?.description?.trim() ?? "",
    },
  };
}

export async function fetchAffiliateGuidePage(): Promise<AffiliateGuidePageContent> {
  const { data, etag, status } = await apiFetch<AffiliateGuideResponse>("/api/affiliate-guide", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapAffiliateGuidePayload(data.data);
  return cachedContent;
}

export const affiliateGuideQueryKey = ["affiliate-guide-page"] as const;

export const affiliateGuideQueryOptions = queryOptions({
  queryKey: affiliateGuideQueryKey,
  queryFn: fetchAffiliateGuidePage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
