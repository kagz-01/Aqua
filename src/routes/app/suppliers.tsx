import type { ReactNode } from "react";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PageHeader } from "@/components/aqua/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addSupplier, listSuppliers } from "@/lib/aqua/queries";

export const Route = createFileRoute("/app/suppliers")({ component: Suppliers });

function Suppliers() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["suppliers"], queryFn: () => listSuppliers() });
  const [code, setCode] = useState("");
  const [landing, setLanding] = useState("");
  const [ring, setRing] = useState("");

  const add = useMutation({
    mutationFn: () =>
      addSupplier({ data: { code, landingSite: landing, boatOrCoop: ring } }),
    onSuccess: async () => {
      toast.success("Landing ring added");
      setCode("");
      setLanding("");
      setRing("");
      await qc.invalidateQueries({ queryKey: ["suppliers"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Landings"
        title="Dawn boats and piers"
        description="The rings Aqua buys from — Dunga, Mbita, Uhanya, Homa Bay, Sio Port."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
          {(q.data ?? []).map((s) => (
            <Card key={s.id}>
              <p className="font-mono text-xs text-muted">{s.code}</p>
              <h2 className="mt-1 font-display text-2xl italic text-plum-deep">{s.landingSite}</h2>
              <p className="text-sm text-muted">{s.boatOrCoop}</p>
              <div className="mt-4">
                <p className="text-[11px] tracking-wider text-muted uppercase">Reliability</p>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-cream">
                  <div className="h-full bg-plum" style={{ width: `${s.reliability}%` }} />
                </div>
                <p className="mt-1 text-xs tabular-nums text-muted">{s.reliability} / 100</p>
              </div>
            </Card>
          ))}
        </div>
        <Card>
          <h2 className="font-display text-xl italic text-plum-deep">New landing</h2>
          <div className="mt-4 space-y-3">
            <Field label="Code">
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="KENDU-01" />
            </Field>
            <Field label="Landing site">
              <Input
                value={landing}
                onChange={(e) => setLanding(e.target.value)}
                placeholder="Kendu Bay"
              />
            </Field>
            <Field label="Boat ring">
              <Input value={ring} onChange={(e) => setRing(e.target.value)} placeholder="Kendu dawn boats" />
            </Field>
            <Button className="w-full" disabled={add.isPending} onClick={() => add.mutate()}>
              Add landing
            </Button>
          </div>
        </Card>
      </div>
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
