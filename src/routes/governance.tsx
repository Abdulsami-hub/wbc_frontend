import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroImg from "@/assets/gov-hero.png";
import { CmsLink } from "@/components/CmsLink";
import { Skeleton } from "@/components/ui/skeleton";
import type { GovernanceGroupIcon } from "@/content/governance";
import { governanceQueryOptions } from "@/lib/queries/governance";

export const Route = createFileRoute("/governance")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(governanceQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    return {
      meta: [
        { title: "Governance — Structure, Oversight & Accountability | WBC" },
        {
          name: "description",
          content:
            "How the World Business Council is governed: General Assembly, Board of Directors, Honorary Board, Staff Members, and Committees & Working Groups.",
        },
        { property: "og:title", content: "Governance that protects trust and drives coordinated action — WBC" },
        {
          property: "og:description",
          content:
            "WBC governance structure: General Assembly, Board of Directors, Honorary Board, Staff Members, and Committees & Working Groups.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: Governance,
});

function BodyIcon({ icon }: { icon: GovernanceGroupIcon }) {
  return (
    <span className="inline-flex size-12 shrink-0 items-center justify-center border border-line text-foreground">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        {icon === "user" && (
          <>
            <circle cx="12" cy="8" r="3.2" />
            <path d="M5 20c0-3.6 3.1-6 7-6s7 2.4 7 6" />
          </>
        )}
        {icon === "lines" && <path d="M4 8h16M4 12h11M4 16h7" />}
        {icon === "shield" && <path d="M12 3l7 3.5v5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5v-5L12 3z" />}
      </svg>
    </span>
  );
}

function GovernanceHeroSkeleton() {
  return (
    <section className="relative flex flex-col">
      <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block" aria-hidden="true" />
      <div className="bg-teal lg:bg-transparent">
        <div className="container-wbc py-16 lg:py-24">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
          <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
        </div>
      </div>
      <div className="hero-media-right bg-navy">
        <Skeleton className="absolute inset-0 size-full bg-white/10" />
      </div>
    </section>
  );
}

function Governance() {
  const { data, isPending } = useQuery(governanceQueryOptions);
  const [open, setOpen] = useState<number>(0);

  if (isPending) {
    return (
      <>
        <GovernanceHeroSkeleton />
        <section className="py-14 lg:py-20">
          <div className="container-wbc">
            <Skeleton className="h-96 rounded-lg" />
          </div>
        </section>
      </>
    );
  }

  if (!data) return null;

  const { hero, structure, groups, faqs } = data;
  const heroImage = hero.image ?? heroImg;

  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-teal lg:block" aria-hidden="true" />
        <div className="bg-teal lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <div className="max-w-xl">
              <p className="intro-1 hero-kicker">{hero.kicker}</p>
              <h1 className="intro-2 mt-6 text-[34px] leading-[1.05] font-bold text-white sm:text-5xl lg:text-[56px]">
                {hero.title}
              </h1>
              <p className="intro-3 mt-6 max-w-lg text-[16px] leading-relaxed text-white/90">
                {hero.description}
              </p>
              {hero.tags.length > 0 && (
                <ul className="intro-4 mt-10 flex flex-wrap gap-3">
                  {hero.tags.map((tag) => (
                    <li
                      key={tag}
                      className="border border-white/60 px-4 py-2.5 text-[13px] font-semibold tracking-[0.14em] text-white uppercase"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              {hero.cta && (
                <CmsLink
                  href={hero.cta.url}
                  fallback="/contact"
                  className="intro-4 mt-8 inline-flex items-center gap-3 border-b border-white pb-1 text-[16px] font-bold text-white"
                >
                  {hero.cta.label} <span aria-hidden="true" className="rtl-mirror">→</span>
                </CmsLink>
              )}
            </div>
          </div>
        </div>
        <div className="hero-media-right bg-navy">
          <img
            src={heroImage}
            alt={hero.imageAlt}
            width={1200}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
              Governance Structure
            </p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[44px]">
              {structure.title}
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted-fg">{structure.description}</p>
            <ul className="mt-8 flex flex-wrap gap-3">
              {groups.map((group) => (
                <li key={group.id}>
                  <a
                    href={`#${group.slug}`}
                    className="inline-block rounded-full border border-line px-5 py-2.5 text-[15px] text-foreground transition-colors hover:border-orange hover:text-foreground"
                  >
                    {group.name.replace(/\s*\(.*\)$/, "")}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            {groups.map((group, i) => (
              <article
                key={group.id}
                id={group.slug}
                data-reveal
                className="group scroll-mt-28 border border-line bg-background p-4 sm:p-6"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={group.image}
                    alt={`${group.name} setting at the World Business Council`}
                    width={1200}
                    height={560}
                    loading="lazy"
                    decoding="async"
                    className="card-zoom-img aspect-[15/7] w-full object-cover"
                  />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <BodyIcon icon={group.icon} />
                  <h3 className="flex-1 text-[22px] leading-snug font-bold text-foreground sm:text-[26px]">
                    {group.name}
                  </h3>
                  <span className="hidden shrink-0 border border-line px-3 py-2 text-[14px] text-muted-fg sm:inline-block">
                    Group {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                {group.role && (
                  <dl className="mt-6">
                    <div className="border-t border-line py-5 ps-16">
                      <dt className="text-[16px] font-bold text-foreground">Role</dt>
                      <dd className="mt-2 text-[16px] leading-relaxed text-muted-fg">{group.role}</dd>
                    </div>
                  </dl>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-14 lg:py-20">
        <div className="container-wbc grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div data-reveal>
            <p className="text-[13px] font-semibold tracking-[0.18em] text-muted-fg uppercase">Governance FAQ</p>
            <h2 className="mt-4 text-[30px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
              Clear answers on how WBC governance works
            </h2>
            <p className="mt-6 text-[17px] leading-relaxed text-muted-fg">
              Quick guidance on leadership structure, member participation, and how decisions are made across the council.
            </p>
          </div>

          <div>
            <ul data-reveal className="border border-line bg-background">
              {faqs.map((faq, i) => (
                <li key={faq.id} className="border-b border-line last:border-b-0">
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? -1 : i)}
                    aria-expanded={open === i}
                    className="flex w-full items-center justify-between gap-6 px-5 py-6 text-start transition-colors hover:bg-surface sm:px-8"
                  >
                    <span className="text-[18px] leading-snug font-bold text-foreground sm:text-[20px]">
                      {faq.question}
                    </span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                      className={`shrink-0 text-foreground transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ${
                      open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-7 text-[17px] leading-relaxed text-muted-fg sm:px-8">{faq.answer}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[17px] leading-relaxed text-muted-fg">
              Need more detail on a governance topic?{" "}
              <Link to="/contact" className="font-semibold text-foreground hover:underline">
                Contact the WBC team
              </Link>{" "}
              and we'll direct your question to the right office.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
