import aboutMenuImage from "@/assets/news-forum.jpg";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";
import { useI18n } from "@/i18n";

const GROUPS = [
  {
    label: "About WBC",
    items: [
      {
        titleKey: "link.whoWeAre" as const,
        desc: "Our mission, vision, and values",
        to: "/who-we-are" as const,
      },
      {
        titleKey: "link.whatWeDo" as const,
        desc: "Programs and global initiatives",
        to: "/what-we-do" as const,
      },
    ],
  },
  {
    label: "Leadership",
    items: [
      {
        titleKey: "link.governance" as const,
        desc: "Leadership structure and policies",
        to: "/governance" as const,
      },
      {
        titleKey: "link.team" as const,
        desc: "Meet the WBC team",
        to: "/wbc-team" as const,
      },
    ],
  },
] as const;

export function MegaMenuAbout({ onNavigate }: { onNavigate?: () => void }) {
  const { t } = useI18n();

  return (
    <MegaMenuShell
      title={t("nav.about")}
      description="Learn about the World Business Council — our mission, vision, values, and global initiatives that empower businesses worldwide."
      promo={{
        image: aboutMenuImage,
        alt: "WBC speaker addressing members at a council forum",
        text: "Explore the full story of WBC and how we connect businesses across the globe.",
        cta: "View all",
        to: "/who-we-are",
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
