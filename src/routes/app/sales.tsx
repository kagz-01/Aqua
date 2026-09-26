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
      toast.success(`Receipt ${res.receiptNo} written`);
      setLines({});
      await qc.invalidateQueries();
      if (res.method === "mpesa") {
        setPhase("push");
        setStk({ saleId: res.saleId, receiptNo: res.receiptNo, total: res.total });
        window.setTimeout(async () => {
          const conf = await confirmMpesa({ data: { saleId: res.saleId } });
          setMpesaRef(conf.mpesaReceipt);
          setPhase("ok");
          await qc.invalidateQueries();
        }, 1800);
      }
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Sales floor"
        title="Record the sale"
        description="The line pulls FIFO from the oldest crate. M-Pesa sends an STK, and the book closes itself."
      />

      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-7">
          <h2 className="font-display text-xl italic text-plum-deep">On the ice</h2>
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
                        setLines((prev) => ({ ...prev, [f.id]: Math.max(0, (prev[f.id] ?? 0) - 0.5) }))
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
              <Label>Counter</Label>
              <Select value={customerId} onValueChange={setCustomerId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a counter" />
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
              <Label>Pay with</Label>
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
                    {m === "mpesa" ? "M-Pesa STK" : "Cash"}
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
              {method === "mpesa" ? "Send STK Push" : "Take cash"}
            </Button>
          </div>
        </Card>
      </div>

      <Card className="mt-4">
        <h2 className="font-display text-xl italic text-plum-deep">Recent receipts</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] tracking-wider text-muted uppercase">
              <tr>
                <th className="pb-2 font-medium">Receipt</th>
                <th className="pb-2 font-medium">Counter</th>
                <th className="pb-2 font-medium">Pay</th>
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
                    <Badge variant={s.paymentStatus === "paid" ? "ok" : "warn"}>{s.paymentStatus}</Badge>
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
            <DialogTitle>{phase === "push" ? "STK Push sent" : "M-Pesa confirmed"}</DialogTitle>
            <DialogDescription>
              {phase === "push"
                ? "A prompt is on 2547•••221. Aqua is waiting for Daraja."
                : `Receipt ${stk?.receiptNo} is closed.`}
            </DialogDescription>
          </DialogHeader>
          <div className="mx-auto w-48 rounded-[2rem] bg-ink p-3 text-cream shadow-[var(--shadow-lift)]">
            <div className="rounded-[1.4rem] bg-plum-deep p-4">
              <Smartphone className="size-5 text-lilac" />
              <p className="mt-3 text-[10px] tracking-[0.2em] text-lilac uppercase">Safaricom</p>
              <p className="mt-1 font-display text-2xl italic">
                {phase === "push" ? "Enter PIN" : mpesaRef}
              </p>
              <p className="mt-2 text-xs text-lilac">{kes(stk?.total ?? 0)} · Aqua Fish House</p>
            </div>
          </div>
          {phase === "ok" ? (
            <Button className="w-full" onClick={() => setStk(null)}>
              Done
            </Button>
          ) : (
            <p className="text-center text-xs text-muted">Listening for the callback…</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
