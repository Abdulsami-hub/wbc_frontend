import { createFileRoute } from "@tanstack/react-router";
import aboutHero from "@/assets/about-hero.jpg";
import { SplitHero } from "@/components/SplitHero";
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
      <SplitHero
        eyebrow="Organization Overview"
        title="About Us"
        description="An international business support organization connecting businesses, entrepreneurs, and institutions across the world."
        tags={["Paris Headquarters", "Global Network", "Founded 2026"]}
        image={aboutHero}
        imageAlt="Modern office district representing the World Business Council"
        ctaLabel="Who We Are"
        ctaTo="/who-we-are"
      />


      <section id="who-we-are" className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="mx-auto max-w-4xl rounded-card border border-line bg-background p-7 sm:p-10 lg:p-12">
            <p className="font-display text-[12px] tracking-[0.22em] text-muted-fg uppercase">Organization Overview</p>
            <h2 className="mt-4 text-[26px] leading-tight font-bold text-navy sm:text-[34px]">Who We Are</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted-fg">

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
        to="/what-we-do"
      />
    </>
  );
}
