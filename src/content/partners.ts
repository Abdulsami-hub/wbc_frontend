export type PartnerRowCopy = {
  title: string;
  body: string;
};

export type Partner = {
  label: string;
  /** Confirmed available on cdn.simpleicons.org */
  slug: string;
  color: string;
  href?: string;
};

export type PartnerAccent = "orange" | "navy" | "teal";

export type PartnerCategory = {
  name: string;
  desc: string;
  accent: PartnerAccent;
  kindLabel: string;
  partners: Partner[];
};

export function partnerLogo(p: Partner) {
  return `https://cdn.simpleicons.org/${p.slug}/${p.color}`;
}

export const PARTNER_CATEGORIES: PartnerCategory[] = [
  {
    name: "Strategic Partners",
    desc: "Chambers of commerce, associations, and public institutions amplifying WBC programmes worldwide.",
    accent: "orange",
    kindLabel: "Partner",
    partners: [
      { label: "United Nations", slug: "unitednations", color: "009EDB", href: "https://www.un.org" },
      { label: "European Union", slug: "europeanunion", color: "002395", href: "https://european-union.europa.eu" },
      { label: "World Health Organization", slug: "worldhealthorganization", color: "0093D5", href: "https://www.who.int" },
      { label: "UNICEF", slug: "unicef", color: "1CABE2", href: "https://www.unicef.org" },
      { label: "International Red Cross", slug: "redcross", color: "ED1B2E", href: "https://www.icrc.org" },
    ],
  },
  {
    name: "Media Sponsors",
    desc: "Media platforms and publishers extending WBC visibility across global audiences.",
    accent: "navy",
    kindLabel: "Sponsor",
    partners: [
      { label: "Google", slug: "google", color: "4285F4", href: "https://www.google.com" },
      { label: "YouTube", slug: "youtube", color: "FF0000", href: "https://www.youtube.com" },
      { label: "LinkedIn", slug: "linkedin", color: "0A66C2", href: "https://www.linkedin.com" },
      { label: "Spotify", slug: "spotify", color: "1DB954", href: "https://www.spotify.com" },
      { label: "X", slug: "x", color: "000000", href: "https://x.com" },
    ],
  },
  {
    name: "Corporate Sponsors",
    desc: "Companies and platforms collaborating on trade, innovation, and cross-border growth.",
    accent: "teal",
    kindLabel: "Sponsor",
    partners: [
      { label: "Siemens", slug: "siemens", color: "009999", href: "https://www.siemens.com" },
      { label: "Toyota", slug: "toyota", color: "EB0A1E", href: "https://www.toyota.com" },
      { label: "Accenture", slug: "accenture", color: "A100FF", href: "https://www.accenture.com" },
      { label: "Samsung", slug: "samsung", color: "1428A0", href: "https://www.samsung.com" },
      { label: "Intel", slug: "intel", color: "0071C5", href: "https://www.intel.com" },
      { label: "NVIDIA", slug: "nvidia", color: "76B900", href: "https://www.nvidia.com" },
      { label: "Tesla", slug: "tesla", color: "CC0000", href: "https://www.tesla.com" },
      { label: "Cisco", slug: "cisco", color: "1BA0D7", href: "https://www.cisco.com" },
      { label: "SAP", slug: "sap", color: "0FAAFF", href: "https://www.sap.com" },
      { label: "Boeing", slug: "boeing", color: "0033A0", href: "https://www.boeing.com" },
      { label: "Airbus", slug: "airbus", color: "00205B", href: "https://www.airbus.com" },
      { label: "Dell", slug: "dell", color: "007DB8", href: "https://www.dell.com" },
      { label: "Visa", slug: "visa", color: "1A1F71", href: "https://www.visa.com" },
      { label: "Mastercard", slug: "mastercard", color: "EB001B", href: "https://www.mastercard.com" },
      { label: "PayPal", slug: "paypal", color: "00457C", href: "https://www.paypal.com" },
      { label: "Microsoft", slug: "microsoft", color: "0078D4", href: "https://www.microsoft.com" },
      { label: "Amazon", slug: "amazon", color: "FF9900", href: "https://www.amazon.com" },
      { label: "Apple", slug: "apple", color: "000000", href: "https://www.apple.com" },
      { label: "Meta", slug: "meta", color: "0081FB", href: "https://about.meta.com" },
      { label: "IBM", slug: "ibm", color: "054ADA", href: "https://www.ibm.com" },
      { label: "Stripe", slug: "stripe", color: "635BFF", href: "https://stripe.com" },
      { label: "Shopify", slug: "shopify", color: "7AB55C", href: "https://www.shopify.com" },
      { label: "Airbnb", slug: "airbnb", color: "FF5A5F", href: "https://www.airbnb.com" },
      { label: "HubSpot", slug: "hubspot", color: "FF7A59", href: "https://www.hubspot.com" },
      { label: "Atlassian", slug: "atlassian", color: "0052CC", href: "https://www.atlassian.com" },
    ],
  },
];

/** Left-column copy aligned to the three partner logo rows on the home page. */
export const PARTNER_ROW_COPY: PartnerRowCopy[] = PARTNER_CATEGORIES.map((c) => ({
  title: c.name,
  body: c.desc,
}));

export const PARTNER_ROWS: Partner[][] = PARTNER_CATEGORIES.map((c) => c.partners);
