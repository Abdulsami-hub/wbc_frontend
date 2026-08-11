import { createFileRoute, Link } from "@tanstack/react-router";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import { OurPartners } from "@/components/OurPartners";
import networkBg from "@/assets/network-bg.jpg";

export const Route = createFileRoute("/global-network/strategic-partners")({
  head: () => ({
    meta: [
      { title: "Strategic Partners — World Business Council" },
      {
        name: "description",
        content:
          "Organizations partnering with WBC to deliver programmes, events, and joint initiatives across the global network.",
      },
      { property: "og:title", content: "Strategic Partners — WBC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StrategicPartners,
});

function StrategicPartners() {
  return (
    <>
      <SplitHero
        eyebrow="Global Network"
        title="Strategic Partners"
        description="Organizations partnering with WBC to deliver programmes, events, and joint initiatives."
        tags={["Programmes", "Events", "Joint Initiatives"]}
        image={networkBg}
        imageAlt="Global cooperation network"
        ctaLabel="Partner with WBC"
        ctaTo="/contact"
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc max-w-3xl">
          <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-10 transition-shadow duration-300 hover:shadow-card">
            <h2 className="text-[24px] font-bold text-foreground">Partnership approach</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg">
              Strategic partners work with WBC on shared programmes — from forums and trade missions to research,
              capacity building, and institutional dialogues. Partnerships are designed to be practical, accountable,
              and aligned with the council's mission of collaboration, innovation, and trust.
            </p>
            <Link to="/contact" className="btn-orange mt-8 inline-flex">
              Start a partnership conversation
            </Link>
          </div>
        </div>
      </section>

      <OurPartners />

      <CTASection
        title="Explore the wider network"
        description="See how headquarters, affiliates, members, and partners work together."
        ctaLabel="Global Network"
        to="/global-network"
      />
    </>
  );
}
