import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { kes, kg } from "@/lib/aqua/format";
import {
  listAllCustomerOrders,
  updateCustomerOrderStatus,
  type CustomerOrder,
} from "@/lib/aqua/market";

export const Route = createFileRoute("/app/orders")({ component: CustomerOrders });

const NEXT: Record<string, { status: string; label: string } | undefined> = {
  placed: { status: "confirmed", label: "Confirm order" },
  confirmed: { status: "preparing", label: "Start preparing" },
  preparing: { status: "ready", label: "Mark ready for pickup" },
  ready: { status: "completed", label: "Complete pickup" },
};

function CustomerOrders() {
  const queryClient = useQueryClient();
  const orders = useQuery({
    queryKey: ["all-customer-orders"],
    queryFn: () => listAllCustomerOrders(),
  });
  const update = useMutation({
    mutationFn: (data: { orderId: number; status: string }) =>
      updateCustomerOrderStatus({ data }),
    onSuccess: async () => {
      toast.success("Order status updated");
      await queryClient.invalidateQueries({ queryKey: ["all-customer-orders"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Customer orders"
        title="From basket to pickup"
        description="Review customer requests, confirm availability, and move each order through its pickup stages."
      />
      {orders.isLoading ? (
        <Card><p className="text-sm text-muted">Loading customer orders…</p></Card>
      ) : orders.isError ? (
        <Card><p role="alert" className="text-sm text-danger">Orders could not be loaded.</p></Card>
      ) : orders.data?.length ? (
        <div className="space-y-4">
          {orders.data.map((order) => (
            <StaffOrderCard
              key={order.id}
              order={order}
              busy={update.isPending}
              onAdvance={(status) => update.mutate({ orderId: order.id, status })}
            />
          ))}
        </div>
      ) : (
        <Card className="py-10 text-center">
          <h2 className="font-display text-2xl italic text-plum-deep">No customer orders yet</h2>
          <p className="mt-2 text-sm text-muted">New pickup requests will appear here.</p>
        </Card>
      )}
    </div>
  );
}

function StaffOrderCard({
  order,
  busy,
  onAdvance,
}: {
  order: CustomerOrder;
  busy: boolean;
  onAdvance: (status: string) => void;
}) {
  const next = NEXT[order.status];
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-medium">{order.code}</p>
          <p className="mt-1 text-sm">{order.customerName} · {order.customerEmail}</p>
          <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <Badge variant={order.status === "completed" ? "ok" : order.status === "cancelled" ? "danger" : "warn"}>
          {order.status}
        </Badge>
      </div>
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {order.items.map((item, index) => (
          <li key={`${item.fishTypeId}-${index}`} className="flex justify-between gap-3 py-2 text-sm">
            <span>{item.fishName} · {kg(item.quantityKg)}</span>
            <span className="tabular-nums">{kes(item.unitPrice * item.quantityKg)}</span>
          </li>
        ))}
      </ul>
      {order.note ? <p className="mt-3 text-sm text-muted">Pickup note: {order.note}</p> : null}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xl italic text-plum-deep">{kes(order.total)}</p>
        <div className="flex gap-2">
          {next && order.status !== "ready" ? (
            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={() => onAdvance("cancelled")}
            >
              Cancel
            </Button>
          ) : null}
          {next ? (
            <Button type="button" disabled={busy} onClick={() => onAdvance(next.status)}>
              {next.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
