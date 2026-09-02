export type AffiliateStatus = "active" | "inactive";

export type AffiliateCity = {
  name: string;
  status: AffiliateStatus;
  slug: string;
};

export type AffiliateCountry = {
  name: string;
  status: AffiliateStatus;
  slug: string;
  iso2?: string;
  flagUrl?: string;
  cities: AffiliateCity[];
};

export type AffiliateRegion = {
  name: string;
  slug: string;
  blurb: string;
  countries: AffiliateCountry[];
};

export type AffiliateProfile =
  | {
      kind: "region";
      name: string;
      slug: string;
      blurb: string;
      countries: AffiliateCountry[];
    }
  | {
      kind: "country";
      name: string;
      slug: string;
      status: AffiliateStatus;
      region: string;
      regionSlug: string;
      cities: AffiliateCity[];
      iso2?: string;
      flagUrl?: string;
    }
  | {
      kind: "city";
      name: string;
      slug: string;
      status: AffiliateStatus;
      region: string;
      regionSlug: string;
      countryName: string;
      countrySlug: string;
    };

export function slugifyName(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function regionStats(region: AffiliateRegion) {
  const countries = region.countries.length;
  const activeCountries = region.countries.filter((c) => c.status === "active").length;
  const cities = region.countries.reduce((n, c) => n + c.cities.length, 0);
  const activeCities = region.countries.reduce(
    (n, c) => n + c.cities.filter((city) => city.status === "active").length,
    0,
  );
  return { countries, activeCountries, cities, activeCities };
}

export function getRegion(regions: AffiliateRegion[], slug: string): AffiliateRegion | undefined {
  return regions.find((r) => r.slug === slug);
}

export function getAffiliate(regions: AffiliateRegion[], slug: string): AffiliateProfile | undefined {
  const region = getRegion(regions, slug);
  if (region) {
    return {
      kind: "region",
      name: region.name,
      slug: region.slug,
      blurb: region.blurb,
      countries: region.countries,
    };
  }

  for (const r of regions) {
    for (const country of r.countries) {
      if (country.slug === slug) {
        return {
          kind: "country",
          name: country.name,
          slug: country.slug,
          status: country.status,
          region: r.name,
          regionSlug: r.slug,
          cities: country.cities,
          iso2: country.iso2,
          flagUrl: country.flagUrl,
        };
      }
      for (const city of country.cities) {
        if (city.slug === slug) {
          return {
            kind: "city",
            name: city.name,
            slug: city.slug,
            status: city.status,
            region: r.name,
            regionSlug: r.slug,
            countryName: country.name,
            countrySlug: country.slug,
          };
        }
      }
    }
  }
  return undefined;
}
