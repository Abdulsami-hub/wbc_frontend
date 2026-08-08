import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import eventsImg from "@/assets/events.jpg";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — World Business Council" },
      {
        name: "description",
        content:
          "Conferences, forums, and global events organised by the World Business Council. Upcoming WBC events are announced here.",
      },
      { property: "og:title", content: "WBC Events" },
      { property: "og:description", content: "Conferences, forums, and global business events from WBC." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Events,
});

const FILTERS = ["All Events", "Upcoming", "Featured"] as const;

function Events() {
  const [active, setActive] = useState<(typeof FILTERS)[number]>("All Events");

  return (
    <>
      <PageHero
        image={eventsImg}
        width={1600}
        height={800}
        eyebrow="Global Programme"
        title="Events"
        description="Summits, forums, conferences, exhibitions, and roundtables bringing the WBC network together."
      />

      <section className="py-16 lg:py-20">
        <div className="container-wbc">
          <SectionHeading
            eyebrow="Latest Updates"
            title="Conferences, Forums & Global Events"
            description="Stay informed about WBC gatherings that connect businesses, institutions, and partners across borders."
          />

          <div role="group" aria-label="Filter events" className="mt-8 flex flex-wrap justify-center gap-3">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                aria-pressed={active === f}
                onClick={() => setActive(f)}
                className={`min-h-10 rounded-md px-5 text-[12px] font-semibold uppercase transition-colors ${
                  active === f
                    ? "bg-orange text-orange-foreground"
                    : "border border-line bg-background text-navy hover:border-orange"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-12 max-w-lg rounded-card border border-line bg-surface px-6 py-14 text-center">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-background" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-orange">
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            </span>
            <h3 className="mt-5 text-lg font-bold text-navy">No Events Scheduled</h3>
            <p className="mt-2 text-[13px] text-muted-fg">Upcoming WBC events will be announced here.</p>
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
