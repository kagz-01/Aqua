import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getBatchByCode, t as Card } from "./queries-CAm7hpQv.mjs";
import { C as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as format } from "../_libs/date-fns.mjs";
import { c as spoilageLabel, i as kg, l as tempC } from "./format-Dxwqcto1.mjs";
import { t as AquaLogo } from "./logo-CxgPjKny.mjs";
import { t as QrCode } from "./qr-Cb-VYBDp.mjs";
import { n as Route } from "./router-CVqZE3rt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/trace._code-B1iORr1M.js
var import_jsx_runtime = require_jsx_runtime();
function Trace() {
	const { code } = Route.useParams();
	const q = useQuery({
		queryKey: ["trace", code],
		queryFn: () => getBatchByCode({ data: { code } })
	});
	const origin = typeof window !== "undefined" ? window.location.origin : "";
	const sp = q.data ? spoilageLabel(q.data.batch.spoilageScore) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex h-16 max-w-3xl items-center justify-between px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "ghost",
				size: "sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Aqua"]
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto max-w-3xl px-4 py-8",
			children: [q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Reading the trail…"
			}) : null, q.data === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl italic text-plum-deep",
				children: "No such batch"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted",
				children: [code, " is not on the ice. Check the tag, or try AQ-DUNGA-8841."]
			})] }) : q.data ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] tracking-[0.22em] text-muted uppercase",
						children: "Catch-to-sale trail"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-end justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-4xl italic text-plum-deep",
							children: q.data.batch.fishName
						}), sp ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: sp.variant,
							children: sp.label
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm text-muted",
						children: q.data.batch.code
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-[1fr_12rem]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "grid grid-cols-2 gap-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Local name",
									v: q.data.batch.localName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Landing",
									v: q.data.batch.landingSite
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Ring",
									v: q.data.boatOrCoop
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Supplier",
									v: q.data.batch.supplierCode
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Landed",
									v: format(new Date(q.data.batch.deliveredAt), "d MMM yyyy, HH:mm")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Hold",
									v: tempC(q.data.batch.tempC)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Landed weight",
									v: kg(q.data.batch.quantityKg)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									k: "Still on ice",
									v: kg(q.data.batch.remainingKg)
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
								value: `${origin}/trace/${q.data.batch.code}`,
								className: "size-36"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-center text-[11px] text-muted",
								children: "Scan to share this trail"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl italic text-plum-deep",
						children: "Where it went"
					}), q.data.hops.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted",
						children: "Still waiting on the ice — no sales yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "mt-3 space-y-3",
						children: q.data.hops.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: h.customerCode
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [" · ", h.receiptNo]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-muted",
								children: kg(h.qtyKg)
							})]
						}, h.receiptNo))
					})] })
				]
			}) : null]
		})]
	});
}
function Item({ k, v }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] tracking-wider text-muted uppercase",
		children: k
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-0.5",
		children: v
	})] });
}
//#endregion
export { Trace as component };
