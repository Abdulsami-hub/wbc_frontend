import { createFileRoute, Link } from "@tanstack/react-router";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/our-members")({
  head: () => ({
    meta: [
      { title: "Our Members — WBC Members Network Directory" },
      {
        name: "description",
        content:
          "Browse the WBC members network by category: institutional, corporate, SME, individual, and honorary members across sectors and regions.",
      },
      { property: "og:title", content: "Discover the WBC Members Network" },
      {
        property: "og:description",
        content: "Explore member organizations across sectors, regions, and specialties within the WBC ecosystem.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurMembers,
});

const TAGS = ["Cross-sector Members", "International Reach", "Verified Profiles"] as const;

type MemberTile = {
  name: string;
  logo?: string;
  href?: string;
};

type Category = {
  name: string;
  desc: string;
  accent: "orange" | "navy" | "teal" | "coral";
  kind: "org" | "person";
  members: MemberTile[];
};

const CATEGORIES: Category[] = [
  {
    name: "Institutional Members",
    desc: "Business councils, chambers, associations, NGOs, foundations, universities, and other mission-driven membership organizations.",
    accent: "orange",
    kind: "org",
    members: [
      {
        name: "International Chamber of Commerce",
        logo: "https://logo.clearbit.com/iccwbo.org",
        href: "https://iccwbo.org",
      },
      {
        name: "World Trade Organization",
        logo: "https://logo.clearbit.com/wto.org",
        href: "https://www.wto.org",
      },
      {
        name: "OECD",
        logo: "https://logo.clearbit.com/oecd.org",
        href: "https://www.oecd.org",
      },
      {
        name: "UN Global Compact",
        logo: "https://logo.clearbit.com/unglobalcompact.org",
        href: "https://www.unglobalcompact.org",
      },
      {
        name: "World Bank Group",
        logo: "https://logo.clearbit.com/worldbank.org",
        href: "https://www.worldbank.org",
      },
    ],
  },
  {
    name: "Corporate Members",
    desc: "Corporations, enterprises, and large organizations pursuing strategic partnerships, international visibility, and business opportunity access.",
    accent: "navy",
    kind: "org",
    members: [
      {
        name: "Microsoft",
        logo: "https://cdn.simpleicons.org/microsoft/0078D4",
        href: "https://www.microsoft.com",
      },
      {
        name: "Siemens",
        logo: "https://cdn.simpleicons.org/siemens/009999",
        href: "https://www.siemens.com",
      },
      {
        name: "Toyota",
        logo: "https://cdn.simpleicons.org/toyota/EB0A1E",
        href: "https://www.toyota-global.com",
      },
      {
        name: "IBM",
        logo: "https://cdn.simpleicons.org/ibm/054ADA",
        href: "https://www.ibm.com",
      },
      {
        name: "Accenture",
        logo: "https://cdn.simpleicons.org/accenture/A100FF",
        href: "https://www.accenture.com",
      },
    ],
  },
  {
    name: "SME Members",
    desc: "Micro, small, and medium-sized businesses, startups, entrepreneurs, and freelancers focused on growth, networking, and market access.",
    accent: "teal",
    kind: "org",
    members: [
      {
        name: "Shopify",
        logo: "https://cdn.simpleicons.org/shopify/7AB55C",
        href: "https://www.shopify.com",
      },
      {
        name: "HubSpot",
        logo: "https://cdn.simpleicons.org/hubspot/FF7A59",
        href: "https://www.hubspot.com",
      },
      {
        name: "Mailchimp",
        logo: "https://cdn.simpleicons.org/mailchimp/FFE01B",
        href: "https://mailchimp.com",
      },
      {
        name: "Atlassian",
        logo: "https://cdn.simpleicons.org/atlassian/0052CC",
        href: "https://www.atlassian.com",
      },
      {
        name: "Zendesk",
        logo: "https://cdn.simpleicons.org/zendesk/03363D",
        href: "https://www.zendesk.com",
      },
    ],
  },
  {
    name: "Individual Members",
    desc: "Entrepreneurs, professionals, and independent consultants advancing cooperation through expertise and cross-border engagement.",
    accent: "coral",
    kind: "person",
    members: [
      {
        name: "Sarah Chen",
        logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&crop=face",
      },
      {
        name: "James Okonkwo",
        logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=160&h=160&fit=crop&crop=face",
        href: "https://example.com",
      },
      {
        name: "Elena Rodriguez",
        logo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=160&h=160&fit=crop&crop=face",
      },
      {
        name: "David Müller",
        logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&h=160&fit=crop&crop=face",
      },
      {
        name: "Amira Hassan",
        logo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=160&h=160&fit=crop&crop=face",
        href: "https://example.com",
      },
    ],
  },
  {
    name: "Honorary Members",
    desc: "Recognised contributors awarded for outstanding service to WBC’s mission and the wider international business community.",
    accent: "navy",
    kind: "org",
    members: [
      {
        name: "Harvard Business School",
        logo: "https://logo.clearbit.com/hbs.edu",
        href: "https://www.hbs.edu",
      },
      {
        name: "London School of Economics",
        logo: "https://logo.clearbit.com/lse.ac.uk",
        href: "https://www.lse.ac.uk",
      },
      {
        name: "INSEAD",
        logo: "https://logo.clearbit.com/insead.edu",
        href: "https://www.insead.edu",
      },
      {
        name: "Wharton School",
        logo: "https://logo.clearbit.com/wharton.upenn.edu",
      },
      {
        name: "IE Business School",
        logo: "https://logo.clearbit.com/ie.edu",
        href: "https://www.ie.edu",
      },
    ],
  },
];

const ACCENT: Record<
  Category["accent"],
  { bar: string; glow: string; logoBg: string; logoText: string; ring: string }
> = {
  orange: {
    bar: "bg-orange",
    glow: "bg-orange/10",
    logoBg: "bg-orange/10",
    logoText: "text-orange",
    ring: "group-hover/tile:border-orange/40",
  },
  navy: {
    bar: "bg-navy",
    glow: "bg-navy/10",
    logoBg: "bg-navy/10",
    logoText: "text-navy",
    ring: "group-hover/tile:border-navy/35",
  },
  teal: {
    bar: "bg-teal",
    glow: "bg-teal/15",
    logoBg: "bg-teal/10",
    logoText: "text-teal",
    ring: "group-hover/tile:border-teal/45",
  },
  coral: {
    bar: "bg-coral",
    glow: "bg-coral/10",
    logoBg: "bg-coral/10",
    logoText: "text-coral",
    ring: "group-hover/tile:border-coral/40",
  },
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  const compact = name.replace(/[^a-zA-Z0-9]/g, "");
  return (compact.slice(0, 2) || "WB").toUpperCase();
}

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function MemberLogo({
  member,
  accent,
  kind,
}: {
  member: MemberTile;
  accent: (typeof ACCENT)[Category["accent"]];
  kind: Category["kind"];
}) {
  const shape = kind === "person" ? "rounded-full" : "rounded-card";

  if (member.logo) {
    const isPortrait = kind === "person" && member.logo.includes("unsplash.com");

    return (
      <span
        className={`relative flex size-[4.5rem] items-center justify-center overflow-hidden border border-line bg-background ${shape} sm:size-20`}
      >
        <img
          src={member.logo}
          alt=""
          width={80}
          height={80}
          loading="lazy"
          decoding="async"
          className={
            isPortrait
              ? "size-full object-cover"
              : "max-h-[70%] max-w-[70%] object-contain"
          }
        />
      </span>
    );
  }

  return (
    <span
      className={`relative flex size-[4.5rem] items-center justify-center overflow-hidden border border-line ${shape} ${accent.logoBg} sm:size-20`}
      aria-hidden="true"
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
      <span className={`relative font-display text-[22px] font-bold tracking-tight sm:text-[24px] ${accent.logoText}`}>
        {initials(member.name)}
      </span>
    </span>
  );
}

function MemberTileCard({
  member,
  accent,
  kind,
}: {
  member: MemberTile;
  accent: (typeof ACCENT)[Category["accent"]];
  kind: Category["kind"];
}) {
  const inner = (
    <>
      <span
        className={`pointer-events-none absolute -end-8 -top-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100 ${accent.glow}`}
        aria-hidden="true"
      />
      <MemberLogo member={member} accent={accent} kind={kind} />
      <span className="relative mt-5 min-w-0 text-center">
        <span className="block truncate text-[15px] font-bold text-foreground sm:text-[16px]">{member.name}</span>
        <span className="mt-1 block text-[12px] tracking-[0.08em] text-blue uppercase">
          {kind === "person" ? "Member" : "Organisation"}
        </span>
      </span>
      {member.href ? (
        <span className="absolute end-3 top-3 text-muted-fg transition-all duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 group-hover/tile:text-foreground">
          <ArrowUpRight />
        </span>
      ) : null}
    </>
  );

  const className = `group/tile relative flex h-full flex-col items-center overflow-hidden rounded-card border border-line bg-background px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${accent.ring} sm:px-5 sm:py-8`;

  if (member.href) {
    return (
      <a href={member.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

function CategoryBlock({ cat, index }: { cat: Category; index: number }) {
  const a = ACCENT[cat.accent];
  return (
    <li
      data-reveal
      className="group relative overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card"
    >
      <span className={`absolute inset-y-0 start-0 w-1 ${a.bar}`} aria-hidden="true" />
      <span
        className={`pointer-events-none absolute -end-16 -top-16 size-56 rounded-full blur-2xl transition-opacity duration-500 ${a.glow} opacity-60 group-hover:opacity-100`}
        aria-hidden="true"
      />
      <div className="relative p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-start gap-x-10 gap-y-4 lg:flex-nowrap">
          <div className="min-w-[240px] lg:w-[300px] lg:shrink-0">
            <p className="text-[12px] font-semibold tracking-[0.2em] text-blue uppercase">
              Category {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-[24px] leading-tight font-bold text-foreground sm:text-[28px]">{cat.name}</h3>
            <p className="mt-2 text-[13px] font-semibold tracking-[0.06em] text-blue uppercase">
              {cat.members.length} {cat.members.length === 1 ? "profile" : "profiles"}
            </p>
          </div>
          <p className="max-w-3xl text-[16px] leading-relaxed text-muted-fg">{cat.desc}</p>
        </div>

        <hr className="mt-8 border-line" />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {cat.members.map((m) => (
            <li key={m.name}>
              <MemberTileCard member={m} accent={a} kind={cat.kind} />
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function OurMembers() {
  return (
    <>
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-orange px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white uppercase">Our Members</p>
            <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
              Discover the WBC Members Network
            </h1>
            <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
              Explore member organizations and individuals across sectors, regions, and specialties to identify credible
              partners and practical opportunities within the WBC ecosystem.
            </p>
            <ul className="intro-4 mt-10 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="border border-white/60 px-5 py-2.5 text-[14px] font-semibold text-white"
                >
                  {t}
                </li>
              ))}
            </ul>
            <a
              href="#directory"
              className="intro-4 mt-8 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
            >
              Go to member profiles <span aria-hidden="true" className="rtl-mirror">→</span>
            </a>
          </div>
        </div>
        <div className="relative min-h-[240px] overflow-hidden bg-background lg:min-h-0">
          <span className="pointer-events-none absolute right-[-12%] top-[-10%] size-72 rounded-full bg-orange/10 blur-3xl" aria-hidden="true" />
          <svg
            className="absolute inset-0 size-full text-line"
            viewBox="0 0 600 600"
            fill="none"
            stroke="currentColor"
            aria-hidden="true"
          >
            <rect x="60" y="200" width="480" height="90" rx="45" strokeWidth="1.5" />
            <rect x="40" y="300" width="400" height="90" rx="45" strokeWidth="1.5" />
            <rect x="60" y="400" width="300" height="80" rx="40" strokeWidth="1.5" />
            <path d="M300 60l180 180-180 180L120 240z" strokeWidth="1.5" />
          </svg>
        </div>
      </section>

      <section id="directory" className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] text-blue uppercase">
              <span className="size-2 rounded-full bg-orange" aria-hidden="true" /> Member Directory
            </p>
            <h2 className="mt-4 max-w-3xl text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[44px]">
              Browse Members by Category
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
              Explore category groups and open each member profile from its card. Linked members open their website when
              available.
            </p>
          </div>

          <ul className="mt-12 space-y-8">
            {CATEGORIES.map((c, i) => (
              <CategoryBlock key={c.name} cat={c} index={i} />
            ))}
          </ul>

          <div data-reveal className="mt-12">
            <Link to="/membership" hash="join" className="btn-orange">
              View Membership Categories <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Become Part of the Network"
        description="Join WBC to appear in the members directory and connect with organizations across the globe."
        ctaLabel="Become a Member"
        to="/membership"
        hash="application"
      />
    </>
  );
}
