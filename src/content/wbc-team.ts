import type { PageHeroAppearance, PageHeroMedia } from "@/content/hero";
export type TeamMemberGroup = {
  slug: string;
  title: string;
  description?: string;
};

export type TeamMemberSocialPlatform =
  | "linkedin"
  | "x"
  | "facebook"
  | "instagram"
  | "bluesky"
  | "youtube"
  | "tiktok"
  | "truth_social"
  | "whatsapp"
  | "telegram"
  | "snapchat";

export type TeamMemberSocialLink = {
  platform: TeamMemberSocialPlatform;
  label: string;
  url: string;
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
  socialLinks: TeamMemberSocialLink[];
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
  } & PageHeroAppearance & PageHeroMedia;
  people: {
    kicker: string;
    title: string;
    description: string;
  };
  memberGroups: TeamMemberGroup[];
  members: TeamMember[];
  collaborations: WbcTeamCollaboration[];
};
