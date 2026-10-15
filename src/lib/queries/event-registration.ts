import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import type { SearchableOption } from "@/components/SearchableSelect";

export type NamedOption = { id: number; name: string };
export type ValueOption = { value: string; label: string };

export type EventRegistrationOptions = {
  titles: ValueOption[];
  industries: NamedOption[];
  job_levels: NamedOption[];
  company_sizes: NamedOption[];
  referral_sources: NamedOption[];
  interests: ValueOption[];
};

export type CountryOption = SearchableOption & { dial_code?: string };

export type CountriesPayload = {
  nationalities: SearchableOption[];
  countries: CountryOption[];
  dial_codes: SearchableOption[];
};

export const eventRegistrationOptionsQuery = queryOptions({
  queryKey: ["event-registration-options"],
  queryFn: async () => {
    const { data } = await apiFetch<EventRegistrationOptions>("/api/events/registration-options");
    return data;
  },
  staleTime: 5 * 60 * 1000,
});

export const countriesQuery = queryOptions({
  queryKey: ["countries"],
  queryFn: async () => {
    const { data } = await apiFetch<CountriesPayload>("/api/countries");
    return data;
  },
  staleTime: 24 * 60 * 60 * 1000,
});

export function namedToOptions(items: NamedOption[] | undefined): SearchableOption[] {
  return (items ?? []).map((item) => ({
    value: String(item.id),
    label: item.name,
    keywords: item.name,
  }));
}
