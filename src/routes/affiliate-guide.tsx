import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import networkBg from "@/assets/network-bg.jpg";

export const Route = createFileRoute("/affiliate-guide")({
  head: () => ({
    meta: [
      { title: "WBC Affiliate Establishment Guide — World Business Council" },
      {
        name: "description",
        content:
          "Establish an official WBC Affiliate. Learn about Country and City Affiliates, requirements, application process, support, and governance.",
      },
      { property: "og:title", content: "WBC Affiliate Establishment Guide" },
      {
        property: "og:description",
        content: "Join a global network connecting businesses and creating opportunities through official WBC Affiliates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliateGuide,
});

const WHY_ESTABLISH = [
  "Represent the World Business Council within your territory",
  "Connect local businesses with international business networks",
  "Promote trade, investment, and economic cooperation",
  "Organize business events, forums, conferences, and professional activities",
  "Support entrepreneurs, companies, and institutions",
  "Facilitate access to international opportunities and partnerships",
  "Participate in WBC global initiatives and programs",
  "Join the WBC Leadership Forums and connect with global business leaders",
] as const;

const COUNTRY_SUPPORT = [
  "Representation of WBC and its members to national governments and institutions",
  "Development of national business initiatives and programs",
  "Coordination and cooperation between WBC Affiliates within the country",
  "Promotion of international trade, investment, and business cooperation",
  "Representation of the interests of the business community at the national level",
] as const;

const CITY_SUPPORT = [
  "Representing WBC and its members before local governments, institutions, and stakeholders",
  "Developing local business networks and professional connections",
  "Organizing business networking events, forums, and programs",
  "Recruiting and supporting WBC members",
  "Facilitating access to business opportunities and partnerships",
  "Connecting local businesses with the global WBC network",
] as const;

const WHO_CAN_APPLY = [
  "Chambers of commerce",
  "Business councils",
  "Business associations",
  "Professional organizations",
  "Companies and business groups",
  "Universities and institutions",
  "Business leaders and entrepreneurs",
  "Existing WBC members",
  "Other organizations aligned with WBC objectives",
] as const;

const REQUIREMENTS = [
  "Alignment with WBC’s mission, values, and objectives",
  "Professional reputation, integrity, and credibility",
  "Understanding of the local business environment",
  "Ability to develop business activities and partnerships",
  "Capacity to promote WBC membership and services",
  "Commitment to comply with WBC policies, standards, and guidelines",
] as const;

const APPLICATION_INCLUDES = [
  "Applicant information and background",
  "Proposed Affiliate type and territory",
  "Proposed leadership structure",
  "Development objectives and strategy",
  "Planned activities and programs",
  "Local business engagement approach",
  "Any additional information requested by WBC",
] as const;

const EVALUATION_CRITERIA = [
  "Strategic importance of the proposed territory",
  "Applicant qualifications and experience",
  "Local business environment and opportunities",
  "Leadership capacity",
  "Operational capability",
  "Alignment with WBC objectives and standards",
] as const;

const ACCREDITATION_STEPS = [
  "Receive the invoice and process the annual Affiliation Fees",
  "Sign the WBC Affiliate Accreditation Agreement",
  "Receive an official Affiliate Accreditation Certificate",
  "Operate under the WBC name and brand",
  "Begin activities according to the approved development plan",
] as const;

const HQ_SUPPORT = [
  { title: "Official recognition", body: "International credibility under the WBC brand." },
  { title: "Global network access", body: "Connect with businesses and organizations worldwide." },
  { title: "Strategic guidance", body: "Institutional support from WBC Headquarters." },
  { title: "Brand & communications", body: "Branding and communication support for local programmes." },
  { title: "International programmes", body: "Participation in WBC initiatives and events." },
  { title: "Partnership opportunities", body: "Cooperation pathways across the global network." },
] as const;

const GOVERNANCE = [
  "Operate in accordance with WBC Statutes, policies, and standards",
  "Protect the reputation and integrity of the WBC brand",
  "Maintain professional and ethical conduct",
  "Submit required reports and information to WBC Headquarters",
  "Support the development of the WBC global network",
] as const;

const TOC = [
  { id: "overview", label: "Overview" },
  { id: "why", label: "Why establish" },
  { id: "types", label: "Affiliate types" },
  { id: "eligibility", label: "Who can apply" },
  { id: "process", label: "Application process" },
  { id: "support", label: "Headquarters support" },
  { id: "compliance", label: "Governance" },
] as const;

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

function AffiliateGuide() {
  return (
    <>
      <SplitHero
        eyebrow="WBC Affiliate Establishment Guide"
        title="Establish an Official WBC Affiliate"
        description="Join a Global Network Connecting Businesses and Creating Opportunities"
        tags={["Country Affiliates", "City Affiliates", "Accreditation"]}
        image={networkBg}
        imageAlt="Global network map representing WBC affiliate development"
        tone="blue"
        ctaLabel="Fill the Application Form"
        ctaTo="/contact"
      />

      {/* Overview + TOC */}
      <section id="overview" className="scroll-mt-28 relative overflow-hidden py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative grid gap-10 lg:grid-cols-[1fr_280px] lg:gap-14">
          <div data-reveal>
            <p className="eyebrow">Overview</p>
            <h2 className="mt-3 max-w-3xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
              Official representatives of WBC in your territory
            </h2>
            <span className="accent-rule mt-6" />
            <div className="mt-8 grid gap-6 text-[16px] leading-[1.85] text-muted-fg sm:text-[17px] lg:grid-cols-2">
              <p>
                The World Business Council (WBC) is developing a global network of businesses, organizations, and
                representatives dedicated to promoting international cooperation, trade, investment, innovation, and
                sustainable development.
              </p>
              <p>
                WBC Affiliates are officially recognized representatives of WBC within their designated territories. They
                play a key role in connecting businesses, entrepreneurs, institutions, and business communities with the
                global WBC network.
              </p>
            </div>
          </div>

          <aside data-reveal className="lg:pt-2">
            <nav
              aria-label="Guide sections"
              className="sticky top-28 rounded-card border border-line bg-surface/90 p-5 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg sm:p-6"
            >
              <p className="text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">On this page</p>
              <ul className="mt-4 space-y-1">
                {TOC.map((item) => (
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
              <Link to="/contact" className="btn-orange-to-outline mt-6 w-full !min-h-10 !text-[11px]">
                Apply now
              </Link>
            </nav>
          </aside>
        </div>
      </section>

      {/* Why establish */}
      <section id="why" className="scroll-mt-28 relative overflow-hidden border-t border-line bg-surface/50 py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -end-20 bottom-0 size-[320px] rounded-full bg-navy/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Benefits</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              Why Establish a WBC Affiliate?
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              By becoming a WBC Affiliate, your organization can expand its reach and impact.
            </p>
            <span className="accent-rule mt-6" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {WHY_ESTABLISH.map((item, i) => (
              <li key={item}>
                <article className="group guide-card flex h-full flex-col border border-line bg-background p-5 sm:p-6">
                  <span className="guide-glow -end-10 -top-10 size-28 bg-orange/25" aria-hidden="true" />
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

      {/* Types */}
      <section id="types" className="scroll-mt-28 border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="max-w-2xl">
            <p className="eyebrow">Affiliate structure</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              Types of WBC Affiliates
            </h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              WBC recognizes two main types of Affiliates — at national and city level.
            </p>
            <span className="accent-rule mt-6" />
          </div>

          <div data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="group guide-card relative overflow-hidden rounded-card border border-line bg-background p-7 sm:p-9">
              <span className="absolute inset-y-0 start-0 w-1 bg-navy transition-all duration-500 group-hover:w-1.5 group-hover:bg-orange" aria-hidden="true" />
              <span className="guide-glow -end-12 -top-12 size-40 bg-navy/20" aria-hidden="true" />
              <p className="relative text-[12px] font-bold tracking-[0.16em] text-orange uppercase">National level</p>
              <h3 className="relative mt-3 text-[24px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                Country Affiliates
              </h3>
              <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">
                Represent WBC at the national level and support:
              </p>
              <div className="relative mt-6">
                <CheckList items={COUNTRY_SUPPORT} />
              </div>
              <p className="relative mt-8 border-t border-line pt-6 text-[14px] leading-relaxed text-muted-fg">
                Country Affiliates serve as a national coordination platform while respecting the independence and
                activities of City Affiliates operating within the country.
              </p>
            </article>

            <article className="group guide-card relative overflow-hidden rounded-card border border-line bg-background p-7 sm:p-9">
              <span className="absolute inset-y-0 start-0 w-1 bg-orange transition-all duration-500 group-hover:w-1.5" aria-hidden="true" />
              <span className="guide-glow -end-12 -top-12 size-40 bg-orange/25" aria-hidden="true" />
              <p className="relative text-[12px] font-bold tracking-[0.16em] text-orange uppercase">Local level</p>
              <h3 className="relative mt-3 text-[24px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                City Affiliates
              </h3>
              <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">
                Focus on developing local business networks within their designated territory through:
              </p>
              <div className="relative mt-6">
                <CheckList items={CITY_SUPPORT} />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Who can apply + Requirements */}
      <section id="eligibility" className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-2 lg:gap-10">
          <div data-reveal className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9">
            <span className="guide-glow -end-10 -top-10 size-36 bg-orange/20" aria-hidden="true" />
            <p className="relative eyebrow">Eligibility</p>
            <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">Who Can Apply?</h2>
            <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">
              Applications to establish a WBC Affiliate may be submitted by:
            </p>
            <div className="relative mt-6">
              <CheckList items={WHO_CAN_APPLY} />
            </div>
          </div>

          <div data-reveal className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9">
            <span className="guide-glow -end-10 -top-10 size-36 bg-navy/15" aria-hidden="true" />
            <p className="relative eyebrow">Qualifications</p>
            <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">Requirements for Applicants</h2>
            <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">Applicants should demonstrate:</p>
            <div className="relative mt-6">
              <CheckList items={REQUIREMENTS} />
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="scroll-mt-28 relative isolate overflow-hidden bg-navy py-14 lg:py-20">
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
            <p className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">How to proceed</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">Application Process</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-white/75">
              Three clear steps from application to accreditation.
            </p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-12 grid gap-6 lg:grid-cols-3">
            <span
              className="guide-process-line pointer-events-none absolute top-8 start-[16%] end-[16%] hidden h-px bg-gradient-to-r from-transparent via-orange/70 to-transparent lg:block"
              aria-hidden="true"
            />

            {[
              {
                step: "01",
                title: "Submit an Application",
                intro: "Submit an official WBC Affiliate Application Form including:",
                items: APPLICATION_INCLUDES,
                note: null as string | null,
              },
              {
                step: "02",
                title: "Evaluation by Headquarters",
                intro: "WBC Headquarters evaluates applications based on:",
                items: EVALUATION_CRITERIA,
                note: "WBC reserves the right to approve, request additional information, request modifications, postpone, or reject an application.",
              },
              {
                step: "03",
                title: "Accreditation",
                intro: "Following approval:",
                items: ACCREDITATION_STEPS,
                note: null,
              },
            ].map((step) => (
              <li key={step.step}>
                <article className="group relative h-full overflow-hidden rounded-card border border-white/15 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange/40 hover:bg-white/10 sm:p-7">
                  <span
                    className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/0 transition-all duration-500 group-hover:bg-orange/25 group-hover:scale-150"
                    aria-hidden="true"
                  />
                  <span className="relative inline-flex size-12 items-center justify-center bg-orange text-[14px] font-bold tabular-nums text-white transition-transform duration-300 group-hover:scale-110">
                    {step.step}
                  </span>
                  <h3 className="relative mt-5 text-[20px] font-bold text-white">{step.title}</h3>
                  <p className="relative mt-3 text-[14px] leading-relaxed text-white/70">{step.intro}</p>
                  <div className="relative mt-5">
                    <CheckList items={step.items} dark />
                  </div>
                  {step.note ? (
                    <p className="relative mt-6 border-t border-white/15 pt-5 text-[13px] leading-relaxed text-white/60">
                      {step.note}
                    </p>
                  ) : null}
                </article>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Support */}
      <section id="support" className="scroll-mt-28 relative overflow-hidden border-t border-line py-14 lg:py-20">
        <div
          className="pointer-events-none absolute start-1/2 top-0 size-[420px] -translate-x-1/2 rounded-full bg-orange/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Partnership</p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                Support from WBC Headquarters
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
                WBC Headquarters supports Affiliates through recognition, guidance, and global access.
              </p>
            </div>
            <span className="accent-rule shrink-0" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {HQ_SUPPORT.map((item, i) => (
              <li key={item.title}>
                <article className="group guide-card h-full border border-line bg-background p-6 sm:p-7">
                  <span className="guide-glow -end-8 -top-8 size-28 bg-orange/20" aria-hidden="true" />
                  <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-orange/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative mt-4 text-[18px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                    {item.title}
                  </h3>
                  <p className="relative mt-2 text-[15px] leading-relaxed text-muted-fg">{item.body}</p>
                  <span className="guide-accent relative mt-5" aria-hidden="true" />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Financial + Governance */}
      <section id="compliance" className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <article
            data-reveal
            className="group relative overflow-hidden rounded-card bg-navy p-7 text-white transition-transform duration-300 hover:-translate-y-1 sm:p-9"
          >
            <span
              className="pointer-events-none absolute -end-10 -top-10 size-40 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
              aria-hidden="true"
            />
            <p className="relative text-[12px] font-bold tracking-[0.16em] text-white/60 uppercase">Financial Commitment</p>
            <h2 className="relative mt-3 text-[24px] font-bold leading-snug sm:text-[28px]">
              Defined in the Accreditation Agreement
            </h2>
            <p className="relative mt-5 text-[15px] leading-relaxed text-white/80 sm:text-[16px]">
              Applicable affiliation fees, financial contributions, membership revenue arrangements, payment procedures,
              and related obligations shall be defined in the WBC Affiliate Accreditation Agreement.
            </p>
            <Link to="/contact" className="btn-orange mt-8 inline-flex">
              Request fee details
            </Link>
          </article>

          <article data-reveal className="group guide-card rounded-card border border-line bg-background p-7 sm:p-9">
            <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
            <p className="relative eyebrow">Standards</p>
            <h2 className="relative mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">Governance and Compliance</h2>
            <p className="relative mt-4 text-[15px] leading-relaxed text-muted-fg">All WBC Affiliates shall:</p>
            <div className="relative mt-6">
              <CheckList items={GOVERNANCE} />
            </div>
          </article>
        </div>
      </section>

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
                Become Part of the Global Business Network
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                If your organization is interested in representing WBC and developing international business connections
                within your territory, we invite you to explore establishing a WBC Affiliate.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/contact" className="btn-orange">
                  Fill the Application Form
                </Link>
                <Link to="/contact" className="btn-navy !rounded-md">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="hidden border border-line bg-surface p-7 transition-colors duration-300 group-hover:border-orange/30 lg:block">
              <p className="text-[12px] font-bold tracking-[0.14em] text-muted-fg uppercase">Also explore</p>
              <ul className="mt-5 space-y-4">
                <li>
                  <Link to="/affiliates" className="card-link text-[15px]">
              View affiliate footprint
                    <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/membership" className="card-link text-[15px]">
                    WBC Membership
                    <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                      →
                    </span>
                  </Link>
                </li>
                <li>
                  <Link to="/global-network" className="card-link text-[15px]">
                    Global Network
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
        title="Ready to establish a WBC Affiliate?"
        description="Contact the WBC team to discuss affiliate development in your city or country."
        ctaLabel="Contact Us"
        to="/contact"
      />
    </>
  );
}
