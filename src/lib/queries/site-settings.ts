import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type SocialIconKey =
  | "linkedin"
  | "x"
  | "facebook"
  | "youtube"
  | "instagram"
  | "tiktok"
  | "website";

export type SiteSocialLink = {
  icon: SocialIconKey;
  url: string;
};

export type SiteSettingsContent = {
  footerDescription: string;
  socialLinks: SiteSocialLink[];
};

type ApiPayload = {
  footer_description: string | null;
  social_links: Array<{ icon: string; url: string }>;
};

type SiteSettingsResponse = { data: ApiPayload };

const SOCIAL_ICONS: SocialIconKey[] = [
  "linkedin",
  "x",
  "facebook",
  "youtube",
  "instagram",
  "tiktok",
  "website",
];

const DEFAULTS: SiteSettingsContent = {
  footerDescription: "",
  socialLinks: [],
};

let cachedEtag: string | null = null;
let cachedContent: SiteSettingsContent = DEFAULTS;

function isSocialIcon(value: string): value is SocialIconKey {
  return SOCIAL_ICONS.includes(value as SocialIconKey);
}

export function mapSiteSettingsPayload(payload: ApiPayload): SiteSettingsContent {
  return {
    footerDescription: payload.footer_description?.trim() || "",
    socialLinks: (payload.social_links ?? [])
      .map((link) => ({
        icon: link.icon?.trim() || "",
        url: link.url?.trim() || "",
      }))
      .filter((link): link is SiteSocialLink => Boolean(link.url) && isSocialIcon(link.icon)),
  };
}

export async function fetchSiteSettings(): Promise<SiteSettingsContent> {
  const { data, etag, status } = await apiFetch<SiteSettingsResponse>("/api/site-settings", {
    etag: cachedEtag ?? undefined,
  });

  if (status === 304) return cachedContent;

  cachedEtag = etag;
  cachedContent = mapSiteSettingsPayload(data.data);
  return cachedContent;
}

export const siteSettingsQueryKey = ["site-settings"] as const;

export const siteSettingsQueryOptions = queryOptions({
  queryKey: siteSettingsQueryKey,
  queryFn: fetchSiteSettings,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});
