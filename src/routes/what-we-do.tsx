import { useQuery } from "@tanstack/react-query";
import { Link, createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/wwd-hero.jpg";
import { ServiceCard } from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { whatWeDoQueryOptions } from "@/lib/queries/what-we-do";

export const Route = createFileRoute("/what-we-do")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(whatWeDoQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    return {
      meta: [
        { title: "What We Do — Core Activities & Services | WBC" },
        {
          name: "description",
          content:
            "WBC's strategic pillars of support: global networking, council development, trade facilitation, events, advisory, training, membership services, and more.",
        },
        { property: "og:title", content: "Core Activities & Services — WBC" },
        {
          property: "og:description",
          content:
            "A structured overview of WBC services across networking, advisory support, events, and growth initiatives.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: WhatWeDo,
});

function WhatWeDoHeroSkeleton() {
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
      <div className="hero-media-right bg-navy-deep">
        <Skeleton className="absolute inset-0 size-full bg-white/10" />
      </div>
    </section>
  );
}

function WhatWeDo() {
  const { data, isPending } = useQuery(whatWeDoQueryOptions);

  if (isPending) {
    return (
      <>
        <WhatWeDoHeroSkeleton />
        <section className="py-14 lg:py-20">
          <div className="container-wbc">
            <Skeleton className="h-96 rounded-card" />
          </div>
        </section>
      </>
    );
  }

  if (!data) return null;

  const { hero, services } = data;
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
                <ul className="intro-4 mt-9 flex flex-wrap gap-3">
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
            </div>
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <img
            src={heroImage}
            alt={hero.imageAlt}
            width={1200}
            height={900}
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <div className="overflow-visible rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card sm:p-10 lg:p-12">
            <div data-reveal className="flex items-start justify-between gap-6">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">
                  Service Portfolio
                </p>
                <h2 className="mt-3 text-[28px] leading-tight font-bold text-foreground sm:text-4xl lg:text-[42px]">
                  Strategic Pillars of Support
                </h2>
                <p className="mt-5 max-w-3xl text-[16px] leading-relaxed text-muted-fg">
                  A structured, image-led overview of WBC services designed to help organizations identify
                  where cooperation starts and where growth can be accelerated.
                </p>
              </div>
              <span
                aria-hidden="true"
                className="rtl-mirror mt-2 hidden text-[22px] text-muted-fg sm:block"
              >
                →
              </span>
            </div>

            <hr className="mt-10 border-line" />

            <ul
              data-reveal
              data-reveal-group
              className="service-card-grid mt-10 grid items-stretch gap-6 overflow-visible lg:grid-cols-2"
            >
              {services.map((service, i) => (
                <ServiceCard
                  key={service.id}
                  kicker={service.kicker}
                  title={service.title}
                  body={service.body}
                  image={service.image}
                  index={i}
                  className={i === services.length - 1 && services.length % 2 !== 0 ? "lg:col-span-2" : ""}
                />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-16 lg:pb-24">
        <div className="container-wbc">
          <div
            data-reveal
            className="relative overflow-hidden rounded-card border border-line bg-background p-8 transition-shadow duration-300 hover:shadow-card sm:p-12 lg:p-16"
          >
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-[13px] font-semibold tracking-[0.16em] text-muted-fg uppercase">
                  Membership
                </p>
                <span className="accent-rule mt-3" />
                <h2 className="mt-6 text-[30px] leading-[1.1] font-bold text-foreground sm:text-4xl lg:text-[46px]">
                  Join the World Business Council
                </h2>
                <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted-fg">
                  WBC offers 5 distinct types of membership tailored to meet diverse needs.
                </p>
                <Link to="/become-a-member" className="btn-orange mt-8">
                  Become a Member
                </Link>
              </div>

              <div className="relative hidden aspect-[4/3] border border-line lg:block">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-70"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--color-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-line) 1px, transparent 1px)",
                    backgroundSize: "42px 42px",
                  }}
                />
                <span className="absolute top-[12%] right-[12%] size-32 rounded-full bg-orange/15" />
                <span className="absolute bottom-[22%] left-[16%] size-28 border border-navy/25" />
                <span className="absolute bottom-[28%] left-[26%] size-28 border border-orange/45" />
                <span className="absolute right-[10%] bottom-[12%] text-[12px] font-semibold tracking-[0.18em] text-muted-fg uppercase">
                  International Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
