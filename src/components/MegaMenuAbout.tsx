import { Link } from "@tanstack/react-router";
import aboutMenuImage from "@/assets/news-forum.jpg";
import { useI18n } from "@/i18n";

const GROUPS = [
  {
    label: "About WBC",
    items: [
      { titleKey: "link.whoWeAre" as const, desc: "Our mission, vision, and values", to: "/who-we-are" as const },
      { titleKey: "link.whatWeDo" as const, desc: "Programs and global initiatives", to: "/what-we-do" as const },
    ],
  },
  {
    label: "Leadership",
    items: [
      { titleKey: "link.governance" as const, desc: "Leadership structure and policies", to: "/governance" as const },
      { titleKey: "link.team" as const, desc: "Meet the WBC team", to: "/wbc-team" as const },
    ],
  },
] as const;

export function MegaMenuAbout({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();

  return (
    <div className="border-t border-line bg-background shadow-card">
      <div className="container-wbc grid gap-10 py-10 lg:grid-cols-[1fr_1fr_1fr_1.15fr] lg:gap-12 lg:py-12">
        <div>
          <h2 className="text-[26px] font-bold text-foreground lg:text-[30px]">{t("nav.about")}</h2>
          <p className="mt-4 max-w-xs text-[16px] leading-relaxed text-muted-fg">
            Learn about the World Business Council — our mission, vision, values, and global initiatives that empower
            businesses worldwide.
          </p>
        </div>

        {GROUPS.map((g) => (
          <div key={g.label}>
            <p className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">{g.label}</p>
            <ul className="mt-6 space-y-5">
              {g.items.map((it) => (
                <li key={it.to}>
                  <Link to={it.to} onClick={onNavigate} className="group block">
                    <span className="block text-[17px] font-bold text-foreground transition-colors group-hover:text-navy">
                      {t(it.titleKey)}
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
              src={aboutMenuImage}
              alt="WBC speaker addressing members at a council forum"
              width={800}
              height={500}
              loading="lazy"
              decoding="async"
              className="megamenu-img h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <p className="text-[15px] leading-relaxed text-muted-fg">
              Explore the full story of WBC and how we connect businesses across the globe.
            </p>
            <Link
              to="/who-we-are"
              onClick={onNavigate}
              className="mt-4 inline-flex items-center gap-2 text-[15px] font-semibold text-foreground"
            >
              View all <span aria-hidden="true" className="rtl-mirror">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
