export type GovernanceGroupIcon = "user" | "lines" | "shield";

export type GovernanceGroup = {
  id: string;
  slug: string;
  name: string;
  image: string;
  icon: GovernanceGroupIcon;
  role: string;
};

export type GovernanceFaq = {
  id: string;
  question: string;
  answer: string;
};

export type GovernancePageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  structure: {
    title: string;
    description: string;
  };
  groups: GovernanceGroup[];
  faqs: GovernanceFaq[];
};
