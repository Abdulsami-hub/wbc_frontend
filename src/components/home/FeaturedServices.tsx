import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";
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
            <li
              key={s.title}
              className="group rounded-card border border-line bg-background p-5 transition-shadow duration-300 hover:shadow-card sm:p-7"
            >
              <div className="flex gap-5 sm:gap-7">
                <img
                  src={s.image}
                  alt=""
                  width={640}
                  height={640}
                  loading="lazy"
                  decoding="async"
                  className="size-24 shrink-0 rounded-card object-cover sm:size-32"
                />
                <div className="min-w-0 border-s border-line ps-5 transition-colors duration-300 group-hover:border-orange/30 sm:ps-7">
                  <p className="text-[13px] font-semibold tracking-[0.14em] text-muted-fg uppercase">
                    {String(i + 1).padStart(2, "0")} · {s.kicker}
                  </p>
                  <h3 className="mt-2 text-[19px] leading-snug font-bold text-foreground sm:text-[22px]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-10 text-start">
          <Link to="/what-we-do" className="text-[15px] font-semibold text-foreground">
            View all services <span aria-hidden="true" className="rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
