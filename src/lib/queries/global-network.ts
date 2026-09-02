import { queryOptions } from "@tanstack/react-query";
import networkBg from "@/assets/network-bg.jpg";
import { apiFetch } from "@/lib/api";
import type { GlobalNetworkPageContent, GlobalNetworkStructure } from "@/content/global-network";

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
  structures: {
    id: number;
    title: string;
    description: string | null;
    sort_order: number;
  }[];
  stats: {
    id: number;
    regions: string | null;
    countries: string | null;
    cities: string | null;
    framework: string | null;
  } | null;
};

type GlobalNetworkResponse = { data: ApiPayload };

const DEFAULT_STRUCTURE_LINKS = [
  "/who-we-are",
  "/affiliates",
  "/our-members",
  "/global-network/strategic-partners",
] as const;

const DEFAULT_STRUCTURES: GlobalNetworkStructure[] = [
  {
    id: "1",
    title: "WBC Headquarters (Paris)",
    body: "The global headquarters responsible for the leadership, governance, and coordination of WBC.",
    to: "/who-we-are",
  },
  {
    id: "2",
    title: "WBC Affiliates",
    body: "Official WBC representatives established in countries and cities to promote and implement WBC's mission and activities and connect local business communities with the global WBC network.",
    to: "/affiliates",
  },
  {
    id: "3",
    title: "WBC Members",
    body: "Institutional, corporate, SME, and individual members forming the core of the WBC community.",
    to: "/our-members",
  },
  {
    id: "4",
    title: "WBC Partners & Sponsors",
    body: "Organizations, media, and corporations supporting WBC through sponsorship, partnerships, and international cooperation.",
    to: "/global-network/strategic-partners",
  },
];

const DEFAULTS: GlobalNetworkPageContent = {
  hero: {
    kicker: "Our Reach",
    title: "Global Network",
    description:
      "The World Business Council (WBC) is built on a collaborative global network that connects businesses, business support organizations, and strategic partners across countries and regions. Together, this network strengthens international cooperation, creates new opportunities, and supports sustainable business growth worldwide.",
    tags: ["Global Coordination", "Local Presence", "Institutional Trust"],
    cta: { label: "Explore Affiliates", url: "/affiliates" },
    image: networkBg,
    imageAlt: "Illuminated world map representing the WBC global network",
  },
  structures: DEFAULT_STRUCTURES,
  stats: [
    { value: "5", label: "World regions covered" },
    { value: "60+", label: "Countries in the network" },
    { value: "120+", label: "Cities represented" },
    { value: "1", label: "Coordinated framework" },
  ],
};

let cachedEtag: string | null = null;
let cachedContent: GlobalNetworkPageContent = DEFAULTS;

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

function resolveStructureLink(title: string, index: number): string {
  const lower = title.toLowerCase();
  if (lower.includes("affiliate")) return "/affiliates";
  if (lower.includes("member")) return "/our-members";
  if (lower.includes("partner") || lower.includes("sponsor")) return "/global-network/strategic-partners";
  if (lower.includes("headquarter") || lower.includes("paris")) return "/who-we-are";
  return DEFAULT_STRUCTURE_LINKS[index % DEFAULT_STRUCTURE_LINKS.length];
}

export function mapGlobalNetworkPayload(payload: ApiPayload): GlobalNetworkPageContent {
  const heroButtons = payload.hero?.buttons ?? [];
  const { tags, cta } = splitHeroButtons(heroButtons);

  const structures: GlobalNetworkStructure[] = (payload.structures ?? []).map((item, index) => ({
    id: String(item.id),
    title: item.title,
    body: item.description?.trim() ?? "",
    to: resolveStructureLink(item.title, index),
  }));

  const statsFromApi = payload.stats
    ? [
        { value: payload.stats.regions?.trim() || DEFAULTS.stats[0].value, label: DEFAULTS.stats[0].label },
        { value: payload.stats.countries?.trim() || DEFAULTS.stats[1].value, label: DEFAULTS.stats[1].label },
        { value: payload.stats.cities?.trim() || DEFAULTS.stats[2].value, label: DEFAULTS.stats[2].label },
        { value: payload.stats.framework?.trim() || DEFAULTS.stats[3].value, label: DEFAULTS.stats[3].label },
      ]
    : [];

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
    structures: structures.length > 0 ? structures : DEFAULTS.structures,
    stats: statsFromApi.length > 0 ? statsFromApi : DEFAULTS.stats,
  };
}

export async function fetchGlobalNetworkPage(): Promise<GlobalNetworkPageContent> {
  const { data, etag, status } = await apiFetch<GlobalNetworkResponse>("/api/global-network", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapGlobalNetworkPayload(data.data);
  return cachedContent;
}

export const globalNetworkQueryKey = ["global-network-page"] as const;

export const globalNetworkQueryOptions = queryOptions({
  queryKey: globalNetworkQueryKey,
  queryFn: fetchGlobalNetworkPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
