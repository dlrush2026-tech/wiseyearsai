import { createFileRoute, redirect } from "@tanstack/react-router";

// Legacy URL redirect — old /events links now resolve to /live-classes.
export const Route = createFileRoute("/events")({
  beforeLoad: () => {
    throw redirect({ to: "/live-classes" });
  },
});
