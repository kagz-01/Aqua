import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { kes, kg } from "@/lib/aqua/format";
import { useAquaRole, type AquaRole } from "@/lib/aqua/role";
import { getMyAquaRole } from "@/lib/aqua/market";
import {
  listAllCustomerOrders,
  updateCustomerOrderStatus,
  type CustomerOrder,
} from "@/lib/aqua/market";

export const Route = createFileRoute("/app/orders")({ component: CustomerOrders });

const NEXT: Record<string, { status: string; label: string } | undefined> = {
  placed: { status: "confirmed", label: "Confirm this order" },
  confirmed: { status: "preparing", label: "Start preparing fish" },
  preparing: { status: "ready", label: "Ready for pickup" },
};

function CustomerOrders() {
  const queryClient = useQueryClient();
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";
  const demoRole = useAquaRole((state) => state.role);
  const roleAccess = useQuery({
    queryKey: ["aqua-staff-role"],
    queryFn: () => getMyAquaRole(),
    enabled: !demoMode,
  });
  const role: AquaRole | null | undefined = demoMode ? demoRole : roleAccess.data;
  const orders = useQuery({
    queryKey: ["all-customer-orders"],
    queryFn: () => listAllCustomerOrders(),
    enabled: demoMode || roleAccess.data != null,
  });
  const update = useMutation({
    mutationFn: (data: { orderId: number; status: string; paymentMethod?: "cash" | "mpesa" }) =>
      updateCustomerOrderStatus({ data }),
    onSuccess: async (result) => {
      toast.success(
        result.receiptNo ? `Pickup recorded · receipt ${result.receiptNo}` : "Order status updated",
      );
      await queryClient.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  if (!demoMode && roleAccess.isError) {
    return (
      <Card>
        <p role="alert" className="text-sm text-danger">
          Staff access could not be verified.
        </p>
        <Button className="mt-3" variant="secondary" onClick={() => void roleAccess.refetch()}>
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Shop orders"
        title={role === "floor" ? "Orders ready for pickup" : "Customer shop orders"}
        description={
          role === "floor"
            ? "Check the order, take cash or M-Pesa, and give the customer a receipt."
            : "Confirm the fish is available, prepare the order, and let the attendant know when it is ready."
        }
      />
      {orders.isLoading ? (
        <Card>
          <p className="text-sm text-muted">Loading shop orders…</p>
        </Card>
      ) : orders.isError ? (
        <Card>
          <p role="alert" className="text-sm text-danger">
            We could not load the orders. Try again.
          </p>
        </Card>
      ) : orders.data?.length ? (
        <div className="space-y-4">
          {orders.data.map((order) => (
            <StaffOrderCard
              key={order.id}
              order={order}
              role={role}
              busy={update.isPending}
              onAdvance={(status, paymentMethod) =>
                update.mutate({ orderId: order.id, status, paymentMethod })
              }
            />
          ))}
        </div>
      ) : (
        <Card className="py-10 text-center">
          <h2 className="font-display text-2xl italic text-plum-deep">No shop orders yet</h2>
          <p className="mt-2 text-sm text-muted">New customer orders will show here.</p>
        </Card>
      )}
    </div>
  );
}

function StaffOrderCard({
  order,
  role,
  busy,
  onAdvance,
}: {
  order: CustomerOrder;
  role: AquaRole | null | undefined;
  busy: boolean;
  onAdvance: (status: string, paymentMethod?: "cash" | "mpesa") => void;
}) {
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "mpesa">("cash");
  const next =
    role === "floor"
      ? order.status === "ready"
        ? { status: "completed", label: "Record pickup" }
        : undefined
      : (NEXT[order.status] ??
        (role === "owner" && order.status === "ready"
          ? { status: "completed", label: "Complete pickup" }
          : undefined));
  const canCancel =
    (role === "owner" || role === "manager") &&
    order.status !== "completed" &&
    order.status !== "cancelled";
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-medium">{order.code}</p>
          <p className="mt-1 text-sm">
            {order.customerName} · {order.customerEmail}
          </p>
          <p className="text-xs text-muted">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <Badge
          variant={
            order.status === "completed" ? "ok" : order.status === "cancelled" ? "danger" : "warn"
          }
        >
          {order.status}
        </Badge>
      </div>
      {order.receiptNo ? (
        <p className="mt-2 text-sm">
          Receipt <span className="font-mono">{order.receiptNo}</span>
          {order.paymentStatus ? (
            <span className="ml-2 text-muted">
              · {order.paymentStatus === "paid" ? "Paid" : "Waiting for payment check"}
            </span>
          ) : null}
        </p>
      ) : null}
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {order.items.map((item, index) => (
          <li
            key={`${item.fishTypeId}-${index}`}
            className="flex justify-between gap-3 py-2 text-sm"
          >
            <span>
              {item.fishName} · {kg(item.quantityKg)}
            </span>
            <span className="tabular-nums">{kes(item.unitPrice * item.quantityKg)}</span>
          </li>
        ))}
      </ul>
      {order.note ? <p className="mt-3 text-sm text-muted">Customer's note: {order.note}</p> : null}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="font-display text-xl italic text-plum-deep">{kes(order.total)}</p>
        <div className="flex flex-wrap items-center justify-end gap-2">
          {next?.status === "completed" ? (
            <label className="flex min-h-10 items-center gap-2 text-sm">
              How did they pay?
              <select
                className="h-10 rounded-md border border-border bg-paper px-2"
                value={paymentMethod}
                onChange={(event) =>
                  setPaymentMethod(event.target.value === "mpesa" ? "mpesa" : "cash")
                }
              >
                <option value="cash">Cash</option>
                <option value="mpesa">M-Pesa</option>
              </select>
            </label>
          ) : null}
          {canCancel ? (
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
            <Button
              type="button"
              disabled={busy}
              onClick={() =>
                onAdvance(next.status, next.status === "completed" ? paymentMethod : undefined)
              }
            >
              {next.label}
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
