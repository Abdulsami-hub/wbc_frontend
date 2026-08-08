import { createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import { PageHero } from "@/components/PageHero";
import { Glance } from "@/components/Glance";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — World Business Council" },
      {
        name: "description",
        content:
          "Learn about the World Business Council: an international business support organization headquartered in Paris, founded in 2026.",
      },
      { property: "og:title", content: "About the World Business Council" },
      { property: "og:description", content: "Who we are, our vision, mission, and global presence." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <PageHero
        image={aboutHero}
        width={1600}
        height={800}
        eyebrow="Organization Overview"
        title="About Us"
        description="An international business support organization connecting businesses, entrepreneurs, and institutions across the world."
      />

      <section className="bg-surface py-16 lg:py-20">
        <div className="container-wbc">
          <div className="mx-auto max-w-3xl rounded-card bg-background p-8 text-center shadow-card lg:p-12">
            <p className="eyebrow">Organization Overview</p>
            <h2 className="mt-3 text-[26px] font-bold text-navy lg:text-[32px]">Who We Are</h2>
            <span className="accent-rule mx-auto mt-4" />
            <p className="mt-6 text-left text-[13.5px] leading-relaxed text-muted-fg">
              The World Business Council (WBC) is an international business support organization headquartered in Paris,
              built on a simple belief: behind every business is a person, an idea, and the ambition to create something
              meaningful. We bring businesses, entrepreneurs, professionals, and organizations closer together, helping
              them find the right connections, knowledge, support, and opportunities to move forward. Through our
              international network, WBC turns connections into cooperation, ideas into action, and business
              relationships into lasting opportunities for growth.
            </p>
          </div>
        </div>
      </section>

      <Glance />

      <CTASection
        title="Explore What We Do"
        description="Discover the activities and services through which WBC supports businesses and councils worldwide."
        ctaLabel="What We Do"
        to="/global-network"
      />
    </>
  );
}
