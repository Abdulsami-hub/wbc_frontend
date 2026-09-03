import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/our-members-hero.png";
import { CTASection } from "@/components/CTASection";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import type { OurMemberAccent, OurMemberCategory, OurMemberKind, OurMemberTile } from "@/content/our-members";
import { resolveCmsUrl } from "@/lib/cms-url";
import { ourMembersQueryOptions } from "@/lib/queries/our-members";

const MEMBERS_GRID_LIMIT = 20;

export const Route = createFileRoute("/our-members")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(ourMembersQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    const title = loaderData?.hero.title ?? "Our Members — WBC Members Network Directory";
    const description =
      loaderData?.hero.description ??
      "Browse the WBC members network by category: institutional, corporate, SME, individual, and honorary members across sectors and regions.";

    return {
      meta: [
        { title: `${title} — WBC` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: OurMembers,
});

const ACCENT: Record<
  OurMemberAccent,
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
  kind,
  accent,
}: {
  member: OurMemberTile;
  kind: OurMemberKind;
  accent: (typeof ACCENT)[OurMemberAccent];
}) {
  if (kind === "person") {
    return (
      <span
        className={`relative flex size-[5.75rem] shrink-0 items-center justify-center overflow-hidden rounded-full border border-line sm:size-24 lg:size-28 ${accent.logoBg}`}
      >
        {member.logo ? (
          <img src={member.logo} alt="" className="size-full object-cover object-top" />
        ) : (
          <span className={`text-[22px] font-bold ${accent.logoText}`}>{initials(member.name)}</span>
        )}
      </span>
    );
  }

  return (
    <span
      className={`relative flex h-[100px] w-full items-center justify-center overflow-hidden rounded-card border border-line px-4 sm:h-[112px] lg:h-[120px] ${accent.logoBg}`}
    >
      {member.logo ? (
        <img src={member.logo} alt="" className="max-h-[70%] max-w-[80%] object-contain" />
      ) : (
        <span className={`text-[20px] font-bold tracking-wide ${accent.logoText}`}>{initials(member.name)}</span>
      )}
    </span>
  );
}

function MemberTileCard({
  member,
  accent,
  kind,
}: {
  member: OurMemberTile;
  accent: (typeof ACCENT)[OurMemberAccent];
  kind: OurMemberKind;
}) {
  const inner = (
    <>
      <span
        className={`pointer-events-none absolute -end-8 -top-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100 ${accent.glow}`}
        aria-hidden="true"
      />
      <MemberLogo member={member} kind={kind} accent={accent} />
      <span className="relative mt-4 flex min-w-0 w-full flex-col items-center gap-1.5">
        <span className="line-clamp-2 text-[14px] font-bold leading-snug text-foreground sm:text-[15px]">
          {member.name}
        </span>
        {member.href ? (
          <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-muted-fg transition-colors group-hover/tile:text-navy">
            Visit site
            <ArrowUpRight />
          </span>
        ) : null}
      </span>
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
  members: OurMemberTile[];
  accent: (typeof ACCENT)[OurMemberAccent];
  kind: OurMemberKind;
  categoryId: string;
}) {
  const visible = members.slice(0, MEMBERS_GRID_LIMIT);
  const extra = members.slice(MEMBERS_GRID_LIMIT);
  const extraCount = extra.length;
  const [expanded, setExpanded] = useState(false);
  const visibleCount = visible.length + (expanded ? extraCount : 0);
  const unit = kind === "person" ? (extraCount === 1 ? "profile" : "profiles") : extraCount === 1 ? "organisation" : "organisations";

  const renderGrid = (items: OurMemberTile[], id: string, animate = false) => (
    <ul
      id={id}
      data-expanded={animate ? "true" : undefined}
      className={`${animate ? "members-grid" : "partner-logo-grid"} grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
    >
      {items.map((m, i) => (
        <li
          key={m.id}
          className="min-w-0"
          style={animate ? { animationDelay: `${Math.min(i, 12) * 35}ms` } : undefined}
        >
          <MemberTileCard member={m} accent={accent} kind={kind} />
        </li>
      ))}
    </ul>
  );

  if (members.length === 0) {
    return (
      <p className="mt-8 text-[15px] text-muted-fg">No members published in this category yet.</p>
    );
  }

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

function CategoryBlock({ cat, index }: { cat: OurMemberCategory; index: number }) {
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
          {cat.desc ? <p className="max-w-3xl text-[16px] leading-relaxed text-muted-fg">{cat.desc}</p> : null}
        </div>

        <hr className="mt-8 border-line" />

        <CategoryMembersList members={cat.members} accent={a} kind={cat.kind} categoryId={cat.id} />
      </div>
    </li>
  );
}

function OurMembersSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block" aria-hidden="true" />
        <div className="bg-orange lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-40 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <div className="container-wbc space-y-8">
          <Skeleton className="h-48 w-full rounded-card" />
          <Skeleton className="h-48 w-full rounded-card" />
        </div>
      </section>
    </>
  );
}

function resolveHeroCta(url: string) {
  const hashIndex = url.indexOf("#");
  const pathPart = hashIndex >= 0 ? url.slice(0, hashIndex) : url;
  const hash = hashIndex >= 0 ? url.slice(hashIndex + 1) : undefined;
  const resolved = resolveCmsUrl(pathPart || "/our-members", "/our-members");

  if (resolved.kind === "internal") {
    return { ctaTo: resolved.path, ctaHref: undefined as string | undefined, ctaHash: hash };
  }
  return { ctaTo: undefined, ctaHref: resolved.href, ctaHash: undefined };
}

function OurMembers() {
  const { data, isPending } = useQuery(ourMembersQueryOptions);

  if (isPending) return <OurMembersSkeleton />;
  if (!data) return null;

  const { hero, categories } = data;
  const heroImage = hero.image ?? heroImg;
  const heroCta = hero.cta
    ? resolveHeroCta(hero.cta.url)
    : { ctaTo: "/our-members", ctaHref: undefined as string | undefined, ctaHash: "directory" };

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        tags={hero.tags}
        image={heroImage}
        imageAlt={hero.imageAlt}
        tone="orange"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta.ctaTo}
        ctaHref={heroCta.ctaHref}
        ctaHash={heroCta.ctaHash}
        ctaDownload={heroCta.ctaHref ? false : undefined}
      />

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

          {categories.length > 0 ? (
            <ul className="mt-12 space-y-8">
              {categories.map((c, i) => (
                <CategoryBlock key={c.id} cat={c} index={i} />
              ))}
            </ul>
          ) : (
            <p className="mt-12 text-[16px] text-muted-fg">Member categories will appear here once published.</p>
          )}

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
