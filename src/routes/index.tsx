import { createFileRoute } from "@tanstack/react-router";
import { HeroSlider } from "@/components/HeroSlider";
import { LatestNews } from "@/components/LatestNews";
// import { OurPartners } from "@/components/OurPartners";
import { WhatIsWbcSection } from "@/components/home/WhatIsWbcSection";
import { FeaturedServices } from "@/components/home/FeaturedServices";
import { OurValuesSection } from "@/components/home/OurValuesSection";
import { heroSlidesQueryOptions } from "@/lib/queries/hero-slides";
import { whatWeDoQueryOptions } from "@/lib/queries/what-we-do";
import { whoWeAreQueryOptions } from "@/lib/queries/who-we-are";
import { seoHead } from "@/lib/seo";

export const Route = createFileRoute("/")({
  loader: async ({ context: { queryClient } }) => {
    const [heroSlides] = await Promise.all([
      queryClient.ensureQueryData(heroSlidesQueryOptions),
      queryClient.ensureQueryData(whoWeAreQueryOptions),
      queryClient.ensureQueryData(whatWeDoQueryOptions),
    ]);
    return heroSlides;
  },
  head: ({ loaderData }) => {
    const firstImage = loaderData?.[0]?.image;
    return seoHead({
      title: "World Business Council (WBC) | Global Business Network",
      description:
        "WBC is a global business support organization connecting businesses through collaboration, innovation, and trust.",
      path: "/",
      image: firstImage,
      preloadImage: firstImage,
      rawTitle: true,
    });
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
