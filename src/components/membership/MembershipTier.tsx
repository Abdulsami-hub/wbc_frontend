import { MEMBERSHIP_TIERS } from "@/content/membership";

function TierIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true,
  } as const;
  switch (name) {
    case "building":
      return (
        <svg {...common}>
          <path d="M4 20V6l8-3 8 3v14" />
          <path d="M9 20v-6h6v6M9 10h.01M15 10h.01M9 14h.01M15 14h.01" />
        </svg>
      );
    case "brief":
      return (
        <svg {...common}>
          <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
          <rect x="3" y="7" width="18" height="13" rx="1.5" />
          <path d="M3 12h18" />
        </svg>
      );
    case "growth":
      return (
        <svg {...common}>
          <path d="M4 19h16M6 16l4-5 3 3 5-7" />
          <path d="M15 7h3v3" />
        </svg>
      );
    case "star":
      return (
        <svg {...common}>
          <path d="M12 3l2.2 5.4L20 9.5l-4 3.9.9 5.6L12 16.8 7.1 19l.9-5.6-4-3.9 5.8-1.1z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5 19c0-3.2 2.8-5.5 7-5.5s7 2.3 7 5.5" />
        </svg>
      );
  }
}

export function MembershipTier({ showClosing = true, className = "" }: { showClosing?: boolean; className?: string }) {
  return (
    <>
      <ul data-reveal data-reveal-group className={`grid gap-5 sm:grid-cols-2 xl:grid-cols-5 xl:gap-4 ${className}`}>
        {MEMBERSHIP_TIERS.map((t, i) => {
          const featured = i === 0 || i === 2;
          return (
            <li key={t.title}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-card p-6 transition-all duration-500 ease-out sm:p-7 ${
                  featured
                    ? "bg-navy text-white shadow-card hover:-translate-y-1.5 hover:shadow-lg"
                    : "border border-line bg-background hover:-translate-y-1.5 hover:border-orange/35 hover:shadow-card"
                }`}
              >
                <span
                  className={`absolute inset-x-0 top-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100 ${
                    featured ? "bg-orange" : "bg-navy"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`pointer-events-none absolute -end-8 -top-8 size-28 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                    featured ? "bg-orange/25" : "bg-orange/10"
                  }`}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between gap-3">
                  <span
                    className={`inline-flex size-11 items-center justify-center ${
                      featured ? "bg-white/10 text-white" : "bg-orange/10 text-foreground"
                    }`}
                  >
                    <TierIcon name={t.icon} />
                  </span>
                  <span
                    className={`font-display text-[24px] leading-none font-bold tabular-nums ${
                      featured ? "text-white/25" : "text-orange/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3
                  className={`relative mt-6 text-[18px] font-bold leading-snug ${featured ? "text-white" : "text-foreground"}`}
                >
                  {t.title}
                  <span
                    className={`mt-0.5 block text-[13px] font-semibold tracking-[0.08em] uppercase ${
                      featured ? "text-white/60" : "text-muted-fg"
                    }`}
                  >
                    {t.subtitle}
                  </span>
                </h3>
                <p
                  className={`relative mt-3 flex-1 text-[14px] leading-relaxed ${featured ? "text-white/80" : "text-muted-fg"}`}
                >
                  {t.body}
                </p>
                <span
                  className={`relative mt-6 block h-0.5 w-8 origin-left transition-transform duration-300 group-hover:scale-x-150 ${
                    featured ? "bg-orange" : "bg-navy"
                  }`}
                  aria-hidden="true"
                />
              </article>
            </li>
          );
        })}
      </ul>
      {showClosing ? (
        <p data-reveal className="mx-auto mt-10 max-w-3xl text-center text-[15px] leading-relaxed text-muted-fg">
          No matter your size or industry, WBC membership opens doors to unparalleled opportunities for growth,
          collaboration, and success of your businesses.
        </p>
      ) : null}
    </>
  );
}
