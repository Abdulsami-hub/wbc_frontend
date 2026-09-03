import {
  absoluteUrl,
  canonicalPath,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  getSiteUrl,
  SITE_NAME,
  titleWithBrand,
} from "./config";

export type SeoHeadInput = {
  /** Document title (brand suffix applied unless already present) */
  title: string;
  description?: string;
  /** Path or absolute URL for canonical (defaults to path) */
  path: string;
  image?: string | null;
  type?: "website" | "article";
  noindex?: boolean;
  /** Extra Open Graph article fields */
  article?: {
    publishedTime?: string | null;
    modifiedTime?: string | null;
    author?: string | null;
    section?: string | null;
  };
  /** Additional preload links (e.g. LCP image) */
  preloadImage?: string | null;
  /** Skip brand suffix on title */
  rawTitle?: boolean;
};

type MetaEntry =
  { title: string } | { name: string; content: string } | { property: string; content: string };

type LinkEntry = {
  rel: string;
  href: string;
  as?: string;
  fetchPriority?: "high" | "low" | "auto";
  type?: string;
};

export type SeoHeadResult = {
  meta: MetaEntry[];
  links: LinkEntry[];
};

/**
 * Build TanStack Router `head` meta/links for a public page.
 */
export function buildSeoHead(input: SeoHeadInput): SeoHeadResult {
  const title = input.rawTitle ? input.title.trim() : titleWithBrand(input.title);
  const description = (input.description?.trim() || DEFAULT_DESCRIPTION).slice(0, 320);
  const path = canonicalPath(input.path);
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(input.image || DEFAULT_OG_IMAGE_PATH);
  const ogType = input.type ?? "website";
  const robots = input.noindex ? "noindex, follow" : "index, follow";

  const meta: MetaEntry[] = [
    { title },
    { name: "description", content: description },
    { name: "developer", content: "Abdul Sami Fazilyar" },
    { name: "robots", content: robots },
    { name: "googlebot", content: robots },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:type", content: ogType },
    { property: "og:url", content: canonical },
    { property: "og:image", content: image },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
  ];

  if (ogType === "article" && input.article) {
    const { publishedTime, modifiedTime, author, section } = input.article;
    if (publishedTime) meta.push({ property: "article:published_time", content: publishedTime });
    if (modifiedTime) meta.push({ property: "article:modified_time", content: modifiedTime });
    if (author) meta.push({ property: "article:author", content: author });
    if (section) meta.push({ property: "article:section", content: section });
  }

  const links: LinkEntry[] = [{ rel: "canonical", href: canonical }];

  if (input.preloadImage) {
    links.push({
      rel: "preload",
      as: "image",
      href: absoluteUrl(input.preloadImage),
      fetchPriority: "high",
    });
  }

  return { meta, links };
}

/** Flat head object ready for route `head: () => buildSeoHead(...)` */
export function seoHead(input: SeoHeadInput): SeoHeadResult {
  return buildSeoHead(input);
}

/** Convenience for 404 / private surfaces */
export function noindexHead(title = "Page Not Found", path = "/404"): SeoHeadResult {
  return buildSeoHead({
    title,
    description: "This page could not be found on the World Business Council website.",
    path,
    noindex: true,
    rawTitle: false,
  });
}

export function siteOrigin(): string {
  return getSiteUrl();
}
