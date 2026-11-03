import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { QrCode } from "@/components/aqua/qr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getBatchByCode } from "@/lib/aqua/queries";
import { kg, spoilageLabel, tempC } from "@/lib/aqua/format";
import { format } from "date-fns";

export const Route = createFileRoute("/trace/$code")({ component: Trace });

function Trace() {
  const { code } = Route.useParams();
  const q = useQuery({
    queryKey: ["trace", code],
    queryFn: () => getBatchByCode({ data: { code } }),
  });
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const sp = q.data ? spoilageLabel(q.data.batch.spoilageScore) : null;

  return (
    <div className="min-h-dvh bg-cream">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <AquaLogo size="sm" />
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="size-4" />
            Aqua
          </Link>
        </Button>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-8">
        {q.isLoading ? <p className="text-muted">Loading fish details…</p> : null}
        {q.data === null ? (
          <Card>
            <h1 className="font-display text-3xl italic text-plum-deep">
              We could not find this fish record
            </h1>
            <p className="mt-2 text-sm text-muted">
              We could not find delivery number {code}. Check the number and try again.
            </p>
          </Card>
        ) : q.data ? (
          <div className="space-y-4">
            <p className="text-[11px] tracking-[0.22em] text-muted uppercase">
              Fish delivery record
            </p>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <h1 className="font-display text-4xl italic text-plum-deep">
                {q.data.batch.fishName}
              </h1>
              {sp ? <Badge variant={sp.variant}>{sp.label}</Badge> : null}
            </div>
            <p className="font-mono text-sm text-muted">{q.data.batch.code}</p>
            <div className="grid gap-4 sm:grid-cols-[1fr_12rem]">
              <Card>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <Item k="Local name" v={q.data.batch.localName} />
                  <Item k="Where it came from" v={q.data.batch.landingSite} />
                  <Item k="Boat or fisher group" v={q.data.boatOrCoop} />
                  <Item k="Fisher or supplier number" v={q.data.batch.supplierCode} />
                  <Item
                    k="Date received"
                    v={format(new Date(q.data.batch.deliveredAt), "d MMM yyyy, HH:mm")}
                  />
                  <Item k="Temperature" v={tempC(q.data.batch.tempC)} />
                  <Item k="Weight received" v={kg(q.data.batch.quantityKg)} />
                  <Item k="Still in stock" v={kg(q.data.batch.remainingKg)} />
                </dl>
              </Card>
              <Card className="flex flex-col items-center justify-center">
                <QrCode value={`${origin}/trace/${q.data.batch.code}`} className="size-36" />
                <p className="mt-2 text-center text-[11px] text-muted">
                  Scan to open this fish record
                </p>
              </Card>
            </div>
            <Card>
              <h2 className="font-display text-xl italic text-plum-deep">Where it was sold</h2>
              {q.data.hops.length === 0 ? (
                <p className="mt-2 text-sm text-muted">This fish has not been sold yet.</p>
              ) : (
                <ol className="mt-3 space-y-3">
                  {q.data.hops.map((h) => (
                    <li
                      key={h.receiptNo}
                      className="flex items-center justify-between gap-3 text-sm"
                    >
                      <span>
                        <span className="font-medium">{h.customerCode}</span>
                        <span className="text-muted"> · {h.receiptNo}</span>
                      </span>
                      <span className="tabular-nums text-muted">{kg(h.qtyKg)}</span>
                    </li>
                  ))}
                </ol>
              )}
            </Card>
          </div>
        ) : null}
      </main>
    </div>
  );
}

function Item({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-[11px] tracking-wider text-muted uppercase">{k}</dt>
      <dd className="mt-0.5">{v}</dd>
    </div>
  );
}
