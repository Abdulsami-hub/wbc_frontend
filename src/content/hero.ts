import slide1 from "@/assets/hero-slide-1.png";
import slide2 from "@/assets/hero-slide-2.png";
import slide3 from "@/assets/hero-slide-3.png";

/**
 * Editable homepage hero configuration.
 * Change layout, colors, media, and copy here without touching component code.
 */
export type HeroLayout = "split" | "full" | "half-color" | "media";

export type HeroCta = {
  label: string;
  to: string;
  variant?: "outline" | "solid" | "ghost";
};

export type HeroSlide = {
  id: string;
  layout: HeroLayout;
  eyebrow: string;
  title: string[];
  description: string;
  /** Tailwind panel / overlay classes for brand color control */
  panelClass: string;
  image?: string;
  videoUrl?: string;
  alt?: string;
  primary: HeroCta;
  secondary?: HeroCta;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "connect",
    layout: "half-color",
    eyebrow: "World Business Council",
    title: ["Connecting Businesses.", "Creating Opportunities"],
    description: "Building a global network that empowers businesses through collaboration, innovation, and trust.",
    panelClass: "bg-navy",
    image: slide1,
    alt: "Modern glass business centre at dusk with people in the plaza",
    primary: { label: "Who We Are", to: "/who-we-are", variant: "outline" },
    secondary: { label: "What We Do", to: "/what-we-do", variant: "ghost" },
  },
  {
    id: "mission",
    layout: "half-color",
    eyebrow: "World Business Council",
    title: ["Our Mission"],
    description: "Building a global network that empowers businesses through collaboration, innovation, and trust.",
    panelClass: "bg-teal",
    image: slide2,
    alt: "Haussmannian Paris boulevard at dusk",
    primary: { label: "Who We Are", to: "/who-we-are", variant: "outline" },
    secondary: { label: "Join WBC", to: "/become-a-member", variant: "ghost" },
  },
  {
    id: "opportunities",
    layout: "half-color",
    eyebrow: "World Business Council",
    title: ["Connecting Businesses.", "Creating Opportunities"],
    description: "Building a global network that empowers businesses through collaboration, innovation, and trust.",
    panelClass: "bg-navy-deep",
    image: slide3,
    alt: "Business professionals networking in front of a city skyline at sunset",
    primary: { label: "Who We Are", to: "/who-we-are", variant: "outline" },
    secondary: { label: "What We Do", to: "/what-we-do", variant: "ghost" },
  },
];

export const HERO_INTERVAL_MS = 6000;
