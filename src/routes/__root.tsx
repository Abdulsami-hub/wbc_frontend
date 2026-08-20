import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { type ReactNode } from "react";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AdvertisingOpportunities } from "@/components/AdvertisingOpportunities";
import { I18nProvider } from "@/i18n";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Document shell for TanStack Start (`hydrateRoot(document)` / SSR only).
 *
 * CRITICAL (React 19): never render <html>/<body>/<head> under
 * createRoot(#root). That creates HostSingleton fibers whose container is
 * div#root while selectionchange targets #document — infinite loop →
 * Chrome "Page Unresponsive" on any input/textarea focus.
 *
 * Static SPA index.html already has the real document; shell must be a no-op.
 */
function RootShell({ children }: { children: ReactNode }) {
  const spaMount =
    typeof document !== "undefined" && document.getElementById("root") !== null;

  if (spaMount) {
    return children;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>World Business Council</title>
      </head>
      <body>{children}</body>
    </html>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:start-2 focus:z-[60] focus:rounded focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Outlet />
          {pathname !== "/advertising" &&
          pathname !== "/contact" &&
          pathname !== "/become-a-member" ? (
            <AdvertisingOpportunities />
          ) : null}
        </main>
        <Footer />
      </I18nProvider>
    </QueryClientProvider>
  );
}
