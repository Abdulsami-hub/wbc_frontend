import { queryOptions } from "@tanstack/react-query";
import heroImg from "@/assets/our-members-hero.png";
import { apiFetch } from "@/lib/api";
import type { OurMemberCategory, OurMembersPageContent } from "@/content/our-members";
import { kindFromProfileType, normalizeAccent } from "@/content/our-members";

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
    title: string;
    description: string | null;
    accent: string;
    profiles: {
      id: number;
      name: string;
      logo_url: string | null;
      type: string;
      website: string | null;
    }[];
  }[];
};

type OurMembersResponse = { data: ApiPayload };

const DEFAULTS: OurMembersPageContent = {
  hero: {
    kicker: "Our Members",
    title: "Discover the WBC Members Network",
    description:
      "Explore member organizations and individuals across sectors, regions, and specialties to identify credible partners and practical opportunities within the WBC ecosystem.",
    tags: [],
    cta: { label: "Go to member profiles", url: "/our-members#directory" },
    image: heroImg,
    imageAlt: "WBC members networking at a global innovation summit",
  },
  categories: [],
};

let cachedEtag: string | null = null;
let cachedContent: OurMembersPageContent = DEFAULTS;

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

function mapCategory(category: ApiPayload["categories"][number]): OurMemberCategory {
  const members = (category.profiles ?? []).map((profile) => ({
    id: String(profile.id),
    name: profile.name,
    logo: profile.logo_url ?? undefined,
    href: profile.website?.trim() || undefined,
  }));

  const personCount = (category.profiles ?? []).filter((p) => p.type === "member").length;
  const kind = personCount > members.length / 2 ? "person" : kindFromProfileType(category.profiles?.[0]?.type);

  return {
    id: String(category.id),
    name: category.title,
    desc: category.description?.trim() ?? "",
    accent: normalizeAccent(category.accent),
    kind,
    members,
  };
}

export function mapOurMembersPayload(payload: ApiPayload): OurMembersPageContent {
  const { tags, cta } = splitHeroButtons(payload.hero?.buttons ?? []);
  const categories = (payload.categories ?? []).map(mapCategory);

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
  };
}

export async function fetchOurMembersPage(): Promise<OurMembersPageContent> {
  const { data, etag, status } = await apiFetch<OurMembersResponse>("/api/our-members", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapOurMembersPayload(data.data);
  return cachedContent;
}

export const ourMembersQueryKey = ["our-members-page"] as const;

export const ourMembersQueryOptions = queryOptions({
  queryKey: ourMembersQueryKey,
  queryFn: fetchOurMembersPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
