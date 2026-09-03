import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui/skeleton";
import { eventsQueryOptions } from "@/lib/queries/events";
import { eventSchema, graphSchema, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ context: { queryClient }, params }) => {
    const data = await queryClient.ensureQueryData(eventsQueryOptions);
    const event = data.events.find((item) => item.slug === params.slug);
    if (!event) throw notFound();
    return { event, categories: data.categories };
  },
  head: ({ loaderData, params }) => {
    const event = loaderData?.event;
    if (!event) {
      return seoHead({
        title: "Event Not Found",
        path: `/events/${params.slug}`,
        noindex: true,
      });
    }
    return seoHead({
      title: event.title,
      description: event.summary || event.description,
      path: `/events/${event.slug}`,
      image: event.image,
      preloadImage: event.image,
    });
  },
  component: EventDetailPage,
});

function EventDetailSkeleton() {
  return (
    <div className="container-wbc py-10">
      <Skeleton className="h-5 w-40" />
      <Skeleton className="mt-6 h-10 max-w-2xl" />
      <Skeleton className="mt-4 h-24 max-w-3xl" />
      <Skeleton className="mt-8 aspect-[16/9] w-full max-w-4xl" />
    </div>
  );
}

function EventDetailPage() {
  const { slug } = Route.useParams();
  const { data, isPending } = useQuery(eventsQueryOptions);

  if (isPending) return <EventDetailSkeleton />;

  const event = data?.events.find((item) => item.slug === slug);
  if (!event) throw notFound();

  const category = data?.categories.find((c) => c.id === event.categoryId);
  const path = `/events/${event.slug}`;
  const schema = eventSchema({
    name: event.title,
    description: event.summary || event.description,
    path,
    image: event.image,
    startDate: event.dateLabel,
    locationName: event.location,
    registrationUrl: event.registrationUrl,
  });

  return (
    <>
      {schema ? <JsonLd data={graphSchema([schema])} /> : null}

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Events", path: "/events" },
          { name: event.title, path },
        ]}
      />

      <article className="pb-10">
        <div className="container-wbc py-8 lg:py-12">
          <div className="mx-auto max-w-4xl">
            {category ? (
              <p className="text-[12px] font-bold tracking-[0.16em] text-muted-fg uppercase">
                {category.title}
              </p>
            ) : null}

            <div
              className={`flex flex-wrap gap-4 text-[14px] text-muted-fg ${category ? "mt-3" : ""}`}
            >
              {event.dateLabel ? (
                <p className="inline-flex items-center gap-2">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  <span>{event.dateLabel}</span>
                </p>
              ) : null}
              {event.location ? (
                <p className="inline-flex items-center gap-2">
                  <MapPin className="size-4" aria-hidden="true" />
                  <span>{event.location}</span>
                </p>
              ) : null}
            </div>

            <h1 className="mt-4 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              {event.title}
            </h1>
            {event.summary ? (
              <p className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                {event.summary}
              </p>
            ) : null}

            <div className="mt-8 overflow-hidden rounded-card border border-line">
              <img
                src={event.image}
                alt=""
                width={1200}
                height={675}
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
            </div>

            {event.registrationFee ? (
              <dl className="mt-8">
                <div className="rounded-card border border-line bg-surface px-4 py-3">
                  <dt className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">
                    Registration
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-foreground">
                    {event.registrationFee}
                  </dd>
                </div>
              </dl>
            ) : null}

            {event.description ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">About this event</h2>
                <p className="mt-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                  {event.description}
                </p>
              </section>
            ) : null}

            {event.agenda && event.agenda.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">Agenda</h2>
                <ul className="mt-4 space-y-3">
                  {event.agenda.map((a) => (
                    <li
                      key={`${a.time}-${a.title}`}
                      className="flex gap-4 border-b border-line pb-3 text-[14px]"
                    >
                      <span className="w-16 shrink-0 font-semibold text-foreground sm:w-20">
                        {a.time}
                      </span>
                      <span className="text-muted-fg">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {event.speakers && event.speakers.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">Speakers</h2>
                <ul className="mt-4 space-y-3">
                  {event.speakers.map((s) => (
                    <li key={s.name}>
                      <p className="font-semibold text-foreground">{s.name}</p>
                      <p className="text-[13px] text-muted-fg">{s.role}</p>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {event.media && event.media.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">Media</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {event.media.flatMap((m) => {
                    const urls =
                      m.photos && m.photos.length > 0 ? m.photos.map((p) => p.url) : [m.url];
                    return urls.filter(Boolean).map((url, i) => (
                      <li
                        key={`${m.caption ?? "media"}-${url}-${i}`}
                        className="overflow-hidden rounded-card border border-line"
                      >
                        <img
                          src={url}
                          alt={m.caption ?? ""}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/3] w-full object-cover"
                        />
                        {m.caption && i === 0 ? (
                          <p className="p-2.5 text-[12px] text-muted-fg">{m.caption}</p>
                        ) : null}
                      </li>
                    ));
                  })}
                </ul>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
              <Link to="/contact" className="btn-orange">
                Register / Enquire
              </Link>
              <Link
                to="/events"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                All events
              </Link>
              <Link
                to="/become-a-member"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                Become a Member
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CTASection
        title="Join the WBC Community"
        description="Become a member to access events, programmes, and international business connections."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
