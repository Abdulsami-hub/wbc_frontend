import { createFileRoute, Link } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { SplitHero } from "@/components/SplitHero";
import { BenefitsTable } from "@/components/membership/BenefitsTable";
import { WHY_JOIN } from "@/content/membership";

export const Route = createFileRoute("/membership/benefits")({
  head: () => ({
    meta: [
      { title: "Membership Benefits — World Business Council" },
      {
        name: "description",
        content:
          "Why become a WBC member: global networking, partnerships, events, market access, and a full comparison of membership benefits by tier.",
      },
      { property: "og:title", content: "Membership Benefits — WBC" },
      {
        property: "og:description",
        content: "Compare Institutional, Enterprise, SME, and Individual membership benefits.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipBenefits,
});

function MembershipBenefits() {
  return (
    <>
      <SplitHero
        eyebrow="Membership"
        title="Membership Benefits"
        description="Discover why businesses and professionals join WBC — and compare benefits across Institutional, Enterprise, SME, and Individual membership."
        tags={["Annual Payment", "Global Network", "Member Access"]}
        image={membershipImg}
        imageAlt="Business professionals networking at a WBC membership event"
        tone="blue"
        ctaLabel="Become a Member"
        ctaTo="/become-a-member"
      />

      <section className="border-t border-line py-16 lg:py-24">
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

      <section className="border-t border-line bg-surface py-16 lg:py-24">
        <div className="container-wbc">
          <div className="mx-auto max-w-2xl text-center">
            <p data-reveal className="text-[12px] font-bold tracking-[0.2em] text-orange uppercase">
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
            <BenefitsTable />
          </div>

          <p data-reveal className="mx-auto mt-8 max-w-3xl text-center text-[13px] leading-relaxed text-muted-fg">
            Note: Membership applications are subject to approval, and the benefits outlined are subject to terms and
            conditions. WBC retains the right to add, remove, or modify these benefits as necessary.
          </p>

          <div data-reveal className="mt-10 text-center">
            <Link to="/become-a-member" className="btn-orange">
              Apply for Membership
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
