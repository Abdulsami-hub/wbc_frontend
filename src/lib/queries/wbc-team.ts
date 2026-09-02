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
import type { TeamMember, WbcTeamPageContent } from "@/content/wbc-team";

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
  people: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    board_title: string | null;
    board_description: string | null;
    secretariat_title: string | null;
    secretariat_description: string | null;
  } | null;
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
    linkedin_url: string | null;
    x_url: string | null;
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

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: "1",
    slug: "richard-bennett",
    name: "Richard Bennett",
    role: "President, Board of Directors",
    image: p1,
    bio: "Richard chairs strategic board sessions and guides long-term positioning, institutional risk controls, and cross-region governance decisions.",
    email: "richard.bennett@wbcouncil.org",
    phone: "+44 20 7093 81 36",
    group: "board",
    groupLabel: "Board of Directors",
  },
  {
    id: "2",
    slug: "mei-tanaka",
    name: "Mei Tanaka",
    role: "Director of Strategy and Policy",
    image: p2,
    bio: "Mei leads policy research and strategic planning, translating member priorities into practical programs across regions and sectors.",
    email: "mei.tanaka@wbcouncil.org",
    phone: "+44 20 7093 81 42",
    group: "board",
    groupLabel: "Board of Directors",
  },
  {
    id: "3",
    slug: "carlos-ibanez",
    name: "Carlos Ibáñez",
    role: "Director of Finance and Audit",
    image: p3,
    bio: "Carlos oversees financial planning, audit readiness, and the reporting standards that keep council operations transparent and accountable.",
    email: "carlos.ibanez@wbcouncil.org",
    phone: "+44 20 7093 81 55",
    group: "board",
    groupLabel: "Board of Directors",
  },
  {
    id: "4",
    slug: "amina-okonkwo",
    name: "Amina Okonkwo",
    role: "Director of Governance and Compliance",
    image: p4,
    bio: "Amina maintains governance frameworks and compliance policies, ensuring council decisions meet international institutional standards.",
    email: "amina.okonkwo@wbcouncil.org",
    phone: "+44 20 7093 81 61",
    group: "board",
    groupLabel: "Board of Directors",
  },
  {
    id: "5",
    slug: "noor-haddad",
    name: "Noor Haddad",
    role: "Secretary-General",
    image: p5,
    bio: "Noor directs the Secretariat, coordinating member services, institutional partnerships, and the delivery of the council's annual agenda.",
    email: "noor.haddad@wbcouncil.org",
    phone: "+44 20 7093 82 10",
    group: "secretariat",
    groupLabel: "Secretariat",
  },
  {
    id: "6",
    slug: "julien-moreau",
    name: "Julien Moreau",
    role: "Operations and Coordination Manager",
    image: p6,
    bio: "Julien runs day-to-day operations and cross-team coordination, keeping programs on schedule across time zones and partners.",
    email: "julien.moreau@wbcouncil.org",
    phone: "+44 20 7093 82 24",
    group: "secretariat",
    groupLabel: "Secretariat",
  },
  {
    id: "7",
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Communications and Outreach Manager",
    image: p7,
    bio: "Priya leads communications and outreach, shaping how the council presents its work to members, institutions, and the wider public.",
    email: "priya.nair@wbcouncil.org",
    phone: "+44 20 7093 82 37",
    group: "secretariat",
    groupLabel: "Secretariat",
  },
  {
    id: "8",
    slug: "lucas-schneider",
    name: "Lucas Schneider",
    role: "Programs Delivery Manager",
    image: p8,
    bio: "Lucas manages program delivery end to end, from planning and logistics to follow-up with members and partner organizations.",
    email: "lucas.schneider@wbcouncil.org",
    phone: "+44 20 7093 82 49",
    group: "secretariat",
    groupLabel: "Secretariat",
  },
];

const DEFAULTS: WbcTeamPageContent = {
  hero: {
    kicker: "WBC Team",
    title: "The team behind global business cooperation.",
    description: "WBC staff connects members, institutions, and partners to practical international collaboration.",
    tags: ["Leadership", "Member Support", "Global Coordination"],
    cta: { label: "Contact WBC Team", url: "/contact" },
    image: heroImg,
    imageAlt: "WBC team members collaborating around a boardroom table",
  },
  people: {
    kicker: "People of WBC",
    title: "Leadership and staff guiding international cooperation",
    description:
      "Meet the team behind the World Business Council. Our Board of Directors and Secretariat combine institutional experience with practical support to help organizations build trusted global connections.",
    boardTitle: "Board of Directors (BoD)",
    boardDescription:
      "Strategic oversight for governance, finance, policy direction, and institutional accountability.",
    secretariatTitle: "Secretariat",
    secretariatDescription:
      "Daily management, operations, communications, and program delivery for members and partners.",
  },
  members: DEFAULT_MEMBERS,
  collaborations: [
    {
      id: "1",
      title: "Coordinated Planning",
      body: "We define priorities jointly, map responsibilities early, and keep every initiative connected to member and partner objectives.",
    },
    {
      id: "2",
      title: "Responsive Execution",
      body: "Cross-team check-ins and practical escalation paths allow us to respond quickly while preserving consistency and quality.",
    },
    {
      id: "3",
      title: "Shared Accountability",
      body: "We review outcomes together, apply lessons quickly, and keep long-term cooperation at the center of every engagement.",
    },
  ],
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

function normalizeGroup(group: string): TeamMember["group"] {
  return group === "secretariat" ? "secretariat" : "board";
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
    group: normalizeGroup(member.group),
    groupLabel: member.group_label,
    linkedinUrl: member.linkedin_url?.trim() || undefined,
    xUrl: member.x_url?.trim() || undefined,
  }));

  const collaborations = (payload.collaborations ?? []).map((item) => ({
    id: String(item.id),
    title: item.title,
    body: item.description?.trim() ?? "",
  }));

  const resolvedMembers = members.length > 0 ? members : DEFAULTS.members;
  const resolvedCollaborations =
    collaborations.length > 0 ? collaborations : DEFAULTS.collaborations;

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
    people: {
      kicker: payload.people?.kicker?.trim() || DEFAULTS.people.kicker,
      title: payload.people?.title?.trim() || DEFAULTS.people.title,
      description: payload.people?.description?.trim() || DEFAULTS.people.description,
      boardTitle: payload.people?.board_title?.trim() || DEFAULTS.people.boardTitle,
      boardDescription:
        payload.people?.board_description?.trim() || DEFAULTS.people.boardDescription,
      secretariatTitle:
        payload.people?.secretariat_title?.trim() || DEFAULTS.people.secretariatTitle,
      secretariatDescription:
        payload.people?.secretariat_description?.trim() || DEFAULTS.people.secretariatDescription,
    },
    members: resolvedMembers,
    collaborations: resolvedCollaborations,
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
