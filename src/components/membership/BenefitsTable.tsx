import { ALL_PLAN_BENEFITS, PLAN_TIERS, type PlanId } from "@/content/membership";

function CheckMark({ on }: { on: boolean }) {
  if (!on) {
    return <span className="mx-auto block h-0.5 w-4 bg-line" aria-label="Not included" />;
  }
  return (
    <svg
      className="mx-auto text-teal"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      aria-label="Included"
    >
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

export function BenefitsTable({
  rows = ALL_PLAN_BENEFITS,
}: {
  rows?: { label: string; plans: Record<PlanId, boolean> }[];
}) {
  return (
    <div className="overflow-x-auto rounded-card border border-line bg-background shadow-card">
      <table className="w-full min-w-[720px] border-collapse text-start">
        <thead>
          <tr className="bg-navy text-white">
            <th className="px-5 py-5 text-start text-[14px] font-semibold tracking-[0.04em] sm:px-6 sm:text-[15px]">
              Benefit
            </th>
            {PLAN_TIERS.map((tier) => (
              <th key={tier.id} className="px-3 py-5 text-center sm:px-4">
                <span className="block text-[13px] font-bold sm:text-[14px]">{tier.label}</span>
                <span className="mt-1 block text-[12px] font-semibold text-orange sm:text-[13px]">{tier.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i % 2 === 0 ? "bg-background" : "bg-surface/80"}>
              <td className="px-5 py-4 text-[14px] leading-snug text-foreground sm:px-6 sm:text-[15px]">
                {row.label}
              </td>
              {PLAN_TIERS.map((tier) => (
                <td key={tier.id} className="px-3 py-4 text-center sm:px-4">
                  <CheckMark on={row.plans[tier.id]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
