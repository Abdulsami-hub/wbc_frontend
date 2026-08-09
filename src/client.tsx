import { StrictMode, startTransition } from "react";
import { createRoot } from "react-dom/client";
import { StartClient } from "@tanstack/react-start/client";

/**
 * Static hosting entry: mount with createRoot so we don't need SSR HTML hydration.
 * Used when the site is deployed from `dist/` without a Node server.
 */
const mount = () => {
  startTransition(() => {
    createRoot(document).render(
      <StrictMode>
        <StartClient />
      </StrictMode>,
    );
  });
};

mount();
