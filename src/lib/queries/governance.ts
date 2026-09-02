import { queryOptions } from "@tanstack/react-query";
import assemblyImg from "@/assets/gov-assembly.png";
import boardImg from "@/assets/gov-board.jpg";
import heroImg from "@/assets/gov-hero.png";
import honoraryImg from "@/assets/gov-honorary.png";
import secretariatImg from "@/assets/gov-secretariat.jpg";
import { apiFetch } from "@/lib/api";
import type {
  GovernanceGroup,
  GovernanceGroupIcon,
  GovernancePageContent,
} from "@/content/governance";

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
  structure: {
    id: number;
    title: string;
    description: string | null;
  } | null;
  groups: {
    id: number;
    title: string;
    description: string | null;
    image_url: string | null;
    sort_order: number;
  }[];
  faqs: {
    id: number;
    question: string;
    answer: string | null;
    sort_order: number;
  }[];
};

type GovernanceResponse = { data: ApiPayload };

const GROUP_ICONS: GovernanceGroupIcon[] = ["user", "lines", "shield"];

const FALLBACK_IMAGES = [assemblyImg, boardImg, honoraryImg, secretariatImg, assemblyImg] as const;

const DEFAULT_GROUPS: GovernanceGroup[] = [
  {
    id: "1",
    slug: "general-assembly",
    name: "General Assembly (GA)",
    image: assemblyImg,
    icon: "user",
    role: "The General Assembly is the highest governing body of WBC, bringing together its members to approve major decisions, policies, and strategic directions.",
  },
  {
    id: "2",
    slug: "board-of-directors",
    name: "Board of Directors (BoD)",
    image: boardImg,
    icon: "lines",
    role: "The Board of Directors provides strategic leadership and oversight, guiding the organization's vision, governance, and development.",
  },
  {
    id: "3",
    slug: "honorary-board",
    name: "Honorary Board (HB)",
    image: honoraryImg,
    icon: "user",
    role: "The Honorary Board is a consultative body composed of distinguished individuals who provide advice, expertise, and support to WBC and its international mission.",
  },
  {
    id: "4",
    slug: "staff-members",
    name: "Staff Members",
    image: secretariatImg,
    icon: "shield",
    role: "The staff members, led by the Director General, are responsible for the day-to-day management and administration of WBC. They support the implementation of policies, programmes, and decisions adopted by the General Assembly and the Board of Directors.",
  },
  {
    id: "5",
    slug: "committees-working-groups",
    name: "Committees & Working Groups",
    image: assemblyImg,
    icon: "lines",
    role: "Committees and Working Groups support WBC by providing expertise and contributing to specific programmes, initiatives, projects, and areas of activity.",
  },
];

const DEFAULTS: GovernancePageContent = {
  hero: {
    kicker: "Governance",
    title: "Governance that protects trust and drives coordinated action.",
    description: "Clear oversight and defined mandates for confident international cooperation.",
    tags: ["Transparency", "Stewardship", "Leadership"],
    cta: { label: "Contact the governance office", url: "/contact" },
    image: heroImg,
    imageAlt: "WBC boardroom prepared for a governance session",
  },
  structure: {
    title: "Institutional governance for transparent and accountable delivery",
    description:
      "The World Business Council (WBC) is governed by its General Assembly, with the support of a Board of Directors, Honorary Board, Staff Members, Committees and Working Groups. It operates in accordance with its Statutes, Rules of Procedure, and internal policies, ensuring transparency, accountability, and effective governance in support of its international mission.",
  },
  groups: DEFAULT_GROUPS,
  faqs: [
    {
      id: "1",
      question: "How is WBC's leadership structure organized?",
      answer:
        "WBC is governed by its General Assembly, with the support of a Board of Directors, Honorary Board, Staff Members, Committees and Working Groups.",
    },
    {
      id: "2",
      question: "How are board members or senior leaders appointed?",
      answer:
        "Appointments follow the council's statutes and rules of procedure, with candidates reviewed against institutional criteria and confirmed through formal assembly decisions.",
    },
    {
      id: "3",
      question: "How can members contribute to governance discussions?",
      answer:
        "Members participate through the General Assembly, committee work, and consultation rounds where priorities, policies, and programme direction are reviewed.",
    },
    {
      id: "4",
      question: "What accountability measures guide governance decisions?",
      answer:
        "Decisions are documented, reviewed against approved policies, and supported by financial reporting, audit readiness, and periodic performance review.",
    },
    {
      id: "5",
      question: "How do strategic decisions move from proposal to approval?",
      answer:
        "Proposals are prepared by the Staff Members, examined by the Board of Directors, and submitted for approval to the General Assembly where the mandate requires it.",
    },
  ],
};

let cachedEtag: string | null = null;
let cachedContent: GovernancePageContent = DEFAULTS;

function slugify(title: string): string {
  const base = title.replace(/\s*\([^)]*\)/g, "").trim().toLowerCase();
  const slug = base.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return slug || "group";
}

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

export function mapGovernancePayload(payload: ApiPayload): GovernancePageContent {
  const heroButtons = payload.hero?.buttons ?? [];
  const { tags, cta } = splitHeroButtons(heroButtons);

  const groups: GovernanceGroup[] = (payload.groups ?? []).map((group, index) => ({
    id: String(group.id),
    slug: slugify(group.title),
    name: group.title,
    image: group.image_url ?? fallbackImage(index),
    icon: GROUP_ICONS[index % GROUP_ICONS.length],
    role: group.description?.trim() ?? "",
  }));

  const faqs = (payload.faqs ?? []).map((faq) => ({
    id: String(faq.id),
    question: faq.question,
    answer: faq.answer?.trim() ?? "",
  }));

  const resolvedGroups = groups.length > 0 ? groups : DEFAULTS.groups;
  const resolvedFaqs = faqs.length > 0 ? faqs : DEFAULTS.faqs;

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
    structure: {
      title: payload.structure?.title?.trim() || DEFAULTS.structure.title,
      description: payload.structure?.description?.trim() || DEFAULTS.structure.description,
    },
    groups: resolvedGroups,
    faqs: resolvedFaqs,
  };
}

export async function fetchGovernancePage(): Promise<GovernancePageContent> {
  const { data, etag, status } = await apiFetch<GovernanceResponse>("/api/governance", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapGovernancePayload(data.data);
  return cachedContent;
}

export const governanceQueryKey = ["governance-page"] as const;

export const governanceQueryOptions = queryOptions({
  queryKey: governanceQueryKey,
  queryFn: fetchGovernancePage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
