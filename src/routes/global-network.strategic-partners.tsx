import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import partnersHero from "@/assets/partners-hero.png";
import { CmsLink } from "@/components/CmsLink";
import { CTASection } from "@/components/CTASection";
import { PartnersDirectory, PartnersDirectorySkeleton } from "@/components/PartnersDirectory";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { useSectionVisible } from "@/lib/queries/section-visibility";
import { strategicPartnersQueryOptions } from "@/lib/queries/strategic-partners";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/global-network/strategic-partners")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(strategicPartnersQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero?.image;
    const title = loaderData?.hero?.title ?? "Partners and Sponsors";
    const description =
      loaderData?.hero?.description ??
      "Support global business. Increase your visibility. Create opportunities.";
    return seoHead({
      title,
      description,
      path: "/global-network/strategic-partners",
      image: heroImage,
      preloadImage: heroImage,
    });
  },
  component: StrategicPartners,
});

function StrategicPartnersSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block"
          aria-hidden="true"
        />
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
  const showProfiles = useSectionVisible("strategic-partners", "profiles");
  const showSponsorshipOverview = useSectionVisible("strategic-partners", "sponsorship_overview");
  const showSponsorshipTypes = useSectionVisible("strategic-partners", "sponsorship_types");
  const showWhySponsor = useSectionVisible("strategic-partners", "why_sponsor");
  const showSupport = useSectionVisible("strategic-partners", "support");
  const showCooperation = useSectionVisible("strategic-partners", "cooperation");
  const showPartnerTypes = useSectionVisible("strategic-partners", "partner_types");
  const showFocusAreas = useSectionVisible("strategic-partners", "focus_areas");
  const showProcess = useSectionVisible("strategic-partners", "process");
  const showCta = useSectionVisible("strategic-partners", "cta");

  if (isPending) return <StrategicPartnersSkeleton />;
  if (!data) return null;

  const {
    hero,
    categories,
    approach,
    whyPartner,
    sponsorCards,
    cooperation,
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

  const pageIntroParagraphs = approach.descriptionSecondary
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
  const hasPageIntro = showSponsorshipOverview && pageIntroParagraphs.length > 0;
  const hasApproach =
    showSponsorshipOverview &&
    (approach.kicker.trim() || approach.title.trim() || approach.description.trim());
  const hasWhyPartner =
    showWhySponsor &&
    (whyPartner.kicker.trim() || whyPartner.title.trim() || whyPartner.items.length > 0 || Boolean(whyPartner.cta));
  const hasSponsorCards = showSponsorshipTypes && sponsorCards.length > 0;
  const hasCooperation =
    showCooperation &&
    (cooperation.kicker.trim() ||
      cooperation.title.trim() ||
      cooperation.description.trim() ||
      cooperation.items.length > 0);
  const hasWhoWePartner =
    showPartnerTypes &&
    (whoWePartner.title.trim() ||
      whoWePartner.description.trim() ||
      whoWePartner.pillars.length > 0);
  const hasOutcomes = showSupport && (outcomes.title.trim() || outcomes.items.length > 0);
  const hasSponsorsBand = hasPageIntro || hasApproach || hasSponsorCards || hasWhyPartner || hasOutcomes;
  const hasPartnersBand = hasCooperation || hasWhoWePartner;
  const hasFocusAreasVisible = showFocusAreas && (focusAreas.title.trim() || focusAreas.items.length > 0);
  const lastOutcome = outcomes.items.at(-1);
  const outcomeClosing =
    lastOutcome && !lastOutcome.body && /[.!?]$/.test(lastOutcome.title.trim())
      ? lastOutcome.title
      : "";
  const outcomeItems = outcomeClosing ? outcomes.items.slice(0, -1) : outcomes.items;
  const hasProcess = showProcess && (process.title.trim() || process.steps.length > 0);
  const hasClosingCta = showCta && (cta.title.trim() || cta.description.trim() || cta.buttons.length > 0);

  const closingButtons = cta.buttons;
  const siteCta = closingButtons[0] ?? hero.cta;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        tags={hero.tags}
        image={heroImage}
        imageAlt={hero.imageAlt}
        tone={hero.background}
        layout={hero.layout}
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta.ctaTo}
        ctaHref={heroCta.ctaHref}
        ctaDownload={heroCta.ctaHref ? false : undefined}
      />

      {showProfiles ? <PartnersDirectory categories={categories} /> : null}

      {hasSponsorsBand ? (
        <section className="relative overflow-hidden border-t border-line py-14 lg:py-20">
          <div
            className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative space-y-12">
            <div data-reveal className="max-w-3xl">
              <span className="inline-flex rounded-full bg-orange px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-white uppercase">
                For sponsors
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
                Sponsors
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                Visibility, campaigns, and tailored sponsorship — not a long-term partnership.
              </p>
            </div>

            {hasPageIntro ? (
              <div data-reveal className="max-w-3xl space-y-5">
                {pageIntroParagraphs.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : null}

            {hasApproach ? (
              <div data-reveal className="max-w-3xl">
                {approach.kicker ? <p className="eyebrow">{approach.kicker}</p> : null}
                {approach.title ? (
                  <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
                    {approach.title}
                  </h2>
                ) : null}
                <span className="accent-rule mt-6" />
                {approach.description ? (
                  <p className="mt-8 text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
                    {approach.description}
                  </p>
                ) : null}
              </div>
            ) : null}

            {hasSponsorCards ? (
              <ol data-reveal data-reveal-group className="grid gap-6 lg:grid-cols-3">
                {sponsorCards.map((card, index) => (
                  <li key={card.id}>
                    <article className="group relative flex h-full flex-col overflow-hidden rounded-card border border-line bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card sm:p-7">
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-orange"
                        aria-hidden="true"
                      />
                      <span className="inline-flex size-10 items-center justify-center bg-orange text-[13px] font-bold text-white tabular-nums">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-5 text-[20px] font-bold text-foreground">{card.title}</h3>
                      {card.subtitle ? (
                        <p className="mt-2 text-[15px] font-semibold leading-snug text-navy">
                          {card.subtitle}
                        </p>
                      ) : null}
                      {card.body ? (
                        <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{card.body}</p>
                      ) : null}
                      {card.items.length > 0 ? (
                        <div className="mt-5">
                          <p className="text-[12px] font-bold tracking-[0.14em] text-muted-fg uppercase">
                            May include
                          </p>
                          <ul className="mt-3 space-y-2">
                            {card.items.map((item) => (
                              <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-muted-fg">
                                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}
                      {card.footerNote ? (
                        <p className="mt-5 border-t border-line pt-4 text-[13px] leading-relaxed text-muted-fg">
                          {card.footerNote}
                        </p>
                      ) : null}
                    </article>
                  </li>
                ))}
              </ol>
            ) : null}

            {hasWhyPartner ? (
              <div
                data-reveal
                className="relative overflow-hidden rounded-card border border-orange/20 bg-orange/[0.04] p-7 sm:p-9"
              >
                {whyPartner.kicker ? <p className="eyebrow">{whyPartner.kicker}</p> : null}
                {whyPartner.title ? (
                  <h2 className="mt-3 max-w-2xl text-[24px] font-bold leading-tight text-foreground sm:text-[30px]">
                    {whyPartner.title}
                  </h2>
                ) : null}
                {whyPartner.items.length > 0 ? (
                  <ul data-reveal data-reveal-group className="mt-8 grid gap-4 sm:grid-cols-2">
                    {whyPartner.items.map((item, index) => (
                      <li key={item.id}>
                        <article className="group guide-card h-full overflow-hidden rounded-lg border border-line bg-background p-5">
                          <span
                            className="guide-glow -end-8 -top-8 size-24 bg-orange/25"
                            aria-hidden="true"
                          />
                          <span
                            className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-300 group-hover:scale-x-100"
                            aria-hidden="true"
                          />
                          <span className="guide-num font-display text-[12px] font-bold tabular-nums text-orange/50">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="relative mt-2 text-[16px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                            {item.title}
                          </p>
                          {item.body ? (
                            <p className="relative mt-1.5 text-[14px] leading-relaxed text-muted-fg">
                              {item.body}
                            </p>
                          ) : null}
                        </article>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {whyPartner.cta ? (
                  <CmsLink href={whyPartner.cta.url} fallback="/contact" className="btn-orange mt-8 inline-flex">
                    {whyPartner.cta.label}
                  </CmsLink>
                ) : null}
              </div>
            ) : null}

            {hasOutcomes ? (
              <div
                data-reveal
                className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9"
              >
                {outcomes.kicker ? <p className="eyebrow">{outcomes.kicker}</p> : null}
                {outcomes.title ? (
                  <h2 className="mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                    {outcomes.title}
                  </h2>
                ) : null}
                {outcomeItems.length > 0 ? (
                  <ul className="mt-8 space-y-3.5">
                    {outcomeItems.map((item) => (
                      <li key={item.id} className="flex gap-3 text-[15px] leading-relaxed text-muted-fg">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                        <div>
                          <p className="text-[16px] font-semibold text-foreground">{item.title}</p>
                          {item.body ? (
                            <p className="mt-1 text-[15px] leading-relaxed text-muted-fg">{item.body}</p>
                          ) : null}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {outcomeClosing ? (
                  <p className="mt-6 border-t border-line pt-5 text-[15px] leading-relaxed text-muted-fg">
                    {outcomeClosing}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasPartnersBand ? (
        <section className="relative overflow-hidden border-t border-line bg-navy py-14 text-white lg:py-20">
          <div
            className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-teal/20 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative space-y-12">
            <div data-reveal className="max-w-3xl">
              <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-white uppercase">
                For strategic partners
              </span>
              <h2 className="mt-4 text-[28px] font-extrabold leading-tight sm:text-[36px] lg:text-[40px]">
                Partners
              </h2>
              <p className="mt-3 text-[16px] leading-relaxed text-white/75 sm:text-[17px]">
                Structured, long-term cooperation — not sponsorship alone.
              </p>
            </div>

            {hasCooperation ? (
              <div data-reveal className="max-w-3xl">
                {cooperation.kicker ? (
                  <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
                    {cooperation.kicker}
                  </p>
                ) : null}
                {cooperation.title ? (
                  <h2 className="mt-3 text-[28px] font-bold leading-tight sm:text-[36px]">
                    {cooperation.title}
                  </h2>
                ) : null}
                {cooperation.description ? (
                  <p className="mt-5 text-[16px] leading-relaxed text-white/75">{cooperation.description}</p>
                ) : null}
                {cooperation.items.length > 0 ? (
                  <div className="mt-8">
                    <p className="text-[12px] font-bold tracking-[0.14em] text-white/60 uppercase">
                      Cooperation may include
                    </p>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {cooperation.items.map((item) => (
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
                  </div>
                ) : null}
              </div>
            ) : null}

            {hasWhoWePartner ? (
              <div data-reveal>
                {whoWePartner.kicker ? (
                  <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
                    {whoWePartner.kicker}
                  </p>
                ) : null}
                {whoWePartner.title ? (
                  <h2 className="mt-3 text-[24px] font-bold leading-tight sm:text-[28px]">
                    {whoWePartner.title}
                  </h2>
                ) : null}
                {whoWePartner.description ? (
                  <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/75">
                    {whoWePartner.description}
                  </p>
                ) : null}
                {whoWePartner.pillars.length > 0 ? (
                  <ul className="mt-8 flex flex-wrap gap-3">
                    {whoWePartner.pillars.map((pillar) => (
                      <li
                        key={pillar.id}
                        className="rounded-full border border-white/20 bg-white/8 px-4 py-2 text-[14px] font-semibold text-white"
                      >
                        {pillar.title}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {hasFocusAreasVisible ? (
        <section className="border-t border-line py-14 lg:py-20">
          <div className="container-wbc">
            <div data-reveal className="max-w-3xl">
              {focusAreas.kicker ? <p className="eyebrow">{focusAreas.kicker}</p> : null}
              {focusAreas.title ? (
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                  {focusAreas.title}
                </h2>
              ) : null}
            </div>
            {focusAreas.items.length > 0 ? (
              <ul data-reveal className="mt-8 flex flex-wrap gap-3">
                {focusAreas.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-surface px-4 py-2 text-[14px] font-semibold text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      ) : null}

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
                <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
                  {process.kicker}
                </p>
              ) : null}
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

            {process.steps.length > 0 ? (
              <ol
                data-reveal
                data-reveal-group
                className={`relative mt-12 grid gap-6 ${process.steps.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
              >
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
                      <h3 className="relative mt-5 text-[20px] font-bold text-white">
                        {step.title}
                      </h3>
                      {step.body ? (
                        <p className="relative mt-3 text-[15px] leading-relaxed text-white/75">
                          {step.body}
                        </p>
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
                <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                  {cta.title}
                </h2>
              ) : null}
              {cta.description ? (
                <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                  {cta.description}
                </p>
              ) : null}
              {closingButtons.length > 0 ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {closingButtons.map((button, index) => (
                    <CmsLink
                      key={`${button.label}-${button.url}`}
                      href={button.url}
                      fallback="/contact"
                      className={
                        index === 0
                          ? "btn-orange"
                          : index === 1
                            ? "btn-navy !rounded-md"
                            : "btn-orange-to-outline !rounded-md"
                      }
                    >
                      {button.label}
                    </CmsLink>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {hasClosingCta ? null : (
        <CTASection
          title={siteCta ? cta.title.trim() || hero.title : hero.title}
          description={cta.description.trim() || hero.description}
          ctaLabel={siteCta?.label ?? "Contact Us"}
          to={siteCta ? (resolveCta(siteCta.url).ctaTo ?? "/contact") : "/contact"}
        />
      )}
    </>
  );
}
