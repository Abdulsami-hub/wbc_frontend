import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MegaMenuAbout } from "./MegaMenuAbout";
import { MegaMenuMembership } from "./MegaMenuMembership";
import { MegaMenuNetwork } from "./MegaMenuNetwork";
import { MegaMenuEvents } from "./MegaMenuEvents";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n, type TranslationKey } from "@/i18n";

export const NAV_LINKS = [
  { key: "nav.about" as TranslationKey, label: "Who We Are", to: "/who-we-are" },
  { key: "nav.network" as TranslationKey, label: "Global Network", to: "/global-network" },
  { key: "nav.membership" as TranslationKey, label: "Membership", to: "/membership" },
  { key: "nav.events" as TranslationKey, label: "Events", to: "/events" },
  { key: "nav.contact" as TranslationKey, label: "Contact", to: "/contact" },
] as const;

const MENU_ROUTES = ["/who-we-are", "/global-network", "/membership", "/events"] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const { t } = useI18n();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-header" onMouseLeave={() => setMenu(null)}>
      <div className="container-wbc flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Logo size="lg" />

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => {
            const hasMenu = (MENU_ROUTES as readonly string[]).includes(l.to);
            return (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={() => setMenu(hasMenu ? l.to : null)}
                onFocus={() => setMenu(hasMenu ? l.to : null)}
                aria-expanded={hasMenu ? menu === l.to : undefined}
                className="text-[16px] font-medium text-foreground transition-colors hover:text-navy [&.active]:text-navy"
              >
                {t(l.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageSwitcher className="hidden lg:block" />
          <Link
            to="/become-a-member"
            className="btn-orange hidden !min-h-9 !rounded-md !px-4 !text-[12px] lg:inline-flex"
          >
            {t("cta.join")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {menu && (
        <div className="absolute inset-x-0 top-full hidden lg:block">
          {menu === "/who-we-are" && <MegaMenuAbout onNavigate={() => setMenu(null)} />}
          {menu === "/global-network" && <MegaMenuNetwork onNavigate={() => setMenu(null)} />}
          {menu === "/membership" && <MegaMenuMembership onNavigate={() => setMenu(null)} />}
          {menu === "/events" && <MegaMenuEvents onNavigate={() => setMenu(null)} />}
        </div>
      )}

      {open && (
        <div id="mobile-menu" className="border-t border-line bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-wbc flex flex-col py-2">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="border-b border-line py-3.5 text-[17px] font-medium text-foreground [&.active]:text-navy"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              to="/our-members"
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[17px] font-medium text-foreground [&.active]:text-navy"
            >
              {t("nav.ourMembers")}
            </Link>
            <Link
              to="/news"
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[17px] font-medium text-foreground [&.active]:text-navy"
            >
              News & Blogs
            </Link>

            <div className="py-4">
              <LanguageSwitcher />
            </div>

            <Link to="/become-a-member" onClick={() => setOpen(false)} className="btn-orange mb-4 !rounded-md">
              {t("cta.join")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
