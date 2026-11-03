import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Fish, ShieldCheck } from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/enter")({ component: Enter });

function Enter() {
  return (
    <main className="min-h-dvh bg-cream">
      <div className="mx-auto flex min-h-dvh max-w-5xl flex-col px-4 py-8 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/"><AquaLogo size="sm" /></Link>
          <Button asChild size="sm" variant="ghost">
            <Link to="/">Home</Link>
          </Button>
        </div>
        <section className="my-auto py-12">
          <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase">Aqua Fish House</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl italic text-plum-deep sm:text-5xl">
            Welcome. Where would you like to go?
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Shop today’s catch as a customer, or sign in to the staff workspace with an approved account.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Card className="flex flex-col p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-xl bg-lilac-soft text-plum">
                <Fish className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl italic text-plum-deep">Shop fish</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                Browse the market, add fish to your basket, place a pickup request, and track your orders.
              </p>
              <Button asChild className="mt-6 w-full">
                <Link to="/client">
                  Go to customer shop
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Card>
            <Card className="flex flex-col p-6 sm:p-8">
              <span className="grid size-12 place-items-center rounded-xl bg-cream text-plum">
                <ShieldCheck className="size-6" />
              </span>
              <h2 className="mt-5 font-display text-2xl italic text-plum-deep">Staff workspace</h2>
              <p className="mt-2 flex-1 text-sm leading-6 text-muted">
                Stock, sales, customers, cold-chain, and reports are available only to approved staff accounts.
              </p>
              <Button asChild variant="secondary" className="mt-6 w-full">
                <Link to="/staff">
                  Choose staff workspace
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
}
