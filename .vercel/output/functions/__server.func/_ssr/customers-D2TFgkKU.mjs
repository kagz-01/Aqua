import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { c as listCustomers, n as addCustomer, t as Card } from "./queries-CAm7hpQv.mjs";
import { t as Input } from "./input-Bk0SnP9T.mjs";
import { t as Label } from "./label-BywuCh0P.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-F1lz8S6X.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as initials, r as kes } from "./format-Dxwqcto1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/customers-D2TFgkKU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Customers() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["customers"],
		queryFn: () => listCustomers()
	});
	const [code, setCode] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("hotel");
	const add = useMutation({
		mutationFn: () => addCustomer({ data: {
			code,
			kind
		} }),
		onSuccess: async () => {
			toast.success("Counter added");
			setCode("");
			await qc.invalidateQueries({ queryKey: ["customers"] });
		},
		onError: (e) => toast.error(e.message)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Counters",
		title: "Who buys from the ice",
		description: "Hotels, stalls, and walk-ins. Credit is a house balance — not a person’s name."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "lg:col-span-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "divide-y divide-border",
				children: (q.data ?? []).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-10 items-center justify-center rounded-md bg-lilac-soft font-display text-sm italic text-plum-deep",
							children: initials(c.code)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-medium",
								children: c.code
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted capitalize",
								children: c.kind
							})]
						}),
						c.creditBalance > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "warn",
							children: ["Credit ", kes(c.creditBalance)]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "ok",
							children: "Clear"
						})
					]
				}, c.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-xl italic text-plum-deep",
			children: "New counter"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "House name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: code,
						onChange: (e) => setCode(e.target.value),
						placeholder: "Portside Grill"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Kind" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
						value: kind,
						onValueChange: setKind,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
							"hotel",
							"market",
							"stall",
							"retail",
							"walkin"
						].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: k,
							children: k
						}, k)) })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "w-full",
					disabled: add.isPending,
					onClick: () => add.mutate(),
					children: "Add counter"
				})
			]
		})] })]
	})] });
}
//#endregion
export { Customers as component };
