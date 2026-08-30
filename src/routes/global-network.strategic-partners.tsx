import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { PartnersDirectory } from "@/components/PartnersDirectory";
import partnersHero from "@/assets/partners-hero.png";
import {
  HOW_IT_WORKS,
  PARTNERS_PAGE_CTA,
  PARTNERS_PAGE_HERO,
  SPONSORSHIP_OPPORTUNITIES,
  SPONSORSHIP_SUPPORTS,
  SPONSORSHIP_TYPES,
  STRATEGIC_PARTNERS_SECTION,
  WHERE_WE_CREATE_VALUE,
  WHO_CAN_PARTNER,
  WHY_SPONSOR,
} from "@/content/partners-page";

export const Route = createFileRoute("/global-network/strategic-partners")({
  head: () => ({
    meta: [
      { title: "Partners and Sponsors — World Business Council" },
      {
        name: "description",
        content:
          "Support global business, increase your visibility, and create opportunities through WBC sponsorships and strategic partnerships.",
      },
      { property: "og:title", content: "Partners and Sponsors — WBC" },
      {
        property: "og:description",
        content:
          "WBC works with institutions, businesses, and media organizations through sponsorships and strategic partnerships worldwide.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategicPartners,
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

function StrategicPartners() {
  return (
    <>
      <SplitHero
        eyebrow={PARTNERS_PAGE_HERO.eyebrow}
        title={PARTNERS_PAGE_HERO.title}
        description={PARTNERS_PAGE_HERO.description}
        tags={[...PARTNERS_PAGE_HERO.tags]}
        image={partnersHero}
        imageAlt="Business partners shaking hands across a conference table"
        tone="orange"
        ctaLabel={PARTNERS_PAGE_HERO.ctaLabel}
        ctaTo={PARTNERS_PAGE_HERO.ctaTo}
      />

      <PartnersDirectory />

      {/* Sponsorship Opportunities */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="max-w-3xl">
            <p className="eyebrow">{SPONSORSHIP_OPPORTUNITIES.kicker}</p>
            <h2 className="mt-3 max-w-2xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
              {SPONSORSHIP_OPPORTUNITIES.title}
            </h2>
            <span className="accent-rule mt-6" />
            <p className="mt-8 max-w-2xl text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
              {SPONSORSHIP_OPPORTUNITIES.description}
            </p>
          </div>

          <div data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-3">
            {SPONSORSHIP_TYPES.map((type, i) => (
              <article
                key={type.title}
                className="group guide-card flex h-full flex-col border border-line bg-background p-6 sm:p-7"
              >
                <span className="guide-glow -end-10 -top-10 size-28 bg-orange/20" aria-hidden="true" />
                <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-orange/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-4 text-[19px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                  {type.title}
                </h3>
                <p className="relative mt-2 text-[14px] font-semibold text-orange">{type.subtitle}</p>
                <p className="relative mt-3 text-[15px] leading-relaxed text-muted-fg">{type.description}</p>
                {type.items.length > 0 ? (
                  <div className="relative mt-5">
                    <p className="text-[12px] font-bold tracking-[0.12em] text-muted-fg uppercase">May include</p>
                    <ul className="mt-3 space-y-2">
                      {type.items.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-muted-fg">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {type.footer ? (
                  <p className="relative mt-5 border-t border-line pt-5 text-[14px] leading-relaxed text-muted-fg">
                    {type.footer}
                  </p>
                ) : null}
                <span className="guide-accent relative mt-auto pt-6" aria-hidden="true" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sponsor + What Supports */}
      <section className="border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9">
            <span className="guide-glow -end-10 -top-10 size-36 bg-orange/20" aria-hidden="true" />
            <p className="relative eyebrow">{WHY_SPONSOR.kicker}</p>
            <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">{WHY_SPONSOR.title}</h2>
            <p className="relative mt-4 text-[14px] font-semibold text-muted-fg">Sponsors may benefit from:</p>
            <div className="relative mt-6">
              <CheckList items={WHY_SPONSOR.items} />
            </div>
          </div>

          <div data-reveal className="group relative overflow-hidden rounded-card bg-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-9">
            <span
              className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <p className="relative text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">
              {SPONSORSHIP_SUPPORTS.kicker}
            </p>
            <h2 className="relative mt-3 text-[24px] font-bold leading-snug sm:text-[28px]">{SPONSORSHIP_SUPPORTS.title}</h2>
            <div className="relative mt-8">
              <CheckList items={SPONSORSHIP_SUPPORTS.items} dark />
            </div>
            <p className="relative mt-8 border-t border-white/15 pt-6 text-[15px] leading-relaxed text-white/75">
              {SPONSORSHIP_SUPPORTS.closing}
            </p>
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc grid items-start gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <div data-reveal>
            <p className="eyebrow">{STRATEGIC_PARTNERS_SECTION.kicker}</p>
            <h2 className="mt-3 max-w-xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              {STRATEGIC_PARTNERS_SECTION.title}
            </h2>
            <span className="accent-rule mt-6" />
            <p className="mt-8 max-w-xl text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
              {STRATEGIC_PARTNERS_SECTION.description}
            </p>
            <p className="mt-6 text-[14px] font-semibold text-foreground">Cooperation may include:</p>
          </div>
          <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-8">
            <CheckList items={STRATEGIC_PARTNERS_SECTION.items} />
          </div>
        </div>
      </section>

      {/* Who Can Partner */}
      <section className="relative overflow-hidden border-t border-line bg-surface/50 py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-navy/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">{WHO_CAN_PARTNER.kicker}</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              {WHO_CAN_PARTNER.title}
            </h2>
            <span className="accent-rule mt-6" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {WHO_CAN_PARTNER.items.map((item, i) => (
              <li key={item}>
                <article className="group guide-card flex h-full items-start gap-4 border border-line bg-background p-5 sm:p-6">
                  <span className="guide-num relative shrink-0 font-display text-[13px] font-bold tabular-nums text-orange/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-[16px] font-bold leading-snug text-foreground transition-colors duration-300 group-hover:text-navy">
                    {item}
                  </h3>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Where We Create Value */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{WHERE_WE_CREATE_VALUE.kicker}</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              {WHERE_WE_CREATE_VALUE.title}
            </h2>
            <span className="accent-rule mx-auto mt-6" />
          </div>
          <div data-reveal className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-3">
            {WHERE_WE_CREATE_VALUE.items.map((item, i) => (
              <span key={item} className="inline-flex items-center gap-3 text-[15px] text-muted-fg sm:text-[16px]">
                {i > 0 ? <span className="hidden text-orange sm:inline" aria-hidden="true">·</span> : null}
                <span className="rounded-full border border-line bg-background px-4 py-2 font-medium text-foreground transition-colors hover:border-orange/35">
                  {item}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">{HOW_IT_WORKS.kicker}</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">{HOW_IT_WORKS.title}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">{HOW_IT_WORKS.description}</p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {HOW_IT_WORKS.steps.map((step) => (
              <li key={step.step}>
                <article className="group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange/40 hover:bg-white/10 sm:p-7">
                  <span
                    className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange/25"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex size-12 items-center justify-center bg-orange text-[14px] font-bold tabular-nums text-white transition-transform duration-300 group-hover:scale-110">
                    {step.step}
                  </span>
                  <h3 className="relative mt-5 text-[18px] font-bold text-white">{step.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-white/75">{step.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Closing CTA */}
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
            <p className="eyebrow">{PARTNERS_PAGE_CTA.kicker}</p>
            <h2 className="mt-3 max-w-2xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              {PARTNERS_PAGE_CTA.title}
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              {PARTNERS_PAGE_CTA.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {PARTNERS_PAGE_CTA.buttons.map((btn, i) => (
                <Link
                  key={btn.label}
                  to={btn.to}
                  className={i === 0 ? "btn-orange" : "btn-navy !rounded-md"}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
