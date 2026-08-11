import { createFileRoute } from "@tanstack/react-router";
import membershipImg from "@/assets/membership.jpg";
import { SplitHero } from "@/components/SplitHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: "Membership — World Business Council" },
      {
        name: "description",
        content:
          "Explore WBC membership types, benefits, and who can join — institutional, corporate, SME, individual, and honorary membership.",
      },
      { property: "og:title", content: "WBC Membership" },
      {
        property: "og:description",
        content: "Membership types, benefits, and pathways to join the World Business Council network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Membership,
});

const TIERS = [
  { title: "Institutional Membership", body: "For chambers of commerce, associations, and public institutions." },
  { title: "Corporate/Enterprise Membership", body: "For established companies operating in national or international markets." },
  { title: "SME Membership", body: "For small and medium-sized enterprises seeking growth and connections." },
  { title: "Individual Membership", body: "For entrepreneurs, professionals, and independent consultants." },
  { title: "Honorary Membership", body: "Awarded to individuals recognised for outstanding contribution to WBC's mission." },
] as const;

const BENEFITS = [
  {
    title: "Network Access",
    body: "Connect with members, affiliates, and institutional partners across regions and sectors.",
    bullets: [
      "Introductions to relevant members and councils",
      "Access to regional affiliate contacts",
      "Cross-border partnership pathways",
    ],
  },
  {
    title: "Events & Convenings",
    body: "Priority visibility and participation in WBC forums, missions, and networking programmes.",
    bullets: [
      "Member rates and early registration",
      "Speaking and sponsorship opportunities",
      "Trade missions and working roundtables",
    ],
  },
  {
    title: "Visibility & Positioning",
    body: "Strengthen your profile within the WBC members directory and communications channels.",
    bullets: [
      "Listing in the members network directory",
      "Opportunities for features and updates",
      "Association with a trusted international brand",
    ],
  },
  {
    title: "Advisory & Support",
    body: "Practical guidance on cooperation, market entry, and institutional engagement.",
    bullets: [
      "Access to advisory conversations with the Secretariat",
      "Guidance on council and partnership development",
      "Support navigating WBC programmes and partners",
    ],
  },
  {
    title: "Knowledge & Insights",
    body: "Stay informed through research summaries, briefings, and programme updates.",
    bullets: [
      "Market and institutional insight updates",
      "Programme announcements and briefings",
      "Shared learning from forums and missions",
    ],
  },
  {
    title: "Community Continuity",
    body: "Build lasting relationships that turn introductions into ongoing collaboration.",
    bullets: [
      "Structured follow-up after events",
      "Opportunities for joint initiatives",
      "Long-term engagement with the WBC network",
    ],
  },
] as const;

function Membership() {
  return (
    <>
      <SplitHero
        eyebrow="Join the Council"
        title="WBC Membership"
        description="Membership connects you to a global network of businesses, institutions, and professionals working together to create opportunity."
        tags={["Five Categories", "Global Access", "Practical Support"]}
        image={membershipImg}
        imageAlt="Business professionals shaking hands during a membership meeting"
        ctaLabel="Become a Member"
        ctaTo="/become-a-member"
      />

      <section id="join" className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading eyebrow="Membership Categories" title="Types of Membership" />
          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TIERS.map((t, i) => (
              <li
                key={t.title}
                className="relative flex flex-col overflow-hidden rounded-card border border-line bg-background p-6 pe-12 transition-shadow duration-300 hover:shadow-card"
              >
                <span className="absolute top-5 end-5 text-[14px] font-bold tabular-nums text-line">0{i + 1}</span>
                <span
                  className="inline-flex size-9 items-center justify-center rounded-md bg-navy/5"
                  aria-hidden="true"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className="text-foreground"
                  >
                    <path d="M4 20a8 8 0 0116 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </span>
                <h2 className="mt-5 text-[17px] leading-snug font-bold text-foreground">{t.title}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-fg">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="benefits" className="scroll-mt-28 border-t border-line bg-surface py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading
            eyebrow="Why Join"
            title="Membership Benefits"
            description="Practical advantages designed to help members build trusted connections, gain visibility, and participate in WBC programmes worldwide."
          />
          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b, i) => (
              <li
                key={b.title}
                className="overflow-hidden rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card sm:p-7"
              >
                <span className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                  Benefit {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[18px] font-bold text-foreground">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{b.body}</p>
                <ul className="mt-5 space-y-2.5">
                  {b.bullets.map((item) => (
                    <li key={item} className="flex gap-2.5 text-[14px] leading-relaxed text-foreground">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="container-wbc grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              title="Who Can Become a Member"
              description="WBC membership is open to businesses of every size, institutions, and individual professionals who share our commitment to collaboration, innovation, and trust. Whether you are an established enterprise, a growing SME, a chamber of commerce, or an independent entrepreneur, there is a place for you in the network."
            />
          </div>
          <div data-reveal className="overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
            <img
              src={membershipImg}
              alt="Business professionals shaking hands during a membership meeting"
              width={1200}
              height={900}
              loading="lazy"
              decoding="async"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <CTASection
        title="Ready to Join WBC?"
        description="Start your application and become part of the global WBC network."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
