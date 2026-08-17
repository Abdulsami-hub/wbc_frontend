import { Link } from "@tanstack/react-router";
import { MEMBERSHIP_TIERS } from "@/content/membership";
import { MembershipTier } from "@/components/membership/MembershipTier";

type MembershipTypesSectionProps = {
  showActions?: boolean;
};

const HIGHLIGHTS = [
  { value: "5", label: "Membership types" },
  { value: "Annual", label: "Fee structure" },
  { value: "Global", label: "Network access" },
] as const;

export function MembershipTypesSection({ showActions = false }: MembershipTypesSectionProps) {
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
          <p data-reveal className="eyebrow">
            Membership Categories
          </p>
          <h2
            data-reveal
            className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]"
          >
            Types of Membership
          </h2>
          <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
            WBC offers 5 distinct types of membership tailored to meet the diverse needs of our members. Each
            membership tier provides unique benefits designed to support your specific goals and aspirations.
          </p>
          <span data-reveal className="accent-rule mt-6" />
          <p
            data-reveal
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-background px-4 py-2 text-[13px] font-semibold tracking-[0.06em] text-foreground uppercase"
          >
            <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
            Membership fees are payable annually
          </p>
        </div>

        <ul data-reveal data-reveal-group className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
          {HIGHLIGHTS.map((item) => (
            <li
              key={item.label}
              className="rounded-card border border-line bg-background/90 p-5 shadow-[0_1px_0_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-navy/20 hover:shadow-card"
            >
              <p className="font-display text-[26px] font-bold leading-none text-navy sm:text-[28px]">{item.value}</p>
              <p className="mt-2 text-[12px] font-semibold tracking-[0.12em] text-muted-fg uppercase">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <MembershipTier showClosing={false} className="mt-12 lg:mt-14" />

      <div
        data-reveal
        className="relative mt-12 overflow-hidden rounded-card border border-line bg-gradient-to-br from-navy/[0.05] via-background to-orange/[0.08] p-8 sm:p-10 lg:mt-14"
      >
        <span
          className="pointer-events-none absolute -end-10 -top-10 size-32 rounded-full bg-orange/15 blur-2xl"
          aria-hidden="true"
        />
        <p className="relative mx-auto max-w-3xl text-center text-[17px] leading-relaxed text-foreground sm:text-[18px]">
          No matter your size or industry, WBC membership opens doors to unparalleled opportunities for growth,
          collaboration, and success of your businesses.
        </p>
      </div>

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

      <ol className="sr-only">
        {MEMBERSHIP_TIERS.map((tier, index) => (
          <li key={tier.title}>
            {index + 1}. {tier.title} {tier.subtitle}: {tier.body}
          </li>
        ))}
      </ol>
    </div>
  );
}
