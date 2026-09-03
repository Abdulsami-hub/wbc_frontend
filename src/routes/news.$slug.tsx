import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui/skeleton";
import { newsQueryOptions } from "@/lib/queries/news";
import { graphSchema, newsArticleSchema, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: async ({ context: { queryClient }, params }) => {
    const data = await queryClient.ensureQueryData(newsQueryOptions);
    const article = data.articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return { article, related: data.articles.filter((a) => a.slug !== params.slug).slice(0, 3) };
  },
  head: ({ loaderData, params }) => {
    const article = loaderData?.article;
    if (!article) {
      return seoHead({
        title: "Article Not Found",
        path: `/news/${params.slug}`,
        noindex: true,
      });
    }
    const description = article.body || article.detail || undefined;
    return seoHead({
      title: article.title,
      description,
      path: `/news/${article.slug}`,
      image: article.image,
      type: "article",
      preloadImage: article.image,
      article: {
        publishedTime: article.publishedAt,
        modifiedTime: article.publishedAt,
        section: article.category,
        author: "World Business Council",
      },
    });
  },
  component: NewsArticlePage,
});

function NewsArticleSkeleton() {
  return (
    <article className="pb-16">
      <div className="container-wbc py-10">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="mt-6 aspect-[16/9] w-full max-w-4xl" />
        <Skeleton className="mt-8 h-10 max-w-3xl" />
        <Skeleton className="mt-4 h-24 max-w-3xl" />
      </div>
    </article>
  );
}

function NewsArticlePage() {
  const { slug } = Route.useParams();
  const { data, isPending } = useQuery(newsQueryOptions);

  if (isPending) return <NewsArticleSkeleton />;

  const article = data?.articles.find((item) => item.slug === slug);
  if (!article) throw notFound();

  const related = (data?.articles ?? []).filter((a) => a.slug !== slug).slice(0, 3);
  const hasSource = Boolean(article.sourceLabel || article.sourceUrl);
  const path = `/news/${article.slug}`;

  return (
    <>
      <JsonLd
        data={graphSchema([
          newsArticleSchema({
            title: article.title,
            description: article.body || article.detail,
            path,
            image: article.image,
            datePublished: article.publishedAt,
            dateModified: article.publishedAt,
            section: article.category,
          }),
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "News", path: "/news" },
          { name: article.title, path },
        ]}
      />

      <article className="pb-10">
        <div className="relative overflow-hidden bg-navy-deep">
          <div className="container-wbc py-0">
            <div className="relative mx-auto max-w-4xl overflow-hidden">
              <img
                src={article.image}
                alt={article.alt}
                width={1200}
                height={675}
                fetchPriority="high"
                decoding="async"
                className="aspect-[16/9] w-full object-cover"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/40 to-transparent"
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                <p className="text-[12px] font-semibold tracking-[0.18em] text-white/80 uppercase">
                  {article.category}
                  {article.dateLabel ? ` · ${article.dateLabel}` : ""}
                </p>
                <h1 className="mt-2 max-w-3xl text-[26px] font-bold leading-tight text-white sm:text-[36px]">
                  {article.title}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="container-wbc">
          <div className="mx-auto max-w-3xl py-8 sm:py-10">
            {hasSource ? (
              <div className="rounded-card border border-line bg-surface p-4 sm:p-5">
                {article.sourceLabel ? (
                  <p className="text-[13px] leading-relaxed text-muted-fg sm:text-[14px]">
                    <span className="font-semibold text-foreground">Source: </span>
                    {article.sourceLabel}
                  </p>
                ) : null}
                {article.sourceUrl ? (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-[14px] font-semibold text-blue transition-colors hover:text-navy"
                  >
                    Original Article
                    <ExternalLink className="size-3.5" aria-hidden="true" />
                  </a>
                ) : null}
              </div>
            ) : null}

            {article.detail ? (
              <p className="mt-6 text-[16px] leading-relaxed text-muted-fg text-justify sm:text-[17px]">
                {article.detail}
              </p>
            ) : null}

            {article.bullets.length > 0 ? (
              <>
                <span className="accent-rule mt-6" />
                <h2 className="mt-6 text-[15px] font-bold tracking-[0.08em] text-foreground uppercase">
                  Key points
                </h2>
                <ul className="mt-4 space-y-3">
                  {article.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 text-[15px] leading-relaxed text-foreground/90 sm:text-[16px]"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            <div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-8">
              <Link
                to="/news"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                All news
              </Link>
              <Link
                to="/what-we-do"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                What we do
              </Link>
              <Link
                to="/events"
                className="btn-base border border-line bg-background text-foreground hover:border-navy"
              >
                Events
              </Link>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 ? (
        <section
          className="border-t border-line bg-surface py-12 lg:py-16"
          aria-labelledby="related-news-heading"
        >
          <div className="container-wbc">
            <h2
              id="related-news-heading"
              className="text-[24px] font-bold text-foreground sm:text-[28px]"
            >
              Related updates
            </h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to="/news/$slug"
                    params={{ slug: item.slug }}
                    className="group flex h-full flex-col overflow-hidden rounded-card border border-line bg-background transition-shadow hover:shadow-card"
                  >
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={600}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <div className="flex flex-1 flex-col p-5">
                      <p className="card-kicker">
                        {item.category}
                        {item.dateLabel ? ` · ${item.dateLabel}` : ""}
                      </p>
                      <h3 className="mt-2 text-[18px] font-bold leading-snug text-foreground group-hover:text-navy">
                        {item.title}
                      </h3>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CTASection
        title="Stay Connected"
        description="Join WBC to receive programme updates and participate in the global network."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
