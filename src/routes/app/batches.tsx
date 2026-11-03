import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageHeader } from "@/components/aqua/page-header";
import { QrCode } from "@/components/aqua/qr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { listBatches } from "@/lib/aqua/queries";
import { kg, spoilageLabel, tempC } from "@/lib/aqua/format";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/app/batches")({ component: Batches });

function Batches() {
  const q = useQuery({ queryKey: ["batches"], queryFn: () => listBatches() });
  const [code, setCode] = useState<string | null>(null);
  const selected = q.data?.find((b) => b.code === code);
  const origin = typeof window !== "undefined" ? window.location.origin : "https://aqua.local";

  return (
    <div>
      <PageHeader
        eyebrow="Fish delivery records"
        title="Where each fish came from"
        description="Open a fish record or show its QR code to check where it came from and where it went."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {(q.data ?? []).map((b) => {
          const sp = spoilageLabel(b.spoilageScore);
          return (
            <Card key={b.id} className="flex flex-col">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-mono text-xs tracking-wide text-muted">{b.code}</p>
                  <h2 className="mt-1 font-display text-xl italic text-plum-deep">{b.fishName}</h2>
                  <p className="text-sm text-muted">
                    {b.landingSite} · {b.supplierCode}
                  </p>
                </div>
                <Badge variant={sp.variant}>{sp.label}</Badge>
              </div>
              <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <dt className="text-[11px] text-muted uppercase">Still in stock</dt>
                  <dd className="tabular-nums">{kg(b.remainingKg)}</dd>
                </div>
                <div>
                  <dt className="text-[11px] text-muted uppercase">Temperature</dt>
                  <dd className="tabular-nums">{tempC(b.tempC)}</dd>
                </div>
              </dl>
              <p className="mt-2 text-xs text-muted">
                Received {formatDistanceToNow(new Date(b.deliveredAt), { addSuffix: true })}
              </p>
              <div className="mt-4 flex gap-2">
                <Button size="sm" variant="secondary" onClick={() => setCode(b.code)}>
                  Show QR code
                </Button>
                <Button asChild size="sm" variant="ghost">
                  <Link to="/trace/$code" params={{ code: b.code }}>
                    View fish record
                  </Link>
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      <Dialog open={!!code} onOpenChange={(o) => !o && setCode(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selected?.fishName}</DialogTitle>
            <DialogDescription>
              {selected?.code} · {selected?.landingSite}
            </DialogDescription>
          </DialogHeader>
          {selected ? (
            <div className="flex flex-col items-center gap-3">
              <QrCode value={`${origin}/trace/${selected.code}`} className="size-52 rounded-lg" />
              <p className="font-mono text-xs text-muted">
                {origin}/trace/{selected.code}
              </p>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
