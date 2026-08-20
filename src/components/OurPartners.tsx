import { PARTNER_CATEGORIES, PARTNER_ROW_COPY, PARTNER_ROWS, partnerLogo, type Partner } from "@/content/partners";

const ROW_MOTION = [
  { duration: "36s", delay: "0s" },
  { duration: "48s", delay: "-12s" },
  { duration: "40s", delay: "-22s" },
] as const;

const ROW_BADGE = ["bg-orange", "bg-navy", "bg-teal"] as const;

function MarqueeCard({ partner }: { partner: Partner }) {
  const className =
    "group relative flex h-[100px] w-[160px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border border-line/80 bg-white px-3 py-3 shadow-[0_2px_8px_oklch(0.28_0.02_255_/_0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-orange/40 hover:shadow-card sm:h-[112px] sm:w-[180px]";

  const content = (
    <>
      <img
        src={partnerLogo(partner)}
        alt=""
        width={160}
        height={56}
        loading="lazy"
        decoding="async"
        className="h-10 w-auto max-w-[85%] object-contain object-center transition-transform duration-300 group-hover:scale-105 sm:h-11"
      />
      <p className="line-clamp-2 max-w-full text-center text-[10px] font-semibold leading-snug text-muted-fg transition-colors group-hover:text-navy sm:text-[11px]">
        {partner.label}
      </p>
    </>
  );

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
        {content}
      </a>
    );
  }

  return (
    <div className={className} title={partner.label}>
      {content}
    </div>
  );
}

function Row({
  items,
  duration,
  delay,
}: {
  items: Partner[];
  duration: string;
  delay: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className="min-w-0 overflow-hidden">
      <div
        className="marquee-track-left flex w-max gap-3 sm:gap-4"
        style={{
          ["--marquee-duration" as string]: duration,
          ["--marquee-delay" as string]: delay,
        }}
      >
        {loop.map((p, i) => (
          <MarqueeCard key={`${p.slug}-${i}`} partner={p} />
        ))}
      </div>
    </div>
  );
}

function CategoryBand({
  title,
  body,
  index,
  items,
  motion,
}: {
  title: string;
  body: string;
  index: number;
  items: Partner[];
  motion: (typeof ROW_MOTION)[number];
}) {
  const badge = ROW_BADGE[index] ?? ROW_BADGE[0];

  return (
    <div className="min-w-0 space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-4">
        <div>
          <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold tracking-[0.12em] text-white uppercase ${badge}`}>
            {PARTNER_CATEGORIES[index]?.kindLabel ?? "Partner"}
          </span>
          <h3 className="mt-2 text-[18px] font-bold text-foreground sm:text-[20px]">{title}</h3>
          <p className="mt-1 max-w-xl text-[14px] leading-relaxed text-muted-fg">{body}</p>
        </div>
        <span className="font-display text-[32px] font-bold text-foreground/10 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div dir="ltr" className="partner-marquee-frame min-w-0 rounded-2xl border border-line/80 bg-white/90 p-3 shadow-[inset_0_1px_0_oklch(1_0_0_/_0.6)] sm:p-4">
        <Row items={items} duration={motion.duration} delay={motion.delay} />
      </div>
    </div>
  );
}

export function OurPartners() {
  return (
    <section className="relative overflow-x-clip border-t border-line bg-gradient-to-b from-surface/60 to-background py-12 sm:py-16 lg:py-24">
      <div
        className="pointer-events-none absolute -start-24 top-16 size-[320px] rounded-full bg-orange/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-20 bottom-10 size-[280px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-wbc relative">
        <div className="min-w-0">
          <p data-reveal className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange sm:text-[13px]">
            Partner Network
          </p>
          <h2
            data-reveal
            className="mt-3 whitespace-nowrap text-[clamp(1.15rem,4.2vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-foreground sm:mt-4"
          >
            Our Partners and Sponsors
          </h2>
          <p data-reveal className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
            Institutions, media, and enterprises supporting WBC through strategic partnerships and sponsorship.
          </p>
        </div>

        <div data-reveal data-reveal-group className="mt-10 space-y-10">
          {PARTNER_ROW_COPY.map((row, i) => (
            <CategoryBand
              key={row.title}
              title={row.title}
              body={row.body}
              index={i}
              items={PARTNER_ROWS[i]!}
              motion={ROW_MOTION[i]!}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
