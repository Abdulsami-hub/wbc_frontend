import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { MegaMenuAbout } from "./MegaMenuAbout";
import { MegaMenuMembership } from "./MegaMenuMembership";

export const NAV_LINKS = [
  { label: "About Us", to: "/about" },
  { label: "Global Network", to: "/global-network" },
  { label: "Membership", to: "/membership" },
  { label: "Events", to: "/events" },
  { label: "Contact", to: "/contact" },
] as const;


function GlobeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
    </svg>
  );
}

const MENU_ROUTES = ["/about", "/membership"] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-background shadow-header" onMouseLeave={() => setMenu(null)}>
      <div className="container-wbc flex h-16 items-center justify-between gap-4 lg:h-[72px]">
        <Logo />

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
                className="text-[16px] font-medium text-navy transition-colors hover:text-orange [&.active]:text-orange"
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 lg:gap-3">
          <button
            type="button"
            aria-label="Language"
            className="hidden size-9 items-center justify-center rounded-full text-navy transition-colors hover:text-orange lg:inline-flex"
          >
            <GlobeIcon />
          </button>
          <Link to="/membership" hash="join" className="btn-orange hidden !min-h-9 !px-4 !text-[12px] lg:inline-flex">
            Join WBC
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex size-10 items-center justify-center rounded-none text-navy lg:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {menu && (
        <div className="absolute inset-x-0 top-full hidden lg:block">
          {menu === "/about" ? (
            <MegaMenuAbout onNavigate={() => setMenu(null)} />
          ) : (
            <MegaMenuMembership onNavigate={() => setMenu(null)} />
          )}
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
                className="border-b border-line py-3.5 text-[17px] font-medium text-navy [&.active]:text-orange"
              >
                {l.label}
              </Link>
            ))}
            <Link
              to="/our-members"
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[17px] font-medium text-navy [&.active]:text-orange"
            >
              Our Members
            </Link>

            <Link to="/membership" hash="join" onClick={() => setOpen(false)} className="btn-orange my-4">
              Join WBC
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
