import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { h as receiveDelivery, l as listFish, m as listSuppliers, t as Card } from "./queries-CAm7hpQv.mjs";
import { t as Input } from "./input-Bk0SnP9T.mjs";
import { t as Label } from "./label-BywuCh0P.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-F1lz8S6X.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { i as kg, r as kes } from "./format-Dxwqcto1.mjs";
import { a as useAquaRole, n as canMutateStock } from "./role-CKwjfO49.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BaBN6G_9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-Cnp3X5Hn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Inventory() {
	const role = useAquaRole((s) => s.role);
	const qc = useQueryClient();
	const fish = useQuery({
		queryKey: ["fish"],
		queryFn: () => listFish()
	});
	const suppliers = useQuery({
		queryKey: ["suppliers"],
		queryFn: () => listSuppliers()
	});
	const [open, setOpen] = (0, import_react.useState)(false);
	const [fishTypeId, setFishTypeId] = (0, import_react.useState)("");
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [qty, setQty] = (0, import_react.useState)("10");
	const [temp, setTemp] = (0, import_react.useState)("1.8");
	const [landing, setLanding] = (0, import_react.useState)("Dunga Beach");
	const receive = useMutation({
		mutationFn: () => receiveDelivery({ data: {
			fishTypeId: Number(fishTypeId),
			supplierId: Number(supplierId),
			quantityKg: Number(qty),
			tempC: Number(temp),
			landingSite: landing
		} }),
		onSuccess: async (res) => {
			toast.success(`Batch ${res.code} minted`);
			setOpen(false);
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Ice hold",
			title: "What is on the ice",
			description: "Kilos, reorder lines, and a season flag. Receive a landing to mint a batch QR.",
			action: canMutateStock(role) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: () => setOpen(true),
				children: "Receive landing"
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-3",
			children: (fish.data ?? []).map((f) => {
				const low = f.quantityKg <= f.reorderKg;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "overflow-hidden p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `/aqua/${f.imageKey}.jpg`,
						alt: f.name,
						className: "h-40 w-full object-cover"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-2xl italic text-plum-deep",
								children: f.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm text-muted",
								children: [
									f.localName,
									" · ",
									f.category
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: low ? "warn" : f.inSeason ? "ok" : "outline",
								children: low ? "Reorder" : f.inSeason ? "In season" : "Off season"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[11px] tracking-wider text-muted uppercase",
									children: "On ice"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: kg(f.quantityKg)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[11px] tracking-wider text-muted uppercase",
									children: "Price"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "tabular-nums",
									children: [kes(f.pricePerKg), "/kg"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[11px] tracking-wider text-muted uppercase",
									children: "Reorder at"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: kg(f.reorderKg)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-[11px] tracking-wider text-muted uppercase",
									children: "Hold value"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "tabular-nums",
									children: kes(f.quantityKg * f.pricePerKg)
								})] })
							]
						})]
					})]
				}, f.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open,
			onOpenChange: setOpen,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Receive a landing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: "Kilos go onto the ice and a batch code is minted." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Fish",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: fishTypeId,
							onValueChange: setFishTypeId,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Choose fish" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (fish.data ?? []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(f.id),
								children: f.name
							}, f.id)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Supplier ring",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
							value: supplierId,
							onValueChange: (v) => {
								setSupplierId(v);
								const s = suppliers.data?.find((x) => String(x.id) === v);
								if (s) setLanding(s.landingSite);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Landing ring" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (suppliers.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
								value: String(s.id),
								children: s.landingSite
							}, s.id)) })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Landing site",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: landing,
							onChange: (e) => setLanding(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Kg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: .5,
								step: .5,
								value: qty,
								onChange: (e) => setQty(e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Hold °C",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: .1,
								value: temp,
								onChange: (e) => setTemp(e.target.value)
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						disabled: receive.isPending,
						onClick: () => receive.mutate(),
						children: "Mint batch"
					})
				]
			})] })
		})
	] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { Inventory as component };
