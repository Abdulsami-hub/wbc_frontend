import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { CmsLink } from "@/components/CmsLink";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { becomeAMemberQueryOptions } from "@/lib/queries/become-a-member";

export const Route = createFileRoute("/become-a-member")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(becomeAMemberQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    const title = loaderData?.hero.title ?? "Become a Member — World Business Council";
    const description =
      loaderData?.hero.description ??
      "Apply for WBC membership online. Fill the application form, process payment, and receive confirmation within 3 working days.";

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
  component: BecomeAMember,
});

function BecomeAMemberSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block" aria-hidden="true" />
        <div className="bg-orange lg:bg-transparent">
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
      <section className="py-16 lg:py-24">
        <div className="container-wbc grid gap-10 lg:grid-cols-2">
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-12 w-72" />
            <Skeleton className="h-24 w-full" />
          </div>
          <Skeleton className="min-h-[320px] w-full" />
        </div>
      </section>
    </>
  );
}

function resolveCta(url: string, fallback = "/membership") {
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

function BecomeAMember() {
  const { data, isPending } = useQuery(becomeAMemberQueryOptions);

  if (isPending) return <BecomeAMemberSkeleton />;
  if (!data) return null;

  const { hero, eligibility, audiences, apply, form } = data;
  const heroCta = hero.cta ? resolveCta(hero.cta.url) : null;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        image={hero.image ?? membershipImg}
        imageAlt={hero.imageAlt}
        tone="orange"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
        ctaHash={heroCta?.ctaHash}
      />

      {(eligibility.title || audiences.length > 0) && (
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="container-wbc grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
            <div data-reveal className="flex flex-col justify-center">
              {eligibility.kicker ? <p className="eyebrow">{eligibility.kicker}</p> : null}
              {eligibility.title ? (
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                  {eligibility.title}
                </h2>
              ) : null}
              <span className="accent-rule mt-5" />
              {eligibility.description ? (
                <p className="mt-6 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                  {eligibility.description}
                </p>
              ) : null}
              {audiences.length > 0 ? (
                <ul className="mt-8 flex flex-wrap gap-2.5">
                  {audiences.map((a) => (
                    <li
                      key={a.id}
                      className="border border-line bg-surface px-4 py-2 text-[13px] font-semibold tracking-[0.04em] text-foreground"
                    >
                      {a.label}
                    </li>
                  ))}
                </ul>
              ) : null}
              {eligibility.cta ? (
                <div className="mt-10">
                  <CmsLink href={eligibility.cta.url} className="btn-navy !rounded-md" fallback="/membership">
                    {eligibility.cta.label}
                  </CmsLink>
                </div>
              ) : null}
            </div>

            <div data-reveal className="relative min-h-[320px] overflow-hidden rounded-card lg:min-h-full">
              <img
                src={eligibility.image ?? membershipImg}
                alt={eligibility.imageAlt}
                width={1200}
                height={900}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent"
                aria-hidden="true"
              />
              {(eligibility.overlayKicker || eligibility.overlayText) && (
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  {eligibility.overlayKicker ? (
                    <p className="text-[12px] font-bold tracking-[0.18em] text-white/70 uppercase">
                      {eligibility.overlayKicker}
                    </p>
                  ) : null}
                  {eligibility.overlayText ? (
                    <p className="mt-2 max-w-sm text-[20px] font-bold leading-snug text-white sm:text-[22px]">
                      {eligibility.overlayText}
                    </p>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {(apply.title || apply.steps.length > 0) && (
        <section className="relative isolate overflow-hidden bg-navy py-16 lg:py-24">
          <div
            className="pointer-events-none absolute -end-16 top-0 size-[360px] rounded-full bg-orange/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -start-20 bottom-0 size-[300px] rounded-full bg-teal/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div className="mx-auto max-w-2xl text-center">
              {apply.kicker ? (
                <p data-reveal className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
                  {apply.kicker}
                </p>
              ) : null}
              {apply.title ? (
                <h2
                  data-reveal
                  className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[42px]"
                >
                  {apply.title}
                </h2>
              ) : null}
              {apply.description ? (
                <p data-reveal className="mt-4 text-[16px] leading-relaxed text-white/80">
                  {apply.description}
                </p>
              ) : null}
            </div>

            {apply.steps.length > 0 ? (
              <ol data-reveal data-reveal-group className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
                <span
                  className="pointer-events-none absolute top-[2.75rem] start-[16%] end-[16%] hidden h-px bg-white/20 md:block"
                  aria-hidden="true"
                />
                {apply.steps.map((step, i) => (
                  <li key={step.id}>
                    <article className="relative rounded-card border border-white/15 bg-white/5 p-7 backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 sm:p-8">
                      <span className="inline-flex size-12 items-center justify-center bg-orange text-[15px] font-bold tabular-nums text-white">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-6 text-[20px] font-bold text-white">{step.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-white/75">{step.body}</p>
                    </article>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </section>
      )}

      {(form.title || form.kicker) && (
        <section className="relative overflow-hidden bg-surface py-16 lg:py-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/[0.04] to-transparent"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div className="mx-auto max-w-4xl">
              <div data-reveal className="mb-10 text-center sm:mb-12">
                {form.kicker ? <p className="eyebrow">{form.kicker}</p> : null}
                {form.title ? (
                  <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                    {form.title}
                  </h2>
                ) : null}
                {form.description ? (
                  <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-fg">
                    {form.description}
                  </p>
                ) : null}
                <span className="accent-rule mx-auto mt-6" />
              </div>

              <div
                data-reveal
                data-no-translate
                className="relative overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-8 lg:p-10"
              >
                <span
                  className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent"
                  aria-hidden="true"
                />
                <MembershipApplicationForm />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
