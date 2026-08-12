import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/affiliates")({
  component: AffiliatesLayout,
});

function AffiliatesLayout() {
  return <Outlet />;
}
