import menuImage from "@/assets/events.jpg";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

const GROUPS = [
  {
    label: "Join",
    items: [
      {
        titleKey: "link.wbcMembership" as const,
        desc: "Types of membership and how to join",
        to: "/membership" as const,
      },
      {
        titleKey: "link.benefits" as const,
        desc: "Advantages of joining WBC",
        to: "/membership" as const,
        hash: "benefits" as const,
      },
      {
        titleKey: "link.become" as const,
        desc: "Start your membership application",
        to: "/membership" as const,
        hash: "application" as const,
      },
    ],
  },
  {
    label: "Community",
    items: [
      {
        titleKey: "nav.ourMembers" as const,
        desc: "Directory of active members",
        to: "/our-members" as const,
      },
    ],
  },
] as const;

export function MegaMenuMembership({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();

  return (
    <MegaMenuShell
      title="Membership"
      description="Join a global community of business leaders. Explore membership types, benefits, and apply in one place."
      promo={{
        image: menuImage,
        alt: "Speaker addressing WBC members at a membership event",
        text: "Start your journey with WBC and unlock global business opportunities.",
        cta: "Apply now",
        to: "/membership",
        hash: "application",
        ...(onNavigate ? { onNavigate } : {}),
      }}
    >
      {GROUPS.map((g, i) => (
        <MegaMenuGroup
          key={g.label}
          label={g.label}
          {...(onNavigate ? { onNavigate } : {})}
          delayMs={80 + i * 40}
          items={g.items.map((it) => ({
            title: t(it.titleKey),
            desc: it.desc,
            to: it.to,
            ...("hash" in it ? { hash: it.hash } : {}),
          }))}
        />
      ))}
    </MegaMenuShell>
  );
}
