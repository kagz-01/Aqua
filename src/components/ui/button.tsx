import type { ComponentProps } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[transform,background-color,color,box-shadow,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]",
  {
    variants: {
      variant: {
        default: "bg-plum text-primary-fg shadow-[var(--shadow-border)] hover:bg-plum-deep",
        secondary:
          "bg-paper text-ink shadow-[var(--shadow-border)] hover:bg-lilac-soft",
        outline:
          "border border-border-strong bg-transparent text-ink hover:bg-lilac-soft",
        ghost: "text-ink hover:bg-lilac-soft",
        cream: "bg-cream text-plum-deep hover:bg-cream-deep",
        danger: "bg-danger text-paper hover:opacity-90",
        link: "text-plum underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 rounded-sm px-3 text-xs",
        lg: "h-12 rounded-lg px-6",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { buttonVariants };
