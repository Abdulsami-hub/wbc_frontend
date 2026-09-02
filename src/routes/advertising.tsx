import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import eventsImg from "@/assets/events.jpg";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import { advertisingQueryOptions } from "@/lib/queries/advertising";

export const Route = createFileRoute("/advertising")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(advertisingQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    return {
      meta: [
        { title: "Advertising — World Business Council" },
        {
          name: "description",
          content:
            "Advertise with WBC through video or poster/banner placements in the website footer. Reach an international business audience and promote your products, services, events and initiatives.",
        },
        { property: "og:title", content: "Advertising — WBC" },
        {
          property: "og:description",
          content:
            "WBC website advertising: video and poster/banner formats for businesses, organizations and institutions.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: AdvertisingPage,
});

function AdvertisingPageSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="grid lg:grid-cols-2">
          <Skeleton className="min-h-[420px] rounded-none bg-navy/90" />
          <Skeleton className="hidden min-h-[420px] rounded-none lg:block" />
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <Skeleton className="mx-auto h-48 max-w-3xl rounded-lg" />
        </div>
      </section>
    </>
  );
}

function AdvertisingPage() {
  const { data, isPending, isError } = useQuery(advertisingQueryOptions);

  if (isPending) return <AdvertisingPageSkeleton />;
  if (isError || !data) return null;

  const { hero, overview, formats, pdf } = data;

  return (
    <>
      <SplitHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        tags={hero.tags}
        image={hero.image ?? eventsImg}
        imageAlt={hero.imageAlt}
        tone="blue"
        ctaLabel={pdf.buttonLabel}
        ctaHref={pdf.fileUrl}
        ctaDownload={pdf.fileName}
      />

      <section className="relative overflow-hidden py-14 lg:py-20">
        <div
          className="pointer-events-none absolute -end-24 top-0 size-[320px] rounded-full bg-blue/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="mx-auto max-w-3xl text-center">
            <p className="eyebrow">{overview.kicker}</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
              {overview.title}
            </h2>
            <span className="accent-rule mx-auto mt-6" />
            <p className="mt-8 text-[16px] leading-[1.85] text-muted-fg sm:text-[17px]">
              {overview.description}
            </p>
          </div>
        </div>
      </section>

      {formats.length > 0 ? (
        <section className="relative overflow-hidden border-t border-line bg-surface/50 py-14 lg:py-20">
          <div
            className="pointer-events-none absolute -start-16 bottom-0 size-[260px] rounded-full bg-orange/10 blur-3xl"
            aria-hidden="true"
          />
          <div className="container-wbc relative">
            <div data-reveal className="max-w-2xl">
              <p className="eyebrow">What Can You Advertise?</p>
              <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px]">
                Two main advertising formats
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
                WBC offers flexible formats to showcase your business, products, services, events or
                campaigns.
              </p>
              <span className="accent-rule mt-6" />
            </div>

            <ul data-reveal data-reveal-group className="mt-12 grid gap-6 lg:grid-cols-2">
              {formats.map((format, i) => (
                <li key={format.id}>
                  <article className="group guide-card flex h-full flex-col border border-line bg-background p-7 sm:p-8">
                    <span
                      className="guide-glow -end-10 -top-10 size-32 bg-blue/20"
                      aria-hidden="true"
                    />
                    <span className="guide-num relative font-display text-[13px] font-bold tabular-nums text-blue/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="relative mt-4 text-[22px] font-bold text-foreground transition-colors duration-300 group-hover:text-navy">
                      {format.title}
                    </h3>
                    <p className="relative mt-4 flex-1 text-[16px] leading-relaxed text-muted-fg">
                      {format.summary}
                    </p>
                    <span className="guide-accent relative mt-6" aria-hidden="true" />
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="relative isolate overflow-hidden border-t border-line bg-surface py-14 lg:py-20">
        <div
          className="pointer-events-none absolute start-1/2 top-20 size-[420px] -translate-x-1/2 rounded-full bg-blue/8 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div
            data-reveal
            className="group relative overflow-hidden rounded-card border border-line bg-background p-8 shadow-card sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-12"
          >
            <span
              className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-40 bg-gradient-to-r from-orange via-blue to-transparent transition-transform duration-700 group-hover:scale-x-100"
              aria-hidden="true"
            />
            <div>
              <p className="eyebrow">{pdf.kicker}</p>
              <h2 className="mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                {pdf.title}
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                {pdf.description}
              </p>
            </div>
            <a
              href={pdf.fileUrl}
              download={pdf.fileName}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange-to-outline mt-6 !min-h-9 !rounded-md !px-4 !text-[12px] lg:mt-0 lg:shrink-0"
            >
              {pdf.buttonLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
