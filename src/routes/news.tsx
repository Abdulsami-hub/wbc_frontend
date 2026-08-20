import { createFileRoute, Link } from "@tanstack/react-router";
import { NEWS } from "@/content/news";
import { SplitHero } from "@/components/SplitHero";
import { CTASection } from "@/components/CTASection";
import newsHero from "@/assets/news-hero.png";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Blogs — World Business Council" },
      {
        name: "description",
        content: "News and updates from the World Business Council: institutional activities, markets, and network highlights.",
      },
      { property: "og:title", content: "News & Blogs — WBC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <SplitHero
        eyebrow="Updates"
        title="News & Blogs"
        description="Institutional activities, market signals, and stories from across the WBC network."
        tags={["Network", "Markets", "Programmes"]}
        image={newsHero}
        imageAlt="WBC colleagues reviewing reports and market insights"
        tone="navy"
        ctaLabel="Contact the Team"
        ctaTo="/contact"
      />

      <section className="py-14 lg:py-20">
        <div className="container-wbc">
          <ul data-reveal data-reveal-group className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {NEWS.map((item) => (
              <li
                key={item.slug}
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
                    {item.category} · {item.dateLabel}
                  </p>
                  <h2 className="mt-3 text-[20px] leading-tight font-bold text-foreground sm:text-[22px]">{item.title}</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-muted-fg">{item.body}</p>
                  <Link to="/contact" className="card-link mt-6">
                    {item.cta}
                    <span aria-hidden="true" className="card-link-arrow rtl-mirror">
                      →
                    </span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTASection
        title="Stay Connected"
        description="Join WBC to receive programme updates and participate in the global network."
        ctaLabel="Become a Member"
        to="/become-a-member"
      />
    </>
  );
}
