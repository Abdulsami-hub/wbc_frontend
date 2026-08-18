import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  PARTNER_CATEGORIES,
  partnerLogo,
  type Partner,
  type PartnerAccent,
  type PartnerCategory,
} from "@/content/partners";

const GRID_LIMIT = 20;

const ACCENT: Record<
  PartnerAccent,
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

function PartnerLogo({
  partner,
  accent,
}: {
  partner: Partner;
  accent: (typeof ACCENT)[PartnerAccent];
}) {
  const [failed, setFailed] = useState(false);
  const boxClass =
    "relative flex h-[100px] w-full items-center justify-center overflow-hidden rounded-card border border-line bg-background px-4 py-3 sm:h-[112px] lg:h-[120px]";

  if (!failed) {
    return (
      <span className={boxClass}>
        <img
          src={partnerLogo(partner)}
          alt=""
          width={220}
          height={72}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-14 w-auto max-w-[92%] object-contain object-center sm:h-16 lg:h-[4.75rem]"
        />
      </span>
    );
  }

  return (
    <span className={`${boxClass} ${accent.logoBg}`} aria-hidden="true">
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/50 to-transparent" />
      <span className={`relative font-display font-bold tracking-tight text-[22px] sm:text-[26px] ${accent.logoText}`}>
        {initials(partner.label)}
      </span>
    </span>
  );
}

function PartnerTileCard({
  partner,
  accent,
  kindLabel,
}: {
  partner: Partner;
  accent: (typeof ACCENT)[PartnerAccent];
  kindLabel: string;
}) {
  const inner = (
    <>
      <span
        className={`pointer-events-none absolute -end-8 -top-8 size-24 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover/tile:opacity-100 ${accent.glow}`}
        aria-hidden="true"
      />
      <PartnerLogo partner={partner} accent={accent} />
      <span className="relative mt-4 min-w-0 w-full text-center">
        <span className="block truncate text-[15px] font-bold text-foreground sm:text-[16px]">{partner.label}</span>
        <span className="mt-1 block text-[12px] tracking-[0.08em] text-muted-fg uppercase">{kindLabel}</span>
      </span>
      {partner.href ? (
        <span className="absolute end-3 top-3 text-muted-fg transition-all duration-300 group-hover/tile:translate-x-0.5 group-hover/tile:-translate-y-0.5 group-hover/tile:text-foreground">
          <ArrowUpRight />
        </span>
      ) : null}
    </>
  );

  const className = `group/tile relative flex h-full w-full flex-col items-center overflow-hidden rounded-card border border-line bg-background px-3 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card ${accent.ring} sm:px-4 sm:py-6`;

  if (partner.href) {
    return (
      <a href={partner.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }

  return <div className={className}>{inner}</div>;
}

function CategoryPartnersList({
  partners,
  accent,
  kindLabel,
  categoryId,
}: {
  partners: Partner[];
  accent: (typeof ACCENT)[PartnerAccent];
  kindLabel: string;
  categoryId: string;
}) {
  const visible = partners.slice(0, GRID_LIMIT);
  const extra = partners.slice(GRID_LIMIT);
  const extraCount = extra.length;
  const [expanded, setExpanded] = useState(false);
  const unit = extraCount === 1 ? "organisation" : "organisations";

  const renderGrid = (items: Partner[], id: string, animate = false) => (
    <ul
      id={id}
      data-expanded={animate ? "true" : undefined}
      className={`${animate ? "members-grid" : "partner-logo-grid"} grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
    >
      {items.map((p, i) => (
        <li
          key={p.slug}
          className="min-w-0"
          style={animate ? { animationDelay: `${Math.min(i, 12) * 35}ms` } : undefined}
        >
          <PartnerTileCard partner={p} accent={accent} kindLabel={kindLabel} />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mt-8">
      {renderGrid(visible, `partners-grid-${categoryId}`)}

      {extraCount > 0 ? (
        <details
          className="mt-5 overflow-hidden rounded-card border border-line bg-surface/60 transition-shadow duration-300 open:shadow-card"
          open={expanded}
          onToggle={(e) => {
            const next = (e.currentTarget as HTMLDetailsElement).open;
            if (next !== expanded) setExpanded(next);
          }}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-start marker:content-none hover:bg-surface sm:px-6 sm:py-5 [&::-webkit-details-marker]:hidden">
            <span className="min-w-0">
              <span className="block text-[16px] font-bold text-foreground sm:text-[18px]">
                {expanded ? "Hide extra logos" : `View ${extraCount} more`}
              </span>
              <span className="mt-1 block text-[13px] leading-relaxed text-muted-fg sm:text-[14px]">
                {expanded
                  ? `Showing all ${partners.length} organisations`
                  : `${extraCount} ${unit} — click to expand`}
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
            {renderGrid(extra, `partners-grid-extra-${categoryId}`, true)}
          </div>
        </details>
      ) : null}
    </div>
  );
}

function CategoryBlock({ cat, index }: { cat: PartnerCategory; index: number }) {
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
              {cat.partners.length} {cat.partners.length === 1 ? "profile" : "profiles"}
            </p>
          </div>
          <p className="max-w-3xl text-[16px] leading-relaxed text-muted-fg">{cat.desc}</p>
        </div>

        <hr className="mt-8 border-line" />

        <CategoryPartnersList
          partners={cat.partners}
          accent={a}
          kindLabel={cat.kindLabel}
          categoryId={String(index)}
        />
      </div>
    </li>
  );
}

export function PartnersDirectory() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface/40 py-14 lg:py-20">
      <div className="container-wbc relative">
        <div data-reveal className="max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.18em] text-orange uppercase">Growing Institutional Network</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-[40px] lg:text-[44px]">
            Our Partners and Sponsors
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
            Trusted institutions, media, and enterprises collaborating with WBC across regions.
          </p>
        </div>

        <ul className="mt-10 space-y-8">
          {PARTNER_CATEGORIES.map((cat, i) => (
            <CategoryBlock key={cat.name} cat={cat} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
