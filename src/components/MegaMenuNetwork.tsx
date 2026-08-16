import networkImage from "@/assets/network-bg.jpg";
import { MegaMenuGroup, MegaMenuShell } from "./MegaMenuShell";

const GROUPS = [
  {
    label: "Network Structure",
    items: [
      {
        title: "WBC Headquarters",
        desc: "Leadership, governance, and coordination in Paris",
        to: "/who-we-are" as const,
      },
      {
        title: "WBC Affiliates",
        desc: "Official representatives in countries and cities",
        to: "/affiliates" as const,
      },
    ],
  },
  {
    label: "Members & Partners",
    items: [
      {
        title: "Institutional Members",
        desc: "Institutional, corporate, SME, and individual members",
        to: "/our-members" as const,
      },
      {
        title: "Partners",
        desc: "Partnerships, joint initiatives, and cooperation",
        to: "/global-network/strategic-partners" as const,
      },
    ],
  },
] as const;

export function MegaMenuNetwork({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <MegaMenuShell
      title="Global Network"
      description="Headquarters, affiliates, members, and partners working as one collaborative global network."
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
