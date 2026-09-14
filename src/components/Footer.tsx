import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "./Logo";
import { FOOTER_ICONS, FooterLinkIcon } from "./NavIcons";
import { useI18n, type TranslationKey } from "@/i18n";
import { siteSettingsQueryOptions, type SocialIconKey } from "@/lib/queries/site-settings";

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
      { key: "nav.jobs", to: "/jobs" },
      { key: "nav.contact", to: "/contact" },
    ],
  },
];

const SOCIAL_META: Record<SocialIconKey, { label: string; path: string }> = {
  linkedin: {
    label: "LinkedIn",
    path: "M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3zM10 9h3.8v1.7c.6-1 1.8-2 3.7-2 2.7 0 4.5 1.7 4.5 5.4V21h-4v-6c0-1.6-.6-2.6-2-2.6-1.2 0-1.9.8-2.2 1.6-.1.3-.1.7-.1 1V21h-4z",
  },
  x: {
    label: "X (Twitter)",
    path: "M3 3h5.2l4.3 5.9L17.7 3H21l-6.6 8L21 21h-5.2l-4.5-6.2L6.3 21H3l6.9-8.3z",
  },
  facebook: {
    label: "Facebook",
    path: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h2.6l.4-3H13v-1.5c0-.8.4-1.5 1-1.5z",
  },
  instagram: {
    label: "Instagram",
    path: "M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm5 4.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm5.75-.9a1.1 1.1 0 11-1.1 1.1 1.1 1.1 0 011.1-1.1zM12 9.2A2.8 2.8 0 1112 14.8 2.8 2.8 0 0112 9.2z",
  },
  bluesky: {
    label: "Bluesky",
    path: "M6.3 4.2c2.4 1.8 5 5.4 5.7 7.3.7-1.9 3.3-5.5 5.7-7.3C19.7 2.8 22 3.8 22 6.6c0 .6-.3 4.8-.5 5.5-.7 2.4-3.1 3-5.2 2.6 3.7.6 4.7 2.7 2.6 4.8-4 3.9-5.7-1.9-6.1-4.4h-.1c-.4 2.5-2.1 8.3-6.1 4.4-2.1-2.1-1.1-4.2 2.6-4.8-2.1.4-4.5-.2-5.2-2.6-.2-.7-.5-4.9-.5-5.5C2 3.8 4.3 2.8 6.3 4.2z",
  },
  youtube: {
    label: "YouTube",
    path: "M21.6 7.2c-.2-1-1-1.8-2-2C17.7 4.8 12 4.8 12 4.8s-5.7 0-7.6.4c-1 .2-1.8 1-2 2C2 9.1 2 12 2 12s0 2.9.4 4.8c.2 1 1 1.8 2 2 1.9.4 7.6.4 7.6.4s5.7 0 7.6-.4c1-.2 1.8-1 2-2 .4-1.9.4-4.8.4-4.8s0-2.9-.4-4.8zM10 15.5v-7l6 3.5z",
  },
  tiktok: {
    label: "TikTok",
    path: "M14.5 3c.4 2.2 1.8 3.8 4 4.2v2.4c-1.4-.1-2.7-.6-3.8-1.4v6.5c0 3.3-2.7 6-6 6s-6-2.7-6-6 2.7-6 6-6c.3 0 .7 0 1 .1v2.5c-.3-.1-.6-.1-1-.1a3.5 3.5 0 100 7 3.5 3.5 0 003.5-3.5V3z",
  },
  truth_social: {
    label: "Truth Social",
    path: "M7 4h10v3H13.2v13H10.8V7H7z",
  },
  whatsapp: {
    label: "WhatsApp",
    path: "M12 3a9 9 0 00-7.8 13.5L3 21l4.7-1.2A9 9 0 1012 3zm5 12.3c-.2.6-1.2 1.1-1.7 1.2-.4.1-.9.2-1.5 0-.3-.1-.7-.2-1.2-.4-2.1-1-3.5-2.9-3.6-3.1-.2-.2-1.3-1.7-1.3-3.3s.8-2.3 1.1-2.6c.2-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2 0 .4-.1.5l-.4.5c-.2.2-.3.3-.1.6.2.3.8 1.3 1.8 2.1 1.2 1 2.2 1.3 2.5 1.4.3.1.5.1.7-.1l.9-1.2c.1-.2.4-.2.6-.1l2 .9c.2.1.4.2.4.5 0 .2 0 1.3-.6 1.9z",
  },
  telegram: {
    label: "Telegram",
    path: "M21.5 4.5L2.8 11.6c-1.3.5-1.3 1.2-.2 1.5l4.8 1.5 1.9 5.7c.2.7.1 1 .8 1 .5 0 .7-.2 1-.5l2.3-2.2 4.8 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.5-1.5zM8.7 13.8l8.9-5.6c.4-.3.8-.1.5.2l-7.6 6.9-.3 3.3z",
  },
  snapchat: {
    label: "Snapchat",
    path: "M12 3c3.2 0 5.6 2.4 5.6 5.7 0 1.7.1 2.9.7 3.6.3.4.7.5 1.1.6.3.1.6.3.6.6 0 .5-.7.8-1.3 1-.3.1-.5.2-.5.4 0 .5.8.9 1.4 1.2.3.1.4.4.4.6 0 .5-.6.7-1.1.6-.4-.1-1.1-.2-1.5 0-1 .5-1.8 1.5-3.4 1.5h-2c-1.6 0-2.4-1-3.4-1.5-.4-.2-1.1-.1-1.5 0-.5.1-1.1-.1-1.1-.6 0-.2.1-.5.4-.6.6-.3 1.4-.7 1.4-1.2 0-.2-.2-.3-.5-.4-.6-.2-1.3-.5-1.3-1 0-.3.3-.5.6-.6.4-.1.8-.2 1.1-.6.6-.7.7-1.9.7-3.6C6.4 5.4 8.8 3 12 3z",
  },
  website: {
    label: "Website",
    path: "M12 2a10 10 0 100 20 10 10 0 000-20zm7.5 9h-3.1a15 15 0 00-1.3-5 8 8 0 014.4 5zM12 4c.9 1.3 1.6 3 2 5H10c.4-2 1.1-3.7 2-5zM4.5 11h3.1a15 15 0 011.3-5 8 8 0 00-4.4 5zM8.6 13H4.5a8 8 0 004.4 5 15 15 0 01-1.3-5zm1.4 0h4c-.4 2-1.1 3.7-2 5-.9-1.3-1.6-3-2-5zm5.4 0a15 15 0 011.3 5 8 8 0 004.4-5z",
  },
};

export function Footer() {
  const { t, tx } = useI18n();
  const { data } = useQuery(siteSettingsQueryOptions);
  const footerDescription = tx(data?.footerDescription?.trim() || t("footer.tagline"));
  const socialLinks = data?.socialLinks ?? [];

  return (
    <footer className="bg-navy-deep text-white/75">
      <div className="container-wbc py-14 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-8">
          <div className="max-w-xs">
            <Logo variant="footer" size="lg" />
            <p className="mt-5 text-[15px] leading-relaxed">{footerDescription}</p>
            {socialLinks.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-2">
                {socialLinks.map((link) => {
                  const meta = SOCIAL_META[link.icon];
                  return (
                    <li key={`${link.icon}-${link.url}`}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={meta.label}
                        className="inline-flex size-9 items-center justify-center rounded bg-white/10 text-white transition-colors hover:bg-white/20"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d={meta.path} />
                        </svg>
                      </a>
                    </li>
                  );
                })}
              </ul>
            )}
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
        </div>
      </div>
    </footer>
  );
}
