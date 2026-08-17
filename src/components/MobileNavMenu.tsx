import { Link } from "@tanstack/react-router";
import { EVENT_CATEGORIES } from "@/content/events";
import { useI18n, type TranslationKey } from "@/i18n";

type SubmenuItem = { title: string; to: string; hash?: string };
type SubmenuGroup = { label: string; items: SubmenuItem[] };

export function getMobileSubmenus(t: (key: TranslationKey) => string): Record<string, SubmenuGroup[]> {
  const mid = Math.ceil(EVENT_CATEGORIES.length / 2);

  return {
    "/who-we-are": [
      {
        label: "About WBC",
        items: [
          { title: t("link.whoWeAre"), to: "/who-we-are" },
          { title: t("link.whatWeDo"), to: "/what-we-do" },
        ],
      },
      {
        label: "Leadership",
        items: [
          { title: t("link.governance"), to: "/governance" },
          { title: t("link.team"), to: "/wbc-team" },
        ],
      },
    ],
    "/global-network": [
      {
        label: "Network Structure",
        items: [
          { title: "WBC Headquarters", to: "/who-we-are" },
          { title: "WBC Affiliates", to: "/affiliates" },
        ],
      },
      {
        label: "Members & Partners",
        items: [
          { title: "Institutional Members", to: "/our-members" },
          { title: t("link.partners"), to: "/global-network/strategic-partners" },
        ],
      },
    ],
    "/membership": [
      {
        label: "Benefits",
        items: [{ title: t("link.wbcMembership"), to: "/membership" }],
      },
      {
        label: "Join",
        items: [{ title: t("link.become"), to: "/become-a-member" }],
      },
      {
        label: "Directory",
        items: [{ title: t("nav.ourMembers"), to: "/our-members" }],
      },
    ],
    "/events": [
      {
        label: "Programmes",
        items: EVENT_CATEGORIES.slice(0, mid).map((it) => ({
          title: it.title,
          to: "/events",
          hash: it.id,
        })),
      },
      {
        label: "More",
        items: EVENT_CATEGORIES.slice(mid).map((it) => ({
          title: it.title,
          to: "/events",
          hash: it.id,
        })),
      },
    ],
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
  const groups = getMobileSubmenus(t)[route] ?? [];

  return (
    <div className="border-t border-line/80 bg-surface/50 px-4 py-3">
      {groups.map((group) => (
        <ul key={group.label} className="space-y-1 py-1">
          {group.items.map((item) => (
            <li key={`${item.to}-${item.hash ?? item.title}`}>
              <Link
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                onClick={onNavigate}
                className="block rounded-md px-2 py-2.5 text-[15px] font-medium text-foreground transition-colors hover:bg-background hover:text-navy"
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
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
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-label={`${expanded ? "Collapse" : "Expand"} ${label} submenu`}
      className="inline-flex size-11 shrink-0 items-center justify-center text-muted-fg transition-colors hover:text-navy"
    >
      <Chevron open={expanded} />
    </button>
  );
}
