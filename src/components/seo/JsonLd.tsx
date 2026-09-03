/**
 * Renders JSON-LD for search engines. Uses a plain script tag (React 19-safe).
 * Only pass objects built from real page content — never invent facts.
 */
export function JsonLd({
  data,
}: {
  data: Record<string, unknown> | Record<string, unknown>[] | null;
}) {
  if (!data) return null;
  const payload = Array.isArray(data) ? data : data;
  return (
    <script
      type="application/ld+json"
      // JSON-LD must not be escaped as HTML text nodes incorrectly
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
