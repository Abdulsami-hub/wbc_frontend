import { createFileRoute, Link } from "@tanstack/react-router";
import eventsImg from "@/assets/events.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";


export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — World Business Council" },
      {
        name: "description",
        content:
          "Summits, forums, conferences, exhibitions, networking events, trade missions, and business meetings organised by the World Business Council.",
      },
      { property: "og:title", content: "WBC Events" },
      { property: "og:description", content: "One coordinated event ecosystem for international growth and cooperation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

const PROGRAMS = [
  {
    tag: "Summit",
    title: "High-Level Forums & Summits",
    body: "Executive forums, summits, conferences, and exhibitions that enable knowledge exchange, strategic positioning, and visibility for organizations and sponsors.",
    cta: "Join the next forum conversation",
    to: "/contact" as const,
  },
  {
    tag: "Meetings",
    title: "Networking & Business Meetings",
    body: "Curated networking events and structured B2B meetings that turn introductions into working relationships across markets and sectors.",
    cta: "Reserve your place to connect",
    to: "/contact" as const,
  },
  {
    tag: "Mission",
    title: "Trade Missions & Collaborative Roundtables",
    body: "Delegations and focused roundtables that accelerate market understanding, partnership building, and practical cooperation between members and institutions.",
    cta: "Take part in a working session",
    to: "/contact" as const,
  },
] as const;

function Events() {
  return (
    <>
      <SplitHero
        eyebrow="Global Programme"
        title="Events"
        description="Summits, forums, conferences, exhibitions, and roundtables bringing the WBC network together."
        tags={["Forums", "Networking", "Trade Missions"]}
        image={eventsImg}
        imageAlt="Delegates attending an international WBC business forum"
        ctaLabel="Get Event Updates"
        ctaTo="/contact"
      />


      <section className="py-16 lg:py-24">
        <div className="container-wbc">
          <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
            <div data-reveal>
              <h2 className="text-[30px] leading-[1.15] font-bold tracking-tight text-navy sm:text-[38px] lg:text-[46px]">
                One coordinated event ecosystem for international growth and cooperation
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-[1.75] text-muted-fg">
                From international summits and business forums to conferences, exhibitions, roundtables, networking
                events, trade missions, and targeted business meetings, WBC runs a connected program where members gain
                insight, visibility, and practical partnership opportunities.
              </p>
            </div>

            <div
              data-reveal
              className="rounded-card border border-line bg-background p-8 shadow-card lg:mt-16"
              aria-hidden="true"
            >
              <svg viewBox="0 0 360 150" className="h-auto w-full text-navy/45" fill="none">
                <polyline
                  points="20,70 70,52 120,66 170,44 220,60 270,36 320,50"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                {[
                  [20, 70],
                  [70, 52],
                  [120, 66],
                  [170, 44],
                  [220, 60],
                  [270, 36],
                  [320, 50],
                ].map(([x, y]) => (
                  <circle key={`${x}-${y}`} cx={x} cy={y} r="3" stroke="currentColor" strokeWidth="1.2" />
                ))}
                <line x1="20" y1="126" x2="340" y2="126" stroke="currentColor" strokeWidth="1.2" />
                <rect x="34" y="106" width="66" height="20" stroke="currentColor" strokeWidth="1.2" />
                <rect x="112" y="96" width="66" height="30" stroke="currentColor" strokeWidth="1.2" />
                <rect x="190" y="86" width="66" height="40" stroke="currentColor" strokeWidth="1.2" />
                <rect x="268" y="100" width="66" height="26" stroke="currentColor" strokeWidth="1.2" />
              </svg>
            </div>
          </div>

          <ul data-reveal data-reveal-group className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROGRAMS.map((p) => (
              <li
                key={p.title}
                className="group flex flex-col rounded-card border border-line bg-background p-7 transition-all hover:-translate-y-1 hover:border-orange/50 hover:shadow-card"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="max-w-[15ch] text-[21px] leading-snug font-bold text-navy">{p.title}</h3>
                  <span className="shrink-0 rounded-full border border-line px-3 py-1.5 text-[12px] font-semibold tracking-[0.14em] text-muted-fg uppercase">
                    {p.tag}
                  </span>
                </div>
                <p className="mt-5 text-[16px] leading-[1.75] text-muted-fg">{p.body}</p>
                <Link
                  to={p.to}
                  className="mt-8 inline-flex items-center gap-2 text-[16px] font-bold text-orange"
                >
                  {p.cta}
                  <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            data-reveal
            className="mx-auto mt-14 max-w-lg rounded-card border border-line bg-surface px-6 py-12 text-center"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-background" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-orange">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy">No Events Scheduled</h3>
            <p className="mt-2 text-[15px] text-muted-fg">Upcoming WBC events will be announced here.</p>
          </div>
        </div>
      </section>

      <CTASection
        title="Join the WBC Community"
        description="Be the first to know about upcoming conferences, forums, and global business events."
        ctaLabel="Become a Member"
        to="/membership"
      />
    </>
  );
}
