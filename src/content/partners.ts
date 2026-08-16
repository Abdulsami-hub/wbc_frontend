export type PartnerRowCopy = {
  title: string;
  body: string;
};

export type Partner = {
  label: string;
  icon: number;
  href?: string;
  logo?: string;
};

export type PartnerType = {
  title: string;
  body: string;
  icon: "chamber" | "ngo" | "intl" | "gov" | "private";
};

export type PartnershipOutcome = {
  title: string;
  body: string;
};

/** Overview copy for the Strategic Partners page. */
export const PARTNERSHIPS_INTRO = {
  eyebrow: "Strategic Partnerships & Institutional Relations",
  title: "Building cooperation that expands global impact",
  body: "WBC develops partnerships with chambers of commerce, NGOs, international organizations, governments, and private sector entities to enhance global cooperation and expand impact across the network.",
} as const;

export const PARTNER_TYPES: PartnerType[] = [
  {
    title: "Chambers of commerce",
    body: "Local and national chambers that connect WBC programmes with business communities, trade promotion, and member services on the ground.",
    icon: "chamber",
  },
  {
    title: "NGOs",
    body: "Mission-driven organizations collaborating on capacity building, inclusive growth, sustainability, and community-focused business initiatives.",
    icon: "ngo",
  },
  {
    title: "International organizations",
    body: "Multilateral and regional institutions working with WBC on dialogue, standards, research, and cross-border cooperation frameworks.",
    icon: "intl",
  },
  {
    title: "Governments",
    body: "Public authorities and agencies engaging on trade facilitation, investment promotion, policy dialogue, and institutional programmes.",
    icon: "gov",
  },
  {
    title: "Private sector entities",
    body: "Companies and enterprise networks partnering on events, market access, innovation, sponsorships, and joint commercial initiatives.",
    icon: "private",
  },
];

export const PARTNERSHIP_OUTCOMES: PartnershipOutcome[] = [
  {
    title: "Enhanced global cooperation",
    body: "Partners gain structured channels to connect institutions, businesses, and professionals across regions under a shared framework of trust.",
  },
  {
    title: "Expanded impact",
    body: "Joint programmes, forums, and introductions amplify reach — turning single-market efforts into coordinated international results.",
  },
  {
    title: "Practical collaboration",
    body: "Partnerships are designed to deliver concrete outcomes: events, referrals, institutional dialogues, and long-term working relationships.",
  },
];

export const PARTNERSHIP_APPROACH = [
  {
    step: "01",
    title: "Align priorities",
    body: "We identify shared goals across trade, investment, institutional development, and network growth.",
  },
  {
    step: "02",
    title: "Design the partnership",
    body: "Roles, deliverables, and timelines are defined so cooperation stays clear, accountable, and measurable.",
  },
  {
    step: "03",
    title: "Deliver together",
    body: "Programmes, events, and introductions are executed jointly — with follow-up that sustains the relationship.",
  },
] as const;

/** Left-column copy aligned to the three partner logo rows on the right. */
export const PARTNER_ROW_COPY: PartnerRowCopy[] = [
  {
    title: "Chambers & institutions",
    body: "Chambers of commerce, associations, and public institutions amplifying WBC programmes worldwide.",
  },
  {
    title: "NGOs & international organizations",
    body: "Civil society and multilateral partners advancing cooperation, capacity building, and shared initiatives.",
  },
  {
    title: "Governments & private sector",
    body: "Public agencies and enterprise partners expanding trade, investment, and cross-border opportunity.",
  },
];

export const PARTNER_ROWS: Partner[][] = [
  [
    { label: "Chamber Alliance", icon: 0 },
    { label: "Trade Council", icon: 3 },
    { label: "Institutional Desk", icon: 2 },
    { label: "Commerce Network", icon: 1 },
  ],
  [
    { label: "Global Compact Circle", icon: 4 },
    { label: "Development Forum", icon: 5 },
    { label: "Policy Bridge", icon: 3 },
    { label: "Regional NGO Hub", icon: 6 },
  ],
  [
    { label: "Investment Agency", icon: 2 },
    { label: "Enterprise Partner", icon: 1 },
    { label: "Public Sector Unit", icon: 5 },
    { label: "Private Sector Guild", icon: 6 },
  ],
];
