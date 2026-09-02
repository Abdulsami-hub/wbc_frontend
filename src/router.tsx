import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 60_000,
        retry: 1,
      },
    },
  });

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Disabled: scroll restoration + input focus scroll-into-view froze Contact /
    // Membership / overlays on production builds (Chrome "Page Unresponsive").
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
