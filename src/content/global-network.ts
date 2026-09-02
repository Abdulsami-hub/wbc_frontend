export type GlobalNetworkStructure = {
  id: string;
  title: string;
  body: string;
  to: string;
};

export type GlobalNetworkStat = {
  value: string;
  label: string;
};

export type GlobalNetworkPageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    cta?: { label: string; url: string };
    image?: string;
    imageAlt: string;
  };
  structures: GlobalNetworkStructure[];
  stats: GlobalNetworkStat[];
};
