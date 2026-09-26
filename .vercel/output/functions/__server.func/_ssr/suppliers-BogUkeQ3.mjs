import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { m as listSuppliers, r as addSupplier, t as Card } from "./queries-CAm7hpQv.mjs";
import { t as Input } from "./input-Bk0SnP9T.mjs";
import { t as Label } from "./label-BywuCh0P.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/suppliers-BogUkeQ3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Suppliers() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["suppliers"],
		queryFn: () => listSuppliers()
	});
	const [code, setCode] = (0, import_react.useState)("");
	const [landing, setLanding] = (0, import_react.useState)("");
	const [ring, setRing] = (0, import_react.useState)("");
	const add = useMutation({
		mutationFn: () => addSupplier({ data: {
			code,
			landingSite: landing,
			boatOrCoop: ring
		} }),
		onSuccess: async () => {
			toast.success("Landing ring added");
			setCode("");
			setLanding("");
			setRing("");
			await qc.invalidateQueries({ queryKey: ["suppliers"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Landings",
		title: "Dawn boats and piers",
		description: "The rings Aqua buys from — Dunga, Mbita, Uhanya, Homa Bay, Sio Port."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 lg:col-span-2",
			children: (q.data ?? []).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs text-muted",
					children: s.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-2xl italic text-plum-deep",
					children: s.landingSite
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: s.boatOrCoop
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] tracking-wider text-muted uppercase",
							children: "Reliability"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 h-1.5 overflow-hidden rounded-full bg-cream",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-plum",
								style: { width: `${s.reliability}%` }
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs tabular-nums text-muted",
							children: [s.reliability, " / 100"]
						})
					]
				})
			] }, s.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl italic text-plum-deep",
			children: "New landing"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Code",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value),
						placeholder: "KENDU-01"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Landing site",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: landing,
						onChange: (e) => setLanding(e.target.value),
						placeholder: "Kendu Bay"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Boat ring",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: ring,
						onChange: (e) => setRing(e.target.value),
						placeholder: "Kendu dawn boats"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: add.isPending,
					onClick: () => add.mutate(),
					children: "Add landing"
				})
			]
		})] })]
	})] });
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), children]
	});
}
//#endregion
export { Suppliers as component };
