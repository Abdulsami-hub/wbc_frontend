import { queryOptions } from "@tanstack/react-query";
import membershipImg from "@/assets/membership.jpg";
import { apiFetch } from "@/lib/api";
import type { BecomeAMemberPageContent } from "@/content/become-a-member";

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
  eligibility: {
    id: number;
    kicker: string | null;
    title: string | null;
    description: string | null;
    cta_label: string | null;
    cta_url: string | null;
    image_url: string | null;
    image_overlay_kicker: string | null;
    image_overlay_text: string | null;
  } | null;
  audiences: {
    id: number;
    label: string;
  }[];
  apply: {
    kicker: string | null;
    title: string | null;
    description: string | null;
    steps: {
      id: number;
      title: string;
      body: string | null;
    }[];
  };
  form: {
    id: number;
    kicker: string | null;
    title: string | null;
    description: string | null;
  } | null;
};

type BecomeAMemberResponse = { data: ApiPayload };

const DEFAULTS: BecomeAMemberPageContent = {
  hero: {
    kicker: "Membership",
    title: "Become a Member",
    description:
      "Fill the online Application-Form and process the payment. You will receive the membership confirmation and certificate within 3 working days.",
    cta: { label: "View Benefits", url: "/membership" },
    image: membershipImg,
    imageAlt: "Business professionals shaking hands during a membership meeting",
  },
  eligibility: {
    kicker: "",
    title: "",
    description: "",
    image: membershipImg,
    imageAlt: "Business professionals shaking hands during a membership meeting",
    overlayKicker: "",
    overlayText: "",
  },
  audiences: [],
  apply: {
    kicker: "",
    title: "",
    description: "",
    steps: [],
  },
  form: {
    kicker: "",
    title: "",
    description: "",
  },
};

let cachedEtag: string | null = null;
let cachedContent: BecomeAMemberPageContent = DEFAULTS;

/** First button with both label and URL becomes the hero CTA. Empty-url labels are ignored (no tags). */
function firstCta(buttons: ApiButton[]): { label: string; url: string } | undefined {
  for (const button of buttons) {
    const label = button.label?.trim();
    const url = button.url?.trim();
    if (label && url) return { label, url };
  }
  return undefined;
}

export function mapBecomeAMemberPayload(payload: ApiPayload): BecomeAMemberPageContent {
  const heroCta = firstCta(payload.hero?.buttons ?? []);
  const eligLabel = payload.eligibility?.cta_label?.trim();
  const eligUrl = payload.eligibility?.cta_url?.trim();

  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      cta: heroCta ?? DEFAULTS.hero.cta,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    eligibility: {
      kicker: payload.eligibility?.kicker?.trim() ?? "",
      title: payload.eligibility?.title?.trim() ?? "",
      description: payload.eligibility?.description?.trim() ?? "",
      cta:
        eligLabel && eligUrl
          ? { label: eligLabel, url: eligUrl }
          : eligLabel
            ? { label: eligLabel, url: "/membership" }
            : undefined,
      image: payload.eligibility?.image_url ?? DEFAULTS.eligibility.image,
      imageAlt: payload.eligibility?.title?.trim() || DEFAULTS.eligibility.imageAlt,
      overlayKicker: payload.eligibility?.image_overlay_kicker?.trim() ?? "",
      overlayText: payload.eligibility?.image_overlay_text?.trim() ?? "",
    },
    audiences: (payload.audiences ?? []).map((item) => ({
      id: String(item.id),
      label: item.label,
    })),
    apply: {
      kicker: payload.apply?.kicker?.trim() ?? "",
      title: payload.apply?.title?.trim() ?? "",
      description: payload.apply?.description?.trim() ?? "",
      steps: (payload.apply?.steps ?? []).map((step) => ({
        id: String(step.id),
        title: step.title,
        body: step.body?.trim() ?? "",
      })),
    },
    form: {
      kicker: payload.form?.kicker?.trim() ?? "",
      title: payload.form?.title?.trim() ?? "",
      description: payload.form?.description?.trim() ?? "",
    },
  };
}

export async function fetchBecomeAMemberPage(): Promise<BecomeAMemberPageContent> {
  const { data, etag, status } = await apiFetch<BecomeAMemberResponse>("/api/become-a-member", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapBecomeAMemberPayload(data.data);
  return cachedContent;
}

export const becomeAMemberQueryKey = ["become-a-member-page"] as const;

export const becomeAMemberQueryOptions = queryOptions({
  queryKey: becomeAMemberQueryKey,
  queryFn: fetchBecomeAMemberPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
