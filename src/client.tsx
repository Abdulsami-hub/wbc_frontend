import { startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StartClient } from "@tanstack/react-start/client";
import { getRouter } from "./router";
import { unregisterImageCache } from "./lib/image-cache";

// Run before React mounts so stale production SW / caches cannot serve freeze-prone clients.
unregisterImageCache();

const router = getRouter();

/**
 * Dual entry:
 * - Dev / SSR: hydrate the full document via StartClient (TanStack Start shell).
 * - Static `dist/index.html`: mount into `#root` with RouterProvider (no `$_TSR` bootstrap).
 */
function mount() {
  const rootEl = document.getElementById("root");

  if (rootEl) {
    startTransition(() => {
      createRoot(rootEl).render(
        <RouterProvider router={router} />,
      );
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
