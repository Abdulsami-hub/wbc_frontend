import { startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StartClient } from "@tanstack/react-start/client";
import { getRouter } from "./router";
import { unregisterImageCache } from "./lib/image-cache";
import "./styles.css";

// Clear leftover image-cache SW from older deploys before React mounts.
unregisterImageCache();

const router = getRouter();

/**
 * Dual entry:
 * - Static `dist/index.html`: mount into `#root` with RouterProvider.
 * - Dev / SSR (TanStack Start): hydrate the full document via StartClient.
 */
function mount() {
  const rootEl = document.getElementById("root");

  if (rootEl) {
    startTransition(() => {
      createRoot(rootEl).render(<RouterProvider router={router} />);
    });
    return;
  }

  startTransition(() => {
    hydrateRoot(document, <StartClient />);
  });
}

try {
  mount();
} catch (error) {
  console.error("[WBC] Client bootstrap failed:", error);
}
