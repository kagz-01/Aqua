import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ROLE_META, useAquaRole, type AquaRole } from "@/lib/aqua/role";

export const Route = createFileRoute("/enter")({ component: Enter });

function Enter() {
  const navigate = useNavigate();
  const setRole = useAquaRole((s) => s.setRole);

  function pick(role: AquaRole) {
    setRole(role);
    navigate({ to: "/app" });
  }

  return (
    <div className="min-h-dvh bg-cream">
      <div className="mx-auto flex min-h-dvh max-w-4xl flex-col px-4 py-10 sm:px-6">
        <div className="flex items-center justify-between">
          <Link to="/">
            <AquaLogo size="sm" />
          </Link>
          <Button asChild variant="ghost" size="sm">
            <Link to="/">Back</Link>
          </Button>
        </div>
        <div className="my-auto py-10">
          <p className="text-[11px] font-medium tracking-[0.22em] text-muted uppercase">House flow</p>
          <h1 className="mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl">
            Choose the desk that matches the work today.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Aqua runs one live fish house. Pick the role you need, then switch anytime between owner,
            house manager, and floor work.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {(Object.keys(ROLE_META) as AquaRole[]).map((key) => {
              const m = ROLE_META[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => pick(key)}
                  className="group rounded-xl bg-paper p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-lift)] active:scale-[0.98]"
                >
                  <p className="text-[11px] tracking-[0.18em] text-muted uppercase">{m.desk}</p>
                  <h2 className="mt-2 font-display text-2xl italic text-plum-deep">{m.title}</h2>
                  <p className="mt-2 text-sm text-muted">{m.blurb}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-plum">
                    Open as {m.title}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
