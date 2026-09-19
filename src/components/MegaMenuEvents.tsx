import { useQuery } from "@tanstack/react-query";
import eventsImage from "@/assets/events-menu.png";
import { eventsQueryOptions } from "@/lib/queries/events";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

export function MegaMenuEvents({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();
  const { data } = useQuery(eventsQueryOptions);
  const categories = data?.categories ?? [];
  const mid = Math.ceil(categories.length / 2);
  const groups = [
    { label: t("menu.group.eventCategories"), items: categories.slice(0, mid) },
    { label: t("menu.group.moreCategories"), items: categories.slice(mid) },
  ].filter((g) => g.items.length > 0);

  return (
    <MegaMenuShell
      title={t("nav.events")}
      description={t("menu.events.intro")}
      promo={{
        image: eventsImage,
        alt: "Keynote speaker on stage at a WBC business conference, addressing a full auditorium",
        text: t("menu.events.promo"),
        cta: t("ui.allEvents"),
        to: "/events",
        ...(onNavigate ? { onNavigate } : {}),
      }}
    >
      {groups.map((g, i) => (
        <MegaMenuGroup
          key={g.label}
          label={g.label}
          translated
          {...(onNavigate ? { onNavigate } : {})}
          delayMs={80 + i * 40}
          items={g.items.map((it) => ({
            title: it.title,
            desc: it.desc,
            to: "/events",
            hash: it.id,
            dynamic: true,
          }))}
        />
      ))}
    </MegaMenuShell>
  );
}
