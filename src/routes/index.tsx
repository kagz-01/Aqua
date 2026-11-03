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
  ShoppingCart,
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
    title: "Record cash and M-Pesa",
    body: "Record how a customer paid and keep the payment with the sale. Live M-Pesa confirmation is not connected.",
  },
  {
    icon: Bell,
    title: "See order and stock alerts",
    body: "Staff can check alerts in Aqua. Sending SMS or WhatsApp messages is not connected yet.",
  },
  {
    icon: QrCode,
    title: "Follow each fish delivery",
    body: "A delivery gets a number and QR code. Scan it to open the recorded details and see its link to stock and sales.",
  },
  {
    icon: Thermometer,
    title: "Keep an eye on temperature",
    body: "Staff can record a fish delivery's temperature and check it later. No automatic sensor readings are connected.",
  },
  {
    icon: Scale,
    title: "Record fish weight",
    body: "Enter the weight when fish arrives. Aqua adds it to stock and the delivery record; scales and SMS are not connected.",
  },
  {
    icon: Radio,
    title: "Check sales and low stock",
    body: "Staff can review recorded sales and stock warnings. Aqua does not forecast demand or send automatic alerts.",
  },
];

const LANDING_TABS = [
  { id: "home", label: "Overview" },
  { id: "trace", label: "Follow a delivery" },
  { id: "desk", label: "Staff jobs" },
  { id: "market", label: "Market" },
  { id: "cold-chain", label: "Fish temperature" },
  { id: "payments", label: "Sales and payments" },
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
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                  Follow a delivery
                </p>
                <h2 className="mt-2 max-w-lg font-display text-4xl text-plum-deep italic sm:text-5xl">
                  See where a fish delivery came from.
                </h2>
                <p className="mt-4 max-w-xl text-base text-ink-soft">
                  When staff record a delivery, Aqua gives it a delivery number. Use that number to
                  check the delivery details and see how the fish moves through the shop.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    aria-label="Delivery number"
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
                    Find delivery
                  </Button>
                </div>

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {[
                    { label: "Origin", value: "Dunga beach" },
                    { label: "Batch", value: "AQ-DUNGA-8841" },
                    { label: "Example status", value: "On ice" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border bg-paper p-4 shadow-[var(--shadow-border)]"
                    >
                      <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
                        {item.label}
                      </p>
                      <p className="mt-2 font-display text-xl italic text-plum-deep">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-paper p-3 shadow-[var(--shadow-lift)]">
                <div className="overflow-hidden rounded-[22px] border border-border bg-cream">
                  <img
                    src="/aqua/cold-room.jpg"
                    alt="Cold room of silver dagaa"
                    className="h-[420px] w-full object-cover"
                  />
                </div>
                <div className="mt-4 rounded-2xl bg-plum-deep p-4 text-cream">
                  <p className="font-mono text-sm tracking-wider">AQ-SIO-0091</p>
                  <p className="mt-1 text-sm text-lilac">
                    Example record · Sio Port · Fulu · 6.2°C
                  </p>
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
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                  Staff jobs
                </p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Everyone knows what they are responsible for.
                </h2>
              </div>
              <p className="text-base text-ink-soft">
                The manager records fish deliveries and prepares orders. The attendant handles sales
                and pickups. Accounts checks payments and money owed to fishers.
              </p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Sales attendant",
                  copy: "Record counter sales, give receipts, and hand over customer orders that are ready.",
                  accent: "bg-plum-deep text-cream",
                },
                {
                  title: "House manager",
                  copy: "Record fish deliveries, check stock, and prepare customer orders for pickup.",
                  accent: "bg-lilac-soft text-plum-deep",
                },
                {
                  title: "Owner",
                  copy: "Check business reports, staff access, customer orders, and recorded payments.",
                  accent: "bg-paper text-ink-soft",
                },
              ].map((item) => (
                <article
                  key={item.title}
                  className={`rounded-[24px] border border-border p-6 shadow-[var(--shadow-border)] ${item.accent}`}
                >
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
                <Link to="/enter">Choose a staff role</Link>
              </Button>
            </div>
          </section>
        );

      case "market":
        return (
          <section className="mx-auto max-w-[1440px] px-5 py-16 sm:px-8 lg:px-10">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                  Example prices
                </p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Fish prices are set by the shop.
                </h2>
                <p className="mt-4 text-base text-ink-soft">
                  These prices are only examples, not today's shop prices. Check the customer shop
                  for fish currently available and their prices.
                </p>
              </div>

              <div className="rounded-[28px] border border-border bg-paper p-6 shadow-[var(--shadow-border)]">
                <p className="text-sm text-muted">Average market cues</p>
                <div className="mt-5 space-y-4">
                  {[
                    ["Ngege", "KES 260/kg", "Example price"],
                    ["Mbuta", "KES 310/kg", "Example price"],
                    ["Omena", "KES 180/kg", "Example price"],
                    ["Fulu", "KES 420/kg", "Example price"],
                  ].map(([fishType, price, signal]) => (
                    <div key={fishType} className="rounded-2xl border border-border bg-cream p-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-ink-soft">{fishType}</span>
                        <span className="text-plum-deep">{price}</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-border">
                        <div
                          className="h-full rounded-full bg-plum"
                          style={{
                            width:
                              fishType === "Fulu"
                                ? "82%"
                                : fishType === "Mbuta"
                                  ? "70%"
                                  : fishType === "Ngege"
                                    ? "60%"
                                    : "50%",
                          }}
                        />
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-muted">
                        {signal}
                      </p>
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
                <img
                  src="/aqua/market-ice.jpg"
                  alt="Fresh fish on ice"
                  className="h-[360px] w-full object-cover"
                />
              </div>
              <div>
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                  Fish temperature
                </p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Record the temperature when fish arrives.
                </h2>
                <p className="mt-3 text-sm text-muted">
                  Example readings only. Aqua does not receive automatic readings from a thermometer
                  or cold room.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: "Example temperature", value: "4.1°C" },
                    { label: "Example check", value: "Recorded" },
                    { label: "Example delivery age", value: "11 hrs" },
                    { label: "Sensor connection", value: "Not connected" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-border bg-paper p-4 shadow-[var(--shadow-border)]"
                    >
                      <p className="text-[10px] tracking-[0.18em] text-muted uppercase">
                        {item.label}
                      </p>
                      <p className="mt-2 font-display text-2xl italic text-plum-deep">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <ul className="mt-6 space-y-3 text-sm text-ink-soft">
                  {[
                    "See the temperature and delivery details staff have recorded.",
                    "Check fish stock and delivery records before preparing an order.",
                    "No automatic spoilage score or sensor alert is available.",
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
                <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                  Sales and payments
                </p>
                <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                  Keep sales, receipts, and payment records together.
                </h2>
                <p className="mt-4 max-w-xl text-base text-ink-soft">
                  Staff can record cash or M-Pesa against a sale. Accounts can review payment
                  records and money owed to fishers. Live M-Pesa confirmation is not connected.
                </p>

                <div className="aqua-hover-lift aqua-parallax-surface aqua-pulse-soft mt-6 rounded-[28px] border border-border bg-plum-deep p-5 text-cream shadow-[var(--shadow-lift)]">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-lilac">
                    Example figures only
                  </p>
                  <p className="mt-3 font-display text-4xl italic">KES 388.6k</p>
                  <p className="mt-2 text-sm text-lilac">These are not live shop totals.</p>
                </div>
              </div>

              <div className="rounded-[28px] border border-border bg-paper p-6 shadow-[var(--shadow-border)]">
                <div className="space-y-4">
                  {[
                    ["Example sales", "KES 421,000"],
                    ["Example recorded payments", "KES 388,600"],
                    ["Example amount still due", "KES 32,400"],
                    ["Live M-Pesa link", "Not connected"],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between border-b border-border pb-3 text-sm last:border-b-0 last:pb-0"
                    >
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
                  Lakeside fish market & fish-house platform
                </p>
                <h1 className="aqua-rise aqua-delay-1 mt-4 max-w-[760px] font-display text-5xl leading-[0.94] text-cream italic sm:text-6xl lg:text-[5.25rem]">
                  Fresh lake fish, from our landing to your table.
                </h1>
                <p className="aqua-rise aqua-delay-2 mt-5 max-w-[620px] text-base leading-8 text-lilac sm:text-lg">
                  Browse fish for sale, add what you want to your basket, and place an order for
                  pickup. You can follow your order from the customer shop.
                </p>
                <div className="aqua-rise aqua-delay-3 mt-8 flex flex-wrap gap-3">
                  <Button asChild size="lg" variant="cream">
                    <Link to="/client">
                      <ShoppingCart className="size-4" />
                      Shop today’s catch
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-cream/40 text-cream hover:bg-cream/10 hover:text-cream"
                  >
                    <Link to="/enter">
                      Staff portal
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                </div>
                <p className="aqua-rise aqua-delay-3 mt-4 text-sm text-lilac">
                  Look around first. Sign in when you are ready to order and follow your pickup.
                </p>
                <dl className="aqua-rise aqua-delay-4 mt-12 grid max-w-2xl grid-cols-3 gap-4 border-t border-cream/20 pt-6">
                  <div>
                    <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">
                      Customer shop
                    </dt>
                    <dd className="mt-1 font-display text-3xl text-cream italic">Shop</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">
                      Staff jobs
                    </dt>
                    <dd className="mt-1 font-display text-3xl text-cream italic">4 roles</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-[0.16em] text-lilac uppercase">
                      Fish deliveries
                    </dt>
                    <dd className="mt-1 font-display text-3xl text-cream italic">Tracked</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="border-b border-border bg-paper py-4">
              <div className="mx-auto flex w-full max-w-[1440px] gap-8 overflow-x-auto px-5 text-sm tracking-wide text-muted uppercase sm:px-8 lg:px-10">
                {["Ngege", "Mbuta", "Omena", "Kamongo", "Fulu", "Lungfish"].map((n) => (
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
                  <img
                    src="/aqua/market-ice.jpg"
                    alt="Fish on ice at the market"
                    className="h-72 w-full object-cover"
                  />
                </div>
                <div className="space-y-4">
                  <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                    Before Aqua
                  </p>
                  <div
                    className="aqua-hover-lift aqua-parallax-surface rounded-2xl bg-cream p-5 shadow-[var(--shadow-border)]"
                    style={{ transform: `translateY(${Math.min(scrollY * 0.04, 18)}px)` }}
                  >
                    <p className="font-mono text-xs text-muted uppercase tracking-[0.2em]">
                      Before Aqua
                    </p>
                    <p className="mt-3 text-2xl font-display italic text-plum-deep">
                      “Manual records, missed checks, and a lot of guesswork.”
                    </p>
                  </div>
                  <div className="rounded-2xl border border-dashed border-border bg-paper p-5">
                    <p className="text-sm text-ink-soft">
                      Every catch, stock movement, and payment sat in separate notes, calls, and
                      spreadsheets.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section id="product" className="mx-auto max-w-[1440px] px-5 pb-20 sm:px-8 lg:px-10">
              <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                <div className="lg:col-span-5">
                  <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">
                    How Aqua helps
                  </p>
                  <h2 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
                    Follow fish from delivery through sale.
                  </h2>
                </div>
                <p className="lg:col-span-6 lg:col-start-7 text-base text-ink-soft">
                  Staff enter the fish weight and delivery details. The delivery number links that
                  record to stock and sales. Temperature readings are entered by staff, not sent by
                  sensors.
                </p>
              </div>

              <p className="mt-8 text-sm text-muted">
                Example steps and times only; this is not a live shop update.
              </p>
              <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
                {[
                  { label: "Landing", value: "07:15", detail: "A boat comes in" },
                  { label: "Weight", value: "07:40", detail: "Staff enter kilos" },
                  { label: "Delivery", value: "08:05", detail: "Batch number added" },
                  { label: "Sale", value: "11:30", detail: "Receipt recorded" },
                  { label: "Payment", value: "11:42", detail: "Payment noted" },
                  { label: "Owner", value: "12:00", detail: "Checks the day's records" },
                ].map((step, idx) => (
                  <article
                    key={step.label}
                    className={`aqua-hover-lift aqua-parallax-surface ${idx === 0 ? "rounded-xl bg-plum-deep p-5 text-cream shadow-[var(--shadow-lift)]" : "rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]"}`}
                    style={{
                      transform: `translateY(${Math.min(scrollY * 0.02 * (idx + 1), 18)}px)`,
                    }}
                  >
                    <p
                      className={
                        idx === 0
                          ? "text-[10px] tracking-[0.2em] text-lilac uppercase"
                          : "text-[10px] tracking-[0.2em] text-muted uppercase"
                      }
                    >
                      {step.label}
                    </p>
                    <p className="mt-3 font-display text-3xl italic">{step.value}</p>
                    <p
                      className={idx === 0 ? "mt-2 text-sm text-lilac" : "mt-2 text-sm text-muted"}
                    >
                      {step.detail}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((f) => (
                  <article
                    key={f.title}
                    className="aqua-hover-lift aqua-parallax-surface rounded-xl bg-paper p-5 shadow-[var(--shadow-border)]"
                  >
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
                  <p className="text-[11px] tracking-[0.22em] text-lilac uppercase">
                    Example figures only
                  </p>
                  <h2 className="mt-3 font-display text-4xl italic">
                    What staff can check in Aqua.
                  </h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {[
                      { label: "Fish in stock", value: "1,420 kg" },
                      { label: "Recorded sales", value: "KES 421k" },
                      { label: "Low-stock warnings", value: "2" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-cream/15 bg-cream/5 p-3"
                      >
                        <p className="text-[10px] tracking-[0.18em] text-lilac uppercase">
                          {stat.label}
                        </p>
                        <p className="mt-2 font-display text-2xl italic text-cream">{stat.value}</p>
                      </div>
                    ))}
                  </div>
                  <ul className="mt-6 space-y-2 text-sm">
                    {[
                      "Check low-stock warnings in the staff pages. SMS is not connected.",
                      "Review the temperature and details staff entered for a delivery.",
                      "See recorded fish, sales, and payment details in reports.",
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
                      Aqua helps the team record fish deliveries, stock, sales, customer orders, and
                      payments.
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-sm text-lilac">
                      <Smartphone className="size-4" />
                      Use Aqua on a phone or computer
                    </div>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium tracking-[0.22em] text-lilac uppercase">
                      Explore
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-cream/85">
                      <li>
                        <button
                          type="button"
                          onClick={() => setActiveTab("home")}
                          className="hover:text-lilac"
                        >
                          Home
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => setActiveTab("trace")}
                          className="hover:text-lilac"
                        >
                          Follow a delivery
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          onClick={() => setActiveTab("desk")}
                          className="hover:text-lilac"
                        >
                          Staff jobs
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p className="text-[11px] font-medium tracking-[0.22em] text-lilac uppercase">
                      Staff work
                    </p>
                    <ul className="mt-4 space-y-3 text-sm text-cream/85">
                      <li>Record fish deliveries</li>
                      <li>Check stock and orders</li>
                      <li>Review sales and payments</li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-cream/15 bg-cream/5 p-5">
                    <p className="text-[11px] font-medium tracking-[0.22em] text-lilac uppercase">
                      Are you staff?
                    </p>
                    <h3 className="mt-3 font-display text-2xl italic text-cream">
                      Go to your staff page.
                    </h3>
                    <Button asChild size="sm" variant="cream" className="mt-5">
                      <Link to="/enter">
                        Staff pages
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 border-t border-cream/15 pt-5 text-sm text-lilac md:flex-row md:items-center md:justify-between">
                  <p>© 2026 Aqua</p>
                  <div className="flex gap-5">
                    <button
                      type="button"
                      onClick={() => setActiveTab("home")}
                      className="hover:text-cream"
                    >
                      Privacy
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("trace")}
                      className="hover:text-cream"
                    >
                      Delivery details
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("desk")}
                      className="hover:text-cream"
                    >
                      Staff jobs
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
                  activeTab === tab.id
                    ? "bg-plum text-cream shadow-[0_8px_20px_rgba(91,44,145,0.18)]"
                    : "hover:bg-paper hover:text-plum",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" variant="secondary">
              <Link to="/client">Shop fish</Link>
            </Button>
            <Button asChild size="sm">
              <Link to="/enter">
                Staff pages
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
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
                activeTab === tab.id
                  ? "bg-plum text-cream shadow-[0_8px_20px_rgba(91,44,145,0.18)]"
                  : "bg-cream text-ink-soft",
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
