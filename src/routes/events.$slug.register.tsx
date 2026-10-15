import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { EventRegistrationForm } from "@/components/EventRegistrationForm";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { eventsQueryOptions } from "@/lib/queries/events";
import { seoHead } from "@/lib/seo";
import { useI18n } from "@/i18n";

export const Route = createFileRoute("/events/$slug/register")({
  loader: async ({ context: { queryClient }, params }) => {
    const data = await queryClient.ensureQueryData(eventsQueryOptions);
    const event = data.events.find((item) => item.slug === params.slug);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData, params }) => {
    const event = loaderData?.event;
    if (!event) {
      return seoHead({
        title: "Register",
        path: `/events/${params.slug}/register`,
        noindex: true,
      });
    }
    return seoHead({
      title: `Register — ${event.title}`,
      description: `Register for ${event.title}.`,
      path: `/events/${event.slug}/register`,
    });
  },
  component: EventRegisterPage,
});

function EventRegisterPage() {
  const { t } = useI18n();
  const { slug } = Route.useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { data } = useQuery(eventsQueryOptions);
  const loaderEvent = Route.useLoaderData().event;
  const event = data?.events.find((item) => item.slug === slug) ?? loaderEvent;

  return (
    <>
      <Breadcrumbs
        items={[
          { name: t("ui.home"), path: "/" },
          { name: t("nav.events"), path: "/events" },
          { name: event.title, path: `/events/${event.slug}` },
          { name: "Register", path: `/events/${event.slug}/register` },
        ]}
      />
      <section className="relative overflow-hidden bg-surface py-16 lg:py-24">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-navy/[0.04] to-transparent"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div className="mx-auto max-w-4xl">
            <div className="mb-10 text-center sm:mb-12">
              <p className="eyebrow">Registration</p>
              <h1
                data-dynamic
                className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]"
              >
                {event.title}
              </h1>
              <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-fg">
                Complete the form to register. Fields marked with * are required.
              </p>
              <span className="accent-rule mx-auto mt-6" />
            </div>

            <div className="relative overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-8 lg:p-10">
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange via-orange/60 to-transparent"
                aria-hidden="true"
              />
              <EventRegistrationForm slug={event.slug} eventTitle={event.title} />
            </div>

            <p className="mt-8 text-center text-[15px]">
              <Link
                to="/events/$slug"
                params={{ slug: event.slug }}
                className="font-semibold text-navy underline-offset-4 hover:underline"
              >
                Back to event
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
