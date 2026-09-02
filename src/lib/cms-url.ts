export type ResolvedCmsUrl =
  | { kind: "internal"; path: string }
  | { kind: "external"; href: string; newTab: boolean };

const STATIC_INTERNAL_HOSTS = new Set(["wbccme.org", "localhost", "127.0.0.1"]);

function internalHosts(): Set<string> {
  const hosts = new Set(STATIC_INTERNAL_HOSTS);
  if (typeof window !== "undefined") {
    hosts.add(window.location.hostname.replace(/^www\./, ""));
  }
  return hosts;
}

function normalizeInternalPath(path: string): string {
  let normalized = path.trim();
  if (!normalized.startsWith("/")) normalized = `/${normalized}`;
  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }
  return normalized || "/";
}

function resolveParsedUrl(parsed: URL, fallback: string): ResolvedCmsUrl {
  const host = parsed.hostname.replace(/^www\./, "");
  if (internalHosts().has(host)) {
    const path = `${parsed.pathname}${parsed.search}${parsed.hash}` || "/";
    return { kind: "internal", path: normalizeInternalPath(path) };
  }
  return { kind: "external", href: parsed.toString(), newTab: true };
}

/** Resolve admin/CMS URLs to internal SPA paths or external links. */
export function resolveCmsUrl(raw: string, fallback = "/"): ResolvedCmsUrl {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { kind: "internal", path: normalizeInternalPath(fallback) };
  }

  if (trimmed.startsWith("//")) {
    try {
      return resolveParsedUrl(new URL(`https:${trimmed}`), fallback);
    } catch {
      return { kind: "internal", path: normalizeInternalPath(fallback) };
    }
  }

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      return resolveParsedUrl(new URL(trimmed), fallback);
    } catch {
      return { kind: "external", href: trimmed, newTab: true };
    }
  }

  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) {
    return { kind: "external", href: trimmed, newTab: false };
  }

  return { kind: "internal", path: normalizeInternalPath(trimmed) };
}
