import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/membership")({
  component: MembershipLayout,
});

function MembershipLayout() {
  return <Outlet />;
}
