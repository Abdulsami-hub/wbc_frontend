import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import networkImg from "@/assets/wwd-network.jpg";
import councilImg from "@/assets/wwd-council.jpg";
import tradeImg from "@/assets/wwd-trade.jpg";
import eventsImg from "@/assets/wwd-events.jpg";
import innovationImg from "@/assets/wwd-innovation.jpg";
import advisoryImg from "@/assets/wwd-hero.jpg";

const SERVICES = [
  {
    kicker: "Network",
    title: "Global Business Networking",
    body: "Connects companies, institutions, and professionals across regions and sectors to build trusted relationships, practical collaboration, and long-term business opportunities.",
    image: networkImg,
  },
  {
    kicker: "Frameworks",
    title: "Business Council Development & Support",
    body: "Supports the establishment and strengthening of Business Councils and associations through governance guidance, operational frameworks, and member-focused development.",
    image: councilImg,
  },
  {
    kicker: "Trade",
    title: "International Trade & Investment Facilitation",
    body: "Facilitates cross-border trade and investment through introductions, delegation support, market-entry pathways, and coordination between relevant stakeholders.",
    image: tradeImg,
  },
  {
    kicker: "Events",
    title: "Conferences, Forums & Global Events",
    body: "Organizes international conferences, forums, and executive events that advance dialogue, share expertise, and catalyze new partnerships.",
    image: eventsImg,
  },
  {
    kicker: "Innovation",
    title: "Innovation & Ideas Development Platform",
    body: "Provides a structured platform for generating, refining, and piloting ideas by connecting innovators, enterprises, and institutions around shared challenges.",
    image: innovationImg,
  },
  {
    kicker: "Advisory",
    title: "Business Advisory & Consultancy Support",
    body: "Delivers advisory and consultancy support in strategy, market expansion, institutional positioning, and practical implementation planning.",
    image: advisoryImg,
  },
] as const;

export function FeaturedServices() {
  return (
    <section className="border-t border-line bg-surface/40 py-16 lg:py-20">
      <div className="container-wbc">
        <SectionHeading
          align="left"
          eyebrow="Featured Services"
          title="What We Do"
          description="Six selected services from our full programme of activities supporting businesses worldwide."
        />

        <ul data-reveal data-reveal-group className="mt-10 grid gap-6 lg:grid-cols-2">
          {SERVICES.map((s, i) => (
            <ServiceCard
              key={s.title}
              kicker={s.kicker}
              title={s.title}
              body={s.body}
              image={s.image}
              index={i}
            />
          ))}
        </ul>

        <div data-reveal className="mt-10 text-start">
          <Link to="/what-we-do" className="link-arrow">
            View all services
            <span aria-hidden="true" className="link-arrow-icon rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
