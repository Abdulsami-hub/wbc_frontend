import networkImage from "@/assets/network-menu.png";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

export function MegaMenuNetwork({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();

  const groups = [
    {
      label: t("menu.group.structure"),
      items: [
        { title: t("link.hq"), desc: t("menu.desc.hq"), to: "/who-we-are" as const },
        { title: t("link.affiliates"), desc: t("menu.desc.affiliates"), to: "/affiliates" as const },
      ],
    },
    {
      label: t("menu.group.membersPartners"),
      items: [
        {
          title: t("link.institutional"),
          desc: t("menu.desc.institutional"),
          to: "/our-members" as const,
        },
        {
          title: t("link.partners"),
          desc: t("menu.desc.partners"),
          to: "/global-network/strategic-partners" as const,
        },
      ],
    },
  ];

  return (
    <MegaMenuShell
      title={t("nav.network")}
      description={t("menu.network.intro")}
      promo={{
        image: networkImage,
        alt: "Clasped hands with a digital world map and connected network nodes",
        text: t("menu.network.promo"),
        cta: t("ui.viewNetwork"),
        to: "/global-network",
        ...(onNavigate ? { onNavigate } : {}),
      }}
    >
      {groups.map((g, i) => (
        <MegaMenuGroup
          key={g.label}
          label={g.label}
          translated
          items={g.items}
          {...(onNavigate ? { onNavigate } : {})}
          delayMs={80 + i * 40}
        />
      ))}
    </MegaMenuShell>
  );
}
