export type OurMemberAccent = "orange" | "navy" | "teal" | "blue" | "violet";

export type OurMemberKind = "org" | "person";

export type OurMemberTile = {
  id: string;
  name: string;
  logo?: string;
  href?: string;
};

export type OurMemberCategory = {
  id: string;
  name: string;
  desc: string;
  accent: OurMemberAccent;
  kind: OurMemberKind;
  members: OurMemberTile[];
};

export type OurMembersPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  categories: OurMemberCategory[];
};

export const OUR_MEMBER_ACCENTS: OurMemberAccent[] = [
  "orange",
  "navy",
  "teal",
  "blue",
  "violet",
];

export function normalizeAccent(value: string | null | undefined): OurMemberAccent {
  if (value && (OUR_MEMBER_ACCENTS as string[]).includes(value)) {
    return value as OurMemberAccent;
  }
  return "navy";
}

export function kindFromProfileType(type: string | null | undefined): OurMemberKind {
  return type === "member" ? "person" : "org";
}
