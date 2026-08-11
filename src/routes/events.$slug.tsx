import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { EVENT_CATEGORIES, getEvent } from "@/content/events";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/events/$slug")({
  loader: ({ params }) => {
    const event = getEvent(params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    const title = loaderData?.event.title ?? "Event";
    return {
      meta: [
        { title: `${title} — WBC Events` },
        {
          name: "description",
          content: loaderData?.event.summary ?? "World Business Council event details.",
        },
        { property: "og:title", content: title },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: EventDetail,
});

function EventDetail() {
  const { event } = Route.useLoaderData();
  const category = EVENT_CATEGORIES.find((c) => c.id === event.categoryId);

  return (
    <>
      <section className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="bg-orange px-6 py-16 sm:px-10 lg:py-24 xl:px-20">
          <div className="mx-auto max-w-xl">
            <nav aria-label="Breadcrumb" className="intro-1 text-[14px] text-white/80">
              <ol className="flex flex-wrap items-center gap-2">
                <li>
                  <Link to="/events" className="hover:text-white">
                    Events
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="font-semibold text-white">{event.title}</li>
              </ol>
            </nav>
            {category ? (
              <p className="intro-2 mt-6 text-[12px] font-semibold tracking-[0.18em] text-white/85 uppercase">
                {category.title}
              </p>
            ) : null}
            <h1 className="intro-2 mt-4 text-[32px] leading-tight font-bold text-white sm:text-5xl">{event.title}</h1>
            <p className="intro-3 mt-6 text-[16px] leading-relaxed text-white/90">{event.summary}</p>
            <ul className="intro-4 mt-8 space-y-2 text-[15px] text-white/90">
              <li>
                <span className="font-semibold text-white">Date:</span> {event.dateLabel}
              </li>
              <li>
                <span className="font-semibold text-white">Location:</span> {event.location}
              </li>
              {event.registrationFee ? (
                <li>
                  <span className="font-semibold text-white">Registration:</span> {event.registrationFee}
                </li>
              ) : null}
            </ul>
            {event.registrationUrl ? (
              <Link to="/contact" className="intro-4 btn-orange mt-8 inline-flex">
                Register / Enquire
              </Link>
            ) : null}
          </div>
        </div>
        <div className="relative min-h-[280px] bg-navy lg:min-h-0">
          <img
            src={event.image}
            alt=""
            width={1200}
            height={900}
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div data-reveal className="rounded-card border border-line bg-background p-7 sm:p-10 transition-shadow duration-300 hover:shadow-card">
            <h2 className="text-[22px] font-bold text-foreground">About this event</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">{event.description}</p>

            {event.agenda && event.agenda.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-[18px] font-bold text-foreground">Agenda</h3>
                <ul className="mt-4 space-y-3">
                  {event.agenda.map((a) => (
                    <li key={`${a.time}-${a.title}`} className="flex gap-4 border-b border-line pb-3 text-[15px]">
                      <span className="w-20 shrink-0 font-semibold text-foreground">{a.time}</span>
                      <span className="text-muted-fg">{a.title}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {event.speakers && event.speakers.length > 0 ? (
              <div className="mt-10">
                <h3 className="text-[18px] font-bold text-foreground">Speakers</h3>
                <ul className="mt-4 space-y-3">
                  {event.speakers.map((s) => (
                    <li key={s.name}>
                      <p className="font-semibold text-foreground">{s.name}</p>
                      <p className="text-[14px] text-muted-fg">{s.role}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {event.media && event.media.length > 0 ? (
            <div data-reveal>
              <h3 className="text-[18px] font-bold text-foreground">Media</h3>
              <ul className="mt-4 space-y-4">
                {event.media.map((m) => (
                  <li key={m.url} className="overflow-hidden rounded-card border border-line transition-shadow duration-300 hover:shadow-card">
                    <img src={m.url} alt={m.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                    {m.caption ? <p className="p-3 text-[13px] text-muted-fg">{m.caption}</p> : null}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      <CTASection
        title="Join the next WBC gathering"
        description="Become a member to receive invitations and priority access to forums, missions, and networking events."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
