import type { PageHeroAppearance, PageHeroMedia } from "@/content/hero";
export type EventCategory = {
  id: string;
  title: string;
  desc: string;
};

export type EventMediaItem = {
  type: string;
  url?: string;
  caption?: string;
  photos?: { url: string }[];
  youtubeUrl?: string;
  youtubeEmbedUrl?: string;
  videoUrl?: string;
};

export type EventAgendaColumn = {
  id: string;
  label: string;
};

export type EventAgenda = {
  columns: EventAgendaColumn[];
  rows: Record<string, string>[];
};

export type EventExhibit = {
  name: string;
  booth?: string;
  description?: string;
  partner?: string;
};

export type EventSpeaker = {
  name: string;
  role: string;
  image?: string;
};

export type EventBrand = {
  name: string;
  logo?: string;
  href?: string;
};

export type EventGlanceItem = {
  label: string;
  value: string;
};

export type EventSocialLink = {
  platform: string;
  label: string;
  url: string;
};

export type EventButton = {
  label: string;
  url: string;
};

export type EventRecord = {
  id: string;
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
  socialLinks?: EventSocialLink[];
  glance?: EventGlanceItem[];
  buttons?: EventButton[];
  logistics?: string;
  agenda?: EventAgenda;
  pricing?: EventAgenda;
  pricingCurrency?: string;
  speakers?: EventSpeaker[];
  partners?: EventBrand[];
  sponsors?: EventBrand[];
  participants?: EventAgenda;
  exhibits?: EventExhibit[];
  media?: EventMediaItem[];
};

export type EventsPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  } & PageHeroAppearance & PageHeroMedia;
  categories: EventCategory[];
  events: EventRecord[];
};

export function getEvent(events: EventRecord[], slug: string) {
  return events.find((e) => e.slug === slug);
}

export function eventsByCategory(events: EventRecord[], categoryId?: string) {
  if (!categoryId) return events;
  return events.filter((e) => e.categoryId === categoryId);
}
