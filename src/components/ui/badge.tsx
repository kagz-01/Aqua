import type { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-lilac-soft text-plum-deep",
        plum: "bg-plum text-cream",
        ok: "bg-ok/12 text-ok",
        warn: "bg-warn/15 text-warn",
        danger: "bg-danger/12 text-danger",
        outline: "border border-border text-muted",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export function Badge({
  className,
  variant,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
