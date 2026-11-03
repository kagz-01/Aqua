import type { ReactNode } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { listFish, listSuppliers, recordDelivery } from "@/lib/aqua/queries";
import { kes, kg } from "@/lib/aqua/format";
import { canMutateStock, useAquaRole } from "@/lib/aqua/role";
import { getMyAquaRole } from "@/lib/aqua/market";

export const Route = createFileRoute("/app/inventory")({ component: Inventory });

function Inventory() {
  const demoMode = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";
  const demoRole = useAquaRole((state) => state.role);
  const roleAccess = useQuery({
    queryKey: ["aqua-staff-role"],
    queryFn: () => getMyAquaRole(),
    enabled: !demoMode,
  });
  const role = demoMode ? demoRole : roleAccess.data;
  const qc = useQueryClient();
  const fish = useQuery({ queryKey: ["fish"], queryFn: () => listFish() });
  const suppliers = useQuery({ queryKey: ["suppliers"], queryFn: () => listSuppliers() });
  const [open, setOpen] = useState(false);
  const [fishTypeId, setFishTypeId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [qty, setQty] = useState("10");
  const [temp, setTemp] = useState("1.8");
  const [landing, setLanding] = useState("Dunga Beach");

  const receive = useMutation({
    mutationFn: () =>
      recordDelivery({
        data: {
          supplierId: Number(supplierId),
          landingSite: landing,
          tempC: Number(temp),
          note: "Added from the fish stock page",
          items: [{ fishTypeId: Number(fishTypeId), quantityKg: Number(qty), unitCost: 0 }],
        },
      }),
    onSuccess: async () => {
      toast.success("Delivery recorded");
      setOpen(false);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Fish stock"
        title="Fish available for sale"
        description="See how much fish is in stock, the price per kilo, and what is running low."
        action={
          role && canMutateStock(role) ? (
            <Button onClick={() => setOpen(true)}>Record fish delivery</Button>
          ) : null
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {(fish.data ?? []).map((f) => {
          const low = f.quantityKg <= f.reorderKg;
          return (
            <Card key={f.id} className="overflow-hidden p-0">
              <img
                src={`/aqua/${f.imageKey}.jpg`}
                alt={f.name}
                className="h-40 w-full object-cover"
              />
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h2 className="font-display text-2xl italic text-plum-deep">{f.name}</h2>
                    <p className="text-sm text-muted">
                      {f.localName} · {f.category}
                    </p>
                  </div>
                  <Badge variant={low ? "warn" : f.inSeason ? "ok" : "outline"}>
                    {low ? "Running low" : f.inSeason ? "In season" : "Out of season"}
                  </Badge>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-[11px] tracking-wider text-muted uppercase">In stock</dt>
                    <dd className="tabular-nums">{kg(f.quantityKg)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-wider text-muted uppercase">Price</dt>
                    <dd className="tabular-nums">{kes(f.pricePerKg)}/kg</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-wider text-muted uppercase">
                      Low-stock alert at
                    </dt>
                    <dd className="tabular-nums">{kg(f.reorderKg)}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] tracking-wider text-muted uppercase">
                      Value of stock
                    </dt>
                    <dd className="tabular-nums">{kes(f.quantityKg * f.pricePerKg)}</dd>
                  </div>
                </dl>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record fish delivery</DialogTitle>
            <DialogDescription>
              Enter the fish and weight to add it to stock and create a delivery number.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Field label="Fish">
              <Select value={fishTypeId} onValueChange={setFishTypeId}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose fish" />
                </SelectTrigger>
                <SelectContent>
                  {(fish.data ?? []).map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Fisher or supplier">
              <Select
                value={supplierId}
                onValueChange={(v) => {
                  setSupplierId(v);
                  const s = suppliers.data?.find((x) => String(x.id) === v);
                  if (s) setLanding(s.landingSite);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose a fisher or supplier" />
                </SelectTrigger>
                <SelectContent>
                  {(suppliers.data ?? []).map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.landingSite}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Where the fish came from">
              <Input value={landing} onChange={(e) => setLanding(e.target.value)} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Kg">
                <Input
                  type="number"
                  min={0.5}
                  step={0.5}
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                />
              </Field>
              <Field label="Fish temperature °C">
                <Input
                  type="number"
                  step={0.1}
                  value={temp}
                  onChange={(e) => setTemp(e.target.value)}
                />
              </Field>
            </div>
            <Button
              className="w-full"
              disabled={receive.isPending}
              onClick={() => receive.mutate()}
            >
              Add fish to stock
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
