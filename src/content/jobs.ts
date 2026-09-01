export type JobRecord = {
  slug: string;
  title: string;
  positionsAvailable: number;
  intro: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  duration: string;
  offers: string[];
  workingArrangement: string;
  workingArrangementNote: string;
  applyEmail: string;
  announcementType: string;
  workType: string;
  compensation: string;
  languages: string[];
  /** Optional role-specific logo; falls back to branded thumbnail */
  logo?: string;
  publishedDate: string;
  applicationDeadline: string;
};

const APPLY_EMAIL = "contact@wbccme.org";

const JOB_DEFAULTS = {
  announcementType: "Internship",
  workType: "Remote · Part-time",
  compensation: "Voluntary / Unpaid",
  languages: ["English"],
  publishedDate: "1 September 2026",
  applicationDeadline: "30 September 2026",
} as const;

const BILINGUAL_LANGUAGES = ["English", "French"] as const;

const STANDARD_DURATION = "6 months, with the possibility of continued collaboration.";

const STANDARD_WORKING_ARRANGEMENT = "Remote | Part-time | Flexible";

const STANDARD_WORKING_NOTE =
  "Team members are expected to regularly contribute to their assigned responsibilities and complete tasks within agreed timelines. WBC will provide guidance and organize online meetings and learning sessions.";

const STANDARD_OFFERS = [
  "Learning and professional development opportunities.",
  "Online guidance and meetings with WBC team members.",
  "International networking opportunities.",
  "Experience working as part of an international team.",
  "Certificate of participation/experience upon successful completion.",
  "Opportunity for continued involvement with WBC based on performance and mutual interest.",
] as const;

export const JOBS: JobRecord[] = [
  {
    slug: "business-development",
    title: "Business Development - Internship",
    positionsAvailable: 5,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for motivated and proactive individuals to join our Business Development team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and anyone interested in gaining practical experience in international business.",
    responsibilities: [
      "Identify potential members, sponsors, and partners.",
      "Research companies, organizations, associations, and business opportunities.",
      "Support membership, sponsorship, and partnership development.",
      "Assist with outreach, communication, and follow-up.",
      "Build and maintain a database of potential contacts.",
      "Contribute ideas to expand WBC's international network.",
      "Collaborate with other Business Development team members.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in business, management, marketing, international relations, economics, communications, or a related field.",
      "Interest in international business and networking.",
      "Good communication and research skills.",
      "Proactive, reliable, and willing to learn.",
      "Ability to work independently and as part of a team.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently from home.",
    ],
    duration: STANDARD_DURATION,
    offers: ["Practical experience in an international business environment.", ...STANDARD_OFFERS],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
  {
    slug: "social-media-management",
    title: "Social Media Management - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for creative, motivated, and proactive individuals to join our Social Media Management team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and anyone interested in social media, digital communications, and international business.",
    responsibilities: [
      "Create and schedule engaging content for LinkedIn, X, and other social media platforms.",
      "Develop posts about WBC activities, business opportunities, events, partnerships, and international business topics.",
      "Support the preparation of visual content, captions, and hashtags.",
      "Monitor social media trends and identify opportunities to increase WBC's visibility and engagement.",
      "Help manage and organize WBC's social media content calendar.",
      "Monitor engagement and provide ideas to improve social media performance.",
      "Collaborate with the WBC team on campaigns, events, and promotional activities.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in marketing, communications, media, digital marketing, business, public relations, or a related field.",
      "Strong interest in social media and digital communications.",
      "Good writing and communication skills.",
      "Creative mindset and ability to develop new content ideas.",
      "Familiarity with LinkedIn, X, and other social media platforms.",
      "Basic knowledge of Canva or similar design tools is an advantage.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: ["Practical experience in international social media and communications.", ...STANDARD_OFFERS],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
  {
    slug: "marketing-communications",
    title: "Marketing & Communications - Internship",
    positionsAvailable: 4,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for motivated, creative, and proactive individuals to join our Marketing & Communications team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and anyone interested in marketing, communications, international business, and global networking.",
    responsibilities: [
      "Support WBC's marketing and communications activities and campaigns.",
      "Assist in preparing newsletters, announcements, promotional materials, and communications.",
      "Help develop marketing content for WBC programs, events, partnerships, and initiatives.",
      "Support the promotion of WBC's membership, events, services, and opportunities.",
      "Assist with email communications and audience engagement.",
      "Research marketing trends and identify new communication opportunities.",
      "Help maintain and organize marketing content and materials.",
      "Collaborate with the Social Media, Events, and Business Development teams.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in marketing, communications, business, public relations, media, digital marketing, or a related field.",
      "Strong interest in marketing and communications.",
      "Good writing, communication, and organizational skills.",
      "Creative mindset and ability to develop new ideas.",
      "Familiarity with Microsoft Office, Google Workspace, Canva, or similar tools is an advantage.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: ["Practical experience in international marketing and communications.", ...STANDARD_OFFERS],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
  {
    slug: "research-development",
    title: "Research & Development - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for motivated, curious, and analytical individuals to join our Research & Development team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and anyone interested in business research, international trade, markets, economics, and global business.",
    responsibilities: [
      "Conduct research on business, trade, investment, and market trends.",
      "Prepare research, summaries, briefs, and reports for WBC activities and initiatives.",
      "Research companies, industries, markets, countries, and international business opportunities.",
      "Collect, organize, and analyze information from reliable sources.",
      "Identify trends, opportunities, and developments relevant to WBC and its members.",
      "Support research for WBC events, publications, projects, and programs.",
      "Contribute ideas for new research topics and WBC initiatives.",
      "Collaborate with other WBC teams and contribute to joint projects.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in business, economics, international relations, international trade, management, finance, research, or a related field.",
      "Strong interest in research, international business, and global markets.",
      "Good research, analytical, writing, and organizational skills.",
      "Ability to find, evaluate, and summarize information from reliable sources.",
      "Good attention to detail and ability to present information clearly.",
      "Familiarity with Microsoft Office, Google Workspace, Excel, or similar tools is an advantage.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: ["Practical experience in international business and research.", ...STANDARD_OFFERS],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
  {
    slug: "events-projects",
    title: "Events & Projects - Internship",
    positionsAvailable: 4,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for organized, motivated, and proactive individuals to join our Events & Projects team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and anyone interested in event management, project coordination, international business, and global networking.",
    responsibilities: [
      "Support the planning and organization of WBC events, forums, conferences, webinars, and meetings.",
      "Assist with event schedules, agendas, invitations, registrations, and participant coordination.",
      "Support communication with speakers, partners, participants, and other stakeholders.",
      "Assist with online event platforms and virtual meeting arrangements.",
      "Support the coordination and implementation of WBC projects and initiatives.",
      "Help prepare event and project materials, presentations, and reports.",
      "Research potential speakers, partners, participants, and event opportunities.",
      "Monitor project tasks and timelines and provide regular updates.",
      "Collaborate with other WBC teams to support successful events and projects.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in event management, project management, business, management, international relations, communications, marketing, or a related field.",
      "Strong interest in events, projects, international business, and networking.",
      "Good organizational, communication, and coordination skills.",
      "Ability to manage multiple tasks and meet deadlines.",
      "Good attention to detail and problem-solving ability.",
      "Familiarity with Microsoft Office, Google Workspace, Zoom, Teams, or similar tools is an advantage.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: ["Practical experience in international events and project coordination.", ...STANDARD_OFFERS],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
  {
    slug: "web-graphic-design",
    title: "Web & Graphic Design - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for creative, motivated, and technically minded individuals to join our Web & Graphic Design team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and anyone interested in web design, graphic design, digital content, and international business.",
    responsibilities: [
      "Support the design and development of WBC's website and digital platforms.",
      "Create graphics and visual materials for WBC events, campaigns, publications, and social media.",
      "Design flyers, banners, presentations, posters, and other promotional materials.",
      "Help maintain and improve the visual consistency of WBC's digital presence.",
      "Support website content updates and basic website management.",
      "Assist with creating visual concepts and layouts for WBC projects and initiatives.",
      "Collaborate with the Marketing, Social Media, Events, and other WBC teams.",
      "Contribute creative ideas to improve WBC's online presence and visual identity.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in graphic design, web design, digital media, visual communication, computer science, IT, multimedia, or a related field.",
      "Good understanding of graphic and/or web design principles.",
      "Experience with Canva, Adobe Creative Cloud, Figma, WordPress, HTML/CSS, or similar tools is an advantage.",
      "Creative mindset and strong attention to detail.",
      "Ability to create professional and engaging visual content.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: [
      "Practical experience in web and graphic design in an international environment.",
      "Opportunities to develop a professional portfolio.",
      "Learning and professional development opportunities.",
      "Online guidance and meetings with WBC team members.",
      "International networking opportunities.",
      "Certificate of participation/experience upon successful completion.",
      "Opportunity for continued involvement with WBC based on performance and mutual interest.",
    ],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
  {
    slug: "legal-affairs",
    title: "Legal Affairs - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for motivated, responsible, and detail-oriented individuals to join our Legal Affairs team. This is a voluntary, unpaid, remote part-time opportunity, suitable for law students, recent graduates, and qualified legal professionals interested in international business, trade, and organizational matters.",
    responsibilities: [
      "Conduct legal research related to international business, trade, associations, partnerships, and organizational matters.",
      "Support the review and preparation of agreements, policies, procedures, and other documents.",
      "Research applicable laws, regulations, and legal developments relevant to WBC activities.",
      "Assist with reviewing partnership, sponsorship, membership, and cooperation agreements.",
      "Support the development and review of WBC's internal policies and governance documents.",
      "Identify potential legal issues and provide research-based observations to the WBC team.",
      "Maintain organized records of legal documents and references.",
      "Collaborate with other WBC teams on legal and organizational matters.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational background in law, international law, business law, commercial law, international trade law, or a related field.",
      "Strong interest in international business and legal affairs.",
      "Good legal research, writing, and analytical skills.",
      "Strong attention to detail and ability to handle confidential information responsibly.",
      "Ability to review documents and communicate findings clearly.",
      "Good command of French and English is required.",
      "Knowledge of additional languages is a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: [
      "Practical experience in international business and legal affairs.",
      "Exposure to international partnerships, trade, governance, and organizational matters.",
      ...STANDARD_OFFERS,
    ],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
    languages: [...BILINGUAL_LANGUAGES],
  },
  {
    slug: "finance-accounting",
    title: "Finance & Accounting - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for organized, responsible, and detail-oriented individuals to join our Finance & Accounting team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and individuals with an educational or professional background in finance and accounting.",
    responsibilities: [
      "Support day-to-day financial and accounting administration.",
      "Help maintain and organize financial records and documents.",
      "Assist with tracking income, expenses, invoices, payments, and receipts.",
      "Support the preparation of basic financial reports and summaries.",
      "Assist with budgeting and financial planning.",
      "Help monitor membership, sponsorship, and other WBC-related payments.",
      "Support the preparation and organization of documents for accounting and financial reporting.",
      "Collaborate with the WBC management and administration teams on financial matters.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational or professional background in accounting, finance, economics, business administration, or a related field.",
      "Good understanding of basic accounting and financial principles.",
      "Strong organizational and analytical skills.",
      "Good attention to detail and ability to handle financial information responsibly.",
      "Familiarity with Excel, Microsoft Office, Google Workspace, or accounting software is an advantage.",
      "Good command of French and English is required.",
      "Additional languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: [
      "Practical experience in finance and accounting within an international organization.",
      ...STANDARD_OFFERS,
    ],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
    languages: [...BILINGUAL_LANGUAGES],
  },
  {
    slug: "administration-hr-assistance",
    title: "Administration & HR Assistance - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for organized, responsible, and people-oriented individuals to join our Administration & HR team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and individuals interested in administration, human resources, organizational management, and international business.",
    responsibilities: [
      "Support day-to-day administrative activities of WBC.",
      "Assist with organizing documents, records, and internal information.",
      "Support the coordination of WBC members, volunteers, and contributors.",
      "Assist with recruitment and onboarding of interns, volunteers, and team members.",
      "Help maintain HR and team records.",
      "Support communication and coordination with team members.",
      "Assist with preparing administrative letters, forms, and internal documents.",
      "Help organize online meetings and internal activities.",
      "Support other administrative and HR tasks as needed.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational or professional background in human resources, business administration, management, administration, organizational management, or a related field.",
      "Good organizational, communication, and coordination skills.",
      "Responsible, reliable, and able to handle information confidentially.",
      "Good attention to detail and ability to manage multiple tasks.",
      "Familiarity with Microsoft Office, Google Workspace, or similar tools is an advantage.",
      "Good command of French and English is required.",
      "Additional languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: [
      "Practical experience in administration and HR within an international organization.",
      ...STANDARD_OFFERS,
    ],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
    languages: [...BILINGUAL_LANGUAGES],
  },
  {
    slug: "software-development",
    title: "Software Development - Internship",
    positionsAvailable: 2,
    intro: "Join the World Business Council (WBC)",
    description:
      "The World Business Council (WBC) is looking for motivated, creative, and technically minded individuals to join our Software Development team. This is a voluntary, unpaid, remote part-time opportunity, suitable for students, recent graduates, and individuals interested in software development, web technologies, and digital solutions.",
    responsibilities: [
      "Support the development and improvement of WBC's website and digital platforms.",
      "Develop and maintain web-based features and applications.",
      "Assist with improving existing systems, functionality, and user experience.",
      "Support database management and integration where required.",
      "Identify and help resolve technical issues and bugs.",
      "Assist with testing, debugging, and improving software.",
      "Explore and recommend suitable technologies and digital solutions for WBC.",
      "Collaborate with the Web & Graphic Design and other WBC teams on digital projects.",
    ],
    requirements: [
      "Currently studying, recently graduated, or have an educational or professional background in computer science, software engineering, information technology, web development, or a related field.",
      "Basic to intermediate knowledge of software or web development.",
      "Familiarity with technologies such as HTML, CSS, JavaScript, PHP, Python, databases, APIs, or similar technologies is an advantage.",
      "Good problem-solving and analytical skills.",
      "Willingness to learn new technologies and work on practical projects.",
      "Good command of English.",
      "French and other languages are a plus.",
      "Ability to work independently and as part of a team.",
    ],
    duration: STANDARD_DURATION,
    offers: [
      "Practical experience in software and web development.",
      "Opportunity to work on real digital projects and build a professional portfolio.",
      ...STANDARD_OFFERS,
    ],
    workingArrangement: STANDARD_WORKING_ARRANGEMENT,
    workingArrangementNote: STANDARD_WORKING_NOTE,
    applyEmail: APPLY_EMAIL,
    ...JOB_DEFAULTS,
  },
];

export const TOTAL_POSITIONS = JOBS.reduce((sum, job) => sum + job.positionsAvailable, 0);

export function getJobDepartment(job: JobRecord): string {
  return job.title.replace(/\s*-\s*Internship$/i, "").trim();
}

/** Compact label for cards, e.g. "30 Sep, 2026". */
export function formatJobDateShort(date: string): string {
  const parts = date.trim().split(/\s+/);
  if (parts.length < 3) return date;
  const [day, month, year] = parts;
  return `${day} ${month.slice(0, 3)}, ${year}`;
}

export function getJob(slug: string): JobRecord | undefined {
  return JOBS.find((job) => job.slug === slug);
}
