import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import eventsImg from "@/assets/events.jpg";
import forumImg from "@/assets/news-forum.jpg";
import membershipImg from "@/assets/membership.jpg";
import {
  ADVERTISING_ESSENTIALS,
  ADVERTISING_PACKAGES,
  ADVERTISING_PROCESS,
} from "@/content/advertising";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const OPPORTUNITIES = [
  {
    title: "Event sponsorship",
    body: "Position your brand beside summits, forums, and trade programmes attended by institutional and corporate leaders.",
    kicker: "Visibility",
    image: eventsImg,
    alt: "Business audience at a WBC sponsored programme",
  },
  {
    title: "Digital & print features",
    body: "Reach members and partners through newsletters, web features, and campaign placements across the WBC network.",
    kicker: "Reach",
    image: forumImg,
    alt: "International business forum stage and audience",
  },
  {
    title: "Partnership packages",
    body: "Build multi-touch visibility with tailored packages spanning events, content, and network introductions.",
    kicker: "Growth",
    image: membershipImg,
    alt: "Professionals collaborating in a WBC partnership setting",
  },
] as const;

const AUTO_MS = 5000;

function AdvertisingDetailsModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
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
        <div className="border-b border-line bg-surface px-6 py-6 sm:px-8 sm:py-8">
          <DialogHeader className="text-start">
            <DialogTitle className="text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">
              Advertising & Sponsorship Details
            </DialogTitle>
            <DialogDescription className="mt-3 max-w-2xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
              Explore pricing, inclusions, and booking information for WBC advertising opportunities. All rates are
              indicative — our team will tailor a proposal to your goals and timeline.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="space-y-10 px-6 py-8 sm:px-8">
          {ADVERTISING_PACKAGES.map((pkg) => (
            <section key={pkg.id}>
              <h3 className="text-[20px] font-bold text-foreground sm:text-[22px]">{pkg.title}</h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-muted-fg">{pkg.summary}</p>

              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                {pkg.tiers.map((tier) => (
                  <article
                    key={tier.name}
                    className="rounded-card border border-line bg-background p-5 shadow-card sm:p-6"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <h4 className="text-[17px] font-bold text-foreground">{tier.name}</h4>
                      <p className="text-end">
                        <span className="block text-[20px] font-bold text-orange">{tier.price}</span>
                        <span className="text-[12px] font-semibold tracking-[0.06em] text-muted-fg uppercase">
                          {tier.period}
                        </span>
                      </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                      {tier.includes.map((item) => (
                        <li key={item} className="flex gap-2.5 text-[14px] leading-snug text-muted-fg">
                          <svg
                            className="mt-0.5 size-4 shrink-0 text-teal"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            aria-hidden="true"
                          >
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>

              {pkg.notes?.map((note) => (
                <p key={note} className="mt-4 text-[13px] leading-relaxed text-muted-fg">
                  {note}
                </p>
              ))}
            </section>
          ))}

          <section className="rounded-card border border-line bg-surface p-6 sm:p-8">
            <h3 className="text-[20px] font-bold text-foreground">Good to know</h3>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {ADVERTISING_ESSENTIALS.map((item) => (
                <div key={item.label} className="rounded-card border border-line bg-background px-4 py-3.5">
                  <dt className="text-[11px] font-bold tracking-[0.14em] text-muted-fg uppercase">{item.label}</dt>
                  <dd className="mt-1.5 text-[14px] leading-relaxed text-foreground">{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h3 className="text-[20px] font-bold text-foreground">How booking works</h3>
            <ol className="mt-6 grid gap-4 md:grid-cols-3">
              {ADVERTISING_PROCESS.map((step) => (
                <li key={step.step}>
                  <article className="h-full rounded-card border border-line bg-background p-5">
                    <span className="font-display text-[13px] font-bold tabular-nums text-orange">{step.step}</span>
                    <h4 className="mt-3 text-[16px] font-bold text-foreground">{step.title}</h4>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted-fg">{step.body}</p>
                  </article>
                </li>
              ))}
            </ol>
          </section>
        </div>

        <div className="sticky bottom-0 flex flex-wrap gap-3 border-t border-line bg-background px-6 py-5 sm:px-8">
          <Link to="/contact" className="btn-navy !rounded-md uppercase tracking-[0.06em]" onClick={() => onOpenChange(false)}>
            Request a proposal
          </Link>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="btn-base border border-line bg-background text-foreground hover:border-navy"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AdvertisingOpportunities() {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
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

    const id = window.setInterval(() => {
      if (pausedRef.current) return;
      emblaApi.scrollNext();
    }, AUTO_MS);

    return () => window.clearInterval(id);
  }, [emblaApi]);

  const pause = () => setPaused(true);
  const resume = () => setPaused(false);

  return (
    <section
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
        <div className="grid lg:grid-cols-2 lg:items-stretch">
          <div className="relative min-h-[280px] overflow-hidden bg-navy-deep sm:min-h-[340px] lg:min-h-[460px]">
            {OPPORTUNITIES.map((o, i) => (
              <div
                key={o.title}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  i === index
                    ? "z-[1] scale-100 opacity-100"
                    : "pointer-events-none z-0 scale-[1.06] opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <img
                  src={o.image}
                  alt={i === index ? o.alt : ""}
                  width={1400}
                  height={900}
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="absolute inset-0 size-full object-cover object-left"
                />
              </div>
            ))}
            <div
              className="absolute inset-0 z-[2] bg-gradient-to-t from-navy-deep via-navy-deep/55 to-navy/25 lg:bg-gradient-to-r lg:from-navy-deep/90 lg:via-navy-deep/40 lg:to-transparent rtl:lg:bg-gradient-to-l"
              aria-hidden="true"
            />
            <div className="relative z-[3] flex h-full flex-col justify-end p-8 sm:p-10 lg:p-12">
              <p className="text-[12px] font-semibold tracking-[0.2em] text-white/75 uppercase">Grow with WBC</p>
              <h2 className="mt-3 max-w-md text-[30px] font-bold leading-tight text-white sm:text-[38px] lg:text-[42px]">
                Advertising Opportunities
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/85 sm:text-[16px]">
                Connect your organisation with decision-makers through sponsorships, features, and partnership packages.
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center border-line px-6 py-10 sm:px-10 lg:border-s lg:px-12 lg:py-14">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold tracking-[0.18em] text-muted-fg uppercase">Ways to partner</p>
                <p className="mt-2 text-[15px] text-muted-fg">
                  <span className="font-bold text-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="mx-2 text-line">/</span>
                  <span className="tabular-nums">{String(OPPORTUNITIES.length).padStart(2, "0")}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  className="flex size-11 items-center justify-center border border-line bg-background text-foreground transition-colors hover:border-navy hover:bg-navy hover:text-white"
                  aria-label="Previous opportunity"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  className="flex size-11 items-center justify-center border border-line bg-background text-foreground transition-colors hover:border-navy hover:bg-navy hover:text-white"
                  aria-label="Next opportunity"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div ref={emblaRef} className="overflow-hidden">
              <div className="flex">
                {OPPORTUNITIES.map((o, i) => (
                  <div
                    key={o.title}
                    className="min-w-0 shrink-0 grow-0 basis-full"
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${OPPORTUNITIES.length}`}
                  >
                    <article className="pe-2">
                      <span className="font-display text-[56px] leading-none font-bold text-orange/25 tabular-nums sm:text-[72px]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-4 text-[12px] font-bold tracking-[0.18em] text-orange uppercase">{o.kicker}</p>
                      <h3 className="mt-2 text-[24px] font-bold tracking-tight text-foreground sm:text-[28px]">{o.title}</h3>
                      <p className="mt-4 max-w-lg text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">{o.body}</p>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 flex items-center gap-3">
              {OPPORTUNITIES.map((o, i) => (
                <button
                  key={o.title}
                  type="button"
                  onClick={() => emblaApi?.scrollTo(i)}
                  className={`h-1 flex-1 transition-colors ${i === index ? "bg-orange" : "bg-line hover:bg-navy/30"}`}
                  aria-label={`Go to ${o.title}`}
                />
              ))}
            </div>

            <div className="mt-10">
              <button
                type="button"
                onClick={() => setDetailsOpen(true)}
                className="btn-navy !rounded-md uppercase tracking-[0.06em]"
              >
                Enquire about advertising
              </button>
            </div>
          </div>
        </div>
      </div>

      <AdvertisingDetailsModal open={detailsOpen} onOpenChange={setDetailsOpen} />
    </section>
  );
}
