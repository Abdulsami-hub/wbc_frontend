export type AffiliateGuideHero = {
  kicker: string;
  title: string;
  description: string;
  tags: string[];
  cta?: { label: string; url: string };
  image?: string;
  imageAlt: string;
};

export type AffiliateGuideOverview = {
  title: string;
  descriptionLeft: string;
  descriptionRight: string;
};

export type AffiliateGuideTypeCard = {
  id: string;
  kind: "national" | "local";
  kindLabel: string;
  title: string;
  description: string;
  items: string[];
  footerNote?: string;
};

export type AffiliateGuideEligibilityBlock = {
  id: string;
  kind: "eligibility" | "qualifications";
  kindLabel: string;
  title: string;
  description: string;
  items: string[];
};

export type AffiliateGuideProcessStep = {
  id: string;
  step: string;
  title: string;
  intro: string;
  items: string[];
};

export type AffiliateGuideProcess = {
  title: string;
  description: string;
  steps: AffiliateGuideProcessStep[];
};

export type AffiliateGuideSupportCard = {
  id: string;
  title: string;
  body: string;
};

export type AffiliateGuideFinancial = {
  title: string;
  description: string;
  buttonLabel?: string;
  buttonUrl?: string;
};

export type AffiliateGuideCompliance = {
  title: string;
  description: string;
  items: string[];
};

export type AffiliateGuideNextStep = {
  title: string;
  description: string;
};

export type AffiliateGuidePageContent = {
  hero: AffiliateGuideHero;
  overview: AffiliateGuideOverview;
  benefits: string[];
  types: AffiliateGuideTypeCard[];
  eligibilityBlocks: AffiliateGuideEligibilityBlock[];
  process: AffiliateGuideProcess;
  supports: AffiliateGuideSupportCard[];
  financial: AffiliateGuideFinancial;
  compliance: AffiliateGuideCompliance;
  nextStep: AffiliateGuideNextStep;
};

export const AFFILIATE_GUIDE_TOC = [
  { id: "overview", label: "Overview" },
  { id: "why", label: "Why establish" },
  { id: "types", label: "Affiliate types" },
  { id: "eligibility", label: "Who can apply" },
  { id: "process", label: "Application process" },
  { id: "support", label: "Headquarters support" },
  { id: "compliance", label: "Governance" },
] as const;

export function typeKindLabel(kind: string): string {
  return kind === "national" ? "National level" : kind === "local" ? "Local level" : kind;
}

export function eligibilityKindLabel(kind: string): string {
  return kind === "qualifications" ? "Qualifications" : "Eligibility";
}
