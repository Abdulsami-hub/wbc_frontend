#!/usr/bin/env node
import {
  existsSync,
  readdirSync,
  writeFileSync,
  rmSync,
  cpSync,
  mkdirSync,
  renameSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "dist");
const clientDir = join(dist, "client");

const assetsSource = existsSync(join(clientDir, "assets"))
  ? clientDir
  : existsSync(join(dist, "assets"))
    ? dist
    : null;

if (!assetsSource) {
  console.error("Missing dist client assets — run vite build first.");
  process.exit(1);
}

const staging = join(root, ".dist-static-tmp");
if (existsSync(staging)) rmSync(staging, { recursive: true, force: true });
mkdirSync(staging, { recursive: true });
cpSync(assetsSource, staging, { recursive: true });

const assetsDir = join(staging, "assets");
const files = readdirSync(assetsDir);
const jsEntry = files.find((f) => /^index-.*\.js$/.test(f));
const cssEntry = files.find((f) => /^styles-.*\.css$/.test(f)) ?? files.find((f) => /\.css$/.test(f));
const buildStamp = new Date().toISOString();

if (!jsEntry) {
  console.error("Could not find hashed index JS in", assetsDir, files.filter((f) => f.endsWith(".js")).slice(0, 10));
  process.exit(1);
}

if (!cssEntry) {
  console.warn("No CSS entry found — continuing without stylesheet link.");
}

/** Runs before the app bundle so stale SW / caches cannot block the freeze fix. */
const SW_CLEANUP_SCRIPT = `<script>
(function () {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.getRegistrations().then(function (regs) {
    for (var i = 0; i < regs.length; i++) regs[i].unregister();
  });
  if ("caches" in window) {
    caches.keys().then(function (keys) {
      for (var i = 0; i < keys.length; i++) {
        if (keys[i].indexOf("wbc-images") === 0) caches.delete(keys[i]);
      }
    });
  }
})();
</script>`;

const cssLink = cssEntry
  ? `<link rel="stylesheet" crossorigin href="/assets/${cssEntry}" />`
  : "";

// Always emit a static SPA shell so index.html references the latest hashed assets
// and runs SW cleanup before the app bundle (critical for the production freeze fix).
const SITE_URL = (process.env.VITE_SITE_URL || "https://wbccme.org").replace(/\/$/, "");
const DEFAULT_DESC =
  "World Business Council (WBC) is an international business support organization connecting businesses, entrepreneurs, professionals, institutions, and business organizations worldwide.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

writeFileSync(
  join(staging, "index.html"),
  `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>World Business Council (WBC) | Global Business Network</title>
    <meta name="description" content="${DEFAULT_DESC}" />
    <meta name="developer" content="Abdul Sami Fazilyar" />
    <meta name="robots" content="index, follow" />
    <meta name="theme-color" content="#1a3a5c" />
    <link rel="canonical" href="${SITE_URL}/" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:site_name" content="World Business Council" />
    <meta property="og:title" content="World Business Council (WBC) | Global Business Network" />
    <meta property="og:description" content="${DEFAULT_DESC}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${SITE_URL}/" />
    <meta property="og:image" content="${OG_IMAGE}" />
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="World Business Council (WBC) | Global Business Network" />
    <meta name="twitter:description" content="${DEFAULT_DESC}" />
    <meta name="twitter:image" content="${OG_IMAGE}" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Michroma&display=swap"
    />
    <meta name="wbc-build" content="${buildStamp}" />
    ${cssLink}
  </head>
  <body>
    <div id="root"></div>
    ${SW_CLEANUP_SCRIPT}
    <script type="module" crossorigin src="/assets/${jsEntry}"></script>
  </body>
</html>
`,
);

writeFileSync(
  join(staging, "vercel.json"),
  `${JSON.stringify(
    {
      headers: [
        {
          source: "/index.html",
          headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
        },
        {
          source: "/assets/(.*)",
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        },
        {
          source: "/:path(.*)\\.(png|jpg|jpeg|webp|gif|svg|ico|avif)",
          headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
        },
        {
          source: "/image-cache-sw.js",
          headers: [{ key: "Cache-Control", value: "public, max-age=0, must-revalidate" }],
        },
      ],
      rewrites: [
        {
          source:
            "/((?!assets/|image-cache-sw.js|favicon\\.svg|favicon\\.ico|favicon-.*\\.png|apple-touch-icon\\.png|site\\.webmanifest|robots\\.txt|sitemap\\.xml|og-image\\.png).*)",
          destination: "/index.html",
        },
      ],
    },
    null,
    2,
  )}\n`,
);

// Drop SSR/server output — static hosts (cPanel/Vercel static) only need the client SPA.
rmSync(dist, { recursive: true, force: true });
renameSync(staging, dist);

// Guard: never ship a nested client/server layout that confuses uploads.
if (existsSync(join(dist, "client")) || existsSync(join(dist, "server"))) {
  console.error("dist still contains client/ or server/ — static flatten failed.");
  process.exit(1);
}

console.log(`Static SPA ready: dist/index.html (js=${jsEntry}, css=${cssEntry}, stamp=${buildStamp})`);
console.log(`VERIFY AFTER UPLOAD: View source must show meta wbc-build=${buildStamp} and script ${jsEntry}`);
