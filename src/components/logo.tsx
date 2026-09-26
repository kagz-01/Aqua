import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  invert?: boolean;
  withWord?: boolean;
  size?: "sm" | "md" | "lg";
};

export function AquaMark({ className, invert = false }: { className?: string; invert?: boolean }) {
  const fill = invert ? "#F4EDE2" : "#3D2463";
  const eye = invert ? "#3D2463" : "#F4EDE2";
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("size-9", className)}
      aria-hidden="true"
    >
      <rect width="64" height="64" rx="18" fill={invert ? "#3D2463" : "#5B2C91"} />
      <path
        d="M14 36c8-2 14-10 18-18 1.2 7 6 13 14 16-7 2-12 7-14 16-3-8-10-13-18-14Z"
        fill={fill}
      />
      <path
        d="M12 42c10 0 18 2 28 0 8-1.4 14-1 20 2"
        fill="none"
        stroke={fill}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.75"
      />
      <circle cx="40.5" cy="30.5" r="2.1" fill={eye} />
    </svg>
  );
}

export function AquaLogo({
  className,
  markClassName,
  invert = false,
  withWord = true,
  size = "md",
}: LogoProps) {
  const word = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
  const mark = size === "lg" ? "size-12" : size === "sm" ? "size-8" : "size-9";
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <AquaMark invert={invert} className={cn(mark, markClassName)} />
      {withWord ? (
        <span className="leading-none">
          <span
            className={cn(
              "block font-display italic tracking-tight",
              word,
              invert ? "text-cream" : "text-plum-deep",
            )}
          >
            Aqua
          </span>
          {size !== "sm" ? (
            <span
              className={cn(
                "mt-0.5 block text-[10px] font-medium uppercase tracking-[0.22em]",
                invert ? "text-lilac" : "text-muted",
              )}
            >
              Lakeside
            </span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
