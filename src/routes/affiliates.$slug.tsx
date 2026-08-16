import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAffiliate } from "@/content/affiliates";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/affiliates/$slug")({
  loader: ({ params }) => {
    const affiliate = getAffiliate(params.slug);
    if (!affiliate) throw notFound();
    return { affiliate };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.affiliate.name ?? "Affiliate";
    return {
      meta: [
        { title: `${name} — WBC Affiliates` },
        {
          name: "description",
          content: `WBC affiliate profile for ${name}: status, region, and how to connect with the World Business Council network.`,
        },
        { property: "og:title", content: `${name} — WBC Affiliates` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: AffiliateProfilePage,
});

function AffiliateProfilePage() {
  const { affiliate } = Route.useLoaderData();
  const isActive = affiliate.kind !== "region" && affiliate.status === "active";

  return (
    <>
      <section className="border-b border-line bg-surface py-14 lg:py-20">
        <div className="container-wbc">
          <nav aria-label="Breadcrumb" className="text-[14px] text-muted-fg">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link to="/" className="hover:text-foreground">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link to="/affiliates" className="hover:text-foreground">
                  Affiliates
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="font-semibold text-foreground">{affiliate.name}</li>
            </ol>
          </nav>

          {affiliate.kind !== "region" ? (
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span
                className={`rounded-card border px-3 py-1.5 text-[13px] font-semibold tracking-[0.12em] uppercase ${
                  isActive ? "border-teal/55 bg-teal/10 text-teal" : "border-line bg-background text-muted-fg"
                }`}
              >
                {isActive ? "Active" : "Inactive"}
              </span>
              <span className="text-[14px] text-muted-fg">{affiliate.region}</span>
            </div>
          ) : null}

          <h1 className="mt-5 text-[34px] font-bold leading-tight text-foreground sm:text-5xl">
            {affiliate.kind === "city" ? `${affiliate.name}, ${affiliate.countryName}` : affiliate.name}
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
            {affiliate.kind === "region"
              ? `Explore WBC affiliate presence across ${affiliate.name}: countries, cities, and engagement status.`
              : affiliate.kind === "country"
                ? `WBC country affiliate presence in ${affiliate.name}, connecting local institutions and businesses with the global network.`
                : `WBC city affiliate presence in ${affiliate.name}, supporting local engagement within ${affiliate.countryName}.`}
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal className="rounded-card border border-line bg-background p-7 shadow-card sm:p-10">
            <h2 className="text-[22px] font-bold text-foreground">About this affiliate</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Affiliates help WBC maintain local presence while coordinating with Paris headquarters on membership
              pathways, events, and institutional cooperation.{" "}
              {affiliate.kind === "region"
                ? `Browse countries and cities across ${affiliate.name} using the links below, or return to the main affiliates page to explore all regions.`
                : isActive
                  ? "This location is currently marked as active within the network footprint."
                  : "This location is currently marked as inactive and remains listed for network continuity."}
            </p>

            {affiliate.kind === "region" && affiliate.countries.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[15px] font-semibold tracking-[0.14em] text-blue uppercase">Countries</h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {affiliate.countries.map((country) => (
                    <li key={country.slug}>
                      <Link
                        to="/affiliates/$slug"
                        params={{ slug: country.slug }}
                        className={`inline-flex rounded-card border px-4 py-2 text-[15px] font-semibold transition-colors ${
                          country.status === "active"
                            ? "border-teal/55 text-teal hover:bg-teal/5"
                            : "border-line text-muted-fg hover:border-muted-fg/40"
                        }`}
                      >
                        {country.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link to="/affiliates" className="link-arrow mt-8">
                  ← Back to all regions
                </Link>
              </div>
            )}

            {affiliate.kind === "country" && affiliate.cities.length > 0 && (
              <div className="mt-8">
                <h3 className="text-[15px] font-semibold tracking-[0.14em] text-blue uppercase">Cities</h3>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {affiliate.cities.map((city) => (
                    <li key={city.slug}>
                      <Link
                        to="/affiliates/$slug"
                        params={{ slug: city.slug }}
                        className={`inline-flex rounded-card border px-4 py-2 text-[15px] font-semibold transition-colors ${
                          city.status === "active"
                            ? "border-teal/55 text-teal hover:bg-teal/5"
                            : "border-line text-muted-fg hover:border-muted-fg/40"
                        }`}
                      >
                        {city.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {affiliate.kind === "city" && (
              <p className="mt-6 text-[15px] text-muted-fg">
                Country profile:{" "}
                <Link
                  to="/affiliates/$slug"
                  params={{ slug: affiliate.countrySlug }}
                  className="font-semibold text-foreground underline underline-offset-4"
                >
                  {affiliate.countryName}
                </Link>
              </p>
            )}

            {affiliate.kind !== "region" ? (
              <Link to="/affiliates" className="link-arrow mt-8">
                ← Back to affiliates
              </Link>
            ) : null}
          </div>

          <aside data-reveal className="rounded-card border border-line bg-surface p-7 sm:p-8">
            <h2 className="text-[18px] font-bold text-foreground">Connect with WBC</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">
              Interested in establishing or reactivating affiliate presence? Contact the team or review the establishment
              guide.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <Link to="/contact" className="btn-orange">
                Fill the Application Form
              </Link>
              <Link to="/affiliate-guide" className="link-arrow text-[15px]">
                Affiliate establishment guide
                <span aria-hidden="true" className="link-arrow-icon rtl-mirror">
                  →
                </span>
              </Link>
            </div>
          </aside>
        </div>
      </section>

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
