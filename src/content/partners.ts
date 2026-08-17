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

export function partnerLogo(p: Partner) {
  return `https://cdn.simpleicons.org/${p.slug}/${p.color}`;
}

/** Left-column copy aligned to the three partner logo rows on the right. */
export const PARTNER_ROW_COPY: PartnerRowCopy[] = [
  {
    title: "Institutional partners",
    body: "Chambers of commerce, associations, and public institutions amplifying WBC programmes worldwide.",
  },
  {
    title: "Industry & enterprise",
    body: "Companies and platforms collaborating on trade, innovation, and cross-border growth.",
  },
  {
    title: "Global alliances",
    body: "NGOs, international organizations, and regional networks expanding shared impact.",
  },
];

/**
 * Only partners whose logos exist on Simple Icons CDN (HTTP 200 verified).
 * Broken / missing logo sources are excluded so cards always show a real mark.
 */
export const PARTNER_ROWS: Partner[][] = [
  [
    { label: "United Nations", slug: "unitednations", color: "009EDB", href: "https://www.un.org" },
    { label: "European Union", slug: "europeanunion", color: "002395", href: "https://european-union.europa.eu" },
    { label: "WHO", slug: "worldhealthorganization", color: "0093D5", href: "https://www.who.int" },
    { label: "Cisco", slug: "cisco", color: "1BA0D7", href: "https://www.cisco.com" },
    { label: "SAP", slug: "sap", color: "0FAAFF", href: "https://www.sap.com" },
    { label: "Boeing", slug: "boeing", color: "0033A0", href: "https://www.boeing.com" },
    { label: "Airbus", slug: "airbus", color: "00205B", href: "https://www.airbus.com" },
  ],
  [
    { label: "Siemens", slug: "siemens", color: "009999", href: "https://www.siemens.com" },
    { label: "Toyota", slug: "toyota", color: "EB0A1E", href: "https://www.toyota.com" },
    { label: "Accenture", slug: "accenture", color: "A100FF", href: "https://www.accenture.com" },
    { label: "Shopify", slug: "shopify", color: "7AB55C", href: "https://www.shopify.com" },
    { label: "Samsung", slug: "samsung", color: "1428A0", href: "https://www.samsung.com" },
    { label: "Dell", slug: "dell", color: "007DB8", href: "https://www.dell.com" },
    { label: "Intel", slug: "intel", color: "0071C5", href: "https://www.intel.com" },
    { label: "NVIDIA", slug: "nvidia", color: "76B900", href: "https://www.nvidia.com" },
    { label: "Tesla", slug: "tesla", color: "CC0000", href: "https://www.tesla.com" },
  ],
  [
    { label: "Google", slug: "google", color: "4285F4", href: "https://www.google.com" },
    { label: "Airbnb", slug: "airbnb", color: "FF5A5F", href: "https://www.airbnb.com" },
    { label: "Spotify", slug: "spotify", color: "1DB954", href: "https://www.spotify.com" },
    { label: "Stripe", slug: "stripe", color: "635BFF", href: "https://stripe.com" },
    { label: "Visa", slug: "visa", color: "1A1F71", href: "https://www.visa.com" },
    { label: "PayPal", slug: "paypal", color: "00457C", href: "https://www.paypal.com" },
    { label: "Mastercard", slug: "mastercard", color: "EB001B", href: "https://www.mastercard.com" },
    { label: "HubSpot", slug: "hubspot", color: "FF7A59", href: "https://www.hubspot.com" },
    { label: "Atlassian", slug: "atlassian", color: "0052CC", href: "https://www.atlassian.com" },
  ],
];
