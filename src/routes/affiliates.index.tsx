import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/affiliates-hero.jpg";
import { AFFILIATE_REGIONS, regionStats } from "@/content/affiliates";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/affiliates/")({
  head: () => ({
    meta: [
      { title: "WBC Affiliates — Global Affiliate Footprint" },
      {
        name: "description",
        content:
          "Explore WBC affiliate presence across Africa & the Middle East, Europe, Asia & the Pacific, North America, and Latin America.",
      },
      { property: "og:title", content: "WBC Affiliates — Around the World" },
      {
        property: "og:description",
        content: "Affiliate presence by continent, country, and city across the global WBC network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliatesHub,
});

const TAGS = ["Five Continents", "Country Presence", "City Networks"] as const;

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
    a: "Organizations and executives can contact WBC to discuss establishing presence in a city or country. A tailored support package is available.",
  },
] as const;

function AffiliatesHub() {
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
              Explore the WBC footprint continent by continent — then open any country or city for a clear view of
              local presence and engagement status.
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
              Establish an Affiliate <span aria-hidden="true" className="rtl-mirror">→</span>
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
          <div data-reveal className="max-w-3xl">
            <p className="eyebrow">Explore by continent</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]">
              Choose a region to begin.
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              Each continent page lists every country presence, with city-level detail one click away.
            </p>
            <span className="accent-rule mt-6" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {AFFILIATE_REGIONS.map((region, i) => {
              const stats = regionStats(region);
              const featured = i === 0;
              return (
                <li key={region.slug} className={featured ? "lg:col-span-2 xl:col-span-1" : undefined}>
                  <Link
                    to="/affiliates/$slug"
                    params={{ slug: region.slug }}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-card p-7 transition-all duration-300 sm:p-8 ${
                      featured
                        ? "bg-navy text-white shadow-card hover:-translate-y-1 hover:shadow-lg"
                        : "border border-line bg-background hover:-translate-y-1 hover:border-orange/35 hover:shadow-card"
                    }`}
                  >
                    <span
                      className={`pointer-events-none absolute -end-10 -top-10 size-40 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                        featured ? "bg-orange/25" : "bg-orange/10"
                      }`}
                      aria-hidden="true"
                    />
                    <p
                      className={`relative text-[12px] font-bold tracking-[0.18em] uppercase ${
                        featured ? "text-white/65" : "text-muted-fg"
                      }`}
                    >
                      Continent {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className={`relative mt-4 text-[24px] font-bold leading-tight sm:text-[26px] ${featured ? "text-white" : "text-foreground"}`}>
                      {region.name}
                    </h3>
                    <p className={`relative mt-3 flex-1 text-[15px] leading-relaxed ${featured ? "text-white/80" : "text-muted-fg"}`}>
                      {region.blurb}
                    </p>
                    <dl className="relative mt-8 grid grid-cols-3 gap-3 border-t border-white/15 pt-6">
                      {[
                        { k: String(stats.countries), v: "Countries" },
                        { k: String(stats.activeCountries), v: "Active" },
                        { k: String(stats.cities), v: "Cities" },
                      ].map((s) => (
                        <div key={s.v}>
                          <dt className={`text-[22px] font-bold tabular-nums ${featured ? "text-white" : "text-foreground"}`}>
                            {s.k}
                          </dt>
                          <dd className={`mt-1 text-[11px] tracking-[0.08em] uppercase ${featured ? "text-white/60" : "text-muted-fg"}`}>
                            {s.v}
                          </dd>
                        </div>
                      ))}
                    </dl>
                    <span
                      className={`relative mt-7 inline-flex items-center gap-2 text-[15px] font-bold ${
                        featured ? "text-white" : "text-foreground"
                      }`}
                    >
                      Explore continent
                      <span aria-hidden="true" className="rtl-mirror transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div data-reveal className="mt-10 flex flex-wrap items-center gap-6 rounded-card border border-line bg-surface px-6 py-5">
            <p className="text-[14px] font-semibold tracking-[0.08em] text-muted-fg uppercase">Status legend</p>
            <span className="inline-flex items-center gap-2 text-[14px] text-foreground">
              <span className="size-2.5 rounded-full bg-teal" aria-hidden="true" /> Active presence
            </span>
            <span className="inline-flex items-center gap-2 text-[14px] text-muted-fg">
              <span className="size-2.5 rounded-full bg-line" aria-hidden="true" /> Inactive / recorded
            </span>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/40 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">FAQ</p>
            <h2 className="mt-4 text-[28px] font-bold text-foreground sm:text-[36px]">Affiliate questions</h2>
          </div>
          <ul data-reveal data-reveal-group className="mt-8 space-y-4">
            {FAQS.map((f) => (
              <li
                key={f.q}
                className="rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card sm:p-7"
              >
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

      <CTASection
        title="Establish a WBC Affiliate"
        description="Contact WBC about establishing presence in your city or country."
        ctaLabel="Contact Us"
        to="/contact"
      />
    </>
  );
}
