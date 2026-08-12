import { Link } from "@tanstack/react-router";
import networkImage from "@/assets/network-bg.jpg";

const GROUPS = [
  {
    label: "Network Structure",
    items: [
      {
        title: "WBC Headquarters",
        desc: "Paris-based global coordination",
        to: "/who-we-are" as const,
      },
      {
        title: "WBC Affiliates",
        desc: "Country and city affiliate presence",
        to: "/affiliates" as const,
      },
    ],
  },
  {
    label: "Members & Partners",
    items: [
      {
        title: "Institutional Members",
        desc: "Chambers, associations, and institutions",
        to: "/our-members" as const,
      },
      {
        title: "Strategic Partners",
        desc: "Organizations delivering joint initiatives",
        to: "/global-network/strategic-partners" as const,
      },
    ],
  },
] as const;

export function MegaMenuNetwork({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="border-t border-line bg-background shadow-card">
      <div className="container-wbc grid gap-10 py-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr] lg:gap-12 lg:py-12">
        <div>
          <h2 className="text-[26px] font-bold text-foreground lg:text-[30px]">Global Network</h2>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-muted-fg">
            Headquarters, affiliates, institutional members, and strategic partners working as one coordinated network.
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
              src={networkImage}
              alt="Illuminated world map representing the WBC global network"
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="megamenu-img h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-fg">
              Explore how WBC connects institutions and businesses across regions.
            </p>
            <Link
              to="/global-network"
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-foreground"
            >
              View network <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
