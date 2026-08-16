import { createFileRoute, Link } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { SplitHero } from "@/components/SplitHero";
import { MembershipTier } from "@/components/membership/MembershipTier";

export const Route = createFileRoute("/membership/")({
  head: () => ({
    meta: [
      { title: "Membership — World Business Council" },
      {
        name: "description",
        content:
          "Explore WBC membership types, benefits, and how to join — institutional, corporate, SME, individual, and honorary membership.",
      },
      { property: "og:title", content: "WBC Membership" },
      {
        property: "og:description",
        content: "Membership types and pathways to join the World Business Council network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MembershipOverview,
});

function MembershipOverview() {
  return (
    <>
      <SplitHero
        eyebrow="Join the Council"
        title="WBC Membership"
        description="Explore membership types and benefits, then apply to join a global network of businesses, institutions, and professionals."
        tags={["Five Categories", "Global Access", "Online Application"]}
        image={membershipImg}
        imageAlt="Business professionals shaking hands during a membership meeting"
        ctaLabel="Become a Member"
        ctaTo="/become-a-member"
      />

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow">
              Types of Membership
            </p>
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]"
            >
              Five ways to join WBC.
            </h2>
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              WBC offers 5 distinct types of membership tailored to meet the diverse needs of our members. Each
              membership tier provides unique benefits designed to support your specific goals and aspirations.
              Membership fees are payable annually.
            </p>
            <span data-reveal className="accent-rule mt-6" />
          </div>

          <MembershipTier />

          <div data-reveal className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/membership/benefits" className="btn-navy !rounded-md">
              Membership Benefits
            </Link>
            <Link to="/become-a-member" className="btn-orange">
              Become a Member
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
