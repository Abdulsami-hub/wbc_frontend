import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { LatestNews } from "@/components/LatestNews";
// import { OurPartners } from "@/components/OurPartners";
import { WhatIsWbcSection } from "@/components/home/WhatIsWbcSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { OurValuesSection } from "@/components/home/OurValuesSection";
import { heroSlidesQueryOptions } from "@/lib/queries/hero-slides";
import { whoWeAreQueryOptions } from "@/lib/queries/who-we-are";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    const [heroSlides] = await Promise.all([
      queryClient.ensureQueryData(heroSlidesQueryOptions),
      queryClient.ensureQueryData(whoWeAreQueryOptions),
    ]);
    return heroSlides;
  },
  head: ({ loaderData }) => {
    const firstImage = loaderData?.[0]?.image;
    return {
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
          content:
            "A global network that empowers businesses through collaboration, innovation, and trust.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: firstImage
        ? [{ rel: "preload", as: "image", href: firstImage, fetchPriority: "high" }]
        : [],
    };
  },
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
