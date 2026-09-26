import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-D5lDHBVX.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as listBatches, t as Card } from "./queries-CAm7hpQv.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { c as spoilageLabel, i as kg, l as tempC } from "./format-Dxwqcto1.mjs";
import { t as QrCode } from "./qr-Cb-VYBDp.mjs";
import { a as DialogTitle, i as DialogHeader, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-BaBN6G_9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/batches-Bv9kTgt6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Batches() {
	const q = useQuery({
		queryKey: ["batches"],
		queryFn: () => listBatches()
	});
	const [code, setCode] = (0, import_react.useState)(null);
	const selected = q.data?.find((b) => b.code === code);
	const origin = typeof window !== "undefined" ? window.location.origin : "https://aqua.local";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Trace",
			title: "Catch to counter",
			description: "Each landing mints a QR. Scan it, or open the public trail."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
			children: (q.data ?? []).map((b) => {
				const sp = spoilageLabel(b.spoilageScore);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-xs tracking-wide text-muted",
									children: b.code
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-xl italic text-plum-deep",
									children: b.fishName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm text-muted",
									children: [
										b.landingSite,
										" · ",
										b.supplierCode
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: sp.variant,
								children: sp.label
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 grid grid-cols-2 gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] text-muted uppercase",
								children: "Left"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: kg(b.remainingKg)
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-[11px] text-muted uppercase",
								children: "Hold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "tabular-nums",
								children: tempC(b.tempC)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-muted",
							children: ["Landed ", formatDistanceToNow(new Date(b.deliveredAt), { addSuffix: true })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: () => setCode(b.code),
								children: "Show QR"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "ghost",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/trace/$code",
									params: { code: b.code },
									children: "Public trail"
								})
							})]
						})
					]
				}, b.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: !!code,
			onOpenChange: (o) => !o && setCode(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: selected?.fishName }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				selected?.code,
				" · ",
				selected?.landingSite
			] })] }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, {
					value: `${origin}/trace/${selected.code}`,
					className: "size-52 rounded-lg"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-xs text-muted",
					children: [
						origin,
						"/trace/",
						selected.code
					]
				})]
			}) : null] })
		})
	] });
}
//#endregion
export { Batches as component };
