import { Link } from "@tanstack/react-router";
import newsParis from "@/assets/news-paris.jpg";
import newsForum from "@/assets/news-forum.jpg";
import newsMember from "@/assets/news-member.jpg";

const NEWS = [
  {
    image: newsParis,
    alt: "Business delegates meeting in Paris with international flags",
    category: "Policy & Cooperation",
    title: "Global Trade Dialogue in Paris",
    body: "Senior delegates and business leaders gathered in Paris to discuss practical pathways for cross-border growth, resilient partnerships, and shared economic priorities.",
    cta: "Read update",
  },
  {
    image: newsForum,
    alt: "Professionals networking at an international business forum",
    category: "Network Development",
    title: "Regional Partnership Forum Expands Network Links",
    body: "A new forum series is strengthening collaboration between regional affiliates, member institutions, and strategic partners across key international markets.",
    cta: "Explore story",
  },
  {
    image: newsMember,
    alt: "Executives talking in a modern office atrium with a green plant wall",
    category: "Member Insight",
    title: "Member Spotlight on Sustainable Growth Initiatives",
    body: "WBC highlights how member organizations are turning sustainability commitments into measurable business action through cooperation, innovation, and long-term planning.",
    cta: "View feature",
  },
] as const;

export function LatestNews() {
  return (
    <section className="py-16 lg:py-20">
      <div className="container-wbc">
        <div
          data-reveal
          className="flex items-center justify-between gap-6 border-b border-line pb-4"
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-blue sm:text-[13px]">
            Latest News
          </p>
          <Link
            to="/events"
            className="text-[15px] font-medium text-blue underline underline-offset-4 hover:no-underline sm:text-[16px]"
          >
            View all updates
          </Link>
        </div>

        <div data-reveal className="mt-10">
          <p className="text-[17px] font-semibold text-blue sm:text-[18px]">
            Institutional Activities and Business News
          </p>
          <h2 className="mt-4 max-w-3xl text-[32px] leading-[1.08] font-bold tracking-tight text-navy sm:text-[42px] lg:text-[50px]">
            Current Momentum Across the WBC Network and in the World
          </h2>
          <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-fg sm:text-[18px]">
            Follow recent updates that improve your understanding about WBC activities, and get updates
            about business news in the world.
          </p>
        </div>

        <ul
          data-reveal
          data-reveal-group
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {NEWS.map((item) => (
            <li
              key={item.title}
              className="flex flex-col overflow-hidden rounded-card border border-line bg-background transition-shadow duration-300 hover:shadow-card"
            >
              <img
                src={item.image}
                alt={item.alt}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="aspect-[3/2] w-full object-cover"
              />
              <div className="flex flex-1 flex-col p-6 sm:p-7">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue sm:text-[13px]">
                  {item.category}
                </p>
                <h3 className="mt-3 text-[20px] leading-tight font-bold text-navy sm:text-[22px]">
                  {item.title}
                </h3>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-fg">{item.body}</p>
                <Link
                  to="/events"
                  className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-blue underline underline-offset-4 hover:no-underline"
                >
                  {item.cta}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
