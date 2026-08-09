import { StrictMode, startTransition } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { getRouter } from "./router";

/**
 * Static-hosting entry (no SSR document).
 * Avoids StartClient/hydrate, which requires window.$_TSR bootstrap data
 * that only exists in server-rendered HTML.
 */
function mount() {
  const router = getRouter();
  const el = document.getElementById("root");
  if (!el) throw new Error('Missing #root element in index.html');

  startTransition(() => {
    createRoot(el).render(
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>,
    );
  });
}

mount();
