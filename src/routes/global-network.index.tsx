import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import networkBg from "@/assets/network-bg.jpg";
import { CTASection } from "@/components/CTASection";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { globalNetworkQueryOptions } from "@/lib/queries/global-network";

export const Route = createFileRoute("/global-network/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(globalNetworkQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    return {
      meta: [
        { title: "Global Network — World Business Council" },
        {
          name: "description",
          content:
            "WBC's global network: headquarters, affiliates, members, sponsors, and strategic partners connecting businesses worldwide.",
        },
        { property: "og:title", content: "WBC Global Network" },
        {
          property: "og:description",
          content: "Headquarters, affiliates, members, sponsors, and strategic partners.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: GlobalNetwork,
});

function GlobalNetworkSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block" aria-hidden="true" />
        <div className="bg-teal lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-32 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <Skeleton className="mx-auto h-64 max-w-4xl rounded-card" />
        </div>
      </section>
    </>
  );
}

function GlobalNetwork() {
  const { data, isPending } = useQuery(globalNetworkQueryOptions);

  if (isPending) return <GlobalNetworkSkeleton />;
  if (!data) return null;

  const { hero, structures, stats } = data;
  const heroImage = hero.image ?? networkBg;

  let ctaTo: string | undefined;
  let ctaHref: string | undefined;
  if (hero.cta) {
    const resolved = resolveCmsUrl(hero.cta.url, "/affiliates");
    if (resolved.kind === "internal") {
      ctaTo = resolved.path;
    } else {
      ctaHref = resolved.href;
    }
  }

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        tags={hero.tags}
        image={heroImage}
        imageAlt={hero.imageAlt}
        tone="blue"
        ctaLabel={hero.cta?.label}
        ctaTo={ctaTo}
        ctaHref={ctaHref}
        ctaDownload={ctaHref ? false : undefined}
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div
            data-reveal
            className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-10 lg:p-12"
          >
            <h2 className="text-[26px] leading-tight font-bold text-foreground sm:text-[34px]">
              Become part of the WBC Global Network
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">
              Become part of the WBC Global Network by joining as a member, sponsor or strategic partner, and connect
              with a growing international community committed to collaboration, innovation, and shared success.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Lead WBC&apos;s mission in your country or city by establishing a WBC Affiliate and become the official
              local representative, connecting businesses with global opportunities while strengthening your local
              business community.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/become-a-member" className="btn-orange">
                Become a Member
              </Link>
              <Link to="/affiliate-guide" className="btn-navy !rounded-md">
                Establish an Affiliate
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">Network Structure</p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[46px]">
              Connected layers
            </h2>
          </div>

          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2">
            {structures.map((pillar, i) => (
              <li key={pillar.id}>
                <Link
                  to={pillar.to}
                  className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-background p-7 pe-14 transition-shadow duration-300 hover:shadow-card sm:p-8 sm:pe-14"
                >
                  <span className="block h-[3px] w-10 bg-orange" aria-hidden="true" />
                  <span className="absolute top-6 end-7 text-[14px] font-bold tabular-nums text-line">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-7 text-[21px] leading-snug font-bold text-foreground">{pillar.title}</h3>
                  <p className="mt-4 text-[16px] leading-[1.75] text-muted-fg">{pillar.body}</p>
                  <span className="link-arrow mt-6">
                    Learn more
                    <span aria-hidden="true" className="link-arrow-icon rtl-mirror">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div
            data-reveal
            data-reveal-group
            className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="bg-background p-8">
                <p className="text-[38px] leading-none font-extrabold tracking-tight text-foreground">{stat.value}</p>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{stat.label}</p>
              </div>
            ))}
          </div>
          <div data-reveal className="mt-10 text-center">
            <Link to="/affiliates" className="text-[16px] font-bold text-foreground">
              See where WBC is represented <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Join WBC?"
        description="Become part of a network built on collaboration, innovation, and trust."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
