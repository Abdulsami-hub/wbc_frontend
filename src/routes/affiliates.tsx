import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/affiliates-hero.jpg";
import {
  AFFILIATE_REGIONS,
  type AffiliateCountry,
  type AffiliateRegion,
  type AffiliateStatus,
} from "@/content/affiliates";

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

const SORTS = [
  { id: "az", label: "Alphabetical (A–Z)" },
  { id: "za", label: "Reverse alphabetical (Z–A)" },
  { id: "most", label: "Country with most cities first" },
  { id: "fewest", label: "Country with fewest cities first" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

const FAQS = [
  {
    q: "What is a WBC affiliate?",
    a: "A WBC affiliate is a country or city presence that connects local businesses and institutions with the global WBC network under shared standards and coordination from headquarters.",
  },
  {
    q: "How do Active and Inactive statuses differ?",
    a: "Active locations are currently engaged or operating. Inactive locations remain in the network record but are not currently operating.",
  },
  {
    q: "How can we establish an affiliate?",
    a: "Organizations and executives can apply through the membership pathway. WBC provides a tailored package for establishing presence in a city or country.",
  },
] as const;

function statusClasses(status: AffiliateStatus, open?: boolean) {
  if (status === "active") {
    return open
      ? "border-teal bg-teal/5 shadow-card"
      : "border-teal/55 hover:border-teal text-foreground";
  }
  return open
    ? "border-line bg-surface/80 shadow-card"
    : "border-line text-muted-fg hover:border-muted-fg/40";
}

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

function RegionSection({ region, index }: { region: AffiliateRegion; index: number }) {
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
          <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[46px]">{region.name}</h2>
        </div>

        <div className="mt-8 rounded-card border border-line bg-background p-5 sm:flex sm:items-center sm:gap-6 sm:p-6 transition-shadow duration-300 hover:shadow-card">
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
                      : "border-line bg-background text-muted-fg hover:border-orange hover:text-foreground"
                  }`}
                >
                  {s.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {countries.map((c: AffiliateCountry) => {
            const isOpen = open === c.slug;
            return (
              <li
                key={c.slug}
                className={`self-start overflow-hidden rounded-card border bg-background transition-all ${statusClasses(c.status, isOpen)}`}
              >
                <div className="flex w-full items-center justify-between gap-2 px-4 py-3.5">
                  <Link
                    to="/affiliates/$slug"
                    params={{ slug: c.slug }}
                    className={`min-w-0 flex-1 text-[16px] font-bold transition-colors hover:underline ${
                      c.status === "active" ? "text-teal" : "text-muted-fg"
                    }`}
                  >
                    {c.name}
                  </Link>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : c.slug)}
                    aria-expanded={isOpen}
                    aria-label={`${isOpen ? "Collapse" : "Expand"} cities in ${c.name}`}
                    className="inline-flex size-9 shrink-0 items-center justify-center text-current"
                  >
                    <Chevron open={isOpen} />
                  </button>
                </div>
                {isOpen && (
                  <ul className="border-t border-line px-5 py-4 space-y-2.5">
                    {c.cities.map((city) => (
                      <li key={city.slug}>
                        <Link
                          to="/affiliates/$slug"
                          params={{ slug: city.slug }}
                          className={`text-[15px] transition-colors hover:underline ${
                            city.status === "active" ? "font-medium text-teal" : "text-muted-fg"
                          }`}
                        >
                          {city.name}
                        </Link>
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
              to="/become-a-member"
              className="intro-4 mt-8 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
            >
              Fill the Application Form <span aria-hidden="true" className="rtl-mirror">→</span>
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

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 sm:p-10 lg:p-12 transition-shadow duration-300 hover:shadow-card">
            <h2 className="text-[26px] leading-tight font-bold text-foreground sm:text-[34px]">About WBC around the world</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">
              This page presents WBC presence across regions and cities, helping visitors quickly understand where the
              network is represented worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2.5 rounded-card border border-teal/55 bg-teal/5 px-4 py-2.5 text-[14px] font-semibold text-teal">
                <span className="size-2.5 rounded-full bg-teal" aria-hidden="true" />
                Active — engaged or operating
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-card border border-line bg-surface px-4 py-2.5 text-[14px] font-semibold text-muted-fg transition-shadow duration-300 hover:shadow-card">
                <span className="size-2.5 rounded-full bg-muted-fg/50" aria-hidden="true" />
                Inactive — in record, not currently operating
              </div>
            </div>
          </div>
        </div>
      </section>

      {AFFILIATE_REGIONS.map((r, i) => (
        <RegionSection key={r.name} region={r} index={i} />
      ))}

      <section className="border-t border-line bg-surface/40 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">FAQ</p>
            <h2 className="mt-4 text-[28px] font-bold text-foreground sm:text-[36px]">Affiliate questions</h2>
          </div>
          <ul data-reveal data-reveal-group className="mt-8 space-y-4">
            {FAQS.map((f) => (
              <li key={f.q} className="rounded-card border border-line bg-background p-6 sm:p-7 transition-shadow duration-300 hover:shadow-card">
                <h3 className="text-[17px] font-bold text-foreground">{f.q}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{f.a}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8">
            <Link to="/affiliate-guide" className="btn-orange">
              Read the Affiliate Establishment Guide <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 lg:py-24">
        <div data-reveal className="container-wbc text-center">
          <h2 className="text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[46px]">
            Establish a WBC Affiliate
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
            We present a comprehensive service package tailored for organizations, businesses and executives seeking to
            establish a WBC in their respective cities or countries.
          </p>
          <Link to="/become-a-member" className="btn-orange mt-9">
            Fill the Application Form
          </Link>
        </div>
      </section>
    </>
  );
}
