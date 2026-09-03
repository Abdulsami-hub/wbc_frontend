import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import newsHero from "@/assets/news-hero.png";
import { CTASection } from "@/components/CTASection";
import { NewsStoryModal } from "@/components/NewsStoryModal";
import { SplitHero } from "@/components/SplitHero";
import { Skeleton } from "@/components/ui/skeleton";
import type { NewsItem } from "@/content/news";
import { resolveCmsUrl } from "@/lib/cms-url";
import { newsQueryOptions } from "@/lib/queries/news";

export const Route = createFileRoute("/news")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(newsQueryOptions),
  head: ({ loaderData }) => {
    const heroImage = loaderData?.hero.image;
    const title = loaderData?.hero.title ?? "News & Blogs — World Business Council";
    const description =
      loaderData?.hero.description ??
      "News and updates from the World Business Council: institutional activities, markets, and network highlights.";

    return {
      meta: [
        { title: `${title} — WBC` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: heroImage
        ? [{ rel: "preload", as: "image", href: heroImage, fetchPriority: "high" }]
        : [],
    };
  },
  component: NewsPage,
});

function NewsSkeleton() {
  return (
    <>
      <section className="relative flex flex-col">
        <div className="absolute inset-y-0 start-0 hidden w-1/2 bg-navy lg:block" aria-hidden="true" />
        <div className="bg-navy lg:bg-transparent">
          <div className="container-wbc py-16 lg:py-24">
            <Skeleton className="h-6 w-40 bg-white/20" />
            <Skeleton className="mt-6 h-14 max-w-lg bg-white/20" />
            <Skeleton className="mt-6 h-24 max-w-lg bg-white/20" />
          </div>
        </div>
        <div className="hero-media-right bg-navy-deep">
          <Skeleton className="absolute inset-0 size-full bg-white/10" />
        </div>
      </section>
      <section className="py-14 lg:py-20">
        <div className="container-wbc grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </section>
    </>
  );
}

function resolveCta(url: string, fallback = "/contact") {
  const resolved = resolveCmsUrl(url, fallback);
  if (resolved.kind === "internal") {
    const [path, hash] = resolved.path.split("#");
    return {
      ctaTo: path || fallback,
      ctaHash: hash || undefined,
      ctaHref: undefined as string | undefined,
    };
  }
  return { ctaTo: undefined, ctaHash: undefined, ctaHref: resolved.href };
}

function NewsPage() {
  const { data, isPending } = useQuery(newsQueryOptions);
  const [selected, setSelected] = useState<NewsItem | null>(null);

  if (isPending) return <NewsSkeleton />;
  if (!data) return null;

  const { hero, articles } = data;
  const heroCta = hero.cta ? resolveCta(hero.cta.url) : null;

  return (
    <>
      <SplitHero
        eyebrow={hero.kicker}
        title={hero.title}
        description={hero.description}
        image={hero.image ?? newsHero}
        imageAlt={hero.imageAlt}
        tone="navy"
        ctaLabel={hero.cta?.label}
        ctaTo={heroCta?.ctaTo}
        ctaHref={heroCta?.ctaHref}
        ctaHash={heroCta?.ctaHash}
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          {articles.length === 0 ? (
            <p data-reveal className="rounded-card border border-line bg-background px-6 py-12 text-center text-[15px] text-muted-fg">
              No news articles published yet.
            </p>
          ) : (
            <ul data-reveal data-reveal-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((item) => (
                <li
                  key={item.id}
                  className="group flex flex-col overflow-hidden rounded-card border border-line bg-background"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="card-zoom-img aspect-[3/2] w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="card-kicker">
                      {item.category}
                      {item.dateLabel ? ` · ${item.dateLabel}` : ""}
                    </p>
                    <h2 className="mt-3 text-[20px] leading-tight font-bold text-foreground sm:text-[22px]">{item.title}</h2>
                    <p className="mt-3 text-[16px] leading-relaxed text-muted-fg">{item.body}</p>
                    <button type="button" onClick={() => setSelected(item)} className="card-link mt-6 self-start text-start">
                      {item.cta}
                      <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                        →
                      </span>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <CTASection
        title="Stay Connected"
        description="Join WBC to receive programme updates and participate in the global network."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />

      <NewsStoryModal
        item={selected}
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      />
    </>
  );
}
