import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import networkBg from "@/assets/network-bg.jpg";
import { CmsLink } from "@/components/CmsLink";
import { CTASection } from "@/components/CTASection";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { AFFILIATE_GUIDE_TOC } from "@/content/affiliate-guide";
import { resolveCmsUrl } from "@/lib/cms-url";
import { affiliateGuideQueryOptions } from "@/lib/queries/affiliate-guide";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/affiliate-guide")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(affiliateGuideQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero?.image;
    const title = loaderData?.hero?.title ?? "Affiliate Guide";
    const description =
      loaderData?.hero?.description ??
      "Guidance for establishing and operating a World Business Council affiliate.";
    return seoHead({
      title,
      description,
      path: "/affiliate-guide",
      image: heroImage,
      preloadImage: heroImage,
    });
  },
  component: AffiliateGuide,
});

function CheckList({ items, dark = false }: { items: readonly string[]; dark?: boolean }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li
          key={item}
          className="group/item flex gap-3 text-[15px] leading-relaxed transition-transform duration-300 hover:translate-x-1 sm:text-[16px]"
        >
          <svg
            className={`mt-1 size-4 shrink-0 transition-transform duration-300 group-hover/item:scale-110 ${
              dark ? "text-orange" : "text-teal"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
          <span className={dark ? "text-white/80" : "text-muted-fg"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function AffiliateGuideSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block"
          aria-hidden="true"
        />
        <div className="bg-teal lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-48 bg-white/20" />
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
          <Skeleton className="h-64 w-full rounded-card" />
        </div>
      </section>
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

function AffiliateGuide() {
  const { data, isPending } = useQuery(affiliateGuideQueryOptions);

  if (isPending) return <AffiliateGuideSkeleton />;
  if (!data) return null;

  const {
    hero,
    overview,
    benefits,
    types,
    eligibilityBlocks,
    process,
    supports,
    financial,
    compliance,
    nextStep,
  } = data;

  const heroImage = hero.image ?? networkBg;
  const heroCta = hero.cta
    ? resolveCta(hero.cta.url)
    : { ctaTo: "/contact", ctaHref: undefined as string | undefined };

  const hasOverview =
    overview.title.trim() || overview.descriptionLeft.trim() || overview.descriptionRight.trim();
  const hasFinancial = financial.title.trim() || financial.description.trim();
  const hasCompliance =
    compliance.title.trim() || compliance.description.trim() || compliance.items.length > 0;
  const hasNextStep = nextStep.title.trim() || nextStep.description.trim();

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
        ctaTo={heroCta.ctaTo}
        ctaHref={heroCta.ctaHref}
        ctaDownload={heroCta.ctaHref ? false : undefined}
      />

      {(hasOverview || AFFILIATE_GUIDE_TOC.length > 0) && (
        <section id="overview" className="scroll-mt-28 relative overflow-hidden py-14 lg:py-20">
          <div
            className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
            {hasOverview ? (
              <div data-reveal>
                <p className="eyebrow">Overview</p>
                <h2 className="mt-3 max-w-3xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
                  {overview.title}
                </h2>
                <span className="accent-rule mt-6" />
                <div className="mt-8 grid gap-6 text-[16px] leading-[1.85] text-muted-fg sm:text-[17px] lg:grid-cols-2">
                  {overview.descriptionLeft ? <p>{overview.descriptionLeft}</p> : null}
                  {overview.descriptionRight ? <p>{overview.descriptionRight}</p> : null}
                </div>
              </div>
            ) : (
              <div />
            )}

            <aside data-reveal className="lg:pt-2">
              <nav
                aria-label="Guide sections"
                className="sticky top-28 rounded-card border border-line bg-surface/90 p-5 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg sm:p-6"
              >
                <p className="text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                  On this page
                </p>
                <ul className="mt-4 space-y-1">
                  {AFFILIATE_GUIDE_TOC.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="group flex items-center gap-2 rounded-md px-2 py-2 text-[14px] font-medium text-foreground transition-all duration-300 hover:bg-background hover:text-[#0d67c2] hover:ps-3"
                      >
                        <span
                          className="h-px w-0 bg-[#0d67c2] transition-all duration-300 group-hover:w-3"
                          aria-hidden="true"
                        />
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
                {hero.cta ? (
                  <CmsLink
                    href={hero.cta.url}
                    fallback="/contact"
                    className="btn-orange-to-outline mt-6 w-full !min-h-10 !text-[11px]"
                  >
                    {hero.cta.label}
                  </CmsLink>
                ) : null}
              </nav>
            </aside>
          </div>
        </section>
      )}

      {benefits.length > 0 ? (
        <section
          id="why"
          className="scroll-mt-28 relative overflow-hidden border-t border-line bg-surface/50 py-14 lg:py-20"
        >
          <div
            className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-navy/8 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div data-reveal className="max-w-2xl">
              <p className="eyebrow">Benefits</p>
              <span className="accent-rule mt-6" />
            </div>

            <ul
              data-reveal
              data-reveal-group
              className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {benefits.map((item, i) => (
                <li key={item}>
                  <article className="group guide-card flex h-full flex-col border border-line bg-background p-5 sm:p-6">
                    <span
                      className="guide-glow -end-10 -top-10 size-28 bg-orange/25"
                      aria-hidden="true"
                    />
                    <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-orange/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="relative mt-4 text-[15px] leading-snug font-semibold text-foreground transition-colors duration-300 group-hover:text-navy sm:text-[16px]">
                      {item}
                    </p>
                    <span className="guide-accent relative mt-5" aria-hidden="true" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {types.length > 0 ? (
        <section id="types" className="scroll-mt-28 border-t border-line py-14 lg:py-20">
          <div className="container-wbc">
            <div data-reveal className="max-w-2xl">
              <p className="eyebrow">Affiliate structure</p>
              <span className="accent-rule mt-6" />
            </div>

            <div data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-2">
              {types.map((type) => (
                <article
                  key={type.id}
                  className="group guide-card relative overflow-hidden rounded-card border border-line bg-background p-7 sm:p-9"
                >
                  <span
                    className={`absolute inset-y-0 start-0 w-1 transition-all duration-500 group-hover:w-1.5 ${
                      type.kind === "national" ? "bg-navy group-hover:bg-orange" : "bg-orange"
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`guide-glow -end-12 -top-12 size-40 ${
                      type.kind === "national" ? "bg-navy/20" : "bg-orange/25"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="relative text-[12px] font-bold tracking-[0.16em] text-orange uppercase">
                    {type.kindLabel}
                  </p>
                  <h3 className="relative mt-3 text-[24px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                    {type.title}
                  </h3>
                  {type.description ? (
                    <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">
                      {type.description}
                    </p>
                  ) : null}
                  {type.items.length > 0 ? (
                    <div className="relative mt-6">
                      <CheckList items={type.items} />
                    </div>
                  ) : null}
                  {type.footerNote ? (
                    <p className="relative mt-8 border-t border-line pt-6 text-[14px] leading-relaxed text-muted-fg">
                      {type.footerNote}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {eligibilityBlocks.length > 0 ? (
        <section
          id="eligibility"
          className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20"
        >
          <div className="container-wbc grid gap-8 lg:grid-cols-2 lg:gap-10">
            {eligibilityBlocks.map((block) => (
              <div
                key={block.id}
                data-reveal
                className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9"
              >
                <span
                  className="guide-glow -end-10 -top-10 size-36 bg-orange/20"
                  aria-hidden="true"
                />
                <p className="relative eyebrow">{block.kindLabel}</p>
                <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                  {block.title}
                </h2>
                {block.description ? (
                  <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">
                    {block.description}
                  </p>
                ) : null}
                {block.items.length > 0 ? (
                  <div className="relative mt-6">
                    <CheckList items={block.items} />
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {process.steps.length > 0 ? (
        <section
          id="process"
          className="scroll-mt-28 relative isolate overflow-hidden bg-navy py-14 lg:py-20"
        >
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
              <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
                How to proceed
              </p>
              {process.title ? (
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">
                  {process.title}
                </h2>
              ) : null}
              {process.description ? (
                <p className="mt-4 text-[16px] leading-relaxed text-white/75">
                  {process.description}
                </p>
              ) : null}
            </div>

            <ol data-reveal data-reveal-group className="relative mt-12 grid gap-6 lg:grid-cols-3">
              <span
                className="guide-process-line pointer-events-none absolute top-8 start-[16%] end-[16%] hidden h-px bg-gradient-to-r from-transparent via-orange/70 to-transparent lg:block"
                aria-hidden="true"
              />

              {process.steps.map((step) => (
                <li key={step.id}>
                  <article className="group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange/40 hover:bg-white/10 sm:p-7">
                    <span
                      className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/0 transition-all duration-500 group-hover:bg-orange/25 group-hover:scale-150"
                      aria-hidden="true"
                    />
                    <span className="relative inline-flex size-12 items-center justify-center bg-orange text-[14px] font-bold tabular-nums text-white transition-transform duration-300 group-hover:scale-110">
                      {step.step}
                    </span>
                    <h3 className="relative mt-5 text-[20px] font-bold text-white">{step.title}</h3>
                    {step.intro ? (
                      <p className="relative mt-3 text-[14px] leading-relaxed text-white/70">
                        {step.intro}
                      </p>
                    ) : null}
                    {step.items.length > 0 ? (
                      <div className="relative mt-5">
                        <CheckList items={step.items} dark />
                      </div>
                    ) : null}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {supports.length > 0 ? (
        <section
          id="support"
          className="scroll-mt-28 relative overflow-hidden border-t border-line py-14 lg:py-20"
        >
          <div
            className="pointer-events-none absolute start-1/2 top-0 size-[420px] -translate-x-1/2 rounded-full bg-orange/8 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div
              data-reveal
              className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-2xl">
                <p className="eyebrow">Partnership</p>
                <span className="accent-rule mt-6" />
              </div>
            </div>

            <ul
              data-reveal
              data-reveal-group
              className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {supports.map((item, i) => (
                <li key={item.id}>
                  <article className="group guide-card h-full border border-line bg-background p-6 sm:p-7">
                    <span
                      className="guide-glow -end-8 -top-8 size-28 bg-orange/20"
                      aria-hidden="true"
                    />
                    <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-orange/55">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative mt-4 text-[18px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                      {item.title}
                    </h3>
                    {item.body ? (
                      <p className="relative mt-2 text-[15px] leading-relaxed text-muted-fg">
                        {item.body}
                      </p>
                    ) : null}
                    <span className="guide-accent relative mt-5" aria-hidden="true" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {(hasFinancial || hasCompliance) && (
        <section
          id="compliance"
          className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20"
        >
          <div className="container-wbc grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            {hasFinancial ? (
              <article
                data-reveal
                className="group relative overflow-hidden rounded-card bg-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-9"
              >
                <span
                  className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
                  aria-hidden="true"
                />
                <p className="relative text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">
                  Financial Commitment
                </p>
                <h2 className="relative mt-3 text-[24px] font-bold leading-snug sm:text-[28px]">
                  {financial.title}
                </h2>
                {financial.description ? (
                  <p className="relative mt-5 text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
                    {financial.description}
                  </p>
                ) : null}
                {financial.buttonLabel && financial.buttonUrl ? (
                  <CmsLink
                    href={financial.buttonUrl}
                    fallback="/contact"
                    className="btn-orange mt-8 inline-flex"
                  >
                    {financial.buttonLabel}
                  </CmsLink>
                ) : null}
              </article>
            ) : null}

            {hasCompliance ? (
              <article
                data-reveal
                className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9"
              >
                <span
                  className="guide-glow -end-10 -top-10 size-36 bg-orange/15"
                  aria-hidden="true"
                />
                <p className="relative eyebrow">Standards</p>
                <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                  {compliance.title}
                </h2>
                {compliance.description ? (
                  <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">
                    {compliance.description}
                  </p>
                ) : null}
                {compliance.items.length > 0 ? (
                  <div className="relative mt-6">
                    <CheckList items={compliance.items} />
                  </div>
                ) : null}
              </article>
            ) : null}
          </div>
        </section>
      )}

      {hasNextStep ? (
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
              <p className="eyebrow">Next step</p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                {nextStep.title}
              </h2>
              {nextStep.description ? (
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                  {nextStep.description}
                </p>
              ) : null}
              {hero.cta ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  <CmsLink href={hero.cta.url} fallback="/contact" className="btn-orange">
                    {hero.cta.label}
                  </CmsLink>
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <CTASection
        title={nextStep.title.trim() || hero.title}
        description={nextStep.description.trim() || hero.description}
        ctaLabel={hero.cta?.label ?? "Contact Us"}
        to={heroCta.ctaTo ?? "/contact"}
      />
    </>
  );
}
