import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  markClassName?: string;
  invert?: boolean;
  withWord?: boolean;
  size?: "sm" | "md" | "lg";
};

export function AquaMark({ className, invert = false }: { className?: string; invert?: boolean }) {
  return (
    <img
      src={invert ? "/logo/logo-square.webp" : "/logo/logo-square.webp"}
      alt="Aqua"
      className={cn("object-contain", className)}
      draggable={false}
    />
  );
}

export function AquaLogo({
  className,
  markClassName,
  invert = false,
  withWord = true,
  size = "md",
}: LogoProps) {
  const width = size === "lg" ? 260 : size === "sm" ? 120 : 190;
  const height = size === "lg" ? 72 : size === "sm" ? 34 : 54;

  if (!withWord) {
    return (
      <img
        src="/logo/logo-square.webp"
        alt="Aqua"
        className={cn("object-contain", className, markClassName)}
        style={{ width: size === "lg" ? 56 : size === "sm" ? 28 : 40, height: size === "lg" ? 56 : size === "sm" ? 28 : 40 }}
        draggable={false}
      />
    );
  }

  return (
    <img
      src="/logo/logo.webp"
      alt="Aqua"
      className={cn("h-auto object-contain", className)}
      style={{ width, height }}
      draggable={false}
    />
  );
}
