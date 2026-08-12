import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wbc-team/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/wbc-team" });
  },
});
