export type AdvertisingPackage = {
  id: string;
  title: string;
  summary: string;
};

/** Replace this file in `public/` (or via admin upload) with the current rates PDF. */
export const ADVERTISING_RATES_PDF = "/advertising-rates.pdf";
export const ADVERTISING_RATES_PDF_FILENAME = "WBC-Advertising-Rates.pdf";

export const ADVERTISING_PACKAGES: AdvertisingPackage[] = [
  {
    id: "event-sponsorship",
    title: "Event sponsorship",
    summary:
      "Align your brand with WBC summits, forums, conferences, and trade programmes attended by institutional and corporate decision-makers.",
  },
  {
    id: "digital-print",
    title: "Digital & print features",
    summary:
      "Reach WBC members and partners through newsletters, web placements, and campaign features across the network.",
  },
  {
    id: "partnership-packages",
    title: "Partnership packages",
    summary:
      "Build multi-touch visibility with annual packages spanning events, content, introductions, and network access.",
  },
];
