/**
 * Event categories (mega-menu + listing filters) — edit this list to update navigation.
 */
export type EventCategory = {
  id: string;
  title: string;
  desc: string;
};

export const EVENT_CATEGORIES: EventCategory[] = [
  { id: "summits", title: "Summits & Forums", desc: "High-level executive gatherings" },
  { id: "conferences", title: "Conferences", desc: "Sector and thematic conferences" },
  { id: "networking", title: "Networking Events", desc: "Curated B2B connections" },
  { id: "missions", title: "Trade Missions", desc: "Delegations and market visits" },
  { id: "roundtables", title: "Roundtables", desc: "Focused working sessions" },
  { id: "exhibitions", title: "Exhibitions", desc: "Showcases and expos" },
];

export type EventRecord = {
  slug: string;
  categoryId: string;
  title: string;
  summary: string;
  description: string;
  dateLabel: string;
  location: string;
  image: string;
  registrationUrl?: string;
  registrationFee?: string;
  agenda?: { time: string; title: string }[];
  speakers?: { name: string; role: string }[];
  media?: { type: "photo" | "video" | "poster"; url: string; caption?: string }[];
};

import summitImg from "@/assets/events.jpg";
import missionImg from "@/assets/gov-assembly.jpg";
import networkingEveningImg from "@/assets/gov-secretariat.jpg";
import mediaPhoto from "@/assets/wwd-events-alt.png";
import mediaPoster from "@/assets/news-paris.jpg";

export const EVENTS: EventRecord[] = [
  {
    slug: "global-business-summit-2026",
    categoryId: "summits",
    title: "WBC Global Business Summit 2026",
    summary: "Leaders from institutions and enterprise gather to shape cross-border cooperation.",
    description:
      "The WBC Global Business Summit convenes institutional leaders, corporate executives, and partners for two days of dialogue, partnership building, and programme announcements across trade, investment, and innovation.",
    dateLabel: "12–13 November 2026",
    location: "Paris, France",
    image: summitImg,
    registrationUrl: "/contact",
    registrationFee: "Complimentary for members · Partner rates on request",
    agenda: [
      { time: "09:00", title: "Registration & welcome coffee" },
      { time: "10:00", title: "Opening keynote — Global cooperation outlook" },
      { time: "14:00", title: "Parallel industry roundtables" },
      { time: "17:30", title: "Networking reception" },
    ],
    speakers: [
      { name: "Keynote speaker TBA", role: "Institutional guest" },
      { name: "WBC Board representatives", role: "Council leadership" },
    ],
    media: [
      { type: "photo", url: mediaPhoto, caption: "Previous summit plenary" },
      { type: "poster", url: mediaPoster, caption: "Event poster" },
    ],
  },
  {
    slug: "europe-trade-mission",
    categoryId: "missions",
    title: "Europe Trade & Investment Mission",
    summary: "A focused delegation connecting members with partners across key European markets.",
    description:
      "This mission combines institutional briefings, B2B matchmaking, and site visits designed to accelerate market understanding and partnership formation.",
    dateLabel: "March 2027",
    location: "Multiple European cities",
    image: missionImg,
    registrationUrl: "/contact",
    agenda: [
      { time: "Day 1", title: "Institutional briefings" },
      { time: "Day 2", title: "B2B matchmaking sessions" },
      { time: "Day 3", title: "Site visits & closing" },
    ],
    speakers: [{ name: "Mission facilitators", role: "WBC Secretariat" }],
  },
  {
    slug: "innovation-networking-evening",
    categoryId: "networking",
    title: "Innovation Networking Evening",
    summary: "An evening of curated introductions for innovators, investors, and member companies.",
    description:
      "Small-group facilitation and structured introductions help members turn conversations into practical next steps.",
    dateLabel: "Quarterly",
    location: "Paris & rotating hubs",
    image: networkingEveningImg,
    registrationUrl: "/contact",
    registrationFee: "Member benefit",
  },
];

export function getEvent(slug: string) {
  return EVENTS.find((e) => e.slug === slug);
}

export function eventsByCategory(categoryId?: string) {
  if (!categoryId) return EVENTS;
  return EVENTS.filter((e) => e.categoryId === categoryId);
}
