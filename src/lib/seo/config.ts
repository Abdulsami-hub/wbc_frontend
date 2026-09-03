/**
 * Central SEO / site configuration for https://wbccme.org
 *
 * Production canonical origin is always the apex HTTPS host.
 * Override only via VITE_SITE_URL for non-production previews.
 */

export const SITE_NAME = "World Business Council";
export const SITE_NAME_SHORT = "WBC";
export const SITE_TAGLINE = "Connecting Businesses, Creating Opportunities";

/** Official production origin — never emit www, http, or localhost in production metadata. */
export const DEFAULT_SITE_URL = "https://wbccme.org";

export const DEFAULT_DESCRIPTION =
  "World Business Council (WBC) is an international business support organization connecting businesses, entrepreneurs, professionals, institutions, and business organizations worldwide.";

export const DEFAULT_OG_IMAGE_PATH = "/og-image.png";

/** Official social profiles (also mirrored in CMS site-settings when configured). */
export const OFFICIAL_SAME_AS = [
  "https://www.linkedin.com/company/wbccme/",
  "https://x.com/WBCCME",
  "https://www.facebook.com/WBCCME",
] as const;

/**
 * UI languages available in the app (UN official languages).
 * Language is client-side (localStorage); there are no /en|/fr URL prefixes yet,
 * so reciprocal hreflang alternate URLs are not emitted.
 */
export const SEO_LOCALES = ["en", "fr", "es", "ar", "zh", "ru"] as const;

export const DEFAULT_LOCALE = "en";

export function getSiteUrl(): string {
  const fromEnv = import.meta.env.VITE_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv && /^https?:\/\//i.test(fromEnv)) {
    // Never allow localhost / private hosts to leak into production builds
    // unless the developer explicitly opted in via env during local preview.
    if (import.meta.env.PROD) {
      try {
        const host = new URL(fromEnv).hostname;
        if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) {
          return DEFAULT_SITE_URL;
        }
      } catch {
        return DEFAULT_SITE_URL;
      }
    }
    return fromEnv;
  }
  return DEFAULT_SITE_URL;
}

export function absoluteUrl(pathOrUrl: string | undefined | null): string {
  const site = getSiteUrl();
  if (!pathOrUrl) return site;
  const value = pathOrUrl.trim();
  if (!value) return site;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  const path = value.startsWith("/") ? value : `/${value}`;
  return `${site}${path}`;
}

export function canonicalPath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const cleaned = pathname.split("?")[0].split("#")[0];
  // Prefer no trailing slash (except root)
  return cleaned.length > 1 && cleaned.endsWith("/") ? cleaned.slice(0, -1) : cleaned;
}

export function titleWithBrand(pageTitle: string, opts?: { short?: boolean }): string {
  const brand = opts?.short ? SITE_NAME_SHORT : SITE_NAME;
  const trimmed = pageTitle.trim();
  if (!trimmed) return `${SITE_NAME} | ${SITE_TAGLINE}`;
  if (trimmed.includes(SITE_NAME) || trimmed.includes(SITE_NAME_SHORT)) return trimmed;
  return `${trimmed} | ${brand}`;
}
