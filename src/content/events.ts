export type EventCategory = {
  id: string;
  title: string;
  desc: string;
};

export type EventMediaItem = {
  type: string;
  url: string;
  caption?: string;
  photos?: { url: string }[];
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
  agenda?: { time: string; title: string }[];
  speakers?: { name: string; role: string }[];
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
  };
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
