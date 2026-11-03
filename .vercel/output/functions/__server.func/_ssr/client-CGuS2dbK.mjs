import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as AquaLogo } from "./logo-BmuP4i1f.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-FFY7azfy.mjs";
import { t as UserButton } from "./gates-COnb1nO8.mjs";
import { D as ArrowRight, S as ClipboardList, _ as Minus, c as ShoppingCart, h as Plus, l as ShoppingBag, w as Check } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { a as placeCustomerOrder, r as listMyOrders } from "./market-MTwPjtLG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as Badge } from "./badge-CagA4FK0.mjs";
import { t as Input } from "./input-BvKihy7W.mjs";
import { t as Label } from "./label-BAlLFZIs.mjs";
import { l as listFish } from "./queries-CT8ciPVn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as kes, r as kg } from "./format-pMYX4z-1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-CGuS2dbK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CART_KEY = "aqua-market-cart";
var ORDER_STEPS = [
	"placed",
	"confirmed",
	"preparing",
	"ready",
	"completed"
];
function FishMarket() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { user, isPending: sessionPending } = useCurrentUserState();
	const [cart, setCart] = (0, import_react.useState)({});
	const [cartReady, setCartReady] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("shop");
	const [note, setNote] = (0, import_react.useState)("");
	const fish = useQuery({
		queryKey: ["market-fish"],
		queryFn: () => listFish()
	});
	const orders = useQuery({
		queryKey: ["my-orders"],
		queryFn: () => listMyOrders(),
		enabled: Boolean(user)
	});
	(0, import_react.useEffect)(() => {
		try {
			const saved = window.localStorage.getItem(CART_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				const next = {};
				for (const [id, quantity] of Object.entries(parsed)) {
					const fishTypeId = Number(id);
					const quantityKg = Number(quantity);
					if (Number.isInteger(fishTypeId) && Number.isFinite(quantityKg) && quantityKg > 0) next[fishTypeId] = quantityKg;
				}
				setCart(next);
			}
		} catch {
			toast.error("Your saved basket could not be restored.");
		} finally {
			setCartReady(true);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (cartReady) window.localStorage.setItem(CART_KEY, JSON.stringify(cart));
	}, [cart, cartReady]);
	const lines = (0, import_react.useMemo)(() => Object.entries(cart).map(([id, quantityKg]) => ({
		fish: fish.data?.find((item) => item.id === Number(id)),
		quantityKg
	})).filter((line) => line.fish && line.quantityKg > 0), [cart, fish.data]);
	const cartTotal = lines.reduce((total, line) => total + (line.fish?.pricePerKg ?? 0) * line.quantityKg, 0);
	const checkout = useMutation({
		mutationFn: () => placeCustomerOrder({ data: {
			items: lines.map((line) => ({
				fishTypeId: line.fish.id,
				quantityKg: line.quantityKg
			})),
			note
		} }),
		onSuccess: async (order) => {
			setCart({});
			setNote("");
			setTab("orders");
			toast.success(`Order ${order.code} sent to the fish house`);
			await Promise.all([queryClient.invalidateQueries({ queryKey: ["my-orders"] }), queryClient.invalidateQueries({ queryKey: ["market-fish"] })]);
		},
		onError: (error) => toast.error(error.message)
	});
	function changeQuantity(fishTypeId, next, stock) {
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
			navigate({
				to: "/login",
				search: { next: "/client" }
			});
			return;
		}
		checkout.mutate();
	}
	const orderCount = orders.data?.length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "sticky top-0 z-30 border-b border-border bg-cream/90 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setTab("shop"),
								className: `min-h-11 rounded-md px-3 text-sm font-medium ${tab === "shop" ? "bg-plum text-cream" : "text-ink-soft hover:bg-paper"}`,
								children: "Shop fish"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									if (!user) {
										navigate({
											to: "/login",
											search: { next: "/client" }
										});
										return;
									}
									setTab("orders");
								},
								className: `flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium ${tab === "orders" ? "bg-plum text-cream" : "text-ink-soft hover:bg-paper"}`,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, { className: "size-4" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "hidden sm:inline",
										children: "My orders"
									}),
									orderCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs",
										children: orderCount
									}) : null
								]
							}),
							sessionPending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "size-9 animate-pulse rounded-full bg-lilac-soft",
								"aria-label": "Loading account"
							}) : user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/login",
									search: { next: "/client" },
									children: "Sign in"
								})
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12",
				children: tab === "shop" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mb-8 grid gap-6 rounded-2xl bg-plum-deep p-6 text-cream sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.2em] text-lilac uppercase",
							children: "Lakeside fish market"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 max-w-2xl font-display text-4xl italic sm:text-5xl",
							children: "Choose the catch for your table."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-sm leading-6 text-lilac",
							children: "Browse today’s selection, build your basket, and follow your pickup order from your account."
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-lg bg-cream/10 px-4 py-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "size-4 text-lilac" }),
							lines.length,
							" ",
							lines.length === 1 ? "fish" : "fish types",
							" in basket"
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid items-start gap-6 lg:grid-cols-[1fr_21rem]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
							children: "Fresh selection"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-2xl italic text-plum-deep",
							children: "Today on the ice"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "Prices per kg · KES"
						})]
					}), fish.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl bg-paper p-6 text-sm text-muted",
						children: "Loading today’s catch…"
					}) : fish.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						role: "alert",
						className: "rounded-xl bg-paper p-6 text-sm text-danger",
						children: "The market could not load. Refresh and try again."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
						children: (fish.data ?? []).map((item) => {
							const quantity = cart[item.id] ?? 0;
							const available = Math.max(0, item.quantityKg);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
								className: "overflow-hidden p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/aqua/${item.imageKey}.jpg`,
									alt: item.name,
									className: "h-44 w-full object-cover"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-xl italic text-plum-deep",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-sm text-muted",
											children: [
												item.localName,
												" · ",
												item.category
											]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											variant: available > 0 ? "ok" : "outline",
											children: available > 0 ? `${kg(available)} available` : "Sold out"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-end justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: "Per kilogram"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "font-display text-xl italic text-plum-deep",
											children: kes(item.pricePerKg)
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-1",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													size: "icon",
													variant: "ghost",
													"aria-label": `Remove half a kilogram of ${item.name}`,
													disabled: quantity <= 0,
													onClick: () => changeQuantity(item.id, quantity - .5, available),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "min-w-12 text-center text-sm tabular-nums",
													children: quantity ? kg(quantity) : "—"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
													type: "button",
													size: "icon",
													variant: "ghost",
													"aria-label": `Add half a kilogram of ${item.name}`,
													disabled: quantity + .5 > available,
													onClick: () => changeQuantity(item.id, quantity + .5, available),
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
												})
											]
										})]
									})]
								})]
							}, item.id);
						})
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "lg:sticky lg:top-24",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-display text-2xl italic text-plum-deep",
									children: "Your basket"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingCart, { className: "size-5 text-plum" })]
							}),
							lines.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "py-8 text-center",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Your basket is waiting for something fresh."
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "mt-4 divide-y divide-border",
								children: lines.map(({ fish: item, quantityKg }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between gap-3 py-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-medium",
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-xs text-muted",
											children: kg(quantityKg)
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "shrink-0 tabular-nums",
										children: kes(item.pricePerKg * quantityKg)
									})]
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 border-t border-border pt-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted",
											children: "Estimated total"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-display text-2xl italic text-plum-deep",
											children: kes(cartTotal)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 space-y-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: "order-note",
											children: "Pickup note (optional)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "order-note",
											maxLength: 300,
											placeholder: "Anything the fish house should know?",
											value: note,
											onChange: (event) => setNote(event.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										className: "mt-4 w-full",
										disabled: lines.length === 0 || checkout.isPending || !cartReady,
										onClick: startCheckout,
										children: [checkout.isPending ? "Sending order…" : user ? "Place pickup order" : "Sign in to checkout", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-3 text-xs leading-5 text-muted",
										children: "This sends an order request. The fish house will confirm availability and pickup timing. Payment is arranged at pickup."
									})
								]
							})
						]
					})]
				})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrdersView, {
					orders: orders.data ?? [],
					loading: orders.isLoading,
					error: orders.isError,
					onBack: () => setTab("shop")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border bg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aqua Fish Market · Dunga Beach" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-plum",
						children: "About Aqua"
					})]
				})
			})
		]
	});
}
function OrdersView({ orders, loading, error, onBack }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-wrap items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
				children: "Your account"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 font-display text-3xl italic text-plum-deep",
				children: "Order tracking"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Follow each request as the fish house prepares it."
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			variant: "secondary",
			onClick: onBack,
			children: "Back to the market"
		})]
	}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading your orders…"
	}) }) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "text-sm text-danger",
		children: "Orders could not be loaded. Please try again."
	}) }) : orders.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "py-12 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShoppingBag, { className: "mx-auto size-8 text-lilac" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-3 font-display text-2xl italic text-plum-deep",
				children: "No orders yet"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "Your placed orders will appear here with live status updates."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				className: "mt-5",
				onClick: onBack,
				children: "Browse fish"
			})
		]
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: orders.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OrderCard, { order }, order.id))
	})] });
}
function OrderCard({ order }) {
	const cancelled = order.status === "cancelled";
	const activeStep = ORDER_STEPS.indexOf(order.status);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-sm font-medium",
				children: order.code
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: new Date(order.createdAt).toLocaleString()
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: order.status === "completed" ? "ok" : cancelled ? "danger" : "warn",
				children: order.status
			})]
		}),
		!cancelled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			"aria-label": "Order progress",
			className: "mt-5 grid grid-cols-5 gap-1",
			children: ORDER_STEPS.map((step, index) => {
				const done = index < activeStep || order.status === "completed";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "min-w-0 text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `mx-auto grid size-7 place-items-center rounded-full text-xs ${done ? "bg-ok text-paper" : index === activeStep ? "bg-plum text-cream" : "bg-cream text-muted"}`,
						children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : index + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block truncate text-[10px] capitalize text-muted",
						children: step
					})]
				}, step);
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-4 text-sm text-muted",
			children: "This order was cancelled by the fish house."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border border-t border-border",
			children: order.items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "flex justify-between gap-3 py-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					item.fishName,
					" · ",
					kg(item.quantityKg)
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "tabular-nums",
					children: kes(item.unitPrice * item.quantityKg)
				})]
			}, `${item.fishTypeId}-${index}`))
		}),
		order.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm text-muted",
			children: ["Note: ", order.note]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 border-t border-border pt-3 text-right",
			children: [
				order.receiptNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mb-2 text-xs text-muted",
					children: [
						"Receipt ",
						order.receiptNo,
						" ·",
						" ",
						order.paymentStatus === "paid" ? "Payment received" : "Payment awaiting reconciliation"
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-2 text-sm text-muted",
					children: "Total"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-xl italic text-plum-deep",
					children: kes(order.total)
				})
			]
		})
	] });
}
//#endregion
export { FishMarket as component };
