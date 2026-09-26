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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addCustomer, listCustomers } from "@/lib/aqua/queries";
import { initials, kes } from "@/lib/aqua/format";

export const Route = createFileRoute("/app/customers")({ component: Customers });

function Customers() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["customers"], queryFn: () => listCustomers() });
  const [code, setCode] = useState("");
  const [kind, setKind] = useState("hotel");

  const add = useMutation({
    mutationFn: () => addCustomer({ data: { code, kind } }),
    onSuccess: async () => {
      toast.success("Counter added");
      setCode("");
      await qc.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="Counters"
        title="Who buys from the ice"
        description="Hotels, stalls, and walk-ins. Credit is a house balance — not a person’s name."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {(q.data ?? []).map((c) => (
              <li key={c.id} className="flex items-center gap-3 py-3">
                <span className="flex size-10 items-center justify-center rounded-md bg-lilac-soft font-display text-sm italic text-plum-deep">
                  {initials(c.code)}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{c.code}</p>
                  <p className="text-xs text-muted capitalize">{c.kind}</p>
                </div>
                {c.creditBalance > 0 ? (
                  <Badge variant="warn">Credit {kes(c.creditBalance)}</Badge>
                ) : (
                  <Badge variant="ok">Clear</Badge>
                )}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl italic text-plum-deep">New counter</h2>
          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>House name</Label>
              <Input value={code} onChange={(e) => setCode(e.target.value)} placeholder="Portside Grill" />
            </div>
            <div className="space-y-1.5">
              <Label>Kind</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["hotel", "market", "stall", "retail", "walkin"].map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" disabled={add.isPending} onClick={() => add.mutate()}>
              Add counter
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
