import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { useI18n, type TranslationKey } from "@/i18n";

const COLUMNS = [
  {
    title: "footer.about" as TranslationKey,
    links: [
      { key: "link.whoWeAre" as TranslationKey, to: "/who-we-are" },
      { key: "link.whatWeDo" as TranslationKey, to: "/what-we-do" },
      { key: "link.governance" as TranslationKey, to: "/governance" },
      { key: "link.team" as TranslationKey, to: "/wbc-team" },
    ],
  },
  {
    title: "footer.network" as TranslationKey,
    links: [
      { key: "link.hq" as TranslationKey, to: "/global-network" },
      { key: "link.affiliates" as TranslationKey, to: "/affiliates" },
      { key: "link.institutional" as TranslationKey, to: "/membership" },
      { key: "link.partners" as TranslationKey, to: "/global-network" },
    ],
  },
  {
    title: "footer.membership" as TranslationKey,
    links: [
      { key: "link.wbcMembership" as TranslationKey, to: "/membership" },
      { key: "link.benefits" as TranslationKey, to: "/membership" },
      { key: "link.become" as TranslationKey, to: "/membership" },
      { key: "nav.ourMembers" as TranslationKey, to: "/our-members" },
    ],
  },
  {
    title: "footer.resources" as TranslationKey,
    links: [
      { key: "nav.events" as TranslationKey, to: "/events" },
      { key: "nav.contact" as TranslationKey, to: "/contact" },
    ],
  },
] as const;

const SOCIAL = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7c.6-1 1.8-2 3.7-2 2.7 0 4.5 1.7 4.5 5.4V21h-4v-6c0-1.6-.6-2.6-2-2.6-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1V21h-4z",
  },
  { label: "X", href: "https://x.com/", path: "M3 3h5.2l4.3 5.9L17.7 3H21l-6.6 8L21 21h-5.2l-4.5-6.2L6.3 21H3l6.9-8.3z" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/",
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
            <Logo variant="light" />
            <p className="mt-5 text-[15px] leading-relaxed">
              {t("footer.tagline")}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="inline-flex min-h-9 items-center gap-2 rounded bg-white/10 px-3 text-[14px] font-medium text-white transition-colors hover:bg-white/20"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h2 className="text-[12px] font-semibold tracking-[0.16em] text-white uppercase">{t(col.title)}</h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.key}>
                    <Link to={l.to} className="text-[15px] transition-colors hover:text-orange">
                      {t(l.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-[14px] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} World Business Council. {t("footer.rights")}</p>
          <div className="flex gap-6">
            <Link to="/contact" className="transition-colors hover:text-orange">
              {t("footer.privacy")}
            </Link>
            <Link to="/contact" className="transition-colors hover:text-orange">
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
