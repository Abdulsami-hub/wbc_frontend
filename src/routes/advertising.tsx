import { createFileRoute, Link } from "@tanstack/react-router";
import eventsImg from "@/assets/events.jpg";
import forumImg from "@/assets/news-forum.jpg";
import membershipImg from "@/assets/membership.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import {
  ADVERTISING_ESSENTIALS,
  ADVERTISING_PACKAGES,
  ADVERTISING_PROCESS,
} from "@/content/advertising";

export const Route = createFileRoute("/advertising")({
  head: () => ({
    meta: [
      { title: "Advertising & Sponsorship — World Business Council" },
      {
        name: "description",
        content:
          "Explore WBC advertising and sponsorship opportunities: event sponsorship, digital features, partnership packages, pricing, and how to book.",
      },
      { property: "og:title", content: "Advertising & Sponsorship — WBC" },
      {
        property: "og:description",
        content: "Pricing, inclusions, and booking information for WBC advertising opportunities.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdvertisingPage,
});

const PACKAGE_VISUALS = [
  { image: eventsImg, alt: "Business audience at a WBC sponsored programme" },
  { image: forumImg, alt: "International business forum stage and audience" },
  { image: membershipImg, alt: "Professionals collaborating in a WBC partnership setting" },
] as const;

function AdvertisingPage() {
  return (
    <>
      <SplitHero
        eyebrow="Grow with WBC"
        title="Advertising & Sponsorship Details"
        description="Explore pricing, inclusions, and booking information for WBC advertising opportunities. All rates are indicative — our team will tailor a proposal to your goals and timeline."
        tags={["Events", "Digital", "Partnerships"]}
        image={eventsImg}
        imageAlt="Business audience at a WBC sponsored programme"
        tone="blue"
        ctaLabel="Request a Proposal"
        ctaTo="/contact"
      />

      {/* Overview strip */}
      <section className="relative overflow-hidden border-t border-line py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -end-24 top-0 size-[320px] rounded-full bg-blue/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -start-16 bottom-0 size-[260px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Packages</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]">
              Choose how you show up with WBC
            </h2>
            <span className="accent-rule mx-auto mt-5" />
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              From flagship event sponsorship to digital features and annual partnership packages — every option is
              built to put your brand in front of institutional and corporate decision-makers.
            </p>
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-3">
            {ADVERTISING_PACKAGES.map((pkg, i) => (
              <li key={pkg.id}>
                <a
                  href={`#${pkg.id}`}
                  className="group guide-card relative block h-full overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-7"
                >
                  <span className="guide-glow -end-10 -top-10 size-36 bg-orange/25" aria-hidden="true" />
                  <span className="guide-num font-display text-[28px] font-bold tabular-nums text-blue/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 text-[18px] font-bold text-foreground transition-colors group-hover:text-navy sm:text-[19px]">
                    {pkg.title}
                  </h3>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-muted-fg">{pkg.summary}</p>
                  <span className="guide-accent mt-6" aria-hidden="true" />
                  <span className="relative mt-4 inline-flex items-center gap-1.5 text-[12px] font-bold tracking-[0.08em] text-orange uppercase">
                    View tiers
                    <span className="transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Package detail sections */}
      {ADVERTISING_PACKAGES.map((pkg, pkgIndex) => {
        const visual = PACKAGE_VISUALS[pkgIndex] ?? PACKAGE_VISUALS[0];
        const reverse = pkgIndex % 2 === 1;

        return (
          <section
            key={pkg.id}
            id={pkg.id}
            className={`relative scroll-mt-28 overflow-hidden border-t border-line py-16 lg:py-24 ${
              pkgIndex % 2 === 1 ? "bg-surface" : "bg-background"
            }`}
          >
            <div
              className={`pointer-events-none absolute size-[340px] rounded-full blur-3xl ${
                reverse ? "-start-20 top-10 bg-blue/10" : "-end-20 top-16 bg-orange/10"
              }`}
              aria-hidden="true"
            />

            <div className="container-wbc relative">
              <div
                className={`grid items-center gap-10 lg:gap-14 ${
                  reverse ? "lg:grid-cols-[1fr_1.15fr]" : "lg:grid-cols-[1.15fr_1fr]"
                }`}
              >
                <div data-reveal className={reverse ? "lg:order-2" : undefined}>
                  <p className="font-display text-[12px] tracking-[0.22em] text-blue uppercase">
                    Package {String(pkgIndex + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                    {pkg.title}
                  </h2>
                  <span className="accent-rule mt-5" />
                  <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                    {pkg.summary}
                  </p>
                  {pkg.notes?.map((note) => (
                    <p
                      key={note}
                      className="mt-5 max-w-xl border-s-2 border-orange/50 ps-4 text-[14px] leading-relaxed text-muted-fg"
                    >
                      {note}
                    </p>
                  ))}
                </div>

                <div
                  data-reveal
                  className={`group relative overflow-hidden rounded-card border border-line shadow-card ${
                    reverse ? "lg:order-1" : undefined
                  }`}
                >
                  <img
                    src={visual.image}
                    alt={visual.alt}
                    width={900}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <p className="absolute inset-x-0 bottom-0 p-5 text-[13px] font-semibold tracking-[0.12em] text-white uppercase sm:p-6">
                    {pkg.title}
                  </p>
                </div>
              </div>

              <ul data-reveal data-reveal-group className="mt-12 grid gap-5 lg:grid-cols-2">
                {pkg.tiers.map((tier, tierIndex) => (
                  <li key={tier.name}>
                    <article className="group guide-card relative h-full overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-7">
                      <span
                        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-orange via-blue to-transparent transition-transform duration-500 group-hover:scale-x-100"
                        aria-hidden="true"
                      />
                      <span className="guide-glow -end-12 -top-12 size-40 bg-blue/20" aria-hidden="true" />

                      <div className="relative flex flex-wrap items-start justify-between gap-4">
                        <div>
                          <span className="text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                            Tier {String(tierIndex + 1).padStart(2, "0")}
                          </span>
                          <h3 className="mt-2 text-[18px] font-bold text-foreground sm:text-[20px]">{tier.name}</h3>
                        </div>
                        <p className="text-end">
                          <span className="block text-[24px] font-bold text-orange transition-transform duration-300 group-hover:scale-105">
                            {tier.price}
                          </span>
                          <span className="text-[11px] font-semibold tracking-[0.1em] text-muted-fg uppercase">
                            {tier.period}
                          </span>
                        </p>
                      </div>

                      <ul className="relative mt-6 space-y-3">
                        {tier.includes.map((item) => (
                          <li
                            key={item}
                            className="flex gap-3 text-[14px] leading-snug text-muted-fg transition-colors duration-300 group-hover:text-foreground/80 sm:text-[15px]"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue/10 text-blue transition-colors duration-300 group-hover:bg-blue group-hover:text-white">
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.8"
                                aria-hidden="true"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* Essentials */}
      <section className="relative overflow-hidden border-t border-line bg-navy py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -end-16 top-8 size-[300px] rounded-full bg-orange/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -start-20 bottom-0 size-[280px] rounded-full bg-blue/25 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="max-w-2xl">
            <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">Essentials</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">Good to know</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">
              Practical details that help you plan timelines, creative, and budget with confidence.
            </p>
          </div>

          <dl data-reveal data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ADVERTISING_ESSENTIALS.map((item, i) => (
              <div
                key={item.label}
                className="group essentials-card rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm sm:p-7"
              >
                <span className="essentials-glow -end-8 -top-8 size-24" aria-hidden="true" />
                <dt className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                  {String(i + 1).padStart(2, "0")} · {item.label}
                </dt>
                <dd className="relative mt-3 text-[15px] leading-relaxed text-white/85">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Process */}
      <section className="relative isolate overflow-hidden border-t border-line py-16 lg:py-24">
        <div
          className="pointer-events-none absolute start-1/2 top-20 size-[420px] -translate-x-1/2 rounded-full bg-blue/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How booking works</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              From enquiry to launch
            </h2>
            <span className="accent-rule mx-auto mt-5" />
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg">
              A clear three-step path so your campaign is scoped, priced, and live on schedule.
            </p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-14 grid gap-6 lg:grid-cols-3">
            <span
              className="guide-process-line pointer-events-none absolute top-10 start-[16%] end-[16%] hidden h-px bg-gradient-to-r from-transparent via-blue/60 to-transparent lg:block"
              aria-hidden="true"
            />
            {ADVERTISING_PROCESS.map((step) => (
              <li key={step.step}>
                <article className="group guide-card relative h-full overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-8">
                  <span className="guide-glow -end-10 -top-10 size-36 bg-blue/25" aria-hidden="true" />
                  <span className="relative inline-flex size-12 items-center justify-center bg-navy text-[14px] font-bold tabular-nums text-white transition-all duration-300 group-hover:scale-110 group-hover:bg-orange">
                    {step.step}
                  </span>
                  <h3 className="relative mt-5 text-[20px] font-bold text-foreground">{step.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-muted-fg">{step.body}</p>
                  <span className="guide-accent mt-6" aria-hidden="true" />
                </article>
              </li>
            ))}
          </ol>

          <div
            data-reveal
            className="group relative mt-14 overflow-hidden rounded-card border border-line bg-surface p-8 transition-shadow duration-500 hover:shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-12"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-40 bg-gradient-to-r from-orange via-blue to-transparent transition-transform duration-700 group-hover:scale-x-100"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow">Next step</p>
              <h3 className="mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                Ready to build your visibility plan?
              </h3>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                Tell us your goals and timeline — we’ll prepare a tailored proposal within three business days.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap gap-3 lg:mt-0 lg:shrink-0">
              <Link to="/contact" className="btn-orange-to-outline !min-h-9 !rounded-md !px-4 !text-[12px]">
                Request a proposal
              </Link>
              <Link
                to="/"
                hash="advertising"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                Back to overview
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Put your brand in front of the WBC network"
        description="Sponsorships, digital features, and partnership packages designed for institutional reach and lasting visibility."
        ctaLabel="Contact WBC"
        to="/contact"
      />
    </>
  );
}
