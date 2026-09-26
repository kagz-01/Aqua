export function kes(n: number) {
  return `KES ${Math.round(n).toLocaleString("en-KE")}`;
}

export function kg(n: number) {
  return `${n.toLocaleString("en-KE", { maximumFractionDigits: 1 })} kg`;
}

export function tempC(n: number) {
  return `${n.toFixed(1)}°C`;
}

export function initials(label: string) {
  return label
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export function mpesaReceipt() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "QK";
  for (let i = 0; i < 8; i += 1) out += alphabet[Math.floor(Math.random() * alphabet.length)];
  return out;
}

export function batchCode(landing: string) {
  const slug = landing.replace(/[^A-Za-z]/g, "").slice(0, 5).toUpperCase() || "LAKE";
  const n = Math.floor(1000 + Math.random() * 9000);
  return `AQ-${slug}-${n}`;
}

export function receiptNo() {
  const d = new Date();
  const y = String(d.getFullYear()).slice(2);
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const n = Math.floor(10 + Math.random() * 89);
  return `R-${y}${m}${day}-${n}`;
}

export function spoilageLabel(score: number) {
  if (score >= 70) return { label: "At risk", variant: "danger" as const };
  if (score >= 40) return { label: "Watch", variant: "warn" as const };
  return { label: "Fresh", variant: "ok" as const };
}

export function paymentLabel(method: string) {
  if (method === "mpesa") return "M-Pesa";
  if (method === "cash") return "Cash";
  return method;
}
