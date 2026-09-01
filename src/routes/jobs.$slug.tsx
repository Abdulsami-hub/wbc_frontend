import { createFileRoute, Link } from "@tanstack/react-router";
import { getJob } from "@/content/jobs";
import { JobDetailView } from "@/components/jobs/JobDetailView";
import { CTASection } from "@/components/CTASection";

export const Route = createFileRoute("/jobs/$slug")({
  head: ({ params }) => {
    const job = getJob(params.slug);
    if (!job) return { meta: [{ title: "Job Not Found — World Business Council" }] };

    return {
      meta: [
        { title: `${job.title} — World Business Council` },
        {
          name: "description",
          content: job.description,
        },
        { property: "og:title", content: `${job.title} — WBC` },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: JobDetailPage,
});

function JobDetailPage() {
  const { slug } = Route.useParams();
  const job = getJob(slug);

  if (!job) {
    return (
      <section className="py-20">
        <div className="container-wbc text-center">
          <h1 className="text-[28px] font-bold text-foreground">Position not found</h1>
          <p className="mt-3 text-muted-fg">This internship listing may have been removed or is no longer available.</p>
          <Link to="/jobs" className="btn-orange mt-8 inline-flex">
            View all internships
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <JobDetailView job={job} />
      <CTASection
        title="Explore More Opportunities"
        description="Discover other internship roles across WBC teams and find the right fit for your skills and interests."
        ctaLabel="View All Internships"
        to="/jobs"
      />
    </>
  );
}
