export type AffiliateOfficer = {
  name: string;
  position: string;
  photo?: string;
  email?: string;
  phone?: string;
};

export type AffiliateSocial = {
  label: string;
  href?: string;
};

export type AffiliateContact = {
  address?: string;
  website?: string;
  email?: string;
  phone?: string;
  mapEmbedUrl?: string;
  socials: AffiliateSocial[];
};

export type AffiliateMedia = {
  flyer?: string;
  photos: string[];
  videos: string[];
};

export type AffiliateDetails = {
  heroImage?: string;
  logo?: string;
  locationIntro: string;
  about: string;
  services: string[];
  activities: string[];
  officers: AffiliateOfficer[];
  contact: AffiliateContact;
  media: AffiliateMedia;
  established?: string;
  membersCount?: string;
  programmesPerYear?: string;
};

export type AffiliatePageHero = {
  kicker: string;
  title: string;
  description: string;
  tags: string[];
  cta?: { label: string; url: string };
  image?: string;
  imageAlt: string;
};

export type AffiliateFaq = {
  id: string;
  question: string;
  answer: string;
};

export type AffiliatesPageContent = {
  hero: AffiliatePageHero;
  regions: import("@/content/affiliates").AffiliateRegion[];
  faqs: AffiliateFaq[];
};

export function placeTitle(
  profile: { kind: "country" | "city"; name: string; countryName?: string },
): string {
  return profile.kind === "city" && profile.countryName
    ? `${profile.name}, ${profile.countryName}`
    : profile.name;
}

export function emptyAffiliateDetails(): AffiliateDetails {
  return {
    locationIntro: "",
    about: "",
    services: [],
    activities: [],
    officers: [],
    contact: { socials: [] },
    media: { photos: [], videos: [] },
  };
}

export function flagUrlFromIso(iso2: string | undefined | null, width = 160): string | undefined {
  if (!iso2?.trim()) return undefined;
  return `https://flagcdn.com/w${width}/${iso2.trim().toLowerCase()}.png`;
}
