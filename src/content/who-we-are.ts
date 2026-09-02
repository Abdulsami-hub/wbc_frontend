export type WhoWeAreValue = {
  id: string;
  title: string;
  body: string;
  icon: string;
  isHome: boolean;
};

export type WhoWeArePageContent = {
  hero: {
    kicker: string;
    title: string;
    description: string;
    tags: string[];
    image?: string;
    imageAlt: string;
  };
  story: {
    kicker: string;
    title: string;
    paragraphs: string[];
  };
  missionVision: {
    visionTitle: string;
    visionDescription: string;
    missionTitle: string;
    missionDescription: string;
  };
  stats: {
    headquarters: string;
    founded: string;
    network: string;
  };
  coreValues: WhoWeAreValue[];
};
