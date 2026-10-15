import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound, Outlet, useRouterState } from "@tanstack/react-router";
import { CalendarDays, Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { ReactElement } from "react";
import { EventCardMedia } from "@/components/EventCardMedia";
import { EventDataTable, EventExhibitsList } from "@/components/EventDataTable";
import { CmsLink } from "@/components/CmsLink";
import { SocialLinks } from "@/components/SocialLinks";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui/skeleton";
import { eventsQueryOptions } from "@/lib/queries/events";
import { eventSchema, graphSchema, seoHead } from "@/lib/seo";
import type { EventBrand } from "@/content/events";
import { useI18n } from "@/i18n";

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

function groupEventBrands(items: EventBrand[], fallbackTitle: string): { title: string; items: EventBrand[] }[] {
  const brands = items.filter((item) => item.name.trim() || item.logo);
  if (brands.length === 0) return [];

  const grouped = new Map<string, EventBrand[]>();
  const ungrouped: EventBrand[] = [];

  for (const item of brands) {
    const key = item.group?.trim() ?? "";
    if (!key) {
      ungrouped.push(item);
      continue;
    }
    const existing = grouped.get(key);
    if (existing) {
      existing.push(item);
    } else {
      grouped.set(key, [item]);
    }
  }

  const sections = [...grouped.entries()].map(([title, sectionItems]) => ({ title, items: sectionItems }));
  if (ungrouped.length > 0) {
    sections.push({ title: fallbackTitle, items: ungrouped });
  }

  return sections;
}

function EventBrandTiles({ items, fallbackLabel }: { items: EventBrand[]; fallbackLabel: string }) {
  return (
    <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {items.map((item, index) => {
        const label = item.name.trim() || fallbackLabel;
        const className =
          "group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white shadow-[0_1px_0_oklch(0.28_0.02_255_/_0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-orange/35 hover:shadow-card";
        const content = (
          <>
            <div className="relative flex min-h-[108px] w-full flex-1 items-center justify-center overflow-hidden bg-white px-5 sm:min-h-[120px]">
              {item.logo ? (
                <img
                  src={item.logo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  className="max-h-[88%] max-w-[92%] object-contain"
                />
              ) : (
                <span className="text-[20px] font-bold tracking-wide text-navy">
                  {item.name
                    .split(/\s+/)
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((part) => part[0]?.toUpperCase() ?? "")
                    .join("") || "WB"}
                </span>
              )}
            </div>
            {item.name ? (
              <div className="shrink-0 border-t border-line/80 bg-surface/60 px-3 py-2.5">
                <p className="line-clamp-2 text-center text-[12px] font-semibold leading-snug text-foreground sm:text-[13px]">
                  {item.name}
                </p>
              </div>
            ) : null}
          </>
        );

        return (
          <li key={`${item.group ?? ""}-${item.name}-${index}`} className="min-w-0">
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
  );
}

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
  const sections = groupEventBrands(items, title);
  if (sections.length === 0) return null;

  const panel =
    tone === "sponsors"
      ? "border-orange/20 bg-orange/[0.04]"
      : "border-line bg-surface/70";
  const kindLabel = tone === "sponsors" ? "Sponsor" : "Partner";
  const showGroupHeadings = sections.length > 1 || sections[0]?.title !== title;

  return (
    <section className={`mt-12 overflow-hidden rounded-card border ${panel}`}>
      <div className="relative px-5 py-6 sm:px-7 sm:py-8">
        <span className="guide-glow -end-12 -top-12 size-40 bg-orange/15" aria-hidden="true" />
        <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">{kicker}</p>
        {!showGroupHeadings ? (
          <h2 className="relative mt-2 text-[20px] font-bold text-foreground sm:text-[22px]">{title}</h2>
        ) : null}
        <div className="relative mt-6 space-y-10">
          {sections.map((section) => (
            <div key={section.title}>
              {showGroupHeadings ? (
                <div className="mb-5">
                  <span className="inline-flex rounded-full bg-navy px-3 py-1 text-[11px] font-bold tracking-[0.14em] text-white uppercase">
                    {kindLabel}
                  </span>
                  <h2 className="mt-3 text-[20px] font-bold text-foreground sm:text-[22px]">{section.title}</h2>
                </div>
              ) : null}
              <EventBrandTiles items={section.items} fallbackLabel={section.title} />
            </div>
          ))}
        </div>
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
  const { t } = useI18n();
  const { slug } = Route.useParams();
  const { data, isPending } = useQuery(eventsQueryOptions);
  const isRegister = useRouterState({
    select: (state) => state.location.pathname.replace(/\/$/, "") === `/events/${slug}/register`,
  });

  if (isRegister) return <Outlet />;

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
    registrationUrl: `/events/${event.slug}/register`,
  });

  return (
    <>
      {schema ? <JsonLd data={graphSchema([schema])} /> : null}

      <Breadcrumbs
        items={[
          { name: t("ui.home"), path: "/" },
          { name: t("nav.events"), path: "/events" },
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

            <h1 data-dynamic className="mt-4 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
              {event.title}
            </h1>
            {event.summary ? (
              <p data-dynamic className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                {event.summary}
              </p>
            ) : null}

            <div className="mt-8 overflow-hidden rounded-card border border-line">
              <EventCardMedia
                title={event.title}
                image={event.image}
                videoUrl={event.videoUrl}
                youtubeEmbedUrl={event.youtubeEmbedUrl}
                className="aspect-video"
                interactive
              />
            </div>

            <SocialLinks className="mt-6" links={event.socialLinks ?? []} />

            {event.glance && event.glance.length > 0 ? (
              <section className="mt-10 overflow-hidden rounded-card border border-line bg-surface/70">
                <div className="relative px-5 py-6 sm:px-8 sm:py-8">
                  <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
                  <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                    At a glance
                  </p>
                  <h2 className="relative mt-2 text-[24px] font-bold text-foreground sm:text-[28px]">
                    Programme snapshot
                  </h2>
                  <dl className="relative mt-6 grid gap-3 sm:grid-cols-2">
                    {event.glance.map((item, index) => (
                      <div
                        key={`${item.label}-${item.value}-${index}`}
                        className="rounded-xl border border-line bg-background px-4 py-4"
                      >
                        {item.label ? (
                          <dt className="text-[11px] font-bold tracking-[0.12em] text-muted-fg uppercase">
                            {item.label}
                          </dt>
                        ) : null}
                        <dd className={`text-[15px] font-semibold leading-snug text-foreground ${item.label ? "mt-1" : ""}`}>
                          {item.value || item.label}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            ) : null}

            {event.description ? (
              <section className="mt-10">
                <h2 className="text-[20px] font-bold text-foreground">{t("events.about")}</h2>
                <p data-dynamic className="mt-3 text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                  {event.description}
                </p>
              </section>
            ) : null}

            {event.agenda && event.agenda.rows.length > 0 ? (
              <EventDataTable kicker="Programme" title="Programs / Agenda" table={event.agenda} />
            ) : null}

            {event.participants ? (
              <EventDataTable kicker="Directory" title="Participants" table={event.participants} />
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

            {event.exhibits && event.exhibits.length > 0 ? (
              <EventExhibitsList exhibits={event.exhibits} />
            ) : null}

            {event.pricing ? (
              <EventDataTable
                kicker="Fees"
                title="Participation pricing"
                table={event.pricing}
                currency={event.pricingCurrency}
              />
            ) : null}

            {event.logistics ? (
              <section className="mt-10 overflow-hidden rounded-card border border-line bg-background">
                <div className="relative px-5 py-6 sm:px-8 sm:py-8">
                  <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
                  <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                    Practical information
                  </p>
                  <h2 className="relative mt-2 text-[24px] font-bold text-foreground sm:text-[28px]">Logistics</h2>
                  <p className="relative mt-4 max-w-3xl whitespace-pre-line text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                    {event.logistics}
                  </p>
                </div>
              </section>
            ) : null}

            <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface">
              <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="min-w-0">
                  <p className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">
                    Registration
                  </p>
                  <p className="mt-1 break-words text-[15px] font-semibold text-foreground [overflow-wrap:anywhere]">
                    {event.registrationFee || "Register to attend this event."}
                  </p>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2 self-start sm:self-center">
                  <Link
                    to="/events/$slug/register"
                    params={{ slug: event.slug }}
                    className="btn-orange"
                  >
                    Register now
                  </Link>
                  {event.registrationUrl ? (
                    <CmsLink
                      href={event.registrationUrl}
                      className="btn-base border border-line bg-background text-foreground hover:border-navy"
                    >
                      External registration
                    </CmsLink>
                  ) : null}
                </div>
              </div>
            </div>

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

            {event.contactPerson || event.contactEmail || (event.contactPhones && event.contactPhones.length > 0) ? (
              <section className="mt-10 overflow-hidden rounded-card border border-line bg-surface/70">
                <div className="relative px-5 py-6 sm:px-8 sm:py-8">
                  <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
                  <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">Get in touch</p>
                  <h2 className="relative mt-2 text-[24px] font-bold text-foreground sm:text-[28px]">Contacts</h2>
                  <dl className="relative mt-6 grid gap-3 sm:grid-cols-2">
                    {event.contactPerson ? (
                      <div className="rounded-xl border border-line bg-background px-4 py-4">
                        <dt className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-muted-fg uppercase">
                          <UserRound className="size-3.5" aria-hidden="true" />
                          Contact person
                        </dt>
                        <dd className="mt-1 text-[15px] font-semibold leading-snug text-foreground">{event.contactPerson}</dd>
                      </div>
                    ) : null}
                    {event.contactEmail ? (
                      <div className="rounded-xl border border-line bg-background px-4 py-4">
                        <dt className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-muted-fg uppercase">
                          <Mail className="size-3.5" aria-hidden="true" />
                          Email
                        </dt>
                        <dd className="mt-1 text-[15px] font-semibold leading-snug text-foreground">
                          <a href={`mailto:${event.contactEmail}`} className="underline decoration-line underline-offset-4 hover:text-navy">
                            {event.contactEmail}
                          </a>
                        </dd>
                      </div>
                    ) : null}
                    {event.contactPhones && event.contactPhones.length > 0 ? (
                      <div className="rounded-xl border border-line bg-background px-4 py-4 sm:col-span-2">
                        <dt className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.12em] text-muted-fg uppercase">
                          <Phone className="size-3.5" aria-hidden="true" />
                          Phone
                        </dt>
                        <dd className="mt-1 space-y-1 text-[15px] font-semibold leading-snug text-foreground">
                          {event.contactPhones.map((phone) => (
                            <a
                              key={phone}
                              href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                              className="block underline decoration-line underline-offset-4 hover:text-navy"
                            >
                              {phone}
                            </a>
                          ))}
                        </dd>
                      </div>
                    ) : null}
                  </dl>
                </div>
              </section>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
              <Link
                to="/events/$slug/register"
                params={{ slug: event.slug }}
                className="btn-orange"
              >
                Register now
              </Link>
              {event.buttons && event.buttons.length > 0
                ? event.buttons.map((button, index) => (
                    <CmsLink
                      key={`${button.label}-${button.url}-${index}`}
                      href={button.url}
                      className={
                        index === 0
                          ? "btn-orange"
                          : "btn-base border border-line bg-background text-foreground hover:border-navy"
                      }
                    >
                      {button.label}
                    </CmsLink>
                  ))
                : null}
              <Link
                to="/events"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                {t("ui.allEvents")}
              </Link>
              <Link
                to="/become-a-member"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                {t("link.become")}
              </Link>
            </div>
          </div>
        </div>
      </article>

      <CTASection
        title={t("cta.joinCommunity")}
        description={t("cta.joinCommunityEvent")}
        ctaLabel={t("link.become")}
        to="/become-a-member"
      />
    </>
  );
}
