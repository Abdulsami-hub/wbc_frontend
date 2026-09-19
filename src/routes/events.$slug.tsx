import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import type { ReactElement } from "react";
import { EventDataTable } from "@/components/EventDataTable";
import { SocialLinks } from "@/components/SocialLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui/skeleton";
import { eventsQueryOptions } from "@/lib/queries/events";
import { eventSchema, graphSchema, seoHead } from "@/lib/seo";
import type { EventBrand } from "@/content/events";

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

function EventBrandGrid({
  kicker,
  title,
  items,
  tone = "partners",
}: {
  kicker: string;
  title: string;
  items: EventBrand[];
  tone?: "partners" | "sponsors";
}) {
  const brands = items.filter((item) => item.name.trim() || item.logo);
  if (brands.length === 0) return null;

  const panel =
    tone === "sponsors"
      ? "border-orange/20 bg-orange/[0.04]"
      : "border-line bg-surface/70";

  return (
    <section className={`mt-12 overflow-hidden rounded-card border ${panel}`}>
      <div className="relative px-5 py-6 sm:px-7 sm:py-8">
        <span className="guide-glow -end-12 -top-12 size-40 bg-orange/15" aria-hidden="true" />
        <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">{kicker}</p>
        <h2 className="relative mt-2 text-[20px] font-bold text-foreground sm:text-[22px]">{title}</h2>
        <ul className="relative mt-6 grid gap-4 [grid-template-columns:repeat(auto-fill,minmax(11.5rem,1fr))]">
          {brands.map((item, index) => {
            const label = item.name.trim() || title;
            const className =
              "group relative flex min-h-[148px] flex-col overflow-hidden rounded-card border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-card";
            const content = (
              <>
                <div className="flex min-h-[100px] flex-1 items-center justify-center px-5 py-5">
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="max-h-16 max-w-full object-contain sm:max-h-[4.5rem]"
                    />
                  ) : (
                    <span className="flex size-12 items-center justify-center rounded-md border border-line bg-surface text-[14px] font-bold text-navy">
                      {item.name
                        .split(/\s+/)
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((part) => part[0]?.toUpperCase() ?? "")
                        .join("") || "—"}
                    </span>
                  )}
                </div>
                {item.name ? (
                  <p className="line-clamp-2 shrink-0 border-t border-line/80 bg-surface/80 px-3 py-2.5 text-center text-[13px] font-semibold leading-snug text-navy">
                    {item.name}
                  </p>
                ) : null}
              </>
            );

            return (
              <li key={`${item.name}-${index}`}>
                {item.href ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    aria-label={label}
                    title={label}
                  >
                    {content}
                  </a>
                ) : (
                  <div className={className} title={label}>
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

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

            <SocialLinks className="mt-6" links={event.socialLinks ?? []} />

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

            {event.agenda && event.agenda.rows.length > 0 ? (
              <EventDataTable kicker="Programme" title="Programs / Agenda" table={event.agenda} />
            ) : null}

            {event.speakers && event.speakers.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">Speakers</h2>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {event.speakers.map((speaker, index) => {
                    const initials = speaker.name
                      .split(/\s+/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((part) => part[0]?.toUpperCase() ?? "")
                      .join("");

                    return (
                      <li key={`${speaker.name}-${index}`}>
                        <article className="group relative overflow-hidden rounded-card border border-line bg-background transition-all duration-300 hover:-translate-y-1 hover:border-orange/35 hover:shadow-card">
                          <span className="absolute start-0 top-0 h-full w-1 bg-orange" aria-hidden="true" />
                          <span className="guide-glow -end-8 -top-8 size-28 bg-orange/20" aria-hidden="true" />
                          <div className="relative aspect-[4/5] overflow-hidden bg-surface">
                            {speaker.image ? (
                              <img
                                src={speaker.image}
                                alt=""
                                loading="lazy"
                                decoding="async"
                                className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                              />
                            ) : (
                              <div className="flex size-full items-center justify-center bg-orange/10 text-[28px] font-bold tracking-wide text-orange">
                                {initials || "—"}
                              </div>
                            )}
                          </div>
                          <div className="relative px-4 py-4">
                            {speaker.name ? (
                              <h3 className="text-[16px] font-bold leading-snug text-foreground">{speaker.name}</h3>
                            ) : null}
                            {speaker.role ? (
                              <p className="mt-1 text-[13px] leading-relaxed text-muted-fg">{speaker.role}</p>
                            ) : null}
                          </div>
                        </article>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            <EventBrandGrid
              kicker="Event partners"
              title="Partners"
              items={event.partners ?? []}
              tone="partners"
            />
            <EventBrandGrid
              kicker="Event sponsors"
              title="Sponsors"
              items={event.sponsors ?? []}
              tone="sponsors"
            />

            {event.media && event.media.length > 0 ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">Media</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {event.media.flatMap((m, mediaIndex) => {
                    const items: ReactElement[] = [];
                    if (m.youtubeEmbedUrl) {
                      items.push(
                        <li
                          key={`${m.caption ?? "youtube"}-${mediaIndex}`}
                          className="overflow-hidden rounded-card border border-line sm:col-span-2"
                        >
                          <div className="aspect-video w-full bg-navy">
                            <iframe
                              src={m.youtubeEmbedUrl}
                              title={m.caption || event.title}
                              className="size-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          </div>
                          {m.caption ? (
                            <p className="p-2.5 text-[12px] text-muted-fg">{m.caption}</p>
                          ) : null}
                        </li>,
                      );
                    } else if (m.videoUrl) {
                      items.push(
                        <li
                          key={`${m.caption ?? "video"}-${mediaIndex}`}
                          className="overflow-hidden rounded-card border border-line sm:col-span-2"
                        >
                          <video
                            className="aspect-video w-full bg-navy"
                            src={m.videoUrl}
                            controls
                            playsInline
                            preload="metadata"
                          >
                            <track kind="captions" />
                          </video>
                          {m.caption ? (
                            <p className="p-2.5 text-[12px] text-muted-fg">{m.caption}</p>
                          ) : null}
                        </li>,
                      );
                    }
                    const urls =
                      m.photos && m.photos.length > 0
                        ? m.photos.map((p) => p.url)
                        : m.url
                          ? [m.url]
                          : [];
                    urls.forEach((url, i) => {
                      items.push(
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
                          {m.caption && i === 0 && !m.youtubeEmbedUrl && !m.videoUrl ? (
                            <p className="p-2.5 text-[12px] text-muted-fg">{m.caption}</p>
                          ) : null}
                        </li>,
                      );
                    });
                    return items;
                  })}
                </ul>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
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
