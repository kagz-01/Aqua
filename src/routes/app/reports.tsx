import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { PageHeader } from "@/components/aqua/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getOverview, listSales } from "@/lib/aqua/queries";
import { kes, kg } from "@/lib/aqua/format";

export const Route = createFileRoute("/app/reports")({ component: Reports });

function Reports() {
  const overview = useQuery({ queryKey: ["overview"], queryFn: () => getOverview() });
  const sales = useQuery({ queryKey: ["sales"], queryFn: () => listSales() });

  function exportCsv() {
    const rows = sales.data ?? [];
    const header = "receipt,counter,method,status,total,when";
    const body = rows
      .map(
        (s) =>
          `${s.receiptNo},${s.customerCode},${s.paymentMethod},${s.paymentStatus},${s.total},${s.createdAt}`,
      )
      .join("\n");
    const blob = new Blob([`${header}\n${body}`], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aqua-sales.csv";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Books"
        title="What the house earned"
        description="Species mix, till, and an export for the owner’s notebook."
        action={
          <Button variant="secondary" onClick={exportCsv}>
            Export CSV
          </Button>
        }
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-[11px] tracking-wider text-muted uppercase">Week</p>
          <p className="mt-1 font-display text-3xl tabular-nums italic text-plum-deep">
            {kes(overview.data?.weekTotal ?? 0)}
          </p>
        </Card>
        <Card>
          <p className="text-[11px] tracking-wider text-muted uppercase">Today</p>
          <p className="mt-1 font-display text-3xl tabular-nums italic text-plum-deep">
            {kes(overview.data?.todayTotal ?? 0)}
          </p>
        </Card>
        <Card>
          <p className="text-[11px] tracking-wider text-muted uppercase">Ice value</p>
          <p className="mt-1 font-display text-3xl tabular-nums italic text-plum-deep">
            {kes(overview.data?.stockValue ?? 0)}
          </p>
        </Card>
      </div>
      <Card className="mt-4">
        <h2 className="font-display text-xl italic text-plum-deep">Species, 14 days</h2>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={overview.data?.top ?? []}>
              <CartesianGrid stroke="var(--color-border)" vertical={false} />
              <XAxis
                dataKey="localName"
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
                }}
                formatter={(v: number | string) => [kes(Number(v)), "Revenue"]}
              />
              <Bar dataKey="revenue" fill="var(--color-plum)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <Card className="mt-4 overflow-x-auto">
        <h2 className="mb-3 font-display text-xl italic text-plum-deep">Species table</h2>
        <table className="w-full text-left text-sm">
          <thead className="text-[11px] tracking-wider text-muted uppercase">
            <tr>
              <th className="pb-2 font-medium">Fish</th>
              <th className="pb-2 font-medium">Moved</th>
              <th className="pb-2 text-right font-medium">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {(overview.data?.top ?? []).map((t) => (
              <tr key={t.name} className="border-t border-border">
                <td className="py-2.5">
                  {t.name}
                  <span className="text-muted"> · {t.localName}</span>
                </td>
                <td className="py-2.5 tabular-nums">{kg(t.qty)}</td>
                <td className="py-2.5 text-right tabular-nums">{kes(t.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
