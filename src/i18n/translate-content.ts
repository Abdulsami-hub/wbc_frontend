type TMap = Record<string, string>;

const SKIP_KEY =
  /^(id|url|href|to|hash|path|slug|email|phone|icon|accent|image|logo|website|date|status|kind)$/i;
const SKIP_KEY_SUFFIX = /(Url|Href|Path|At|Id|Slug)$/;

function shouldSkipKey(key: string) {
  return SKIP_KEY.test(key) || SKIP_KEY_SUFFIX.test(key);
}

function shouldSkipValue(value: string) {
  const s = value.trim();
  if (!s) return true;
  if (/^https?:\/\//i.test(s) || s.startsWith("/") || s.startsWith("data:")) return true;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return true;
  if (/^#[0-9a-f]{3,8}$/i.test(s)) return true;
  return false;
}

export function translateValue<T>(value: T, map: TMap | null | undefined): T {
  if (!map || value == null) return value;
  if (typeof value === "string") {
    if (shouldSkipValue(value)) return value;
    return (map[value.trim()] ?? value) as T;
  }
  if (Array.isArray(value)) {
    return value.map((item) => translateValue(item, map)) as T;
  }
  if (typeof value === "object") {
    const input = value as Record<string, unknown>;
    const output: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(input)) {
      output[key] = shouldSkipKey(key) ? child : translateValue(child, map);
    }
    return output as T;
  }
  return value;
}
