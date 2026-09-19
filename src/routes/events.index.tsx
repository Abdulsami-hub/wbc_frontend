import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import eventsImg from "@/assets/events.jpg";
import { CmsLink } from "@/components/CmsLink";
import { EventDataTable, EventExhibitsList } from "@/components/EventDataTable";
import { CTASection } from "@/components/CTASection";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { resolveCmsUrl } from "@/lib/cms-url";
import { eventsQueryOptions } from "@/lib/queries/events";
import { useSectionVisible } from "@/lib/queries/section-visibility";
import { seoHead } from "@/lib/seo";
import { useI18n } from "@/i18n";

function EventMetaRow({ dateLabel, location }: { dateLabel: string; location: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
      <span className="inline-flex items-center gap-2 text-[14px] font-medium text-muted-fg">
        <CalendarDays
          className="size-4 shrink-0 text-orange"
          strokeWidth={2.25}
          aria-hidden="true"
        />
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
    const title = loaderData?.hero.title ?? "Business Events";
    const description =
      loaderData?.hero.description ??
      "Summits, forums, conferences, exhibitions, networking events, trade missions, and business meetings organised by the World Business Council.";

    return seoHead({
      title,
      description,
      path: "/events",
      image: heroImage,
      preloadImage: heroImage,
    });
  },
  component: Events,
});

function EventsSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div
          className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block"
          aria-hidden="true"
        />
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

function Events() {
  const { t } = useI18n();
  const { data, isPending } = useQuery(eventsQueryOptions);
  const showListings = useSectionVisible("events", "listings");
  const navigate = useNavigate();
  const locationHash = useRouterState({
    select: (s) => (s.location.hash ?? "").replace(/^#/, ""),
  });
  const [active, setActive] = useState<string | "all">("all");
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
        tone={hero.background}
        layout={hero.layout}
        videoUrl={hero.videoUrl}
        youtubeEmbedUrl={hero.youtubeEmbedUrl}
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
        ctaHash={heroCta?.ctaHash}
      />

      {showListings ? (
      <section className="py-16 lg:py-24">
        <div className="container-wbc">
          <div data-reveal>
            <h2 className="text-[28px] font-bold text-foreground sm:text-[36px]">
              Browse by category
            </h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-muted-fg">
              Filter the programme by event type. Categories match the navigation filters used
              across the site.
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
                  {t("ui.allEvents")}
                </button>
              </li>
              {categories.map((c) => (
                <li key={c.id} id={c.id} className="scroll-mt-28">
                  <button
                    type="button"
                    onClick={() => selectCategory(c.id)}
                    aria-pressed={active === c.id}
                    data-dynamic
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
              <li className="col-span-full rounded-card border border-dashed border-line bg-background px-6 py-12 text-center sm:px-10">
                {active === "all" ? (
                  <>
                    <p className="text-[16px] font-semibold text-foreground">
                      {t("events.emptyTitle")}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">
                      {t("events.emptyBody")}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-[16px] font-semibold text-foreground">
                      {t("events.emptyCategory", {
                        name: categories.find((c) => c.id === active)?.title ?? t("menu.group.eventCategories"),
                      })}
                    </p>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted-fg">
                      {t("events.emptyCategoryBody")}
                    </p>
                  </>
                )}
              </li>
            ) : (
              filtered.map((event) => (
                <li key={event.slug} data-dynamic>
                  <Link
                    to="/events/$slug"
                    params={{ slug: event.slug }}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-card border border-line bg-background text-start transition-shadow duration-300 hover:shadow-card"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={event.image}
                        alt=""
                        width={800}
                        height={500}
                        loading="lazy"
                        decoding="async"
                        className="card-zoom-img aspect-[16/10] w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <EventMetaRow dateLabel={event.dateLabel} location={event.location} />
                      <h3 className="mt-3 text-[20px] font-bold leading-snug text-foreground transition-colors group-hover:text-navy">
                        {event.title}
                      </h3>
                      <p className="mt-3 line-clamp-3 flex-1 text-[15px] leading-relaxed text-muted-fg">
                        {event.summary}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold text-orange">
                        View details{" "}
                        <span aria-hidden="true" className="rtl-mirror">
                          →
                        </span>
                      </span>
                    </div>
                  </Link>
                </li>
              ))
            )}
          </ul>

          {data.page?.glance && data.page.glance.length > 0 ? (
            <section className="mt-16 overflow-hidden rounded-card border border-line bg-surface/70">
              <div className="relative px-5 py-6 sm:px-8 sm:py-8">
                <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
                <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                  At a glance
                </p>
                <h2 className="relative mt-2 text-[24px] font-bold text-foreground sm:text-[28px]">
                  Programme snapshot
                </h2>
                <dl className="relative mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {data.page.glance.map((item, index) => (
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

          {data.page?.logistics ? (
            <section className="mt-8 overflow-hidden rounded-card border border-line bg-background">
              <div className="relative px-5 py-6 sm:px-8 sm:py-8">
                <span className="guide-glow -end-10 -top-10 size-36 bg-orange/15" aria-hidden="true" />
                <p className="relative text-[11px] font-bold tracking-[0.16em] text-orange uppercase">
                  Practical information
                </p>
                <h2 className="relative mt-2 text-[24px] font-bold text-foreground sm:text-[28px]">Logistics</h2>
                <p className="relative mt-4 max-w-3xl whitespace-pre-line text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                  {data.page.logistics}
                </p>
              </div>
            </section>
          ) : null}

          {data.page?.pricing ? (
            <EventDataTable
              kicker="Fees"
              title="Participation pricing"
              table={data.page.pricing}
              currency={data.page.pricingCurrency}
            />
          ) : null}

          {data.page?.participants ? (
            <EventDataTable kicker="Directory" title="Participants" table={data.page.participants} />
          ) : null}

          {data.page?.exhibits && data.page.exhibits.length > 0 ? (
            <EventExhibitsList exhibits={data.page.exhibits} />
          ) : null}

          {data.page?.buttons && data.page.buttons.length > 0 ? (
            <div className="mt-10 flex flex-wrap gap-3">
              {data.page.buttons.map((button, index) => (
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
              ))}
            </div>
          ) : null}
        </div>
      </section>
      ) : null}

      <CTASection
        title={t("cta.joinCommunity")}
        description={t("cta.joinCommunityEvents")}
        ctaLabel={t("link.become")}
        to="/become-a-member"
      />
    </>
  );
}
