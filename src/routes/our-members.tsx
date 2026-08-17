import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CTASection } from "@/components/CTASection";
import heroImg from "@/assets/our-members-hero.png";

const MEMBERS_GRID_LIMIT = 20;

function memberLogo(slug: string, color: string) {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

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
  accent: "orange" | "navy" | "teal" | "blue" | "violet";
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
        name: "United Nations",
        logo: memberLogo("unitednations", "009EDB"),
        href: "https://www.un.org",
      },
      {
        name: "European Union",
        logo: memberLogo("europeanunion", "002395"),
        href: "https://european-union.europa.eu",
      },
      {
        name: "World Health Organization",
        logo: memberLogo("worldhealthorganization", "0093D5"),
        href: "https://www.who.int",
      },
      {
        name: "UNICEF",
        logo: memberLogo("unicef", "1CABE2"),
        href: "https://www.unicef.org",
      },
      {
        name: "International Red Cross",
        logo: memberLogo("redcross", "ED1B2E"),
        href: "https://www.icrc.org",
      },
    ],
  },
  {
    name: "Corporate Members",
    desc: "Corporations, enterprises, and large organizations pursuing strategic partnerships, international visibility, and business opportunity access.",
    accent: "navy",
    kind: "org",
    members: [
      { name: "Microsoft", logo: memberLogo("microsoft", "0078D4"), href: "https://www.microsoft.com" },
      { name: "Google", logo: memberLogo("google", "4285F4"), href: "https://www.google.com" },
      { name: "Amazon", logo: memberLogo("amazon", "FF9900"), href: "https://www.amazon.com" },
      { name: "Apple", logo: memberLogo("apple", "000000"), href: "https://www.apple.com" },
      { name: "Meta", logo: memberLogo("meta", "0081FB"), href: "https://about.meta.com" },
      { name: "Siemens", logo: memberLogo("siemens", "009999"), href: "https://www.siemens.com" },
      { name: "Toyota", logo: memberLogo("toyota", "EB0A1E"), href: "https://www.toyota-global.com" },
      { name: "IBM", logo: memberLogo("ibm", "054ADA"), href: "https://www.ibm.com" },
      { name: "Accenture", logo: memberLogo("accenture", "A100FF"), href: "https://www.accenture.com" },
      { name: "Samsung", logo: memberLogo("samsung", "1428A0"), href: "https://www.samsung.com" },
      { name: "Intel", logo: memberLogo("intel", "0071C5"), href: "https://www.intel.com" },
      { name: "NVIDIA", logo: memberLogo("nvidia", "76B900"), href: "https://www.nvidia.com" },
      { name: "Tesla", logo: memberLogo("tesla", "CC0000"), href: "https://www.tesla.com" },
      { name: "Cisco", logo: memberLogo("cisco", "1BA0D7"), href: "https://www.cisco.com" },
      { name: "SAP", logo: memberLogo("sap", "0FAAFF"), href: "https://www.sap.com" },
      { name: "Boeing", logo: memberLogo("boeing", "0033A0"), href: "https://www.boeing.com" },
      { name: "Airbus", logo: memberLogo("airbus", "00205B"), href: "https://www.airbus.com" },
      { name: "Dell", logo: memberLogo("dell", "007DB8"), href: "https://www.dell.com" },
      { name: "Visa", logo: memberLogo("visa", "1A1F71"), href: "https://www.visa.com" },
      { name: "Mastercard", logo: memberLogo("mastercard", "EB001B"), href: "https://www.mastercard.com" },
      { name: "PayPal", logo: memberLogo("paypal", "00457C"), href: "https://www.paypal.com" },
      { name: "Stripe", logo: memberLogo("stripe", "635BFF"), href: "https://stripe.com" },
      { name: "Spotify", logo: memberLogo("spotify", "1DB954"), href: "https://www.spotify.com" },
      { name: "Airbnb", logo: memberLogo("airbnb", "FF5A5F"), href: "https://www.airbnb.com" },
      { name: "Shopify", logo: memberLogo("shopify", "7AB55C"), href: "https://www.shopify.com" },
      { name: "HubSpot", logo: memberLogo("hubspot", "FF7A59"), href: "https://www.hubspot.com" },
      { name: "Atlassian", logo: memberLogo("atlassian", "0052CC"), href: "https://www.atlassian.com" },
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
        logo: memberLogo("shopify", "7AB55C"),
        href: "https://www.shopify.com",
      },
      {
        name: "HubSpot",
        logo: memberLogo("hubspot", "FF7A59"),
        href: "https://www.hubspot.com",
      },
      {
        name: "Mailchimp",
        logo: memberLogo("mailchimp", "FFE01B"),
        href: "https://mailchimp.com",
      },
      {
        name: "Atlassian",
        logo: memberLogo("atlassian", "0052CC"),
        href: "https://www.atlassian.com",
      },
      {
        name: "Zendesk",
        logo: memberLogo("zendesk", "03363D"),
        href: "https://www.zendesk.com",
      },
    ],
  },
  {
    name: "Individual Members",
    desc: "Entrepreneurs, professionals, and independent consultants advancing cooperation through expertise and cross-border engagement.",
    accent: "blue",
    kind: "person",
    members: [
      {
        name: "Sarah Chen",
        logo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=280&h=280&fit=crop&crop=face",
      },
      {
        name: "James Okonkwo",
        logo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=280&h=280&fit=crop&crop=face",
        href: "https://example.com",
      },
      {
        name: "Elena Rodriguez",
        logo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=280&h=280&fit=crop&crop=face",
      },
      {
        name: "David Müller",
        logo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=280&h=280&fit=crop&crop=face",
      },
      {
        name: "Amira Hassan",
        logo: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=280&h=280&fit=crop&crop=face",
        href: "https://example.com",
      },
    ],
  },
  {
    name: "Honorary Members",
    desc: "Recognised contributors awarded for outstanding service to WBC’s mission and the wider international business community.",
    accent: "violet",
    kind: "org",
    members: [
      {
        name: "Harvard Business School",
        href: "https://www.hbs.edu",
      },
      {
        name: "London School of Economics",
        href: "https://www.lse.ac.uk",
      },
      {
        name: "INSEAD",
        href: "https://www.insead.edu",
      },
      {
        name: "Wharton School",
        href: "https://www.wharton.upenn.edu",
      },
      {
        name: "IE Business School",
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
  blue: {
    bar: "bg-blue",
    glow: "bg-blue/10",
    logoBg: "bg-blue/10",
    logoText: "text-blue",
    ring: "group-hover/tile:border-blue/40",
  },
  violet: {
    bar: "bg-navy-deep",
    glow: "bg-orange/10",
    logoBg: "bg-navy/8",
    logoText: "text-navy",
    ring: "group-hover/tile:border-orange/35",
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
  const [failed, setFailed] = useState(false);
  const isPerson = kind === "person";
  const isPortrait = isPerson && Boolean(member.logo?.includes("unsplash.com"));

  const boxClass = isPerson
    ? "relative flex size-[5.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-background sm:size-24 lg:size-28"
    : "relative flex h-[100px] w-full items-center justify-center overflow-hidden rounded-card border border-line bg-background px-4 py-3 sm:h-[112px] lg:h-[120px]";

  if (member.logo && !failed) {
    return (
      <span className={boxClass}>
        <img
          src={member.logo}
          alt=""
          width={isPerson ? 112 : 220}
          height={isPerson ? 112 : 72}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className={
            isPortrait
              ? "size-full object-cover object-center"
              : isPerson
                ? "max-h-[68%] max-w-[68%] object-contain object-center"
                : "h-14 w-auto max-w-[92%] object-contain object-center sm:h-16 lg:h-[4.75rem]"
          }
        />
      </span>
    );
  }

  return (
    <span className={`${boxClass} ${accent.logoBg}`} aria-hidden={!member.logo}>
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
      <span
        className={`relative font-display font-bold tracking-tight ${isPerson ? "text-[20px] sm:text-[22px]" : "text-[22px] sm:text-[26px]"} ${accent.logoText}`}
      >
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
      <span className="relative mt-4 min-w-0 w-full text-center">
        <span className="block truncate text-[15px] font-bold text-foreground sm:text-[16px]">{member.name}</span>
        <span className="mt-1 block text-[12px] tracking-[0.08em] text-muted-fg uppercase">
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

  const className = `group/tile relative flex h-full w-full flex-col items-center overflow-hidden rounded-card border border-line bg-background px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${accent.ring} sm:px-4 sm:py-6`;

  if (member.href) {
    return (
      <a href={member.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

function CategoryMembersList({
  members,
  accent,
  kind,
  categoryId,
}: {
  members: MemberTile[];
  accent: (typeof ACCENT)[Category["accent"]];
  kind: Category["kind"];
  categoryId: string;
}) {
  const visible = members.slice(0, MEMBERS_GRID_LIMIT);
  const extra = members.slice(MEMBERS_GRID_LIMIT);
  const extraCount = extra.length;
  const [expanded, setExpanded] = useState(false);
  const visibleCount = visible.length + (expanded ? extraCount : 0);
  const unit = kind === "person" ? (extraCount === 1 ? "profile" : "profiles") : extraCount === 1 ? "organisation" : "organisations";

  const renderGrid = (items: MemberTile[], id: string, animate = false) => (
    <ul
      id={id}
      data-expanded={animate ? "true" : undefined}
      className={`${animate ? "members-grid" : "partner-logo-grid"} grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
    >
      {items.map((m, i) => (
        <li
          key={m.name}
          className="min-w-0"
          style={animate ? { animationDelay: `${Math.min(i, 12) * 35}ms` } : undefined}
        >
          <MemberTileCard member={m} accent={accent} kind={kind} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-8">
      {renderGrid(visible, `members-grid-${categoryId}`)}

      {extraCount > 0 ? (
        <details
          className="mt-5 overflow-hidden rounded-card border border-line bg-surface/60 transition-shadow duration-300 open:shadow-card"
          open={expanded}
          onToggle={(e) => {
            const next = (e.currentTarget as HTMLDetailsElement).open;
            if (next !== expanded) setExpanded(next);
          }}
        >
          <summary
            id={`members-toggle-${categoryId}`}
            className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start marker:content-none hover:bg-surface sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden"
          >
            <span className="min-w-0">
              <span className="block text-[16px] font-bold text-foreground sm:text-[18px]">
                {expanded ? "Hide extra members" : `View ${extraCount} more members`}
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-muted-fg sm:text-[14px]">
                {expanded
                  ? `Showing all ${members.length} ${kind === "person" ? "profiles" : "organisations"}`
                  : `${extraCount} ${unit} — click to expand. Showing ${visibleCount} of ${members.length}`}
              </span>
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line bg-background sm:size-11">
              <ChevronDown
                className={`size-5 text-navy transition-transform duration-300 sm:size-[22px] ${expanded ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </span>
          </summary>
          <div className="border-t border-line px-5 py-5 sm:px-6 sm:py-6">
            {renderGrid(extra, `members-grid-extra-${categoryId}`, true)}
          </div>
        </details>
      ) : null}
    </div>
  );
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
            <p className="text-[12px] font-semibold tracking-[0.2em] text-muted-fg uppercase">
              Category {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-3 text-[24px] leading-tight font-bold text-foreground sm:text-[28px]">{cat.name}</h3>
            <p className="mt-2 text-[13px] font-semibold tracking-[0.06em] text-muted-fg uppercase">
              {cat.members.length} {cat.members.length === 1 ? "profile" : "profiles"}
            </p>
          </div>
          <p className="max-w-3xl text-[16px] leading-relaxed text-muted-fg">{cat.desc}</p>
        </div>

        <hr className="mt-8 border-line" />

        <CategoryMembersList members={cat.members} accent={a} kind={cat.kind} categoryId={String(index)} />
      </div>
    </li>
  );
}

function OurMembers() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block" aria-hidden="true" />
        <div className="lg:grid lg:grid-cols-2">
          <div className="relative z-[1] flex items-center bg-orange lg:absolute lg:inset-y-0 lg:start-0 lg:w-1/2 lg:bg-transparent">
            <div className="w-full px-5 py-12 sm:px-6 lg:py-8 lg:ps-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] lg:pe-10">
              <div className="max-w-xl">
                <p className="intro-1 font-display text-[12px] tracking-[0.22em] text-white uppercase">Our Members</p>
                <h1 className="intro-2 mt-5 text-[34px] leading-[1.05] font-bold text-white sm:text-4xl lg:text-[48px]">
                  Discover the WBC Members Network
                </h1>
                <p className="intro-3 mt-5 max-w-lg text-[16px] leading-relaxed text-white/90">
                  Explore member organizations and individuals across sectors, regions, and specialties to identify credible
                  partners and practical opportunities within the WBC ecosystem.
                </p>
                <ul className="intro-4 mt-7 flex flex-wrap gap-3">
                  {TAGS.map((t) => (
                    <li
                      key={t}
                      className="border border-white/60 px-4 py-2.5 text-[14px] font-semibold text-white"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <a
                  href="#directory"
                  className="intro-4 mt-6 inline-flex items-center gap-2 border-b-2 border-white pb-1 text-[16px] font-bold text-white"
                >
                  Go to member profiles <span aria-hidden="true" className="rtl-mirror">→</span>
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white lg:col-start-2">
            <img
              src={heroImg}
              alt="WBC members networking at a global innovation summit"
              width={1600}
              height={974}
              fetchPriority="high"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
        </div>
      </section>

      <section id="directory" className="py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal>
            <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
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
            <Link to="/membership" className="btn-orange">
              View Membership Categories <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Become Part of the Network"
        description="Join WBC to appear in the members directory and connect with organizations across the globe."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
