import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import membershipImg from "@/assets/membership-club.png";
import membershipEligibilityImg from "@/assets/membership-eligibility.png";
import { SplitHero } from "@/components/SplitHero";
import { MembershipApplicationForm } from "@/components/MembershipApplicationForm";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — World Business Council" },
      {
        name: "description",
        content:
          "Explore WBC membership types and benefits, then apply online — institutional, corporate, SME, individual, and honorary membership.",
      },
      { property: "og:title", content: "WBC Membership" },
      {
        property: "og:description",
        content: "Membership types, benefits, and online application for the World Business Council network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Membership,
});

const TIERS = [
  {
    title: "Institutional",
    subtitle: "Membership",
    body: "Business Councils, chambers of commerce, associations, NGOs, foundations, universities, and other non-profit or membership-based organizations.",
    icon: "building",
  },
  {
    title: "Corporate/Enterprise",
    subtitle: "Membership",
    body: "Corporations, enterprises, and large business organizations seeking strategic partnerships, international visibility, and business opportunities.",
    icon: "brief",
  },
  {
    title: "SME",
    subtitle: "Membership",
    body: "Micro, small, and medium-sized enterprises (SMEs), startups, entrepreneurs, and freelancers seeking growth, networking, and market access opportunities.",
    icon: "growth",
  },
  {
    title: "Individual",
    subtitle: "Membership",
    body: "Professionals, executives, investors, consultants, researchers, academics, students, and other individuals interested in business and international networking.",
    icon: "user",
  },
  {
    title: "Honorary",
    subtitle: "Membership",
    body: "Individuals or organizations recognized for their outstanding contribution to business development, international cooperation, or the objectives of WBC.",
    icon: "star",
  },
] as const;

const WHY_JOIN = [
  {
    title: "Global Networking",
    body: "Connect with businesses, organizations, entrepreneurs, and professionals from around the world.",
  },
  {
    title: "Strategic Partnerships",
    body: "Build valuable partnerships and explore new business, investment, and collaboration opportunities.",
  },
  {
    title: "International Visibility",
    body: "Increase your organization's visibility through WBC's global network, events, and platforms.",
  },
  {
    title: "Access to Events",
    body: "Participate in international conferences, forums, networking events, trade missions, and business meetings.",
  },
  {
    title: "Business Support Services",
    body: "Benefit from guidance, market insights, business referrals, and international connections.",
  },
  {
    title: "Knowledge & Learning",
    body: "Access workshops, training programs, expert discussions, and best practices from global business leaders.",
  },
  {
    title: "Market Access Opportunities",
    body: "Explore new markets and connect with potential partners, clients, suppliers, and investors worldwide.",
  },
  {
    title: "Advocacy & Representation",
    body: "Contribute to discussions and initiatives that support businesses and strengthen the business community.",
  },
  {
    title: "Global Community",
    body: "Become part of a trusted international community committed to collaboration, innovation, and sustainable growth.",
  },
  {
    title: "Recognition & Credibility",
    body: "Demonstrate your commitment to international business engagement through affiliation with the World Business Council.",
  },
] as const;

const PLAN_TIERS = [
  { id: "institutional", label: "Institutional", price: "1000 € / Year" },
  { id: "enterprise", label: "Enterprise", price: "1000 € / Year" },
  { id: "sme", label: "SME", price: "200 € / Year" },
  { id: "individual", label: "Individual", price: "50 € / Year" },
] as const;

type PlanId = (typeof PLAN_TIERS)[number]["id"];

const ALL_PLAN_BENEFITS: { label: string; plans: Record<PlanId, boolean> }[] = [
  {
    label: "Use of WBC Membership Certificate & Recognition",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Global Networking Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Access to WBC Events, Forums & Conferences",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Training & Professional Development Programs",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Market Access & International Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Exclusive Member Programs & Networking Activities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Advocacy & Representation Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Access to Knowledge, Research & Industry Insights",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Participation in Committees & Working Groups",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Member Directory Listing",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Business Matchmaking Services",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Business Support & Advisory Services",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Social Media Promotion Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Website Profile & Visibility",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Inclusion in Newsletters & Publications",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Event Sponsorship & Branding Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Participation in Trade Missions & Business Delegations",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Speaking Opportunities at WBC Events",
    plans: { institutional: true, enterprise: true, sme: false, individual: false },
  },
  {
    label: "Distribution of Promotional Materials at Events",
    plans: { institutional: true, enterprise: true, sme: false, individual: false },
  },
  {
    label: "Strategic Partnerships & Collaboration Opportunities",
    plans: { institutional: true, enterprise: true, sme: false, individual: false },
  },
];

const AUDIENCES = [
  "Nonprofit organizations",
  "Corporations",
  "Entrepreneurs",
  "Professionals",
  "Individuals, students & academics",
] as const;

const STEPS = [
  {
    title: "Fill the Application Form",
    body: "Complete the online application form with your membership category and details.",
  },
  {
    title: "Process the Payment",
    body: "Process your membership payment to activate your application.",
  },
  {
    title: "Receive Confirmation",
    body: "You will receive the membership confirmation and certificate within 3 working days.",
  },
] as const;

function TierIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true,
  } as const;
  switch (name) {
    case "building":
      return (
        <svg {...common}>
          <path d="M4 20V6l8-3 8 3v14" />
          <path d="M9 20v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
        </svg>
      );
    case "brief":
      return (
        <svg {...common}>
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          <rect x="3" y="7" width="18" height="13" rx="1.5" />
          <path d="M3 12h18" />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <path d="M4 19h16M6 16l4-5 3 3 5-7" />
          <path d="M15 7h3v3" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3l2.2 5.4L20 9.5l-4 3.9.9 5.6L12 16.8 7.1 19l.9-5.6-4-3.9 5.8-1.1z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 19c0-3.2 2.8-5.5 7-5.5s7 2.3 7 5.5" />
        </svg>
      );
  }
}

function CheckMark({ on }: { on: boolean }) {
  if (!on) {
    return <span className="mx-auto block h-0.5 w-4 bg-line" aria-label="Not included" />;
  }
  return (
    <svg
      className="mx-auto text-teal"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-label="Included"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BenefitsTable({
  rows,
}: {
  rows: { label: string; plans: Record<PlanId, boolean> }[];
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-background shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-start">
        <thead>
          <tr className="bg-navy text-white">
            <th className="px-5 py-5 text-start text-[14px] font-semibold tracking-[0.04em] sm:px-6 sm:text-[15px]">
              Benefit
            </th>
            {PLAN_TIERS.map((tier) => (
              <th key={tier.id} className="px-3 py-5 text-center sm:px-4">
                <span className="block text-[13px] font-bold sm:text-[14px]">{tier.label}</span>
                <span className="mt-1 block text-[12px] font-semibold text-orange sm:text-[13px]">{tier.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-surface/80"}>
              <td className="px-5 py-4 text-[14px] leading-snug text-foreground sm:px-6 sm:text-[15px]">
                {row.label}
              </td>
              {PLAN_TIERS.map((tier) => (
                <td key={tier.id} className="px-3 py-4 text-center sm:px-4">
                  <CheckMark on={row.plans[tier.id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Membership() {
  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, []);

  return (
    <>
      <SplitHero
        eyebrow="Join the Council"
        title="WBC Membership"
        description="Explore membership types and benefits, then apply to join a global network of businesses, institutions, and professionals."
        tags={["Five Categories", "Global Access", "Online Application"]}
        image={membershipImg}
        imageAlt="Business professionals shaking hands during a membership meeting"
        ctaLabel="Apply Now"
        ctaTo="/membership"
        ctaHash="application"
      />

      <section id="join" className="scroll-mt-28 relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow">
              Membership Categories
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]"
            >
              Five ways to join WBC.
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              Choose the pathway that matches your organisation or professional profile — each opens access to the same
              global network. Membership fees are payable annually.
            </p>
            <span data-reveal className="accent-rule mt-6" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
            {TIERS.map((t, i) => {
              const featured = i === 0 || i === 2;
              return (
                <li key={t.title}>
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
                        className={`inline-flex size-11 items-center justify-center ${
                          featured ? "bg-white/10 text-white" : "bg-orange/10 text-foreground"
                        }`}
                      >
                        <TierIcon name={t.icon} />
                      </span>
                      <span
                        className={`font-display text-[24px] leading-none font-bold tabular-nums ${
                          featured ? "text-white/25" : "text-orange/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className={`relative mt-6 text-[18px] font-bold leading-snug ${featured ? "text-white" : "text-foreground"}`}>
                      {t.title}
                      <span className={`mt-0.5 block text-[13px] font-semibold tracking-[0.08em] uppercase ${featured ? "text-white/60" : "text-muted-fg"}`}>
                        {t.subtitle}
                      </span>
                    </h3>
                    <p className={`relative mt-3 flex-1 text-[14px] leading-relaxed ${featured ? "text-white/80" : "text-muted-fg"}`}>
                      {t.body}
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
          <p data-reveal className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-relaxed text-muted-fg">
            No matter your size or industry, WBC membership opens doors to unparalleled opportunities for growth,
            collaboration, and success of your businesses.
          </p>
        </div>
      </section>

      <section id="benefits" className="scroll-mt-28 border-t border-line py-16 lg:py-24">
        <div className="container-wbc">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              data-reveal
              className="text-[28px] font-bold leading-tight text-navy sm:text-[36px] lg:text-[42px]"
            >
              Why Become a WBC Member
            </h2>
            <span data-reveal className="accent-rule mx-auto mt-5" />
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_JOIN.map((b, i) => (
              <li key={b.title}>
                <article className="group h-full rounded-card border border-line bg-background p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-lg sm:p-7">
                  <span className="font-display text-[15px] font-bold tabular-nums text-orange/55">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[18px] font-bold text-navy transition-colors group-hover:text-teal sm:text-[19px]">
                    {b.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{b.body}</p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plans" className="scroll-mt-28 border-t border-line bg-surface py-16 lg:py-24">
        <div className="container-wbc">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal className="text-[12px] font-bold tracking-[0.2em] text-blue uppercase">
              Annual Payment
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-navy sm:text-[36px] lg:text-[42px]"
            >
              Membership Benefits
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg">
              Compare included benefits across Institutional, Enterprise, SME, and Individual membership.
            </p>
          </div>

          <div data-reveal className="mt-12">
            <BenefitsTable rows={ALL_PLAN_BENEFITS} />
          </div>

          <p data-reveal className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-muted-fg">
            Note: Membership applications are subject to approval, and the benefits outlined are subject to terms and
            conditions. WBC retains the right to add, remove, or modify these benefits as necessary.
          </p>

          <div data-reveal className="mt-10 text-center">
            <Link to="/membership" hash="application" className="btn-orange">
              Apply for Membership
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="container-wbc grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14">
          <div data-reveal className="flex flex-col justify-center">
            <p className="eyebrow">Eligibility</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              Who can become a member
            </h2>
            <span className="accent-rule mt-5" />
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              All types of nonprofit organizations, corporations, entrepreneurs, professionals, individuals, students and
              academics.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {AUDIENCES.map((a) => (
                <li
                  key={a}
                  className="border border-line bg-surface px-4 py-2 text-[13px] font-semibold tracking-[0.04em] text-foreground"
                >
                  {a}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <Link to="/membership" hash="application" className="btn-orange">
                Start Application
              </Link>
            </div>
          </div>

          <div data-reveal className="relative min-h-[320px] overflow-hidden rounded-card lg:min-h-full">
            <img
              src={membershipEligibilityImg}
              alt="Professionals representing who can become a WBC member"
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
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <p className="text-[12px] font-bold tracking-[0.18em] text-white/70 uppercase">Open network</p>
              <p className="mt-2 max-w-sm text-[20px] font-bold leading-snug text-white sm:text-[22px]">
                Whether you lead an institution, grow an SME, or work independently — there is a place for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="how-to-apply"
        className="scroll-mt-28 relative isolate overflow-hidden bg-navy py-16 lg:py-24"
      >
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
            <p data-reveal className="font-display text-[12px] tracking-[0.22em] text-white/70 uppercase">
              Simple process
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[42px]"
            >
              How to apply
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-white/80">
              Three clear steps from application to confirmation — usually completed within three working days.
            </p>
          </div>

          <ol data-reveal data-reveal-group className="relative mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
            <span
              className="pointer-events-none absolute top-[2.75rem] start-[16%] end-[16%] hidden h-px bg-white/20 md:block"
              aria-hidden="true"
            />
            {STEPS.map((step, i) => (
              <li key={step.title}>
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
        </div>
      </section>

      <section id="application" className="scroll-mt-28 relative overflow-hidden bg-surface py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/[0.04] to-transparent"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="mx-auto max-w-4xl">
            <div data-reveal className="mb-10 text-center sm:mb-12">
              <p className="eyebrow">Application Form</p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                Become a Member
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-fg">
                Select your membership category and complete the form below. Required fields are marked with an asterisk.
              </p>
              <span className="accent-rule mx-auto mt-6" />
            </div>

            <div
              data-reveal
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
    </>
  );
}
