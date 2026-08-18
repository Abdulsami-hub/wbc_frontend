import menuImage from "@/assets/membership-menu.png";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

const GROUPS = [
  {
    label: "Membership",
    items: [
      {
        titleKey: "link.wbcMembership" as const,
        desc: "Types, benefits, fees",
        to: "/membership" as const,
      },
      {
        titleKey: "link.become" as const,
        desc: "Start your membership application",
        to: "/become-a-member" as const,
      },
    ],
  },
  {
    label: "Directory",
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
      description="Explore membership benefits, apply to become a member, and browse our members directory."
      promo={{
        image: menuImage,
        alt: "Members networking on a busy convention floor",
        text: "Start your journey with WBC and unlock global business opportunities.",
        cta: "Become a Member",
        to: "/become-a-member",
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
          }))}
        />
      ))}
    </MegaMenuShell>
  );
}
