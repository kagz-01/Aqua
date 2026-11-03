import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardList, Fish, Receipt, Wallet } from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/staff/")({ component: StaffWorkspaces });

const WORKSPACES = [
  {
    to: "/staff/owner",
    title: "Owner",
    detail: "Check sales, payments, reports, staff access, and customer orders.",
    icon: ClipboardList,
  },
  {
    to: "/staff/housemanager",
    title: "House manager",
    detail: "Register fish deliveries, check stock, and prepare customer orders for pickup.",
    icon: Fish,
  },
  {
    to: "/staff/attendant",
    title: "Sales attendant",
    detail: "Record counter sales, give receipts, and hand over ready customer orders.",
    icon: Receipt,
  },
  {
    to: "/staff/accounts",
    title: "Accounts officer",
    detail: "Check payment records, record money paid to fishers, and review money reports.",
    icon: Wallet,
  },
] as const;

function StaffWorkspaces() {
  return (
    <main className="min-h-dvh bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="flex items-center justify-between">
          <Link to="/">
            <AquaLogo size="sm" />
          </Link>
          <Button asChild size="sm" variant="secondary">
            <Link to="/client">Shop fish</Link>
          </Button>
        </header>
        <section className="py-12">
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">Staff pages</p>
          <h1 className="mt-2 font-display text-4xl italic text-plum-deep sm:text-5xl">
            Choose your staff role.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Pick the role that matches your work. Each page has the jobs for that role.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {WORKSPACES.map(({ to, title, detail, icon: Icon }) => (
              <Card key={to} className="flex flex-col p-5">
                <span className="grid size-11 place-items-center rounded-lg bg-lilac-soft text-plum">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-2xl italic text-plum-deep">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{detail}</p>
                <Button asChild className="mt-5">
                  <Link to={to}>
                    Open {title}'s page
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
