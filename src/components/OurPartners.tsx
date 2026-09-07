import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";
import type { StrategicPartnerCategory, StrategicPartnerTile } from "@/content/strategic-partners";
import { useSectionVisible } from "@/lib/queries/section-visibility";
import { strategicPartnersQueryOptions } from "@/lib/queries/strategic-partners";

const ROW_MOTION = [
  { duration: "36s", delay: "0s" },
  { duration: "48s", delay: "-12s" },
  { duration: "90s", delay: "-22s" },
] as const;

function initials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return `${parts[0]![0] ?? ""}${parts[1]![0] ?? ""}`.toUpperCase();
  const compact = name.replace(/[^a-zA-Z0-9]/g, "");
  return (compact.slice(0, 2) || "WB").toUpperCase();
}

function Card({ partner, kindLabel }: { partner: StrategicPartnerTile; kindLabel: string }) {
  const className =
    "group relative flex h-[112px] w-[188px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-card border border-line bg-background px-4 py-3 shadow-[0_1px_0_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:h-[128px] sm:w-[220px] sm:gap-2.5 sm:px-5 lg:h-[140px] lg:w-[240px]";

  const content = (
    <>
      {partner.logo ? (
        <img src={partner.logo} alt="" className="h-8 max-w-[72%] object-contain sm:h-10" />
      ) : (
        <span className="flex size-9 items-center justify-center rounded-md bg-surface text-[12px] font-bold text-navy sm:size-10 sm:text-[13px]">
          {initials(partner.name)}
        </span>
      )}
      <p className="line-clamp-2 max-w-full text-center text-[11px] font-bold leading-snug text-navy sm:text-[12px]">
        {partner.name}
      </p>
      {kindLabel ? (
        <span className="rounded-full border border-navy/15 bg-surface px-2 py-0.5 text-[9px] font-bold tracking-[0.12em] text-navy/70 uppercase sm:text-[10px]">
          {kindLabel}
        </span>
      ) : null}
    </>
  );

  if (partner.href) {
    return (
      <a
        href={partner.href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        aria-label={partner.name}
        title={partner.name}
      >
        {content}
      </a>
    );
  }

  return (
    <div className={className} title={partner.name}>
      {content}
    </div>
  );
}

function fillMarquee(items: StrategicPartnerTile[]) {
  if (items.length === 0) return [];
  const copies = Math.max(2, Math.ceil(8 / items.length));
  return Array.from({ length: copies }, () => items).flat();
}

function Row({
  items,
  kindLabel,
  duration,
  delay,
}: {
  items: StrategicPartnerTile[];
  kindLabel: string;
  duration: string;
  delay: string;
}) {
  const loop = fillMarquee(items);
  return (
    <div className="min-w-0 overflow-hidden">
      <div
        className="marquee-track-left flex w-max gap-3 sm:gap-4 lg:gap-5"
        style={{
          ["--marquee-duration" as string]: duration,
          ["--marquee-delay" as string]: delay,
        }}
      >
        {[...loop, ...loop].map((partner, i) => (
          <Card key={`${partner.id}-${i}`} partner={partner} kindLabel={kindLabel} />
        ))}
      </div>
    </div>
  );
}

function CopyCard({ title, body, index }: { title: string; body: string; index: number }) {
  return (
    <div className="group relative overflow-hidden rounded-card border border-line bg-background p-5 transition-all duration-300 hover:border-orange/35 hover:shadow-card sm:p-6">
      <span
        className="absolute start-0 top-0 h-full w-1 bg-navy transition-colors duration-300 group-hover:bg-orange"
        aria-hidden="true"
      />
      <p className="text-[11px] font-bold tracking-[0.18em] text-orange uppercase">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 text-[16px] font-bold text-navy sm:text-[17px]">{title}</h3>
      {body ? <p className="mt-2 text-[14px] leading-relaxed text-muted-fg sm:text-[15px]">{body}</p> : null}
    </div>
  );
}

function OurPartnersSkeleton() {
  return (
    <section className="border-t border-line bg-surface/40 py-12 sm:py-16 lg:py-24">
      <div className="container-wbc space-y-6">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-10 w-80 max-w-full" />
        <Skeleton className="h-48 w-full rounded-card" />
      </div>
    </section>
  );
}

export function OurPartners() {
  const showProfiles = useSectionVisible("strategic-partners", "profiles");
  const { data, isPending } = useQuery(strategicPartnersQueryOptions);

  if (!showProfiles) return null;
  if (isPending) return <OurPartnersSkeleton />;

  const categories = (data?.categories ?? []).filter((category) => category.partners.length > 0);
  if (categories.length === 0) return null;

  return (
    <section className="relative overflow-x-clip border-t border-line bg-surface/40 py-12 sm:py-16 lg:py-24">
      <div
        className="pointer-events-none absolute -start-24 top-16 size-[320px] rounded-full bg-orange/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-20 bottom-10 size-[280px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-wbc relative">
        <div className="flex min-w-0 flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <p data-reveal className="text-[12px] font-bold tracking-[0.18em] text-orange uppercase sm:text-[13px]">
              Growing Institutional Network
            </p>
            <h2
              data-reveal
              className="mt-3 text-[clamp(1.15rem,4.2vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-foreground sm:mt-4"
            >
              Our Partners and Sponsors
            </h2>
            <p data-reveal className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
              Organizations supporting WBC today — the same partners and sponsors published from the admin panel.
            </p>
          </div>
          <Link to="/global-network/strategic-partners" className="card-link shrink-0 text-[15px]">
            View all
          </Link>
        </div>

        <div data-reveal data-reveal-group className="mt-8 space-y-8 lg:hidden">
          {categories.map((category, i) => (
            <CategoryBlock key={category.id} category={category} index={i} />
          ))}
        </div>

        <div className="mt-10 hidden min-w-0 gap-14 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div data-reveal data-reveal-group className="min-w-0 space-y-4">
            {categories.map((category, i) => (
              <CopyCard key={category.id} title={category.name} body={category.desc} index={i} />
            ))}
          </div>

          <div
            data-reveal
            dir="ltr"
            className="partner-marquee-frame relative min-w-0 rounded-card border border-line bg-background p-5 shadow-card"
          >
            <div className="flex flex-col gap-4">
              {categories.map((category, i) => (
                <Row
                  key={category.id}
                  items={category.partners}
                  kindLabel={category.kindLabel}
                  duration={ROW_MOTION[i % ROW_MOTION.length]!.duration}
                  delay={ROW_MOTION[i % ROW_MOTION.length]!.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryBlock({ category, index }: { category: StrategicPartnerCategory; index: number }) {
  return (
    <div className="min-w-0 space-y-4">
      <CopyCard title={category.name} body={category.desc} index={index} />
      <div
        dir="ltr"
        className="partner-marquee-frame min-w-0 rounded-card border border-line bg-background/80 p-3 shadow-card sm:p-4"
      >
        <Row
          items={category.partners}
          kindLabel={category.kindLabel}
          duration={ROW_MOTION[index % ROW_MOTION.length]!.duration}
          delay={ROW_MOTION[index % ROW_MOTION.length]!.delay}
        />
      </div>
    </div>
  );
}
