import { Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, Clock, MapPin, Users } from "lucide-react";
import { getJobDepartment, type JobRecord } from "@/content/jobs";

export function JobListingCard({ job }: { job: JobRecord }) {
  const department = getJobDepartment(job);

  return (
    <li>
      <Link
        to="/jobs/$slug"
        params={{ slug: job.slug }}
        className="group relative flex overflow-hidden rounded-card border border-line bg-background transition-all duration-300 hover:border-orange/30 hover:shadow-card"
      >
        <span
          className="absolute inset-y-0 start-0 w-1 bg-gradient-to-b from-orange via-orange/80 to-navy transition-all duration-300 group-hover:w-1.5"
          aria-hidden="true"
        />

        <div className="flex flex-1 items-center justify-between gap-4 p-5 ps-6 sm:gap-6 sm:p-6 sm:ps-7">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/8 px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-navy uppercase">
                <Briefcase className="size-3" aria-hidden="true" />
                Internship
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/10 px-3 py-1 text-[11px] font-bold tracking-[0.08em] text-orange uppercase">
                <Users className="size-3" aria-hidden="true" />
                {job.positionsAvailable} {job.positionsAvailable === 1 ? "Opening" : "Openings"}
              </span>
            </div>

            <h2 className="mt-3 text-[20px] leading-snug font-bold text-foreground transition-colors group-hover:text-navy sm:text-[22px]">
              {department}
            </h2>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] font-medium text-muted-fg">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 text-orange" aria-hidden="true" />
                Remote
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-orange" aria-hidden="true" />
                Part-time · 6 months
              </span>
              <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-[12px] font-semibold text-foreground/80">
                Voluntary
              </span>
            </div>
          </div>

          <span className="inline-flex shrink-0 items-center gap-2 text-[14px] font-bold text-orange transition-all group-hover:gap-3">
            <span className="hidden sm:inline">View role</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}
