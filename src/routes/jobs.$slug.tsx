import { useQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CTASection } from "@/components/CTASection";
import { JobDetailView } from "@/components/jobs/JobDetailView";
import { JsonLd } from "@/components/seo/JsonLd";
import { Skeleton } from "@/components/ui/skeleton";
import { jobsQueryOptions } from "@/lib/queries/jobs";
import { graphSchema, jobPostingSchema, seoHead } from "@/lib/seo";

export const Route = createFileRoute("/jobs/$slug")({
  loader: async ({ context: { queryClient }, params }) => {
    const data = await queryClient.ensureQueryData(jobsQueryOptions);
    const job = data.listings.find((item) => item.slug === params.slug);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ params, loaderData }) => {
    const job = loaderData?.job;
    if (!job) {
      return seoHead({
        title: "Opportunity Not Found",
        path: `/jobs/${params.slug}`,
        noindex: true,
      });
    }

    const deadline = job.applicationDeadline?.trim();
    const expired =
      Boolean(deadline) &&
      !Number.isNaN(
        new Date(
          /^\d{4}-\d{2}-\d{2}$/.test(deadline) ? `${deadline}T23:59:59Z` : deadline,
        ).getTime(),
      ) &&
      new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(deadline) ? `${deadline}T23:59:59Z` : deadline,
      ).getTime() < Date.now();

    return seoHead({
      title: job.title,
      description: job.description || job.intro,
      path: `/jobs/${job.slug}`,
      image: job.logo,
      noindex: expired,
    });
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
  if (!job) throw notFound();

  const path = `/jobs/${job.slug}`;
  const descriptionHtml = [job.intro, job.description, job.aboutCompany]
    .filter(Boolean)
    .map((block) => `<p>${escapeHtml(block)}</p>`)
    .concat(
      job.responsibilities.length
        ? [
            `<h3>Responsibilities</h3><ul>${job.responsibilities.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`,
          ]
        : [],
    )
    .concat(
      job.requirements.length
        ? [
            `<h3>Requirements</h3><ul>${job.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`,
          ]
        : [],
    )
    .join("");

  const schema = jobPostingSchema({
    title: job.title,
    description: descriptionHtml || job.description || job.intro,
    path,
    datePosted: job.publishedDate,
    validThrough: job.applicationDeadline,
    employmentType: job.workType || job.announcementType,
    workLocation: job.workType,
    applyEmail: job.applyEmail,
  });

  return (
    <>
      {schema ? <JsonLd data={graphSchema([schema])} /> : null}
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Opportunities", path: "/jobs" },
          { name: job.title, path },
        ]}
      />
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

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
