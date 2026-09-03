export type MembershipTier = {
  id: string;
  title: string;
  subtitle: string;
  body: string;
  icon: string;
};

export type MembershipHighlight = {
  id: string;
  value: string;
  label: string;
};

export type MembershipWhyItem = {
  id: string;
  title: string;
  body: string;
};

export type MembershipPlanTier = {
  id: string;
  label: string;
  price: string;
};

export type MembershipPlanBenefit = {
  id: string;
  label: string;
  plans: Record<string, boolean>;
};

export type MembershipPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  typesHeader: {
    kicker: string;
    title: string;
    description: string;
    feeNote: string;
    closingParagraph: string;
  };
  highlights: MembershipHighlight[];
  types: MembershipTier[];
  why: {
    title: string;
    items: MembershipWhyItem[];
  };
  benefitsHeader: {
    kicker: string;
    title: string;
    description: string;
    disclaimer: string;
  };
  planTiers: MembershipPlanTier[];
  planBenefits: MembershipPlanBenefit[];
};
