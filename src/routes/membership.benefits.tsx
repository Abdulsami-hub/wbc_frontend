import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/membership/benefits")({
  beforeLoad: () => {
    throw redirect({ to: "/membership", hash: "benefits" });
  },
});
