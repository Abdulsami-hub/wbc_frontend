import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { StartClient } from "@tanstack/react-start/client";
import { getRouter } from "./router";

/**
 * Dual entry:
 * - Dev / SSR: hydrate the full document via StartClient (TanStack Start shell).
 * - Static `dist/index.html`: mount into `#root` with RouterProvider (no `$_TSR` bootstrap).
 */
function mount() {
  const rootEl = document.getElementById("root");

  if (rootEl) {
    const router = getRouter();
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

mount();
