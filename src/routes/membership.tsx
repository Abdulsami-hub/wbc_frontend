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
          "Explore WBC membership types: institutional, corporate, SME, individual, and honorary membership, and learn who can join.",
      },
      { property: "og:title", content: "WBC Membership" },
      { property: "og:description", content: "Five membership types for institutions, companies, SMEs, and professionals." },
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
        ctaLabel="Talk to the Membership Team"
        ctaTo="/contact"
      />


      <section id="join" className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading eyebrow="Membership Categories" title="Types of Membership" />
          <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {TIERS.map((t, i) => (
              <li key={t.title} className="relative flex flex-col rounded-card border border-line bg-background p-6 shadow-card">
                <span className="absolute top-5 right-5 text-[14px] font-bold text-line">0{i + 1}</span>
                <span className="inline-flex size-9 items-center justify-center rounded-md bg-orange/10" aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-orange">
                    <path d="M4 20a8 8 0 0116 0" />
                    <circle cx="12" cy="8" r="4" />
                  </svg>
                </span>
                <h2 className="mt-5 text-[17px] leading-snug font-bold text-navy">{t.title}</h2>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted-fg">{t.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-surface py-16 lg:py-20">
        <div className="container-wbc grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              title="Who Can Become a Member"
              description="WBC membership is open to businesses of every size, institutions, and individual professionals who share our commitment to collaboration, innovation, and trust. Whether you are an established enterprise, a growing SME, a chamber of commerce, or an independent entrepreneur, there is a place for you in the network."
            />
          </div>
          <img
            src={membershipImg}
            alt="Business professionals shaking hands during a membership meeting"
            width={1200}
            height={900}
            loading="lazy"
            decoding="async"
            data-reveal
            className="aspect-[4/3] w-full rounded-card object-cover shadow-card"
          />
        </div>
      </section>

      <CTASection
        title="Ready to Join WBC?"
        description="Start the conversation with our membership team and become part of the global WBC network."
        ctaLabel="Become a Member"
        to="/contact"
      />
    </>
  );
}
