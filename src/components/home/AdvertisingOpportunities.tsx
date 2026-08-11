import { Link } from "@tanstack/react-router";
import eventsImg from "@/assets/events.jpg";

const OPPORTUNITIES = [
  {
    title: "Event sponsorship",
    body: "Position your brand beside summits, forums, and trade programmes attended by institutional and corporate leaders.",
  },
  {
    title: "Digital & print features",
    body: "Reach members and partners through newsletters, web features, and campaign placements across the WBC network.",
  },
  {
    title: "Partnership packages",
    body: "Build multi-touch visibility with tailored packages spanning events, content, and network introductions.",
  },
] as const;

export function AdvertisingOpportunities() {
  return (
    <section className="border-t border-line py-16 lg:py-24">
      <div className="container-wbc grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-stretch lg:gap-14">
        <div className="relative overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
          <img
            src={eventsImg}
            alt="Business audience at a WBC sponsored programme"
            width={1400}
            height={900}
            loading="lazy"
            decoding="async"
            className="values-bg-drift absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/45 to-navy/20" />
          <div className="relative flex h-full min-h-[320px] flex-col justify-end p-8 sm:p-10">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-white/75">Grow with WBC</p>
            <h2 className="mt-3 max-w-md text-[32px] font-bold leading-tight text-white sm:text-[40px]">
              Advertising Opportunities
            </h2>
            <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-white/85">
              Connect your organisation with an international audience of decision-makers through sponsorships,
              features, and partnership packages.
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <ul data-reveal data-reveal-group className="space-y-4">
            {OPPORTUNITIES.map((o) => (
              <li key={o.title} className="rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card">
                <h3 className="text-[18px] font-bold text-foreground">{o.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-fg text-justify">{o.body}</p>
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-8">
            <Link to="/contact" className="btn-navy !rounded-md">
              Enquire about advertising
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
