import networkImage from "@/assets/network-menu.png";
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
        desc: "Official representatives connecting local communities to the global network",
        to: "/affiliates" as const,
      },
      {
        title: "WBC Members",
        desc: "Institutional, corporate, SME, and individual members",
        to: "/our-members" as const,
      },
    ],
  },
  {
    label: "Sponsors & Partners",
    items: [
      {
        title: "WBC Sponsors",
        desc: "Financial, media, in-kind, and other forms of sponsorship",
        to: "/global-network/strategic-partners" as const,
      },
      {
        title: "WBC Strategic Partners",
        desc: "Strategic cooperation, joint initiatives, and institutional relations",
        to: "/global-network/strategic-partners" as const,
      },
    ],
  },
] as const;

export function MegaMenuNetwork({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <MegaMenuShell
      title="Global Network"
      description="Headquarters, affiliates, members, sponsors, and strategic partners working as one collaborative global network."
      promo={{
        image: networkImage,
        alt: "Clasped hands with a digital world map and connected network nodes",
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
