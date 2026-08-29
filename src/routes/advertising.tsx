import { createFileRoute } from "@tanstack/react-router";
import eventsImg from "@/assets/events.jpg";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import {
  ADVERTISING_PACKAGES,
  ADVERTISING_RATES_PDF,
  ADVERTISING_RATES_PDF_FILENAME,
} from "@/content/advertising";

export const Route = createFileRoute("/advertising")({
  head: () => ({
    meta: [
      { title: "Advertising — World Business Council" },
      {
        name: "description",
        content:
          "Explore WBC advertising opportunities: events, digital features, and partnership packages.",
      },
      { property: "og:title", content: "Advertising — WBC" },
      {
        property: "og:description",
        content: "Events, digital features, and partnership packages with the WBC network.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdvertisingPage,
});

function AdvertisingPage() {
  return (
    <>
      <SplitHero
        eyebrow="Grow with WBC"
        title="Advertising"
        description="Put your brand in front of institutional and corporate decision-makers through events, digital features, and partnership packages."
        tags={["Events", "Digital", "Partnerships"]}
        image={eventsImg}
        imageAlt="Business audience at a WBC programme"
        tone="blue"
        ctaLabel="Download PDF"
        ctaHref={ADVERTISING_RATES_PDF}
        ctaDownload={ADVERTISING_RATES_PDF_FILENAME}
      />

      <section className="relative overflow-hidden border-t border-line py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -end-24 top-0 size-[320px] rounded-full bg-blue/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -start-16 bottom-0 size-[260px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="container-wbc relative">
          <div data-reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Opportunities</p>
            <h2 className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]">
              Choose how you show up with WBC
            </h2>
            <span className="accent-rule mx-auto mt-5" />
            <p className="mt-5 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              From flagship events to digital features and annual partnership packages — every option is
              built to put your brand in front of institutional and corporate decision-makers.
            </p>
          </div>

          <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-3">
            {ADVERTISING_PACKAGES.map((pkg, i) => (
              <li key={pkg.id} className="guide-card relative h-full overflow-hidden rounded-card border border-line bg-background p-6 shadow-card sm:p-7">
                <span className="guide-glow -end-10 -top-10 size-36 bg-orange/25" aria-hidden="true" />
                <span className="guide-num font-display text-[28px] font-bold tabular-nums text-blue/30">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="relative mt-4 text-[18px] font-bold text-foreground sm:text-[19px]">{pkg.title}</h3>
                <p className="relative mt-3 text-[14px] leading-relaxed text-muted-fg">{pkg.summary}</p>
                <span className="guide-accent mt-6" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-t border-line bg-surface py-16 lg:py-24">
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
              <p className="eyebrow">Rates & packages</p>
              <h2 className="mt-3 text-[24px] font-bold text-foreground sm:text-[28px]">
                Download the advertising PDF
              </h2>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-muted-fg sm:text-[16px]">
                Full pricing, inclusions, and booking details are in the PDF.
              </p>
            </div>
            <a
              href={ADVERTISING_RATES_PDF}
              download={ADVERTISING_RATES_PDF_FILENAME}
              className="btn-orange-to-outline mt-6 !min-h-9 !rounded-md !px-4 !text-[12px] lg:mt-0 lg:shrink-0"
            >
              Download PDF
            </a>
          </div>
        </div>
      </section>

      <CTASection
        title="Put your brand in front of the WBC network"
        description="Events, digital features, and partnership packages designed for institutional reach and lasting visibility."
        ctaLabel="Contact WBC"
        to="/contact"
      />
    </>
  );
}
