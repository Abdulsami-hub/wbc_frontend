import menuImage from "@/assets/membership-menu.png";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

export function MegaMenuMembership({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();

  const groups = [
    {
      label: t("menu.group.membership"),
      items: [
        {
          title: t("link.wbcMembership"),
          desc: t("menu.desc.wbcMembership"),
          to: "/membership" as const,
        },
        {
          title: t("link.become"),
          desc: t("menu.desc.become"),
          to: "/become-a-member" as const,
        },
      ],
    },
    {
      label: t("menu.group.directory"),
      items: [
        {
          title: t("nav.ourMembers"),
          desc: t("menu.desc.ourMembers"),
          to: "/our-members" as const,
        },
      ],
    },
  ];

  return (
    <MegaMenuShell
      title={t("nav.membership")}
      description={t("menu.membership.intro")}
      promo={{
        image: menuImage,
        alt: "Members networking on a busy convention floor",
        text: t("menu.membership.promo"),
        cta: t("link.become"),
        to: "/become-a-member",
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
          items={g.items}
        />
      ))}
    </MegaMenuShell>
  );
}
