export type PartnerAccent = "orange" | "navy" | "teal" | "blue" | "violet";

export type StrategicPartnerTile = {
  id: string;
  name: string;
  logo?: string;
  href?: string;
};

export type StrategicPartnerCategory = {
  id: string;
  name: string;
  desc: string;
  accent: PartnerAccent;
  kindLabel: string;
  partners: StrategicPartnerTile[];
};

export type TitledItem = {
  id: string;
  title: string;
  body: string;
};

export type StrategicPartnersPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  categories: StrategicPartnerCategory[];
  approach: {
    kicker: string;
    title: string;
    description: string;
    descriptionSecondary: string;
  };
  whyPartner: {
    kicker: string;
    items: TitledItem[];
    cta?: { label: string; url: string };
  };
  sponsorCards: TitledItem[];
  whoWePartner: {
    kicker: string;
    title: string;
    description: string;
    pillars: TitledItem[];
  };
  outcomes: {
    kicker: string;
    title: string;
    items: TitledItem[];
  };
  focusAreas: {
    kicker: string;
    title: string;
    items: string[];
  };
  process: {
    kicker: string;
    title: string;
    description: string;
    steps: { id: string; step: string; title: string; body: string }[];
  };
  cta: {
    kicker: string;
    title: string;
    description: string;
    buttons: { label: string; url: string }[];
  };
};

export const PARTNER_ACCENTS: PartnerAccent[] = ["orange", "navy", "teal", "blue", "violet"];

export function normalizePartnerAccent(value: string | null | undefined): PartnerAccent {
  if (value && (PARTNER_ACCENTS as string[]).includes(value)) {
    return value as PartnerAccent;
  }
  return "navy";
}
