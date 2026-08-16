import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import { OurPartners } from "@/components/OurPartners";
import networkBg from "@/assets/affiliates-hero.jpg";
import {
  PARTNER_TYPES,
  PARTNERSHIP_APPROACH,
  PARTNERSHIP_OUTCOMES,
  PARTNERSHIPS_INTRO,
} from "@/content/partners";

export const Route = createFileRoute("/global-network/strategic-partners")({
  head: () => ({
    meta: [
      { title: "Strategic Partners — World Business Council" },
      {
        name: "description",
        content:
          "WBC develops partnerships with chambers of commerce, NGOs, international organizations, governments, and private sector entities to enhance global cooperation and expand impact.",
      },
      { property: "og:title", content: "Strategic Partnerships & Institutional Relations — WBC" },
      {
        property: "og:description",
        content:
          "Developing partnerships that strengthen global cooperation across institutions, governments, and the private sector.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategicPartners,
});

function PartnerIcon({ name }: { name: (typeof PARTNER_TYPES)[number]["icon"] }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "chamber":
      return (
        <svg {...common}>
          <path d="M4 20V8l8-4 8 4v12" />
          <path d="M9 20v-5h6v5M9 11h.01M15 11h.01M9 15h.01M15 15h.01" />
        </svg>
      );
    case "ngo":
      return (
        <svg {...common}>
          <path d="M12 21s-7-4.5-7-10a7 7 0 0114 0c0 5.5-7 10-7 10z" />
          <circle cx="12" cy="11" r="2.5" />
        </svg>
      );
    case "intl":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
        </svg>
      );
    case "gov":
      return (
        <svg {...common}>
          <path d="M4 20h16M6 20V10l6-4 6 4v10M9 14h6M9 17h6" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="1.5" />
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18" />
        </svg>
      );
  }
}

function StrategicPartners() {
  return (
    <>
      <SplitHero
        eyebrow="Global Network"
        title="Strategic Partners"
        description="Developing partnerships with chambers of commerce, NGOs, international organizations, governments, and private sector entities to enhance global cooperation and expand impact."
        tags={["Institutional Relations", "Global Cooperation", "Shared Impact"]}
        image={networkBg}
        imageAlt="Global cooperation network representing WBC strategic partnerships"
        ctaLabel="Partner with WBC"
        ctaTo="/contact"
      />

      {/* Intro — split with ambient motion */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-navy/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p data-reveal className="eyebrow">
              {PARTNERSHIPS_INTRO.eyebrow}
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]"
            >
              {PARTNERSHIPS_INTRO.title}
            </h2>
            <span data-reveal className="accent-rule mt-5" />
            <p data-reveal className="mt-6 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              {PARTNERSHIPS_INTRO.body}
            </p>
            <div data-reveal className="mt-8">
              <Link to="/contact" className="link-arrow">
                Discuss a partnership
                <span aria-hidden="true" className="link-arrow-icon rtl-mirror">
                  →
                </span>
              </Link>
            </div>
          </div>

          <div
            data-reveal
            className="group relative min-h-[280px] overflow-hidden rounded-card border border-line lg:min-h-[360px]"
          >
            <img
              src={networkBg}
              alt=""
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="card-zoom-img absolute inset-0 size-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/35 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-[12px] font-bold tracking-[0.18em] text-white/70 uppercase">Institutional reach</p>
              <p className="mt-2 max-w-sm text-[20px] font-bold leading-snug text-white sm:text-[22px]">
                Chambers, NGOs, governments, and enterprises — cooperating as one network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Five pathways — interactive cards */}
      <section className="relative overflow-hidden border-t border-line bg-surface/50 py-16 lg:py-24">
        <div
          className="pointer-events-none absolute end-[-10%] top-[-20%] size-[420px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow">
              Who we partner with
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]"
            >
              Five partnership pathways
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Each pathway strengthens institutional relations and opens practical routes for international cooperation.
            </p>
            <span data-reveal className="accent-rule mt-6" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((p, i) => {
              const featured = i === 0 || i === 3;
              return (
                <li key={p.title} className={i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
                  <article
                    className={`group relative flex h-full flex-col overflow-hidden rounded-card p-6 transition-all duration-300 sm:p-7 ${
                      featured
                        ? "bg-navy text-white shadow-card hover:-translate-y-1 hover:shadow-lg"
                        : "border border-line bg-background hover:-translate-y-1 hover:border-orange/35 hover:shadow-card"
                    }`}
                  >
                    <span
                      className={`pointer-events-none absolute -end-8 -top-8 size-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                        featured ? "bg-orange/25" : "bg-orange/10"
                      }`}
                      aria-hidden="true"
                    />
                    <div className="relative flex items-start justify-between gap-3">
                      <span
                        className={`inline-flex size-11 items-center justify-center transition-colors duration-300 ${
                          featured
                            ? "bg-white/10 text-white"
                            : "bg-orange/10 text-foreground group-hover:bg-orange/15"
                        }`}
                      >
                        <PartnerIcon name={p.icon} />
                      </span>
                      <span
                        className={`font-display text-[24px] leading-none font-bold tabular-nums ${
                          featured ? "text-white/25" : "text-orange/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3
                      className={`relative mt-6 text-[18px] font-bold leading-snug sm:text-[19px] ${
                        featured ? "text-white" : "text-foreground"
                      }`}
                    >
                      {p.title}
                    </h3>
                    <p
                      className={`relative mt-3 flex-1 text-[14px] leading-relaxed sm:text-[15px] ${
                        featured ? "text-white/80" : "text-muted-fg"
                      }`}
                    >
                      {p.body}
                    </p>
                    <span
                      className={`relative mt-6 block h-0.5 w-8 origin-left transition-transform duration-300 group-hover:scale-x-150 ${
                        featured ? "bg-orange" : "bg-navy"
                      }`}
                      aria-hidden="true"
                    />
                  </article>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Outcomes */}
      <section className="relative overflow-hidden border-t border-line py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -start-16 bottom-0 size-[300px] rounded-full bg-teal/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal className="eyebrow">
              Why it matters
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-navy sm:text-[36px]"
            >
              What strategic partnerships deliver
            </h2>
            <span data-reveal className="accent-rule mx-auto mt-5" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 md:grid-cols-3">
            {PARTNERSHIP_OUTCOMES.map((o, i) => (
              <li key={o.title}>
                <article className="group relative h-full overflow-hidden rounded-card border border-line bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-lg sm:p-8">
                  <span
                    className="pointer-events-none absolute -end-10 -top-10 size-32 rounded-full bg-orange/10 transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex size-11 items-center justify-center bg-navy text-[13px] font-bold tabular-nums text-white transition-colors duration-300 group-hover:bg-orange">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-5 text-[18px] font-bold text-navy transition-colors duration-300 group-hover:text-teal">
                    {o.title}
                  </h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-muted-fg">{o.body}</p>
                  <span
                    className="relative mt-6 block h-0.5 w-8 origin-left bg-navy transition-transform duration-300 group-hover:scale-x-150"
                    aria-hidden="true"
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Approach — cinematic navy */}
      <section className="relative isolate overflow-hidden bg-navy py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -end-16 top-0 size-[360px] rounded-full bg-orange/20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -start-20 bottom-0 size-[300px] rounded-full bg-teal/15 blur-3xl"
          aria-hidden="true"
        />
        {/* Soft orbit rings */}
        <div
          className="pointer-events-none absolute start-1/2 top-1/2 hidden size-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 lg:block"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute start-1/2 top-1/2 hidden size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5 lg:block"
          aria-hidden="true"
        />

        <div className="container-wbc relative">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
              How we work
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[42px]"
            >
              Partnership approach
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-white/80">
              From first conversation to shared delivery — a clear process that keeps institutional relations practical
              and accountable.
            </p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            <span
              className="pointer-events-none absolute top-[2.75rem] start-[16%] end-[16%] hidden h-px bg-gradient-to-r from-transparent via-white/30 to-transparent md:block"
              aria-hidden="true"
            />
            {PARTNERSHIP_APPROACH.map((step) => (
              <li key={step.step}>
                <article className="group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/5 p-7 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:bg-white/10 sm:p-8">
                  <span
                    className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/15 transition-transform duration-500 group-hover:scale-150"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex size-12 items-center justify-center bg-orange text-[15px] font-bold tabular-nums text-white shadow-[0_0_24px_rgba(255,106,0,0.35)] transition-transform duration-300 group-hover:scale-105">
                    {step.step}
                  </span>
                  <h3 className="relative mt-6 text-[20px] font-bold text-white">{step.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-white/75">{step.body}</p>
                </article>
              </li>
            ))}
          </ol>

          <div data-reveal className="mt-12 text-center">
            <Link to="/contact" className="btn-orange">
              Start a partnership conversation
            </Link>
          </div>
        </div>
      </section>

      <OurPartners />

      <CTASection
        title="Explore the wider network"
        description="See how headquarters, affiliates, members, and partners work together."
        ctaLabel="Global Network"
        to="/global-network"
      />
    </>
  );
}
