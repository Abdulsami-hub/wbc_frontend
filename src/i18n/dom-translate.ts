import type { LangCode } from "./languages";

type Map = Record<string, string>;

const LOADERS: Record<Exclude<LangCode, "en">, () => Promise<{ default: Map }>> = {
  fr: () => import("./generated/fr.json"),
  es: () => import("./generated/es.json"),
  de: () => import("./generated/de.json"),
  ar: () => import("./generated/ar.json"),
  zh: () => import("./generated/zh.json"),
  it: () => import("./generated/it.json"),
  tr: () => import("./generated/tr.json"),
  pt: () => import("./generated/pt.json"),
  ru: () => import("./generated/ru.json"),
};

const cache = new Map<string, Map>();

export async function loadMap(lang: LangCode): Promise<Map | null> {
  if (lang === "en") return null;
  const cached = cache.get(lang);
  if (cached) return cached;
  const loader = LOADERS[lang];
  if (!loader) return null;
  try {
    const mod = await loader();
    const map = (mod.default ?? mod) as Map;
    cache.set(lang, map);
    return map;
  } catch {
    return null;
  }
}

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA", "CODE", "PRE"]);
const ATTRS = ["aria-label", "placeholder", "alt", "title"] as const;

const originalText = new WeakMap<Text, string>();
const originalAttr = new WeakMap<Element, Record<string, string>>();

function translateTextNode(node: Text, map: Map | null) {
  const stored = originalText.get(node);
  const source = stored ?? node.nodeValue ?? "";
  const key = source.trim();
  if (!key) return;
  if (!map) {
    if (stored !== undefined) node.nodeValue = stored;
    return;
  }
  const hit = map[key];
  if (!hit) return;
  if (stored === undefined) originalText.set(node, source);
  const lead = source.slice(0, source.indexOf(key[0]!));
  const trail = source.slice(source.indexOf(key[0]!) + key.length);
  node.nodeValue = `${lead}${hit}${trail}`;
}

function translateAttributes(el: Element, map: Map | null) {
  const stored = originalAttr.get(el);
  for (const attr of ATTRS) {
    const source = stored?.[attr] ?? el.getAttribute(attr);
    if (!source) continue;
    if (!map) {
      if (stored?.[attr] !== undefined) el.setAttribute(attr, stored[attr]!);
      continue;
    }
    const hit = map[source.trim()];
    if (!hit) continue;
    const next = { ...(stored ?? {}) };
    if (next[attr] === undefined) next[attr] = source;
    originalAttr.set(el, next);
    el.setAttribute(attr, hit);
  }
}

export function translateTree(root: Node, map: Map | null) {
  if (root.nodeType === Node.TEXT_NODE) {
    const parent = (root as Text).parentElement;
    if (parent && !SKIP_TAGS.has(parent.tagName) && !parent.closest("svg")) {
      translateTextNode(root as Text, map);
    }
    return;
  }
  if (!(root instanceof Element) && root.nodeType !== Node.DOCUMENT_NODE) return;

  const el = root as Element;
  if (el instanceof Element) {
    if (SKIP_TAGS.has(el.tagName) || el.closest("svg")) return;
    translateAttributes(el, map);
    el.querySelectorAll("[aria-label],[placeholder],[alt],[title]").forEach((child) => {
      if (!child.closest("svg")) translateAttributes(child, map);
    });
  }

  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  while (walker.nextNode()) nodes.push(walker.currentNode as Text);
  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || SKIP_TAGS.has(parent.tagName) || parent.closest("svg")) continue;
    translateTextNode(node, map);
  }
}

let observer: MutationObserver | null = null;

/** Applies the language to the whole document and keeps future DOM updates translated. */
export function applyDocumentTranslation(map: Map | null) {
  observer?.disconnect();
  observer = null;
  translateTree(document.body, map);
  if (!map) return () => {};

  observer = new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((node) => translateTree(node, map));
      if (record.type === "characterData" && record.target.nodeType === Node.TEXT_NODE) {
        translateTree(record.target, map);
      }
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, characterData: true });

  return () => {
    observer?.disconnect();
    observer = null;
  };
}
