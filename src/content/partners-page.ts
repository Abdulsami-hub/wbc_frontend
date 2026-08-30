export const PARTNERS_PAGE_HERO = {
  eyebrow: "Partners and Sponsors",
  title: "Partners and Sponsors",
  description:
    "The World Business Council (WBC) works with institutions, businesses and media organizations that share a commitment to stronger business communities and international cooperation. Through sponsorships and strategic partnerships, organizations can support WBC programmes and initiatives while gaining visibility, business exposure, networking opportunities, and international engagement.",
  tags: ["Sponsorship", "Partnerships", "Global Network"],
  ctaLabel: "Become a Sponsor",
  ctaTo: "/contact",
} as const;

export const SPONSORSHIP_OPPORTUNITIES = {
  kicker: "Sponsorship Opportunities",
  title: "Put your brand in front of a global business audience",
  description:
    "WBC sponsorship provides visibility through our website, events, programmes, campaigns, and international business network. Sponsorship arrangements can be tailored to the sponsor's objectives and level of support.",
} as const;

export const SPONSORSHIP_TYPES = [
  {
    title: "Media Sponsors",
    subtitle: "Amplify business stories. Expand your reach.",
    description:
      "Media Sponsors help WBC reach wider audiences through media exposure, content distribution, and promotional support.",
    items: [
      "Co-branded media campaigns",
      "Event and programme promotion",
      "Editorial and promotional coverage",
      "Content and news distribution",
      "Social media amplification",
      "Cross-promotion through partner networks",
    ],
    footer:
      "Television networks and broadcasters, media organizations, publishers, digital platforms, and business publications are welcome to explore media sponsorship opportunities.",
  },
  {
    title: "Corporate Sponsors",
    subtitle: "Support business development while strengthening your brand.",
    description:
      "Corporate Sponsors support WBC events, programmes, campaigns, and initiatives through financial contributions, services, expertise, or other resources.",
    items: [
      "Event and programme sponsorship",
      "Brand visibility across WBC platforms",
      "Co-branded campaigns",
      "Corporate presentations and speaking opportunities",
      "Networking and business engagement",
      "Visibility among WBC members and partners",
    ],
    footer: null,
  },
  {
    title: "Custom Sponsors",
    subtitle: "Create a sponsorship around your objectives.",
    description:
      "Custom Sponsorship provides a tailored arrangement based on specific objectives, markets, audiences, events, programmes, or campaigns.",
    items: [] as string[],
    footer:
      "It may combine financial, media, in-kind, promotional, or professional support, with customized benefits agreed between WBC and the sponsor.",
  },
] as const;

export const WHY_SPONSOR = {
  kicker: "Why Become a WBC Sponsor?",
  title: "More than visibility — become part of a global business network",
  items: [
    "Brand Visibility through WBC platforms, events, and campaigns",
    "International Exposure to businesses, professionals, and institutions",
    "Digital Promotion through WBC's website and communication channels",
    "Event Visibility at conferences, forums, and networking activities",
    "Business Networking with members, partners, and business leaders",
    "Speaking & Participation opportunities at selected activities",
    "Co-Branded Initiatives and promotional campaigns",
    "Long-Term Engagement with the WBC global network",
  ],
} as const;

export const SPONSORSHIP_SUPPORTS = {
  kicker: "What Your Sponsorship Supports",
  title: "Sponsorship helps WBC develop:",
  items: [
    "Business networking and international events",
    "Trade and investment initiatives",
    "Business Council development",
    "Innovation and entrepreneurship programmes",
    "Research, publications, and business insights",
    "Professional development and capacity building",
    "Regional and international initiatives",
  ],
  closing: "Your support helps WBC connect businesses and create opportunities worldwide.",
} as const;

export const STRATEGIC_PARTNERS_SECTION = {
  kicker: "Strategic Partners",
  title: "Building long-term cooperation",
  description:
    "Strategic Partnerships are designed for organizations seeking structured, long-term collaboration with WBC, rather than sponsorship alone.",
  items: [
    "Joint programmes and initiatives",
    "Conferences, forums, and institutional dialogues",
    "Trade and investment facilitation",
    "Research and knowledge exchange",
    "Capacity building",
    "Regional and international initiatives",
    "Institutional cooperation",
    "Co-branded campaigns and projects",
    "Business introductions and referrals",
  ],
} as const;

export const WHO_CAN_PARTNER = {
  kicker: "Who Can Become a Strategic Partner?",
  title: "WBC welcomes cooperation with:",
  items: [
    "Governments & Public Institutions",
    "Chambers of Commerce",
    "International Organizations",
    "NGOs & Civil Society Organizations",
    "Business & Professional Organizations",
    "Universities & Research Institutions",
    "Companies & Corporate Groups",
  ],
} as const;

export const WHERE_WE_CREATE_VALUE = {
  kicker: "Where We Create Value",
  title: "WBC sponsorships and strategic partnerships can support:",
  items: [
    "Business Networking",
    "International Trade & Investment",
    "Events & Conferences",
    "Innovation & Entrepreneurship",
    "Research & Business Insights",
    "Professional Development",
    "Business Council Development",
    "Sustainable Development",
    "Digital Communication & Media",
  ],
} as const;

export const HOW_IT_WORKS = {
  kicker: "How It Works",
  title: "From conversation to collaboration",
  description: "A clear pathway to build sponsorships and strategic partnerships with WBC.",
  steps: [
    {
      step: "01",
      title: "Start the Conversation",
      body: "Share your organization, objectives, target markets, and preferred sponsorship or partnership.",
    },
    {
      step: "02",
      title: "Develop the Opportunity",
      body: "WBC identifies the appropriate model, activities, visibility, and benefits.",
    },
    {
      step: "03",
      title: "Confirm & Activate",
      body: "We agree the terms and activate the sponsorship, campaign, programme, or partnership.",
    },
    {
      step: "04",
      title: "Build & Grow",
      body: "Successful cooperation can develop into broader and long-term collaboration.",
    },
  ],
} as const;

export const PARTNERS_PAGE_CTA = {
  kicker: "Become a WBC Sponsor or Strategic Partner",
  title: "Let's create opportunities together.",
  description:
    "Whether you want to increase your visibility, reach a global business audience, support WBC initiatives, or build a long-term relationship, WBC offers flexible opportunities for meaningful cooperation.",
  buttons: [
    { label: "Become a Sponsor", to: "/contact" },
    { label: "Download Sponsorship Package", to: "/contact" },
    { label: "Become a Strategic Partner", to: "/contact" },
  ],
} as const;
