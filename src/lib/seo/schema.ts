import {
  absoluteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  getSiteUrl,
  OFFICIAL_SAME_AS,
  SITE_NAME,
  SITE_NAME_SHORT,
  SITE_TAGLINE,
} from "./config";

type JsonLd = Record<string, unknown>;

function prune<T extends JsonLd>(obj: T): T {
  const out: JsonLd = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined || value === null || value === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as T;
}

export function organizationSchema(opts?: {
  description?: string;
  logoUrl?: string;
  sameAs?: string[];
}): JsonLd {
  const sameAs = [...new Set([...(opts?.sameAs ?? []), ...OFFICIAL_SAME_AS])];
  return prune({
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${getSiteUrl()}/#organization`,
    name: SITE_NAME,
    alternateName: SITE_NAME_SHORT,
    url: getSiteUrl(),
    logo: absoluteUrl(opts?.logoUrl || "/apple-touch-icon.png"),
    description: opts?.description?.trim() || DEFAULT_DESCRIPTION,
    slogan: SITE_TAGLINE,
    sameAs,
  });
}

export function websiteSchema(): JsonLd {
  return prune({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: SITE_NAME,
    url: getSiteUrl(),
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en",
  });
}

export function webPageSchema(input: {
  title: string;
  description?: string;
  path: string;
}): JsonLd {
  return prune({
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(input.path)}#webpage`,
    url: absoluteUrl(input.path),
    name: input.title,
    description: input.description?.trim() || DEFAULT_DESCRIPTION,
    isPartOf: { "@id": `${getSiteUrl()}/#website` },
    about: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "en",
  });
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonLd | null {
  if (items.length < 2) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) =>
      prune({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      }),
    ),
  };
}

export function newsArticleSchema(input: {
  title: string;
  description?: string;
  path: string;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  section?: string | null;
}): JsonLd {
  const image = absoluteUrl(input.image || DEFAULT_OG_IMAGE_PATH);
  return prune({
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: input.title,
    description: input.description?.trim() || undefined,
    image: [image],
    datePublished: toIsoDate(input.datePublished) || undefined,
    dateModified: toIsoDate(input.dateModified || input.datePublished) || undefined,
    mainEntityOfPage: absoluteUrl(input.path),
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/apple-touch-icon.png"),
      },
    },
    articleSection: input.section || undefined,
    inLanguage: "en",
  });
}

export function eventSchema(input: {
  name: string;
  description?: string;
  path: string;
  image?: string | null;
  /** ISO or parseable date; omitted from schema if unavailable */
  startDate?: string | null;
  endDate?: string | null;
  locationName?: string | null;
  registrationUrl?: string | null;
}): JsonLd | null {
  const startDate = toIsoDate(input.startDate) || parseLooseDate(input.startDate);
  if (!startDate) {
    // Event schema requires startDate — skip rather than invent dates
    return null;
  }

  const locationName = input.locationName?.trim();
  return prune({
    "@context": "https://schema.org",
    "@type": "Event",
    name: input.name,
    description: input.description?.trim() || undefined,
    url: absoluteUrl(input.path),
    image: [absoluteUrl(input.image || DEFAULT_OG_IMAGE_PATH)],
    startDate,
    endDate: toIsoDate(input.endDate) || undefined,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: locationName
      ? {
          "@type": "Place",
          name: locationName,
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: getSiteUrl(),
    },
    offers: input.registrationUrl
      ? {
          "@type": "Offer",
          url: absoluteUrl(input.registrationUrl),
          availability: "https://schema.org/InStock",
        }
      : undefined,
  });
}

export function jobPostingSchema(input: {
  title: string;
  description: string;
  path: string;
  datePosted?: string | null;
  validThrough?: string | null;
  employmentType?: string | null;
  workLocation?: string | null;
  applyEmail?: string | null;
}): JsonLd | null {
  const datePosted = toIsoDate(input.datePosted);
  if (!datePosted) return null;

  const description = input.description.trim();
  if (!description) return null;

  const locationHint = `${input.workLocation || ""} ${input.employmentType || ""}`;
  const isRemote = /remote/i.test(locationHint);

  // Only assert location when the listing text clearly indicates remote work.
  // Do not invent a city/country for JobPosting.
  return prune({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: input.title,
    description,
    datePosted,
    validThrough: toIsoDate(input.validThrough) || undefined,
    employmentType: mapEmploymentType(input.employmentType) || undefined,
    hiringOrganization: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: getSiteUrl(),
      logo: absoluteUrl("/apple-touch-icon.png"),
    },
    jobLocationType: isRemote ? "TELECOMMUTE" : undefined,
    applicantLocationRequirements: isRemote ? { "@type": "Country", name: "Worldwide" } : undefined,
    url: absoluteUrl(input.path),
    directApply: Boolean(input.applyEmail),
  });
}

function toIsoDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;

  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    const d = new Date(trimmed.includes("T") ? trimmed : `${trimmed}T00:00:00Z`);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }

  const d = new Date(trimmed);
  if (!Number.isNaN(d.getTime())) return d.toISOString();
  return undefined;
}

/** Best-effort parse of labels like "15 March 2026" — returns undefined if ambiguous. */
function parseLooseDate(value?: string | null): string | undefined {
  if (!value) return undefined;
  const d = new Date(value.trim());
  if (Number.isNaN(d.getTime())) return undefined;
  // Reject dates that are clearly wrong epoch defaults
  if (d.getFullYear() < 2000) return undefined;
  return d.toISOString();
}

function mapEmploymentType(value?: string | null): string | undefined {
  if (!value) return undefined;
  const v = value.toLowerCase();
  if (v.includes("intern")) return "INTERN";
  if (v.includes("full")) return "FULL_TIME";
  if (v.includes("part")) return "PART_TIME";
  if (v.includes("contract")) return "CONTRACTOR";
  if (v.includes("temp")) return "TEMPORARY";
  if (v.includes("volunteer")) return "VOLUNTEER";
  return undefined;
}

export function graphSchema(nodes: Array<JsonLd | null | undefined>): JsonLd {
  const filtered = nodes.filter(Boolean) as JsonLd[];
  return {
    "@context": "https://schema.org",
    "@graph": filtered.map((node) => {
      const { "@context": _ctx, ...rest } = node;
      return rest;
    }),
  };
}
