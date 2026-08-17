import { useState } from "react";
import { PARTNER_ROW_COPY, PARTNER_ROWS, partnerLogo, type Partner } from "@/content/partners";

const VISIBLE_COUNT = 20;
const ALL_PARTNERS: Partner[] = PARTNER_ROWS.flat();

function PartnerTile({ partner }: { partner: Partner }) {
  const content = (
    <>
      <span className="flex h-16 items-center justify-center">
        <img
          src={partnerLogo(partner)}
          alt=""
          width={160}
          height={56}
          loading="lazy"
          decoding="async"
          className="h-10 w-auto max-w-[7.5rem] object-contain object-center transition-transform duration-500 ease-out group-hover:scale-110 sm:h-11"
        />
      </span>
      <p className="mt-3 line-clamp-2 text-center text-[11px] font-semibold tracking-[0.06em] text-foreground uppercase transition-colors duration-300 group-hover:text-orange">
        {partner.label}
      </p>
    </>
  );

  const className =
    "group relative flex h-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-line/80 bg-background px-4 py-5 shadow-[0_1px_2px_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-card";

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

const CARD_ICONS = [
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <path d="M4 20V10l8-6 8 6v10" />
    <path d="M9 20v-6h6v6" />
  </svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <rect x="3" y="7" width="18" height="13" rx="2" />
    <path d="M8 7V5a4 4 0 0 1 8 0v2" />
  </svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
  </svg>,
] as const;

export function PartnersDirectory() {
  const [expanded, setExpanded] = useState(false);
  const extra = ALL_PARTNERS.slice(VISIBLE_COUNT);
  const extraCount = extra.length;
  const visibleCount = VISIBLE_COUNT + (expanded ? extraCount : 0);

  return (
    <section className="relative overflow-hidden border-b border-line bg-background py-14 lg:py-20">
      <div
        className="pointer-events-none absolute -start-24 top-10 size-[320px] rounded-full bg-orange/8 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -end-16 bottom-0 size-[280px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="container-wbc relative">
        <div data-reveal className="max-w-2xl">
          <p className="text-[12px] font-bold tracking-[0.18em] text-orange uppercase">Growing Institutional Network</p>
          <h2 className="mt-3 text-[30px] font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-[40px] lg:text-[44px]">
            Our Partners
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
            Trusted institutions, enterprises, and alliances collaborating with WBC across regions.
          </p>
        </div>

        <ul data-reveal data-reveal-group className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNER_ROW_COPY.map((row, i) => (
            <li key={row.title}>
              <article className="group relative h-full overflow-hidden rounded-2xl bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-background hover:shadow-card sm:p-7">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-orange/10 text-orange transition-transform duration-500 group-hover:scale-110 group-hover:bg-orange group-hover:text-white">
                  {CARD_ICONS[i]}
                </span>
                <p className="mt-5 text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-[18px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                  {row.title}
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted-fg sm:text-[15px]">{row.body}</p>
              </article>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">Network</p>
              <h3 className="mt-1 text-[20px] font-bold text-foreground sm:text-[22px]">Partner logos</h3>
            </div>
            <p className="text-[13px] text-muted-fg">
              Showing {visibleCount} of {ALL_PARTNERS.length}
            </p>
          </div>

          <ul className="partner-logo-grid grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {ALL_PARTNERS.slice(0, VISIBLE_COUNT).map((partner) => (
              <li key={partner.slug}>
                <PartnerTile partner={partner} />
              </li>
            ))}
          </ul>

          {extraCount > 0 ? (
            <details
              className="mt-5 overflow-hidden rounded-xl border border-line bg-surface/60 transition-shadow duration-300 open:shadow-card"
              open={expanded}
              onToggle={(e) => {
                const next = (e.currentTarget as HTMLDetailsElement).open;
                if (next !== expanded) setExpanded(next);
              }}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[13px] font-semibold text-foreground transition-colors hover:bg-background/70 marker:content-none [&::-webkit-details-marker]:hidden">
                <span>{expanded ? "Hide extra logos" : `${extraCount} more logos`}</span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                  className={`shrink-0 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </summary>
              <ul className="partner-logo-grid grid grid-cols-2 gap-3 border-t border-line p-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {extra.map((partner) => (
                  <li key={partner.slug}>
                    <PartnerTile partner={partner} />
                  </li>
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  );
}
