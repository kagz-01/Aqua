import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Boxes,
  ClipboardList,
  Fish,
  LayoutDashboard,
  Menu,
  QrCode,
  Radio,
  Receipt,
  Scale,
  Thermometer,
  Users,
  Wallet,
} from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ROLE_META, useAquaRole, type AquaRole, canSeeFinance, canSeeReports } from "@/lib/aqua/role";

const NAV = [
  { to: "/app", label: "Pulse", icon: LayoutDashboard, end: true },
  { to: "/app/sales", label: "Sales floor", icon: Receipt },
  { to: "/app/inventory", label: "Ice hold", icon: Fish },
  { to: "/app/batches", label: "Batches", icon: QrCode },
  { to: "/app/customers", label: "Counters", icon: Users },
  { to: "/app/suppliers", label: "Landings", icon: Boxes },
  { to: "/app/payments", label: "M-Pesa", icon: Wallet, finance: true },
  { to: "/app/alerts", label: "Messaging desk", icon: Bell },
  { to: "/app/cold-chain", label: "Cold chain", icon: Thermometer },
  { to: "/app/reports", label: "Books", icon: ClipboardList, reports: true },
] as const;

function NavLinks({
  role,
  onNavigate,
  pathname,
}: {
  role: AquaRole;
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {NAV.filter((item) => {
        if ("finance" in item && item.finance && !canSeeFinance(role)) return false;
        if ("reports" in item && item.reports && !canSeeReports(role)) return false;
        return true;
      }).map((item) => {
        const active =
          "end" in item && item.end
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(`${item.to}/`);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors",
              active ? "bg-plum text-cream" : "text-ink-soft hover:bg-paper",
            )}
          >
            <Icon className="size-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role = useAquaRole((s) => s.role);
  const setRole = useAquaRole((s) => s.setRole);
  const [open, setOpen] = useState(false);
  const meta = ROLE_META[role];

  return (
    <div className="min-h-dvh bg-cream">
      <aside className="fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-cream-deep/40 p-4 lg:flex">
        <Link to="/" className="mb-6 px-1">
          <AquaLogo size="sm" />
        </Link>
        <NavLinks role={role} pathname={pathname} />
        <div className="mt-auto rounded-lg bg-paper p-3 shadow-[var(--shadow-border)]">
          <p className="text-[10px] font-medium tracking-[0.18em] text-muted uppercase">Desk</p>
          <p className="mt-1 font-display text-lg italic text-plum-deep">{meta.title}</p>
          <p className="text-xs text-muted">{meta.desk}</p>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-cream/85 px-4 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <Link to="/" className="mb-6 block" onClick={() => setOpen(false)}>
                  <AquaLogo size="sm" />
                </Link>
                <NavLinks role={role} pathname={pathname} onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <span className="lg:hidden">
              <AquaLogo size="sm" />
            </span>
            <span className="hidden items-center gap-2 text-sm text-muted lg:flex">
              <Scale className="size-4 text-plum" />
              Dunga desk · live till
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link to="/">Home</Link>
            </Button>
            <Button asChild variant="ghost" size="sm">
              <Link to="/enter">Back to desk</Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="sm">
                  {meta.title}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Switch desk</DropdownMenuLabel>
                {(Object.keys(ROLE_META) as AquaRole[]).map((key) => (
                  <DropdownMenuItem key={key} onSelect={() => setRole(key)}>
                    {ROLE_META[key].title}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="flex size-9 items-center justify-center rounded-md bg-plum font-display text-sm text-cream italic">
              {meta.title.slice(0, 1)}
            </span>
          </div>
        </header>
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </div>
    </div>
  );
}
