import { Link } from "@tanstack/react-router";
import { CalendarCheck, GraduationCap, MapPin } from "lucide-react";
import { JobThumbnail } from "@/components/jobs/JobThumbnail";
import { formatJobDateShort, getJobDepartment, type JobRecord } from "@/content/jobs";

export function JobListingCard({ job }: { job: JobRecord }) {
  const department = getJobDepartment(job);

  return (
    <li>
      <Link
        to="/jobs/$slug"
        params={{ slug: job.slug }}
        className="group relative block overflow-hidden rounded-card border border-line bg-surface/40 transition-all duration-300 hover:border-orange/25 hover:bg-background hover:shadow-card"
      >
        <span
          className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-orange via-orange/80 to-navy transition-all duration-300 group-hover:w-1.5"
          aria-hidden="true"
        />

        {/* Top meta row */}
        <div className="flex flex-wrap items-center gap-3 border-b border-line/80 px-4 py-3 sm:px-6">
            <p className="text-[13px] font-medium text-muted-fg">Posted {formatJobDateShort(job.publishedDate)}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/8 px-3 py-1 text-[12px] font-semibold text-navy">
              <GraduationCap className="size-3.5" aria-hidden="true" />
              Internship
            </span>
            <span className="inline-flex items-center rounded-full bg-blue/10 px-3 py-1 text-[12px] font-semibold text-blue">
              {job.positionsAvailable} {job.positionsAvailable === 1 ? "Vacancy" : "Vacancies"}
            </span>
        </div>

        {/* Main row */}
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <JobThumbnail job={job} size="compact" />
            <h2 className="min-w-0 text-[18px] leading-snug font-bold text-foreground transition-colors group-hover:text-navy sm:text-[20px]">
              {department}
            </h2>
          </div>

          <div className="flex shrink-0 flex-col items-start gap-2 sm:items-end">
            <p className="text-[15px] font-bold text-foreground sm:text-[16px]">{job.compensation}</p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] font-medium text-muted-fg">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-orange" aria-hidden="true" />
                Remote
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarCheck className="size-3.5 text-orange" aria-hidden="true" />
                {formatJobDateShort(job.applicationDeadline)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}
