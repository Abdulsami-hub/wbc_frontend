import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import heroImg from "@/assets/affiliates-hero.png";
import { CmsLink } from "@/components/CmsLink";
import { Skeleton } from "@/components/ui/skeleton";
import type {
  AffiliateCity,
  AffiliateCountry,
  AffiliateRegion,
  AffiliateStatus,
} from "@/content/affiliates";
import { affiliatesQueryOptions } from "@/lib/queries/affiliates";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/affiliates/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(affiliatesQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero?.image;
    const title = loaderData?.hero?.title ?? "Affiliates";
    const description =
      loaderData?.hero?.description ??
      "Explore World Business Council affiliates connecting businesses across regions and cities.";
    return seoHead({
      title,
      description,
      path: "/affiliates",
      image: heroImage,
      preloadImage: heroImage,
    });
  },
  component: Affiliates,
});

const SORTS = [
  { id: "az", label: "Alphabetical (A–Z)" },
  { id: "za", label: "Reverse alphabetical (Z–A)" },
  { id: "most", label: "Country with most cities first" },
  { id: "fewest", label: "Country with fewest cities first" },
] as const;

type SortId = (typeof SORTS)[number]["id"];

function statusClasses(status: AffiliateStatus, open?: boolean) {
  if (status === "active") {
    return open
      ? "border-teal bg-background shadow-card"
      : "border-teal/55 hover:border-teal text-foreground";
  }
  return open
    ? "border-line bg-background shadow-card"
    : "border-line text-muted-fg hover:border-muted-fg/40";
}

function CountryDropdown({
  country,
  isOpen,
  onToggle,
}: {
  country: AffiliateCountry;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const cities = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return country.cities;
    return country.cities.filter((city) => city.name.toLowerCase().includes(q));
  }, [country.cities, query]);

  return (
    <li
      className={`relative self-start rounded-card border bg-background transition-all ${isOpen ? "z-30 rounded-b-none" : "z-0"} ${statusClasses(country.status, isOpen)}`}
    >
      <div className="flex w-full items-center justify-between gap-2 px-4 py-3.5">
        <Link
          to="/affiliates/$slug"
          params={{ slug: country.slug }}
          className={`min-w-0 flex-1 text-[16px] font-bold transition-colors hover:underline ${
            country.status === "active" ? "text-teal" : "text-muted-fg"
          }`}
        >
          {country.name}
        </Link>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={`${isOpen ? "Collapse" : "Expand"} cities in ${country.name}`}
          className="inline-flex size-9 shrink-0 items-center justify-center text-current"
        >
          <Chevron open={isOpen} />
        </button>
      </div>
      {isOpen && (
        <div
          className={`absolute start-0 top-full z-30 w-full overflow-hidden rounded-b-card border border-t-0 bg-background shadow-card ${
            country.status === "active" ? "border-teal" : "border-line"
          }`}
        >
          <div className="border-b border-line px-4 py-3">
            <label htmlFor={`city-search-${country.slug}`} className="sr-only">
              Search cities in {country.name}
            </label>
            <input
              ref={inputRef}
              id={`city-search-${country.slug}`}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cities…"
              className="w-full rounded-md border border-line bg-background px-3 py-2 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-fg focus:border-teal"
            />
          </div>
          <ul className="max-h-52 space-y-2.5 overflow-y-auto px-5 py-4">
            {cities.length > 0 ? (
              cities.map((city: AffiliateCity) => (
                <li key={city.slug}>
                  <Link
                    to="/affiliates/$slug"
                    params={{ slug: city.slug }}
                    className={`block text-[15px] transition-colors hover:underline ${
                      city.status === "active" ? "font-medium text-teal" : "text-muted-fg"
                    }`}
                  >
                    {city.name}
                  </Link>
                </li>
              ))
            ) : (
              <li className="text-[14px] text-muted-fg">No cities match your search.</li>
            )}
          </ul>
        </div>
      )}
    </li>
  );
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
    <section
      className={
        index % 2 === 1
          ? "border-t border-line bg-surface/50 py-14 lg:py-20"
          : "border-t border-line py-14 lg:py-20"
      }
    >
      <div className="container-wbc">
        <div data-reveal>
          <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">
            Affiliate Footprint · {region.name}
          </p>
          <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[46px]">
            <Link to="/affiliates/$slug" params={{ slug: region.slug }} className="hover:text-navy">
              {region.name}
            </Link>
          </h2>
          {region.blurb ? (
            <p className="mt-4 max-w-3xl text-[16px] leading-relaxed text-muted-fg">
              {region.blurb}
            </p>
          ) : null}
        </div>

        {countries.length > 0 ? (
          <>
            <div className="mt-8 rounded-card border border-line bg-background p-5 sm:flex sm:items-center sm:gap-6 sm:p-6">
              <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
                Sort by
              </p>
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
              {countries.map((c: AffiliateCountry) => (
                <CountryDropdown
                  key={c.slug}
                  country={c}
                  isOpen={open === c.slug}
                  onToggle={() => setOpen(open === c.slug ? null : c.slug)}
                />
              ))}
            </ul>
          </>
        ) : (
          <div
            data-reveal
            className="mt-8 rounded-card border border-dashed border-line bg-background px-6 py-10 text-center sm:px-10"
          >
            <p className="text-[16px] font-semibold text-foreground">No countries assigned yet.</p>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">
              Affiliate countries for this region will appear here once they are added in the admin
              panel.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function Affiliates() {
  const { data, isPending } = useQuery(affiliatesQueryOptions);

  if (isPending) {
    return (
      <section className="py-16">
        <div className="container-wbc space-y-6">
          <Skeleton className="h-48 w-full rounded-card" />
          <Skeleton className="h-64 w-full rounded-card" />
        </div>
      </section>
    );
  }

  if (!data) return null;

  const { hero, regions, faqs } = data;
  const image = hero.image ?? heroImg;

  return (
    <>
      <section className="relative">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block"
          aria-hidden="true"
        />
        <div className="lg:grid lg:grid-cols-2">
          <div className="relative z-[1] flex items-center bg-teal lg:absolute lg:inset-y-0 lg:start-0 lg:w-1/2 lg:bg-transparent">
            <div className="w-full px-5 py-12 sm:px-6 lg:py-8 lg:ps-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pe-10">
              <div className="max-w-xl">
                <p className="intro-1 hero-kicker">{hero.kicker}</p>
                <h1 className="intro-2 mt-5 text-[34px] leading-[1.05] font-bold text-white sm:text-4xl lg:text-[48px]">
                  {hero.title}
                </h1>
                <p className="intro-3 mt-5 max-w-lg text-[16px] leading-relaxed text-white/90">
                  {hero.description}
                </p>
                {hero.tags.length > 0 && (
                  <ul className="intro-4 mt-7 flex flex-wrap gap-3">
                    {hero.tags.map((t) => (
                      <li
                        key={t}
                        className="border border-white/60 px-4 py-2.5 text-[14px] font-semibold text-white"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
                {hero.cta && (
                  <CmsLink
                    href={hero.cta.url}
                    fallback="/contact"
                    className="intro-4 mt-6 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
                  >
                    {hero.cta.label}{" "}
                    <span aria-hidden="true" className="rtl-mirror">
                      →
                    </span>
                  </CmsLink>
                )}
              </div>
            </div>
          </div>
          <div className="bg-white lg:col-start-2">
            <img
              src={image}
              alt={hero.imageAlt}
              width={1024}
              height={662}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div
            data-reveal
            className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-10 lg:p-12"
          >
            <h2 className="text-[26px] leading-tight font-bold text-foreground sm:text-[34px]">
              About WBC around the world
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">
              This page presents WBC presence across regions and cities, helping visitors quickly
              understand where the network is represented worldwide.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2.5 rounded-card border border-teal/55 bg-teal/5 px-4 py-2.5 text-[14px] font-semibold text-teal">
                <span className="size-2.5 rounded-full bg-teal" aria-hidden="true" />
                Active — engaged or operating
              </div>
              <div className="inline-flex items-center gap-2.5 rounded-card border border-line bg-surface px-4 py-2.5 text-[14px] font-semibold text-muted-fg">
                <span className="size-2.5 rounded-full bg-muted-fg/50" aria-hidden="true" />
                Inactive — in record, not currently operating
              </div>
            </div>
          </div>
        </div>
      </section>

      {regions.map((r, i) => (
        <RegionSection key={r.slug} region={r} index={i} />
      ))}

      <section className="border-t border-line bg-surface/40 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">
              FAQ
            </p>
            <h2 className="mt-4 text-[28px] font-bold text-foreground sm:text-[36px]">
              Affiliate questions
            </h2>
          </div>
          <ul data-reveal data-reveal-group className="mt-8 space-y-4">
            {faqs.map((f) => (
              <li
                key={f.id}
                className="rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card sm:p-7"
              >
                <h3 className="text-[17px] font-bold text-foreground">{f.question}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{f.answer}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8">
            <Link to="/affiliate-guide" className="btn-orange">
              Read the Affiliate Establishment Guide{" "}
              <span aria-hidden="true" className="rtl-mirror">
                →
              </span>
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
            We present a comprehensive service package tailored for organizations, businesses and
            executives seeking to establish a WBC in their respective cities or countries.
          </p>
          <Link to="/contact" className="btn-orange mt-9">
            Fill the Application Form
          </Link>
        </div>
      </section>
    </>
  );
}
