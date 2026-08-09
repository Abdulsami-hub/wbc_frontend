import { Link } from "@tanstack/react-router";
import { Gift } from "lucide-react";
import menuImage from "@/assets/events.jpg";
import { MENU_ICONS, MenuLinkIcon } from "./NavIcons";

const GROUPS = [
  {
    label: "Benefits",
    items: [
      { title: "WBC Membership", desc: "Types of membership", to: "/membership" as const, icon: MENU_ICONS["/membership"] },
      {
        title: "Membership Benefits",
        desc: "Advantages of joining WBC",
        to: "/membership" as const,
        hash: "join" as const,
        icon: Gift,
      },
      {
        title: "Become a Member",
        desc: "Start your membership journey",
        to: "/become-a-member" as const,
        icon: MENU_ICONS["/become-a-member"],
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
        icon: MENU_ICONS["/our-members"],
      },
    ],
  },
] as const;

export function MegaMenuMembership({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="border-t border-line bg-background shadow-card">
      <div className="container-wbc grid gap-10 py-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr] lg:gap-12 lg:py-12">
        <div>
          <h2 className="text-[26px] font-bold text-navy lg:text-[30px]">Membership</h2>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-muted-fg">
            Join a global community of business leaders. Explore membership benefits, application steps, and our member
            directory.
          </p>
        </div>

        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">{g.label}</p>
            <ul className="mt-6 space-y-5">
              {g.items.map((it) => (
                <li key={it.title}>
                  <Link
                    to={it.to}
                    {...("hash" in it ? { hash: it.hash } : {})}
                    onClick={onNavigate}
                    className="group flex items-start gap-3.5"
                  >
                    <MenuLinkIcon icon={it.icon} />
                    <span className="min-w-0">
                      <span className="block text-[17px] font-bold text-navy transition-colors group-hover:text-orange">
                        {it.title}
                      </span>
                      <span className="mt-1 block text-[15px] text-muted-fg">{it.desc}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="overflow-hidden rounded-card border border-line bg-background shadow-card">
          <img
            src={menuImage}
            alt="Speaker addressing WBC members at a membership event"
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-fg">
              Start your journey with WBC and unlock global business opportunities.
            </p>
            <Link
              to="/membership"
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-orange"
            >
              View all <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
