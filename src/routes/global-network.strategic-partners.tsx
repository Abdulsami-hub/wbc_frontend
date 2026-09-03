import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import partnersHero from "@/assets/partners-hero.png";
import { CmsLink } from "@/components/CmsLink";
import { CTASection } from "@/components/CTASection";
import { PartnersDirectory, PartnersDirectorySkeleton } from "@/components/PartnersDirectory";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { strategicPartnersQueryOptions } from "@/lib/queries/strategic-partners";

export const Route = createFileRoute("/global-network/strategic-partners")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(strategicPartnersQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    const title = loaderData?.hero.title ?? "Partners and Sponsors — World Business Council";
    const description =
      loaderData?.hero.description ??
      "Explore WBC strategic partners, media sponsors, and corporate sponsors supporting programmes worldwide.";

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
  component: StrategicPartners,
});

function StrategicPartnersSkeleton() {
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
      <PartnersDirectorySkeleton />
    </>
  );
}

function resolveCta(url: string, fallback = "/contact") {
  const resolved = resolveCmsUrl(url, fallback);
  if (resolved.kind === "internal") {
    return { ctaTo: resolved.path, ctaHref: undefined as string | undefined };
  }
  return { ctaTo: undefined, ctaHref: resolved.href };
}

function StrategicPartners() {
  const { data, isPending } = useQuery(strategicPartnersQueryOptions);

  if (isPending) return <StrategicPartnersSkeleton />;
  if (!data) return null;

  const {
    hero,
    categories,
    approach,
    whyPartner,
    sponsorCards,
    whoWePartner,
    outcomes,
    focusAreas,
    process,
    cta,
  } = data;

  const heroImage = hero.image ?? partnersHero;
  const heroCta = hero.cta
    ? resolveCta(hero.cta.url)
    : { ctaTo: "/contact", ctaHref: undefined as string | undefined };

  const hasApproach =
    approach.title.trim() || approach.description.trim() || approach.descriptionSecondary.trim();
  const hasWhyPartner = whyPartner.items.length > 0 || Boolean(whyPartner.cta);
  const hasSponsorCards = sponsorCards.length > 0;
  const hasWhoWePartner =
    whoWePartner.title.trim() || whoWePartner.description.trim() || whoWePartner.pillars.length > 0;
  const hasOutcomes = outcomes.title.trim() || outcomes.items.length > 0;
  const hasFocusAreas = focusAreas.title.trim() || focusAreas.items.length > 0;
  const hasProcess = process.title.trim() || process.steps.length > 0;
  const hasClosingCta = cta.title.trim() || cta.description.trim() || cta.buttons.length > 0;

  const closingPrimary = cta.buttons[0];
  const closingSecondary = cta.buttons[1];
  const siteCta = closingPrimary ?? hero.cta;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        tags={hero.tags}
        image={heroImage}
        imageAlt={hero.imageAlt}
        tone="orange"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta.ctaTo}
        ctaHref={heroCta.ctaHref}
        ctaDownload={heroCta.ctaHref ? false : undefined}
      />

      <PartnersDirectory categories={categories} />

      {(hasApproach || hasWhyPartner || hasSponsorCards) && (
        <section className="relative overflow-hidden py-14 lg:py-20">
          <div
            className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
            <div data-reveal>
              {hasApproach ? (
                <>
                  {approach.kicker ? <p className="eyebrow">{approach.kicker}</p> : null}
                  {approach.title ? (
                    <h2 className="mt-3 max-w-2xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
                      {approach.title}
                    </h2>
                  ) : null}
                  <span className="accent-rule mt-6" />
                  {approach.description ? (
                    <p className="mt-8 max-w-2xl text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
                      {approach.description}
                    </p>
                  ) : null}
                  {approach.descriptionSecondary ? (
                    <p className="mt-5 max-w-2xl text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
                      {approach.descriptionSecondary}
                    </p>
                  ) : null}
                </>
              ) : null}

              {hasSponsorCards ? (
                <div data-reveal data-reveal-group className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
                  {sponsorCards.map((card) => (
                    <article
                      key={card.id}
                      className="group relative overflow-hidden rounded-card border border-line bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-card"
                    >
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100"
                        aria-hidden="true"
                      />
                      <p className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">{card.title}</p>
                      {card.body ? (
                        <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">{card.body}</p>
                      ) : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </div>

            {hasWhyPartner ? (
              <aside data-reveal className="group guide-card rounded-card border border-line bg-surface p-7 sm:p-8">
                <span className="guide-glow -end-10 -top-10 size-36 bg-orange/20" aria-hidden="true" />
                {whyPartner.kicker ? (
                  <p className="relative text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                    {whyPartner.kicker}
                  </p>
                ) : null}
                {whyPartner.items.length > 0 ? (
                  <ul className="relative mt-5 space-y-4">
                    {whyPartner.items.map((item) => (
                      <li key={item.id} className="border-b border-line pb-4 last:border-0 last:pb-0">
                        <p className="text-[16px] font-bold text-foreground">{item.title}</p>
                        {item.body ? (
                          <p className="mt-1.5 text-[14px] leading-relaxed text-muted-fg">{item.body}</p>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {whyPartner.cta ? (
                  <CmsLink
                    href={whyPartner.cta.url}
                    fallback="/contact"
                    className="btn-orange relative mt-7 inline-flex"
                  >
                    {whyPartner.cta.label}
                  </CmsLink>
                ) : null}
              </aside>
            ) : null}
          </div>
        </section>
      )}

      {hasWhoWePartner ? (
        <section className="relative overflow-hidden border-t border-line bg-surface/50 py-14 lg:py-20">
          <div
            className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-navy/8 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div data-reveal className="max-w-2xl">
              {whoWePartner.kicker ? <p className="eyebrow">{whoWePartner.kicker}</p> : null}
              {whoWePartner.title ? (
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                  {whoWePartner.title}
                </h2>
              ) : null}
              {whoWePartner.description ? (
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">{whoWePartner.description}</p>
              ) : null}
              <span className="accent-rule mt-6" />
            </div>

            {whoWePartner.pillars.length > 0 ? (
              <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {whoWePartner.pillars.map((pillar, i) => (
                  <li key={pillar.id}>
                    <article className="group guide-card flex h-full flex-col border border-line bg-background p-6 sm:p-7">
                      <span className="guide-glow -end-10 -top-10 size-28 bg-orange/20" aria-hidden="true" />
                      <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-orange/60">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="relative mt-4 text-[19px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                        {pillar.title}
                      </h3>
                      {pillar.body ? (
                        <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-muted-fg">{pillar.body}</p>
                      ) : null}
                      <span className="guide-accent relative mt-6" aria-hidden="true" />
                    </article>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

      {(hasOutcomes || hasFocusAreas) && (
        <section className="border-t border-line py-14 lg:py-20">
          <div className="container-wbc grid gap-8 lg:grid-cols-2 lg:gap-10">
            {hasOutcomes ? (
              <div data-reveal className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9">
                <span className="guide-glow -end-10 -top-10 size-36 bg-navy/15" aria-hidden="true" />
                {outcomes.kicker ? <p className="relative eyebrow">{outcomes.kicker}</p> : null}
                {outcomes.title ? (
                  <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                    {outcomes.title}
                  </h2>
                ) : null}
                {outcomes.items.length > 0 ? (
                  <ul className="relative mt-8 space-y-5">
                    {outcomes.items.map((item, i) => (
                      <li key={item.id} className="flex gap-4">
                        <span className="font-display text-[13px] font-bold tabular-nums text-orange/55">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-[16px] font-bold text-foreground">{item.title}</p>
                          {item.body ? (
                            <p className="mt-1 text-[15px] leading-relaxed text-muted-fg">{item.body}</p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}

            {hasFocusAreas ? (
              <div
                data-reveal
                className="group relative overflow-hidden rounded-card bg-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-9"
              >
                <span
                  className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                {focusAreas.kicker ? (
                  <p className="relative text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">
                    {focusAreas.kicker}
                  </p>
                ) : null}
                {focusAreas.title ? (
                  <h2 className="relative mt-3 text-[24px] font-bold leading-snug sm:text-[28px]">
                    {focusAreas.title}
                  </h2>
                ) : null}
                {focusAreas.items.length > 0 ? (
                  <ul className="relative mt-8 space-y-3.5">
                    {focusAreas.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                        <svg
                          className="mt-1 size-4 shrink-0 text-orange"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          aria-hidden="true"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      )}

      {hasProcess ? (
        <section className="relative isolate overflow-hidden border-t border-line bg-navy py-14 lg:py-20">
          <div
            className="pointer-events-none absolute -end-20 top-0 size-[360px] rounded-full bg-orange/20 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -start-16 bottom-0 size-[280px] rounded-full bg-teal/15 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div data-reveal className="max-w-2xl">
              {process.kicker ? (
                <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">{process.kicker}</p>
              ) : null}
              {process.title ? (
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">{process.title}</h2>
              ) : null}
              {process.description ? (
                <p className="mt-4 text-[16px] leading-relaxed text-white/75">{process.description}</p>
              ) : null}
            </div>

            {process.steps.length > 0 ? (
              <ol data-reveal data-reveal-group className="relative mt-12 grid gap-6 lg:grid-cols-3">
                <span
                  className="guide-process-line pointer-events-none absolute top-8 start-[16%] end-[16%] hidden h-px bg-gradient-to-r from-transparent via-orange/70 to-transparent lg:block"
                  aria-hidden="true"
                />
                {process.steps.map((step) => (
                  <li key={step.id}>
                    <article className="group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange/40 hover:bg-white/10 sm:p-7">
                      <span
                        className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange/25"
                        aria-hidden="true"
                      />
                      <span className="relative inline-flex size-12 items-center justify-center bg-orange text-[14px] font-bold tabular-nums text-white transition-transform duration-300 group-hover:scale-110">
                        {step.step}
                      </span>
                      <h3 className="relative mt-5 text-[20px] font-bold text-white">{step.title}</h3>
                      {step.body ? (
                        <p className="relative mt-3 text-[15px] leading-relaxed text-white/75">{step.body}</p>
                      ) : null}
                    </article>
                  </li>
                ))}
              </ol>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasClosingCta ? (
        <section className="border-t border-line py-14 lg:py-20">
          <div className="container-wbc">
            <div
              data-reveal
              className="group relative overflow-hidden rounded-card border border-line bg-background p-8 transition-shadow duration-500 hover:shadow-card sm:p-10 lg:p-14"
            >
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-50 bg-gradient-to-r from-orange via-orange/60 to-transparent transition-transform duration-700 group-hover:scale-x-100"
                aria-hidden="true"
              />
              {cta.kicker ? <p className="eyebrow">{cta.kicker}</p> : null}
              {cta.title ? (
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">{cta.title}</h2>
              ) : null}
              {cta.description ? (
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                  {cta.description}
                </p>
              ) : null}
              {(closingPrimary || closingSecondary) && (
                <div className="mt-8 flex flex-wrap gap-3">
                  {closingPrimary ? (
                    <CmsLink href={closingPrimary.url} fallback="/contact" className="btn-orange">
                      {closingPrimary.label}
                    </CmsLink>
                  ) : null}
                  {closingSecondary ? (
                    <CmsLink href={closingSecondary.url} fallback="/global-network" className="btn-navy !rounded-md">
                      {closingSecondary.label}
                    </CmsLink>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        title={siteCta ? (cta.title.trim() || hero.title) : hero.title}
        description={cta.description.trim() || hero.description}
        ctaLabel={siteCta?.label ?? "Contact Us"}
        to={siteCta ? resolveCta(siteCta.url).ctaTo ?? "/contact" : "/contact"}
      />
    </>
  );
}
