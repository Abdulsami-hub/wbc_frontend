import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/global-network")({
  component: GlobalNetworkLayout,
});

function GlobalNetworkLayout() {
  return <Outlet />;
}
