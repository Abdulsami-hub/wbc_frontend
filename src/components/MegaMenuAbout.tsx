import aboutMenuImage from "@/assets/about-menu.png";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

export function MegaMenuAbout({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();

  const groups = [
    {
      label: t("menu.group.aboutWbc"),
      items: [
        { title: t("link.whoWeAre"), desc: t("menu.desc.whoWeAre"), to: "/who-we-are" as const },
        { title: t("link.whatWeDo"), desc: t("menu.desc.whatWeDo"), to: "/what-we-do" as const },
      ],
    },
    {
      label: t("menu.group.leadership"),
      items: [
        { title: t("link.governance"), desc: t("menu.desc.governance"), to: "/governance" as const },
        { title: t("link.team"), desc: t("menu.desc.team"), to: "/wbc-team" as const },
      ],
    },
  ];

  return (
    <MegaMenuShell
      title={t("nav.about")}
      description={t("menu.about.intro")}
      promo={{
        image: aboutMenuImage,
        alt: "Modern glass skyscrapers at dusk",
        text: t("menu.about.promo"),
        cta: t("ui.viewAll"),
        to: "/who-we-are",
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
