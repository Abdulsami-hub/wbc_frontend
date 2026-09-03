export { buildSeoHead, seoHead, noindexHead, siteOrigin } from "./build-head";
export type { SeoHeadInput, SeoHeadResult } from "./build-head";
export {
  SITE_NAME,
  SITE_NAME_SHORT,
  SITE_TAGLINE,
  DEFAULT_SITE_URL,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_PATH,
  OFFICIAL_SAME_AS,
  SEO_LOCALES,
  DEFAULT_LOCALE,
  getSiteUrl,
  absoluteUrl,
  canonicalPath,
  titleWithBrand,
} from "./config";
export {
  organizationSchema,
  websiteSchema,
  webPageSchema,
  breadcrumbSchema,
  newsArticleSchema,
  eventSchema,
  jobPostingSchema,
  graphSchema,
} from "./schema";
