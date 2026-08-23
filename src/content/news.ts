import newsDubai from "@/assets/news-dubai.png";
import newsGold from "@/assets/news-gold.png";
import newsStellantis from "@/assets/news-stellantis.png";

export type NewsItem = {
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
};

export const NEWS: NewsItem[] = [
  {
    slug: "dubai-global-hub-digital-business",
    image: newsDubai,
    alt: "Aerial view of Dubai skyline with Burj Khalifa at golden hour",
    category: "Business News",
    title: "Dubai Strengthens Its Position as a Global Hub for Digital Business",
    body: "Dubai is rapidly developing a digital economy designed to attract high-growth companies, startups and international investors through advanced infrastructure, business-friendly regulation and global connectivity.",
    detail:
      "Dubai is rapidly developing a digital economy designed to attract high-growth companies, startups and international investors. Advanced infrastructure, business-friendly regulation, global connectivity and a growing technology ecosystem are helping the emirate position itself as a leading destination for companies seeking to launch, scale and expand internationally.",
    bullets: [
      "Dubai has more than 20 free zones, supported by incubators and accelerators for startups and scaleups.",
      "The Information and Communication sector contributed €11.1 billion to Dubai's GDP in Q1 2026, growing 2.7% year-on-year.",
      "Dubai's economic agenda targets €24.8 billion in annual economic value from digital transformation projects.",
      "In 2025, Dubai Chamber of Digital Economy supported 1,690 digital startups establishing or expanding in Dubai—39.7% more than in 2024.",
      "International companies represented 75% of the startups supported, demonstrating Dubai's strong appeal to global businesses.",
      "AI-focused companies represented around 15%, while fintech companies accounted for 12% of supported startups.",
      "Dubai is investing in emerging technologies, including Agentic AI, through initiatives supporting private-sector adoption, training, incubation and funding.",
      "The city's Expand North Star event connects startups with investors and international business partners. Its 2025 edition brought together more than 2,000 startups and 1,200 investors managing approximately €1.01 trillion in assets.",
      "Dubai's regulatory framework, including dedicated oversight for virtual assets, is intended to provide businesses with greater regulatory clarity and investment confidence.",
      "The combination of technology, capital, talent, infrastructure and international connectivity is strengthening Dubai's position as a gateway for digital companies entering global markets.",
    ],
    sourceLabel: "Euronews Business – Dubai's competitive advantage for digital business",
    sourceUrl: "https://www.euronews.com/business/2026/08/21/dubais-competitive-advantage-for-digital-business",
    cta: "Explore story",
    dateLabel: "August 2026",
  },
  {
    slug: "stellantis-recalls-software-issue",
    image: newsStellantis,
    alt: "Stellantis headquarters sign and office building",
    category: "Business News",
    title: "Stellantis Recalls Nearly One Million Vehicles Over Software Issue",
    body: "Stellantis is recalling approximately 955,000 vehicles worldwide after a software defect was found to potentially prevent rear-view cameras from displaying properly.",
    detail:
      "Stellantis, one of the world's largest automotive manufacturers and the company behind brands including Jeep, Fiat, Peugeot, Chrysler, Dodge and Ram, is recalling approximately 955,000 vehicles worldwide after a software defect was found to potentially prevent rear-view cameras from displaying properly. The recall highlights the growing importance of software reliability and digital safety systems in modern vehicles.",
    bullets: [
      "Approximately 955,000 vehicles are affected worldwide.",
      "Around 848,000 vehicles are affected in the United States, with another 107,000 in Canada, Mexico and other markets.",
      "The problem involves radio software that can interfere with the rear-view camera display.",
      "Affected vehicles include selected 2026–2027 Chrysler, Dodge, Jeep and Ram models.",
      "Stellantis plans to fix the issue through an over-the-air software update, allowing many vehicles to be repaired without visiting a dealership.",
      "The company said it is not aware of any accidents or injuries related to the defect.",
      "The recall is Stellantis' third major safety campaign in 2026, following other recalls involving its vehicles.",
      "The case illustrates how software, connectivity and digital systems are becoming increasingly important to automotive manufacturing and vehicle safety.",
    ],
    sourceLabel:
      "Euronews Business – Who is automotive giant Stellantis and why did it recall nearly 1 million cars?",
    sourceUrl:
      "https://www.euronews.com/business/2026/08/19/who-is-automotive-giant-stellantis-and-why-did-it-recall-nearly-1-million-cars",
    cta: "Explore story",
    dateLabel: "August 2026",
  },
  {
    slug: "gold-silver-surge-us-debt-concerns",
    image: newsGold,
    alt: "Stacked gold bars representing precious metals markets",
    category: "Business News",
    title: "Gold and Silver Surge as Investors Seek Protection Amid US Debt Concerns",
    body: "Gold and silver prices have risen sharply in August as investors respond to growing concerns over US government debt, a weaker dollar and uncertainty surrounding long-term interest rates.",
    detail:
      "Gold and silver prices have risen sharply in August as investors respond to growing concerns over US government debt, a weaker dollar and uncertainty surrounding long-term interest rates. The rally highlights renewed demand for precious metals as investors look for assets that can help protect portfolios against currency and fiscal risks.",
    bullets: [
      "Gold has risen strongly in August, supported by concerns over US fiscal stability and a softer dollar.",
      "Gold gained more than 4% on 19 August, reaching its highest level since early June.",
      "Silver has also advanced significantly, benefiting from renewed investor demand for precious metals.",
      "The US national debt has surpassed $40 trillion, increasing concerns about the sustainability of government borrowing.",
      "The US Treasury announced larger buybacks of longer-term government bonds, temporarily pushing Treasury yields lower and contributing to the precious-metals rally.",
      "A weaker US dollar has made dollar-denominated gold and silver more attractive to international investors.",
      "Investors are increasingly viewing gold and other hard assets as a hedge against inflation, currency weakness and fiscal uncertainty.",
      "The rally demonstrates how changes in US fiscal policy and financial markets can create new opportunities and risks for international investors and traders.",
      "Analysts continue to monitor US interest-rate policy, inflation, bond yields and government borrowing as key factors influencing precious-metal prices.",
    ],
    sourceLabel:
      "Euronews Business – Gold and silver surge in August as mounting US debt fears rattle markets",
    sourceUrl:
      "https://www.euronews.com/business/2026/08/20/gold-and-silver-surge-in-august-as-mounting-us-debt-fears-rattle-markets",
    cta: "Explore story",
    dateLabel: "August 2026",
  },
];
