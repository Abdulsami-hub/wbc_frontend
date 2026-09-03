import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BellRing, BriefcaseBusiness, Mail } from "lucide-react";
import teamHero from "@/assets/team-hero.jpg";
import { CTASection } from "@/components/CTASection";
import { SplitHero } from "@/components/SplitHero";
import { JobListingCard } from "@/components/jobs/JobListingCard";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { jobsQueryOptions } from "@/lib/queries/jobs";

export const Route = createFileRoute("/jobs/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(jobsQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    const title = loaderData?.hero.title ?? "Jobs & Internships — World Business Council";
    const description =
      loaderData?.hero.description ??
      "Internship opportunities at the World Business Council: join our remote, part-time teams across international business roles.";

    return {
      meta: [
        { title: `${title} — WBC` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: JobsPage,
});

function JobsSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-navy lg:block" aria-hidden="true" />
        <div className="bg-navy lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-40 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="bg-surface/30 py-14 lg:py-20">
        <div className="container-wbc space-y-4">
          <Skeleton className="h-10 w-72" />
          <Skeleton className="h-20 max-w-3xl" />
          <Skeleton className="mt-8 h-28 w-full" />
          <Skeleton className="h-28 w-full" />
          <Skeleton className="h-28 w-full" />
        </div>
      </section>
    </>
  );
}

function resolveCta(url: string, fallback = "/contact") {
  const resolved = resolveCmsUrl(url, fallback);
  if (resolved.kind === "internal") {
    const [path, hash] = resolved.path.split("#");
    return {
      ctaTo: path || fallback,
      ctaHash: hash || undefined,
      ctaHref: undefined as string | undefined,
    };
  }
  return { ctaTo: undefined, ctaHash: undefined, ctaHref: resolved.href };
}

function JobsPage() {
  const { data, isPending } = useQuery(jobsQueryOptions);

  if (isPending) return <JobsSkeleton />;
  if (!data) return null;

  const { hero, listingsHeader, listings } = data;
  const heroCta = hero.cta ? resolveCta(hero.cta.url) : null;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        image={hero.image || teamHero}
        imageAlt={hero.imageAlt}
        tone="navy"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
        ctaHash={heroCta?.ctaHash}
      />

      <section id="open-roles" className="bg-surface/30 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="max-w-3xl">
            {listingsHeader.kicker && (
              <p className="text-[12px] font-bold tracking-[0.16em] text-orange uppercase">
                {listingsHeader.kicker}
              </p>
            )}
            <h2 className="text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">
              {listingsHeader.title}
            </h2>
            {listingsHeader.description && (
              <p className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                {listingsHeader.description}
              </p>
            )}
          </div>

          {listings.length === 0 ? (
            <div
              data-reveal
              className="relative mt-10 overflow-hidden rounded-card border border-line bg-gradient-to-br from-background via-surface/80 to-navy/[0.04] p-8 shadow-sm sm:p-10 lg:p-12"
            >
              <div
                className="pointer-events-none absolute -end-16 -top-16 size-48 rounded-full bg-orange/10 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-20 -start-10 size-56 rounded-full bg-navy/10 blur-3xl"
                aria-hidden="true"
              />

              <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
                <span className="inline-flex size-16 items-center justify-center rounded-2xl bg-navy text-white shadow-lg shadow-navy/20">
                  <BriefcaseBusiness className="size-8" strokeWidth={1.75} aria-hidden="true" />
                </span>

                <p className="mt-6 text-[12px] font-bold tracking-[0.18em] text-orange uppercase">
                  Careers at WBC
                </p>
                <h3 className="mt-3 text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">
                  No open positions right now
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                  We don&apos;t have any active job or internship listings at the moment. New
                  opportunities are posted here as soon as teams are ready to welcome applicants —
                  usually across business development, communications, events, design, legal,
                  finance, and technology.
                </p>

                <ul className="mt-8 grid w-full gap-3 text-start sm:grid-cols-2">
                  <li className="flex gap-3 rounded-xl border border-line bg-background/80 p-4">
                    <BellRing className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden="true" />
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">Check back soon</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-fg">
                        Roles open throughout the year. Bookmark this page and revisit regularly.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 rounded-xl border border-line bg-background/80 p-4">
                    <Mail className="mt-0.5 size-5 shrink-0 text-orange" aria-hidden="true" />
                    <div>
                      <p className="text-[14px] font-semibold text-foreground">Stay in touch</p>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted-fg">
                        Have questions about joining WBC? Reach out to our team and we&apos;ll help.
                      </p>
                    </div>
                  </li>
                </ul>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link to="/contact" className="btn-orange inline-flex">
                    Contact the team
                  </Link>
                  <Link
                    to="/who-we-are"
                    className="inline-flex h-11 items-center justify-center rounded-full border border-line bg-background px-5 text-[14px] font-bold text-foreground transition-colors hover:border-navy/30 hover:text-navy"
                  >
                    Learn about WBC
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <ul data-reveal data-reveal-group className="mt-10 space-y-4">
              {listings.map((job) => (
                <JobListingCard key={job.slug} job={job} />
              ))}
            </ul>
          )}
        </div>
      </section>

      {listings.length > 0 && (
        <CTASection
          title="Explore More Opportunities"
          description="Discover more job and internship opportunities across the WBC network and find the right fit for your skills and interests."
          ctaLabel="View All Internships"
          to="/jobs"
          hash="open-roles"
        />
      )}
    </>
  );
}
