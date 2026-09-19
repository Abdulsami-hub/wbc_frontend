import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CmsLink } from "@/components/CmsLink";
import { Skeleton } from "@/components/ui/skeleton";
import {
  footerCarouselQueryOptions,
  type FooterCarouselItem,
} from "@/lib/queries/advertising-footer";

const AUTO_MS = 5000;
const ENQUIRE_HREF = "/advertising";

function FooterCarouselSkeleton() {
  return (
    <section className="relative isolate border-t border-line bg-surface px-5 py-10 sm:px-8 sm:py-12 lg:py-16">
      <div className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-card border border-line bg-background shadow-card">
        <div className="grid lg:grid-cols-2">
          <Skeleton className="aspect-video rounded-none" />
          <Skeleton className="hidden min-h-[280px] rounded-none lg:block" />
        </div>
      </div>
    </section>
  );
}

function FooterCarousel({ items }: { items: FooterCarouselItem[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: items.length > 1, align: "start" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
    setIndex(0);
  }, [emblaApi, items]);

  useEffect(() => {
    if (!emblaApi || items.length <= 1) return;

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      emblaApi.scrollNext();
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [emblaApi, items.length]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section
      id="advertising"
      className="relative isolate border-t border-line bg-surface px-5 py-10 sm:px-8 sm:py-12 lg:py-16"
      aria-roledescription="carousel"
      aria-label="Advertising opportunities"
    >
      <div
        className="relative mx-auto w-full max-w-[1280px] overflow-hidden rounded-card border border-line bg-background shadow-card"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusCapture={pause}
        onBlurCapture={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) resume();
        }}
      >
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-video overflow-hidden bg-navy-deep">
            {items.map((o, i) => (
              <div
                key={o.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  i === index
                    ? "z-[1] scale-100 opacity-100"
                    : "pointer-events-none z-0 scale-[1.06] opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                {o.buttonUrl ? (
                  <CmsLink href={o.buttonUrl} className="absolute inset-0 block">
                    <img
                      src={o.image}
                      alt={i === index ? o.alt : ""}
                      width={1400}
                      height={900}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 size-full object-cover object-left"
                    />
                    <span className="sr-only">Visit {o.title}</span>
                  </CmsLink>
                ) : (
                  <img
                    src={o.image}
                    alt={i === index ? o.alt : ""}
                    width={1400}
                    height={900}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="absolute inset-0 size-full object-cover object-left"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="relative flex flex-col justify-center border-line px-6 py-7 sm:px-10 lg:aspect-video lg:overflow-hidden lg:border-s lg:px-10 lg:py-6 xl:px-12">
            {items.length > 1 ? (
              <div className="mb-4 flex justify-end lg:mb-5">
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollPrev()}
                    className="flex size-10 items-center justify-center border border-line bg-background text-foreground transition-colors hover:border-navy hover:bg-navy hover:text-white"
                    aria-label="Previous opportunity"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => emblaApi?.scrollNext()}
                    className="flex size-10 items-center justify-center border border-line bg-background text-foreground transition-colors hover:border-navy hover:bg-navy hover:text-white"
                    aria-label="Next opportunity"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            ) : null}

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {items.map((o, i) => (
                  <div
                    key={o.id}
                    className="min-w-0 shrink-0 grow-0 basis-full"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${items.length}`}
                  >
                    <article className="pe-2" data-dynamic>
                      {o.kicker ? (
                        <p className="text-[12px] font-bold tracking-[0.18em] text-blue uppercase">
                          {o.kicker}
                        </p>
                      ) : null}
                      <h3 className={`${o.kicker ? "mt-1.5" : ""} text-[20px] font-bold tracking-tight text-foreground sm:text-[24px]`}>
                        {o.title}
                      </h3>
                      {o.body ? (
                        <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-muted-fg sm:text-[15px]">
                          {o.body}
                        </p>
                      ) : null}
                    </article>
                  </div>
                ))}
              </div>
            </div>

            {items.length > 1 ? (
              <div className="mt-5 flex items-center gap-3 lg:mt-6">
                {items.map((o, i) => (
                  <button
                    key={o.id}
                    type="button"
                    onClick={() => emblaApi?.scrollTo(i)}
                    className={`h-1 flex-1 transition-colors ${i === index ? "bg-orange" : "bg-line hover:bg-navy/30"}`}
                    aria-label={`Go to ${o.title}`}
                  />
                ))}
              </div>
            ) : null}

            <div className="mt-5 lg:mt-6">
              <CmsLink
                href={ENQUIRE_HREF}
                className="btn-orange-to-outline !min-h-9 !rounded-md !px-4 !text-[12px]"
              >
                {items[index]?.buttonLabel ?? "Enquire about advertising"}
              </CmsLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AdvertisingOpportunities() {
  const { data: items, isPending, isError } = useQuery(footerCarouselQueryOptions);

  if (isPending) return <FooterCarouselSkeleton />;
  if (isError || !items?.length) return null;

  return <FooterCarousel items={items} />;
}
