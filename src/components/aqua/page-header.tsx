import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-medium tracking-[0.2em] text-muted uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-3xl tracking-tight text-plum-deep italic sm:text-4xl">
          {title}
        </h1>
        {description ? <p className="mt-1 max-w-xl text-sm text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
