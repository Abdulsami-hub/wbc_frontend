import { PARTNER_ROW_COPY, PARTNER_ROWS, type Partner } from "@/content/partners";

const TAGS = ["BC", "CCI", "NGO", "ORG", "BIZ", "MEDIA"] as const;

function partnerTag(partner: Partner) {
  const upper = partner.label.toUpperCase();
  if (upper.includes("CHAMBER") || upper.includes("CCI")) return "CCI";
  if (upper.includes("COUNCIL") || upper.includes("BUSINESS")) return "BC";
  if (upper.includes("NGO") || upper.includes("FOUNDATION")) return "NGO";
  if (upper.includes("MEDIA") || upper.includes("PRESS")) return "MEDIA";
  const seed = partner.slug.length + partner.label.length;
  return TAGS[seed % TAGS.length];
}

function Card({ partner }: { partner: Partner }) {
  const className =
    "group relative flex h-[112px] w-[188px] shrink-0 flex-col items-center justify-center gap-2 overflow-hidden rounded-card border border-line bg-background px-4 py-3 shadow-[0_1px_0_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-card sm:h-[128px] sm:w-[220px] sm:gap-2.5 sm:px-5 lg:h-[140px] lg:w-[240px]";

  const content = (
    <>
      <span className="rounded-full border border-navy/20 bg-surface px-3 py-1 text-[11px] font-extrabold tracking-[0.16em] text-navy uppercase sm:text-[12px]">
        {partnerTag(partner)}
      </span>
      <p className="line-clamp-2 max-w-full text-center text-[11px] font-bold leading-snug tracking-[0.04em] text-navy uppercase sm:text-[12px]">
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
        className="marquee-track-left flex w-max gap-3 sm:gap-4 lg:gap-5"
        style={{
          ["--marquee-duration" as string]: duration,
          ["--marquee-delay" as string]: delay,
        }}
      >
        {loop.map((p, i) => (
          <Card key={`${p.slug}-${i}`} partner={p} />
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
      <p className="text-[11px] font-bold tracking-[0.18em] text-orange uppercase">0{index + 1}</p>
      <h3 className="mt-2 text-[16px] font-bold text-navy sm:text-[17px]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-fg sm:text-[15px]">{body}</p>
    </div>
  );
}

const ROW_MOTION = [
  { duration: "36s", delay: "0s" },
  { duration: "48s", delay: "-12s" },
  { duration: "90s", delay: "-22s" },
] as const;

export function OurPartners() {
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
        <div className="min-w-0">
          <p data-reveal className="text-[12px] font-bold uppercase tracking-[0.18em] text-orange sm:text-[13px]">
            Growing Institutional Network
          </p>
          <h2
            data-reveal
            className="mt-3 whitespace-nowrap text-[clamp(1.15rem,4.2vw,2.75rem)] font-extrabold leading-[1.08] tracking-tight text-foreground sm:mt-4"
          >
            Our Partners and Sponsors
          </h2>
          <p data-reveal className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
            Trusted institutions, enterprises, and alliances collaborating with WBC across regions.
          </p>
        </div>

        <div data-reveal data-reveal-group className="mt-8 space-y-8 lg:hidden">
          {PARTNER_ROW_COPY.map((row, i) => (
            <div key={row.title} className="min-w-0 space-y-4">
              <CopyCard title={row.title} body={row.body} index={i} />
              <div
                dir="ltr"
                className="partner-marquee-frame min-w-0 rounded-card border border-line bg-background/80 p-3 shadow-card sm:p-4"
              >
                <Row items={PARTNER_ROWS[i]!} duration={ROW_MOTION[i]!.duration} delay={ROW_MOTION[i]!.delay} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 hidden min-w-0 gap-14 lg:grid lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div data-reveal data-reveal-group className="min-w-0 space-y-4">
            {PARTNER_ROW_COPY.map((row, i) => (
              <CopyCard key={row.title} title={row.title} body={row.body} index={i} />
            ))}
          </div>

          <div
            data-reveal
            dir="ltr"
            className="partner-marquee-frame relative min-w-0 rounded-card border border-line bg-background p-5 shadow-card"
          >
            <div className="flex flex-col gap-4">
              {PARTNER_ROWS.map((items, i) => (
                <Row
                  key={i}
                  items={items}
                  duration={ROW_MOTION[i]!.duration}
                  delay={ROW_MOTION[i]!.delay}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
