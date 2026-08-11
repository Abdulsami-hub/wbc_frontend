import { createFileRoute } from "@tanstack/react-router";
import heroCity from "@/assets/hero-city.jpg";
import { HeroSlider } from "@/components/HeroSlider";
import { LatestNews } from "@/components/LatestNews";
import { OurPartners } from "@/components/OurPartners";
import { WhatIsWbcSection } from "@/components/home/WhatIsWbcSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { OurValuesSection } from "@/components/home/OurValuesSection";
import { AdvertisingOpportunities } from "@/components/home/AdvertisingOpportunities";

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
    links: [{ rel: "preload", as: "image", href: heroCity, fetchPriority: "high" }],
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
      <OurPartners />
      <AdvertisingOpportunities />
    </>
  );
}
