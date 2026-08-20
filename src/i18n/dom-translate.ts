import type { LangCode } from "./languages";

type TMap = Record<string, string>;

const LOADERS: Record<Exclude<LangCode, "en">, () => Promise<{ default: TMap }>> = {
  fr: () => import("./generated/fr.json"),
  es: () => import("./generated/es.json"),
  ar: () => import("./generated/ar.json"),
  zh: () => import("./generated/zh.json"),
  ru: () => import("./generated/ru.json"),
};

const cache = new Map<string, TMap>();

export async function loadMap(lang: LangCode): Promise<TMap | null> {
  if (lang === "en") return null;
  const cached = cache.get(lang);
  if (cached) return cached;
  const loader = LOADERS[lang];
  if (!loader) return null;
  try {
    const mod = await loader();
    const map = (mod.default ?? mod) as TMap;
    cache.set(lang, map);
    return map;
  } catch {
    return null;
  }
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE", "INPUT"]);
const ATTRS = ["aria-label", "placeholder", "alt", "title"] as const;

const originalText = new WeakMap<Text, string>();
const originalAttr = new WeakMap<Element, Record<string, string>>();

function translateTextNode(node: Text, map: TMap | null) {
  const stored = originalText.get(node);
  const source = stored ?? node.nodeValue ?? "";
  const key = source.trim();
  if (!key) return;
  if (!map) {
    if (stored !== undefined && node.nodeValue !== stored) node.nodeValue = stored;
    return;
  }
  const hit = map[key];
  if (!hit) return;
  if (stored === undefined) originalText.set(node, source);
  const lead = source.slice(0, source.indexOf(key[0]!));
  const trail = source.slice(source.indexOf(key[0]!) + key.length);
  const next = `${lead}${hit}${trail}`;
  if (node.nodeValue !== next) node.nodeValue = next;
}

function translateAttributes(el: Element, map: TMap | null) {
  const stored = originalAttr.get(el);
  for (const attr of ATTRS) {
    const source = stored?.[attr] ?? el.getAttribute(attr);
    if (!source) continue;
    if (!map) {
      if (stored?.[attr] !== undefined && el.getAttribute(attr) !== stored[attr]) {
        el.setAttribute(attr, stored[attr]!);
      }
      continue;
    }
    const hit = map[source.trim()];
    if (!hit) continue;
    const next = { ...(stored ?? {}) };
    if (next[attr] === undefined) next[attr] = source;
    originalAttr.set(el, next);
    if (el.getAttribute(attr) !== hit) el.setAttribute(attr, hit);
  }
}

export function translateTree(root: Node, map: TMap | null) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = (root as Text).parentElement;
    if (
      parent &&
      !SKIP_TAGS.has(parent.tagName) &&
      !parent.closest("svg") &&
      !parent.closest("[data-no-translate]") &&
      !parent.closest("[role='dialog']")
    ) {
      translateTextNode(root as Text, map);
    }
    return;
  }
  if (!(root instanceof Element) && root.nodeType !== Node.DOCUMENT_NODE) return;

  const el = root as Element;
  if (el instanceof Element) {
    if (
      SKIP_TAGS.has(el.tagName) ||
      el.closest("svg") ||
      el.closest("[data-no-translate]") ||
      el.closest("[role='dialog']")
    ) {
      return;
    }
    translateAttributes(el, map);
    el.querySelectorAll("[aria-label],[placeholder],[alt],[title]").forEach((child) => {
      if (
        !child.closest("svg") &&
        !child.closest("[data-no-translate]") &&
        !child.closest("[role='dialog']")
      ) {
        translateAttributes(child, map);
      }
    });
  }

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const parent = node.parentElement;
    if (
      !parent ||
      SKIP_TAGS.has(parent.tagName) ||
      parent.closest("svg") ||
      parent.closest("[data-no-translate]") ||
      parent.closest("[role='dialog']")
    ) {
      continue;
    }
    translateTextNode(node, map);
  }
}

/**
 * One-shot translation on language change only.
 * Do NOT attach a MutationObserver — watching body mutations while dialogs /
 * RemoveScroll / dropdowns update the DOM has frozen the tab in production.
 */
export function applyDocumentTranslation(map: TMap | null) {
  translateTree(document.body, map);
  return () => {};
}
