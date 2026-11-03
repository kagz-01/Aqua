import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Minus, Plus, Smartphone } from "lucide-react";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { confirmMpesa, listCustomers, listFish, listSales, recordSale } from "@/lib/aqua/queries";
import { kes, kg, paymentLabel } from "@/lib/aqua/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/sales")({ component: SalesFloor });

function SalesFloor() {
  const qc = useQueryClient();
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";
  const fish = useQuery({ queryKey: ["fish"], queryFn: () => listFish() });
  const customers = useQuery({ queryKey: ["customers"], queryFn: () => listCustomers() });
  const sales = useQuery({ queryKey: ["sales"], queryFn: () => listSales() });
  const [customerId, setCustomerId] = useState<string>("");
  const [method, setMethod] = useState<"mpesa" | "cash">("mpesa");
  const [lines, setLines] = useState<Record<number, number>>({});
  const [stk, setStk] = useState<{ saleId: number; receiptNo: string; total: number } | null>(null);
  const [phase, setPhase] = useState<"push" | "ok">("push");
  const [mpesaRef, setMpesaRef] = useState("");

  const items = useMemo(
    () =>
      Object.entries(lines)
        .map(([id, qty]) => ({ fishTypeId: Number(id), qtyKg: qty }))
        .filter((i) => i.qtyKg > 0),
    [lines],
  );

  const total = items.reduce((s, i) => {
    const f = fish.data?.find((x) => x.id === i.fishTypeId);
    return s + (f ? f.pricePerKg * i.qtyKg : 0);
  }, 0);

  const sell = useMutation({
    mutationFn: () =>
      recordSale({
        data: { customerId: Number(customerId), method, items },
      }),
    onSuccess: async (res) => {
      toast.success(`Sale recorded · receipt ${res.receiptNo}`);
      setLines({});
      await qc.invalidateQueries();
      if (res.method === "mpesa") {
        setPhase("push");
        setStk({ saleId: res.saleId, receiptNo: res.receiptNo, total: res.total });
        if (demoMode) {
          window.setTimeout(async () => {
            const conf = await confirmMpesa({ data: { saleId: res.saleId } });
            setMpesaRef(conf.mpesaReceipt);
            setPhase("ok");
            await qc.invalidateQueries();
          }, 1800);
        }
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Sales"
        title="Record a fish sale"
        description="Choose the fish and weight, then record whether the customer paid by cash or M-Pesa. M-Pesa payments still need to be checked."
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <h2 className="font-display text-xl italic text-plum-deep">Fish in stock</h2>
          <ul className="mt-4 divide-y divide-border">
            {(fish.data ?? []).map((f) => {
              const qty = lines[f.id] ?? 0;
              return (
                <li key={f.id} className="flex items-center gap-3 py-3">
                  <img
                    src={`/aqua/${f.imageKey}.jpg`}
                    alt=""
                    className="size-14 rounded-md object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{f.name}</p>
                    <p className="text-xs text-muted">
                      {f.localName} · {kes(f.pricePerKg)}/kg · {kg(f.quantityKg)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9"
                      aria-label={`Less ${f.name}`}
                      onClick={() =>
                        setLines((prev) => ({
                          ...prev,
                          [f.id]: Math.max(0, (prev[f.id] ?? 0) - 0.5),
                        }))
                      }
                    >
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-10 text-center tabular-nums text-sm">{qty || "—"}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9"
                      aria-label={`More ${f.name}`}
                      onClick={() =>
                        setLines((prev) => ({
                          ...prev,
                          [f.id]: Math.min(f.quantityKg, (prev[f.id] ?? 0) + 0.5),
                        }))
                      }
                    >
                      <Plus className="size-4" />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </Card>

        <Card className="lg:col-span-5">
          <h2 className="font-display text-xl italic text-plum-deep">Till</h2>
          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Customer</Label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a customer" />
                </SelectTrigger>
                <SelectContent>
                  {(customers.data ?? []).map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>How did they pay?</Label>
              <div className="grid grid-cols-2 gap-2">
                {(["mpesa", "cash"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className={cn(
                      "h-11 rounded-md text-sm font-medium",
                      method === m ? "bg-plum text-cream" : "bg-cream text-ink",
                    )}
                  >
                    {m === "mpesa" ? "M-Pesa" : "Cash"}
                  </button>
                ))}
              </div>
            </div>
            <p className="flex items-baseline justify-between border-t border-border pt-3">
              <span className="text-sm text-muted">Total</span>
              <span className="font-display text-3xl tabular-nums italic text-plum-deep">
                {kes(total)}
              </span>
            </p>
            <Button
              className="w-full"
              size="lg"
              disabled={!customerId || items.length === 0 || sell.isPending}
              onClick={() => sell.mutate()}
            >
              {method === "mpesa" ? "Record M-Pesa payment" : "Record cash payment"}
            </Button>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="font-display text-xl italic text-plum-deep">Recent sales and receipts</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] tracking-wider text-muted uppercase">
              <tr>
                <th className="pb-2 font-medium">Receipt</th>
                <th className="pb-2 font-medium">Customer</th>
                <th className="pb-2 font-medium">Paid by</th>
                <th className="pb-2 font-medium">Status</th>
                <th className="pb-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {(sales.data ?? []).slice(0, 12).map((s) => (
                <tr key={s.id} className="border-t border-border">
                  <td className="py-2.5 font-mono text-xs">{s.receiptNo}</td>
                  <td className="py-2.5">{s.customerCode}</td>
                  <td className="py-2.5">{paymentLabel(s.paymentMethod)}</td>
                  <td className="py-2.5">
                    <Badge variant={s.paymentStatus === "paid" ? "ok" : "warn"}>
                      {s.paymentStatus === "paid" ? "Paid" : "To be checked"}
                    </Badge>
                  </td>
                  <td className="py-2.5 text-right tabular-nums">{kes(s.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Dialog open={!!stk} onOpenChange={(o) => !o && setStk(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {phase === "push"
                ? demoMode
                  ? "Demo M-Pesa payment"
                  : "M-Pesa payment still needs checking"
                : "Demo payment marked paid"}
            </DialogTitle>
            <DialogDescription>
              {phase === "push"
                ? demoMode
                  ? "This is a demo. No money is sent or received."
                  : "The sale is recorded, but Accounts must check the M-Pesa payment before marking it paid."
                : `Demo payment marked paid for receipt ${stk?.receiptNo}.`}
            </DialogDescription>
          </DialogHeader>
          <div className="mx-auto w-48 rounded-[2rem] bg-ink p-3 text-cream shadow-[var(--shadow-lift)]">
            <div className="rounded-[1.4rem] bg-plum-deep p-4">
              <Smartphone className="size-5 text-lilac" />
              <p className="mt-3 text-[10px] tracking-[0.2em] text-lilac uppercase">M-Pesa</p>
              <p className="mt-1 font-display text-2xl italic">
                {phase === "push" ? (demoMode ? "Demo" : "Pending") : mpesaRef}
              </p>
              <p className="mt-2 text-xs text-lilac">{kes(stk?.total ?? 0)} · Aqua Fish Market</p>
            </div>
          </div>
          {phase === "ok" ? (
            <Button className="w-full" onClick={() => setStk(null)}>
              Done
            </Button>
          ) : (
            <p className="text-center text-xs text-muted">
              {demoMode
                ? "Finishing demo…"
                : "Accounts can check this payment in the Check payments page."}
            </p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
