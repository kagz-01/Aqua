import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  Fish,
  PackageCheck,
  QrCode,
  Receipt,
  Thermometer,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { AppShell } from "@/components/aqua/shell";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAquaRole, type AquaRole } from "@/lib/aqua/role";
import { getMyAquaRole } from "@/lib/aqua/market";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

const DASHBOARDS: Record<
  AquaRole,
  { eyebrow: string; title: string; description: string; links: { to: string; label: string; detail: string; icon: LucideIcon }[] }
> = {
  owner: {
    eyebrow: "Owner dashboard",
    title: "Keep the whole fish house in view.",
    description: "Sales, payments, customer orders, reports, and staff access in one owner workspace.",
    links: [
      { to: "/app/", label: "Business pulse", detail: "Sales totals, stock value, and reorder watch.", icon: Wallet },
      { to: "/app/orders", label: "Customer orders", detail: "Review requests and move them toward pickup.", icon: PackageCheck },
      { to: "/app/payments", label: "Payments", detail: "Review cash and M-Pesa records.", icon: Wallet },
      { to: "/app/reports", label: "Reports", detail: "Review performance and export sales.", icon: ClipboardList },
      { to: "/app/team", label: "Team access", detail: "Approve staff workspace access.", icon: Users },
    ],
  },
  manager: {
    eyebrow: "House manager dashboard",
    title: "Keep every landing and cold hold moving.",
    description: "Receive stock, watch cold-chain conditions, trace batches, and coordinate customer pickups.",
    links: [
      { to: "/app/inventory", label: "Fish inventory", detail: "Check quantities, prices, and reorder lines.", icon: Fish },
      { to: "/app/orders", label: "Customer orders", detail: "Confirm availability and prepare pickups.", icon: PackageCheck },
      { to: "/app/batches", label: "Catch traceability", detail: "Follow each landing’s batch trail.", icon: QrCode },
      { to: "/app/suppliers", label: "Suppliers", detail: "Keep landing rings and sourcing details current.", icon: Boxes },
      { to: "/app/cold-chain", label: "Cold chain", detail: "Review temperature and scale readings.", icon: Thermometer },
    ],
  },
  floor: {
    eyebrow: "Sales attendant dashboard",
    title: "Serve the next customer quickly.",
    description: "Build a sale, record the counter, and keep the customer’s receipt and catch trail together.",
    links: [
      { to: "/app/sales", label: "Open the sales till", detail: "Choose fish, weigh quantities, and record a sale.", icon: Receipt },
      { to: "/app/customers", label: "Customer counters", detail: "Find the customer for a sale.", icon: Users },
      { to: "/app/batches", label: "Batch lookup", detail: "Show a customer the origin of a catch.", icon: QrCode },
    ],
  },
};

const ROLE_PATH: Record<AquaRole, string> = {
  owner: "/staff/owner",
  manager: "/staff/housemanager",
  floor: "/staff/attendant",
};

export function StaffDashboard({ role }: { role: AquaRole }) {
  const navigate = useNavigate();
  const { user, isPending } = useCurrentUserState();
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";
  const demoSetRole = useAquaRole((state) => state.setRole);
  const access = useQuery({
    queryKey: ["aqua-staff-role", user?.id],
    queryFn: () => getMyAquaRole(),
    enabled: !demoMode && !isPending && Boolean(user),
  });
  const dashboard = DASHBOARDS[role];

  useEffect(() => {
    if (demoMode) {
      demoSetRole(role);
      return;
    }
    if (!isPending && !user) {
      void navigate({ to: "/login", search: { next: ROLE_PATH[role] }, replace: true });
    } else if (access.data && access.data !== role) {
      void navigate({ to: ROLE_PATH[access.data], replace: true });
    } else if (access.data === null) {
      void navigate({ to: "/client", replace: true });
    }
  }, [demoMode, demoSetRole, role, isPending, user, access.data, navigate]);

  if (!demoMode && (isPending || access.isLoading || !user)) {
    return <main className="grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted">Checking staff access…</main>;
  }
  if (!demoMode && access.isError) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6">
        <Card className="max-w-md">
          <h1 className="font-display text-2xl italic text-plum-deep">Could not verify access</h1>
          <p className="mt-2 text-sm text-muted">This staff workspace stays locked until access is confirmed.</p>
          <Button className="mt-4" onClick={() => void access.refetch()}>Retry</Button>
        </Card>
      </main>
    );
  }
  if (!demoMode && access.data !== role) {
    return <main className="grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted">Opening your workspace…</main>;
  }

  return (
    <AppShell role={role}>
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">{dashboard.eyebrow}</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl italic text-plum-deep sm:text-5xl">
          {dashboard.title}
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">{dashboard.description}</p>
        <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {dashboard.links.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className="group rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-lilac-soft text-plum">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-xl italic text-plum-deep">{item.label}</h2>
                <p className="mt-1 text-sm leading-5 text-muted">{item.detail}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-plum">
                  Open
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-7">
          <Button asChild variant="ghost" size="sm">
            <Link to="/staff">Switch staff workspace</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
