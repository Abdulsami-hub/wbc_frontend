import { Link } from "@tanstack/react-router";
import aboutMenuImage from "@/assets/news-forum.jpg";

const GROUPS = [
  {
    label: "About WBC",
    items: [
      { title: "Who We Are", desc: "Our mission, vision, and values", to: "/who-we-are" },
      { title: "What We Do", desc: "Programs and global initiatives", to: "/what-we-do" },
    ],
  },
  {
    label: "Leadership",
    items: [
      { title: "Governance", desc: "Leadership structure and policies", to: "/governance" },
      { title: "WBC Team", desc: "Meet the WBC team", to: "/wbc-team" },
    ],
  },
] as const;

export function MegaMenuAbout({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="border-t border-line bg-background shadow-card">
      <div className="container-wbc grid gap-10 py-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr] lg:gap-12 lg:py-12">
        <div>
          <h2 className="text-[26px] font-bold text-navy lg:text-[30px]">About Us</h2>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-muted-fg">
            Learn about the World Business Council — our mission, vision, values, and global initiatives that empower
            businesses worldwide.
          </p>
        </div>

        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">{g.label}</p>
            <ul className="mt-6 space-y-6">
              {g.items.map((it) => (
                <li key={it.title}>
                  <Link
                    to={it.to}
                    {...("hash" in it ? { hash: it.hash } : {})}
                    onClick={onNavigate}
                    className="group block"
                  >
                    <span className="block text-[17px] font-bold text-navy transition-colors group-hover:text-orange">
                      {it.title}
                    </span>
                    <span className="mt-1 block text-[15px] text-muted-fg">{it.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="overflow-hidden rounded-card border border-line bg-background shadow-card">
          <img
            src={aboutMenuImage}
            alt="WBC speaker addressing members at a council forum"
            width={800}
            height={500}
            loading="lazy"
            decoding="async"
            className="h-44 w-full object-cover"
          />
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-fg">
              Explore the full story of WBC and how we connect businesses across the globe.
            </p>
            <Link
              to="/about"
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-orange"
            >
              View all <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
