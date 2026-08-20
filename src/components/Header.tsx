import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MegaMenuAbout } from "./MegaMenuAbout";
import { MegaMenuMembership } from "./MegaMenuMembership";
import { MegaMenuNetwork } from "./MegaMenuNetwork";
import { MegaMenuEvents } from "./MegaMenuEvents";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNavExpandButton, MobileNavSubmenuPanel } from "./MobileNavMenu";
import { useI18n, type TranslationKey } from "@/i18n";

export const NAV_LINKS = [
  { key: "nav.about" as TranslationKey, label: "About Us", to: "/who-we-are" },
  { key: "nav.network" as TranslationKey, label: "Global Network", to: "/global-network" },
  { key: "nav.membership" as TranslationKey, label: "Membership", to: "/membership" },
  { key: "nav.events" as TranslationKey, label: "Events", to: "/events" },
  { key: "nav.contact" as TranslationKey, label: "Contact", to: "/contact" },
] as const;

const MENU_ROUTES = ["/who-we-are", "/global-network", "/membership", "/events"] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const { t } = useI18n();

  const closeMobile = () => {
    setOpen(false);
    setMobileSubmenu(null);
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background/95 shadow-header backdrop-blur-md" onMouseLeave={() => setMenu(null)}>
      <div className="container-wbc flex h-[72px] items-center justify-between gap-4 lg:h-20">
        <Logo size="lg" onClick={() => { setMenu(null); closeMobile(); }} />

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => {
            const hasMenu = (MENU_ROUTES as readonly string[]).includes(l.to);
            const isOpen = hasMenu && menu === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                onMouseEnter={() => setMenu(hasMenu ? l.to : null)}
                onFocus={() => setMenu(hasMenu ? l.to : null)}
                aria-expanded={hasMenu ? isOpen : undefined}
                aria-haspopup={hasMenu ? "true" : undefined}
                className={`nav-link group relative inline-flex items-center gap-1.5 px-3 py-2 text-[15px] font-medium text-foreground/80 transition-colors duration-300 hover:text-foreground [&.active]:text-foreground ${
                  isOpen ? "is-open text-foreground" : ""
                }`}
              >
                <span className="relative">
                  {t(l.key)}
                  <span className="nav-link-underline" aria-hidden="true" />
                </span>
                {hasMenu ? (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className={`mt-px text-muted-fg transition-all duration-300 group-hover:text-orange ${
                      isOpen ? "rotate-180 text-orange" : ""
                    }`}
                  >
                    <path
                      d="M2.5 4.5L6 8l3.5-3.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <LanguageSwitcher className="lg:hidden" compact />
          <LanguageSwitcher className="hidden lg:block" />
          <Link
            to="/become-a-member"
            className="btn-orange-to-outline hidden !min-h-9 !rounded-md !px-4 !text-[12px] lg:inline-flex"
          >
            {t("cta.join")}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-md text-foreground transition-colors hover:bg-foreground/5 hover:text-foreground lg:hidden"
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
        <div id="mobile-menu" className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-wbc flex flex-col py-2">
            {NAV_LINKS.map((l) => {
              const hasMenu = (MENU_ROUTES as readonly string[]).includes(l.to);
              const isExpanded = mobileSubmenu === l.to;
              return (
                <div key={l.to} className="border-b border-line">
                  <div className="flex items-center gap-1">
                    <Link
                      to={l.to}
                      onClick={closeMobile}
                      className="flex-1 py-3.5 text-[17px] font-medium text-foreground transition-colors hover:text-foreground [&.active]:text-foreground"
                    >
                      {t(l.key)}
                    </Link>
                    {hasMenu ? (
                      <MobileNavExpandButton
                        label={t(l.key)}
                        expanded={isExpanded}
                        onToggle={() => setMobileSubmenu(isExpanded ? null : l.to)}
                      />
                    ) : null}
                  </div>
                  {hasMenu && isExpanded ? (
                    <MobileNavSubmenuPanel route={l.to} onNavigate={closeMobile} />
                  ) : null}
                </div>
              );
            })}
            <div className="mb-4 py-4">
              <Link
                to="/become-a-member"
                onClick={closeMobile}
                className="btn-orange-to-outline !min-h-9 !rounded-md !px-3 !text-[12px] !tracking-[0.06em]"
              >
                {t("cta.join")}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
