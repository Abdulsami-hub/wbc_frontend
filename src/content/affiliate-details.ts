import type { AffiliateProfile } from "@/content/affiliates";

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
};

const COUNTRY_ISO: Record<string, string> = {
  egypt: "eg",
  "united-arab-emirates": "ae",
  morocco: "ma",
  algeria: "dz",
  tunisia: "tn",
  kenya: "ke",
  nigeria: "ng",
  "south-africa": "za",
  ghana: "gh",
  ethiopia: "et",
  senegal: "sn",
  "cote-divoire": "ci",
  "saudi-arabia": "sa",
  qatar: "qa",
  kuwait: "kw",
  bahrain: "bh",
  oman: "om",
  jordan: "jo",
  lebanon: "lb",
  france: "fr",
  germany: "de",
  spain: "es",
  italy: "it",
  netherlands: "nl",
  belgium: "be",
  switzerland: "ch",
  austria: "at",
  sweden: "se",
  denmark: "dk",
  norway: "no",
  ireland: "ie",
  portugal: "pt",
  poland: "pl",
  greece: "gr",
  singapore: "sg",
  japan: "jp",
  "south-korea": "kr",
  australia: "au",
  "new-zealand": "nz",
  india: "in",
  pakistan: "pk",
  afghanistan: "af",
  tajikistan: "tj",
  uzbekistan: "uz",
  kyrgyzstan: "kg",
  kazakhstan: "kz",
  bangladesh: "bd",
  "sri-lanka": "lk",
  nepal: "np",
  mongolia: "mn",
  indonesia: "id",
  malaysia: "my",
  thailand: "th",
  "united-states": "us",
  canada: "ca",
  mexico: "mx",
  "costa-rica": "cr",
  panama: "pa",
  "dominican-republic": "do",
  jamaica: "jm",
  "trinidad-and-tobago": "tt",
  guatemala: "gt",
  "el-salvador": "sv",
  argentina: "ar",
  bolivia: "bo",
  brazil: "br",
  chile: "cl",
  colombia: "co",
  ecuador: "ec",
  paraguay: "py",
  peru: "pe",
  uruguay: "uy",
  venezuela: "ve",
};

/** Override real affiliate content here by slug when it is available. */
export const AFFILIATE_DETAILS: Partial<Record<string, Partial<AffiliateDetails>>> = {};

function hashSlug(slug: string) {
  let n = 0;
  for (let i = 0; i < slug.length; i++) n = (n * 31 + slug.charCodeAt(i)) >>> 0;
  return n;
}

export function countryIso(countrySlug: string): string | undefined {
  return COUNTRY_ISO[countrySlug];
}

export function flagUrl(countrySlug: string, width = 160): string | undefined {
  const iso = countryIso(countrySlug);
  return iso ? `https://flagcdn.com/w${width}/${iso}.png` : undefined;
}

export function placeTitle(profile: Extract<AffiliateProfile, { kind: "country" | "city" }>) {
  return profile.kind === "city" ? `${profile.name}, ${profile.countryName}` : profile.name;
}

export function getAffiliateDetails(
  profile: Extract<AffiliateProfile, { kind: "country" | "city" }>,
): AffiliateDetails {
  const title = placeTitle(profile);
  const countrySlug = profile.kind === "city" ? profile.countrySlug : profile.slug;
  const override = AFFILIATE_DETAILS[profile.slug] ?? {};
  const generated = defaultDetails(profile, title, countrySlug);
  return {
    ...generated,
    ...override,
    services: override.services ?? generated.services,
    activities: override.activities ?? generated.activities,
    officers: override.officers ?? generated.officers,
    contact: { ...generated.contact, ...override.contact, socials: override.contact?.socials ?? generated.contact.socials },
    media: {
      ...generated.media,
      ...override.media,
      photos: override.media?.photos ?? generated.media.photos,
      videos: override.media?.videos ?? generated.media.videos,
    },
  };
}

const FIRST_NAMES = ["Amira", "Luca", "Sofia", "Daniel", "Priya", "Omar", "Elena", "Kenji", "Maya", "Andre"] as const;
const LAST_NAMES = ["Hassan", "Moreau", "Santos", "Okoye", "Chen", "Berg", "Khan", "Silva", "Nakamura", "Dupont"] as const;
const PORTRAITS = [
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=640&h=640&q=80",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=640&h=640&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=640&h=640&q=80",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=640&h=640&q=80",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=640&h=640&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=640&h=640&q=80",
] as const;

function pick<T>(list: readonly T[], seed: number, offset = 0) {
  return list[(seed + offset) % list.length];
}

function mockName(seed: number, offset: number) {
  return `${pick(FIRST_NAMES, seed, offset)} ${pick(LAST_NAMES, seed, offset + 3)}`;
}

function defaultDetails(
  profile: Extract<AffiliateProfile, { kind: "country" | "city" }>,
  title: string,
  countrySlug: string,
): AffiliateDetails {
  const isCity = profile.kind === "city";
  const parent = isCity ? profile.countryName : profile.region;
  const seed = hashSlug(profile.slug);
  const street = 12 + (seed % 86);
  const local = String(10 + (seed % 88)).padStart(2, "0");
  const ext = String(10 + ((seed >> 4) % 88)).padStart(2, "0");

  return {
    // Do not use random city/country photos. Hero image must be set
    // explicitly per affiliate in AFFILIATE_DETAILS[slug].heroImage.
    heroImage: undefined,
    logo: flagUrl(countrySlug, 160),
    locationIntro: isCity
      ? `${profile.name} is a commercial and institutional hub in ${profile.countryName}. The city connects regional enterprise with WBC’s global programmes across trade, investment, and professional networking.`
      : `${profile.name} sits within ${profile.region} as a WBC country affiliate, linking national institutions, chambers, and growing businesses to the Council’s worldwide cooperation framework.`,
    about: `The WBC Affiliate in ${title} represents the World Business Council on the ground. It convenes members, supports cross-border introductions, and delivers local programmes in close coordination with Paris headquarters — while staying rooted in ${parent}. This profile currently uses sample content so the full layout can be reviewed.`,
    services: [
      "Membership onboarding and ongoing member care",
      "Curated introductions across the WBC global network",
      "Trade, investment, and partnership enquiry support",
      "Coordination with chambers, councils, and public bodies",
      "Access to WBC forums, training, and capacity-building",
    ],
    activities: [
      `Quarterly networking receptions in ${isCity ? profile.name : title}`,
      "Market briefings and sector roundtables",
      "Incoming and outgoing business delegations",
      "Workshops on international expansion",
      "Joint campaigns with neighbouring affiliates",
    ],
    officers: [
      {
        name: mockName(seed, 1),
        position: "Chair / President",
        photo: pick(PORTRAITS, seed, 0),
        email: `chair.${profile.slug}@wbccme.org`,
        phone: `+33 1 84 80 ${local} ${ext}`,
      },
      {
        name: mockName(seed, 2),
        position: "Executive Director",
        photo: pick(PORTRAITS, seed, 1),
        email: `director.${profile.slug}@wbccme.org`,
        phone: `+33 1 84 80 ${ext} ${local}`,
      },
      {
        name: mockName(seed, 4),
        position: "Communications Officer",
        photo: pick(PORTRAITS, seed, 2),
        email: `press.${profile.slug}@wbccme.org`,
        phone: `+33 1 84 81 ${local} ${ext}`,
      },
      {
        name: mockName(seed, 5),
        position: "Membership Lead",
        photo: pick(PORTRAITS, seed, 3),
        email: `members.${profile.slug}@wbccme.org`,
        phone: `+33 1 84 82 ${local} ${ext}`,
      },
    ],
    contact: {
      address: `${street} Business Quarter, ${title}`,
      website: "https://www.wbccme.org",
      email: `affiliate.${countrySlug}@wbccme.org`,
      phone: `+33 1 84 80 ${local} ${ext}`,
      socials: [
        { label: "LinkedIn", href: "https://www.linkedin.com/company/wbccme" },
        { label: "Facebook", href: "https://www.facebook.com/WBCCME" },
        { label: "X / Twitter", href: "https://x.com/WBCCME" },
        { label: "Instagram", href: "https://www.instagram.com/wbccme" },
      ],
    },
    media: {
      flyer: undefined,
      photos: [],
      videos: [
        "https://www.youtube.com/embed/LXb3EKWsInQ",
        "https://www.youtube.com/embed/sNhhvQGsMEc",
      ],
    },
  };
}
