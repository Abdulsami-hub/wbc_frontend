import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { FOOTER_ICONS, FooterLinkIcon } from "./NavIcons";
import { useI18n, type TranslationKey } from "@/i18n";

type FooterLink = {
  key: TranslationKey;
  to: string;
  hash?: string;
};

const COLUMNS: { title: TranslationKey; links: FooterLink[] }[] = [
  {
    title: "footer.about",
    links: [
      { key: "link.whoWeAre", to: "/who-we-are" },
      { key: "link.whatWeDo", to: "/what-we-do" },
      { key: "link.governance", to: "/governance" },
      { key: "link.team", to: "/wbc-team" },
    ],
  },
  {
    title: "footer.network",
    links: [
      { key: "link.hq", to: "/who-we-are" },
      { key: "link.affiliates", to: "/affiliates" },
      { key: "link.institutional", to: "/our-members" },
      { key: "link.partners", to: "/global-network/strategic-partners" },
    ],
  },
  {
    title: "footer.membership",
    links: [
      { key: "link.wbcMembership", to: "/membership" },
      { key: "link.become", to: "/become-a-member" },
      { key: "nav.ourMembers", to: "/our-members" },
    ],
  },
  {
    title: "footer.resources",
    links: [
      { key: "nav.news", to: "/news" },
      { key: "nav.events", to: "/events" },
      { key: "nav.contact", to: "/contact" },
    ],
  },
];

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/wbccme",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7c.6-1 1.8-2 3.7-2 2.7 0 4.5 1.7 4.5 5.4V21h-4v-6c0-1.6-.6-2.6-2-2.6-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1V21h-4z",
  },
  {
    label: "X",
    href: "https://x.com/WBCCME",
    path: "M3 3h5.2l4.3 5.9L17.7 3H21l-6.6 8L21 21h-5.2l-4.5-6.2L6.3 21H3l6.9-8.3z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/WBCCME",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-1.5c0-.8.4-1.5 1-1.5z",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@WBCCME",
    path: "M21.6 7.2c-.2-1-1-1.8-2-2C17.7 4.8 12 4.8 12 4.8s-5.7 0-7.6.4c-1 .2-1.8 1-2 2C2 9.1 2 12 2 12s0 2.9.4 4.8c.2 1 1 1.8 2 2 1.9.4 7.6.4 7.6.4s5.7 0 7.6-.4c1-.2 1.8-1 2-2 .4-1.9.4-4.8.4-4.8s0-2.9-.4-4.8zM10 15.5v-7l6 3.5z",
  },
] as const;

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="container-wbc py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div className="max-w-xs">
            <Logo variant="footer" size="lg" />
            <p className="mt-5 text-[15px] leading-relaxed">{t("footer.tagline")}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-9 items-center justify-center rounded bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[12px] font-semibold tracking-[0.16em] text-white uppercase">{t(col.title)}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => {
                  const Icon = FOOTER_ICONS[l.key];
                  return (
                    <li key={l.key}>
                      <Link
                        to={l.to}
                        {...(l.hash ? { hash: l.hash } : {})}
                        className="group inline-flex items-center gap-2.5 text-[15px] transition-colors hover:text-white"
                      >
                        {Icon ? <FooterLinkIcon icon={Icon} /> : null}
                        {t(l.key)}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[14px] sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} World Business Council. {t("footer.rights")}
          </p>
          <div className="flex gap-6">
            <Link to="/contact" className="transition-colors hover:text-white">
              {t("footer.privacy")}
            </Link>
            <Link to="/contact" className="transition-colors hover:text-white">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
