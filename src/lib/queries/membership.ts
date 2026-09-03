import { queryOptions } from "@tanstack/react-query";
import membershipImg from "@/assets/membership.jpg";
import { apiFetch } from "@/lib/api";
import type { MembershipPageContent } from "@/content/membership";

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
  types_header: {
    id: number;
    kicker: string | null;
    title: string | null;
    description: string | null;
    fee_note: string | null;
    closing_paragraph: string | null;
  } | null;
  highlights: {
    id: number;
    value: string;
    label: string;
  }[];
  types: {
    id: number;
    title: string;
    subtitle: string | null;
    body: string | null;
    icon: string | null;
  }[];
  why: {
    title: string | null;
    items: {
      id: number;
      title: string;
      description: string | null;
    }[];
  };
  benefits_header: {
    id: number;
    kicker: string | null;
    title: string | null;
    description: string | null;
    disclaimer: string | null;
  } | null;
  plan_tiers: {
    id: number;
    plan_key: string;
    label: string;
    price: string | null;
  }[];
  plan_benefits: {
    id: number;
    label: string;
    plans: Record<string, boolean>;
  }[];
};

type MembershipResponse = { data: ApiPayload };

const DEFAULTS: MembershipPageContent = {
  hero: {
    kicker: "Join the Council",
    title: "WBC Membership",
    description: "Types, benefits, fees",
    tags: ["Types", "Benefits", "Fees"],
    cta: { label: "Become a Member", url: "/become-a-member" },
    image: membershipImg,
    imageAlt: "Business professionals shaking hands during a membership meeting",
  },
  typesHeader: {
    kicker: "",
    title: "",
    description: "",
    feeNote: "",
    closingParagraph: "",
  },
  highlights: [],
  types: [],
  why: {
    title: "",
    items: [],
  },
  benefitsHeader: {
    kicker: "",
    title: "",
    description: "",
    disclaimer: "",
  },
  planTiers: [],
  planBenefits: [],
};

let cachedEtag: string | null = null;
let cachedContent: MembershipPageContent = DEFAULTS;

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

export function mapMembershipPayload(payload: ApiPayload): MembershipPageContent {
  const { tags, cta } = splitHeroButtons(payload.hero?.buttons ?? []);

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
    typesHeader: {
      kicker: payload.types_header?.kicker?.trim() ?? "",
      title: payload.types_header?.title?.trim() ?? "",
      description: payload.types_header?.description?.trim() ?? "",
      feeNote: payload.types_header?.fee_note?.trim() ?? "",
      closingParagraph: payload.types_header?.closing_paragraph?.trim() ?? "",
    },
    highlights: (payload.highlights ?? []).map((item) => ({
      id: String(item.id),
      value: item.value,
      label: item.label,
    })),
    types: (payload.types ?? []).map((item) => ({
      id: String(item.id),
      title: item.title,
      subtitle: item.subtitle?.trim() ?? "",
      body: item.body?.trim() ?? "",
      icon: item.icon?.trim() || "user",
    })),
    why: {
      title: payload.why?.title?.trim() ?? "",
      items: (payload.why?.items ?? []).map((item) => ({
        id: String(item.id),
        title: item.title,
        body: item.description?.trim() ?? "",
      })),
    },
    benefitsHeader: {
      kicker: payload.benefits_header?.kicker?.trim() ?? "",
      title: payload.benefits_header?.title?.trim() ?? "",
      description: payload.benefits_header?.description?.trim() ?? "",
      disclaimer: payload.benefits_header?.disclaimer?.trim() ?? "",
    },
    planTiers: (payload.plan_tiers ?? []).map((tier) => ({
      id: tier.plan_key,
      label: tier.label,
      price: tier.price?.trim() ?? "",
    })),
    planBenefits: (payload.plan_benefits ?? []).map((benefit) => ({
      id: String(benefit.id),
      label: benefit.label,
      plans: benefit.plans ?? {},
    })),
  };
}

export async function fetchMembershipPage(): Promise<MembershipPageContent> {
  const { data, etag, status } = await apiFetch<MembershipResponse>("/api/membership", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapMembershipPayload(data.data);
  return cachedContent;
}

export const membershipQueryKey = ["membership-page"] as const;

export const membershipQueryOptions = queryOptions({
  queryKey: membershipQueryKey,
  queryFn: fetchMembershipPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
