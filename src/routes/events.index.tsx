import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import eventsImg from "@/assets/events.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import {
  EVENT_CATEGORIES,
  EVENTS,
  type EventRecord,
} from "@/content/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function EventDateBadge({
  dateLabel,
  location,
  size = "card",
}: {
  dateLabel: string;
  location: string;
  size?: "card" | "modal";
}) {
  const sizeClasses =
    size === "modal"
      ? "px-3.5 py-2.5 text-[13px] sm:text-[14px]"
      : "px-3 py-2 text-[11px] sm:text-[12px]";

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-white/50 text-end shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-2xl backdrop-saturate-150 ${sizeClasses}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-white/12 to-white/5"
        aria-hidden="true"
      />
      <div className="relative">
        <p className="font-semibold leading-tight whitespace-nowrap text-white drop-shadow-sm">{dateLabel}</p>
        <p className="mt-0.5 font-medium leading-snug text-white/95 drop-shadow-sm">{location}</p>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/events/")({
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

function EventDetailModal({
  event,
  open,
  onOpenChange,
}: {
  event: EventRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const category = event ? EVENT_CATEGORIES.find((c) => c.id === event.categoryId) : undefined;

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[min(960px,calc(100vw-1.5rem))] max-w-none overflow-y-auto rounded-card border-line p-0 sm:rounded-card">
        {event ? (
          <>
            <DialogHeader className="sr-only">
              <DialogTitle>{event.title}</DialogTitle>
              <DialogDescription>{event.summary}</DialogDescription>
            </DialogHeader>

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative min-h-[240px] bg-navy-deep lg:min-h-full">
                <img
                  src={event.image}
                  alt=""
                  width={1200}
                  height={900}
                  className="absolute inset-0 size-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute end-0 top-0 p-5 sm:p-6">
                  <EventDateBadge dateLabel={event.dateLabel} location={event.location} size="modal" />
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                {category ? (
                  <p className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">{category.title}</p>
                ) : null}
                <h2 className="mt-3 text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">{event.title}</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{event.summary}</p>
                <span className="accent-rule mt-5" />

                <dl className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-card border border-line bg-surface px-4 py-3">
                    <dt className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">Date</dt>
                    <dd className="mt-1 text-[15px] font-semibold text-foreground">{event.dateLabel}</dd>
                  </div>
                  <div className="rounded-card border border-line bg-surface px-4 py-3">
                    <dt className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">Location</dt>
                    <dd className="mt-1 text-[15px] font-semibold text-foreground">{event.location}</dd>
                  </div>
                  {event.registrationFee ? (
                    <div className="rounded-card border border-line bg-surface px-4 py-3 sm:col-span-2">
                      <dt className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">Registration</dt>
                      <dd className="mt-1 text-[15px] font-semibold text-foreground">{event.registrationFee}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-8">
                  <h3 className="text-[17px] font-bold text-foreground">About this event</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{event.description}</p>
                </div>

                {event.agenda && event.agenda.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-[17px] font-bold text-foreground">Agenda</h3>
                    <ul className="mt-4 space-y-3">
                      {event.agenda.map((a) => (
                        <li key={`${a.time}-${a.title}`} className="flex gap-4 border-b border-line pb-3 text-[14px]">
                          <span className="w-16 shrink-0 font-semibold text-foreground sm:w-20">{a.time}</span>
                          <span className="text-muted-fg">{a.title}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {event.speakers && event.speakers.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-[17px] font-bold text-foreground">Speakers</h3>
                    <ul className="mt-4 space-y-3">
                      {event.speakers.map((s) => (
                        <li key={s.name}>
                          <p className="font-semibold text-foreground">{s.name}</p>
                          <p className="text-[13px] text-muted-fg">{s.role}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {event.media && event.media.length > 0 ? (
                  <div className="mt-8">
                    <h3 className="text-[17px] font-bold text-foreground">Media</h3>
                    <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                      {event.media.map((m) => (
                        <li key={m.url} className="overflow-hidden rounded-card border border-line">
                          <img src={m.url} alt={m.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                          {m.caption ? <p className="p-2.5 text-[12px] text-muted-fg">{m.caption}</p> : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  {event.registrationUrl ? (
                    <Link to="/contact" className="btn-orange" onClick={() => onOpenChange(false)}>
                      Register / Enquire
                    </Link>
                  ) : null}
                  <Link
                    to="/membership"
                    hash="application"
                    className="btn-base border border-line bg-background text-foreground hover:border-navy"
                    onClick={() => onOpenChange(false)}
                  >
                    Become a Member
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function Events() {
  const [active, setActive] = useState<string | "all">("all");
  const [selected, setSelected] = useState<EventRecord | null>(null);

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
                    <div className="relative">
                      <img
                        src={event.image}
                        alt=""
                        width={800}
                        height={500}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover"
                      />
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <div className="absolute end-0 top-0 p-3 sm:p-4">
                        <EventDateBadge dateLabel={event.dateLabel} location={event.location} />
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {category ? (
                        <p className="text-[12px] font-semibold tracking-[0.14em] text-muted-fg uppercase">
                          {category.title}
                        </p>
                      ) : null}
                      <h3 className="mt-2 text-[20px] font-bold leading-snug text-foreground">{event.title}</h3>
                      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-fg">{event.summary}</p>
                      <button
                        type="button"
                        onClick={() => setSelected(event)}
                        className="mt-6 inline-flex cursor-pointer items-center gap-2 text-[16px] font-bold text-foreground"
                      >
                        View details
                        <span aria-hidden="true" className="rtl-mirror transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </button>
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
        to="/membership"
        hash="application"
      />

      <EventDetailModal
        event={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </>
  );
}
