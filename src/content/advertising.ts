export type AdvertisingFormat = {
  id: string;
  title: string;
  summary: string;
};

export type AdvertisingPageContent = {
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    imageAlt: string;
  };
  overview: {
    kicker: string;
    title: string;
    description: string;
  };
  formats: AdvertisingFormat[];
  pdf: {
    kicker: string;
    title: string;
    description: string;
    buttonLabel: string;
    fileUrl: string;
    fileName: string;
  };
};
