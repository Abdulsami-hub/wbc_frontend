import { PARTNER_ROW_COPY, PARTNER_ROWS, type Partner } from "@/content/partners";

function Icon({ variant }: { variant: number }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (variant % 7) {
    case 0:
      return (
        <svg {...common}>
          <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9z" />
          <path d="M8.5 12h7" />
          <path d="M12 8.5v7" />
        </svg>
      );
    case 1:
      return (
        <svg {...common}>
          <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
          <path d="M7 14l3-4 3 3 4-5" />
        </svg>
      );
    case 2:
      return (
        <svg {...common}>
          <path d="M12 3l7.5 4.5v9L12 21l-7.5-4.5v-9z" />
          <path d="M9 12h6" />
        </svg>
      );
    case 3:
      return (
        <svg {...common}>
          <path d="M4 20V11l8-6 8 6v9" />
          <path d="M9 20v-5h6v5" />
        </svg>
      );
    case 4:
      return (
        <svg {...common}>
          <circle cx="8.5" cy="12" r="4" />
          <circle cx="15.5" cy="12" r="4" />
        </svg>
      );
    case 5:
      return (
        <svg {...common}>
          <path d="M12 4l8 4-8 4-8-4 8-4z" />
          <path d="M4 12l8 4 8-4" />
          <path d="M4 16l8 4 8-4" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M3.5 12h17M12 3.5v17" />
        </svg>
      );
  }
}

function Card({ partner }: { partner: Partner }) {
  const inner = (
    <>
      {partner.logo ? (
        <img src={partner.logo} alt="" className="h-7 w-auto max-w-full object-contain sm:h-8" />
      ) : (
        <span className="text-muted-fg/70">
          <Icon variant={partner.icon} />
        </span>
      )}
      <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.1em] text-muted-fg sm:mt-8 sm:text-[13px] sm:tracking-[0.12em]">
        {partner.label}
      </p>
    </>
  );

  const className =
    "flex w-[148px] shrink-0 flex-col justify-between rounded-card border border-line bg-background px-3.5 py-4 transition-shadow duration-300 hover:shadow-card sm:w-[200px] sm:px-5 sm:py-5 lg:w-[220px] lg:px-6 lg:py-6";

  if (partner.href) {
    return (
      <a href={partner.href} target="_blank" rel="noopener noreferrer" className={className}>
        {inner}
      </a>
    );
  }
  return <div className={className}>{inner}</div>;
}

function Row({
  items,
  direction,
  duration,
}: {
  items: Partner[];
  direction: "left" | "right";
  duration: string;
}) {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="min-w-0 overflow-hidden">
      <div
        className={`flex w-max gap-3 sm:gap-4 lg:gap-5 ${direction === "left" ? "marquee-track-left" : "marquee-track-right"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {loop.map((p, i) => (
          <Card key={`${p.label}-${i}`} partner={p} />
        ))}
      </div>
    </div>
  );
}

function CopyCard({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-card border border-line bg-surface/60 p-4 sm:p-5 transition-shadow duration-300 hover:shadow-card">
      <h3 className="text-[15px] font-bold text-foreground sm:text-[16px]">{title}</h3>
      <p className="mt-2 text-[14px] leading-relaxed text-muted-fg sm:text-[15px] sm:text-justify">{body}</p>
    </div>
  );
}

export function OurPartners() {
  const directions: Array<"left" | "right"> = ["left", "right", "left"];
  const durations = ["38s", "46s", "42s"];

  return (
    <section className="overflow-x-clip border-t border-line py-12 sm:py-16 lg:py-24">
      <div className="container-wbc">
        <div className="min-w-0">
          <p data-reveal className="text-[12px] font-bold uppercase tracking-[0.18em] text-muted-fg sm:text-[13px]">
            Growing Institutional Network
          </p>
          <h2
            data-reveal
            className="mt-3 max-w-xl text-[30px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:mt-4 sm:text-[40px] lg:text-[46px]"
          >
            Our Partners
          </h2>
        </div>

        {/* Mobile / tablet: each copy row paired with its logo marquee */}
        <div data-reveal data-reveal-group className="mt-8 space-y-8 lg:hidden">
          {PARTNER_ROW_COPY.map((row, i) => (
            <div key={row.title} className="min-w-0 space-y-4">
              <CopyCard title={row.title} body={row.body} />
              <div
                dir="ltr"
                className="min-w-0 rounded-card border border-line p-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] sm:p-4"
              >
                <Row items={PARTNER_ROWS[i]} direction={directions[i]} duration={durations[i]} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: text column + marquees column */}
        <div className="mt-10 hidden min-w-0 gap-16 lg:grid lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center">
          <div data-reveal data-reveal-group className="min-w-0 space-y-5">
            {PARTNER_ROW_COPY.map((row) => (
              <CopyCard key={row.title} title={row.title} body={row.body} />
            ))}
          </div>

          <div
            data-reveal
            dir="ltr"
            className="relative min-w-0 rounded-card border border-line p-5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          >
            <div className="flex flex-col gap-5">
              {PARTNER_ROWS.map((items, i) => (
                <Row key={i} items={items} direction={directions[i]} duration={durations[i]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
