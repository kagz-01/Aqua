import { useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowRight,
  Boxes,
  ClipboardList,
  Fish,
  HandCoins,
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
  {
    eyebrow: string;
    title: string;
    description: string;
    links: { to: string; label: string; detail: string; icon: LucideIcon }[];
  }
> = {
  owner: {
    eyebrow: "Owner",
    title: "See how the fish business is doing.",
    description: "Check sales, payments, shop orders, reports, and who can use the staff system.",
    links: [
      {
        to: "/app/",
        label: "Business overview",
        detail: "See today's sales, money owed, and fish running low.",
        icon: Wallet,
      },
      {
        to: "/app/orders",
        label: "Shop orders",
        detail: "Check orders and follow them through to pickup.",
        icon: PackageCheck,
      },
      {
        to: "/app/payments",
        label: "Check payments",
        detail: "See cash and M-Pesa payments that need checking.",
        icon: Wallet,
      },
      {
        to: "/app/reports",
        label: "Reports",
        detail: "Check sales and download the sales list.",
        icon: ClipboardList,
      },
      {
        to: "/app/team",
        label: "Staff access",
        detail: "Choose what each staff member can do.",
        icon: Users,
      },
    ],
  },
  manager: {
    eyebrow: "House manager",
    title: "Receive fish and keep orders moving.",
    description:
      "Record fish from fishers, check stock and temperatures, and get shop orders ready for pickup.",
    links: [
      {
        to: "/app/inventory",
        label: "Fish stock",
        detail: "See how much fish is available and what is running low.",
        icon: Fish,
      },
      {
        to: "/app/orders",
        label: "Shop orders",
        detail: "Confirm orders, prepare fish, and mark them ready.",
        icon: PackageCheck,
      },
      {
        to: "/app/batches",
        label: "Fish journey",
        detail: "See where each fish came from and where it went.",
        icon: QrCode,
      },
      {
        to: "/app/suppliers",
        label: "Fishers & suppliers",
        detail: "Keep fisher details and delivery records up to date.",
        icon: Boxes,
      },
      {
        to: "/app/cold-chain",
        label: "Temperature & weighing",
        detail: "Check cold-room temperatures and record fish weights.",
        icon: Thermometer,
      },
    ],
  },
  floor: {
    eyebrow: "Sales attendant",
    title: "Serve customers and hand over orders.",
    description: "Weigh fish, record what the customer pays, and prepare shop orders for pickup.",
    links: [
      {
        to: "/app/sales",
        label: "Record a sale",
        detail: "Choose the fish, enter the weight, and record payment.",
        icon: Receipt,
      },
      {
        to: "/app/orders",
        label: "Shop order pickups",
        detail: "Hand over ready orders and give customers a receipt.",
        icon: PackageCheck,
      },
      {
        to: "/app/customers",
        label: "Customers",
        detail: "Choose who is buying the fish.",
        icon: Users,
      },
      {
        to: "/app/batches",
        label: "Fish journey",
        detail: "Show where a fish came from.",
        icon: QrCode,
      },
    ],
  },
  accounts: {
    eyebrow: "Accounts",
    title: "Keep track of every payment.",
    description: "Check customer payments, see what is owed to fishers, and review sales reports.",
    links: [
      {
        to: "/app/payments",
        label: "Check payments",
        detail: "Check cash and M-Pesa payments against receipts.",
        icon: Wallet,
      },
      {
        to: "/app/suppliers",
        label: "Money owed to fishers",
        detail: "See delivery costs, outstanding amounts, and payments made.",
        icon: HandCoins,
      },
      {
        to: "/app/reports",
        label: "Sales reports",
        detail: "Review daily and weekly sales or download the sales list.",
        icon: ClipboardList,
      },
    ],
  },
};

const ROLE_PATH: Record<AquaRole, string> = {
  owner: "/staff/owner",
  manager: "/staff/housemanager",
  floor: "/staff/attendant",
  accounts: "/staff/accounts",
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
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted">
        Checking your staff access…
      </main>
    );
  }
  if (!demoMode && access.isError) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6">
        <Card className="max-w-md">
          <h1 className="font-display text-2xl italic text-plum-deep">
            We could not check your access
          </h1>
          <p className="mt-2 text-sm text-muted">
            This page stays locked until we can confirm you are allowed to use it.
          </p>
          <Button className="mt-4" onClick={() => void access.refetch()}>
            Try again
          </Button>
        </Card>
      </main>
    );
  }
  if (!demoMode && access.data !== role) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted">
        Opening your staff page…
      </main>
    );
  }

  return (
    <AppShell role={role}>
      <div>
        <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
          {dashboard.eyebrow}
        </p>
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
            <Link to="/staff">Choose another staff role</Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
