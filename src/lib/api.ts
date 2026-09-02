/** Public API base — set VITE_API_URL in `.env` for local backend. */
export const API_BASE = (
  import.meta.env.VITE_API_URL as string | undefined
)?.replace(/\/$/, "") ?? "https://api.wbccme.org";

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { etag?: string },
): Promise<{ data: T; etag: string | null; status: number }> {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.etag) {
    headers.set("If-None-Match", init.etag);
  }

  const res = await fetch(`${API_BASE}${path}`, { ...init, headers });

  if (res.status === 304) {
    return { data: null as T, etag: init?.etag ?? res.headers.get("ETag"), status: 304 };
  }

  if (!res.ok) {
    throw new Error(`API ${path} failed (${res.status})`);
  }

  const data = (await res.json()) as T;
  return { data, etag: res.headers.get("ETag"), status: res.status };
}
