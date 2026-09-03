import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CTASection } from "@/components/CTASection";
import { JobDetailView } from "@/components/jobs/JobDetailView";
import { Skeleton } from "@/components/ui/skeleton";
import { jobsQueryOptions } from "@/lib/queries/jobs";

export const Route = createFileRoute("/jobs/$slug")({
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(jobsQueryOptions),
  head: ({ params, loaderData }) => {
    const job = loaderData?.listings.find((item) => item.slug === params.slug);
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

function JobDetailSkeleton() {
  return (
    <section className="py-10 lg:py-12">
      <div className="container-wbc space-y-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-10 max-w-2xl" />
        <Skeleton className="h-6 w-80" />
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-4">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-56 w-full" />
          </div>
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    </section>
  );
}

function JobDetailPage() {
  const { slug } = Route.useParams();
  const { data, isPending } = useQuery(jobsQueryOptions);

  if (isPending) return <JobDetailSkeleton />;

  const job = data?.listings.find((item) => item.slug === slug);

  if (!job) {
    return (
      <section className="py-20">
        <div className="container-wbc text-center">
          <h1 className="text-[28px] font-bold text-foreground">Position not found</h1>
          <p className="mt-3 text-muted-fg">
            This internship listing may have been removed or is no longer available.
          </p>
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
        description="Discover more job and internship opportunities across the WBC network and find the right fit for your skills and interests."
        ctaLabel="View All Internships"
        to="/jobs"
      />
    </>
  );
}
