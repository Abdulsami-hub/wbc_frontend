import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Gift,
  Globe2,
  Handshake,
  Mail,
  MapPinned,
  Network,
  Newspaper,
  Scale,
  UserPlus,
  Users,
  UsersRound,
} from "lucide-react";
import type { TranslationKey } from "@/i18n";

export const MENU_ICONS = {
  "/who-we-are": Building2,
  "/what-we-do": BriefcaseBusiness,
  "/governance": Scale,
  "/wbc-team": UsersRound,
  "/membership": BadgeCheck,
  "/become-a-member": UserPlus,
  "/our-members": Users,
} as const satisfies Record<string, LucideIcon>;

export const FOOTER_ICONS: Partial<Record<TranslationKey, LucideIcon>> = {
  "link.whoWeAre": Building2,
  "link.whatWeDo": BriefcaseBusiness,
  "link.governance": Scale,
  "link.team": UsersRound,
  "link.hq": MapPinned,
  "link.affiliates": Network,
  "link.institutional": Building2,
  "link.partners": Handshake,
  "link.wbcMembership": BadgeCheck,
  "link.benefits": Gift,
  "link.become": UserPlus,
  "nav.ourMembers": Users,
  "nav.news": Newspaper,
  "nav.events": CalendarDays,
  "nav.contact": Mail,
  "footer.privacy": Scale,
  "footer.terms": Globe2,
};

export function MenuLinkIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span
      className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center bg-orange/10 text-foreground transition-colors group-hover:bg-orange group-hover:text-orange-foreground"
      aria-hidden="true"
    >
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );
}

export function FooterLinkIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex size-4 shrink-0 text-white/45 transition-colors group-hover:text-white" aria-hidden="true">
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );
}
