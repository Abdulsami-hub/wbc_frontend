import { createFileRoute } from "@tanstack/react-router";
import { HERO_SLIDES } from "@/content/hero";
import { HeroSlider } from "@/components/HeroSlider";
import { LatestNews } from "@/components/LatestNews";
// import { OurPartners } from "@/components/OurPartners";
import { WhatIsWbcSection } from "@/components/home/WhatIsWbcSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { OurValuesSection } from "@/components/home/OurValuesSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "World Business Council — Connecting Businesses, Creating Opportunities" },
      {
        name: "description",
        content:
          "WBC is a global business support organization headquartered in Paris, empowering businesses through collaboration, innovation, and trust.",
      },
      { property: "og:title", content: "World Business Council — Connecting Businesses" },
      {
        property: "og:description",
        content: "A global network that empowers businesses through collaboration, innovation, and trust.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: HERO_SLIDES[0]?.image
      ? [{ rel: "preload", as: "image", href: HERO_SLIDES[0].image, fetchPriority: "high" }]
      : [],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSlider />
      <WhatIsWbcSection />
      <FeaturedServices />
      <OurValuesSection />
      <LatestNews />
      {/* <OurPartners /> */}
    </>
  );
}
