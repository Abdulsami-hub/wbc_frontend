export type AdvertisingTier = {
  name: string;
  price: string;
  period: string;
  includes: string[];
};

export type AdvertisingPackage = {
  id: string;
  title: string;
  summary: string;
  tiers: AdvertisingTier[];
  notes?: string[];
};

export const ADVERTISING_PACKAGES: AdvertisingPackage[] = [
  {
    id: "event-sponsorship",
    title: "Event sponsorship",
    summary:
      "Align your brand with WBC summits, forums, conferences, and trade programmes attended by institutional and corporate decision-makers.",
    tiers: [
      {
        name: "Title sponsor",
        price: "€15,000",
        period: "per event",
        includes: [
          "Premier logo on all event materials",
          "Opening address or keynote slot",
          "Dedicated exhibition booth",
          "VIP networking dinner for up to 6 guests",
          "Full-page ad in event programme",
        ],
      },
      {
        name: "Gold sponsor",
        price: "€8,000",
        period: "per event",
        includes: [
          "Logo on event website and signage",
          "Panel or workshop speaking slot",
          "Exhibition table at the venue",
          "4 complimentary delegate passes",
          "Half-page ad in event programme",
        ],
      },
      {
        name: "Silver sponsor",
        price: "€4,000",
        period: "per event",
        includes: [
          "Logo on event materials",
          "2 complimentary delegate passes",
          "Brand mention during opening session",
          "Quarter-page ad in event programme",
        ],
      },
      {
        name: "Supporting partner",
        price: "€1,500",
        period: "per event",
        includes: [
          "Logo on event website partner list",
          "1 complimentary delegate pass",
          "Brand mention in post-event summary",
        ],
      },
    ],
    notes: ["Custom packages available for multi-event series or regional programmes."],
  },
  {
    id: "digital-print",
    title: "Digital & print features",
    summary:
      "Reach WBC members and partners through newsletters, web placements, and campaign features across the network.",
    tiers: [
      {
        name: "Homepage feature",
        price: "€1,200",
        period: "per month",
        includes: [
          "Prominent banner on wbc.org homepage",
          "Click-through to your landing page",
          "Inclusion in monthly network digest",
        ],
      },
      {
        name: "Newsletter placement",
        price: "€500",
        period: "per issue",
        includes: [
          "Banner or sponsored block in member newsletter",
          "Distribution to institutional and corporate subscribers",
          "Performance summary after send",
        ],
      },
      {
        name: "Member directory highlight",
        price: "€800",
        period: "per quarter",
        includes: [
          "Featured profile in the members directory",
          "Priority listing within your category",
          "Logo and short description with link",
        ],
      },
      {
        name: "Print insert",
        price: "€600",
        period: "per issue",
        includes: [
          "A5 insert in WBC print publication",
          "Design support for approved artwork",
          "Distribution at events and mailings",
        ],
      },
    ],
    notes: ["Volume discounts apply when booking three or more placements in a 12-month period."],
  },
  {
    id: "partnership-packages",
    title: "Partnership packages",
    summary:
      "Build multi-touch visibility with annual packages spanning events, content, introductions, and network access.",
    tiers: [
      {
        name: "Network partner",
        price: "€12,000",
        period: "per year",
        includes: [
          "Title or gold sponsorship at one flagship event",
          "Quarterly newsletter features",
          "Homepage presence for 3 months",
          "Curated introductions to 6 member organisations",
          "Co-branded thought-leadership article",
        ],
      },
      {
        name: "Growth partner",
        price: "€6,000",
        period: "per year",
        includes: [
          "Silver sponsorship at one WBC event",
          "Two newsletter placements",
          "Member directory highlight for one quarter",
          "Access to partner networking sessions",
        ],
      },
      {
        name: "Visibility partner",
        price: "€3,000",
        period: "per year",
        includes: [
          "Logo on partners page and event materials",
          "One newsletter placement",
          "Supporting partner status at one event",
          "Listing in annual partner report",
        ],
      },
    ],
    notes: ["All packages can be tailored to your sector, region, or campaign goals."],
  },
];

export const ADVERTISING_PROCESS = [
  {
    step: "01",
    title: "Share your goals",
    body: "Tell us your audience, timeline, and budget. We recommend the best mix of sponsorship, digital, and partnership options.",
  },
  {
    step: "02",
    title: "Receive a proposal",
    body: "Within 3 business days you receive a tailored proposal with pricing, deliverables, and available dates.",
  },
  {
    step: "03",
    title: "Confirm & launch",
    body: "Once approved, our team handles artwork, placement, and reporting so your campaign goes live on schedule.",
  },
] as const;

export const ADVERTISING_ESSENTIALS = [
  {
    label: "Audience",
    value: "Institutional leaders, corporate executives, SMEs, and professionals across 40+ countries.",
  },
  {
    label: "Lead time",
    value: "Book at least 4 weeks before an event or 2 weeks before digital placements.",
  },
  {
    label: "Artwork",
    value: "Supply print-ready logos and copy, or use WBC design support (from €150 per asset).",
  },
  {
    label: "Payment",
    value: "50% on confirmation, balance before go-live. Invoicing in EUR, USD, or GBP.",
  },
  {
    label: "Reporting",
    value: "Impressions, clicks, and event attendance summaries provided after each campaign.",
  },
] as const;
