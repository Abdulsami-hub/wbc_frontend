import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/who-we-are-hero.png";
import { Skeleton } from "@/components/ui/skeleton";
import type { WhoWeArePageContent, WhoWeAreValue } from "@/content/who-we-are";
import { whoWeAreQueryOptions } from "@/lib/queries/who-we-are";

export const Route = createFileRoute("/who-we-are")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(whoWeAreQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    return {
      meta: [
        { title: "Who We Are — World Business Council" },
        {
          name: "description",
          content:
            "The World Business Council is an international business support organization built on trust, connection, cooperation, and long-term growth for businesses worldwide.",
        },
        { property: "og:title", content: "Who We Are — World Business Council" },
        {
          property: "og:description",
          content: "Our story, vision, mission, and the six core values that guide the WBC network.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: WhoWeAre,
});

const STAT_LABELS = [
  { key: "headquarters" as const, label: "Global headquarters" },
  { key: "founded" as const, label: "Founded" },
  { key: "network" as const, label: "WBC Network" },
];

function ValueIcon({ name }: { name: string }) {
  const common = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    "aria-hidden": true,
  } as const;
  switch (name) {
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M3.5 19c0-3 2.5-5 5.5-5s5.5 2 5.5 5M16 6.5a3 3 0 0 1 0 5.6M17 19c0-2.2-1-3.8-2.5-4.6" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 13.5a4 4 0 0 0 5.7 0l2.3-2.3a4 4 0 0 0-5.7-5.7L11 6.8" />
          <path d="M14 10.5a4 4 0 0 0-5.7 0L6 12.8a4 4 0 0 0 5.7 5.7l1.3-1.3" />
        </svg>
      );
    case "spark":
      return (
        <svg {...common}>
          <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          <path d="M18 16.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l7 3v5.5c0 4.2-2.9 7.6-7 9.5-4.1-1.9-7-5.3-7-9.5V6z" />
          <path d="M9 12l2.2 2.2L15.5 10" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c0-8 5.5-12 15-12 0 9-4.5 13-11 13H5z" />
          <path d="M9 19c1.5-4 4-6.5 7.5-8" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
        </svg>
      );
  }
}

function PageSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="grid lg:grid-cols-2">
          <Skeleton className="min-h-[420px] rounded-none bg-orange/90" />
          <Skeleton className="hidden min-h-[420px] rounded-none lg:block" />
        </div>
      </section>
      <section className="py-16 lg:py-24">
        <div className="container-wbc">
          <Skeleton className="h-64 rounded-lg" />
        </div>
      </section>
    </>
  );
}

function OurValues({ values }: { values: WhoWeAreValue[] }) {
  if (!values.length) return null;

  return (
    <div>
      <div className="max-w-2xl">
        <p data-reveal className="eyebrow">
          Core Values
        </p>
        <h2 data-reveal className="mt-3 text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[42px]">
          Principles of WBC.
        </h2>
        <p data-reveal className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
          The standards that shape how we connect people, support businesses, and build lasting cooperation worldwide.
        </p>
        <span data-reveal className="accent-rule mt-6" />
      </div>

      <ul data-reveal data-reveal-group className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {values.map((v, i) => {
          const featured = i === 0 || i === 3;
          return (
            <li key={v.id}>
              <article
                className={`group relative flex h-full flex-col overflow-hidden rounded-card p-7 transition-all duration-300 sm:p-8 ${
                  featured
                    ? "bg-navy text-white shadow-card hover:-translate-y-1 hover:shadow-lg"
                    : "border border-line bg-background hover:-translate-y-1 hover:border-orange/35 hover:shadow-card"
                }`}
              >
                <span
                  className={`pointer-events-none absolute -end-8 -top-8 size-32 rounded-full transition-transform duration-500 group-hover:scale-150 ${
                    featured ? "bg-orange/20" : "bg-orange/10"
                  }`}
                  aria-hidden="true"
                />
                <div className="relative flex items-start justify-between gap-4">
                  <span
                    className={`inline-flex size-12 items-center justify-center ${
                      featured ? "bg-white/10 text-white" : "bg-orange/10 text-foreground"
                    }`}
                    aria-hidden="true"
                  >
                    <ValueIcon name={v.icon} />
                  </span>
                  <span
                    className={`font-display text-[28px] leading-none font-bold tabular-nums ${
                      featured ? "text-white/25" : "text-orange/30"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className={`relative mt-7 text-[18px] font-bold sm:text-[19px] ${featured ? "text-white" : "text-foreground"}`}>
                  {v.title}
                </h3>
                <p
                  className={`relative mt-3 flex-1 text-[15px] leading-relaxed sm:text-[16px] ${
                    featured ? "text-white/80" : "text-muted-fg"
                  }`}
                >
                  {v.body}
                </p>
                <span
                  className={`relative mt-6 block h-0.5 w-10 origin-left scale-x-100 transition-transform duration-300 group-hover:scale-x-150 ${
                    featured ? "bg-orange" : "bg-navy"
                  }`}
                  aria-hidden="true"
                />
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function WhoWeArePage({ data }: { data: WhoWeArePageContent }) {
  const { hero, story, missionVision, stats, coreValues } = data;
  const [firstParagraph, ...restParagraphs] = story.paragraphs;
  const dropCap = firstParagraph?.charAt(0) ?? "";
  const firstBody = firstParagraph?.slice(1) ?? "";

  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-orange lg:block" aria-hidden="true" />
        <div className="bg-orange lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <div className="w-full max-w-xl">
              <nav aria-label="Breadcrumb" className="intro-1 text-[13px] text-white/75">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link to="/" className="hover:text-white">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li className="font-semibold text-white">{hero.title}</li>
                </ol>
              </nav>
              <p className="intro-1 mt-8 hero-kicker">{hero.kicker}</p>
              <h1 className="intro-2 mt-5 text-[38px] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[52px] lg:text-[60px]">
                {hero.title}
              </h1>
              <p className="intro-3 mt-7 max-w-lg text-[17px] leading-relaxed text-white/95 sm:text-[19px]">
                {hero.description}
              </p>
              {hero.tags.length > 0 ? (
                <ul className="intro-4 mt-9 flex flex-wrap gap-3">
                  {hero.tags.map((t) => (
                    <li
                      key={t}
                      className="border border-white/70 px-4 py-2 text-[13px] font-bold tracking-[0.14em] text-white uppercase"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <img
            src={hero.image ?? heroImg}
            alt={hero.imageAlt}
            width={1600}
            height={1000}
            fetchPriority="high"
            decoding="async"
            className="intro-img absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="relative overflow-hidden bg-surface py-16 lg:py-24">
        <div
          className="pointer-events-none absolute -right-32 -top-24 size-[420px] rounded-full bg-orange/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 size-[420px] rounded-full bg-navy/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="container-wbc relative grid items-start gap-8 lg:grid-cols-[1.55fr_1fr] lg:gap-10">
          <div
            data-reveal
            className="relative overflow-hidden rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-10 lg:p-14"
          >
            <span
              className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange via-orange/50 to-transparent rtl:bg-gradient-to-l"
              aria-hidden="true"
            />
            <div className="flex items-center gap-4">
              <span
                className="flex size-11 items-center justify-center rounded-none bg-orange/10 text-foreground"
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18M12 3c-2.5 3-2.5 15 0 18" />
                </svg>
              </span>
              <div>
                <p className="text-[13px] font-bold tracking-[0.2em] text-foreground uppercase">{story.kicker}</p>
                <p className="mt-1 text-[19px] font-bold text-foreground sm:text-[22px]">{story.title}</p>
              </div>
            </div>

            <span className="mt-8 block h-px w-full bg-line" aria-hidden="true" />

            {firstParagraph ? (
              <p className="mt-8 text-[17px] leading-[1.95] text-foreground/85 sm:text-[18px]">
                <span className="float-start me-3 mt-1 font-display text-[46px] leading-[0.85] font-bold text-foreground">
                  {dropCap}
                </span>
                {firstBody}
              </p>
            ) : null}

            {restParagraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="mt-8 text-[17px] leading-[1.95] text-foreground/85 sm:text-[18px]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <article data-reveal className="group relative overflow-hidden rounded-card bg-navy p-7 shadow-card sm:p-8">
              <span
                className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-orange/20 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <span className="relative flex size-11 items-center justify-center rounded-none bg-white/10 text-white" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
                  <circle cx="12" cy="12" r="2.6" />
                </svg>
              </span>
              <p className="relative mt-5 text-[13px] font-bold tracking-[0.2em] text-white/70 uppercase">
                {missionVision.visionTitle}
              </p>
              <p className="relative mt-3 text-[16px] leading-relaxed text-white sm:text-[17px]">
                {missionVision.visionDescription}
              </p>
            </article>

            <article
              data-reveal
              className="group relative overflow-hidden rounded-card border border-line bg-background p-7 transition-shadow duration-300 hover:shadow-card sm:p-8"
            >
              <span
                className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full bg-teal/15 transition-transform duration-500 group-hover:scale-150"
                aria-hidden="true"
              />
              <span
                className="relative flex size-11 items-center justify-center rounded-none bg-orange/10 text-foreground"
                aria-hidden="true"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="12" cy="12" r="8.5" />
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3" />
                </svg>
              </span>
              <p className="relative mt-5 text-[13px] font-bold tracking-[0.2em] text-foreground uppercase">
                {missionVision.missionTitle}
              </p>
              <p className="relative mt-3 text-[16px] leading-relaxed text-foreground/85 sm:text-[17px]">
                {missionVision.missionDescription}
              </p>
            </article>

            <dl
              data-reveal
              className="grid grid-cols-3 gap-3 rounded-card border border-line bg-background px-4 py-5 sm:gap-4 sm:px-5 sm:py-6"
            >
              {STAT_LABELS.map(({ key, label }) => (
                <div key={key} className="min-w-0 text-center sm:text-start">
                  <dt className="text-[18px] font-bold text-foreground sm:text-[20px]">{stats[key]}</dt>
                  <dd className="mt-1 text-[11px] leading-snug tracking-[0.06em] text-muted-fg uppercase sm:text-[12px]">
                    {label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {coreValues.length > 0 ? (
        <section className="py-16 lg:py-24">
          <div className="container-wbc">
            <OurValues values={coreValues} />
          </div>
        </section>
      ) : null}

      <section className="relative isolate overflow-hidden bg-navy py-16 lg:py-24">
        <div data-reveal className="container-wbc relative text-center">
          <h2 className="text-[28px] font-bold leading-tight text-white sm:text-[36px] lg:text-[42px]">
            Explore What We Do
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[16px] leading-relaxed text-white/85 sm:text-[17px]">
            Discover the services and activities WBC delivers worldwide.
          </p>
          <Link to="/what-we-do" className="btn-orange mt-9">
            What We Do
          </Link>
        </div>
      </section>
    </>
  );
}

function WhoWeAre() {
  const { data, isPending, isError } = useQuery(whoWeAreQueryOptions);

  if (isPending) return <PageSkeleton />;
  if (isError || !data) return null;

  return <WhoWeArePage data={data} />;
}
