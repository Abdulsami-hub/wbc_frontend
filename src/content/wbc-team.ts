export type TeamMemberGroup = {
  slug: string;
  title: string;
  description?: string;
};

export type TeamMember = {
  id: string;
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  group: string;
  groupLabel: string;
  linkedinUrl?: string;
  xUrl?: string;
};

export type WbcTeamCollaboration = {
  id: string;
  title: string;
  body: string;
};

export type WbcTeamPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  people: {
    kicker: string;
    title: string;
    description: string;
  };
  memberGroups: TeamMemberGroup[];
  members: TeamMember[];
  collaborations: WbcTeamCollaboration[];
};
