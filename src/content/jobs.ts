export type JobRecord = {
  slug: string;
  title: string;
  positionsAvailable: number;
  intro: string;
  description: string;
  aboutCompany: string;
  responsibilities: string[];
  requirements: string[];
  duration: string;
  offers: string[];
  workingArrangement: string;
  workingArrangementNote: string;
  submissionGuidelines: string;
  applyEmail: string;
  announcementType: string;
  workType: string;
  compensation: string;
  languages: string[];
  /** Optional role-specific logo URL; falls back to branded thumbnail */
  logo?: string;
  publishedDate: string;
  applicationDeadline: string;
  status: string;
  reference: string;
  contractExtension: string;
  functionalArea: string;
};

export function getJobDepartment(job: JobRecord): string {
  if (job.functionalArea.trim()) return job.functionalArea.trim();
  return job.title.replace(/\s*-\s*Internship$/i, "").trim();
}

/** Compact label for cards, e.g. "30 Sep, 2026". */
export function formatJobDateShort(date: string): string {
  if (!date) return "";

  const iso = /^\d{4}-\d{2}-\d{2}$/.test(date) ? `${date}T00:00:00` : null;
  if (iso) {
    const parsed = new Date(iso);
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }).format(parsed);
    }
  }

  const parts = date.trim().split(/\s+/);
  if (parts.length < 3) return date;
  const [day, month, year] = parts;
  return `${day} ${month.slice(0, 3)}, ${year}`;
}

export function formatJobDateLong(date: string): string {
  if (!date) return "";

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsed = new Date(`${date}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(parsed);
    }
  }

  return date;
}
