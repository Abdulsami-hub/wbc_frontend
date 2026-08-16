import newsCurrency from "@/assets/news-currency.png";
import newsEuro from "@/assets/news-euro.png";
import newsMember from "@/assets/news-member.jpg";

export type NewsItem = {
  slug: string;
  image: string;
  alt: string;
  category: string;
  title: string;
  body: string;
  cta: string;
  dateLabel: string;
};

export const NEWS: NewsItem[] = [
  {
    slug: "european-markets-business-confidence",
    image: newsCurrency,
    alt: "Currency and market indicators on a trading desk",
    category: "Economy & Finance",
    title: "European Markets Signal Renewed Business Confidence",
    body: "Currency and trade indicators point to renewed momentum across European markets, opening fresh opportunities for members engaged in cross-border commerce.",
    cta: "Explore story",
    dateLabel: "July 2026",
  },
  {
    slug: "innovation-forums-next-gen-tech",
    image: newsMember,
    alt: "Business leaders networking at a WBC forum",
    category: "Innovation",
    title: "Innovation Forums Spotlight Next-Generation Technology",
    body: "WBC highlights how member organizations and partners are engaging with emerging technologies to drive collaboration, productivity, and long-term growth.",
    cta: "View feature",
    dateLabel: "June 2026",
  },
  {
    slug: "cross-border-capital-flows",
    image: newsEuro,
    alt: "Euro and international finance symbols",
    category: "Trade & Investment",
    title: "Cross-Border Capital Flows Shape Global Markets",
    body: "Financial institutions and business leaders track shifting capital movements as companies seek stronger international partnerships and investment pathways.",
    cta: "Read update",
    dateLabel: "June 2026",
  },
];
