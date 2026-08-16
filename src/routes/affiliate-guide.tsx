import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import networkBg from "@/assets/gov-board.jpg";

export const Route = createFileRoute("/affiliate-guide")({
  head: () => ({
    meta: [
      { title: "WBC Affiliate Establishment Guide — World Business Council" },
      {
        name: "description",
        content:
          "Establish an official WBC Affiliate. Learn why to join, Country and City Affiliate types, who can apply, requirements, application process, support, and governance.",
      },
      { property: "og:title", content: "Establish an Official WBC Affiliate" },
      {
        property: "og:description",
        content:
          "Join a global network connecting businesses and creating opportunities through official WBC Country and City Affiliates.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AffiliateGuide,
});

const WHY_ESTABLISH = [
  "Represent the World Business Council within your territory;",
  "Connect local businesses with international business networks;",
  "Promote trade, investment, and economic cooperation;",
  "Organize business events, forums, conferences, and professional activities;",
  "Support entrepreneurs, companies, and institutions;",
  "Facilitate access to international opportunities and partnerships;",
  "Participate in WBC global initiatives and programs;",
  "Join the WBC Leadership Forums and connect with global business leaders through an exclusive networking platform.",
] as const;

const COUNTRY_AFFILIATE = [
  "Representation of WBC and its members to the national governments and institutions;",
  "Development of national business initiatives and programs;",
  "Coordination and cooperation between WBC Affiliates within the country;",
  "Promotion of international trade, investment, and business cooperation;",
  "Representation of the interests of the business community at the national level.",
] as const;

const CITY_AFFILIATE = [
  "Representing WBC and its members before local governments, institutions, and stakeholders;",
  "Developing local business networks and professional connections;",
  "Organizing business networking events, forums, and programs;",
  "Recruiting and supporting WBC members;",
  "Facilitating access to business opportunities and partnerships;",
  "Connecting local businesses with the global WBC network.",
] as const;

const WHO_CAN_APPLY = [
  "Chambers of commerce;",
  "Business councils;",
  "Business associations;",
  "Professional organizations;",
  "Companies and business groups;",
  "Universities and institutions;",
  "Business leaders and entrepreneurs;",
  "Existing WBC members;",
  "Other organizations aligned with WBC objectives.",
] as const;

const REQUIREMENTS = [
  "Alignment with WBC’s mission, values, and objectives;",
  "Professional reputation, integrity, and credibility;",
  "Understanding of the local business environment;",
  "Ability to develop business activities and partnerships;",
  "Capacity to promote WBC membership and services;",
  "Commitment to comply with WBC policies, standards, and guidelines.",
] as const;

const APPLICATION_CONTENTS = [
  "Applicant information and background;",
  "Proposed Affiliate type and territory;",
  "Proposed leadership structure;",
  "Development objectives and strategy;",
  "Planned activities and programs;",
  "Local business engagement approach;",
  "Any additional information requested by WBC.",
] as const;

const EVALUATION_CRITERIA = [
  "Strategic importance of the proposed territory;",
  "Applicant qualifications and experience;",
  "Local business environment and opportunities;",
  "Leadership capacity;",
  "Operational capability;",
  "Alignment with WBC objectives and standards.",
] as const;

const ACCREDITATION = [
  "The applicant will receive the invoice and will process the annual Affiliation Fees;",
  "The applicant and WBC shall sign the WBC Affiliate Accreditation Agreement;",
  "WBC shall issue an official Affiliate Accreditation Certificate;",
  "The Affiliate receives authorization to operate under the WBC name and brand;",
  "The Affiliate begins activities according to the approved development plan.",
] as const;

const HQ_SUPPORT = [
  "Official recognition and international credibility;",
  "Access to the global WBC network;",
  "Strategic guidance and institutional support;",
  "Branding and communication support;",
  "Participation in international programs and initiatives;",
  "Opportunities for cooperation with businesses and organizations worldwide.",
] as const;

const GOVERNANCE = [
  "Operate in accordance with WBC Statutes, policies, and standards;",
  "Protect the reputation and integrity of the WBC brand;",
  "Maintain professional and ethical conduct;",
  "Submit required reports and information to WBC Headquarters;",
  "Support the development of the WBC global network.",
] as const;

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
          <span>{item}</span>
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
        ctaLabel="Fill the Application Form"
        ctaTo="/contact"
      />

      <section className="relative overflow-hidden py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[320px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative max-w-3xl">
          <p data-reveal className="text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
            The World Business Council (WBC) is developing a global network of businesses, organizations, and
            representatives dedicated to promoting international cooperation, trade, investment, innovation, and
            sustainable development.
          </p>
          <p data-reveal className="mt-5 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
            WBC Affiliates are officially recognized representatives of WBC within their designated territories. They
            play a key role in connecting businesses, entrepreneurs, institutions, and business communities with the
            global WBC network.
          </p>
        </div>
      </section>

      <section id="why" className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc max-w-3xl">
          <p data-reveal className="eyebrow">
            Opportunity
          </p>
          <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
            Why Establish a WBC Affiliate?
          </h2>
          <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
            By becoming a WBC Affiliate, your organization can:
          </p>
          <div data-reveal>
            <BulletList items={WHY_ESTABLISH} />
          </div>
        </div>
      </section>

      <section id="types" className="scroll-mt-28 border-t border-line py-14 lg:py-20">
        <div className="container-wbc">
          <div className="mx-auto max-w-3xl text-center">
            <p data-reveal className="eyebrow">
              Affiliate types
            </p>
            <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              Types of WBC Affiliates
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              WBC recognizes two main types of Affiliates:
            </p>
            <span data-reveal className="accent-rule mx-auto mt-5" />
          </div>

          <div data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="group relative overflow-hidden rounded-card bg-navy p-7 text-white shadow-card sm:p-8">
              <span
                className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/25 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <p className="relative text-[12px] font-bold tracking-[0.18em] text-white/70 uppercase">01</p>
              <h3 className="relative mt-4 text-[22px] font-bold">Country Affiliates</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-white/80">
                Country Affiliates represent WBC at the national level and support:
              </p>
              <ul className="relative mt-5 space-y-3">
                {COUNTRY_AFFILIATE.map((item) => (
                  <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/80">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="relative mt-6 text-[14px] leading-relaxed text-white/75">
                Country Affiliates serve as a national coordination platform while respecting the independence and
                activities of City Affiliates operating within the country.
              </p>
            </article>

            <article className="group relative overflow-hidden rounded-card border border-line bg-background p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-lg sm:p-8">
              <span
                className="pointer-events-none absolute -end-8 -top-8 size-28 rounded-full bg-orange/10 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <p className="relative text-[12px] font-bold tracking-[0.18em] text-blue uppercase">02</p>
              <h3 className="relative mt-4 text-[22px] font-bold text-foreground">City Affiliates</h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-muted-fg">
                City Affiliates focus on developing local business networks and supporting companies, entrepreneurs, and
                institutions within their designated territory through:
              </p>
              <div className="relative">
                <BulletList items={CITY_AFFILIATE} />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="who-can-apply" className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p data-reveal className="eyebrow">
              Eligibility
            </p>
            <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[34px]">
              Who Can Apply?
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Applications to establish a WBC Affiliate may be submitted by:
            </p>
            <div data-reveal>
              <BulletList items={WHO_CAN_APPLY} />
            </div>
          </div>
          <div>
            <p data-reveal className="eyebrow">
              Criteria
            </p>
            <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[34px]">
              Requirements for Applicants
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Applicants should demonstrate:
            </p>
            <div data-reveal>
              <BulletList items={REQUIREMENTS} />
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="scroll-mt-28 relative isolate overflow-hidden bg-navy py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -end-16 top-0 size-[360px] rounded-full bg-orange/20 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
              How to apply
            </p>
            <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px]">
              Application Process
            </h2>
          </div>

          <ol data-reveal data-reveal-group className="mt-12 space-y-6">
            <li>
              <article className="rounded-card border border-white/15 bg-white/5 p-7 backdrop-blur-sm sm:p-8">
                <span className="inline-flex size-12 items-center justify-center bg-orange text-[15px] font-bold tabular-nums text-white">
                  01
                </span>
                <h3 className="mt-5 text-[20px] font-bold text-white">Step 1 – Submit an Application</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  Interested applicants shall submit an official WBC Affiliate Application Form including:
                </p>
                <ul className="mt-5 space-y-3">
                  {APPLICATION_CONTENTS.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>

            <li>
              <article className="rounded-card border border-white/15 bg-white/5 p-7 backdrop-blur-sm sm:p-8">
                <span className="inline-flex size-12 items-center justify-center bg-orange text-[15px] font-bold tabular-nums text-white">
                  02
                </span>
                <h3 className="mt-5 text-[20px] font-bold text-white">Step 2 – Evaluation by WBC Headquarters</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">
                  WBC Headquarters evaluates applications based on:
                </p>
                <ul className="mt-5 space-y-3">
                  {EVALUATION_CRITERIA.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[15px] leading-relaxed text-white/80">
                  WBC reserves the right to approve, request additional information, request modifications, postpone, or
                  reject an application.
                </p>
              </article>
            </li>

            <li>
              <article className="rounded-card border border-white/15 bg-white/5 p-7 backdrop-blur-sm sm:p-8">
                <span className="inline-flex size-12 items-center justify-center bg-orange text-[15px] font-bold tabular-nums text-white">
                  03
                </span>
                <h3 className="mt-5 text-[20px] font-bold text-white">Step 3 – Accreditation</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-white/80">Following approval:</p>
                <ul className="mt-5 space-y-3">
                  {ACCREDITATION.map((item) => (
                    <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-white/75">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          </ol>
        </div>
      </section>

      <section id="support" className="scroll-mt-28 border-t border-line py-14 lg:py-20">
        <div className="container-wbc max-w-3xl">
          <p data-reveal className="eyebrow">
            Headquarters
          </p>
          <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
            Support from WBC Headquarters
          </h2>
          <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
            WBC Headquarters supports Affiliates through:
          </p>
          <div data-reveal>
            <BulletList items={HQ_SUPPORT} />
          </div>
        </div>
      </section>

      <section id="financial" className="scroll-mt-28 border-t border-line bg-surface/50 py-14 lg:py-20">
        <div className="container-wbc grid gap-8 lg:grid-cols-2 lg:gap-12">
          <article data-reveal className="rounded-card border border-line bg-background p-7 sm:p-8">
            <p className="eyebrow">Fees</p>
            <h2 className="mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">Financial Commitment</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg">
              Applicable affiliation fees, financial contributions, membership revenue arrangements, payment procedures,
              and related obligations shall be defined in the WBC Affiliate Accreditation Agreement.
            </p>
          </article>

          <article data-reveal className="rounded-card border border-line bg-background p-7 sm:p-8">
            <p className="eyebrow">Standards</p>
            <h2 className="mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">Governance and Compliance</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">All WBC Affiliates shall:</p>
            <BulletList items={GOVERNANCE} />
          </article>
        </div>
      </section>

      <section className="border-t border-line py-14 lg:py-20">
        <div className="container-wbc max-w-3xl text-center">
          <h2 data-reveal className="text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
            Become Part of the Global Business Network
          </h2>
          <p data-reveal className="mt-5 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
            If your organization is interested in representing WBC and developing international business connections
            within your territory, we invite you to explore the opportunity of establishing a WBC Affiliate.
          </p>
          <div data-reveal className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/contact" className="btn-orange">
              Fill the Application Form
            </Link>
            <Link to="/contact" className="btn-orange-outline">
              Contact Us
            </Link>
          </div>
          <div data-reveal className="mt-6">
            <Link to="/affiliates" className="link-arrow">
              View affiliate footprint
              <span aria-hidden="true" className="link-arrow-icon rtl-mirror">
                →
              </span>
            </Link>
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
