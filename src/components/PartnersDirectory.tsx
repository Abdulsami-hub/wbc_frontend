import { useState } from "react";
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
  {
    band: string;
    badge: string;
    tile: string;
    tileHover: string;
    glow: string;
    initials: string;
  }
> = {
  orange: {
    band: "from-orange/15 via-orange/5 to-transparent",
    badge: "bg-orange text-white",
    tile: "border-orange/20 bg-white hover:border-orange/45",
    tileHover: "group-hover:text-orange",
    glow: "bg-orange/20",
    initials: "text-orange",
  },
  navy: {
    band: "from-navy/12 via-navy/5 to-transparent",
    badge: "bg-navy text-white",
    tile: "border-navy/15 bg-white hover:border-navy/35",
    tileHover: "group-hover:text-navy",
    glow: "bg-navy/15",
    initials: "text-navy",
  },
  teal: {
    band: "from-teal/15 via-teal/5 to-transparent",
    badge: "bg-teal text-white",
    tile: "border-teal/20 bg-white hover:border-teal/45",
    tileHover: "group-hover:text-teal",
    glow: "bg-teal/20",
    initials: "text-teal",
  },
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  const compact = name.replace(/[^a-zA-Z0-9]/g, "");
  return (compact.slice(0, 2) || "WB").toUpperCase();
}

function SponsorTile({
  partner,
  accent,
}: {
  partner: Partner;
  accent: (typeof ACCENT)[PartnerAccent];
}) {
  const [failed, setFailed] = useState(false);

  const inner = (
    <>
      <span
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${accent.band}`}
        aria-hidden="true"
      />
      <span className="relative flex h-12 w-full items-center justify-center sm:h-14">
        {!failed ? (
          <img
            src={partnerLogo(partner)}
            alt=""
            width={120}
            height={48}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="max-h-10 w-auto max-w-[88%] object-contain transition-transform duration-300 group-hover:scale-105 sm:max-h-11"
          />
        ) : (
          <span className={`font-display text-lg font-bold ${accent.initials}`}>{initials(partner.label)}</span>
        )}
      </span>
      <span
        className={`relative mt-2 line-clamp-2 text-center text-[11px] font-semibold leading-snug text-muted-fg transition-colors duration-300 ${accent.tileHover}`}
      >
        {partner.label}
      </span>
    </>
  );

  const className = `group relative flex min-h-[108px] flex-col items-center justify-center overflow-hidden rounded-xl border px-3 py-4 shadow-[0_1px_2px_oklch(0.28_0.02_255_/_0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card sm:min-h-[116px] sm:px-4 ${accent.tile}`;

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={partner.label}
        title={partner.label}
      >
        {inner}
      </a>
    );
  }

  return (
    <div className={className} title={partner.label}>
      {inner}
    </div>
  );
}

function SponsorGrid({
  partners,
  accent,
  categoryId,
}: {
  partners: Partner[];
  accent: (typeof ACCENT)[PartnerAccent];
  categoryId: string;
}) {
  const visible = partners.slice(0, GRID_LIMIT);
  const extra = partners.slice(GRID_LIMIT);
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? partners : visible;

  return (
    <div>
      <ul
        className="sponsor-logo-grid grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
        id={`partners-grid-${categoryId}`}
      >
        {shown.map((p) => (
          <li key={p.slug} className="min-w-0">
            <SponsorTile partner={p} accent={accent} />
          </li>
        ))}
      </ul>

      {extra.length > 0 ? (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-background px-5 py-2.5 text-[13px] font-semibold text-foreground transition-colors hover:border-navy hover:text-navy"
            aria-expanded={expanded}
            aria-controls={`partners-grid-${categoryId}`}
          >
            {expanded ? "Show fewer" : `Show all ${partners.length} logos`}
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
              className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function CategorySection({ cat, index }: { cat: PartnerCategory; index: number }) {
  const a = ACCENT[cat.accent];

  return (
    <section data-reveal className="relative overflow-hidden rounded-2xl border border-line bg-background">
      <div className={`absolute inset-x-0 top-0 h-28 bg-gradient-to-b ${a.band}`} aria-hidden="true" />
      <div
        className={`pointer-events-none absolute -end-10 -top-10 size-40 rounded-full blur-3xl ${a.glow}`}
        aria-hidden="true"
      />

      <div className="relative border-b border-line/80 px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-bold tracking-[0.14em] uppercase ${a.badge}`}>
              {cat.kindLabel}
            </span>
            <h3 className="mt-4 text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">{cat.name}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">{cat.desc}</p>
          </div>
          <p className="font-display text-[48px] font-bold leading-none text-foreground/8 tabular-nums sm:text-[56px]">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="relative px-6 py-6 sm:px-8 sm:py-8">
        <SponsorGrid partners={cat.partners} accent={a} categoryId={String(index)} />
      </div>
    </section>
  );
}

export function PartnersDirectory() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-surface/30 py-14 lg:py-20">
      <div
        className="pointer-events-none absolute -start-24 top-10 size-[320px] rounded-full bg-orange/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-16 bottom-0 size-[280px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-wbc relative">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <p className="text-[12px] font-bold tracking-[0.18em] text-orange uppercase">Partner Network</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-[40px] lg:text-[44px]">
            Our Partners and Sponsors
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
            A curated logo wall of institutions, media platforms, and enterprises supporting WBC programmes worldwide.
          </p>
        </div>

        <div className="mt-12 space-y-8">
          {PARTNER_CATEGORIES.map((cat, i) => (
            <CategorySection key={cat.name} cat={cat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
