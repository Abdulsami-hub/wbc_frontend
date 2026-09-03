export type NewsItem = {
  id: string;
  slug: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  /** Short summary for cards */
  body: string;
  /** Full intro paragraph for the detail modal */
  detail: string;
  bullets: string[];
  sourceLabel: string;
  sourceUrl: string;
  cta: string;
  dateLabel: string;
  publishedAt: string | null;
};

export type NewsPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  articles: NewsItem[];
};
