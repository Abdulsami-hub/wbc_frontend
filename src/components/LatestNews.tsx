import { Link } from "@tanstack/react-router";
import { NEWS } from "@/content/news";

export function LatestNews() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-wbc">
        <div data-reveal className="flex items-center justify-between gap-6 border-b border-line pb-4">
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-muted-fg sm:text-[13px]">
            Latest News
          </p>
          <Link to="/news" className="card-link text-[15px] sm:text-[16px]">
            View all updates
          </Link>
        </div>

        <div data-reveal className="mt-10">
          <p className="text-[17px] font-semibold text-muted-fg sm:text-[18px]">
            Institutional Activities and Business News
          </p>
          <h2 className="mt-4 max-w-3xl text-[32px] leading-[1.08] font-bold tracking-tight text-foreground sm:text-[42px] lg:text-[50px]">
            Current Momentum Across the WBC Network and in the World
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg text-justify sm:text-[18px]">
            Follow recent updates that improve your understanding about WBC activities, and get updates about business
            news in the world.
          </p>
        </div>

        <ul data-reveal data-reveal-group className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <p className="card-kicker sm:text-[13px]">{item.category}</p>
                <h3 className="mt-3 text-[20px] leading-tight font-bold text-foreground sm:text-[22px]">{item.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-fg text-justify">{item.body}</p>
                <Link to="/news" className="card-link mt-6">
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
  );
}
