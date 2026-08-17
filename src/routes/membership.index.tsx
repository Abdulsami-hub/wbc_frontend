import { createFileRoute } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { SplitHero } from "@/components/SplitHero";
import { MembershipTypesSection } from "@/components/membership/MembershipTypesSection";

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
        tone="navy"
        ctaLabel="Become a Member"
        ctaTo="/become-a-member"
      />

      <section className="relative overflow-hidden py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -start-24 top-10 size-[380px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <MembershipTypesSection showActions />
        </div>
      </section>
    </>
  );
}
