import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import { OurPartners } from "@/components/OurPartners";
import networkBg from "@/assets/network-bg.jpg";

export const Route = createFileRoute("/global-network/strategic-partners")({
  head: () => ({
    meta: [
      { title: "Strategic Partnerships & Institutional Relations — World Business Council" },
      {
        name: "description",
        content:
          "WBC develops partnerships with chambers of commerce, NGOs, international organizations, governments, and private sector entities to enhance global cooperation and expand impact.",
      },
      { property: "og:title", content: "Strategic Partnerships — WBC" },
      {
        property: "og:description",
        content:
          "Partner with WBC to strengthen international cooperation, trade, investment, and shared institutional impact.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategicPartners,
});

const PARTNER_TYPES = [
  {
    title: "Chambers of Commerce",
    body: "Collaborate with national and local chambers to connect member businesses with WBC programmes, trade initiatives, and cross-border opportunities.",
  },
  {
    title: "NGOs",
    body: "Work with non-governmental organizations on shared development goals, inclusive growth, and community-focused business cooperation.",
  },
  {
    title: "International Organizations",
    body: "Align with multilateral institutions to amplify dialogue on trade, investment, innovation, and sustainable economic cooperation.",
  },
  {
    title: "Governments",
    body: "Engage public-sector partners to support institutional dialogue, market access pathways, and policy-relevant business programmes.",
  },
  {
    title: "Private Sector Entities",
    body: "Partner with companies and enterprise groups to deliver joint initiatives, sponsorships, and practical commercial collaboration.",
  },
] as const;

const IMPACT = [
  {
    title: "Enhance global cooperation",
    body: "Build trusted bridges between institutions, markets, and business communities across regions.",
  },
  {
    title: "Expand shared impact",
    body: "Combine networks, expertise, and programmes to deliver stronger outcomes than any partner could alone.",
  },
  {
    title: "Advance institutional relations",
    body: "Strengthen long-term relationships with public and private stakeholders through structured engagement.",
  },
  {
    title: "Unlock practical opportunities",
    body: "Translate partnerships into events, introductions, joint projects, and visible collaboration.",
  },
] as const;

const FOCUS_AREAS = [
  "Joint forums, conferences, and institutional dialogues",
  "Trade, investment, and market-access programmes",
  "Capacity building and professional development",
  "Research, publications, and policy-relevant insights",
  "Regional initiatives with affiliates and members",
  "Co-branded campaigns and network visibility",
] as const;

const PROCESS = [
  {
    step: "01",
    title: "Share priorities",
    body: "Tell us your institutional goals, regions of focus, and the type of partnership you want to build.",
  },
  {
    step: "02",
    title: "Shape the collaboration",
    body: "WBC aligns scope, roles, and deliverables so the partnership is practical, accountable, and mission-aligned.",
  },
  {
    step: "03",
    title: "Launch & grow",
    body: "Activate joint activities, track outcomes, and expand cooperation across the WBC global network.",
  },
] as const;

function StrategicPartners() {
  return (
    <>
      <SplitHero
        eyebrow="Strategic Partnerships & Institutional Relations"
        title="Partner with WBC"
        description="Developing partnerships with chambers of commerce, NGOs, international organizations, governments, and private sector entities to enhance global cooperation and expand impact."
        tags={["Chambers", "Institutions", "Private Sector"]}
        image={networkBg}
        imageAlt="Global cooperation network representing WBC strategic partnerships"
        ctaLabel="Partner with WBC"
        ctaTo="/contact"
      />

      {/* Overview */}
      <section className="relative overflow-hidden py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative grid items-start gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
          <div data-reveal>
            <p className="eyebrow">Our approach</p>
            <h2 className="mt-3 max-w-2xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
              Building institutional partnerships that create lasting cooperation
            </h2>
            <span className="accent-rule mt-6" />
            <p className="mt-8 max-w-2xl text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
              Strategic Partnerships & Institutional Relations is how WBC connects with chambers of commerce, NGOs,
              international organizations, governments, and private sector entities. Together, we enhance global
              cooperation and expand shared impact across markets and communities.
            </p>
            <p className="mt-5 max-w-2xl text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
              Partnerships are designed to be practical and accountable — from joint programmes and institutional
              dialogues to long-term collaboration that strengthens the WBC network worldwide.
            </p>
          </div>

          <aside data-reveal className="group guide-card rounded-card border border-line bg-surface p-7 sm:p-8">
            <span className="guide-glow -end-10 -top-10 size-36 bg-orange/20" aria-hidden="true" />
            <p className="relative text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Why partner</p>
            <ul className="relative mt-5 space-y-4">
              {IMPACT.slice(0, 3).map((item) => (
                <li key={item.title} className="border-b border-line pb-4 last:border-0 last:pb-0">
                  <p className="text-[16px] font-bold text-foreground">{item.title}</p>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-muted-fg">{item.body}</p>
                </li>
              ))}
            </ul>
            <Link to="/contact" className="btn-orange mt-7 relative inline-flex">
              Start a partnership conversation
            </Link>
          </aside>
        </div>
      </section>

      {/* Partner types */}
      <section className="relative overflow-hidden border-t border-line bg-surface/50 py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-navy/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Who we partner with</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              Five pillars of institutional partnership
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              WBC develops strategic relationships across public, private, and civil-society ecosystems.
            </p>
            <span className="accent-rule mt-6" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_TYPES.map((p, i) => (
              <li key={p.title} className={i === 3 || i === 4 ? "lg:col-span-1" : ""}>
                <article className="group guide-card flex h-full flex-col border border-line bg-background p-6 sm:p-7">
                  <span className="guide-glow -end-10 -top-10 size-28 bg-orange/20" aria-hidden="true" />
                  <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-orange/60">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 text-[19px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                    {p.title}
                  </h3>
                  <p className="relative mt-3 flex-1 text-[15px] leading-relaxed text-muted-fg">{p.body}</p>
                  <span className="guide-accent relative mt-6" aria-hidden="true" />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Impact + focus */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9">
            <span className="guide-glow -end-10 -top-10 size-36 bg-navy/15" aria-hidden="true" />
            <p className="relative eyebrow">Outcomes</p>
            <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
              Enhance cooperation. Expand impact.
            </h2>
            <ul className="relative mt-8 space-y-5">
              {IMPACT.map((item, i) => (
                <li key={item.title} className="flex gap-4">
                  <span className="font-display text-[13px] font-bold tabular-nums text-orange/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="text-[16px] font-bold text-foreground">{item.title}</p>
                    <p className="mt-1 text-[15px] leading-relaxed text-muted-fg">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div data-reveal className="group relative overflow-hidden rounded-card bg-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-9">
            <span
              className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <p className="relative text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">Focus areas</p>
            <h2 className="relative mt-3 text-[24px] font-bold leading-snug sm:text-[28px]">
              Where partnerships create value
            </h2>
            <ul className="relative mt-8 space-y-3.5">
              {FOCUS_AREAS.map((item) => (
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
        </div>
      </section>

      {/* Process */}
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
            <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">How it works</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">
              From conversation to collaboration
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">
              A clear pathway to build strategic partnerships and institutional relations with WBC.
            </p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-12 grid gap-6 lg:grid-cols-3">
            <span
              className="guide-process-line pointer-events-none absolute top-8 start-[16%] end-[16%] hidden h-px bg-gradient-to-r from-transparent via-orange/70 to-transparent lg:block"
              aria-hidden="true"
            />
            {PROCESS.map((step) => (
              <li key={step.step}>
                <article className="group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange/40 hover:bg-white/10 sm:p-7">
                  <span
                    className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/0 transition-all duration-500 group-hover:scale-150 group-hover:bg-orange/25"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex size-12 items-center justify-center bg-orange text-[14px] font-bold tabular-nums text-white transition-transform duration-300 group-hover:scale-110">
                    {step.step}
                  </span>
                  <h3 className="relative mt-5 text-[20px] font-bold text-white">{step.title}</h3>
                  <p className="relative mt-3 text-[15px] leading-relaxed text-white/75">{step.body}</p>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Partner logos / network strip */}
      <OurPartners />

      {/* Closing CTA */}
      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div
            data-reveal
            className="group relative grid items-center gap-8 overflow-hidden rounded-card border border-line bg-background p-8 transition-shadow duration-500 hover:shadow-card sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:p-14"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-50 bg-gradient-to-r from-orange via-orange/60 to-transparent transition-transform duration-700 group-hover:scale-x-100"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow">Next step</p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                Ready to build a strategic partnership?
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                If your chamber, NGO, international organization, government body, or private-sector entity wants to
                expand cooperation with WBC, we invite you to start a conversation.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-orange">
                  Partner with WBC
                </Link>
                <Link to="/global-network" className="btn-navy !rounded-md">
                  Explore the network
                </Link>
              </div>
            </div>
            <div className="hidden border border-line bg-surface p-7 transition-colors duration-300 group-hover:border-orange/30 lg:block">
              <p className="text-[12px] font-bold tracking-[0.14em] text-muted-fg uppercase">Related</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <Link to="/affiliates" className="card-link text-[15px]">
                    WBC Affiliates
                    <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/our-members" className="card-link text-[15px]">
                    Institutional Members
                    <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/what-we-do" className="card-link text-[15px]">
                    What We Do
                    <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                      →
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Strengthen global cooperation with WBC"
        description="Connect with the WBC team to discuss strategic partnerships and institutional relations."
        ctaLabel="Contact Us"
        to="/contact"
      />
    </>
  );
}
