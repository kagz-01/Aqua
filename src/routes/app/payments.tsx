import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { confirmMpesa, listPayments } from "@/lib/aqua/queries";
import { kes, paymentLabel } from "@/lib/aqua/format";

export const Route = createFileRoute("/app/payments")({ component: Payments });

function Payments() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["payments"], queryFn: () => listPayments() });
  const confirm = useMutation({
    mutationFn: (saleId: number) => confirmMpesa({ data: { saleId } }),
    onSuccess: async (res) => {
      toast.success(`Confirmed ${res.mpesaReceipt}`);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const paid = (q.data ?? []).filter((p) => p.status === "paid");
  const pending = (q.data ?? []).filter((p) => p.status !== "paid");
  const mpesa = paid.filter((p) => p.method === "mpesa").reduce((s, p) => s + p.amount, 0);
  const cash = paid.filter((p) => p.method === "cash").reduce((s, p) => s + p.amount, 0);

  return (
    <div>
      <PageHeader
        eyebrow="M-Pesa"
        title="Till and the phone"
        description="Every STK and cash note in one reconciliation. Pending rows wait on Daraja."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-[11px] tracking-wider text-muted uppercase">M-Pesa in</p>
          <p className="mt-1 font-display text-3xl tabular-nums italic text-plum-deep">{kes(mpesa)}</p>
        </Card>
        <Card>
          <p className="text-[11px] tracking-wider text-muted uppercase">Cash in</p>
          <p className="mt-1 font-display text-3xl tabular-nums italic text-plum-deep">{kes(cash)}</p>
        </Card>
        <Card>
          <p className="text-[11px] tracking-wider text-muted uppercase">Waiting</p>
          <p className="mt-1 font-display text-3xl tabular-nums italic text-plum-deep">{pending.length}</p>
        </Card>
      </div>
      <Card className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="text-[11px] tracking-wider text-muted uppercase">
            <tr>
              <th className="pb-2 font-medium">When</th>
              <th className="pb-2 font-medium">Receipt</th>
              <th className="pb-2 font-medium">Method</th>
              <th className="pb-2 font-medium">Ref</th>
              <th className="pb-2 text-right font-medium">Amount</th>
              <th className="pb-2" />
            </tr>
          </thead>
          <tbody>
            {(q.data ?? []).map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="py-2.5 text-muted">
                  {formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })}
                </td>
                <td className="py-2.5 font-mono text-xs">{p.receiptNo}</td>
                <td className="py-2.5">
                  {paymentLabel(p.method)}
                  {p.msisdnMasked ? (
                    <span className="block text-[11px] text-muted">{p.msisdnMasked}</span>
                  ) : null}
                </td>
                <td className="py-2.5 font-mono text-xs">{p.mpesaReceipt ?? "—"}</td>
                <td className="py-2.5 text-right tabular-nums">{kes(p.amount)}</td>
                <td className="py-2.5 text-right">
                  {p.status === "paid" ? (
                    <Badge variant="ok">Paid</Badge>
                  ) : (
                    <Button
                      size="sm"
                      variant="secondary"
                      disabled={confirm.isPending}
                      onClick={() => confirm.mutate(p.saleId)}
                    >
                      Confirm STK
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
