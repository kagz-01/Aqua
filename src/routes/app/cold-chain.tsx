import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { PageHeader } from "@/components/aqua/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listFish, listSensors, listSuppliers, tickSensors, weighIn } from "@/lib/aqua/queries";
import { kg, tempC } from "@/lib/aqua/format";

export const Route = createFileRoute("/app/cold-chain")({ component: ColdChain });

function ColdChain() {
  const qc = useQueryClient();
  const sensors = useQuery({ queryKey: ["sensors"], queryFn: () => listSensors() });
  const fish = useQuery({ queryKey: ["fish"], queryFn: () => listFish() });
  const suppliers = useQuery({ queryKey: ["suppliers"], queryFn: () => listSuppliers() });
  const [fishTypeId, setFishTypeId] = useState("");
  const [supplierId, setSupplierId] = useState("");
  const [weight, setWeight] = useState("12.4");

  const tick = useMutation({
    mutationFn: () => tickSensors(),
    onSuccess: async () => {
      toast.success("Holds polled");
      await qc.invalidateQueries({ queryKey: ["sensors"] });
      await qc.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const weigh = useMutation({
    mutationFn: () =>
      weighIn({
        data: {
          fishTypeId: Number(fishTypeId),
          supplierId: Number(supplierId),
          kg: Number(weight),
        },
      }),
    onSuccess: async (res) => {
      toast.success(`Scale minted ${res.code}`);
      await qc.invalidateQueries();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="IoT pathway"
        title="Cold chain & scale"
        description="Sensors already report. Hardware can arrive later — the desk is listening now."
        action={
          <Button variant="secondary" onClick={() => tick.mutate()} disabled={tick.isPending}>
            Poll holds
          </Button>
        }
      />
      <div className="overflow-hidden rounded-xl">
        <img src="/aqua/cold-room.jpg" alt="Cold room" className="h-48 w-full object-cover" />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {(sensors.data ?? []).map((s) => (
          <Card key={s.id}>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted">{s.code}</p>
                <h2 className="mt-1 font-display text-xl italic text-plum-deep">{s.location}</h2>
              </div>
              <Badge variant={s.status === "ok" ? "ok" : s.status === "watch" ? "warn" : "danger"}>
                {s.status}
              </Badge>
            </div>
            <p className="mt-4 font-display text-4xl tabular-nums italic text-plum-deep">
              {s.unit === "C" ? tempC(s.value) : kg(s.value)}
            </p>
            <p className="mt-1 text-xs text-muted">
              {formatDistanceToNow(new Date(s.recordedAt), { addSuffix: true })}
            </p>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <h2 className="font-display text-xl italic text-plum-deep">Digital weigh-in</h2>
        <p className="mt-1 text-sm text-muted">
          A scale reading becomes stock and a batch in one motion.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="space-y-1.5 sm:col-span-1">
            <Label>Fish</Label>
            <Select value={fishTypeId} onValueChange={setFishTypeId}>
              <SelectTrigger>
                <SelectValue placeholder="Fish" />
              </SelectTrigger>
              <SelectContent>
                {(fish.data ?? []).map((f) => (
                  <SelectItem key={f.id} value={String(f.id)}>
                    {f.localName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Landing</Label>
            <Select value={supplierId} onValueChange={setSupplierId}>
              <SelectTrigger>
                <SelectValue placeholder="Ring" />
              </SelectTrigger>
              <SelectContent>
                {(suppliers.data ?? []).map((s) => (
                  <SelectItem key={s.id} value={String(s.id)}>
                    {s.landingSite}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Kg on scale</Label>
            <Input type="number" step={0.1} value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button className="w-full" disabled={weigh.isPending} onClick={() => weigh.mutate()}>
              Commit scale
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
