import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  ArrowRight,
  Check,
  ClipboardList,
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { AquaLogo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { kes, kg } from "@/lib/aqua/format";
import { listFish } from "@/lib/aqua/queries";
import { listMyOrders, placeCustomerOrder, type CustomerOrder } from "@/lib/aqua/market";

export const Route = createFileRoute("/client")({ component: FishMarket });

type Cart = Record<number, number>;
type MarketTab = "shop" | "orders";
const CART_KEY = "aqua-market-cart";

const ORDER_STEPS = ["placed", "confirmed", "preparing", "ready", "completed"];
const ORDER_STATUS_LABELS: Record<string, string> = {
  placed: "Order received",
  confirmed: "Confirmed",
  preparing: "Being prepared",
  ready: "Ready to collect",
  completed: "Collected",
  cancelled: "Cancelled",
};

function FishMarket() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user, isPending: sessionPending } = useCurrentUserState();
  const [cart, setCart] = useState<Cart>({});
  const [cartReady, setCartReady] = useState(false);
  const [tab, setTab] = useState<MarketTab>("shop");
  const [note, setNote] = useState("");

  const fish = useQuery({ queryKey: ["market-fish"], queryFn: () => listFish() });
  const orders = useQuery({
    queryKey: ["my-orders"],
    queryFn: () => listMyOrders(),
    enabled: Boolean(user),
  });

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CART_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Record<string, unknown>;
        const next: Cart = {};
        for (const [id, quantity] of Object.entries(parsed)) {
          const fishTypeId = Number(id);
          const quantityKg = Number(quantity);
          if (Number.isInteger(fishTypeId) && Number.isFinite(quantityKg) && quantityKg > 0) {
            next[fishTypeId] = quantityKg;
          }
        }
        setCart(next);
      }
    } catch {
      toast.error("Your saved basket could not be restored.");
    } finally {
      setCartReady(true);
    }
  }, []);

  useEffect(() => {
    if (cartReady) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart, cartReady]);

  const lines = useMemo(
    () =>
      Object.entries(cart)
        .map(([id, quantityKg]) => ({
          fish: fish.data?.find((item) => item.id === Number(id)),
          quantityKg,
        }))
        .filter((line) => line.fish && line.quantityKg > 0),
    [cart, fish.data],
  );
  const cartTotal = lines.reduce(
    (total, line) => total + (line.fish?.pricePerKg ?? 0) * line.quantityKg,
    0,
  );

  const checkout = useMutation({
    mutationFn: () =>
      placeCustomerOrder({
        data: {
          items: lines.map((line) => ({
            fishTypeId: line.fish!.id,
            quantityKg: line.quantityKg,
          })),
          note,
        },
      }),
    onSuccess: async (order) => {
      setCart({});
      setNote("");
      setTab("orders");
      toast.success(`Order ${order.code} sent to the fish house`);
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["my-orders"] }),
        queryClient.invalidateQueries({ queryKey: ["market-fish"] }),
      ]);
    },
    onError: (error: Error) => toast.error(error.message),
  });

  function changeQuantity(fishTypeId: number, next: number, stock: number) {
    setCart((current) => {
      const quantity = Math.min(stock, Math.max(0, Math.round(next * 2) / 2));
      const updated = { ...current };
      if (quantity === 0) delete updated[fishTypeId];
      else updated[fishTypeId] = quantity;
      return updated;
    });
  }

  function startCheckout() {
    if (!user) {
      void navigate({ to: "/login", search: { next: "/client" } });
      return;
    }
    checkout.mutate();
  }

  const orderCount = orders.data?.length ?? 0;

  return (
    <div className="min-h-dvh bg-cream">
      <header className="sticky top-0 z-30 border-b border-border bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link to="/">
            <AquaLogo size="sm" />
          </Link>
          <nav className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTab("shop")}
              className={`min-h-11 rounded-md px-3 text-sm font-medium ${tab === "shop" ? "bg-plum text-cream" : "text-ink-soft hover:bg-paper"}`}
            >
              Shop samaki
            </button>
            <button
              type="button"
              onClick={() => {
                if (!user) {
                  void navigate({ to: "/login", search: { next: "/client" } });
                  return;
                }
                setTab("orders");
              }}
              className={`flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium ${tab === "orders" ? "bg-plum text-cream" : "text-ink-soft hover:bg-paper"}`}
            >
              <ClipboardList className="size-4" />
              <span className="hidden sm:inline">My orders</span>
              {orderCount > 0 ? <span className="text-xs">{orderCount}</span> : null}
            </button>
            {sessionPending ? (
              <span
                className="size-9 animate-pulse rounded-full bg-lilac-soft"
                aria-label="Loading account"
              />
            ) : user ? (
              <UserButton />
            ) : (
              <Button asChild size="sm" variant="secondary">
                <Link to="/login" search={{ next: "/client" }}>
                  Sign in
                </Link>
              </Button>
            )}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        {tab === "shop" ? (
          <>
            <section className="mb-8 grid gap-6 rounded-2xl bg-plum-deep p-6 text-cream sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-medium tracking-[0.2em] text-lilac uppercase">
                  Fresh samaki from the lake
                </p>
                <h1 className="mt-3 max-w-2xl font-display text-4xl italic sm:text-5xl">
                  Choose fish for your table.
                </h1>
                <p className="mt-3 max-w-xl text-sm leading-6 text-lilac">
                  Choose the fish and kilos you want, place a pickup order, and check its progress here.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-cream/10 px-4 py-3 text-sm">
                <ShoppingBag className="size-4 text-lilac" />
                {lines.length} {lines.length === 1 ? "fish" : "fish types"} in basket
              </div>
            </section>

            <div className="grid items-start gap-6 lg:grid-cols-[1fr_21rem]">
              <section>
                <div className="mb-4 flex items-end justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                      Fish available today
                    </p>
                    <h2 className="mt-1 font-display text-2xl italic text-plum-deep">
                      Choose your fish
                    </h2>
                  </div>
                  <span className="text-xs text-muted">Price per kilo · KES</span>
                </div>
                {fish.isLoading ? (
                  <p className="rounded-xl bg-paper p-6 text-sm text-muted">
                    Loading fish available today…
                  </p>
                ) : fish.isError ? (
                  <p role="alert" className="rounded-xl bg-paper p-6 text-sm text-danger">
                    We could not load the fish list. Please try again.
                  </p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {(fish.data ?? []).map((item) => {
                      const quantity = cart[item.id] ?? 0;
                      const available = Math.max(0, item.quantityKg);
                      return (
                        <Card key={item.id} className="overflow-hidden p-0">
                          <img
                            src={`/aqua/${item.imageKey}.jpg`}
                            alt={item.name}
                            className="h-44 w-full object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                              <div>
                                <h3 className="font-display text-xl italic text-plum-deep">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-muted">
                                  {item.localName}
                                </p>
                              </div>
                              <Badge variant={available > 0 ? "ok" : "outline"}>
                                {available > 0 ? `${kg(available)} available` : "Sold out"}
                              </Badge>
                            </div>
                            <div className="mt-4 flex items-end justify-between gap-2">
                              <div>
                                <p className="text-xs text-muted">Price per kilo</p>
                                <p className="font-display text-xl italic text-plum-deep">
                                  {kes(item.pricePerKg)}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  aria-label={`Remove half a kilogram of ${item.name}`}
                                  disabled={quantity <= 0}
                                  onClick={() => changeQuantity(item.id, quantity - 0.5, available)}
                                >
                                  <Minus />
                                </Button>
                                <span className="min-w-12 text-center text-sm tabular-nums">
                                  {quantity ? kg(quantity) : "—"}
                                </span>
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  aria-label={`Add half a kilogram of ${item.name}`}
                                  disabled={quantity + 0.5 > available}
                                  onClick={() => changeQuantity(item.id, quantity + 0.5, available)}
                                >
                                  <Plus />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                )}
              </section>

              <Card className="lg:sticky lg:top-24">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl italic text-plum-deep">Your order</h2>
                  <ShoppingCart className="size-5 text-plum" />
                </div>
                {lines.length === 0 ? (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted">
                      Choose fish to start your order.
                    </p>
                  </div>
                ) : (
                  <ul className="mt-4 divide-y divide-border">
                    {lines.map(({ fish: item, quantityKg }) => (
                      <li
                        key={item!.id}
                        className="flex items-center justify-between gap-3 py-3 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="truncate font-medium">{item!.name}</p>
                          <p className="text-xs text-muted">{kg(quantityKg)}</p>
                        </div>
                        <span className="shrink-0 tabular-nums">
                          {kes(item!.pricePerKg * quantityKg)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-3 border-t border-border pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">Total so far</span>
                    <span className="font-display text-2xl italic text-plum-deep">
                      {kes(cartTotal)}
                    </span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Label htmlFor="order-note">Note for the fish house (optional)</Label>
                    <Input
                      id="order-note"
                      maxLength={300}
                      placeholder="Add a note about your order"
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                    />
                  </div>
                  <Button
                    type="button"
                    className="mt-4 w-full"
                    disabled={lines.length === 0 || checkout.isPending || !cartReady}
                    onClick={startCheckout}
                  >
                    {checkout.isPending
                      ? "Placing your order…"
                      : user
                        ? "Place order for pickup"
                        : "Sign in to checkout"}
                    <ArrowRight className="size-4" />
                  </Button>
                  <p className="mt-3 text-xs leading-5 text-muted">
                    The fish house will confirm your order. Pay when you collect it.
                  </p>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <OrdersView
            orders={orders.data ?? []}
            loading={orders.isLoading}
            error={orders.isError}
            onBack={() => setTab("shop")}
          />
        )}
      </main>
      <footer className="border-t border-border bg-paper">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>Aqua Fish Market · Dunga Beach</span>
          <Link to="/" className="hover:text-plum">
            About Aqua
          </Link>
        </div>
      </footer>
    </div>
  );
}

function OrdersView({
  orders,
  loading,
  error,
  onBack,
}: {
  orders: CustomerOrder[];
  loading: boolean;
  error: boolean;
  onBack: () => void;
}) {
  return (
    <section>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Your orders</p>
          <h1 className="mt-1 font-display text-3xl italic text-plum-deep">Check your orders</h1>
          <p className="mt-2 text-sm text-muted">
            See when your fish is confirmed, being prepared, and ready to collect.
          </p>
        </div>
        <Button type="button" variant="secondary" onClick={onBack}>
          Back to shop
        </Button>
      </div>
      {loading ? (
        <Card>
          <p className="text-sm text-muted">Loading your orders…</p>
        </Card>
      ) : error ? (
        <Card>
          <p role="alert" className="text-sm text-danger">
            We could not load your orders. Please try again.
          </p>
        </Card>
      ) : orders.length === 0 ? (
        <Card className="py-12 text-center">
          <ShoppingBag className="mx-auto size-8 text-lilac" />
          <h2 className="mt-3 font-display text-2xl italic text-plum-deep">You have no orders yet</h2>
          <p className="mt-2 text-sm text-muted">
            Orders you place will show here.
          </p>
          <Button type="button" className="mt-5" onClick={onBack}>
            Choose fish
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </section>
  );
}

function OrderCard({ order }: { order: CustomerOrder }) {
  const cancelled = order.status === "cancelled";
  const activeStep = ORDER_STEPS.indexOf(order.status);
  return (
    <Card>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-sm font-medium">{order.code}</p>
          <p className="mt-1 text-xs text-muted">{new Date(order.createdAt).toLocaleString()}</p>
        </div>
        <Badge variant={order.status === "completed" ? "ok" : cancelled ? "danger" : "warn"}>
          {ORDER_STATUS_LABELS[order.status] ?? order.status}
        </Badge>
      </div>
      {!cancelled ? (
        <ol aria-label="Order progress" className="mt-5 grid grid-cols-5 gap-1">
          {ORDER_STEPS.map((step, index) => {
            const done = index < activeStep || order.status === "completed";
            const current = index === activeStep;
            return (
              <li key={step} className="min-w-0 text-center">
                <span
                  className={`mx-auto grid size-7 place-items-center rounded-full text-xs ${done ? "bg-ok text-paper" : current ? "bg-plum text-cream" : "bg-cream text-muted"}`}
                >
                  {done ? <Check className="size-4" /> : index + 1}
                </span>
                <span className="mt-1 block truncate text-[10px] text-muted">
                  {ORDER_STATUS_LABELS[step]}
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="mt-4 text-sm text-muted">
          The fish house cancelled this order. Please contact them if you need more information.
        </p>
      )}
      <ul className="mt-4 divide-y divide-border border-t border-border">
        {order.items.map((item, index) => (
          <li
            key={`${item.fishTypeId}-${index}`}
            className="flex justify-between gap-3 py-2 text-sm"
          >
            <span>
              {item.fishName} · {kg(item.quantityKg)}
            </span>
            <span className="tabular-nums">{kes(item.unitPrice * item.quantityKg)}</span>
          </li>
        ))}
      </ul>
      {order.note ? <p className="mt-2 text-sm text-muted">Your note: {order.note}</p> : null}
      <div className="mt-3 border-t border-border pt-3 text-right">
        {order.receiptNo ? (
          <p className="mb-2 text-xs text-muted">
            Receipt {order.receiptNo} ·{" "}
            {order.paymentStatus === "paid"
              ? "Payment received"
              : "Payment still being checked"}
          </p>
        ) : null}
        <span className="mr-2 text-sm text-muted">Total</span>
        <span className="font-display text-xl italic text-plum-deep">{kes(order.total)}</span>
      </div>
    </Card>
  );
}
