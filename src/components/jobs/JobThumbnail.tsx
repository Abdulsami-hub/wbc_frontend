import { Briefcase } from "lucide-react";
import logoNavy from "@/assets/wbc-logo.png";
import { getJobDepartment, type JobRecord } from "@/content/jobs";

function getInitials(text: string) {
  return text
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

/** WBC logo in a polished frame, or a branded gradient thumbnail when no logo is provided. */
export function JobThumbnail({ job, size = "md" }: { job: JobRecord; size?: "sm" | "md" | "compact" }) {
  const department = getJobDepartment(job);
  const sizeClass =
    size === "compact"
      ? "size-14 sm:size-16"
      : size === "sm"
        ? "size-14 sm:size-16"
        : "size-16 sm:size-[72px]";
  const logoSrc = job.logo?.trim() ? job.logo : job.logo === "" ? null : logoNavy;

  if (logoSrc) {
    if (size === "compact") {
      return (
        <div
          className={`${sizeClass} flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white p-1.5 sm:rounded-xl sm:p-2`}
        >
          <img src={logoSrc} alt="" className="h-full w-full object-contain" />
        </div>
      );
    }

    return (
      <div
        className={`${sizeClass} relative shrink-0 overflow-hidden rounded-xl border border-line bg-white p-2 shadow-sm transition-shadow duration-300 group-hover:shadow-md sm:rounded-2xl sm:p-2.5`}
      >
        <img src={logoSrc} alt="" className="relative h-full w-full object-contain" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} relative shrink-0 overflow-hidden rounded-xl border border-white/20 shadow-sm sm:rounded-2xl`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy to-[#1a3a6b]" />
      <div className="absolute -end-4 -top-4 size-16 rounded-full bg-orange/25 blur-xl" />
      <div className="absolute -bottom-3 -start-3 size-14 rounded-full bg-teal/20 blur-lg" />
      <div className="relative flex h-full flex-col items-center justify-center gap-1 p-2 text-center">
        <span className="inline-flex size-8 items-center justify-center rounded-lg bg-white/10 backdrop-blur-sm">
          <Briefcase className="size-4 text-orange" strokeWidth={2} />
        </span>
        <span className="font-display text-[11px] font-bold tracking-[0.12em] text-white/90 sm:text-[12px]">
          {getInitials(department)}
        </span>
      </div>
    </div>
  );
}
