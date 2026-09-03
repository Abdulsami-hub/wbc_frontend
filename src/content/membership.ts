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

/** Still used by Become a Member until that page is CMS-wired. */
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
