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
const cssEntry = files.find((f) => /^styles-.*\.css$/.test(f));

if (!jsEntry || !cssEntry) {
  console.error("Could not find hashed index JS / styles CSS.");
  process.exit(1);
}

if (!existsSync(join(staging, "index.html"))) {
  writeFileSync(
    join(staging, "index.html"),
    `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>World Business Council</title>
    <meta
      name="description"
      content="Building a global network that empowers businesses through collaboration, innovation, and trust."
    />
    <meta name="theme-color" content="#1a3a5c" />
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="apple-touch-icon" href="/wbc-mark.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <meta property="og:site_name" content="World Business Council" />
    <meta property="og:title" content="World Business Council" />
    <meta
      property="og:description"
      content="Building a global network that empowers businesses through collaboration, innovation, and trust."
    />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/og-image.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="World Business Council" />
    <meta
      name="twitter:description"
      content="Building a global network that empowers businesses through collaboration, innovation, and trust."
    />
    <meta name="twitter:image" content="/og-image.png" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Michroma&display=swap"
    />
    <link rel="stylesheet" crossorigin href="/assets/${cssEntry}" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" crossorigin src="/assets/${jsEntry}"></script>
  </body>
</html>
`,
  );
}

writeFileSync(
  join(staging, "vercel.json"),
  `${JSON.stringify({ rewrites: [{ source: "/(.*)", destination: "/index.html" }] }, null, 2)}\n`,
);

rmSync(dist, { recursive: true, force: true });
renameSync(staging, dist);

console.log(`Static site ready: dist/index.html (js=${jsEntry}, css=${cssEntry})`);
