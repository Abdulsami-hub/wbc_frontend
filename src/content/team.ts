import p1 from "@/assets/team-1.jpg";
import p2 from "@/assets/team-2.jpg";
import p3 from "@/assets/team-3.jpg";
import p4 from "@/assets/team-4.jpg";
import p5 from "@/assets/team-5.jpg";
import p6 from "@/assets/team-6.jpg";
import p7 from "@/assets/team-7.jpg";
import p8 from "@/assets/team-8.jpg";

export type TeamMember = {
  slug: string;
  name: string;
  role: string;
  image: string;
  bio: string;
  email: string;
  phone: string;
  group: "Board of Directors" | "Secretariat";
};

export const TEAM: TeamMember[] = [
  {
    slug: "richard-bennett",
    name: "Richard Bennett",
    role: "President, Board of Directors",
    image: p1,
    bio: "Richard chairs strategic board sessions and guides long-term positioning, institutional risk controls, and cross-region governance decisions.",
    email: "richard.bennett@wbcouncil.org",
    phone: "+44 20 7093 81 36",
    group: "Board of Directors",
  },
  {
    slug: "mei-tanaka",
    name: "Mei Tanaka",
    role: "Director of Strategy and Policy",
    image: p2,
    bio: "Mei leads policy research and strategic planning, translating member priorities into practical programs across regions and sectors.",
    email: "mei.tanaka@wbcouncil.org",
    phone: "+44 20 7093 81 42",
    group: "Board of Directors",
  },
  {
    slug: "carlos-ibanez",
    name: "Carlos Ibáñez",
    role: "Director of Finance and Audit",
    image: p3,
    bio: "Carlos oversees financial planning, audit readiness, and the reporting standards that keep council operations transparent and accountable.",
    email: "carlos.ibanez@wbcouncil.org",
    phone: "+44 20 7093 81 55",
    group: "Board of Directors",
  },
  {
    slug: "amina-okonkwo",
    name: "Amina Okonkwo",
    role: "Director of Governance and Compliance",
    image: p4,
    bio: "Amina maintains governance frameworks and compliance policies, ensuring council decisions meet international institutional standards.",
    email: "amina.okonkwo@wbcouncil.org",
    phone: "+44 20 7093 81 61",
    group: "Board of Directors",
  },
  {
    slug: "noor-haddad",
    name: "Noor Haddad",
    role: "Secretary-General",
    image: p5,
    bio: "Noor directs the Secretariat, coordinating member services, institutional partnerships, and the delivery of the council's annual agenda.",
    email: "noor.haddad@wbcouncil.org",
    phone: "+44 20 7093 82 10",
    group: "Secretariat",
  },
  {
    slug: "julien-moreau",
    name: "Julien Moreau",
    role: "Operations and Coordination Manager",
    image: p6,
    bio: "Julien runs day-to-day operations and cross-team coordination, keeping programs on schedule across time zones and partners.",
    email: "julien.moreau@wbcouncil.org",
    phone: "+44 20 7093 82 24",
    group: "Secretariat",
  },
  {
    slug: "priya-nair",
    name: "Priya Nair",
    role: "Communications and Outreach Manager",
    image: p7,
    bio: "Priya leads communications and outreach, shaping how the council presents its work to members, institutions, and the wider public.",
    email: "priya.nair@wbcouncil.org",
    phone: "+44 20 7093 82 37",
    group: "Secretariat",
  },
  {
    slug: "lucas-schneider",
    name: "Lucas Schneider",
    role: "Programs Delivery Manager",
    image: p8,
    bio: "Lucas manages program delivery end to end, from planning and logistics to follow-up with members and partner organizations.",
    email: "lucas.schneider@wbcouncil.org",
    phone: "+44 20 7093 82 49",
    group: "Secretariat",
  },
];

export function getTeamMember(slug: string) {
  return TEAM.find((m) => m.slug === slug);
}
