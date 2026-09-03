import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import eventsImg from "@/assets/events.jpg";
import { CTASection } from "@/components/CTASection";
import { SimpleModal } from "@/components/SimpleModal";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import type { EventCategory, EventRecord } from "@/content/events";
import { resolveCmsUrl } from "@/lib/cms-url";
import { eventsQueryOptions } from "@/lib/queries/events";

function EventMetaRow({
  dateLabel,
  location,
}: {
  dateLabel: string;
  location: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-fg">
        <CalendarDays className="size-4 shrink-0 text-orange" strokeWidth={2.25} aria-hidden="true" />
        {dateLabel}
      </span>
      <span className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-fg">
        <MapPin className="size-4 shrink-0 text-orange" strokeWidth={2.25} aria-hidden="true" />
        {location}
      </span>
    </div>
  );
}

export const Route = createFileRoute("/events/")({
  ssr: false,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(eventsQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    const title = loaderData?.hero.title ?? "Events — World Business Council";
    const description =
      loaderData?.hero.description ??
      "Summits, forums, conferences, exhibitions, networking events, trade missions, and business meetings organised by the World Business Council.";

    return {
      meta: [
        { title: `${title} — WBC` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: Events,
});

function EventsSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block" aria-hidden="true" />
        <div className="bg-orange lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-40 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-wbc space-y-6">
          <Skeleton className="h-10 w-72" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
            <Skeleton className="h-72 w-full" />
          </div>
        </div>
      </section>
    </>
  );
}

function resolveCta(url: string, fallback = "/contact") {
  const resolved = resolveCmsUrl(url, fallback);
  if (resolved.kind === "internal") {
    const [path, hash] = resolved.path.split("#");
    return {
      ctaTo: path || fallback,
      ctaHash: hash || undefined,
      ctaHref: undefined as string | undefined,
    };
  }
  return { ctaTo: undefined, ctaHash: undefined, ctaHref: resolved.href };
}

function EventDetailModal({
  event,
  categories,
  open,
  onOpenChange,
}: {
  event: EventRecord | null;
  categories: EventCategory[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  if (!event) return null;
  const category = categories.find((c) => c.id === event.categoryId);

  return (
    <SimpleModal
      open={open}
      onOpenChange={onOpenChange}
      title={event.title}
      description={event.summary}
      className="w-[min(960px,calc(100vw-1.5rem))] p-0"
    >
      <div className="p-6 sm:p-8 lg:p-10">
        {category ? (
          <p className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">{category.title}</p>
        ) : null}
        <div className={category ? "mt-3" : ""}>
          <EventMetaRow dateLabel={event.dateLabel} location={event.location} />
        </div>
        <h2 className="mt-3 text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">{event.title}</h2>
        <p className="mt-4 text-[15px] leading-relaxed text-muted-fg">{event.summary}</p>
        <span className="accent-rule mt-5" />

        {event.registrationFee ? (
          <dl className="mt-6">
            <div className="rounded-card border border-line bg-surface px-4 py-3">
              <dt className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">Registration</dt>
              <dd className="mt-1 text-[15px] font-semibold text-foreground">{event.registrationFee}</dd>
            </div>
          </dl>
        ) : null}

        {event.description ? (
          <div className="mt-8">
            <h3 className="text-[17px] font-bold text-foreground">About this event</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-fg">{event.description}</p>
          </div>
        ) : null}

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
              {event.media.flatMap((m) => {
                const urls = m.photos && m.photos.length > 0 ? m.photos.map((p) => p.url) : [m.url];
                return urls.filter(Boolean).map((url, i) => (
                  <li key={`${m.caption ?? "media"}-${url}-${i}`} className="group overflow-hidden rounded-card border border-line">
                    <div className="relative overflow-hidden">
                      <img
                        src={url}
                        alt={m.caption ?? ""}
                        className="card-zoom-img aspect-[4/3] w-full object-cover"
                      />
                    </div>
                    {m.caption && i === 0 ? <p className="p-2.5 text-[12px] text-muted-fg">{m.caption}</p> : null}
                  </li>
                ));
              })}
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
            to="/become-a-member"
            className="btn-base border border-line bg-background text-foreground hover:border-navy"
            onClick={() => onOpenChange(false)}
          >
            Become a Member
          </Link>
        </div>
      </div>
    </SimpleModal>
  );
}

function Events() {
  const { data, isPending } = useQuery(eventsQueryOptions);
  const navigate = useNavigate();
  const locationHash = useRouterState({
    select: (s) => (s.location.hash ?? "").replace(/^#/, ""),
  });
  const [active, setActive] = useState<string | "all">("all");
  const [selected, setSelected] = useState<EventRecord | null>(null);

  const categories = data?.categories ?? [];
  const events = data?.events ?? [];

  useEffect(() => {
    if (categories.length === 0) return;

    if (locationHash && categories.some((c) => c.id === locationHash)) {
      setActive(locationHash);
      return;
    }

    if (!locationHash) {
      setActive("all");
    }
  }, [locationHash, categories]);

  const filtered = useMemo(() => {
    if (active === "all") return events;
    return events.filter((e) => e.categoryId === active);
  }, [active, events]);

  function selectCategory(id: string | "all") {
    setActive(id);
    void navigate({
      to: "/events",
      hash: id === "all" ? "" : id,
      replace: true,
    });
  }

  if (isPending) return <EventsSkeleton />;
  if (!data) return null;

  const { hero } = data;
  const heroCta = hero.cta ? resolveCta(hero.cta.url) : null;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        image={hero.image ?? eventsImg}
        imageAlt={hero.imageAlt}
        tone="orange"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
        ctaHash={heroCta?.ctaHash}
      />

      <section className="py-16 lg:py-24">
        <div className="container-wbc">
          <div data-reveal>
            <h2 className="text-[28px] font-bold text-foreground sm:text-[36px]">Browse by category</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-fg">
              Filter the programme by event type. Categories match the navigation filters used across the site.
            </p>
          </div>

          {categories.length > 0 ? (
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
              {categories.map((c) => (
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
          ) : null}

          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.length === 0 ? (
              <li className="col-span-full rounded-card border border-line bg-background px-6 py-12 text-center text-[15px] text-muted-fg">
                No events in this category yet.
              </li>
            ) : (
              filtered.map((event) => (
                <li key={event.slug}>
                  <button
                    type="button"
                    onClick={() => setSelected(event)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-background text-start transition-shadow duration-300 hover:shadow-card"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt=""
                        className="card-zoom-img aspect-[16/10] w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <EventMetaRow dateLabel={event.dateLabel} location={event.location} />
                      <h3 className="mt-3 text-[20px] font-bold leading-snug text-foreground transition-colors group-hover:text-navy">
                        {event.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-fg">{event.summary}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-orange">
                        View details <span aria-hidden="true" className="rtl-mirror">→</span>
                      </span>
                    </div>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </section>

      <CTASection
        title="Join the WBC Community"
        description="Be the first to know about upcoming conferences, forums, and global business events."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />

      <EventDetailModal
        event={selected}
        categories={categories}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </>
  );
}
