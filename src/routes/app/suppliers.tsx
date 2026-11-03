import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addSupplier,
  listDeliveries,
  listFish,
  listSuppliers,
  recordDelivery,
  recordSupplierPayment,
  type DeliveryRow,
} from "@/lib/aqua/queries";
import { kes, kg } from "@/lib/aqua/format";
import { getMyAquaRole } from "@/lib/aqua/market";
import { useAquaRole } from "@/lib/aqua/role";

export const Route = createFileRoute("/app/suppliers")({ component: Suppliers });

type DeliveryLineForm = { fishTypeId: string; quantityKg: string; unitCost: string };
const newLine = (): DeliveryLineForm => ({ fishTypeId: "", quantityKg: "", unitCost: "" });

function Suppliers() {
  const qc = useQueryClient();
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";
  const demoRole = useAquaRole((state) => state.role);
  const roleAccess = useQuery({
    queryKey: ["aqua-staff-role"],
    queryFn: () => getMyAquaRole(),
    enabled: !demoMode,
  });
  const role = demoMode ? demoRole : roleAccess.data;
  const canManageSuppliers = role === "owner" || role === "manager";
  const canPaySuppliers = role === "owner" || role === "accounts";
  const suppliers = useQuery({ queryKey: ["suppliers"], queryFn: () => listSuppliers() });
  const deliveries = useQuery({ queryKey: ["deliveries"], queryFn: () => listDeliveries() });
  const fish = useQuery({ queryKey: ["fish"], queryFn: () => listFish() });

  const [code, setCode] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [supplierKind, setSupplierKind] = useState("fisher");
  const [landing, setLanding] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [supplierId, setSupplierId] = useState("");
  const [deliveryLanding, setDeliveryLanding] = useState("");
  const [tempC, setTempC] = useState("2");
  const [note, setNote] = useState("");
  const [lines, setLines] = useState<DeliveryLineForm[]>([newLine()]);
  const [paying, setPaying] = useState<DeliveryRow | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentReference, setPaymentReference] = useState("");

  const deliveryTotal = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + Number(line.quantityKg || 0) * Number(line.unitCost || 0),
        0,
      ),
    [lines],
  );

  const add = useMutation({
    mutationFn: () =>
      addSupplier({
        data: {
          code,
          landingSite: landing,
          boatOrCoop: supplierName,
          supplierKind,
          phone,
        },
      }),
    onSuccess: async () => {
      toast.success("Fisher or supplier added");
      setCode("");
      setSupplierName("");
      setLanding("");
      setPhone("");
      await qc.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const receive = useMutation({
    mutationFn: () =>
      recordDelivery({
        data: {
          supplierId: Number(supplierId),
          landingSite: deliveryLanding,
          tempC: Number(tempC),
          note,
          items: lines.map((line) => ({
            fishTypeId: Number(line.fishTypeId),
            quantityKg: Number(line.quantityKg),
            unitCost: Number(line.unitCost),
          })),
        },
      }),
    onSuccess: async (result) => {
      toast.success(`Fish delivery recorded · ${kes(result.totalCost)} total cost`);
      setDeliveryOpen(false);
      setLines([newLine()]);
      setNote("");
      await qc.invalidateQueries();
    },
    onError: (error: Error) => toast.error(error.message),
  });

  const pay = useMutation({
    mutationFn: () =>
      recordSupplierPayment({
        data: {
          deliveryId: paying!.id,
          amount: Number(paymentAmount),
          method: paymentMethod,
          reference: paymentReference,
        },
      }),
    onSuccess: async ({ balance }) => {
      toast.success(
        balance > 0 ? `Payment recorded · ${kes(balance)} still due` : "Fisher paid in full",
      );
      setPaying(null);
      setPaymentReference("");
      await qc.invalidateQueries({ queryKey: ["deliveries"] });
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function openDelivery() {
    setSupplierId("");
    setDeliveryLanding("");
    setDeliveryOpen(true);
  }

  function openPayment(delivery: DeliveryRow) {
    setPaying(delivery);
    setPaymentAmount(delivery.balance.toFixed(2));
    setPaymentMethod("cash");
    setPaymentReference("");
  }

  function updateLine(index: number, patch: Partial<DeliveryLineForm>) {
    setLines((current) => current.map((line, i) => (i === index ? { ...line, ...patch } : line)));
  }

  return (
    <div>
      <PageHeader
        eyebrow={
          canPaySuppliers && !canManageSuppliers
            ? "Money owed to fishers"
            : "Fishers and deliveries"
        }
        title={
          canPaySuppliers && !canManageSuppliers ? "Payments to fishers" : "Record fish deliveries"
        }
        description={
          canPaySuppliers && !canManageSuppliers
            ? "See what each delivery cost, what has been paid, and what is still owed."
            : "Add fishers and suppliers, then record the fish they bring in. Accounts keeps track of payments."
        }
        action={
          canManageSuppliers ? (
            <Button onClick={openDelivery} disabled={!suppliers.data?.length}>
              Record fish delivery
            </Button>
          ) : null
        }
      />

      <section aria-labelledby="supplier-list-title">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Our fishers and suppliers
            </p>
            <h2
              id="supplier-list-title"
              className="mt-1 font-display text-2xl italic text-plum-deep"
            >
              Fishers, boats, and groups
            </h2>
          </div>
        </div>
        {suppliers.isError ? (
          <Card>
            <p role="alert" className="text-sm text-danger">
              We could not load the fisher and supplier list. Try again.
            </p>
          </Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {(suppliers.data ?? []).map((supplier) => (
              <Card key={supplier.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-muted">{supplier.code}</p>
                    <h3 className="mt-1 font-display text-xl italic text-plum-deep">
                      {supplier.boatOrCoop}
                    </h3>
                  </div>
                  <Badge variant={supplier.supplierKind === "fisher" ? "ok" : "outline"}>
                    {{
                      fisher: "Fisher",
                      boat: "Boat",
                      cooperative: "Fisher group",
                      opening: "Opening stock",
                    }[supplier.supplierKind] ?? "Supplier"}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted">{supplier.landingSite}</p>
                <p className="mt-1 text-xs text-muted">
                  {supplier.phone || "No phone number added"}
                </p>
              </Card>
            ))}
            {suppliers.data?.length === 0 ? (
              <Card className="sm:col-span-2 xl:col-span-3">
                <p className="text-sm text-muted">
                  Add your first fisher or supplier before recording a delivery.
                </p>
              </Card>
            ) : null}
          </div>
        )}
      </section>

      <section
        className={`mt-8 grid items-start gap-4 ${canManageSuppliers ? "xl:grid-cols-[1fr_21rem]" : "xl:grid-cols-1"}`}
      >
        <div>
          <div className="mb-3">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
              Delivery records
            </p>
            <h2 className="mt-1 font-display text-2xl italic text-plum-deep">
              Recent deliveries and payments
            </h2>
          </div>
          {deliveries.isError ? (
            <Card>
              <p role="alert" className="text-sm text-danger">
                We could not load delivery records. Try again.
              </p>
            </Card>
          ) : deliveries.data?.length ? (
            <div className="space-y-3">
              {deliveries.data.map((delivery) => (
                <Card key={delivery.id}>
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-muted">Delivery no. {delivery.code}</p>
                      <h3 className="mt-1 font-display text-xl italic text-plum-deep">
                        {delivery.supplierName}
                      </h3>
                      <p className="text-sm text-muted">
                        Fisher no. {delivery.supplierCode} · {delivery.landingSite} ·{" "}
                        {formatDistanceToNow(new Date(delivery.receivedAt), { addSuffix: true })}
                      </p>
                    </div>
                    <Badge
                      variant={
                        delivery.balance <= 0.01
                          ? "ok"
                          : delivery.amountPaid > 0
                            ? "warn"
                            : "danger"
                      }
                    >
                      {delivery.balance <= 0.01
                        ? "Paid in full"
                        : delivery.amountPaid > 0
                          ? "Part paid"
                          : "Not paid"}
                    </Badge>
                  </div>
                  <ul className="mt-4 divide-y divide-border border-y border-border">
                    {delivery.items.map((item) => (
                      <li
                        key={item.batchCode}
                        className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2 text-sm"
                      >
                        <span>
                          {item.fishName} · {kg(item.quantityKg)} · Delivery no. {item.batchCode}
                        </span>
                        <span className="tabular-nums">{kes(item.quantityKg * item.unitCost)}</span>
                      </li>
                    ))}
                  </ul>
                  {delivery.note ? (
                    <p className="mt-2 text-xs text-muted">Note: {delivery.note}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-sm">
                      <span className="text-muted">{kg(delivery.totalKg)} · Total </span>
                      <strong>{kes(delivery.totalCost)}</strong>
                      <span className="ml-3 text-muted">
                        Paid {kes(delivery.amountPaid)} · Due{" "}
                      </span>
                      <strong>{kes(delivery.balance)}</strong>
                    </div>
                    {canPaySuppliers && delivery.balance > 0.01 ? (
                      <Button size="sm" variant="secondary" onClick={() => openPayment(delivery)}>
                        Record payment
                      </Button>
                    ) : null}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <p className="text-sm text-muted">No fish deliveries recorded yet.</p>
            </Card>
          )}
        </div>

        {canManageSuppliers ? (
          <Card>
            <h2 className="font-display text-xl italic text-plum-deep">Add a fisher or supplier</h2>
            <p className="mt-1 text-sm leading-5 text-muted">
              Add a fisher, boat, or fisher group before recording the fish they bring in.
            </p>
            <div className="mt-4 space-y-3">
              <Field label="Who brings the fish?">
                <Select value={supplierKind} onValueChange={setSupplierKind}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fisher">Individual fisher</SelectItem>
                    <SelectItem value="boat">Boat</SelectItem>
                    <SelectItem value="cooperative">Fisher group</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Fisher or group number">
                <Input
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                  placeholder="FISHER-001"
                  maxLength={40}
                />
              </Field>
              <Field
                label={supplierKind === "fisher" ? "Fisher's name" : "Boat or fisher group name"}
              >
                <Input
                  value={supplierName}
                  onChange={(event) => setSupplierName(event.target.value)}
                  placeholder="Name to show in records"
                />
              </Field>
              <Field label="Usual delivery place">
                <Input
                  value={landing}
                  onChange={(event) => setLanding(event.target.value)}
                  placeholder="Dunga Beach"
                />
              </Field>
              <Field label="Phone number (optional)">
                <Input
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="+254…"
                  maxLength={40}
                />
              </Field>
              <Button
                className="w-full"
                disabled={add.isPending || !code.trim() || !supplierName.trim() || !landing.trim()}
                onClick={() => add.mutate()}
              >
                Add fisher or supplier
              </Button>
            </div>
          </Card>
        ) : null}
      </section>

      <Dialog open={deliveryOpen && canManageSuppliers} onOpenChange={setDeliveryOpen}>
        <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Record fish from a fisher</DialogTitle>
            <DialogDescription>
              Enter each type of fish and its weight. The fish is added to stock, and its cost is
              recorded for Accounts.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Fisher or supplier">
                <Select
                  value={supplierId}
                  onValueChange={(value) => {
                    setSupplierId(value);
                    const selected = suppliers.data?.find(
                      (supplier) => String(supplier.id) === value,
                    );
                    if (selected) setDeliveryLanding(selected.landingSite);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    {(suppliers.data ?? []).map((supplier) => (
                      <SelectItem key={supplier.id} value={String(supplier.id)}>
                        {supplier.boatOrCoop} · {supplier.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
              <Field label="Where the fish was delivered">
                <Input
                  value={deliveryLanding}
                  onChange={(event) => setDeliveryLanding(event.target.value)}
                />
              </Field>
              <Field label="Fish temperature (°C)">
                <Input
                  type="number"
                  min={-5}
                  max={20}
                  step={0.1}
                  value={tempC}
                  onChange={(event) => setTempC(event.target.value)}
                />
              </Field>
              <Field label="Delivery note (optional)">
                <Input
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  maxLength={500}
                  placeholder="Fish quality or other details"
                />
              </Field>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-medium">Fish brought in</h3>
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => setLines((current) => [...current, newLine()])}
                  disabled={lines.length >= 30}
                >
                  Add another fish
                </Button>
              </div>
              {lines.map((line, index) => (
                <div
                  key={index}
                  className="grid gap-2 rounded-lg border border-border p-3 sm:grid-cols-[1.3fr_0.8fr_1fr_auto]"
                >
                  <Field label="Fish">
                    <Select
                      value={line.fishTypeId}
                      onValueChange={(value) => updateLine(index, { fishTypeId: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose fish" />
                      </SelectTrigger>
                      <SelectContent>
                        {(fish.data ?? [])
                          .filter(
                            (item) =>
                              !lines.some(
                                (other, otherIndex) =>
                                  otherIndex !== index && other.fishTypeId === String(item.id),
                              ),
                          )
                          .map((item) => (
                            <SelectItem key={item.id} value={String(item.id)}>
                              {item.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Weight accepted (kg)">
                    <Input
                      type="number"
                      min={0.1}
                      step={0.1}
                      value={line.quantityKg}
                      onChange={(event) => updateLine(index, { quantityKg: event.target.value })}
                    />
                  </Field>
                  <Field label="Price paid per kg (KES)">
                    <Input
                      type="number"
                      min={0}
                      step={1}
                      value={line.unitCost}
                      onChange={(event) => updateLine(index, { unitCost: event.target.value })}
                    />
                  </Field>
                  <div className="flex items-end">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={lines.length === 1}
                      onClick={() => setLines((current) => current.filter((_, i) => i !== index))}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
              <p className="text-right text-sm text-muted">
                Total to pay fisher: <strong className="text-ink">{kes(deliveryTotal)}</strong>
              </p>
            </div>

            <Button
              className="w-full"
              disabled={
                receive.isPending ||
                !supplierId ||
                !deliveryLanding.trim() ||
                lines.some(
                  (line) =>
                    !line.fishTypeId ||
                    Number(line.quantityKg) <= 0 ||
                    !Number.isFinite(Number(line.unitCost)),
                )
              }
              onClick={() => receive.mutate()}
            >
              {receive.isPending ? "Saving delivery…" : "Save delivery and add fish to stock"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={!!paying} onOpenChange={(open) => !open && setPaying(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pay a fisher or supplier</DialogTitle>
            <DialogDescription>
              {paying
                ? `${paying.supplierName} · ${paying.code} · ${kes(paying.balance)} outstanding`
                : ""}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Amount paid (KES)">
              <Input
                type="number"
                min={0.01}
                max={paying?.balance}
                step={0.01}
                value={paymentAmount}
                onChange={(event) => setPaymentAmount(event.target.value)}
              />
            </Field>
            <Field label="Payment method">
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="mpesa">M-Pesa</SelectItem>
                  <SelectItem value="bank">Bank transfer</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Payment code or note (optional)">
              <Input
                value={paymentReference}
                onChange={(event) => setPaymentReference(event.target.value)}
                maxLength={100}
              />
            </Field>
            <Button
              className="w-full"
              disabled={
                pay.isPending ||
                Number(paymentAmount) <= 0 ||
                Number(paymentAmount) > (paying?.balance ?? 0)
              }
              onClick={() => pay.mutate()}
            >
              Save payment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
