import eventsImage from "@/assets/events-menu.png";
import { EVENT_CATEGORIES } from "@/content/events";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";

export function MegaMenuEvents({ onNavigate }: { onNavigate?: () => void }) {
  const mid = Math.ceil(EVENT_CATEGORIES.length / 2);
  const groups = [
    { label: "Programmes", items: EVENT_CATEGORIES.slice(0, mid) },
    { label: "More", items: EVENT_CATEGORIES.slice(mid) },
  ];

  return (
    <MegaMenuShell
      title="Events"
      description="Summits, forums, networking, trade missions, and business meetings across the WBC network."
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
