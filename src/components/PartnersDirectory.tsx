import { Skeleton } from "@/components/ui/skeleton";
import type {
  PartnerAccent,
  StrategicPartnerCategory,
  StrategicPartnerTile,
} from "@/content/strategic-partners";

const ACCENT: Record<
  PartnerAccent,
  {
    band: string;
    badge: string;
    tile: string;
    glow: string;
  }
> = {
  orange: {
    band: "from-orange/15 via-orange/5 to-transparent",
    badge: "bg-orange text-white",
    tile: "border-orange/20 bg-white hover:border-orange/45",
    glow: "bg-orange/20",
  },
  navy: {
    band: "from-navy/12 via-navy/5 to-transparent",
    badge: "bg-navy text-white",
    tile: "border-navy/15 bg-white hover:border-navy/35",
    glow: "bg-navy/15",
  },
  teal: {
    band: "from-teal/15 via-teal/5 to-transparent",
    badge: "bg-teal text-white",
    tile: "border-teal/20 bg-white hover:border-teal/45",
    glow: "bg-teal/20",
  },
  blue: {
    band: "from-blue/15 via-blue/5 to-transparent",
    badge: "bg-blue text-white",
    tile: "border-blue/20 bg-white hover:border-blue/45",
    glow: "bg-blue/20",
  },
  violet: {
    band: "from-navy/12 via-orange/5 to-transparent",
    badge: "bg-navy-deep text-white",
    tile: "border-navy/15 bg-white hover:border-orange/35",
    glow: "bg-orange/15",
  },
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  const compact = name.replace(/[^a-zA-Z0-9]/g, "");
  return (compact.slice(0, 2) || "WB").toUpperCase();
}

function PartnerTileCard({
  partner,
  accent,
}: {
  partner: StrategicPartnerTile;
  accent: (typeof ACCENT)[PartnerAccent];
}) {
  const hasName = Boolean(partner.name.trim());
  const label = partner.name.trim() || "Partner";

  const inner = (
    <>
      <div className="flex min-h-[92px] flex-1 items-center justify-center bg-white px-4 py-5 sm:min-h-[104px]">
        {partner.logo ? (
          <img
            src={partner.logo}
            alt=""
            className="max-h-16 w-auto max-w-[86%] object-contain sm:max-h-[4.5rem]"
          />
        ) : (
          <span className="flex size-11 items-center justify-center rounded-md border border-line bg-surface text-[13px] font-bold text-navy">
            {initials(partner.name)}
          </span>
        )}
      </div>
      {hasName ? (
        <div className="shrink-0 border-t border-line/80 bg-surface/60 px-3 py-2.5">
          <span className="line-clamp-2 text-center text-[12px] font-semibold leading-snug text-foreground sm:text-[13px]">
            {partner.name}
          </span>
        </div>
      ) : null}
    </>
  );

  const className = `group flex h-full flex-col overflow-hidden rounded-xl border shadow-[0_1px_0_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card ${accent.tile}`;

  if (partner.href) {
    return (
      <a href={partner.href} target="_blank" rel="noopener noreferrer" className={className} aria-label={label}>
        {inner}
      </a>
    );
  }

  return <article className={className}>{inner}</article>;
}

function SponsorGrid({
  partners,
  accent,
}: {
  partners: StrategicPartnerTile[];
  accent: (typeof ACCENT)[PartnerAccent];
}) {
  if (partners.length === 0) {
    return (
      <p className="text-[14px] leading-relaxed text-muted-fg">
        Partners and sponsors in this category will appear here as they join the WBC network.
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {[...partners]
        .sort((a, b) => a.sortOrder - b.sortOrder || Number(a.id) - Number(b.id))
        .map((partner) => (
        <li key={partner.id} className="min-w-0">
          <PartnerTileCard partner={partner} accent={accent} />
        </li>
      ))}
    </ul>
  );
}

function CategorySection({ cat, index }: { cat: StrategicPartnerCategory; index: number }) {
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
            {cat.desc ? (
              <p className="mt-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">{cat.desc}</p>
            ) : null}
          </div>
          <p className="font-display text-[48px] font-bold leading-none text-foreground/8 tabular-nums sm:text-[56px]">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
      </div>

      <div className="relative px-6 py-6 sm:px-8 sm:py-8">
        <SponsorGrid partners={cat.partners} accent={a} />
      </div>
    </section>
  );
}

export function PartnersDirectorySkeleton() {
  return (
    <section className="border-b border-line bg-surface/30 py-14 lg:py-20">
      <div className="container-wbc space-y-8">
        <div className="mx-auto max-w-2xl space-y-3 text-center">
          <Skeleton className="mx-auto h-4 w-40" />
          <Skeleton className="mx-auto h-10 w-80 max-w-full" />
          <Skeleton className="mx-auto h-16 w-full max-w-xl" />
        </div>
        <Skeleton className="h-64 w-full rounded-2xl" />
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </section>
  );
}

export function PartnersDirectory({
  categories,
  kicker,
  title,
  description,
}: {
  categories: StrategicPartnerCategory[];
  kicker?: string;
  title?: string;
  description?: string;
}) {
  const orderedCategories = [...categories]
    .filter((category) => category.isActive)
    .map((category) => ({
      ...category,
      partners: category.partners.filter((partner) => partner.isPage),
    }))
    .sort((a, b) => a.sortOrder - b.sortOrder || Number(a.id) - Number(b.id));

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
          {kicker ? (
            <p className="text-[12px] font-bold tracking-[0.18em] text-orange uppercase">{kicker}</p>
          ) : null}
          {title ? (
            <h2 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-[40px] lg:text-[44px]">
              {title}
            </h2>
          ) : null}
          {description ? (
            <p className="mt-4 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">{description}</p>
          ) : null}
        </div>

        {orderedCategories.length > 0 ? (
          <div className="mt-12 space-y-8">
            {orderedCategories.map((cat, i) => (
              <CategorySection key={cat.id} cat={cat} index={i} />
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-[16px] text-muted-fg">
            Partner categories will appear here once published.
          </p>
        )}
      </div>
    </section>
  );
}
