import { queryOptions } from "@tanstack/react-query";
import partnersHero from "@/assets/partners-hero.png";
import { apiFetch } from "@/lib/api";
import type { StrategicPartnersPageContent } from "@/content/strategic-partners";
import { normalizePartnerAccent } from "@/content/strategic-partners";

type ApiButton = { label: string; url: string };

type ApiStructuredItem = { title: string; description: string };

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
    title: string;
    description: string | null;
    kind_label: string | null;
    accent: string;
    profiles: {
      id: number;
      name: string;
      logo_url: string | null;
      website: string | null;
    }[];
  }[];
  approach: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    description_secondary: string | null;
  } | null;
  why_partner: {
    id: number;
    kicker: string | null;
    title: string | null;
    items: ApiStructuredItem[];
    cta_label: string | null;
    cta_url: string | null;
  } | null;
  sponsor_cards: {
    id: number;
    title: string;
    description: string | null;
  }[];
  who_we_partner: {
    kicker: string | null;
    title: string | null;
    description: string | null;
    pillars: {
      id: number;
      title: string;
      description: string | null;
    }[];
  };
  outcomes: {
    id: number;
    kicker: string | null;
    title: string;
    items: ApiStructuredItem[];
  } | null;
  focus_areas: {
    id: number;
    kicker: string | null;
    title: string;
    items: string[];
  } | null;
  process: {
    kicker: string | null;
    title: string | null;
    description: string | null;
    steps: {
      id: number;
      title: string;
      description: string | null;
    }[];
  };
  cta: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    buttons: ApiButton[];
  } | null;
};

type StrategicPartnersResponse = { data: ApiPayload };

const DEFAULTS: StrategicPartnersPageContent = {
  hero: {
    kicker: "Global Network",
    title: "Partners and Sponsors",
    description:
      "Institutions, media platforms, and enterprises collaborating with WBC to strengthen international business cooperation and create opportunities worldwide.",
    tags: [],
    cta: { label: "Contact WBC", url: "/contact" },
    image: partnersHero,
    imageAlt: "Business partners shaking hands across a conference table",
  },
  categories: [],
  approach: {
    kicker: "",
    title: "",
    description: "",
    descriptionSecondary: "",
  },
  whyPartner: {
    kicker: "",
    items: [],
  },
  sponsorCards: [],
  whoWePartner: {
    kicker: "",
    title: "",
    description: "",
    pillars: [],
  },
  outcomes: {
    kicker: "",
    title: "",
    items: [],
  },
  focusAreas: {
    kicker: "",
    title: "",
    items: [],
  },
  process: {
    kicker: "",
    title: "",
    description: "",
    steps: [],
  },
  cta: {
    kicker: "",
    title: "",
    description: "",
    buttons: [],
  },
};

let cachedEtag: string | null = null;
let cachedContent: StrategicPartnersPageContent = DEFAULTS;

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

function mapTitledItems(
  items: ApiStructuredItem[] | undefined,
  idPrefix: string,
): { id: string; title: string; body: string }[] {
  return (items ?? [])
    .map((item, index) => ({
      id: `${idPrefix}-${index}`,
      title: item.title?.trim() ?? "",
      body: item.description?.trim() ?? "",
    }))
    .filter((item) => item.title || item.body);
}

export function mapStrategicPartnersPayload(payload: ApiPayload): StrategicPartnersPageContent {
  const { tags, cta } = splitHeroButtons(payload.hero?.buttons ?? []);

  const categories = (payload.categories ?? []).map((category) => ({
    id: String(category.id),
    name: category.title,
    desc: category.description?.trim() ?? "",
    accent: normalizePartnerAccent(category.accent),
    kindLabel: category.kind_label?.trim() || "Partner",
    partners: (category.profiles ?? []).map((profile) => ({
      id: String(profile.id),
      name: profile.name,
      logo: profile.logo_url ?? undefined,
      href: profile.website?.trim() || undefined,
    })),
  }));

  const whyCtaLabel = payload.why_partner?.cta_label?.trim();
  const whyCtaUrl = payload.why_partner?.cta_url?.trim();

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
    categories,
    approach: {
      kicker: payload.approach?.kicker?.trim() ?? "",
      title: payload.approach?.title?.trim() ?? "",
      description: payload.approach?.description?.trim() ?? "",
      descriptionSecondary: payload.approach?.description_secondary?.trim() ?? "",
    },
    whyPartner: {
      kicker: payload.why_partner?.kicker?.trim() ?? "",
      items: mapTitledItems(payload.why_partner?.items, "why"),
      cta:
        whyCtaLabel && whyCtaUrl
          ? { label: whyCtaLabel, url: whyCtaUrl }
          : whyCtaLabel
            ? { label: whyCtaLabel, url: "/contact" }
            : undefined,
    },
    sponsorCards: (payload.sponsor_cards ?? []).map((card) => ({
      id: String(card.id),
      title: card.title,
      body: card.description?.trim() ?? "",
    })),
    whoWePartner: {
      kicker: payload.who_we_partner?.kicker?.trim() ?? "",
      title: payload.who_we_partner?.title?.trim() ?? "",
      description: payload.who_we_partner?.description?.trim() ?? "",
      pillars: (payload.who_we_partner?.pillars ?? []).map((pillar) => ({
        id: String(pillar.id),
        title: pillar.title,
        body: pillar.description?.trim() ?? "",
      })),
    },
    outcomes: {
      kicker: payload.outcomes?.kicker?.trim() ?? "",
      title: payload.outcomes?.title?.trim() ?? "",
      items: mapTitledItems(payload.outcomes?.items, "outcome"),
    },
    focusAreas: {
      kicker: payload.focus_areas?.kicker?.trim() ?? "",
      title: payload.focus_areas?.title?.trim() ?? "",
      items: (payload.focus_areas?.items ?? []).filter(Boolean),
    },
    process: {
      kicker: payload.process?.kicker?.trim() ?? "",
      title: payload.process?.title?.trim() ?? "",
      description: payload.process?.description?.trim() ?? "",
      steps: (payload.process?.steps ?? []).map((step, index) => ({
        id: String(step.id),
        step: String(index + 1).padStart(2, "0"),
        title: step.title,
        body: step.description?.trim() ?? "",
      })),
    },
    cta: {
      kicker: payload.cta?.kicker?.trim() ?? "",
      title: payload.cta?.title?.trim() ?? "",
      description: payload.cta?.description?.trim() ?? "",
      buttons: (payload.cta?.buttons ?? [])
        .map((button) => ({
          label: button.label?.trim() ?? "",
          url: button.url?.trim() ?? "",
        }))
        .filter((button) => button.label && button.url),
    },
  };
}

export async function fetchStrategicPartnersPage(): Promise<StrategicPartnersPageContent> {
  const { data, etag, status } = await apiFetch<StrategicPartnersResponse>("/api/strategic-partners", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapStrategicPartnersPayload(data.data);
  return cachedContent;
}

export const strategicPartnersQueryKey = ["strategic-partners-page"] as const;

export const strategicPartnersQueryOptions = queryOptions({
  queryKey: strategicPartnersQueryKey,
  queryFn: fetchStrategicPartnersPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
