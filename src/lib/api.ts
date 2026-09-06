/** Public API base — set VITE_API_URL in `.env` for local backend. */
export const API_BASE = (
  import.meta.env.VITE_API_URL as string | undefined
)?.replace(/\/$/, "") ?? "https://api.wbccme.org";

export class ApiError extends Error {
  readonly status: number;
  readonly path: string;

  constructor(path: string, status: number, message?: string) {
    super(message ?? `API ${path} failed (${status})`);
    this.name = "ApiError";
    this.path = path;
    this.status = status;
  }
}

export class ApiUnavailableError extends ApiError {
  constructor(path: string, status = 503) {
    super(
      path,
      status,
      "The World Business Council website is temporarily unavailable. Please try again in a few minutes.",
    );
    this.name = "ApiUnavailableError";
  }
}

export function isServiceUnavailableError(error: unknown): boolean {
  return (
    error instanceof ApiUnavailableError ||
    (error instanceof ApiError && (error.status === 503 || error.status === 502 || error.status === 504))
  );
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { etag?: string },
): Promise<{ data: T; etag: string | null; status: number }> {
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");
  if (init?.etag) {
    headers.set("If-None-Match", init.etag);
  }

  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, { ...init, headers });
  } catch {
    throw new ApiUnavailableError(path, 503);
  }

  if (res.status === 304) {
    return { data: null as T, etag: init?.etag ?? res.headers.get("ETag"), status: 304 };
  }

  if (res.status === 503 || res.status === 502 || res.status === 504) {
    throw new ApiUnavailableError(path, res.status);
  }

  if (!res.ok) {
    throw new ApiError(path, res.status);
  }

  const data = (await res.json()) as T;
  return { data, etag: res.headers.get("ETag"), status: res.status };
}
