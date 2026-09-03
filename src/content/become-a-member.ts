export type BecomeAMemberPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  eligibility: {
    kicker: string;
    title: string;
    description: string;
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
    overlayKicker: string;
    overlayText: string;
  };
  audiences: { id: string; label: string }[];
  apply: {
    kicker: string;
    title: string;
    description: string;
    steps: { id: string; title: string; body: string }[];
  };
  form: {
    kicker: string;
    title: string;
    description: string;
  };
};
