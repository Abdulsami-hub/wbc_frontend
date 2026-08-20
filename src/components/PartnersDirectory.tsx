import {
  PARTNER_CATEGORIES,
  type PartnerAccent,
  type PartnerCategory,
} from "@/content/partners";
import { Skeleton } from "@/components/ui/skeleton";

const ACCENT: Record<
  PartnerAccent,
  {
    band: string;
    badge: string;
    tile: string;
    tileHover: string;
    glow: string;
  }
> = {
  orange: {
    band: "from-orange/15 via-orange/5 to-transparent",
    badge: "bg-orange text-white",
    tile: "border-orange/20 bg-white hover:border-orange/45",
    tileHover: "group-hover:text-orange",
    glow: "bg-orange/20",
  },
  navy: {
    band: "from-navy/12 via-navy/5 to-transparent",
    badge: "bg-navy text-white",
    tile: "border-navy/15 bg-white hover:border-navy/35",
    tileHover: "group-hover:text-navy",
    glow: "bg-navy/15",
  },
  teal: {
    band: "from-teal/15 via-teal/5 to-transparent",
    badge: "bg-teal text-white",
    tile: "border-teal/20 bg-white hover:border-teal/45",
    tileHover: "group-hover:text-teal",
    glow: "bg-teal/20",
  },
};
function SponsorGrid({ count, accent }: { count: number; accent: (typeof ACCENT)[PartnerAccent] }) {
  const skeletonCount = Math.max(6, Math.min(count, 18));
  return (
    <div aria-busy="true" aria-label="Loading partners and sponsors">
      <ul
        className="sponsor-logo-grid grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
      >
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <li key={i} className="min-w-0">
            <article className={`group relative min-h-[108px] overflow-hidden rounded-xl border px-3 py-4 sm:min-h-[116px] sm:px-4 ${accent.tile}`}>
              <span
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-40 ${accent.band}`}
                aria-hidden="true"
              />
              <div className="relative flex h-full flex-col items-center justify-center gap-3">
                <Skeleton className="h-10 w-[70%]" />
                <Skeleton className="h-3 w-[85%]" />
                <Skeleton className="h-3 w-[55%]" />
              </div>
            </article>
          </li>
        ))}
      </ul>
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
        <SponsorGrid count={cat.partners.length} accent={a} />
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
