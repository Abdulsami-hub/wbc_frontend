import { createFileRoute } from "@tanstack/react-router";
import { JOBS, TOTAL_POSITIONS } from "@/content/jobs";
import { SplitHero } from "@/components/SplitHero";
import { JobListingCard } from "@/components/jobs/JobListingCard";
import teamHero from "@/assets/team-hero.jpg";

export const Route = createFileRoute("/jobs/")({
  head: () => ({
    meta: [
      { title: "Jobs & Internships — World Business Council" },
      {
        name: "description",
        content:
          "Internship opportunities at the World Business Council: join our remote, part-time teams in business development, marketing, events, design, legal, finance, and more.",
      },
      { property: "og:title", content: "Jobs & Internships — WBC" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: JobsPage,
});

function JobsPage() {
  return (
    <>
      <SplitHero
        eyebrow="Careers"
        title="Jobs & Internships"
        description="Gain practical experience with the World Business Council through remote, part-time internship opportunities across our international teams."
        tags={["Remote", "Part-time", "International"]}
        image={teamHero}
        imageAlt="WBC team members collaborating on international business initiatives"
        tone="navy"
        ctaLabel="Contact Us"
        ctaTo="/contact"
      />

      <section className="bg-surface/30 py-14 lg:py-20">
        <div className="container-wbc">
          <div data-reveal className="max-w-3xl">
            <h2 className="text-[26px] font-bold leading-tight text-foreground sm:text-[32px]">Open Internship Roles</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-muted-fg sm:text-[17px]">
              Join the World Business Council through voluntary, remote, part-time internships across our international
              teams. Explore {TOTAL_POSITIONS} openings in {JOBS.length} departments and apply directly to WBC.
            </p>
          </div>

          <ul data-reveal data-reveal-group className="mt-10 space-y-4">
            {JOBS.map((job) => (
              <JobListingCard key={job.slug} job={job} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
