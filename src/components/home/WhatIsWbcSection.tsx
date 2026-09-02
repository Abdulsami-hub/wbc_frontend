import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/SectionHeading";
import { Skeleton } from "@/components/ui/skeleton";
import { whoWeAreQueryOptions } from "@/lib/queries/who-we-are";

export function WhatIsWbcSection() {
  const { data, isPending } = useQuery(whoWeAreQueryOptions);

  if (isPending) {
    return (
      <section className="border-t border-line bg-surface/30 py-16 lg:py-24">
        <div className="container-wbc">
          <Skeleton className="h-32 max-w-xl rounded-lg" />
          <div className="mt-10 grid gap-8 lg:grid-cols-2">
            <Skeleton className="h-64 rounded-lg" />
            <Skeleton className="h-64 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const { story, missionVision } = data;

  return (
    <section className="border-t border-line bg-surface/30 py-16 lg:py-24">
      <div className="container-wbc">
        <SectionHeading
          align="left"
          eyebrow="About WBC"
          title="What is WBC?"
          description="An international business support organization connecting people, ideas, and ambition across borders."
        />

        <div className="mt-10 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <div data-reveal className="flex min-h-0 flex-col">
            <div className="relative flex-1 overflow-hidden rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
              <span className="absolute start-0 top-0 h-full w-1 bg-orange" aria-hidden="true" />
              {story.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={`text-[16px] leading-[1.85] text-muted-fg sm:text-[17px] ${story.paragraphs.indexOf(paragraph) > 0 ? "mt-6" : ""}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div data-reveal data-reveal-group className="flex flex-col gap-5 sm:gap-6">
            <article className="group relative flex flex-1 flex-col overflow-hidden rounded-card bg-navy p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
              <span
                className="pointer-events-none absolute -end-12 -top-12 size-44 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <span
                className="relative inline-flex size-12 items-center justify-center rounded-md bg-white/10 text-white"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.6" />
                </svg>
              </span>
              <p className="relative mt-6 text-[12px] font-bold tracking-[0.2em] text-white/70 uppercase">
                {missionVision.visionTitle}
              </p>
              <p className="relative mt-4 flex-1 text-[16px] leading-relaxed text-white sm:text-[17px]">
                {missionVision.visionDescription}
              </p>
            </article>

            <article className="group relative flex flex-1 flex-col overflow-hidden rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-8">
              <span
                className="pointer-events-none absolute -end-12 -top-12 size-44 rounded-full bg-teal/15 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <span
                className="relative inline-flex size-12 items-center justify-center rounded-md bg-orange/10 text-foreground"
                aria-hidden="true"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="8.5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
                </svg>
              </span>
              <p className="relative mt-6 text-[12px] font-bold tracking-[0.2em] text-foreground uppercase">
                {missionVision.missionTitle}
              </p>
              <p className="relative mt-4 flex-1 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
                {missionVision.missionDescription}
              </p>
            </article>
          </div>
        </div>

        <div data-reveal className="mt-8">
          <Link to="/who-we-are" className="card-link">
            Learn more about WBC
            <span aria-hidden="true" className="card-link-arrow rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
