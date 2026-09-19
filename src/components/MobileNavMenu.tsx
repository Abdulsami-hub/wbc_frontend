import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import type { EventCategory } from "@/content/events";
import { useI18n, type TranslationKey } from "@/i18n";
import { eventsQueryOptions } from "@/lib/queries/events";

type SubmenuItem = { title: string; to: string; hash?: string; dynamic?: boolean };
type SubmenuGroup = { label: string; items: SubmenuItem[] };

export function getMobileSubmenus(
  t: (key: TranslationKey) => string,
  eventCategories: EventCategory[] = [],
): Record<string, SubmenuGroup[]> {
  const mid = Math.ceil(eventCategories.length / 2);

  return {
    "/who-we-are": [
      {
        label: t("menu.group.aboutWbc"),
        items: [
          { title: t("link.whoWeAre"), to: "/who-we-are" },
          { title: t("link.whatWeDo"), to: "/what-we-do" },
        ],
      },
      {
        label: t("menu.group.leadership"),
        items: [
          { title: t("link.governance"), to: "/governance" },
          { title: t("link.team"), to: "/wbc-team" },
        ],
      },
    ],
    "/global-network": [
      {
        label: t("menu.group.structure"),
        items: [
          { title: t("link.hq"), to: "/who-we-are" },
          { title: t("link.affiliates"), to: "/affiliates" },
        ],
      },
      {
        label: t("menu.group.membersPartners"),
        items: [
          { title: t("link.institutional"), to: "/our-members" },
          { title: t("link.partners"), to: "/global-network/strategic-partners" },
        ],
      },
    ],
    "/membership": [
      {
        label: t("menu.group.benefits"),
        items: [{ title: t("link.wbcMembership"), to: "/membership" }],
      },
      {
        label: t("menu.group.join"),
        items: [{ title: t("link.become"), to: "/become-a-member" }],
      },
      {
        label: t("menu.group.directory"),
        items: [{ title: t("nav.ourMembers"), to: "/our-members" }],
      },
    ],
    "/events": [
      {
        label: t("menu.group.eventCategories"),
        items: eventCategories.slice(0, mid).map((it) => ({
          title: it.title,
          to: "/events",
          hash: it.id,
          dynamic: true,
        })),
      },
      {
        label: t("menu.group.moreCategories"),
        items: eventCategories.slice(mid).map((it) => ({
          title: it.title,
          to: "/events",
          hash: it.id,
          dynamic: true,
        })),
      },
    ].filter((group) => group.items.length > 0),
  };
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={`shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function MobileNavSubmenuPanel({
  route,
  onNavigate,
}: {
  route: string;
  onNavigate: () => void;
}) {
  const { t } = useI18n();
  const { data } = useQuery(eventsQueryOptions);
  const groups = getMobileSubmenus(t, data?.categories ?? [])[route] ?? [];

  return (
    <div className="border-t border-line/80 bg-surface/50 px-4 py-3">
      {groups.map((group) => (
        <div key={group.label} className="py-1">
          <p className="px-2 pb-1 text-[11px] font-bold tracking-[0.16em] text-muted-fg uppercase">
            {group.label}
          </p>
          <ul className="space-y-1">
            {group.items.map((item) => (
              <li key={`${item.to}-${item.hash ?? item.title}`}>
                <Link
                  to={item.to}
                  {...(item.hash ? { hash: item.hash } : {})}
                  {...(item.dynamic ? { "data-dynamic": "" } : {})}
                  onClick={onNavigate}
                  className="block rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-background hover:text-navy"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function MobileNavExpandButton({
  label,
  expanded,
  onToggle,
}: {
  label: string;
  expanded: boolean;
  onToggle: () => void;
}) {
  const { t } = useI18n();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={`${expanded ? t("ui.closeMenu") : t("ui.openMenu")} ${label}`}
      className="inline-flex size-11 shrink-0 items-center justify-center text-muted-fg transition-colors hover:text-navy"
    >
      <Chevron open={expanded} />
    </button>
  );
}
