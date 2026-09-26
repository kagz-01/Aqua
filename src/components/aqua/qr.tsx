import { encode } from "uqr";
import { cn } from "@/lib/utils";

export function QrCode({ value, className }: { value: string; className?: string }) {
  const qr = encode(value, { ecc: "M", border: 2 });
  const cells: { x: number; y: number }[] = [];
  qr.data.forEach((row, y) => {
    row.forEach((on, x) => {
      if (on) cells.push({ x, y });
    });
  });
  return (
    <svg
      viewBox={`0 0 ${qr.size} ${qr.size}`}
      className={cn("text-plum-deep", className)}
      shapeRendering="crispEdges"
      aria-label="QR code"
    >
      <rect width={qr.size} height={qr.size} fill="#F4EDE2" />
      {cells.map((c) => (
        <rect key={`${c.x}-${c.y}`} x={c.x} y={c.y} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  );
}
