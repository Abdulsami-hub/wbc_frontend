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
    body: "Facilitating high-level networking opportunities that connect entrepreneurs, executives, investors, and organizations across industries and regions. WBC creates platforms where meaningful business relationships and long-term partnerships are developed.",
    image: networkImg,
  },
  {
    kicker: "Frameworks",
    title: "Business Council Development & Support",
    body: "Providing strategic guidance and operational support for the creation, development, and strengthening of Business Councils brand worldwide. This includes structure setup, governance models, and long-term operational assistance.",
    image: councilImg,
  },
  {
    kicker: "Trade",
    title: "International Trade & Investment Facilitation",
    body: "Supporting cross-border trade and investment opportunities by connecting businesses with international partners, markets, and investors, and promoting global commercial cooperation.",
    image: tradeImg,
  },
  {
    kicker: "Events",
    title: "Conferences, Forums & Global Events",
    body: "Organizing international summits, business forums, conferences, exhibitions, and roundtables that bring together global leaders to exchange knowledge, explore opportunities, and address key economic challenges.",
    image: eventsImg,
  },
  {
    kicker: "Innovation",
    title: "Innovation & Ideas Development Platform - Ideas Place(IP)",
    body: "Operating an innovation-driven platform where members can share ideas, develop projects, and collaborate on forward-thinking solutions that contribute to business transformation and economic progress.",
    image: innovationImg,
  },
  {
    kicker: "Advisory",
    title: "Business Advisory & Consultancy Support",
    body: "Offering advisory services to businesses, startups, and Business Councils in areas such as international expansion, strategic planning, market entry, organizational development, and partnerships.",
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

        <ul
          data-reveal
          data-reveal-group
          className="service-card-grid mt-10 grid items-stretch gap-6 overflow-visible lg:grid-cols-2"
        >
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
          <Link to="/what-we-do" className="card-link">
            View all services
            <span aria-hidden="true" className="card-link-arrow rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
