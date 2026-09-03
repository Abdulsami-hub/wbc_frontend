import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { BenefitsTable } from "@/components/membership/BenefitsTable";
import { MembershipTypesSection } from "@/components/membership/MembershipTypesSection";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { membershipQueryOptions } from "@/lib/queries/membership";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/membership/")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(membershipQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero?.image;
    const title = loaderData?.hero?.title ?? "Membership";
    const description =
      loaderData?.hero?.description ??
      "World Business Council membership options, benefits, and how to join the global business network.";
    return seoHead({
      title,
      description,
      path: "/membership",
      image: heroImage,
      preloadImage: heroImage,
    });
  },
  component: MembershipOverview,
});

function MembershipSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-navy lg:block"
          aria-hidden="true"
        />
        <div className="bg-navy lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-40 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-20 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-wbc space-y-6">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-12 w-80" />
          <Skeleton className="h-64 w-full" />
        </div>
      </section>
    </>
  );
}

function resolveCta(url: string, fallback = "/become-a-member") {
  const resolved = resolveCmsUrl(url, fallback);
  if (resolved.kind === "internal") {
    return { ctaTo: resolved.path, ctaHref: undefined as string | undefined };
  }
  return { ctaTo: undefined, ctaHref: resolved.href };
}

function MembershipOverview() {
  const { data, isPending } = useQuery(membershipQueryOptions);

  if (isPending) return <MembershipSkeleton />;
  if (!data) return null;

  const { hero, typesHeader, highlights, types, why, benefitsHeader, planTiers, planBenefits } =
    data;
  const heroCta = hero.cta ? resolveCta(hero.cta.url) : null;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        tags={hero.tags}
        image={hero.image ?? membershipImg}
        imageAlt={hero.imageAlt}
        tone="navy"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
      />

      {(typesHeader.title || types.length > 0) && (
        <section id="types" className="relative overflow-hidden py-16 lg:py-24">
          <div
            className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <MembershipTypesSection header={typesHeader} highlights={highlights} types={types} />
          </div>
        </section>
      )}

      {why.items.length > 0 && (
        <section className="border-t border-line py-16 lg:py-24">
          <div className="container-wbc">
            {why.title ? (
              <div className="mx-auto max-w-2xl text-center">
                <h2
                  data-reveal
                  className="text-[28px] font-bold leading-tight text-navy sm:text-[36px] lg:text-[42px]"
                >
                  {why.title}
                </h2>
                <span data-reveal className="accent-rule mx-auto mt-5" />
              </div>
            ) : null}

            <ul
              data-reveal
              data-reveal-group
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {why.items.map((b, i) => (
                <li key={b.id}>
                  <article className="group h-full rounded-card border border-line bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
                    <span className="font-display text-[15px] font-bold tabular-nums text-orange/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-4 text-[18px] font-bold text-navy transition-colors group-hover:text-teal sm:text-[19px]">
                      {b.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{b.body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {(benefitsHeader.title || planBenefits.length > 0) && (
        <section id="benefits" className="border-t border-line bg-surface py-16 lg:py-24">
          <div className="container-wbc">
            <div className="mx-auto max-w-2xl text-center">
              {benefitsHeader.kicker ? (
                <p
                  data-reveal
                  className="text-[12px] font-bold tracking-[0.2em] text-orange uppercase"
                >
                  {benefitsHeader.kicker}
                </p>
              ) : null}
              {benefitsHeader.title ? (
                <h2
                  data-reveal
                  className="mt-3 text-[28px] font-bold leading-tight text-navy sm:text-[36px] lg:text-[42px]"
                >
                  {benefitsHeader.title}
                </h2>
              ) : null}
              {benefitsHeader.description ? (
                <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
                  {benefitsHeader.description}
                </p>
              ) : null}
            </div>

            <div data-reveal className="mt-12">
              <BenefitsTable tiers={planTiers} rows={planBenefits} />
            </div>

            {benefitsHeader.disclaimer ? (
              <p
                data-reveal
                className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-muted-fg"
              >
                {benefitsHeader.disclaimer}
              </p>
            ) : null}

            <div data-reveal className="mt-10 text-center">
              <Link to="/become-a-member" className="btn-orange">
                Apply for Membership
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
