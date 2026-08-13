import networkImage from "@/assets/network-bg.jpg";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";

const GROUPS = [
  {
    label: "Network Structure",
    items: [
      {
        title: "WBC Headquarters",
        desc: "Paris-based global coordination",
        to: "/who-we-are" as const,
      },
      {
        title: "WBC Affiliates",
        desc: "Country and city affiliate presence",
        to: "/affiliates" as const,
      },
    ],
  },
  {
    label: "Members & Partners",
    items: [
      {
        title: "Institutional Members",
        desc: "Chambers, associations, and institutions",
        to: "/our-members" as const,
      },
      {
        title: "Strategic Partners",
        desc: "Organizations delivering joint initiatives",
        to: "/global-network/strategic-partners" as const,
      },
    ],
  },
] as const;

export function MegaMenuNetwork({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <MegaMenuShell
      title="Global Network"
      description="Headquarters, affiliates, institutional members, and strategic partners working as one coordinated network."
      promo={{
        image: networkImage,
        alt: "Illuminated world map representing the WBC global network",
        text: "Explore how WBC connects institutions and businesses across regions.",
        cta: "View network",
        to: "/global-network",
        ...(onNavigate ? { onNavigate } : {}),
      }}
    >
      {GROUPS.map((g, i) => (
        <MegaMenuGroup
          key={g.label}
          label={g.label}
          items={[...g.items]}
          {...(onNavigate ? { onNavigate } : {})}
          delayMs={80 + i * 40}
        />
      ))}
    </MegaMenuShell>
  );
}
