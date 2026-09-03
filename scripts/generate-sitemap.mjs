#!/usr/bin/env node
/**
 * Generates production sitemap.xml for https://wbccme.org
 * Fetches public CMS listings (news, events, jobs, affiliates) when API is reachable.
 * Always writes a valid sitemap with static routes as a fallback.
 */
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  const text = readFileSync(filePath, "utf8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq <= 0) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvFile(join(root, ".env.local"));
loadEnvFile(join(root, ".env"));

const SITE = (process.env.VITE_SITE_URL || process.env.SITE_URL || "https://wbccme.org").replace(
  /\/$/,
  "",
);
const API = (process.env.VITE_API_URL || process.env.API_URL || "https://api.wbccme.org").replace(
  /\/$/,
  "",
);

const STATIC_PATHS = [
  "/",
  "/who-we-are",
  "/what-we-do",
  "/governance",
  "/wbc-team",
  "/global-network",
  "/global-network/strategic-partners",
  "/affiliates",
  "/affiliate-guide",
  "/our-members",
  "/membership",
  "/become-a-member",
  "/events",
  "/news",
  "/jobs",
  "/contact",
  "/advertising",
];

function xmlEscape(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function urlEntry(loc, lastmod, changefreq = "weekly", priority = "0.7") {
  const parts = [`    <loc>${xmlEscape(loc)}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${xmlEscape(lastmod)}</lastmod>`);
  parts.push(`    <changefreq>${changefreq}</changefreq>`);
  parts.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${parts.join("\n")}\n  </url>`;
}

function toDate(value) {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
}

function isExpired(deadline) {
  if (!deadline) return false;
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(deadline) ? `${deadline}T23:59:59Z` : deadline);
  if (Number.isNaN(d.getTime())) return false;
  return d.getTime() < Date.now();
}

async function fetchJson(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(20000),
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

async function collectDynamic() {
  const urls = [];
  const today = new Date().toISOString().slice(0, 10);

  try {
    const news = await fetchJson("/api/news");
    for (const article of news?.data?.articles ?? []) {
      if (!article?.slug || article.is_active === false) continue;
      urls.push({
        loc: `${SITE}/news/${article.slug}`,
        lastmod: toDate(article.published_at) || today,
        changefreq: "monthly",
        priority: "0.8",
      });
    }
  } catch (err) {
    console.warn("sitemap: news fetch skipped:", err.message);
  }

  try {
    const events = await fetchJson("/api/events");
    for (const event of events?.data?.events ?? []) {
      if (!event?.slug || event.is_active === false) continue;
      urls.push({
        loc: `${SITE}/events/${event.slug}`,
        lastmod: today,
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  } catch (err) {
    console.warn("sitemap: events fetch skipped:", err.message);
  }

  try {
    const jobs = await fetchJson("/api/jobs");
    for (const job of jobs?.data?.listings ?? []) {
      if (!job?.slug || job.is_active === false) continue;
      if (isExpired(job.application_deadline || job.applicationDeadline)) continue;
      urls.push({
        loc: `${SITE}/jobs/${job.slug}`,
        lastmod: toDate(job.published_date || job.publishedDate) || today,
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  } catch (err) {
    console.warn("sitemap: jobs fetch skipped:", err.message);
  }

  try {
    const affiliates = await fetchJson("/api/affiliates");
    const regions = affiliates?.data?.regions ?? [];
    const slugs = new Set();

    for (const region of regions) {
      if (region?.slug) slugs.add(region.slug);
      for (const country of region?.countries ?? []) {
        if (country?.slug) slugs.add(country.slug);
        for (const city of country?.cities ?? []) {
          if (!city?.is_active && city?.is_active !== undefined) continue;
          const citySlug = city.public_slug || (country.slug && city.slug ? `${country.slug}-${city.slug}` : city.slug);
          if (citySlug) slugs.add(citySlug);
        }
      }
    }

    for (const slug of slugs) {
      urls.push({
        loc: `${SITE}/affiliates/${slug}`,
        lastmod: today,
        changefreq: "monthly",
        priority: "0.6",
      });
    }
  } catch (err) {
    console.warn("sitemap: affiliates fetch skipped:", err.message);
  }

  return urls;
}

function buildXml(entries) {
  const body = entries
    .map((e) => urlEntry(e.loc, e.lastmod, e.changefreq, e.priority))
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
}

async function main() {
  const today = new Date().toISOString().slice(0, 10);
  const staticEntries = STATIC_PATHS.map((path) => ({
    loc: `${SITE}${path === "/" ? "" : path}` || SITE,
    lastmod: today,
    changefreq: path === "/" ? "daily" : "weekly",
    priority: path === "/" ? "1.0" : path === "/news" || path === "/events" || path === "/jobs" ? "0.9" : "0.7",
  }));

  // Fix root loc
  staticEntries[0].loc = SITE + "/";

  const dynamic = await collectDynamic();
  const seen = new Set();
  const all = [];
  for (const entry of [...staticEntries, ...dynamic]) {
    const loc = entry.loc.replace(/\/$/, "") === SITE ? `${SITE}/` : entry.loc.replace(/\/$/, "");
    const normalized = loc === SITE ? `${SITE}/` : loc;
    if (seen.has(normalized)) continue;
    seen.add(normalized);
    all.push({ ...entry, loc: normalized === SITE ? `${SITE}/` : normalized });
  }

  const xml = buildXml(all);
  const targets = [join(root, "public", "sitemap.xml"), join(root, "dist", "sitemap.xml")];
  for (const target of targets) {
    const dir = dirname(target);
    if (!existsSync(dir) && target.includes(`${join("dist")}`)) continue; // dist may not exist yet
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    if (existsSync(dir)) {
      writeFileSync(target, xml);
      console.log(`Wrote ${target} (${all.length} URLs)`);
    }
  }

  // Always write public
  writeFileSync(join(root, "public", "sitemap.xml"), xml);
  console.log(`Sitemap ready: ${all.length} URLs → ${SITE}/sitemap.xml (API=${API})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
