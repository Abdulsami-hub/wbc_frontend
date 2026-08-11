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
  accent: "orange" | "navy" | "teal" | "blue";
  members: MemberTile[];
};

const CATEGORIES: Category[] = [
  {
    name: "Institutional Members",
    desc: "Business councils, chambers, associations, NGOs, foundations, universities, and other mission-driven membership organizations.",
    accent: "orange",
    members: [
      { name: "Member 01", href: "https://example.com" },
      { name: "Member 02" },
      { name: "Member 03", href: "https://example.com" },
      { name: "Member 04" },
      { name: "Member 05" },
    ],
  },
  {
    name: "Corporate Members",
    desc: "Corporations, enterprises, and large organizations pursuing strategic partnerships, international visibility, and business opportunity access.",
    accent: "navy",
    members: [
      { name: "Member 06", href: "https://example.com" },
      { name: "Member 07" },
      { name: "Member 08" },
      { name: "Member 09", href: "https://example.com" },
      { name: "Member 10" },
    ],
  },
  {
    name: "SME Members",
    desc: "Micro, small, and medium-sized businesses, startups, entrepreneurs, and freelancers focused on growth, networking, and market access.",
    accent: "teal",
    members: [
      { name: "Member 11" },
      { name: "Member 12", href: "https://example.com" },
      { name: "Member 13" },
      { name: "Member 14" },
      { name: "Member 15", href: "https://example.com" },
    ],
  },
  {
    name: "Individual & Honorary Members",
    desc: "Professionals, consultants, and recognised contributors advancing WBC's mission through expertise and international engagement.",
    accent: "blue",
    members: [
      { name: "Member 16" },
      { name: "Member 17" },
      { name: "Member 18", href: "https://example.com" },
      { name: "Member 19" },
      { name: "Member 20" },
    ],
  },
];

const ACCENT: Record<Category["accent"], { bar: string; dot: string; text: string; glow: string }> = {
  orange: { bar: "bg-orange", dot: "bg-orange", text: "group-hover/tile:text-foreground", glow: "bg-orange/10" },
  navy: { bar: "bg-navy", dot: "bg-navy", text: "group-hover/tile:text-foreground", glow: "bg-navy/10" },
  teal: { bar: "bg-teal", dot: "bg-teal", text: "group-hover/tile:text-teal", glow: "bg-teal/15" },
  blue: { bar: "bg-blue", dot: "bg-blue", text: "group-hover/tile:text-blue", glow: "bg-blue/10" },
};

function ArrowUpRight() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  );
}

function MemberTileCard({
  member,
  accent,
}: {
  member: MemberTile;
  accent: (typeof ACCENT)[Category["accent"]];
}) {
  const inner = (
    <>
      <span className="flex min-w-0 items-center gap-3">
        {member.logo ? (
          <img src={member.logo} alt="" width={36} height={36} className="size-9 shrink-0 object-contain" />
        ) : (
          <span className={`size-1.5 shrink-0 rounded-full ${accent.dot}`} aria-hidden="true" />
        )}
        <span className={`truncate text-[16px] font-bold text-foreground transition-colors ${accent.text}`}>
          {member.name}
        </span>
      </span>
      {member.href ? (
        <span className="text-foreground transition-transform duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5">
          <ArrowUpRight />
        </span>
      ) : null}
    </>
  );

  const className =
    "group/tile flex items-center justify-between gap-3 rounded-card border border-line bg-surface/60 px-5 py-6 transition-shadow duration-300 hover:shadow-card hover:bg-background";

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
    <li data-reveal className="group relative overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card">
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
          </div>
          <p className="max-w-3xl text-[16px] leading-relaxed text-muted-fg">{cat.desc}</p>
        </div>

        <hr className="mt-8 border-line" />

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {cat.members.map((m) => (
            <li key={m.name}>
              <MemberTileCard member={m} accent={a} />
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
              Explore member organizations across sectors, regions, and specialties to identify credible partners, new
              introductions, and practical opportunities within the WBC ecosystem.
            </p>
            <ul className="intro-4 mt-10 flex flex-wrap gap-3">
              {TAGS.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/60 px-5 py-2.5 text-[14px] font-semibold text-white"
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
            <p className="flex items-center gap-2 text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
              <span className="size-2 rounded-full bg-orange" aria-hidden="true" /> Member Directory
            </p>
            <h2 className="mt-4 max-w-3xl text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[44px]">
              Browse Members by Category
            </h2>
            <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg">
              Explore category groups and open each member profile from its tile. Linked members open their website when
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
        to="/become-a-member"
      />
    </>
  );
}
