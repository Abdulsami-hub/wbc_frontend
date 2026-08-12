import { Link } from "@tanstack/react-router";
import menuImage from "@/assets/events.jpg";

const GROUPS = [
  {
    label: "Join",
    items: [
      {
        title: "WBC Membership",
        desc: "Types, benefits, and online application",
        to: "/membership" as const,
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        title: "Our Members",
        desc: "Directory of active members",
        to: "/our-members" as const,
      },
    ],
  },
] as const;

export function MegaMenuMembership({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="border-t border-line bg-background shadow-card">
      <div className="container-wbc grid gap-10 py-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr] lg:gap-12 lg:py-12">
        <div>
          <h2 className="text-[26px] font-bold text-foreground lg:text-[30px]">Membership</h2>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-muted-fg">
            Join a global community of business leaders. Explore membership types, benefits, and apply in one place.
          </p>
        </div>

        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">{g.label}</p>
            <ul className="mt-6 space-y-5">
              {g.items.map((it) => (
                <li key={it.title}>
                  <Link to={it.to} onClick={onNavigate} className="group block">
                    <span className="block text-[17px] font-bold text-foreground transition-colors group-hover:text-navy">
                      {it.title}
                    </span>
                    <span className="mt-1 block text-[15px] text-muted-fg">{it.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card">
          <div className="h-44 overflow-hidden">
            <img
              src={menuImage}
              alt="Speaker addressing WBC members at a membership event"
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="megamenu-img h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-fg">
              Start your journey with WBC and unlock global business opportunities.
            </p>
            <Link
              to="/membership"
              hash="application"
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-foreground"
            >
              Apply now <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
