import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAffiliate, type AffiliateProfile } from "@/content/affiliates";
import { CTASection } from "@/components/CTASection";
import { AffiliateLocationProfile } from "@/components/affiliates/AffiliateLocationProfile";

export const Route = createFileRoute("/affiliates/$slug")({
  loader: ({ params }) => {
    const affiliate = getAffiliate(params.slug);
    if (!affiliate) throw notFound();
    return { affiliate };
  },
  head: ({ loaderData }) => {
    const a = loaderData?.affiliate;
    const titleName = a?.kind === "city" ? `${a.name}, ${a.countryName}` : (a?.name ?? "Affiliate");
    return {
      meta: [
        { title: `${titleName} — WBC Affiliates` },
        {
          name: "description",
          content: `WBC affiliate profile for ${titleName}: location briefing, services, officers, media, and contact details.`,
        },
        { property: "og:title", content: `${titleName} — WBC Affiliates` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AffiliateProfilePage,
});

function AffiliateProfilePage() {
  const { affiliate } = Route.useLoaderData();

  return (
    <>
      {affiliate.kind === "region" ? <RegionProfile affiliate={affiliate} /> : <AffiliateLocationProfile affiliate={affiliate} />}

      <section className="border-t border-line bg-surface py-12 lg:py-16">
        <div className="container-wbc flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-[15px] leading-relaxed text-muted-fg">
            Interested in establishing or updating this affiliate profile? Contact headquarters or review the
            establishment guide.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="btn-orange-to-outline !min-h-9 !rounded-md !px-4 !text-[12px]">
              Fill the Application Form
            </Link>
            <Link to="/affiliate-guide" className="btn-base border border-line bg-background text-foreground hover:border-navy">
              Establishment Guide
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Join the WBC Network"
        description="Become a member and connect with affiliates, institutions, and partners worldwide."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}

function RegionProfile({
  affiliate,
}: {
  affiliate: Extract<AffiliateProfile, { kind: "region" }>;
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden min-h-[70vh] bg-navy">
        <div
          className="pointer-events-none absolute -end-24 top-0 size-[360px] rounded-full bg-blue/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -start-20 bottom-0 size-[320px] rounded-full bg-orange/15 blur-3xl"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/60 to-navy/30" aria-hidden="true" />
        <div className="container-wbc relative flex min-h-[70vh] flex-col justify-end py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="intro-1 text-[13px] text-white/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/affiliates" className="hover:text-white">
                  Affiliates
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-white">{affiliate.name}</li>
            </ol>
          </nav>
          <p className="intro-2 mt-8 text-[12px] font-semibold tracking-[0.22em] text-white/70 uppercase">Region</p>
          <h1 className="intro-2 mt-3 text-[42px] font-extrabold leading-[0.95] text-white sm:text-[58px] lg:text-[68px]">
            {affiliate.name}
          </h1>
          <p className="intro-3 mt-5 max-w-2xl text-[17px] leading-relaxed text-white/85">{affiliate.blurb}</p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Countries</p>
            <h2 className="mt-3 text-[28px] font-bold text-foreground sm:text-[36px]">Affiliate presence</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Open a country or city profile for location briefing, services, officers, media, and contact details.
            </p>
          </div>
          <ul data-reveal data-reveal-group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {affiliate.countries.map((country) => (
              <li key={country.slug}>
                <Link
                  to="/affiliates/$slug"
                  params={{ slug: country.slug }}
                  className="group flex h-full items-center justify-between rounded-card border border-line bg-background px-5 py-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-lg"
                >
                  <span>
                    <span className="block text-[17px] font-bold text-foreground">{country.name}</span>
                    <span className="mt-1 block text-[12px] font-semibold tracking-[0.12em] text-muted-fg uppercase">
                      {country.status === "active" ? "Active" : "Inactive"} · {country.cities.length} cities
                    </span>
                  </span>
                  <span className="text-orange transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/affiliates" className="link-arrow mt-10">
            ← Back to all regions
          </Link>
        </div>
      </section>
    </>
  );
}
