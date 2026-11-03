import { useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Fish } from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient, authEnabled, GROK_PROVIDERS, signIn } from "@/lib/auth/client";
import { claimOwnerAccess } from "@/lib/aqua/market";

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    next:
      typeof search.next === "string" &&
      search.next.startsWith("/") &&
      !search.next.startsWith("//")
        ? search.next
        : "/client",
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const { next } = Route.useSearch();
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [setupCode, setSetupCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!authEnabled) {
    return (
      <main className="grid min-h-dvh place-items-center bg-cream p-6">
        <Card className="w-full max-w-md text-center">
          <AquaLogo size="sm" />
          <h1 className="mt-5 font-display text-3xl italic text-plum-deep">
            Preview access is open
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            You can explore the customer shop and staff pages without signing in in this preview.
          </p>
          <div className="mt-5 grid gap-2 sm:grid-cols-2">
            <Button asChild>
              <Link to="/client">Customer shop</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/staff">Staff pages</Link>
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      if (mode === "sign-up") {
        const result = await authClient.signUp.email({
          name: name.trim(),
          email: email.trim(),
          password,
          callbackURL: next,
        });
        if (result.error) throw new Error(result.error.message ?? "Could not create account");
        if (setupCode.trim()) {
          await claimOwnerAccess({ data: { setupCode: setupCode.trim() } });
          await navigate({ to: "/app" });
        } else {
          await navigate({ to: next });
        }
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
          callbackURL: next,
        });
        if (result.error) throw new Error(result.error.message ?? "Could not sign in");
        await navigate({ to: next });
      }
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh bg-cream lg:grid-cols-[1fr_0.85fr]">
      <section className="flex flex-col justify-between bg-plum-deep p-6 text-cream sm:p-10">
        <Link to="/">
          <AquaLogo invert size="sm" />
        </Link>
        <div className="mx-auto max-w-lg py-16 lg:py-0">
          <div className="mb-6 grid size-14 place-items-center rounded-2xl bg-cream/10">
            <Fish className="size-7 text-lilac" />
          </div>
          <p className="text-xs font-medium tracking-[0.2em] text-lilac uppercase">
            A better fish-market day
          </p>
          <h1 className="mt-3 font-display text-4xl italic sm:text-5xl">
            Fresh from the lake, ready for your table.
          </h1>
          <p className="mt-4 max-w-md text-sm leading-6 text-lilac">
            Create an account to order fish and follow your order until pickup.
          </p>
        </div>
        <Link
          to="/client"
          className="inline-flex min-h-11 items-center gap-2 text-sm text-lilac hover:text-cream"
        >
          <ArrowLeft className="size-4" />
          Back to the fish market
        </Link>
      </section>

      <section className="grid place-items-center p-5 sm:p-8">
        <Card className="w-full max-w-md p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
            {mode === "sign-up" ? "Join the market" : "Welcome back"}
          </p>
          <h2 className="mt-2 font-display text-3xl italic text-plum-deep">
            {mode === "sign-up" ? "Create your account" : "Sign in"}
          </h2>
          <p className="mt-2 text-sm text-muted">
            Sign in to see the orders placed with your account.
          </p>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "sign-up" ? (
              <Field label="Your name">
                <Input
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              </Field>
            ) : null}
            <Field label="Email">
              <Input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Field>
            {mode === "sign-up" ? (
              <Field label="Staff setup code (staff only)">
                <Input
                  type="password"
                  autoComplete="off"
                  value={setupCode}
                  onChange={(event) => setSetupCode(event.target.value)}
                  aria-describedby="setup-code-help"
                />
                <p id="setup-code-help" className="text-xs text-muted">
                  Leave this blank if you are shopping. Ask the owner for the code if you are staff.
                </p>
              </Field>
            ) : null}
            {error ? (
              <p role="alert" className="rounded-md bg-danger/10 p-3 text-sm text-danger">
                {error}
              </p>
            ) : null}
            <Button className="w-full" disabled={busy} type="submit">
              {busy ? "Please wait…" : mode === "sign-up" ? "Create account" : "Sign in"}
            </Button>
          </form>

          <div className="my-5 flex items-center gap-3 text-xs text-muted">
            <span className="h-px flex-1 bg-border" />
            or continue with
            <span className="h-px flex-1 bg-border" />
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {GROK_PROVIDERS.map((provider) => (
              <Button
                key={provider.providerId}
                variant="secondary"
                disabled={busy}
                onClick={() =>
                  void signIn(provider.providerId, { callbackURL: next }).catch((cause: Error) =>
                    setError(cause.message),
                  )
                }
              >
                {provider.label}
              </Button>
            ))}
          </div>
          <p className="mt-5 text-center text-sm text-muted">
            {mode === "sign-up" ? "Already have an account?" : "New to the market?"}{" "}
            <button
              type="button"
              className="font-medium text-plum underline-offset-4 hover:underline"
              onClick={() => {
                setError("");
                setMode(mode === "sign-up" ? "sign-in" : "sign-up");
              }}
            >
              {mode === "sign-up" ? "Sign in" : "Create account"}
            </button>
          </p>
        </Card>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
