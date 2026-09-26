import { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listNotifications, sendAlert } from "@/lib/aqua/queries";

export const Route = createFileRoute("/app/alerts")({ component: Alerts });

function Alerts() {
  const qc = useQueryClient();
  const q = useQuery({ queryKey: ["notes"], queryFn: () => listNotifications() });
  const [channel, setChannel] = useState("sms");
  const [kind, setKind] = useState("notice");
  const [to, setTo] = useState("Owner desk");
  const [message, setMessage] = useState("");

  const send = useMutation({
    mutationFn: () =>
      sendAlert({ data: { channel, kind, recipientCode: to, message } }),
    onSuccess: async () => {
      toast.success("Queued on the SMS desk");
      setMessage("");
      await qc.invalidateQueries({ queryKey: ["notes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div>
      <PageHeader
        eyebrow="SMS desk"
        title="Reach a feature phone"
        description="Low stock, payments, and the daily pulse leave this desk as SMS, WhatsApp, or USSD."
      />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <ul className="divide-y divide-border">
            {(q.data ?? []).map((n) => (
              <li key={n.id} className="py-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{n.channel}</Badge>
                  <Badge variant="outline">{n.kind}</Badge>
                  <span className="text-sm font-medium">{n.recipientCode}</span>
                  <span className="ml-auto text-[11px] text-muted">
                    {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-soft">{n.message}</p>
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-display text-xl italic text-plum-deep">Compose</h2>
          <div className="mt-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Channel</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                  <SelectItem value="ussd">USSD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Kind</Label>
              <Select value={kind} onValueChange={setKind}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["notice", "low-stock", "sale", "daily", "cold-chain"].map((k) => (
                    <SelectItem key={k} value={k}>
                      {k}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Desk / counter</Label>
              <Input value={to} onChange={(e) => setTo(e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Message</Label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
            </div>
            <Button className="w-full" disabled={send.isPending} onClick={() => send.mutate()}>
              Send
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
