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

export const PARTNER_ROWS: Partner[][] = [
  [
    { label: "Member Network 01", icon: 0 },
    { label: "Strategic Circle 02", icon: 1 },
    { label: "Council Partner 03", icon: 2 },
    { label: "Global Forum 04", icon: 3 },
  ],
  [
    { label: "Alliance Desk 05", icon: 4 },
    { label: "Commerce Platform 06", icon: 5 },
    { label: "Institutional Bridge 07", icon: 3 },
    { label: "Executive Cluster 08", icon: 6 },
  ],
  [
    { label: "Trade Council 09", icon: 2 },
    { label: "Policy Network 10", icon: 1 },
    { label: "Regional Chapter 11", icon: 5 },
    { label: "Innovation Guild 12", icon: 6 },
  ],
];
