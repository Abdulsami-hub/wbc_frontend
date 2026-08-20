import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    // Disabled: scroll restoration + input focus scroll-into-view froze Contact
    // (Playwright click on #name hung after "done scrolling" on production builds).
    scrollRestoration: false,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
