import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import heroImg from "@/assets/affiliates-hero.jpg";
import networkBg from "@/assets/network-bg.jpg";
import {
  getAffiliate,
  regionStats,
  type AffiliateCity,
  type AffiliateCountry,
  type AffiliateProfile,
  type AffiliateStatus,
} from "@/content/affiliates";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/affiliates/$slug")({
  loader: ({ params }) => {
    const affiliate = getAffiliate(params.slug);
    if (!affiliate) throw notFound();
    return { affiliate };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.affiliate;
    const name = a?.name ?? "Affiliate";
    const description =
      a?.kind === "region"
        ? `Explore WBC affiliate presence across ${name}: countries, cities, and engagement status.`
        : a?.kind === "country"
          ? `WBC affiliate profile for ${name}: cities, status, and how to connect with the network.`
          : `WBC city affiliate presence in ${name}.`;
    return {
      meta: [
        { title: `${name} — WBC Affiliates` },
        { name: "description", content: description },
        { property: "og:title", content: `${name} — WBC Affiliates` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AffiliateProfilePage,
});

function StatusBadge({ status }: { status: AffiliateStatus }) {
  const active = status === "active";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-card border px-3 py-1.5 text-[12px] font-bold tracking-[0.12em] uppercase ${
        active ? "border-teal/55 bg-teal/10 text-teal" : "border-line bg-background text-muted-fg"
      }`}
    >
      <span className={`size-1.5 rounded-full ${active ? "bg-teal" : "bg-muted-fg/40"}`} aria-hidden="true" />
      {active ? "Active" : "Inactive"}
    </span>
  );
}

function Breadcrumb({
  items,
}: {
  items: { label: string; to?: string; params?: { slug: string } }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-[14px] text-white/80">
            <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true" className="text-white/50">/</span> : null}
            {item.to ? (
              <Link
                to={item.to}
                params={item.params}
                className="transition-colors hover:text-white"
              >
                {item.label}
                </Link>
            ) : (
              <span className="font-semibold text-white">{item.label}</span>
            )}
              </li>
        ))}
            </ol>
          </nav>
  );
}

function ConnectPanel() {
  return (
    <aside
      data-reveal
      className="rounded-card border border-line bg-surface p-7 transition-shadow duration-300 hover:shadow-card sm:p-8"
    >
      <p className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Connect</p>
      <h2 className="mt-3 text-[20px] font-bold text-foreground">Establish or reactivate presence</h2>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">
        Interested in WBC affiliate development? Contact the team or review the establishment guide.
      </p>
      <div className="mt-6 flex flex-col gap-3">
        <Link to="/contact" className="btn-orange">
          Contact WBC
        </Link>
        <Link
          to="/affiliate-guide"
          className="text-[15px] font-semibold text-foreground underline underline-offset-4"
        >
          Affiliate Establishment Guide
        </Link>
      </div>
    </aside>
  );
}

function CityCard({ city }: { city: AffiliateCity }) {
  const active = city.status === "active";
  return (
    <Link
      to="/affiliates/$slug"
      params={{ slug: city.slug }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${
        active ? "border-teal/40 bg-background hover:border-teal" : "border-line bg-background hover:border-muted-fg/35"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <StatusBadge status={city.status} />
        <span
          aria-hidden="true"
          className="text-[18px] font-bold text-muted-fg/30 transition-transform group-hover:translate-x-0.5 group-hover:text-orange"
        >
          →
        </span>
      </div>
      <h3 className="mt-5 text-[20px] font-bold text-foreground">{city.name}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">
        {active
          ? "Active city presence supporting local engagement within the WBC network."
          : "Recorded in the footprint for continuity; not currently operating as active."}
      </p>
      <span className="mt-5 text-[14px] font-bold text-foreground">View city profile</span>
    </Link>
  );
}

function CountryCard({ country }: { country: AffiliateCountry }) {
  const active = country.status === "active";
  const activeCities = country.cities.filter((c) => c.status === "active").length;
  return (
    <Link
      to="/affiliates/$slug"
      params={{ slug: country.slug }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-card border bg-background p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:p-7 ${
        active ? "border-teal/40 hover:border-teal" : "border-line hover:border-muted-fg/35"
      }`}
    >
            <span
        className={`pointer-events-none absolute -end-8 -top-8 size-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${
          active ? "bg-teal/10" : "bg-orange/10"
        }`}
        aria-hidden="true"
      />
      <div className="relative flex items-start justify-between gap-3">
        <StatusBadge status={country.status} />
        <span className="text-[13px] font-semibold tabular-nums text-muted-fg">
          {country.cities.length} {country.cities.length === 1 ? "city" : "cities"}
        </span>
      </div>
      <h3 className="relative mt-5 text-[22px] font-bold text-foreground">{country.name}</h3>
      <p className="relative mt-2 text-[14px] leading-relaxed text-muted-fg">
        {activeCities > 0
          ? `${activeCities} active city presence${activeCities === 1 ? "" : "es"} within this country footprint.`
          : "Country footprint listed for network continuity."}
      </p>
      {country.cities.length > 0 && (
        <ul className="relative mt-5 flex flex-wrap gap-2">
          {country.cities.slice(0, 4).map((city) => (
            <li
              key={city.slug}
              className={`rounded-card border px-2.5 py-1 text-[12px] font-medium ${
                city.status === "active"
                  ? "border-teal/40 text-teal"
                  : "border-line text-muted-fg"
              }`}
            >
              {city.name}
            </li>
          ))}
          {country.cities.length > 4 ? (
            <li className="rounded-card border border-line px-2.5 py-1 text-[12px] font-medium text-muted-fg">
              +{country.cities.length - 4}
            </li>
          ) : null}
        </ul>
      )}
      <span className="relative mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-foreground">
        Open country
        <span aria-hidden="true" className="rtl-mirror transition-transform group-hover:translate-x-1">
          →
        </span>
            </span>
    </Link>
  );
}

function RegionView({ affiliate }: { affiliate: Extract<AffiliateProfile, { kind: "region" }> }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const stats = regionStats({
    name: affiliate.name,
    slug: affiliate.slug,
    blurb: affiliate.blurb,
    countries: affiliate.countries,
  });

  const countries = useMemo(() => {
    const q = query.trim().toLowerCase();
    return [...affiliate.countries]
      .filter((c) => (filter === "all" ? true : c.status === filter))
      .filter((c) => {
        if (!q) return true;
        return (
          c.name.toLowerCase().includes(q) ||
          c.cities.some((city) => city.name.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [affiliate.countries, filter, query]);

  return (
    <>
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-navy px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Affiliates", to: "/affiliates" },
                { label: affiliate.name },
              ]}
            />
            <p className="intro-1 mt-8 font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
              Continent
            </p>
            <h1 className="intro-2 mt-4 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[52px]">
              {affiliate.name}
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/85">{affiliate.blurb}</p>
            <dl className="intro-4 mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { k: String(stats.countries), v: "Countries" },
                { k: String(stats.activeCountries), v: "Active countries" },
                { k: String(stats.cities), v: "Cities" },
                { k: String(stats.activeCities), v: "Active cities" },
              ].map((s) => (
                <div key={s.v} className="rounded-card border border-white/20 bg-white/5 px-3 py-3">
                  <dt className="text-[22px] font-bold text-white tabular-nums">{s.k}</dt>
                  <dd className="mt-1 text-[11px] tracking-[0.06em] text-white/65 uppercase">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="relative min-h-[260px] bg-navy-deep lg:min-h-0">
          <img
            src={networkBg}
            alt=""
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-navy/35" aria-hidden="true" />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div data-reveal>
              <p className="eyebrow">Countries in this continent</p>
              <h2 className="mt-3 text-[28px] font-bold text-foreground sm:text-[34px]">
                Browse the footprint
              </h2>
            </div>
            <div data-reveal className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <label className="relative block min-w-[220px] flex-1">
                <span className="sr-only">Search countries or cities</span>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search country or city…"
                  className="w-full rounded-card border border-line bg-background px-4 py-3 text-[15px] text-foreground outline-none transition-shadow focus:border-navy focus:shadow-card"
                />
              </label>
              <div className="flex gap-2">
                {(["all", "active", "inactive"] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`rounded-card border px-3 py-2 text-[13px] font-semibold capitalize transition-colors ${
                      filter === f
                        ? "border-navy bg-navy text-white"
                        : "border-line bg-background text-foreground hover:border-navy/40"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {countries.length === 0 ? (
            <p data-reveal className="mt-10 text-[16px] text-muted-fg">
              No countries match your filters.
            </p>
          ) : (
            <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {countries.map((country) => (
                <li key={country.slug}>
                  <CountryCard country={country} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-[1.35fr_1fr]">
          <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-10">
            <h2 className="text-[22px] font-bold text-foreground">How this continent connects</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Affiliates across {affiliate.name} help WBC stay close to local markets while coordinating with Paris
              headquarters on membership pathways, events, and institutional cooperation. Open any country to explore
              city-level presence and engagement status.
            </p>
            <Link to="/affiliates" className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-foreground">
              ← All continents
            </Link>
          </div>
          <ConnectPanel />
        </div>
      </section>
    </>
  );
}

function CountryView({ affiliate }: { affiliate: Extract<AffiliateProfile, { kind: "country" }> }) {
  const active = affiliate.status === "active";
  const activeCities = affiliate.cities.filter((c) => c.status === "active").length;

  return (
    <>
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-orange px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Affiliates", to: "/affiliates" },
                { label: affiliate.region, to: "/affiliates/$slug", params: { slug: affiliate.regionSlug } },
                { label: affiliate.name },
              ]}
            />
            <div className="intro-1 mt-8">
              <StatusBadge status={affiliate.status} />
            </div>
            <p className="intro-1 mt-5 font-display text-[12px] tracking-[0.22em] text-white/80 uppercase">
              Country affiliate
            </p>
            <h1 className="intro-2 mt-3 text-[38px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
              {affiliate.name}
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
              WBC country presence in {affiliate.name}, connecting institutions and businesses with the global network
              across {affiliate.cities.length} listed{" "}
              {affiliate.cities.length === 1 ? "city" : "cities"}.
            </p>
            <dl className="intro-4 mt-10 grid grid-cols-3 gap-3">
              {[
                { k: String(affiliate.cities.length), v: "Cities" },
                { k: String(activeCities), v: "Active cities" },
                { k: active ? "Live" : "Listed", v: "Network status" },
              ].map((s) => (
                <div key={s.v} className="rounded-card border border-white/35 bg-white/10 px-3 py-3">
                  <dt className="text-[20px] font-bold text-white">{s.k}</dt>
                  <dd className="mt-1 text-[11px] tracking-[0.06em] text-white/75 uppercase">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        <div className="relative min-h-[260px] bg-navy-deep lg:min-h-0">
          <img
            src={heroImg}
            alt={`WBC affiliate presence in ${affiliate.name}`}
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-[1.45fr_1fr]">
          <div>
            <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-10">
              <h2 className="text-[24px] font-bold text-foreground">About {affiliate.name}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Affiliates help WBC maintain local presence while coordinating with Paris headquarters on membership
              pathways, events, and institutional cooperation.{" "}
                {active
                  ? `${affiliate.name} is currently marked as an active country presence within the network footprint.`
                  : `${affiliate.name} is currently marked as inactive and remains listed for network continuity.`}
              </p>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
                Explore city profiles below for a closer look at where WBC engagement is active or recorded within{" "}
                {affiliate.name}.
              </p>
              <Link
                to="/affiliates/$slug"
                params={{ slug: affiliate.regionSlug }}
                className="mt-8 inline-flex items-center gap-2 text-[15px] font-bold text-foreground"
              >
                ← Back to {affiliate.region}
              </Link>
            </div>

            <div className="mt-10">
              <div data-reveal className="flex items-end justify-between gap-4">
                <div>
                  <p className="eyebrow">Cities</p>
                  <h2 className="mt-2 text-[26px] font-bold text-foreground">City presence</h2>
                </div>
                <p className="text-[14px] text-muted-fg tabular-nums">
                  {affiliate.cities.length} listed
                </p>
              </div>
              {affiliate.cities.length === 0 ? (
                <p className="mt-6 text-[15px] text-muted-fg">No cities listed for this country yet.</p>
              ) : (
                <ul data-reveal data-reveal-group className="mt-6 grid gap-4 sm:grid-cols-2">
                  {affiliate.cities.map((city) => (
                    <li key={city.slug}>
                      <CityCard city={city} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <ConnectPanel />
            <div
              data-reveal
              className="rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card"
            >
              <p className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Continent</p>
              <h3 className="mt-3 text-[18px] font-bold text-foreground">{affiliate.region}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">
                View all countries and cities across this continent.
              </p>
              <Link
                to="/affiliates/$slug"
                params={{ slug: affiliate.regionSlug }}
                className="mt-5 inline-flex text-[14px] font-bold text-foreground underline underline-offset-4"
              >
                Open continent page
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function CityView({ affiliate }: { affiliate: Extract<AffiliateProfile, { kind: "city" }> }) {
  const active = affiliate.status === "active";

  return (
    <>
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-navy px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <Breadcrumb
              items={[
                { label: "Home", to: "/" },
                { label: "Affiliates", to: "/affiliates" },
                { label: affiliate.region, to: "/affiliates/$slug", params: { slug: affiliate.regionSlug } },
                {
                  label: affiliate.countryName,
                  to: "/affiliates/$slug",
                  params: { slug: affiliate.countrySlug },
                },
                { label: affiliate.name },
              ]}
            />
            <div className="intro-1 mt-8">
              <StatusBadge status={affiliate.status} />
            </div>
            <p className="intro-1 mt-5 font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
              City affiliate
            </p>
            <h1 className="intro-2 mt-3 text-[38px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[52px]">
              {affiliate.name}
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/85">
              Local WBC presence in {affiliate.name}, {affiliate.countryName} — supporting engagement within{" "}
              {affiliate.region}.
            </p>
          </div>
        </div>
        <div className="relative min-h-[260px] bg-navy-deep lg:min-h-0">
          <img
            src={heroImg}
            alt={`WBC affiliate presence in ${affiliate.name}`}
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/50 to-transparent" aria-hidden="true" />
              </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-[1.45fr_1fr]">
          <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-10">
            <h2 className="text-[24px] font-bold text-foreground">About this city presence</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              City affiliates keep WBC close to local business communities while remaining coordinated with country
              presence and Paris headquarters.{" "}
              {active
                ? `${affiliate.name} is currently an active city location in the network footprint.`
                : `${affiliate.name} is currently inactive and remains listed for continuity.`}
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-card border border-line bg-surface p-5">
                <p className="text-[12px] font-bold tracking-[0.14em] text-muted-fg uppercase">Country</p>
                <Link
                  to="/affiliates/$slug"
                  params={{ slug: affiliate.countrySlug }}
                  className="mt-2 block text-[18px] font-bold text-foreground underline-offset-4 hover:underline"
                >
                  {affiliate.countryName}
                </Link>
          </div>
              <div className="rounded-card border border-line bg-surface p-5">
                <p className="text-[12px] font-bold tracking-[0.14em] text-muted-fg uppercase">Continent</p>
                <Link
                  to="/affiliates/$slug"
                  params={{ slug: affiliate.regionSlug }}
                  className="mt-2 block text-[18px] font-bold text-foreground underline-offset-4 hover:underline"
                >
                  {affiliate.region}
              </Link>
              </div>
            </div>
          </div>
          <ConnectPanel />
        </div>
      </section>
    </>
  );
}

function AffiliateProfilePage() {
  const { affiliate } = Route.useLoaderData();

  return (
    <>
      {affiliate.kind === "region" ? (
        <RegionView affiliate={affiliate} />
      ) : affiliate.kind === "country" ? (
        <CountryView affiliate={affiliate} />
      ) : (
        <CityView affiliate={affiliate} />
      )}

      <CTASection
        title="Join the WBC Network"
        description="Become a member and connect with affiliates, institutions, and partners worldwide."
        ctaLabel="Become a Member"
        to="/membership"
        hash="application"
      />
    </>
  );
}
