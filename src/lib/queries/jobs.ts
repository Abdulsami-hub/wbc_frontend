import { queryOptions } from "@tanstack/react-query";
import teamHero from "@/assets/team-hero.jpg";
import type { JobRecord } from "@/content/jobs";
import { apiFetch } from "@/lib/api";

type ApiButton = { label: string; url: string };

type ApiListing = {
  id: number;
  slug: string;
  title: string;
  positions_available: number;
  intro: string | null;
  description: string | null;
  about_company: string | null;
  responsibilities: string[] | null;
  requirements: string[] | null;
  duration: string | null;
  offers: string[] | null;
  working_arrangement: string | null;
  working_arrangement_note: string | null;
  submission_guidelines: string | null;
  apply_email: string | null;
  announcement_type: string | null;
  work_type: string | null;
  compensation: string | null;
  languages: string[] | null;
  logo_url: string | null;
  published_at: string | null;
  application_deadline: string | null;
  status: string | null;
  reference: string | null;
  contract_extension: string | null;
  functional_area: string | null;
};

type ApiPayload = {
  hero: {
    id: number;
    kicker: string | null;
    title: string;
    description: string | null;
    buttons: ApiButton[];
    image_url: string | null;
  } | null;
  listings_header: {
    kicker: string | null;
    title: string;
    description: string | null;
  } | null;
  listings: ApiListing[];
};

type JobsResponse = { data: ApiPayload };

export type JobsPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    cta?: { label: string; url: string };
    image: string;
    imageAlt: string;
  };
  listingsHeader: {
    kicker: string;
    title: string;
    description: string;
  };
  listings: JobRecord[];
};

const DEFAULTS: JobsPageContent = {
  hero: {
    kicker: "Careers",
    title: "Jobs & Internships",
    description:
      "Gain practical experience with the World Business Council through remote, part-time internship opportunities across our international teams.",
    cta: { label: "Contact Us", url: "/contact" },
    image: teamHero,
    imageAlt: "WBC team members collaborating on international business initiatives",
  },
  listingsHeader: {
    kicker: "",
    title: "Open Internship Roles",
    description:
      "Explore career opportunities with the World Business Council (WBC) and across our network of affiliates, partners, and members. Browse current job and internship opportunities and apply directly for positions that match your skills and interests.",
  },
  listings: [],
};

let cachedEtag: string | null = null;
let cachedContent: JobsPageContent = DEFAULTS;

function firstCta(buttons: ApiButton[]): { label: string; url: string } | undefined {
  for (const button of buttons) {
    const label = button.label?.trim();
    const url = button.url?.trim();
    if (label && url) return { label, url };
  }
  return undefined;
}

function cleanList(items: string[] | null | undefined): string[] {
  return (items ?? []).map((item) => item.trim()).filter(Boolean);
}

function defaultFunctionalArea(title: string): string {
  return title.replace(/\s*-\s*Internship$/i, "").trim();
}

export function mapJobListing(item: ApiListing): JobRecord {
  return {
    slug: item.slug,
    title: item.title,
    positionsAvailable: item.positions_available ?? 1,
    intro: item.intro?.trim() || "",
    description: item.description?.trim() || "",
    aboutCompany: item.about_company?.trim() || "",
    responsibilities: cleanList(item.responsibilities),
    requirements: cleanList(item.requirements),
    duration: item.duration?.trim() || "",
    offers: cleanList(item.offers),
    workingArrangement: item.working_arrangement?.trim() || "",
    workingArrangementNote: item.working_arrangement_note?.trim() || "",
    submissionGuidelines: item.submission_guidelines?.trim() || "",
    applyEmail: item.apply_email?.trim() || "",
    announcementType: item.announcement_type?.trim() || "",
    workType: item.work_type?.trim() || "",
    compensation: item.compensation?.trim() || "",
    languages: cleanList(item.languages),
    logo: item.logo_url?.trim() || undefined,
    publishedDate: item.published_at ?? "",
    applicationDeadline: item.application_deadline ?? "",
    status: item.status?.trim() || "",
    reference: item.reference?.trim() || "",
    contractExtension: item.contract_extension?.trim() || "",
    functionalArea: item.functional_area?.trim() || defaultFunctionalArea(item.title),
  };
}

export function mapJobsPayload(payload: ApiPayload): JobsPageContent {
  return {
    hero: {
      kicker: payload.hero?.kicker?.trim() || DEFAULTS.hero.kicker,
      title: payload.hero?.title?.trim() || DEFAULTS.hero.title,
      description: payload.hero?.description?.trim() || DEFAULTS.hero.description,
      cta: firstCta(payload.hero?.buttons ?? []) ?? DEFAULTS.hero.cta,
      image: payload.hero?.image_url ?? DEFAULTS.hero.image,
      imageAlt: payload.hero?.title?.trim() || DEFAULTS.hero.imageAlt,
    },
    listingsHeader: {
      kicker: payload.listings_header?.kicker?.trim() || DEFAULTS.listingsHeader.kicker,
      title: payload.listings_header?.title?.trim() || DEFAULTS.listingsHeader.title,
      description:
        payload.listings_header?.description?.trim() || DEFAULTS.listingsHeader.description,
    },
    listings: (payload.listings ?? []).map(mapJobListing),
  };
}

export async function fetchJobsPage(): Promise<JobsPageContent> {
  const { data, etag, status } = await apiFetch<JobsResponse>("/api/jobs", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapJobsPayload(data.data);
  return cachedContent;
}

export const jobsQueryKey = ["jobs-page"] as const;

export const jobsQueryOptions = queryOptions({
  queryKey: jobsQueryKey,
  queryFn: fetchJobsPage,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
