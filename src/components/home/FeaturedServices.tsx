import { Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/SectionHeading";

const SERVICES = [
  {
    title: "Global Business Networking",
    body: "Facilitating high-value connections and opportunities that span continents, industries, and sectors.",
  },
  {
    title: "Business Council Development & Support",
    body: "Providing strategic guidance and operational support for the creation and development of councils.",
  },
  {
    title: "International Trade & Investment Facilitation",
    body: "Supporting cross-border trade and investment opportunities by connecting businesses with partners.",
  },
  {
    title: "Conferences, Forums & Global Events",
    body: "Organising international summits, business forums, conferences, exhibitions, and roundtables.",
  },
  {
    title: "Innovation & Ideas Development Platform",
    body: "Operating an innovation platform where members can share ideas, develop projects, and collaborate.",
  },
  {
    title: "Business Advisory & Consultancy Support",
    body: "Offering advisory services to businesses, startups, and established councils in international markets.",
  },
] as const;

export function FeaturedServices() {
  return (
    <section className="border-t border-line bg-surface/40 py-16 lg:py-20">
      <div className="container-wbc">
        <SectionHeading
          eyebrow="Featured Services"
          title="What We Do"
          description="Six selected services from our full programme of activities supporting businesses worldwide."
        />
        <ul data-reveal data-reveal-group className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <li
              key={s.title}
              className="rounded-card border border-line bg-background p-6 transition-shadow duration-300 hover:shadow-card"
            >
              <span
                className="inline-flex size-9 items-center justify-center rounded-md bg-navy/5"
                aria-hidden="true"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  className="text-foreground"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M3 12h18M12 3c2.5 3 2.5 15 0 18" />
                </svg>
              </span>
              <h3 className="mt-5 text-[17px] font-bold text-foreground">{s.title}</h3>
              <p className="mt-2.5 text-[15px] leading-relaxed text-muted-fg text-justify">{s.body}</p>
              <Link to="/what-we-do" className="mt-4 inline-block text-[14px] font-semibold text-foreground">
                Learn More <span aria-hidden="true" className="rtl-mirror">→</span>
              </Link>
            </li>
          ))}
        </ul>
        <div data-reveal className="mt-10 text-end">
          <Link to="/what-we-do" className="text-[15px] font-semibold text-foreground">
            View all services <span aria-hidden="true" className="rtl-mirror">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
