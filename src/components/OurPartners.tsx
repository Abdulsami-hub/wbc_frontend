type Partner = { label: string; icon: number };

const ROW_ONE: Partner[] = [
  { label: "Member Network 01", icon: 0 },
  { label: "Strategic Circle 02", icon: 1 },
  { label: "Council Partner 03", icon: 2 },
  { label: "Global Forum 04", icon: 3 },
];

const ROW_TWO: Partner[] = [
  { label: "Alliance Desk 05", icon: 4 },
  { label: "Commerce Platform 06", icon: 5 },
  { label: "Institutional Bridge 07", icon: 3 },
  { label: "Executive Cluster 08", icon: 6 },
];

const ROW_THREE: Partner[] = [
  { label: "Trade Council 09", icon: 2 },
  { label: "Policy Network 10", icon: 1 },
  { label: "Regional Chapter 11", icon: 5 },
  { label: "Innovation Guild 12", icon: 6 },
];

function Icon({ variant }: { variant: number }) {
  const common = {
    width: 26,
    height: 26,
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
  return (
    <div className="flex w-[240px] shrink-0 flex-col justify-between border border-line bg-background px-6 py-6 transition-colors hover:border-orange/40">
      <span className="text-muted-fg/70">
        <Icon variant={partner.icon} />
      </span>
      <p className="mt-8 text-[14px] font-bold uppercase tracking-[0.12em] text-muted-fg">
        {partner.label}
      </p>
    </div>
  );
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
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-5 ${direction === "left" ? "marquee-track-left" : "marquee-track-right"}`}
        style={{ ["--marquee-duration" as string]: duration }}
      >
        {loop.map((p, i) => (
          <Card key={`${p.label}-${i}`} partner={p} />
        ))}
      </div>
    </div>
  );
}

export function OurPartners() {
  return (
    <section className="border-t border-line py-16 lg:py-24">
      <div className="container-wbc">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:items-center lg:gap-16">
          <div>
            <p data-reveal className="text-[13px] font-bold uppercase tracking-[0.18em] text-blue">
              Growing Institutional Network
            </p>
            <h2
              data-reveal
              className="mt-4 text-[38px] font-extrabold leading-[1.05] tracking-tight text-navy sm:text-[46px]"
            >
              Our Partners
            </h2>
            <p data-reveal className="mt-6 text-[17px] leading-relaxed text-muted-fg lg:text-justify">
              WBC forms strategic partnerships with key stakeholders, organizations, and industry
              leaders to amplify the impact of its initiatives and services worldwide — including
              chambers of commerce, NGO's, international organizations, governments, and private
              sector entities.
            </p>
          </div>

          <div
            data-reveal
            className="relative border border-line p-5 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
          >
            <div className="flex flex-col gap-5">
              <Row items={ROW_ONE} direction="left" duration="38s" />
              <Row items={ROW_TWO} direction="right" duration="46s" />
              <Row items={ROW_THREE} direction="left" duration="42s" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
