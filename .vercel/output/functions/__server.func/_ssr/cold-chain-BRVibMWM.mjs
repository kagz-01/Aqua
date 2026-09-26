import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { l as listFish, m as listSuppliers, p as listSensors, t as Card, v as tickSensors, y as weighIn } from "./queries-CAm7hpQv.mjs";
import { t as Input } from "./input-Bk0SnP9T.mjs";
import { t as Label } from "./label-BywuCh0P.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-F1lz8S6X.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { i as kg, l as tempC } from "./format-Dxwqcto1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cold-chain-BRVibMWM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ColdChain() {
	const qc = useQueryClient();
	const sensors = useQuery({
		queryKey: ["sensors"],
		queryFn: () => listSensors()
	});
	const fish = useQuery({
		queryKey: ["fish"],
		queryFn: () => listFish()
	});
	const suppliers = useQuery({
		queryKey: ["suppliers"],
		queryFn: () => listSuppliers()
	});
	const [fishTypeId, setFishTypeId] = (0, import_react.useState)("");
	const [supplierId, setSupplierId] = (0, import_react.useState)("");
	const [weight, setWeight] = (0, import_react.useState)("12.4");
	const tick = useMutation({
		mutationFn: () => tickSensors(),
		onSuccess: async () => {
			toast.success("Holds polled");
			await qc.invalidateQueries({ queryKey: ["sensors"] });
			await qc.invalidateQueries({ queryKey: ["notes"] });
		}
	});
	const weigh = useMutation({
		mutationFn: () => weighIn({ data: {
			fishTypeId: Number(fishTypeId),
			supplierId: Number(supplierId),
			kg: Number(weight)
		} }),
		onSuccess: async (res) => {
			toast.success(`Scale minted ${res.code}`);
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "IoT pathway",
			title: "Cold chain & scale",
			description: "Sensors already report. Hardware can arrive later — the desk is listening now.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: () => tick.mutate(),
				disabled: tick.isPending,
				children: "Poll holds"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-hidden rounded-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: "/aqua/cold-room.jpg",
				alt: "Cold room",
				className: "h-48 w-full object-cover"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: (sensors.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-xs text-muted",
						children: s.code
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-xl italic text-plum-deep",
						children: s.location
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: s.status === "ok" ? "ok" : s.status === "watch" ? "warn" : "danger",
						children: s.status
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 font-display text-4xl tabular-nums italic text-plum-deep",
					children: s.unit === "C" ? tempC(s.value) : kg(s.value)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted",
					children: formatDistanceToNow(new Date(s.recordedAt), { addSuffix: true })
				})
			] }, s.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl italic text-plum-deep",
					children: "Digital weigh-in"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "A scale reading becomes stock and a batch in one motion."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5 sm:col-span-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Fish" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: fishTypeId,
								onValueChange: setFishTypeId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Fish" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (fish.data ?? []).map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(f.id),
									children: f.localName
								}, f.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Landing" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: supplierId,
								onValueChange: setSupplierId,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Ring" }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (suppliers.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(s.id),
									children: s.landingSite
								}, s.id)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kg on scale" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								step: .1,
								value: weight,
								onChange: (e) => setWeight(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "w-full",
								disabled: weigh.isPending,
								onClick: () => weigh.mutate(),
								children: "Commit scale"
							})
						})
					]
				})
			]
		})
	] });
}
//#endregion
export { ColdChain as component };
