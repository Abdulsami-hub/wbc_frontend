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
  cities: AffiliateCity[];
};

export type AffiliateRegion = {
  name: string;
  countries: AffiliateCountry[];
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

type RawCity = { name: string; status?: AffiliateStatus };
type RawCountry = { name: string; status?: AffiliateStatus; cities: (string | RawCity)[] };
type RawRegion = { name: string; countries: RawCountry[] };

function buildCity(countrySlug: string, city: string | RawCity): AffiliateCity {
  const name = typeof city === "string" ? city : city.name;
  const status = typeof city === "string" ? "inactive" : (city.status ?? "inactive");
  return {
    name,
    status,
    slug: `${countrySlug}-${slugifyName(name)}`,
  };
}

function buildCountry(raw: RawCountry): AffiliateCountry {
  const slug = slugifyName(raw.name);
  return {
    name: raw.name,
    status: raw.status ?? "inactive",
    slug,
    cities: raw.cities.map((c) => buildCity(slug, c)),
  };
}

const RAW_REGIONS: RawRegion[] = [
  {
    name: "Africa & the Middle East",
    countries: [
      { name: "Egypt", status: "active", cities: [{ name: "Cairo", status: "active" }, { name: "Alexandria", status: "inactive" }] },
      {
        name: "United Arab Emirates",
        status: "active",
        cities: [
          { name: "Dubai", status: "active" },
          { name: "Abu Dhabi", status: "active" },
          { name: "Sharjah", status: "inactive" },
        ],
      },
      { name: "Morocco", status: "active", cities: [{ name: "Casablanca", status: "active" }, { name: "Rabat", status: "inactive" }] },
      { name: "Algeria", status: "inactive", cities: ["Algiers"] },
      { name: "Tunisia", status: "inactive", cities: ["Tunis"] },
      { name: "Kenya", status: "active", cities: [{ name: "Nairobi", status: "active" }] },
      { name: "Nigeria", status: "active", cities: [{ name: "Lagos", status: "active" }, { name: "Abuja", status: "inactive" }] },
      {
        name: "South Africa",
        status: "active",
        cities: [
          { name: "Johannesburg", status: "active" },
          { name: "Cape Town", status: "inactive" },
        ],
      },
      { name: "Ghana", status: "inactive", cities: ["Accra"] },
      { name: "Ethiopia", status: "inactive", cities: ["Addis Ababa"] },
      { name: "Senegal", status: "inactive", cities: ["Dakar"] },
      { name: "Cote d'Ivoire", status: "inactive", cities: ["Abidjan"] },
      {
        name: "Saudi Arabia",
        status: "active",
        cities: [
          { name: "Riyadh", status: "active" },
          { name: "Jeddah", status: "inactive" },
        ],
      },
      { name: "Qatar", status: "active", cities: [{ name: "Doha", status: "active" }] },
      { name: "Kuwait", status: "inactive", cities: ["Kuwait City"] },
      { name: "Bahrain", status: "inactive", cities: ["Manama"] },
      { name: "Oman", status: "inactive", cities: ["Muscat"] },
      { name: "Jordan", status: "inactive", cities: ["Amman"] },
      { name: "Lebanon", status: "inactive", cities: ["Beirut"] },
    ],
  },
  {
    name: "Europe",
    countries: [
      {
        name: "France",
        status: "active",
        cities: [
          { name: "Paris", status: "active" },
          { name: "Lyon", status: "inactive" },
          { name: "Marseille", status: "inactive" },
        ],
      },
      {
        name: "Germany",
        status: "active",
        cities: [
          { name: "Berlin", status: "active" },
          { name: "Frankfurt", status: "active" },
          { name: "Munich", status: "inactive" },
        ],
      },
      {
        name: "Spain",
        status: "active",
        cities: [
          { name: "Madrid", status: "active" },
          { name: "Barcelona", status: "inactive" },
        ],
      },
      {
        name: "Italy",
        status: "active",
        cities: [
          { name: "Milan", status: "active" },
          { name: "Rome", status: "inactive" },
        ],
      },
      {
        name: "Netherlands",
        status: "active",
        cities: [
          { name: "Amsterdam", status: "active" },
          { name: "Rotterdam", status: "inactive" },
        ],
      },
      { name: "Belgium", status: "active", cities: [{ name: "Brussels", status: "active" }] },
      {
        name: "Switzerland",
        status: "active",
        cities: [
          { name: "Geneva", status: "active" },
          { name: "Zurich", status: "inactive" },
        ],
      },
      { name: "Austria", status: "inactive", cities: ["Vienna"] },
      { name: "Sweden", status: "inactive", cities: ["Stockholm"] },
      { name: "Denmark", status: "inactive", cities: ["Copenhagen"] },
      { name: "Norway", status: "inactive", cities: ["Oslo"] },
      { name: "Ireland", status: "inactive", cities: ["Dublin"] },
      { name: "Portugal", status: "inactive", cities: ["Lisbon"] },
      { name: "Poland", status: "inactive", cities: ["Warsaw"] },
      { name: "Greece", status: "inactive", cities: ["Athens"] },
    ],
  },
  {
    name: "Asia & the Pacific",
    countries: [
      { name: "Singapore", status: "active", cities: [{ name: "Singapore", status: "active" }] },
      {
        name: "Japan",
        status: "active",
        cities: [
          { name: "Tokyo", status: "active" },
          { name: "Osaka", status: "inactive" },
        ],
      },
      { name: "South Korea", status: "active", cities: [{ name: "Seoul", status: "active" }] },
      {
        name: "Australia",
        status: "active",
        cities: [
          { name: "Sydney", status: "active" },
          { name: "Melbourne", status: "inactive" },
        ],
      },
      { name: "New Zealand", status: "inactive", cities: ["Auckland"] },
      {
        name: "India",
        status: "active",
        cities: [
          { name: "Mumbai", status: "active" },
          { name: "New Delhi", status: "active" },
          { name: "Bengaluru", status: "inactive" },
        ],
      },
      {
        name: "Pakistan",
        status: "inactive",
        cities: ["Karachi", "Lahore"],
      },
      { name: "Afghanistan", status: "inactive", cities: ["Kabul"] },
      { name: "Tajikistan", status: "inactive", cities: ["Dushanbe"] },
      { name: "Uzbekistan", status: "inactive", cities: ["Tashkent"] },
      { name: "Kyrgyzstan", status: "inactive", cities: ["Bishkek"] },
      {
        name: "Kazakhstan",
        status: "inactive",
        cities: ["Almaty", "Astana"],
      },
      { name: "Bangladesh", status: "inactive", cities: ["Dhaka"] },
      { name: "Sri Lanka", status: "inactive", cities: ["Colombo"] },
      { name: "Nepal", status: "inactive", cities: ["Kathmandu"] },
      { name: "Mongolia", status: "inactive", cities: ["Ulaanbaatar"] },
      { name: "Indonesia", status: "inactive", cities: ["Jakarta"] },
      { name: "Malaysia", status: "inactive", cities: ["Kuala Lumpur"] },
      { name: "Thailand", status: "inactive", cities: ["Bangkok"] },
    ],
  },
  {
    name: "North America",
    countries: [
      {
        name: "United States",
        status: "active",
        cities: [
          { name: "New York", status: "active" },
          { name: "Washington, D.C.", status: "active" },
          { name: "Los Angeles", status: "inactive" },
        ],
      },
      {
        name: "Canada",
        status: "active",
        cities: [
          { name: "Toronto", status: "active" },
          { name: "Montreal", status: "inactive" },
        ],
      },
      { name: "Mexico", status: "active", cities: [{ name: "Mexico City", status: "active" }] },
      { name: "Costa Rica", status: "inactive", cities: ["San José"] },
      { name: "Panama", status: "inactive", cities: ["Panama City"] },
      { name: "Dominican Republic", status: "inactive", cities: ["Santo Domingo"] },
      { name: "Jamaica", status: "inactive", cities: ["Kingston"] },
      { name: "Trinidad and Tobago", status: "inactive", cities: ["Port of Spain"] },
      { name: "Guatemala", status: "inactive", cities: ["Guatemala City"] },
      { name: "El Salvador", status: "inactive", cities: ["San Salvador"] },
    ],
  },
  {
    name: "Latin America",
    countries: [
      { name: "Argentina", status: "active", cities: [{ name: "Buenos Aires", status: "active" }] },
      { name: "Bolivia", status: "inactive", cities: ["La Paz"] },
      {
        name: "Brazil",
        status: "active",
        cities: [
          { name: "São Paulo", status: "active" },
          { name: "Rio de Janeiro", status: "active" },
          { name: "Brasília", status: "inactive" },
          { name: "Belo Horizonte", status: "inactive" },
          { name: "Porto Alegre", status: "inactive" },
        ],
      },
      { name: "Chile", status: "active", cities: [{ name: "Santiago", status: "active" }] },
      {
        name: "Colombia",
        status: "active",
        cities: [
          { name: "Bogotá", status: "active" },
          { name: "Medellín", status: "inactive" },
        ],
      },
      { name: "Ecuador", status: "inactive", cities: ["Quito"] },
      { name: "Paraguay", status: "inactive", cities: ["Asunción"] },
      { name: "Peru", status: "inactive", cities: ["Lima"] },
      { name: "Uruguay", status: "inactive", cities: ["Montevideo"] },
      { name: "Venezuela", status: "inactive", cities: ["Caracas"] },
    ],
  },
];

export const AFFILIATE_REGIONS: AffiliateRegion[] = RAW_REGIONS.map((r) => ({
  name: r.name,
  countries: r.countries.map(buildCountry),
}));

export type AffiliateProfile =
  | {
      kind: "country";
      name: string;
      slug: string;
      status: AffiliateStatus;
      region: string;
      cities: AffiliateCity[];
    }
  | {
      kind: "city";
      name: string;
      slug: string;
      status: AffiliateStatus;
      region: string;
      countryName: string;
      countrySlug: string;
    };

export function getAffiliate(slug: string): AffiliateProfile | undefined {
  for (const region of AFFILIATE_REGIONS) {
    for (const country of region.countries) {
      if (country.slug === slug) {
        return {
          kind: "country",
          name: country.name,
          slug: country.slug,
          status: country.status,
          region: region.name,
          cities: country.cities,
        };
      }
      for (const city of country.cities) {
        if (city.slug === slug) {
          return {
            kind: "city",
            name: city.name,
            slug: city.slug,
            status: city.status,
            region: region.name,
            countryName: country.name,
            countrySlug: country.slug,
          };
        }
      }
    }
  }
  return undefined;
}
