import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowRight, Fish, TriangleAlert, Wallet } from "lucide-react";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getOverview } from "@/lib/aqua/queries";
import { kes, kg } from "@/lib/aqua/format";

export const Route = createFileRoute("/app/")({ component: Pulse });

function Pulse() {
  const q = useQuery({ queryKey: ["overview"], queryFn: () => getOverview() });
  const d = q.data;

  return (
    <div>
      <PageHeader
        eyebrow="House pulse"
        title="This morning at the till"
        description="The last two weeks, the ice moving thin, and the next few days of demand."
        action={
          <Button asChild>
            <Link to="/app/sales">
              New sale
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Today" value={kes(d?.todayTotal ?? 0)} hint={`${d?.todayCount ?? 0} receipts`} />
        <Kpi label="Last 7 days" value={kes(d?.weekTotal ?? 0)} hint="All counters" />
        <Kpi
          label="Ice value"
          value={kes(d?.stockValue ?? 0)}
          hint="At listed kilo prices"
        />
        <Kpi
          label="Pending M-Pesa"
          value={kes(d?.pendingTotal ?? 0)}
          hint={`${d?.pendingCount ?? 0} waiting STK`}
          warn={(d?.pendingCount ?? 0) > 0}
        />
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <div className="mb-4 flex items-baseline justify-between">
            <h2 className="font-display text-xl italic text-plum-deep">Till, two weeks</h2>
            <p className="text-xs text-muted">KES · daily</p>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={d?.series ?? []}>
                <defs>
                  <linearGradient id="aquaFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-plum)" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="var(--color-plum)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickFormatter={(v: string) => v.slice(5)}
                  tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tickFormatter={(v: number) => `${Math.round(v / 1000)}k`}
                  tick={{ fill: "var(--color-muted)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-paper)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                  formatter={(v: number | string) => [kes(Number(v)), "Sales"]}
                />
                <Area
                  type="monotone"
                  dataKey="total"
                  stroke="var(--color-plum)"
                  strokeWidth={2}
                  fill="url(#aquaFill)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h2 className="font-display text-xl italic text-plum-deep">Pay mix</h2>
          <p className="mt-1 text-xs text-muted">Last 14 days</p>
          <ul className="mt-4 space-y-3">
            {(d?.mix ?? []).map((m) => {
              const all = (d?.mix ?? []).reduce((s, x) => s + x.total, 0) || 1;
              const pct = Math.round((m.total / all) * 100);
              return (
                <li key={m.method}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="inline-flex items-center gap-2 capitalize">
                      <Wallet className="size-4 text-plum" />
                      {m.method === "mpesa" ? "M-Pesa" : "Cash"}
                    </span>
                    <span className="tabular-nums text-muted">{pct}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cream">
                    <div className="h-full bg-plum" style={{ width: `${pct}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl italic text-plum-deep">Running thin</h2>
            <Badge variant="warn">Reorder</Badge>
          </div>
          <ul className="space-y-3">
            {(d?.low ?? []).length === 0 ? (
              <li className="text-sm text-muted">Ice hold is above the lines you set.</li>
            ) : (
              d?.low.map((f) => (
                <li key={f.id} className="flex items-center gap-3">
                  <img
                    src={`/aqua/${f.imageKey}.jpg`}
                    alt=""
                    className="size-12 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{f.name}</p>
                    <p className="text-xs text-muted">
                      {f.localName} · {kg(f.quantityKg)} left
                    </p>
                  </div>
                  <TriangleAlert className="size-4 text-warn" />
                </li>
              ))
            )}
          </ul>
        </Card>

        <Card>
          <h2 className="font-display text-xl italic text-plum-deep">Three-day read</h2>
          <p className="mt-1 text-xs text-muted">Pace of the last week, projected forward</p>
          <ul className="mt-4 space-y-3">
            {(d?.forecast ?? [])
              .slice()
              .sort((a, b) => a.daysLeft - b.daysLeft)
              .map((f) => (
                <li key={f.fishTypeId} className="flex items-center justify-between gap-3 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Fish className="size-4 text-plum" />
                    {f.name}
                  </span>
                  <span className="tabular-nums text-muted">
                    {f.daysLeft > 20 ? "steady" : `${f.daysLeft.toFixed(1)} days`}
                  </span>
                </li>
              ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function Kpi({
  label,
  value,
  hint,
  warn,
}: {
  label: string;
  value: string;
  hint: string;
  warn?: boolean;
}) {
  return (
    <Card className={warn ? "ring-1 ring-warn/40" : undefined}>
      <p className="text-[11px] font-medium tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-2 font-display text-3xl tabular-nums tracking-tight text-plum-deep">{value}</p>
      <p className="mt-1 text-xs text-muted">{hint}</p>
    </Card>
  );
}
