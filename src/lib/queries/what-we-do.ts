import { queryOptions } from "@tanstack/react-query";
import heroImg from "@/assets/wwd-hero.jpg";
import networkImg from "@/assets/wwd-network.jpg";
import councilImg from "@/assets/wwd-council.jpg";
import tradeImg from "@/assets/wwd-trade.jpg";
import eventsImg from "@/assets/wwd-events.jpg";
import innovationImg from "@/assets/wwd-innovation.jpg";
import trainingImg from "@/assets/wwd-training.jpg";
import membersImg from "@/assets/wwd-members.jpg";
import { apiFetch } from "@/lib/api";
import type { WhatWeDoPageContent, WhatWeDoService } from "@/content/what-we-do";

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
  services: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    image_url: string | null;
    is_home: boolean;
    sort_order: number;
  }[];
};

type WhatWeDoResponse = { data: ApiPayload };

const FALLBACK_IMAGES = [
  networkImg,
  councilImg,
  tradeImg,
  eventsImg,
  innovationImg,
  heroImg,
  trainingImg,
  membersImg,
] as const;

const DEFAULT_SERVICES: WhatWeDoService[] = [
  {
    id: "1",
    kicker: "Network",
    title: "Global Business Networking",
    body: "Facilitating high-level networking opportunities that connect entrepreneurs, executives, investors, and organizations across industries and regions. WBC creates platforms where meaningful business relationships and long-term partnerships are developed.",
    image: networkImg,
    isHome: true,
  },
  {
    id: "2",
    kicker: "Frameworks",
    title: "Business Council Development & Support",
    body: "Providing strategic guidance and operational support for the creation, development, and strengthening of Business Councils brand worldwide. This includes structure setup, governance models, and long-term operational assistance.",
    image: councilImg,
    isHome: true,
  },
  {
    id: "3",
    kicker: "Trade",
    title: "International Trade & Investment Facilitation",
    body: "Supporting cross-border trade and investment opportunities by connecting businesses with international partners, markets, and investors, and promoting global commercial cooperation.",
    image: tradeImg,
    isHome: true,
  },
  {
    id: "4",
    kicker: "Events",
    title: "Conferences, Forums & Global Events",
    body: "Organizing international summits, business forums, conferences, exhibitions, and roundtables that bring together global leaders to exchange knowledge, explore opportunities, and address key economic challenges.",
    image: eventsImg,
    isHome: true,
  },
  {
    id: "5",
    kicker: "Innovation",
    title: "Innovation & Ideas Development Platform - Ideas Place(IP)",
    body: "Operating an innovation-driven platform where members can share ideas, develop projects, and collaborate on forward-thinking solutions that contribute to business transformation and economic progress.",
    image: innovationImg,
    isHome: true,
  },
  {
    id: "6",
    kicker: "Advisory",
    title: "Business Advisory & Consultancy Support",
    body: "Offering advisory services to businesses, startups, and Business Councils in areas such as international expansion, strategic planning, market entry, organizational development, and partnerships.",
    image: heroImg,
    isHome: true,
  },
  {
    id: "7",
    kicker: "Learning",
    title: "Training, Education & Capacity Building",
    body: "Providing workshops, executive training programs, mentorship, and educational resources aimed at strengthening leadership, entrepreneurship, and professional skills across global markets.",
    image: trainingImg,
    isHome: false,
  },
  {
    id: "8",
    kicker: "Members",
    title: "Membership Services & Community Engagement",
    body: "Managing a global membership ecosystem that offers access to networking, business opportunities, resources, events, and exclusive platforms for collaboration and engagement.",
    image: membersImg,
    isHome: false,
  },
  {
    id: "9",
    kicker: "Partnerships",
    title: "Strategic Partnerships & Institutional Relations",
    body: "Developing partnerships with chambers of commerce, NGO’s, international organizations, governments, and private sector entities to enhance global cooperation and expand impact.",
    image: tradeImg,
    isHome: false,
  },
  {
    id: "10",
    kicker: "Policy",
    title: "Lobbying & Advocacy",
    body: "Developing representation, lobbying, and advocacy actions towards public and private stakeholders in order to support and promote the interests of businesses and Business Councils at the international level.",
    image: councilImg,
    isHome: false,
  },
  {
    id: "11",
    kicker: "Insights",
    title: "Research, Publications & Market Insights",
    body: "Producing reports, studies, and publications on global business trends, economic developments, and industry insights to support informed decision-making for members.",
    image: heroImg,
    isHome: false,
  },
  {
    id: "12",
    kicker: "Digital",
    title: "Digital Business Platform",
    body: "Building and maintaining a digital ecosystem that enables global connectivity, communication, opportunity sharing, and access to WBC services and resources.",
    image: innovationImg,
    isHome: false,
  },
  {
    id: "13",
    kicker: "Sustainability",
    title: "Sustainability & Responsible Business Initiatives",
    body: "Promoting responsible and sustainable business practices in alignment with the United Nations Sustainable Development Goals (SDGs) through programs, partnerships, and initiatives.",
    image: trainingImg,
    isHome: false,
  },
];

const DEFAULTS: WhatWeDoPageContent = {
  hero: {
    kicker: "What We Do",
    title: "Core Activities & Services",
    description:
      "The World Business Council (WBC) delivers a wide range of services and activities designed to connect, support, and empower businesses, Business Councils and business associations worldwide. Our work focuses on building a strong global ecosystem that promotes collaboration, innovation, and sustainable development.",
    tags: ["Networking", "Advisory", "Events"],
    image: heroImg,
    imageAlt: "WBC members presenting business insights in a boardroom",
  },
  services: DEFAULT_SERVICES,
};

let cachedEtag: string | null = null;
let cachedContent: WhatWeDoPageContent = DEFAULTS;

function fallbackImage(index: number): string {
  return FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
}

export function mapWhatWeDoPayload(payload: ApiPayload): WhatWeDoPageContent {
  const heroButtons = payload.hero?.buttons ?? [];
  const tags = heroButtons.map((b) => b.label?.trim()).filter(Boolean);

  const services: WhatWeDoService[] = (payload.services ?? []).map((service, index) => ({
    id: String(service.id),
    kicker: service.kicker?.trim() || "",
    title: service.title,
    body: service.description?.trim() ?? "",
    image: service.image_url ?? fallbackImage(index),
    isHome: service.is_home,
  }));

  const resolvedServices = services.length > 0 ? services : DEFAULTS.services;

  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      tags: tags.length > 0 ? tags : DEFAULTS.hero.tags,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    services: resolvedServices,
  };
}

/** Services flagged for the homepage; falls back to the first six when none are flagged. */
export function homeServices(content: WhatWeDoPageContent): WhatWeDoService[] {
  const flagged = content.services.filter((service) => service.isHome);
  if (flagged.length > 0) return flagged;
  return content.services.slice(0, 6);
}

export async function fetchWhatWeDoPage(): Promise<WhatWeDoPageContent> {
  const { data, etag, status } = await apiFetch<WhatWeDoResponse>("/api/what-we-do", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapWhatWeDoPayload(data.data);
  return cachedContent;
}

export const whatWeDoQueryKey = ["what-we-do-page"] as const;

export const whatWeDoQueryOptions = queryOptions({
  queryKey: whatWeDoQueryKey,
  queryFn: fetchWhatWeDoPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
