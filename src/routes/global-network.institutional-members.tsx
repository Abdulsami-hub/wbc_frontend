import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import membershipImg from "@/assets/membership.jpg";

export const Route = createFileRoute("/global-network/institutional-members")({
  head: () => ({
    meta: [
      { title: "Institutional Members — World Business Council" },
      {
        name: "description",
        content:
          "Chambers of commerce, associations, and public institutions cooperating with the World Business Council as institutional members.",
      },
      { property: "og:title", content: "Institutional Members — WBC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InstitutionalMembers,
});

const POINTS = [
  {
    title: "Institutional Alignment",
    body: "Chambers, associations, and public institutions that share WBC's commitment to collaboration and trusted international cooperation.",
  },
  {
    title: "Network Participation",
    body: "Access to affiliates, programmes, and structured introductions that support members and their communities.",
  },
  {
    title: "Joint Visibility",
    body: "Opportunities to co-host forums, missions, and dialogues that advance shared institutional priorities.",
  },
] as const;

function InstitutionalMembers() {
  return (
    <>
      <SplitHero
        eyebrow="Global Network"
        title="Institutional Members"
        description="Chambers of commerce, associations, and public institutions cooperating with WBC."
        tags={["Chambers", "Associations", "Institutions"]}
        image={membershipImg}
        imageAlt="Institutional representatives meeting"
        ctaLabel="Become a Member"
        ctaTo="/become-a-member"
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <ul data-reveal data-reveal-group className="grid gap-5 md:grid-cols-3">
            {POINTS.map((p) => (
              <li key={p.title} className="rounded-card border border-line bg-background p-6 sm:p-7 transition-shadow duration-300 hover:shadow-card">
                <h2 className="text-[18px] font-bold text-foreground">{p.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{p.body}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10 flex flex-wrap gap-4">
            <Link to="/our-members" className="btn-orange">
              View Our Members
            </Link>
            <Link to="/membership" hash="join" className="text-[15px] font-semibold text-foreground underline underline-offset-4">
              Membership categories
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Join as an institutional member"
        description="Apply for institutional membership and connect your organization to the WBC network."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
