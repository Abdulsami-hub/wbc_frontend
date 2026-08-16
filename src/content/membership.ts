export const MEMBERSHIP_TIERS = [
  {
    title: "Institutional",
    subtitle: "Membership",
    body: "Business Councils, chambers of commerce, associations, NGOs, foundations, universities, and other non-profit or membership-based organizations.",
    icon: "building",
  },
  {
    title: "Corporate/Enterprise",
    subtitle: "Membership",
    body: "Corporations, enterprises, and large business organizations seeking strategic partnerships, international visibility, and business opportunities.",
    icon: "brief",
  },
  {
    title: "SME",
    subtitle: "Membership",
    body: "Micro, small, and medium-sized enterprises (SMEs), startups, entrepreneurs, and freelancers seeking growth, networking, and market access opportunities.",
    icon: "growth",
  },
  {
    title: "Individual",
    subtitle: "Membership",
    body: "Professionals, executives, investors, consultants, researchers, academics, students, and other individuals interested in business and international networking.",
    icon: "user",
  },
  {
    title: "Honorary",
    subtitle: "Membership",
    body: "Individuals or organizations recognized for their outstanding contribution to business development, international cooperation, or the objectives of WBC.",
    icon: "star",
  },
] as const;

export const WHY_JOIN = [
  {
    title: "Global Networking",
    body: "Connect with businesses, organizations, entrepreneurs, and professionals from around the world.",
  },
  {
    title: "Strategic Partnerships",
    body: "Build valuable partnerships and explore new business, investment, and collaboration opportunities.",
  },
  {
    title: "International Visibility",
    body: "Increase your organization's visibility through WBC's global network, events, and platforms.",
  },
  {
    title: "Access to Events",
    body: "Participate in international conferences, forums, networking events, trade missions, and business meetings.",
  },
  {
    title: "Business Support Services",
    body: "Benefit from guidance, market insights, business referrals, and international connections.",
  },
  {
    title: "Knowledge & Learning",
    body: "Access workshops, training programs, expert discussions, and best practices from global business leaders.",
  },
  {
    title: "Market Access Opportunities",
    body: "Explore new markets and connect with potential partners, clients, suppliers, and investors worldwide.",
  },
  {
    title: "Advocacy & Representation",
    body: "Contribute to discussions and initiatives that support businesses and strengthen the business community.",
  },
  {
    title: "Global Community",
    body: "Become part of a trusted international community committed to collaboration, innovation, and sustainable growth.",
  },
  {
    title: "Recognition & Credibility",
    body: "Demonstrate your commitment to international business engagement through affiliation with the World Business Council.",
  },
] as const;

export const PLAN_TIERS = [
  { id: "institutional", label: "Institutional", price: "1000 € / Year" },
  { id: "enterprise", label: "Enterprise", price: "1000 € / Year" },
  { id: "sme", label: "SME", price: "200 € / Year" },
  { id: "individual", label: "Individual", price: "50 € / Year" },
] as const;

export type PlanId = (typeof PLAN_TIERS)[number]["id"];

export const ALL_PLAN_BENEFITS: { label: string; plans: Record<PlanId, boolean> }[] = [
  {
    label: "Use of WBC Membership Certificate & Recognition",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Global Networking Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Access to WBC Events, Forums & Conferences",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Training & Professional Development Programs",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Market Access & International Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Exclusive Member Programs & Networking Activities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Advocacy & Representation Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Access to Knowledge, Research & Industry Insights",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Participation in Committees & Working Groups",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Member Directory Listing",
    plans: { institutional: true, enterprise: true, sme: true, individual: true },
  },
  {
    label: "Business Matchmaking Services",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Business Support & Advisory Services",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Social Media Promotion Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Website Profile & Visibility",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Inclusion in Newsletters & Publications",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Event Sponsorship & Branding Opportunities",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Participation in Trade Missions & Business Delegations",
    plans: { institutional: true, enterprise: true, sme: true, individual: false },
  },
  {
    label: "Speaking Opportunities at WBC Events",
    plans: { institutional: true, enterprise: true, sme: false, individual: false },
  },
  {
    label: "Distribution of Promotional Materials at Events",
    plans: { institutional: true, enterprise: true, sme: false, individual: false },
  },
  {
    label: "Strategic Partnerships & Collaboration Opportunities",
    plans: { institutional: true, enterprise: true, sme: false, individual: false },
  },
];

export const AUDIENCES = [
  "Nonprofit organizations",
  "Corporations",
  "Entrepreneurs",
  "Professionals",
  "Individuals",
  "Students and academics",
] as const;

export const APPLY_STEPS = [
  {
    title: "Fill the Application Form",
    body: "Complete the online Application-Form with your membership details.",
  },
  {
    title: "Process the Payment",
    body: "Submit your annual membership payment to activate your application.",
  },
  {
    title: "Receive Confirmation",
    body: "You will receive the membership confirmation and certificate within 3 working days.",
  },
] as const;
