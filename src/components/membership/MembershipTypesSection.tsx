import { Link } from "@tanstack/react-router";
import type { MembershipHighlight, MembershipTier as MembershipTierType } from "@/content/membership";
import { MembershipTier } from "@/components/membership/MembershipTier";

type MembershipTypesSectionProps = {
  showActions?: boolean;
  header: {
    kicker: string;
    title: string;
    description: string;
    feeNote: string;
    closingParagraph: string;
  };
  highlights: MembershipHighlight[];
  types: MembershipTierType[];
};

export function MembershipTypesSection({
  showActions = false,
  header,
  highlights,
  types,
}: MembershipTypesSectionProps) {
  if (!header.title && types.length === 0 && highlights.length === 0) return null;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute -end-20 top-0 size-[320px] rounded-full bg-teal/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -start-16 bottom-24 size-[280px] rounded-full bg-orange/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-end lg:gap-14">
        <div className="max-w-2xl">
          {header.kicker ? (
            <p data-reveal className="eyebrow">
              {header.kicker}
            </p>
          ) : null}
          {header.title ? (
            <h2
              data-reveal
              className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]"
            >
              {header.title}
            </h2>
          ) : null}
          {header.description ? (
            <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              {header.description}
            </p>
          ) : null}
          <span data-reveal className="accent-rule mt-6" />
          {header.feeNote ? (
            <p
              data-reveal
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-background px-4 py-2 text-[13px] font-semibold tracking-[0.06em] text-foreground uppercase"
            >
              <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
              {header.feeNote}
            </p>
          ) : null}
        </div>

        {highlights.length > 0 ? (
          <ul data-reveal data-reveal-group className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item.id}
                className="rounded-card border border-line bg-background/90 p-5 shadow-[0_1px_0_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-card"
              >
                <p className="font-display text-[26px] font-bold leading-none text-navy sm:text-[28px]">{item.value}</p>
                <p className="mt-2 text-[12px] font-semibold tracking-[0.12em] text-muted-fg uppercase">{item.label}</p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <MembershipTier
        tiers={types}
        showClosing={false}
        className="mt-12 lg:mt-14"
      />

      {header.closingParagraph ? (
        <div
          data-reveal
          className="relative mt-12 overflow-hidden rounded-card border border-line bg-gradient-to-br from-navy/[0.05] via-background to-orange/[0.08] p-8 sm:p-10 lg:mt-14"
        >
          <span
            className="pointer-events-none absolute -end-10 -top-10 size-32 rounded-full bg-orange/15 blur-2xl"
            aria-hidden="true"
          />
          <p className="relative mx-auto max-w-3xl text-center text-[17px] leading-relaxed text-foreground sm:text-[18px]">
            {header.closingParagraph}
          </p>
        </div>
      ) : null}

      {showActions ? (
        <div data-reveal className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/membership" hash="benefits" className="btn-navy !rounded-md">
            WBC Membership
          </Link>
          <Link to="/become-a-member" className="btn-orange">
            Become a Member
          </Link>
        </div>
      ) : null}

      {types.length > 0 ? (
        <ol className="sr-only">
          {types.map((tier, index) => (
            <li key={tier.id}>
              {index + 1}. {tier.title} {tier.subtitle}: {tier.body}
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}
