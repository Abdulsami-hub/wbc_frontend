import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StartClient } from "@tanstack/react-start/client";
import { getRouter } from "./router";

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
        <StrictMode>
          <RouterProvider router={router} />
        </StrictMode>,
      );
    });
    return;
  }

  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
}

try {
  mount();
} catch (error) {
  console.error("[WBC] Client bootstrap failed:", error);
}

void import("./lib/image-cache").then((m) => {
  // Clear any previously installed SW that could leave stale freeze-prone clients.
  m.unregisterImageCache?.();
});
