export type AdvertisingFormat = {
  id: string;
  title: string;
  summary: string;
};

/** Replace this file in `public/` (or via admin upload) with the current media kit PDF. */
export const ADVERTISING_RATES_PDF = "/advertising-rates.pdf";
export const ADVERTISING_RATES_PDF_FILENAME = "WBC-Advertising-Media-Kit.pdf";

export const ADVERTISING_HERO = {
  eyebrow: "Advertising",
  title: "Advertising",
  description:
    "The World Business Council (WBC) offers advertising opportunities through its website to help businesses, organizations and institutions increase their visibility and promote their products, services, events and initiatives to an international business audience.",
  tags: ["Footer placement", "Video", "Poster & Banner"],
  ctaLabel: "WBC Advertising Media Kit",
} as const;

export const ADVERTISING_OVERVIEW = {
  kicker: "Website advertising",
  title: "Reach an international business audience",
  description:
    "Advertising space is available in the WBC website footer, providing opportunities to display engaging promotional content and direct visitors to your business or campaign.",
} as const;

export const ADVERTISING_FORMATS: AdvertisingFormat[] = [
  {
    id: "video",
    title: "Video Advertising",
    summary:
      "Promote your business, products, services, events or campaigns through a short promotional video.",
  },
  {
    id: "poster-banner",
    title: "Poster or Banner Advertising",
    summary:
      "Display a professional visual advertisement with a short title, description and website link.",
  },
];

/** @deprecated Use ADVERTISING_FORMATS — kept for any legacy imports */
export const ADVERTISING_PACKAGES = ADVERTISING_FORMATS;
