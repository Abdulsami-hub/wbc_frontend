import { useQuery } from "@tanstack/react-query";
import eventsImage from "@/assets/events-menu.png";
import { eventsQueryOptions } from "@/lib/queries/events";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";

export function MegaMenuEvents({ onNavigate }: { onNavigate?: () => void }) {
  const { data } = useQuery(eventsQueryOptions);
  const categories = data?.categories ?? [];
  const mid = Math.ceil(categories.length / 2);
  const groups = [
    { label: "Event categories", items: categories.slice(0, mid) },
    { label: "More categories", items: categories.slice(mid) },
  ].filter((g) => g.items.length > 0);

  return (
    <MegaMenuShell
      title="Events"
      description="WBC Special Events, Business Events, Workshops & Trainings, and Other Events across the global network."
      promo={{
        image: eventsImage,
        alt: "Keynote speaker on stage at a WBC business conference, addressing a full auditorium",
        text: "Browse upcoming programmes and past event highlights.",
        cta: "All events",
        to: "/events",
        ...(onNavigate ? { onNavigate } : {}),
      }}
    >
      {groups.map((g, i) => (
        <MegaMenuGroup
          key={g.label}
          label={g.label}
          {...(onNavigate ? { onNavigate } : {})}
          delayMs={80 + i * 40}
          items={g.items.map((it) => ({
            title: it.title,
            desc: it.desc,
            to: "/events",
            hash: it.id,
          }))}
        />
      ))}
    </MegaMenuShell>
  );
}
