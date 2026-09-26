import { useEffect, useState } from "react";
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

const LANDING_TABS = [
  { id: "home", label: "Home" },
  { id: "trace", label: "Trace" },
  { id: "desk", label: "Operations" },
  { id: "market", label: "Market pulse" },
  { id: "cold-chain", label: "Cold chain" },
  { id: "payments", label: "Settlement" },
] as const;

type LandingTab = (typeof LANDING_TABS)[number]["id"];

function Home() {
  const navigate = useNavigate();
  const [code, setCode] = useState("AQ-DUNGA-8841");
  const [activeTab, setActiveTab] = useState<LandingTab>("home");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "trace":
        return (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Traceability</p>
                <h2 className="mt-2 max-w-lg font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Follow every catch from beach to buyer.
                </h2>
                <p className="mt-4 max-w-xl text-base text-ink-soft">
                  Aqua creates a public trail the moment a landing is weighed. Hotels, county officers,
                  and buyers can verify the origin, temperature, and sale event in seconds.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    aria-label="Batch code"
                    className="font-mono uppercase"
                  />
                  <Button
                    type="button"
                    size="lg"
                    onClick={() => {
                      const next = code.trim().toUpperCase();
                      if (next) navigate({ to: "/trace/$code", params: { code: next } });
                    }}
                  >
                    Trace batch
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Origin", value: "Dunga beach" },
                    { label: "Batch", value: "AQ-DUNGA-8841" },
                    { label: "Status", value: "Cold & sealed" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-border bg-paper p-4 shadow-[var(--shadow-border)]">
                      <p className="text-[10px] tracking-[0.18em] text-muted uppercase">{item.label}</p>
                      <p className="mt-2 font-display text-xl italic text-plum-deep">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-paper p-3 shadow-[var(--shadow-lift)]">
                <div className="overflow-hidden rounded-[22px] border border-border bg-cream">
                  <img src="/aqua/cold-room.jpg" alt="Cold room of silver dagaa" className="h-[420px] w-full object-cover" />
                </div>
                <div className="mt-4 rounded-2xl bg-plum-deep p-4 text-cream">
                  <p className="font-mono text-sm tracking-wider">AQ-SIO-0091</p>
                  <p className="mt-1 text-sm text-lilac">Sio Port · Fulu · 6.2°C · watch the ice</p>
                </div>
              </div>
            </div>
          </section>
        );

      case "desk":
        return (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Operations</p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Every role sees the same live operating picture.
                </h2>
              </div>
              <p className="text-base text-ink-soft">
                From the sales desk to the manager’s view, the platform keeps intake, stock, quality,
                and cash connected in one live workflow.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Sales desk",
                  copy: "Weigh fish, confirm the sale, and settle the payment without losing the batch trail.",
                  accent: "bg-plum-deep text-cream",
                },
                {
                  title: "House manager",
                  copy: "Monitor stock, spoilage risk, and reorder alerts before the margin starts to slip.",
                  accent: "bg-lilac-soft text-plum-deep",
                },
                {
                  title: "Owner",
                  copy: "Read the live cash picture, margin, and operating health from one dashboard.",
                  accent: "bg-paper text-ink-soft",
                },
              ].map((item) => (
                <article key={item.title} className={`rounded-[24px] border border-border p-6 shadow-[var(--shadow-border)] ${item.accent}`}>
                  <span className="inline-flex rounded-full border border-current/20 px-2 py-1 text-[10px] tracking-[0.18em] uppercase opacity-80">
                    Role view
                  </span>
                  <h3 className="mt-4 font-display text-2xl italic">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 opacity-80">{item.copy}</p>
                </article>
              ))}
            </div>

            <div className="mt-8 flex justify-start">
              <Button asChild size="lg">
                <Link to="/app">Open the dashboard</Link>
              </Button>
            </div>
          </section>
        );

      case "market":
        return (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Market pulse</p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Price by species, season, and urgency — with less guesswork.
                </h2>
                <p className="mt-4 text-base text-ink-soft">
                  The platform adapts to buying pressure, species mix, and the rhythm of each landing day,
                  so pricing stays sharper without giving away margin.
                </p>
              </div>

              <div className="rounded-[28px] border border-border bg-paper p-6 shadow-[var(--shadow-border)]">
                <p className="text-sm text-muted">Average market cues</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["Ngege", "KES 260/kg", "Solid demand"],
                    ["Mbuta", "KES 310/kg", "Higher bite"],
                    ["Omena", "KES 180/kg", "Fast turnover"],
                    ["Fulu", "KES 420/kg", "Premium watch"],
                  ].map(([species, price, signal]) => (
                    <div key={species} className="rounded-2xl border border-border bg-cream p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-ink-soft">{species}</span>
                        <span className="text-plum-deep">{price}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                        <div className="h-full rounded-full bg-plum" style={{ width: species === "Fulu" ? "82%" : species === "Mbuta" ? "70%" : species === "Ngege" ? "60%" : "50%" }} />
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted">{signal}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case "cold-chain":
        return (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="overflow-hidden rounded-[28px] border border-border bg-paper shadow-[var(--shadow-lift)]">
                <img src="/aqua/market-ice.jpg" alt="Fresh fish on ice" className="h-[360px] w-full object-cover" />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Cold-chain control</p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  The ice hold should warn before quality slips.
                </h2>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Temp watch", value: "4.1°C" },
                    { label: "Risk band", value: "Low" },
                    { label: "Batch age", value: "11 hrs" },
                    { label: "Alerting", value: "Auto" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-border bg-paper p-4 shadow-[var(--shadow-border)]">
                      <p className="text-[10px] tracking-[0.18em] text-muted uppercase">{item.label}</p>
                      <p className="mt-2 font-display text-2xl italic text-plum-deep">{item.value}</p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 space-y-3 text-sm text-ink-soft">
                  {[
                    "Track hold temperature and age in one view.",
                    "Flag batches that are at risk before the buyer notices.",
                    "Tie spoilage risk back to landing, storage, and movement records.",
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <Thermometer className="mt-0.5 size-4 shrink-0 text-plum" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        );

      case "payments":
        return (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Settlement</p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  M-Pesa, receipts, and close-out balances in one live flow.
                </h2>
                <p className="mt-4 max-w-xl text-base text-ink-soft">
                  Sales can be closed, reconciled, and matched to actual fish movement without the daily
                  scramble of handwritten notes and phone calls.
                </p>

                <div className="aqua-hover-lift aqua-parallax-surface aqua-pulse-soft mt-6 rounded-[28px] border border-border bg-plum-deep p-5 text-cream shadow-[var(--shadow-lift)]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-lilac">Settlement pulse</p>
                  <p className="mt-3 font-display text-4xl italic">KES 388.6k</p>
                  <p className="mt-2 text-sm text-lilac">89% settled before 2pm</p>
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-paper p-6 shadow-[var(--shadow-border)]">
                <div className="space-y-4">
                  {[
                    ["Gross sales", "KES 421,000"],
                    ["Settled", "KES 388,600"],
                    ["Outstanding", "KES 32,400"],
                    ["Fastest channel", "M-Pesa STK"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-b-0 last:pb-0">
                      <span className="text-muted">{label}</span>
                      <span className="font-medium text-ink-soft">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <>
            <section className="relative overflow-hidden">
              <img
                src="/aqua/hero-lake.jpg"
                alt="Dawn boats on a still Kenyan lake"
                className="absolute inset-0 size-full object-cover"
                style={{ transform: `scale(1.07) translateY(${scrollY * 0.1}px)` }}
              />
              <div className="absolute inset-0 bg-plum-deep/72" />
              <div className="relative mx-auto flex min-h-[78dvh] w-full max-w-[1440px] flex-col justify-end px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
                <p className="aqua-rise text-[11px] font-medium tracking-[0.28em] text-lilac uppercase">
                  Fish-house operating platform
                </p>
                <h1 className="aqua-rise aqua-delay-1 mt-4 max-w-[760px] font-display text-5xl leading-[0.94] text-cream italic sm:text-6xl lg:text-[5.25rem]">
                  One system for the landing, the cold room, and the cashbook.
                </h1>
                <p className="aqua-rise aqua-delay-2 mt-5 max-w-[620px] text-base leading-8 text-lilac sm:text-lg">
                  Aqua helps Kenyan fish businesses run intake, stock, pricing, cold-chain checks, sales, and payouts from a single live platform built for real market realities.
                </p>
                <div className="aqua-rise aqua-delay-3 mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="cream">
                    <Link to="/app">
                      Open the platform
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("trace")}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-cream/40 bg-transparent px-4 py-2 text-sm font-medium text-cream transition-colors hover:bg-cream/10 hover:text-cream"
                  >
                    Review a batch
                    <ArrowRight className="size-4" />
                  </button>
                </div>
                <dl className="aqua-rise aqua-delay-4 mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/20 pt-6">
                  <div>
                    <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">Landing sites</dt>
                    <dd className="mt-1 font-display text-3xl text-cream italic">7</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">Live batches</dt>
                    <dd className="mt-1 font-display text-3xl text-cream italic">42</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">Daily cash</dt>
                    <dd className="mt-1 font-display text-3xl text-cream italic">KES</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="border-b border-border bg-paper py-4">
              <div className="mx-auto flex w-full max-w-[1440px] gap-8 overflow-x-auto px-5 text-sm tracking-wide text-muted uppercase sm:px-8 lg:px-10">
                {[
                  "Ngege",
                  "Mbuta",
                  "Omena",
                  "Kamongo",
                  "Fulu",
                  "Lungfish",
                ].map((n) => (
                  <span key={n} className="flex shrink-0 items-center gap-2">
                    <Fish className="size-3.5 text-plum" />
                    {n}
                  </span>
                ))}
              </div>
            </section>

            <section className="mx-auto max-w-[1440px] px-5 py-20 sm:px-8 lg:px-10">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div className="overflow-hidden rounded-3xl border border-border bg-paper shadow-[var(--shadow-border)]">
                  <img src="/aqua/market-ice.jpg" alt="Fish on ice at the market" className="h-72 w-full object-cover" />
                </div>
                <div className="space-y-4">
                  <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">Before Aqua</p>
                  <div className="aqua-hover-lift aqua-parallax-surface rounded-2xl bg-cream p-5 shadow-[var(--shadow-border)]" style={{ transform: `translateY(${Math.min(scrollY * 0.04, 18)}px)` }}>
                    <p className="font-mono text-xs text-muted uppercase tracking-[0.2em]">Before Aqua</p>
                    <p className="mt-3 text-2xl font-display italic text-plum-deep">“Manual records, missed checks, and a lot of guesswork.”</p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-border bg-paper p-5">
                    <p className="text-sm text-ink-soft">
                      Every catch, stock movement, and payment sat in separate notes, calls, and spreadsheets.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="product" className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-10">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-5">
                  <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">What it looks like now</p>
                  <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                    One flow from landing intake to invoice, cash, and stock visibility.
                  </h2>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-base text-ink-soft">
                  The catch is weighed. The batch is tracked. Cold-room status updates automatically. Sales, payment reconciliation, and stock health all sit in the same live platform.
                </p>
              </div>

              <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {[
                  { label: "Landing", value: "07:15", detail: "A boat comes in" },
                  { label: "Weigh-in", value: "07:40", detail: "Scale update" },
                  { label: "Cold room", value: "08:05", detail: "Batch tracked" },
                  { label: "Sale", value: "11:30", detail: "Receipt opened" },
                  { label: "M-Pesa", value: "11:42", detail: "STK sent" },
                  { label: "Owner", value: "12:00", detail: "Live view" },
                ].map((step, idx) => (
                  <article
                    key={step.label}
                    className={`aqua-hover-lift aqua-parallax-surface ${idx === 0 ? "rounded-xl bg-plum-deep p-5 text-cream shadow-[var(--shadow-lift)]" : "rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]"}`}
                    style={{ transform: `translateY(${Math.min(scrollY * 0.02 * (idx + 1), 18)}px)` }}
                  >
                    <p className={idx === 0 ? "text-[10px] tracking-[0.2em] text-lilac uppercase" : "text-[10px] tracking-[0.2em] text-muted uppercase"}>
                      {step.label}
                    </p>
                    <p className="mt-3 font-display text-3xl italic">{step.value}</p>
                    <p className={idx === 0 ? "mt-2 text-sm text-lilac" : "mt-2 text-sm text-muted"}>{step.detail}</p>
                  </article>
                ))}
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((f) => (
                  <article key={f.title} className="aqua-hover-lift aqua-parallax-surface rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]">
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
              <div className="mx-auto grid w-full max-w-[1440px] gap-0 lg:grid-cols-2">
                <img
                  src="/aqua/market-ice.jpg"
                  alt="Fresh lake fish on ice"
                  className="h-72 w-full object-cover lg:h-full"
                />
                <div className="flex flex-col justify-center px-6 py-14 sm:px-12">
                  <p className="text-[11px] tracking-[0.22em] text-lilac uppercase">Daily board</p>
                  <h2 className="mt-3 font-display text-4xl italic">What the house can see in one glance.</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "On ice", value: "1,420 kg" },
                      { label: "Cash flow", value: "KES 421k" },
                      { label: "Alerts", value: "2 reorder" },
                    ].map((stat) => (
                      <div key={stat.label} className="rounded-xl border border-cream/15 bg-cream/5 p-3">
                        <p className="text-[10px] tracking-[0.18em] text-lilac uppercase">{stat.label}</p>
                        <p className="mt-2 font-display text-2xl italic text-cream">{stat.value}</p>
                      </div>
                    ))}
                  </div>
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

            <footer className="border-t border-border bg-plum-deep py-12 text-cream">
              <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-10">
                <div className="grid gap-8 md:grid-cols-[1.5fr_0.9fr_0.9fr_1.3fr]">
                  <div>
                    <AquaLogo invert size="sm" />
                    <p className="mt-4 max-w-sm text-sm leading-6 text-lilac">
                      Aqua keeps the fish-house operation visible from landing to final payment.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-lilac">
                      <Smartphone className="size-4" />
                      Mobile-first ops
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium tracking-[0.22em] text-lilac uppercase">Explore</p>
                    <ul className="mt-4 space-y-3 text-sm text-cream/85">
                      <li>
                        <button type="button" onClick={() => setActiveTab("home")} className="hover:text-lilac">
                          Home
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => setActiveTab("trace")} className="hover:text-lilac">
                          Traceability
                        </button>
                      </li>
                      <li>
                        <button type="button" onClick={() => setActiveTab("desk")} className="hover:text-lilac">
                          The desk
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium tracking-[0.22em] text-lilac uppercase">Ops</p>
                    <ul className="mt-4 space-y-3 text-sm text-cream/85">
                      <li>Landing intake</li>
                      <li>Cold-chain alerts</li>
                      <li>Daily sales pulse</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
                    <p className="text-[11px] font-medium tracking-[0.22em] text-lilac uppercase">Need the desk?</p>
                    <h3 className="mt-3 font-display text-2xl italic text-cream">Open the house floor.</h3>
                    <Button asChild size="sm" variant="cream" className="mt-5">
                      <Link to="/app">
                        Open the desk
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-cream/15 pt-5 text-sm text-lilac md:flex-row md:items-center md:justify-between">
                  <p>© 2026 Aqua</p>
                  <div className="flex gap-5">
                    <button type="button" onClick={() => setActiveTab("home")} className="hover:text-cream">
                      Privacy
                    </button>
                    <button type="button" onClick={() => setActiveTab("trace")} className="hover:text-cream">
                      Terms
                    </button>
                    <button type="button" onClick={() => setActiveTab("desk")} className="hover:text-cream">
                      Support
                    </button>
                  </div>
                </div>
              </div>
            </footer>
          </>
        );
    }
  };

  return (
    <div className="min-h-dvh bg-cream text-ink">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-cream/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <AquaLogo size="sm" />
          <nav className="hidden items-center gap-2 overflow-x-auto text-sm text-ink-soft md:flex">
            {LANDING_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "aqua-tab-pill rounded-full px-3 py-2 transition-colors",
                  activeTab === tab.id ? "bg-plum text-cream shadow-[0_8px_20px_rgba(91,44,145,0.18)]" : "hover:bg-paper hover:text-plum",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <Button asChild size="sm">
            <Link to="/enter">
              Open the house
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </header>

      <div className="border-b border-border bg-paper/80">
        <div className="mx-auto flex w-full max-w-[1440px] gap-2 overflow-x-auto px-5 py-3 sm:px-8 lg:px-10 md:hidden">
          {LANDING_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={[
                "aqua-tab-pill rounded-full px-3 py-2 text-xs font-medium tracking-wide uppercase transition-colors",
                activeTab === tab.id ? "bg-plum text-cream shadow-[0_8px_20px_rgba(91,44,145,0.18)]" : "bg-cream text-ink-soft",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}
