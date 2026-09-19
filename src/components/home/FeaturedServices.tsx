import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { homeServices, whatWeDoQueryOptions } from "@/lib/queries/what-we-do";
import { useI18n } from "@/i18n";

export function FeaturedServices() {
  const { t } = useI18n();
  const { data, isPending } = useQuery(whatWeDoQueryOptions);

  if (isPending) {
    return (
      <section className="border-t border-line bg-surface/40 py-16 lg:py-20">
        <div className="container-wbc">
          <Skeleton className="h-24 max-w-xl rounded-lg" />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
            <Skeleton className="h-48 rounded-lg" />
          </div>
        </div>
      </section>
    );
  }

  if (!data) return null;

  const services = homeServices(data);
  if (!services.length) return null;

  return (
    <section className="border-t border-line bg-surface/40 py-16 lg:py-20">
      <div className="container-wbc">
        <SectionHeading
          align="left"
          eyebrow={t("home.featuredServices")}
          title={t("link.whatWeDo")}
          description={t("home.servicesDesc")}
        />

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
            />
          ))}
        </ul>

        <div data-reveal className="mt-10 text-start">
          <Link to="/what-we-do" className="card-link">
            {t("ui.viewAllServices")}
            <span aria-hidden="true" className="card-link-arrow rtl-mirror">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
