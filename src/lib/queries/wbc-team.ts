import { queryOptions } from "@tanstack/react-query";
import heroImg from "@/assets/team-hero.jpg";
import p1 from "@/assets/team-1.jpg";
import p2 from "@/assets/team-2.jpg";
import p3 from "@/assets/team-3.jpg";
import p4 from "@/assets/team-4.jpg";
import p5 from "@/assets/team-5.jpg";
import p6 from "@/assets/team-6.jpg";
import p7 from "@/assets/team-7.jpg";
import p8 from "@/assets/team-8.jpg";
import { apiFetch } from "@/lib/api";
import { mapHeroAppearance } from "@/lib/hero-appearance";
import { mapHeroMedia } from "@/lib/hero-media";
import type { TeamMember, TeamMemberSocialLink, TeamMemberSocialPlatform, WbcTeamPageContent } from "@/content/wbc-team";

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
  people: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
  } | null;
  member_groups?: {
    id: number;
    slug: string;
    title: string;
    description: string | null;
    sort_order: number;
  }[];
  members: {
    id: number;
    slug: string;
    name: string;
    role: string;
    group: string;
    group_label: string;
    image_url: string | null;
    bio: string | null;
    email: string | null;
    phone: string | null;
    social_links?: Array<{ platform?: string; icon?: string; label?: string; url?: string | null }>;
    linkedin_url?: string | null;
    x_url?: string | null;
    sort_order: number;
  }[];
  collaborations: {
    id: number;
    title: string;
    description: string | null;
    sort_order: number;
  }[];
};

type WbcTeamResponse = { data: ApiPayload };

const FALLBACK_IMAGES = [p1, p2, p3, p4, p5, p6, p7, p8] as const;

const DEFAULTS: WbcTeamPageContent = {
  hero: {
    kicker: "WBC Team",
    title: "The team behind global business cooperation.",
    description: "WBC staff connects members, institutions, and partners to practical international collaboration.",
    tags: ["Leadership", "Member Support", "Global Coordination"],
    cta: { label: "Contact WBC Team", url: "/contact" },
    image: heroImg,
    imageAlt: "WBC team members collaborating around a boardroom table",
    background: "orange",
    layout: "current",
  },
  people: {
    kicker: "People of WBC",
    title: "Leadership and staff guiding international cooperation",
    description:
      "Meet the team behind the World Business Council. Our Board of Directors and Secretariat combine institutional experience with practical support to help organizations build trusted global connections.",
  },
  memberGroups: [
    { slug: "board", title: "Board of Directors (BoD)" },
    { slug: "secretariat", title: "Secretariat" },
  ],
  members: [],
  collaborations: [],
};

let cachedEtag: string | null = null;
let cachedContent: WbcTeamPageContent = DEFAULTS;

function fallbackImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
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

function mapMemberGroups(
  payload: ApiPayload,
  members: TeamMember[],
): WbcTeamPageContent["memberGroups"] {
  const fromApi = (payload.member_groups ?? [])
    .map((group) => ({
      slug: group.slug,
      title: group.title.trim(),
      description: group.description?.trim() || undefined,
    }))
    .filter((group) => group.title);

  if (fromApi.length > 0) {
    return fromApi;
  }

  const seen = new Set<string>();
  const inferred: WbcTeamPageContent["memberGroups"] = [];

  for (const member of members) {
    if (!member.group || seen.has(member.group)) continue;
    seen.add(member.group);
    inferred.push({ slug: member.group, title: member.groupLabel || member.group });
  }

  return inferred.length > 0 ? inferred : DEFAULTS.memberGroups;
}

const SOCIAL_LABELS: Record<TeamMemberSocialPlatform, string> = {
  linkedin: "LinkedIn",
  x: "X (Twitter)",
  facebook: "Facebook",
  instagram: "Instagram",
  bluesky: "Bluesky",
  youtube: "YouTube",
  tiktok: "TikTok",
  truth_social: "Truth Social",
  whatsapp: "WhatsApp",
  telegram: "Telegram",
  snapchat: "Snapchat",
};

function isSocialPlatform(value: string): value is TeamMemberSocialPlatform {
  return value in SOCIAL_LABELS;
}

function mapSocialLinks(member: ApiPayload["members"][number]): TeamMemberSocialLink[] {
  const fromApi = (member.social_links ?? [])
    .map((link) => {
      const platform = (link.platform ?? link.icon ?? "").trim();
      const url = link.url?.trim() ?? "";
      if (!url || !isSocialPlatform(platform)) return null;
      return {
        platform,
        label: link.label?.trim() || SOCIAL_LABELS[platform],
        url,
      };
    })
    .filter((link): link is TeamMemberSocialLink => link !== null);

  if (fromApi.length > 0) {
    return fromApi;
  }

  const fallback: TeamMemberSocialLink[] = [];
  if (member.linkedin_url?.trim()) {
    fallback.push({ platform: "linkedin", label: SOCIAL_LABELS.linkedin, url: member.linkedin_url.trim() });
  }
  if (member.x_url?.trim()) {
    fallback.push({ platform: "x", label: SOCIAL_LABELS.x, url: member.x_url.trim() });
  }
  return fallback;
}

export function mapWbcTeamPayload(payload: ApiPayload): WbcTeamPageContent {
  const heroButtons = payload.hero?.buttons ?? [];
  const { tags, cta } = splitHeroButtons(heroButtons);

  const members: TeamMember[] = (payload.members ?? []).map((member, index) => ({
    id: String(member.id),
    slug: member.slug,
    name: member.name,
    role: member.role,
    image: member.image_url ?? fallbackImage(index),
    bio: member.bio?.trim() ?? "",
    email: member.email?.trim() ?? "",
    phone: member.phone?.trim() ?? "",
    group: member.group,
    groupLabel: member.group_label,
    socialLinks: mapSocialLinks(member),
  }));

  const collaborations = (payload.collaborations ?? []).map((item) => ({
    id: String(item.id),
    title: item.title,
    body: item.description?.trim() ?? "",
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
      ...mapHeroAppearance(payload.hero, "orange"),
      ...mapHeroMedia(payload.hero),
    },
    people: {
      kicker: payload.people?.kicker?.trim() || DEFAULTS.people.kicker,
      title: payload.people?.title?.trim() || DEFAULTS.people.title,
      description: payload.people?.description?.trim() || DEFAULTS.people.description,
    },
    memberGroups: mapMemberGroups(payload, members),
    members,
    collaborations,
  };
}

export function getTeamMember(content: WbcTeamPageContent, slug: string): TeamMember | undefined {
  return content.members.find((member) => member.slug === slug);
}

export async function fetchWbcTeamPage(): Promise<WbcTeamPageContent> {
  const { data, etag, status } = await apiFetch<WbcTeamResponse>("/api/wbc-team", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapWbcTeamPayload(data.data);
  return cachedContent;
}

export const wbcTeamQueryKey = ["wbc-team-page"] as const;

export const wbcTeamQueryOptions = queryOptions({
  queryKey: wbcTeamQueryKey,
  queryFn: fetchWbcTeamPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
