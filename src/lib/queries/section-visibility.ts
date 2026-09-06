import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";

export type SectionVisibility = Record<string, Record<string, boolean>>;

type SectionVisibilityResponse = { data: SectionVisibility };

const DEFAULTS: SectionVisibility = {};

let cachedEtag: string | null = null;
let cachedContent: SectionVisibility = DEFAULTS;

export function isSectionVisible(
  visibility: SectionVisibility | undefined,
  page: string,
  section: string,
): boolean {
  return visibility?.[page]?.[section] !== false;
}

export async function fetchSectionVisibility(): Promise<SectionVisibility> {
  try {
    const { data, etag, status } = await apiFetch<SectionVisibilityResponse>(
      "/api/section-visibility",
      { etag: cachedEtag ?? undefined },
    );

    if (status === 304) return cachedContent;

    cachedEtag = etag;
    cachedContent = data.data ?? DEFAULTS;
    return cachedContent;
  } catch {
    // Missing or failing endpoint should not take down the site — default to visible.
    return cachedContent;
  }
}

export const sectionVisibilityQueryKey = ["section-visibility"] as const;

export const sectionVisibilityQueryOptions = queryOptions({
  queryKey: sectionVisibilityQueryKey,
  queryFn: fetchSectionVisibility,
  staleTime: 2_000,
  refetchInterval: 3_000,
  refetchOnWindowFocus: true,
});

export function useSectionVisible(page: string, section: string): boolean {
  const { data } = useQuery(sectionVisibilityQueryOptions);
  return isSectionVisible(data, page, section);
}
