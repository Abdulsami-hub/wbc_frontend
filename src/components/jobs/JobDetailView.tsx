import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  CalendarDays,
  Clock,
  FileText,
  Globe,
  Languages,
  MapPin,
  Printer,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getJobDepartment, type JobRecord } from "@/content/jobs";
import { JobThumbnail } from "@/components/jobs/JobThumbnail";

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[15px] leading-relaxed text-foreground/90 sm:text-[16px]">
          <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ContentSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 first:mt-0">
      <h2 className="text-[22px] font-bold leading-tight text-foreground sm:text-[26px]">{title}</h2>
      {children}
    </section>
  );
}

function SidebarField({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="flex gap-3 border-b border-line py-4 first:pt-0 last:border-b-0 last:pb-0">
      <Icon className="mt-0.5 size-4 shrink-0 text-muted-fg" strokeWidth={1.75} aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-muted-fg">{label}</p>
        <p className="mt-1 text-[14px] font-semibold leading-snug text-foreground">{value}</p>
      </div>
    </div>
  );
}

function LanguagePills({ languages }: { languages: string[] }) {
  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {languages.map((lang) => (
        <span
          key={lang}
          className="rounded-full border border-line bg-background px-3 py-1 text-[12px] font-semibold text-foreground"
        >
          {lang}
        </span>
      ))}
    </div>
  );
}

export function JobDetailView({ job }: { job: JobRecord }) {
  const department = getJobDepartment(job);
  const applyHref = `mailto:${job.applyEmail}?subject=${encodeURIComponent(`Internship Application — ${job.title}`)}`;

  return (
    <>
      <section className="border-b border-line bg-surface/40 py-8 lg:py-10">
        <div className="container-wbc">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-[14px] font-semibold text-muted-fg transition-colors hover:text-navy"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            All internships
          </Link>
          <p className="mt-6 text-[12px] font-bold tracking-[0.16em] text-orange uppercase">Internship</p>
          <h1 className="mt-2 max-w-4xl text-[28px] font-bold leading-tight text-foreground sm:text-[36px] lg:text-[40px]">
            {department}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <JobThumbnail job={job} size="sm" />
            <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1 text-[12px] font-semibold text-foreground">
              <MapPin className="size-3.5 text-orange" aria-hidden="true" />
              Remote
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-background px-3 py-1 text-[12px] font-semibold text-foreground">
              <Clock className="size-3.5 text-orange" aria-hidden="true" />
              Part-time
            </span>
            <span className="inline-flex items-center rounded-full border border-line bg-background px-3 py-1 text-[12px] font-semibold text-foreground">
              {job.positionsAvailable} {job.positionsAvailable === 1 ? "opening" : "openings"}
            </span>
            <span className="inline-flex items-center rounded-full bg-navy/8 px-3 py-1 text-[12px] font-semibold text-navy">
              Voluntary / Unpaid
            </span>
            </div>
          </div>
          <p className="mt-4 text-[14px] font-medium text-muted-fg">
            <span className="font-semibold text-foreground">Published:</span> {job.publishedDate}
            <span className="mx-2 text-line">·</span>
            <span className="font-semibold text-foreground">Application deadline:</span> {job.applicationDeadline}
          </p>
        </div>
      </section>

      <section className="pb-28 pt-10 lg:pb-32 lg:pt-12">
        <div className="container-wbc">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="min-w-0">
              <ContentSection title="About World Business Council (WBC)">
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg text-justify sm:text-[17px]">
                  The World Business Council (WBC) is an international business support organization connecting
                  businesses, professionals, and institutions worldwide. Internships offer practical experience in a
                  remote, collaborative environment focused on global business cooperation.
                </p>
              </ContentSection>

              <ContentSection title="Job Summary">
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg text-justify sm:text-[17px]">{job.description}</p>
              </ContentSection>

              <ContentSection title="Key Responsibilities">
                <BulletList items={job.responsibilities} />
              </ContentSection>

              <ContentSection title="Qualifications">
                <BulletList items={job.requirements} />
              </ContentSection>

              <ContentSection title="What WBC Offers">
                <BulletList items={job.offers} />
              </ContentSection>

              <ContentSection title="Working Arrangement">
                <p className="mt-4 text-[16px] font-semibold text-foreground">{job.workingArrangement}</p>
                <p className="mt-3 text-[16px] leading-relaxed text-muted-fg">{job.workingArrangementNote}</p>
              </ContentSection>

              <ContentSection title="Submission Guidelines">
                <p className="mt-4 text-[16px] leading-relaxed text-muted-fg">
                  Send your CV/resume and a short motivation letter to{" "}
                  <a href={applyHref} className="font-semibold text-blue transition-colors hover:text-navy">
                    {job.applyEmail}
                  </a>
                  . Please include the internship title in the subject line of your email.
                </p>
              </ContentSection>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-card border border-line bg-surface p-5 sm:p-6">
                <h2 className="text-[14px] font-bold tracking-[0.1em] text-foreground uppercase">Position Details</h2>

                <div className="mt-4">
                  <SidebarField icon={CalendarDays} label="Published Date" value={job.publishedDate} />
                  <SidebarField icon={CalendarDays} label="Application Deadline" value={job.applicationDeadline} />
                  <SidebarField icon={CalendarDays} label="Status" value="Open" />
                  <SidebarField icon={FileText} label="Reference" value={`WBC-INT-${job.slug.toUpperCase().replace(/-/g, "")}`} />
                  <SidebarField
                    icon={Users}
                    label="Number of Vacancies"
                    value={`${job.positionsAvailable} ${job.positionsAvailable === 1 ? "position" : "positions"}`}
                  />
                  <SidebarField icon={Briefcase} label="Announcement Type" value={job.announcementType} />
                  <SidebarField icon={MapPin} label="Work Type" value={job.workType} />
                  <SidebarField icon={Banknote} label="Compensation" value={job.compensation} />
                  <SidebarField icon={Clock} label="Duration" value="6 months" />
                  <SidebarField icon={CalendarDays} label="Contract Extension" value="Possible" />
                  <SidebarField icon={Globe} label="Functional Area" value={department} />

                  <div className="flex gap-3 border-b border-line py-4 last:border-b-0">
                    <Languages className="mt-0.5 size-4 shrink-0 text-muted-fg" strokeWidth={1.75} aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-[12px] font-medium text-muted-fg">Languages</p>
                      <LanguagePills languages={job.languages} />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <div className="pointer-events-none fixed inset-x-0 bottom-6 z-40 flex justify-center px-4">
        <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-navy-deep px-2 py-2 shadow-lg sm:gap-3 sm:px-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex size-10 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Print job details"
          >
            <Printer className="size-4" aria-hidden="true" />
          </button>
          <a
            href={applyHref}
            className="inline-flex h-10 items-center justify-center rounded-full bg-white px-5 text-[14px] font-bold text-navy transition-colors hover:bg-white/90 sm:px-6"
          >
            Apply now
          </a>
        </div>
      </div>
    </>
  );
}
