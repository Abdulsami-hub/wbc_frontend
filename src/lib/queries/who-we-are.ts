import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { WhoWeArePageContent, WhoWeAreValue } from "@/content/who-we-are";

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
  story: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
  } | null;
  mission_vision: {
    vision_title: string;
    vision_description: string | null;
    mission_title: string;
    mission_description: string | null;
  } | null;
  stats: {
    headquarters: string;
    founded: string;
    network: string;
  } | null;
  core_values: {
    id: number;
    title: string;
    description: string | null;
    is_home: boolean;
    sort_order: number;
  }[];
};

type WhoWeAreResponse = { data: ApiPayload };

const VALUE_ICONS = ["users", "link", "spark", "shield", "leaf", "globe"] as const;

const DEFAULTS: WhoWeArePageContent = {
  hero: {
    kicker: "About Us",
    title: "Who We Are",
    description:
      "An international business support organization built on trust, connection, cooperation, and long-term growth for businesses, professionals, and institutions worldwide.",
    tags: ["Trust", "Connection", "Global Reach"],
    imageAlt: "WBC boardroom overlooking the Paris skyline at dusk",
  },
  story: {
    kicker: "Who We Are",
    title: "Behind every business is a person.",
    paragraphs: [
      "The World Business Council (WBC) is an international business support organization headquartered in Paris, built on a simple belief: behind every business is a person, an idea, and the ambition to create something meaningful. We bring businesses, entrepreneurs, professionals, and organizations closer together, helping them find the right connections, knowledge, support, and opportunities to move forward. Through our international network, WBC turns connections into cooperation, ideas into action, and business relationships into lasting opportunities for growth.",
      "We believe that no business should have to grow alone—and that meaningful connections are built on trust. Behind every successful partnership is the confidence to share an idea, open a door, take a chance, and move forward together. WBC works to create an environment where people and businesses can connect with confidence, build trusted relationships, and turn those relationships into meaningful opportunities, lasting cooperation, and shared progress.",
    ],
  },
  missionVision: {
    visionTitle: "Our Vision",
    visionDescription:
      "To be the global hub of business excellence, with a local presence in every city, empowering and uniting businesses worldwide through innovation, collaboration, and sustainable development.",
    missionTitle: "Our Mission",
    missionDescription:
      "We build a global network that empowers businesses through collaboration, innovation, and trust.",
  },
  stats: {
    headquarters: "Paris",
    founded: "2026",
    network: "Worldwide",
  },
  coreValues: [
    { id: "1", title: "Inclusivity", body: "Embracing diversity and valuing different perspectives.", icon: "users", isHome: true },
    { id: "2", title: "Collaboration", body: "Connecting people and businesses to create shared success.", icon: "link", isHome: true },
    { id: "3", title: "Innovation", body: "Encouraging creativity and forward-thinking solutions.", icon: "spark", isHome: true },
    { id: "4", title: "Integrity & Excellence", body: "Upholding ethics, transparency, and high standards.", icon: "shield", isHome: true },
    { id: "5", title: "Sustainable Development", body: "Promoting responsible growth for a better future.", icon: "leaf", isHome: true },
    { id: "6", title: "Global Citizenship", body: "Supporting positive impact on communities and the world.", icon: "globe", isHome: true },
  ],
};

let cachedEtag: string | null = null;
let cachedContent: WhoWeArePageContent = DEFAULTS;

function splitParagraphs(text: string | null | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function mapWhoWeArePayload(payload: ApiPayload): WhoWeArePageContent {
  const heroButtons = payload.hero?.buttons ?? [];
  const tags = heroButtons.map((b) => b.label?.trim()).filter(Boolean);

  const storyParagraphs = splitParagraphs(payload.story?.description);
  const coreValues: WhoWeAreValue[] = (payload.core_values ?? []).map((value, index) => ({
    id: String(value.id),
    title: value.title,
    body: value.description?.trim() ?? "",
    icon: VALUE_ICONS[index % VALUE_ICONS.length],
    isHome: value.is_home,
  }));

  const resolvedCoreValues = coreValues.length > 0 ? coreValues : DEFAULTS.coreValues;

  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      tags: tags.length > 0 ? tags : DEFAULTS.hero.tags,
      image: payload.hero?.image_url ?? undefined,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    story: {
      kicker: payload.story?.kicker?.trim() || DEFAULTS.story.kicker,
      title: payload.story?.title?.trim() || DEFAULTS.story.title,
      paragraphs: storyParagraphs.length > 0 ? storyParagraphs : DEFAULTS.story.paragraphs,
    },
    missionVision: {
      visionTitle: payload.mission_vision?.vision_title?.trim() || DEFAULTS.missionVision.visionTitle,
      visionDescription:
        payload.mission_vision?.vision_description?.trim() || DEFAULTS.missionVision.visionDescription,
      missionTitle: payload.mission_vision?.mission_title?.trim() || DEFAULTS.missionVision.missionTitle,
      missionDescription:
        payload.mission_vision?.mission_description?.trim() || DEFAULTS.missionVision.missionDescription,
    },
    stats: {
      headquarters: payload.stats?.headquarters?.trim() || DEFAULTS.stats.headquarters,
      founded: payload.stats?.founded?.trim() || DEFAULTS.stats.founded,
      network: payload.stats?.network?.trim() || DEFAULTS.stats.network,
    },
    coreValues: resolvedCoreValues,
  };
}

/** Core values flagged for the homepage; falls back to all values when none are flagged. */
export function homeCoreValues(content: WhoWeArePageContent): WhoWeAreValue[] {
  const flagged = content.coreValues.filter((value) => value.isHome);
  return flagged.length > 0 ? flagged : content.coreValues;
}

export async function fetchWhoWeArePage(): Promise<WhoWeArePageContent> {
  const { data, etag, status } = await apiFetch<WhoWeAreResponse>("/api/who-we-are", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapWhoWeArePayload(data.data);
  return cachedContent;
}

export const whoWeAreQueryKey = ["who-we-are-page"] as const;

export const whoWeAreQueryOptions = queryOptions({
  queryKey: whoWeAreQueryKey,
  queryFn: fetchWhoWeArePage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
