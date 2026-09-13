import type { PageHeroAppearance, PageHeroMedia } from "@/content/hero";
export type WhatWeDoService = {
  id: string;
  kicker: string;
  title: string;
  body: string;
  image: string;
  isHome: boolean;
};

export type WhatWeDoPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    imageAlt: string;
  } & PageHeroAppearance & PageHeroMedia;
  services: WhatWeDoService[];
};
