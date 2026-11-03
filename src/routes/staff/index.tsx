import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ClipboardList, Fish, Receipt } from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/staff/")({ component: StaffWorkspaces });

const WORKSPACES = [
  {
    to: "/staff/owner",
    title: "Owner",
    detail: "Business pulse, payments, reports, team access, and customer orders.",
    icon: ClipboardList,
  },
  {
    to: "/staff/housemanager",
    title: "House manager",
    detail: "Inventory, landings, batch traceability, cold chain, and pickup coordination.",
    icon: Fish,
  },
  {
    to: "/staff/attendant",
    title: "Sales attendant",
    detail: "The sales till, customer counters, receipts, and batch lookup.",
    icon: Receipt,
  },
] as const;

function StaffWorkspaces() {
  return (
    <main className="min-h-dvh bg-cream">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <header className="flex items-center justify-between">
          <Link to="/"><AquaLogo size="sm" /></Link>
          <Button asChild size="sm" variant="secondary">
            <Link to="/client">Customer shop</Link>
          </Button>
        </header>
        <section className="py-12">
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">Staff workspace</p>
          <h1 className="mt-2 font-display text-4xl italic text-plum-deep sm:text-5xl">Choose your desk.</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted">
            Each desk brings the tools and daily work for that role into focus.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {WORKSPACES.map(({ to, title, detail, icon: Icon }) => (
              <Card key={to} className="flex flex-col p-5">
                <span className="grid size-11 place-items-center rounded-lg bg-lilac-soft text-plum">
                  <Icon className="size-5" />
                </span>
                <h2 className="mt-4 font-display text-2xl italic text-plum-deep">{title}</h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-muted">{detail}</p>
                <Button asChild className="mt-5">
                  <Link to={to}>
                    Open {title}
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
