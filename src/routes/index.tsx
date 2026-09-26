import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  Fish,
  QrCode,
  Radio,
  Scale,
  ShieldCheck,
  Smartphone,
  Thermometer,
  Wallet,
} from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/")({ component: Home });

const FEATURES = [
  {
    icon: Wallet,
    title: "M-Pesa on the till",
    body: "STK Push from the sale, then the receipt reconciles itself. Cash and till sit in the same book.",
  },
  {
    icon: Bell,
    title: "SMS that reaches feature phones",
    body: "Low stock, order confirmations, and a daily sales pulse — no smartphone, no data bundle required.",
  },
  {
    icon: QrCode,
    title: "Catch-to-sale trace",
    body: "Every landing mints a batch QR. Hotels and auditors scan it back to the beach and the boat ring.",
  },
  {
    icon: Thermometer,
    title: "Cold-chain ready",
    body: "Ice holds, display counters, and delivery coolers already report in. Hardware can plug in later.",
  },
  {
    icon: Scale,
    title: "Digital weigh-in",
    body: "A scale reading becomes stock, a batch code, and an SMS in one motion — no notebook.",
  },
  {
    icon: Radio,
    title: "Three-day demand pulse",
    body: "Aqua watches the last week of sales and flags fish that will run out before the next dawn boats.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState("AQ-DUNGA-8841");

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <AquaLogo size="sm" />
          <nav className="hidden items-center gap-6 text-sm text-ink-soft md:flex">
            <a href="#product" className="hover:text-plum">
              Product
            </a>
            <a href="#trace" className="hover:text-plum">
              Trace
            </a>
            <a href="#desk" className="hover:text-plum">
              The desk
            </a>
          </nav>
          <Button asChild size="sm">
            <Link to="/enter">
              Open workspace
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <img
          src="/aqua/hero-lake.jpg"
          alt="Dawn boats on a still Kenyan lake"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-plum-deep/72" />
        <div className="relative mx-auto flex min-h-[78dvh] max-w-6xl flex-col justify-end px-4 py-16 sm:px-6 sm:py-20">
          <p className="aqua-rise text-[11px] font-medium tracking-[0.28em] text-lilac uppercase">
            Lakeside fish house OS
          </p>
          <h1 className="aqua-rise aqua-delay-1 mt-4 max-w-3xl font-display text-5xl leading-[1.05] text-cream italic sm:text-7xl">
            From the landing to the last sale.
          </h1>
          <p className="aqua-rise aqua-delay-2 mt-5 max-w-xl text-base text-lilac sm:text-lg">
            Aqua is the cream-and-plum ledger for Kenyan fish houses — stock, M-Pesa, SMS
            alerts, and a scannable trail from beach to counter.
          </p>
          <div className="aqua-rise aqua-delay-3 mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="cream">
              <Link to="/enter">
                Enter the desk
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream"
            >
              <a href="#trace">Look up a batch</a>
            </Button>
          </div>
          <dl className="aqua-rise aqua-delay-4 mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/20 pt-6">
            <div>
              <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">Beaches</dt>
              <dd className="mt-1 font-display text-3xl text-cream italic">5</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">Live batches</dt>
              <dd className="mt-1 font-display text-3xl text-cream italic">6</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">Till mix</dt>
              <dd className="mt-1 font-display text-3xl text-cream italic">M-Pesa</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="border-b border-border bg-paper py-4">
        <div className="mx-auto flex max-w-6xl gap-8 overflow-x-auto px-4 text-sm tracking-wide text-muted uppercase sm:px-6">
          {["Ngege", "Mbuta", "Omena", "Kamongo", "Fulu", "Lungfish"].map((n) => (
            <span key={n} className="flex shrink-0 items-center gap-2">
              <Fish className="size-3.5 text-plum" />
              {n}
            </span>
          ))}
        </div>
      </section>

      <section id="product" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Why Aqua</p>
            <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
              Built for the beach, not a supermarket back office.
            </h2>
          </div>
          <p className="lg:col-span-6 lg:col-start-7 text-base text-ink-soft">
            Notebooks drown, M-Pesa sits in a different pile, and a hotel cannot tell you which boat
            landed the ngege. Aqua keeps one current: the ice hold, the till, and the trail.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <article key={f.title} className="rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]">
              <span className="flex size-10 items-center justify-center rounded-md bg-lilac-soft text-plum">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-xl italic text-plum-deep">{f.title}</h3>
              <p className="mt-2 text-sm text-muted">{f.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-plum-deep text-cream">
        <div className="mx-auto grid max-w-6xl gap-0 lg:grid-cols-2">
          <img
            src="/aqua/market-ice.jpg"
            alt="Fresh lake fish on ice"
            className="h-72 w-full object-cover lg:h-full"
          />
          <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
            <p className="text-[11px] tracking-[0.22em] text-lilac uppercase">Ice hold</p>
            <h2 className="mt-3 font-display text-4xl italic">Stock that updates when the scale does.</h2>
            <p className="mt-4 max-w-md text-lilac">
              Receive a landing, mint a batch, and Aqua drops the kilos onto the right fish. Sales
              pull FIFO from the oldest crate so nothing sits too long in the sun.
            </p>
            <ul className="mt-6 space-y-2 text-sm">
              {[
                "Automatic reorder SMS at the line you set",
                "Spoilage score from age and hold temperature",
                "Season flag for fulu and lungfish",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-lilac" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="trace" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Traceability</p>
            <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
              Scan a crate. See the beach.
            </h2>
            <p className="mt-4 text-ink-soft">
              Try a live batch from Dunga. Hotels, county officers, and walk-in counters all land on
              the same public trail — no login.
            </p>
            <form
              className="mt-6 flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                const next = code.trim().toUpperCase();
                if (next) navigate({ to: "/trace/$code", params: { code: next } });
              }}
            >
              <Input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                aria-label="Batch code"
                className="font-mono uppercase"
              />
              <Button type="submit" size="lg">
                Trace batch
              </Button>
            </form>
            <p className="mt-3 text-xs text-muted">Sample codes: AQ-DUNGA-8841 · AQ-SIO-0091 · AQ-HOMA-1109</p>
          </div>
          <div className="relative overflow-hidden rounded-xl shadow-[var(--shadow-lift)]">
            <img src="/aqua/cold-room.jpg" alt="Cold room of silver dagaa" className="h-80 w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-plum-deep/80 p-5 text-cream">
              <p className="font-mono text-sm tracking-wider">AQ-SIO-0091</p>
              <p className="mt-1 text-sm text-lilac">Sio Port · Fulu · 6.2°C · watch the ice</p>
            </div>
          </div>
        </div>
      </section>

      <section id="desk" className="border-t border-border bg-paper py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Three desks</p>
          <h2 className="mt-2 max-w-xl font-display text-4xl text-plum-deep italic">
            Owner, house manager, floor — same house, different keys.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { t: "Floor attendant", d: "Weigh-in, STK Push, print a receipt with a QR." },
              { t: "House manager", d: "Ice hold, cold chain, SMS desk, the daily pulse." },
              { t: "Owner", d: "M-Pesa mix, books, and every till in one cream workspace." },
            ].map((c) => (
              <article key={c.t} className="rounded-xl bg-cream p-5">
                <h3 className="font-display text-2xl italic text-plum-deep">{c.t}</h3>
                <p className="mt-2 text-sm text-muted">{c.d}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link to="/enter">
                Choose a desk
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-plum-deep py-10 text-cream">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <AquaLogo invert size="sm" />
          <p className="max-w-sm text-sm text-lilac">
            Aqua keeps the lakeside fish house honest — catch, ice, till, trail.
          </p>
          <div className="flex items-center gap-2 text-sm text-lilac">
            <Smartphone className="size-4" />
            Daraja · Africa's Talking ready
          </div>
        </div>
      </footer>
    </div>
  );
}
