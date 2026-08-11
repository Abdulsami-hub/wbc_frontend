import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import eventsImg from "@/assets/events.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import { EVENT_CATEGORIES, EVENTS } from "@/content/events";

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

function Events() {
  const [active, setActive] = useState<string | "all">("all");

  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && EVENT_CATEGORIES.some((c) => c.id === hash)) {
        setActive(hash);
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  const filtered = useMemo(() => {
    if (active === "all") return EVENTS;
    return EVENTS.filter((e) => e.categoryId === active);
  }, [active]);

  function selectCategory(id: string | "all") {
    setActive(id);
    if (id === "all") {
      window.history.replaceState(null, "", window.location.pathname);
    } else {
      window.history.replaceState(null, "", `${window.location.pathname}#${id}`);
    }
  }

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
          <div data-reveal>
            <h2 className="text-[28px] font-bold text-foreground sm:text-[36px]">Browse by category</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-fg">
              Filter the programme by event type. Categories match the navigation filters used across the site.
            </p>
          </div>

          <ul data-reveal className="mt-8 flex flex-wrap gap-3">
            <li>
              <button
                type="button"
                onClick={() => selectCategory("all")}
                aria-pressed={active === "all"}
                className={`rounded-none border px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                  active === "all"
                    ? "border-orange bg-orange text-white"
                    : "border-line bg-background text-foreground hover:border-orange"
                }`}
              >
                All events
              </button>
            </li>
            {EVENT_CATEGORIES.map((c) => (
              <li key={c.id} id={c.id} className="scroll-mt-28">
                <button
                  type="button"
                  onClick={() => selectCategory(c.id)}
                  aria-pressed={active === c.id}
                  className={`rounded-none border px-4 py-2.5 text-[14px] font-semibold transition-colors ${
                    active === c.id
                      ? "border-orange bg-orange text-white"
                      : "border-line bg-background text-foreground hover:border-orange"
                  }`}
                >
                  {c.title}
                </button>
              </li>
            ))}
          </ul>

          {filtered.length > 0 ? (
            <ul data-reveal data-reveal-group className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((event) => {
                const category = EVENT_CATEGORIES.find((c) => c.id === event.categoryId);
                return (
                  <li
                    key={event.slug}
                    className="group flex flex-col overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card"
                  >
                    <img
                      src={event.image}
                      alt=""
                      width={800}
                      height={500}
                      loading="lazy"
                      className="aspect-[16/10] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-6">
                      {category ? (
                        <p className="text-[12px] font-semibold tracking-[0.14em] text-muted-fg uppercase">
                          {category.title}
                        </p>
                      ) : null}
                      <h3 className="mt-2 text-[20px] font-bold leading-snug text-foreground">{event.title}</h3>
                      <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{event.summary}</p>
                      <p className="mt-4 text-[14px] text-foreground">
                        {event.dateLabel} · {event.location}
                      </p>
                      <Link
                        to="/events/$slug"
                        params={{ slug: event.slug }}
                        className="mt-6 inline-flex items-center gap-2 text-[16px] font-bold text-foreground"
                      >
                        View details
                        <span aria-hidden="true" className="rtl-mirror transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div data-reveal className="mx-auto mt-14 max-w-lg rounded-card border border-line bg-surface px-6 py-12 text-center transition-shadow duration-300 hover:shadow-card">
              <h3 className="text-lg font-bold text-foreground">No events in this category</h3>
              <p className="mt-2 text-[15px] text-muted-fg">Check back soon or browse all events.</p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        title="Join the WBC Community"
        description="Be the first to know about upcoming conferences, forums, and global business events."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
