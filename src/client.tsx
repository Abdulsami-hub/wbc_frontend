import { startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";
import { unregisterImageCache } from "./lib/image-cache";
import "./styles.css";

/**
 * Dual entry:
 * - Static `dist/index.html` has `#root` → pure SPA (RouterProvider only).
 * - `vite dev` / SSR has no `#root` → StartClient (lazy), so production static
 *   builds never execute Start head/scroll sync that freezes Chrome on focus.
 */
unregisterImageCache();

const rootEl = document.getElementById("root");

if (rootEl) {
  const router = getRouter();
  try {
    startTransition(() => {
      createRoot(rootEl).render(<RouterProvider router={router} />);
    });
  } catch (error) {
    console.error("[WBC] Client bootstrap failed:", error);
  }
} else {
  void import("@tanstack/react-start/client")
    .then(({ StartClient }) => {
      startTransition(() => {
        hydrateRoot(document, <StartClient />);
      });
    })
    .catch((error) => {
      console.error("[WBC] StartClient bootstrap failed:", error);
    });
}
