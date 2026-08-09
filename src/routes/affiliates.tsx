import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/affiliates-hero.jpg";

export const Route = createFileRoute("/affiliates")({
  head: () => ({
    meta: [
      { title: "WBC Affiliates — Global Affiliate Footprint" },
      {
        name: "description",
        content:
          "Explore WBC affiliate presence across Africa & the Middle East, Europe, Asia & the Pacific, North America, and Latin America, country by country.",
      },
      { property: "og:title", content: "WBC Affiliates — Around the World" },
      {
        property: "og:description",
        content: "Affiliate presence by region, country, and city across the global WBC network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Affiliates,
});

const TAGS = ["Institutional Alignment", "Network Access", "Partnership Continuity"] as const;

type Country = { name: string; cities: string[] };
type Region = { name: string; countries: Country[] };

const REGIONS: Region[] = [
  {
    name: "Africa & the Middle East",
    countries: [
      { name: "Egypt", cities: ["Cairo", "Alexandria"] },
      { name: "United Arab Emirates", cities: ["Dubai", "Abu Dhabi", "Sharjah"] },
      { name: "Morocco", cities: ["Casablanca", "Rabat"] },
      { name: "Algeria", cities: ["Algiers"] },
      { name: "Tunisia", cities: ["Tunis"] },
      { name: "Kenya", cities: ["Nairobi"] },
      { name: "Nigeria", cities: ["Lagos", "Abuja"] },
      { name: "South Africa", cities: ["Johannesburg", "Cape Town"] },
      { name: "Ghana", cities: ["Accra"] },
      { name: "Ethiopia", cities: ["Addis Ababa"] },
      { name: "Senegal", cities: ["Dakar"] },
      { name: "Cote d'Ivoire", cities: ["Abidjan"] },
      { name: "Saudi Arabia", cities: ["Riyadh", "Jeddah"] },
      { name: "Qatar", cities: ["Doha"] },
      { name: "Kuwait", cities: ["Kuwait City"] },
      { name: "Bahrain", cities: ["Manama"] },
      { name: "Oman", cities: ["Muscat"] },
      { name: "Jordan", cities: ["Amman"] },
      { name: "Lebanon", cities: ["Beirut"] },
    ],
  },
  {
    name: "Europe",
    countries: [
      { name: "France", cities: ["Paris", "Lyon", "Marseille"] },
      { name: "Germany", cities: ["Berlin", "Frankfurt", "Munich"] },
      { name: "Spain", cities: ["Madrid", "Barcelona"] },
      { name: "Italy", cities: ["Milan", "Rome"] },
      { name: "Netherlands", cities: ["Amsterdam", "Rotterdam"] },
      { name: "Belgium", cities: ["Brussels"] },
      { name: "Switzerland", cities: ["Geneva", "Zurich"] },
      { name: "Austria", cities: ["Vienna"] },
      { name: "Sweden", cities: ["Stockholm"] },
      { name: "Denmark", cities: ["Copenhagen"] },
      { name: "Norway", cities: ["Oslo"] },
      { name: "Ireland", cities: ["Dublin"] },
      { name: "Portugal", cities: ["Lisbon"] },
      { name: "Poland", cities: ["Warsaw"] },
      { name: "Greece", cities: ["Athens"] },
    ],
  },
  {
    name: "Asia & the Pacific",
    countries: [
      { name: "Singapore", cities: ["Singapore"] },
      { name: "Japan", cities: ["Tokyo", "Osaka"] },
      { name: "South Korea", cities: ["Seoul"] },
      { name: "Australia", cities: ["Sydney", "Melbourne"] },
      { name: "New Zealand", cities: ["Auckland"] },
      { name: "India", cities: ["Mumbai", "New Delhi", "Bengaluru"] },
      { name: "Pakistan", cities: ["Karachi", "Lahore"] },
      { name: "Afghanistan", cities: ["Kabul"] },
      { name: "Tajikistan", cities: ["Dushanbe"] },
      { name: "Uzbekistan", cities: ["Tashkent"] },
      { name: "Kyrgyzstan", cities: ["Bishkek"] },
      { name: "Kazakhstan", cities: ["Almaty", "Astana"] },
      { name: "Bangladesh", cities: ["Dhaka"] },
      { name: "Sri Lanka", cities: ["Colombo"] },
      { name: "Nepal", cities: ["Kathmandu"] },
      { name: "Mongolia", cities: ["Ulaanbaatar"] },
      { name: "Indonesia", cities: ["Jakarta"] },
      { name: "Malaysia", cities: ["Kuala Lumpur"] },
      { name: "Thailand", cities: ["Bangkok"] },
    ],
  },
  {
    name: "North America",
    countries: [
      { name: "United States", cities: ["New York", "Washington, D.C.", "Los Angeles"] },
      { name: "Canada", cities: ["Toronto", "Montreal"] },
      { name: "Mexico", cities: ["Mexico City"] },
      { name: "Costa Rica", cities: ["San José"] },
      { name: "Panama", cities: ["Panama City"] },
      { name: "Dominican Republic", cities: ["Santo Domingo"] },
      { name: "Jamaica", cities: ["Kingston"] },
      { name: "Trinidad and Tobago", cities: ["Port of Spain"] },
      { name: "Guatemala", cities: ["Guatemala City"] },
      { name: "El Salvador", cities: ["San Salvador"] },
    ],
  },
  {
    name: "Latin America",
    countries: [
      { name: "Argentina", cities: ["Buenos Aires"] },
      { name: "Bolivia", cities: ["La Paz"] },
      { name: "Brazil", cities: ["Belo Horizonte", "Brasília", "Porto Alegre", "Rio de Janeiro", "São Paulo"] },
      { name: "Chile", cities: ["Santiago"] },
      { name: "Colombia", cities: ["Bogotá", "Medellín"] },
      { name: "Ecuador", cities: ["Quito"] },
      { name: "Paraguay", cities: ["Asunción"] },
      { name: "Peru", cities: ["Lima"] },
      { name: "Uruguay", cities: ["Montevideo"] },
      { name: "Venezuela", cities: ["Caracas"] },
    ],
  },
];

const SORTS = [
  { id: "az", label: "Alphabetical (A–Z)" },
  { id: "za", label: "Reverse alphabetical (Z–A)" },
  { id: "most", label: "Country with most cities first" },
  { id: "fewest", label: "Country with fewest cities first" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function RegionSection({ region, index }: { region: Region; index: number }) {
  const [sort, setSort] = useState<SortId>("az");
  const [open, setOpen] = useState<string | null>(null);

  const countries = useMemo(() => {
    const list = [...region.countries];
    if (sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "za") list.sort((a, b) => b.name.localeCompare(a.name));
    if (sort === "most") list.sort((a, b) => b.cities.length - a.cities.length);
    if (sort === "fewest") list.sort((a, b) => a.cities.length - b.cities.length);
    return list;
  }, [region.countries, sort]);

  return (
    <section className={index % 2 === 1 ? "border-t border-line bg-surface/50 py-14 lg:py-20" : "border-t border-line py-14 lg:py-20"}>
      <div className="container-wbc">
        <div data-reveal>
          <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">
            Affiliate Footprint · {region.name}
          </p>
          <h2 className="mt-4 text-[30px] leading-tight font-bold text-navy sm:text-4xl lg:text-[46px]">{region.name}</h2>
        </div>

        <div className="mt-8 rounded-card border border-line bg-background p-5 sm:flex sm:items-center sm:gap-6 sm:p-6">
          <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Sort by</p>
          <ul className="mt-4 flex flex-wrap gap-3 sm:mt-0">
            {SORTS.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setSort(s.id)}
                  aria-pressed={sort === s.id}
                  className={`rounded-none border px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                    sort === s.id
                      ? "border-orange bg-orange text-white"
                      : "border-line bg-background text-muted-fg hover:border-orange hover:text-orange"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((c) => {
            const isOpen = open === c.name;
            return (
              <li
                key={c.name}
                className={`self-start overflow-hidden rounded-card border bg-background transition-all ${
                  isOpen ? "border-orange shadow-card" : "border-line hover:border-orange/50"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : c.name)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="text-[16px] font-bold text-navy">{c.name}</span>
                  <span className={isOpen ? "text-orange" : "text-muted-fg"}>
                    <Chevron open={isOpen} />
                  </span>
                </button>
                {isOpen && (
                  <ul className="border-t border-line px-5 py-4 space-y-2.5">
                    {c.cities.map((city) => (
                      <li key={city} className="text-[15px] text-muted-fg">
                        {city}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function Affiliates() {
  return (
    <>
      {/* Split hero */}
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-orange px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white uppercase">Affiliates</p>
            <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
              WBC Affiliates
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
              WBC affiliates play a key role in connecting entrepreneurs, institutions, and the wider business community
              with the global WBC network.
            </p>
            <ul className="intro-4 mt-9 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <li key={t} className="border border-white/60 px-4 py-2.5 text-[14px] font-semibold text-white">
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/contact"
              className="intro-4 mt-8 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
            >
              Contact WBC <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] bg-navy-deep lg:min-h-0">
          <img
            src={heroImg}
            alt="WBC affiliate representatives meeting in front of a global network map"
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      {/* Intro */}
      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 sm:p-10 lg:p-12">
            <h2 className="text-[26px] leading-tight font-bold text-navy sm:text-[34px]">About WBC around the world</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">
              This page presents WBC presence across regions and cities, helping visitors quickly understand where the
              network is represented worldwide.
            </p>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg">
              <strong className="font-bold text-navy">Active</strong> locations show affiliate presence that is currently
              engaged or operating. <strong className="font-bold text-navy">Inactive</strong> locations remain in the
              network record but are not currently operating.
            </p>
          </div>
        </div>
      </section>

      {REGIONS.map((r, i) => (
        <RegionSection key={r.name} region={r} index={i} />
      ))}

      {/* CTA */}
      <section className="border-t border-line py-16 lg:py-24">
        <div data-reveal className="container-wbc text-center">
          <h2 className="text-[30px] leading-tight font-bold text-navy sm:text-4xl lg:text-[46px]">
            Establish a WBC Affiliate
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
            We present a comprehensive service package tailored for organizations, businesses and executives seeking to
            establish a WBC in their respective cities or countries.
          </p>
          <Link to="/contact" className="btn-orange mt-9">
            Start the Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
