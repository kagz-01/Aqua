import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppShell } from "@/components/aqua/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAquaRole } from "@/lib/aqua/role";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getMyAquaRole } from "@/lib/aqua/market";

export const Route = createFileRoute("/app")({
  component: StaffAccess,
});

function StaffAccess() {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";
  const demoRole = useAquaRole((state) => state.role);
  const role = useQuery({
    queryKey: ["aqua-staff-role", user?.id],
    queryFn: () => getMyAquaRole(),
    enabled: !demoMode && !isPending && Boolean(user),
  });

  useEffect(() => {
    if (demoMode) return;
    if (!isPending && !user) {
      void navigate({ to: "/login", search: { next: "/app" }, replace: true });
    } else if (role.data === null) {
      void navigate({ to: "/client", replace: true });
    }
  }, [demoMode, isPending, user, role.data, navigate]);

  if (demoMode) {
    return (
      <AppShell role={demoRole}>
        <Outlet />
      </AppShell>
    );
  }
  if (isPending || role.isLoading || !user) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted">
        Checking staff access…
      </main>
    );
  }
  if (role.isError) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6">
        <Card className="max-w-md">
          <h1 className="font-display text-2xl italic text-plum-deep">Could not verify access</h1>
          <p className="mt-2 text-sm text-muted">
            Please retry. Staff pages stay locked until access is confirmed.
          </p>
          <Button className="mt-4" onClick={() => void role.refetch()}>
            Retry
          </Button>
        </Card>
      </main>
    );
  }
  if (!role.data) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6">
        <Card className="max-w-md text-center">
          <h1 className="font-display text-2xl italic text-plum-deep">Staff access required</h1>
          <p className="mt-2 text-sm text-muted">Only staff with access can use these pages.</p>
          <Button asChild className="mt-4">
            <Link to="/client">Shop for fish</Link>
          </Button>
        </Card>
      </main>
    );
  }
  return (
    <AppShell role={role.data}>
      <Outlet />
    </AppShell>
  );
}
