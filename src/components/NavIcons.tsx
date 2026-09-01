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
  "nav.jobs": BriefcaseBusiness,
  "nav.contact": Mail,
  "footer.privacy": Scale,
  "footer.terms": Globe2,
};

export function FooterLinkIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex size-4 shrink-0 text-white/45 transition-colors group-hover:text-white" aria-hidden="true">
      <Icon className="size-4" strokeWidth={1.75} />
    </span>
  );
}
