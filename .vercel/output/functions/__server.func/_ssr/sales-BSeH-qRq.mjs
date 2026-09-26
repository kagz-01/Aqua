import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as cn, t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { c as listCustomers, f as listSales, g as recordSale, i as confirmMpesa, l as listFish, t as Card } from "./queries-CAm7hpQv.mjs";
import { t as Label } from "./label-BywuCh0P.mjs";
import { f as Plus, o as Smartphone, p as Minus } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-F1lz8S6X.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as kg, o as paymentLabel, r as kes } from "./format-Dxwqcto1.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BaBN6G_9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sales-BSeH-qRq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SalesFloor() {
	const qc = useQueryClient();
	const fish = useQuery({
		queryKey: ["fish"],
		queryFn: () => listFish()
	});
	const customers = useQuery({
		queryKey: ["customers"],
		queryFn: () => listCustomers()
	});
	const sales = useQuery({
		queryKey: ["sales"],
		queryFn: () => listSales()
	});
	const [customerId, setCustomerId] = (0, import_react.useState)("");
	const [method, setMethod] = (0, import_react.useState)("mpesa");
	const [lines, setLines] = (0, import_react.useState)({});
	const [stk, setStk] = (0, import_react.useState)(null);
	const [phase, setPhase] = (0, import_react.useState)("push");
	const [mpesaRef, setMpesaRef] = (0, import_react.useState)("");
	const items = (0, import_react.useMemo)(() => Object.entries(lines).map(([id, qty]) => ({
		fishTypeId: Number(id),
		qtyKg: qty
	})).filter((i) => i.qtyKg > 0), [lines]);
	const total = items.reduce((s, i) => {
		const f = fish.data?.find((x) => x.id === i.fishTypeId);
		return s + (f ? f.pricePerKg * i.qtyKg : 0);
	}, 0);
	const sell = useMutation({
		mutationFn: () => recordSale({ data: {
			customerId: Number(customerId),
			method,
			items
		} }),
		onSuccess: async (res) => {
			toast.success(`Receipt ${res.receiptNo} written`);
			setLines({});
			await qc.invalidateQueries();
			if (res.method === "mpesa") {
				setPhase("push");
				setStk({
					saleId: res.saleId,
					receiptNo: res.receiptNo,
					total: res.total
				});
				window.setTimeout(async () => {
					const conf = await confirmMpesa({ data: { saleId: res.saleId } });
					setMpesaRef(conf.mpesaReceipt);
					setPhase("ok");
					await qc.invalidateQueries();
				}, 1800);
			}
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Sales floor",
			title: "Write a sale",
			description: "Lines pull FIFO from the oldest crate. M-Pesa sends an STK, then the book closes itself."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "On the ice"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 divide-y divide-border",
					children: (fish.data ?? []).map((f) => {
						const qty = lines[f.id] ?? 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `/aqua/${f.imageKey}.jpg`,
									alt: "",
									className: "size-14 rounded-md object-cover"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: f.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											f.localName,
											" · ",
											kes(f.pricePerKg),
											"/kg · ",
											kg(f.quantityKg)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-9",
											"aria-label": `Less ${f.name}`,
											onClick: () => setLines((prev) => ({
												...prev,
												[f.id]: Math.max(0, (prev[f.id] ?? 0) - .5)
											})),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, { className: "size-4" })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "w-10 text-center tabular-nums text-sm",
											children: qty || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "ghost",
											size: "icon",
											className: "size-9",
											"aria-label": `More ${f.name}`,
											onClick: () => setLines((prev) => ({
												...prev,
												[f.id]: Math.min(f.quantityKg, (prev[f.id] ?? 0) + .5)
											})),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
										})
									]
								})
							]
						}, f.id);
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "Till"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Counter" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: customerId,
								onValueChange: setCustomerId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose a counter" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (customers.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(c.id),
									children: c.code
								}, c.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Pay with" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid grid-cols-2 gap-2",
								children: ["mpesa", "cash"].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setMethod(m),
									className: cn("h-11 rounded-md text-sm font-medium", method === m ? "bg-plum text-cream" : "bg-cream text-ink"),
									children: m === "mpesa" ? "M-Pesa STK" : "Cash"
								}, m))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-baseline justify-between border-t border-border pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-3xl tabular-nums italic text-plum-deep",
								children: kes(total)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "w-full",
							size: "lg",
							disabled: !customerId || items.length === 0 || sell.isPending,
							onClick: () => sell.mutate(),
							children: method === "mpesa" ? "Send STK Push" : "Take cash"
						})
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl italic text-plum-deep",
				children: "Recent receipts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 overflow-x-auto",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "text-[11px] tracking-wider text-muted uppercase",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Receipt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Counter"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Pay"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "pb-2 text-right font-medium",
								children: "Total"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (sales.data ?? []).slice(0, 12).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-t border-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 font-mono text-xs",
								children: s.receiptNo
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5",
								children: s.customerCode
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5",
								children: paymentLabel(s.paymentMethod)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									variant: s.paymentStatus === "paid" ? "ok" : "warn",
									children: s.paymentStatus
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-2.5 text-right tabular-nums",
								children: kes(s.total)
							})
						]
					}, s.id)) })]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!stk,
			onOpenChange: (o) => !o && setStk(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: phase === "push" ? "STK Push sent" : "M-Pesa confirmed" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: phase === "push" ? "A prompt is on 2547•••221. Aqua is waiting for Daraja." : `Receipt ${stk?.receiptNo} is closed.` })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto w-48 rounded-[2rem] bg-ink p-3 text-cream shadow-[var(--shadow-lift)]",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-[1.4rem] bg-plum-deep p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "size-5 text-lilac" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-[10px] tracking-[0.2em] text-lilac uppercase",
								children: "Safaricom"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-2xl italic",
								children: phase === "push" ? "Enter PIN" : mpesaRef
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-lilac",
								children: [kes(stk?.total ?? 0), " · Aqua Fish House"]
							})
						]
					})
				}),
				phase === "ok" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					onClick: () => setStk(null),
					children: "Done"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-xs text-muted",
					children: "Listening for the callback…"
				})
			] })
		})
	] });
}
//#endregion
export { SalesFloor as component };
