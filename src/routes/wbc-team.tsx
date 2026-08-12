import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/wbc-team")({
  component: WbcTeamLayout,
});

function WbcTeamLayout() {
  return <Outlet />;
}
