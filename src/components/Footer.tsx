import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "./Logo";
import { FOOTER_ICONS, FooterLinkIcon } from "./NavIcons";
import { useI18n, type TranslationKey } from "@/i18n";
import { SocialLinks } from "@/components/SocialLinks";
import { siteSettingsQueryOptions } from "@/lib/queries/site-settings";

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
            <SocialLinks className="mt-4" variant="onDark" links={socialLinks} />
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
