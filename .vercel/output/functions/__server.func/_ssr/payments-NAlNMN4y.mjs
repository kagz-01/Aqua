import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-CagA4FK0.mjs";
import { d as listPayments, r as confirmMpesa } from "./queries-CT8ciPVn.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
import { a as paymentLabel, n as kes } from "./format-pMYX4z-1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/payments-NAlNMN4y.js
var import_jsx_runtime = require_jsx_runtime();
function Payments() {
	const qc = useQueryClient();
	const q = useQuery({
		queryKey: ["payments"],
		queryFn: () => listPayments()
	});
	const confirm = useMutation({
		mutationFn: (saleId) => confirmMpesa({ data: { saleId } }),
		onSuccess: async (res) => {
			toast.success(`Confirmed ${res.mpesaReceipt}`);
			await qc.invalidateQueries();
		},
		onError: (e) => toast.error(e.message)
	});
	const paid = (q.data ?? []).filter((p) => p.status === "paid");
	const pending = (q.data ?? []).filter((p) => p.status !== "paid");
	const mpesa = paid.filter((p) => p.method === "mpesa").reduce((s, p) => s + p.amount, 0);
	const cash = paid.filter((p) => p.method === "cash").reduce((s, p) => s + p.amount, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "M-Pesa",
			title: "Cash and the phone",
			description: "Review incoming payments. M-Pesa confirmation is a demo action here; it does not contact Safaricom or verify a live transaction."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: "M-Pesa in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums italic text-plum-deep",
					children: kes(mpesa)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: "Cash in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums italic text-plum-deep",
					children: kes(cash)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: "Waiting"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 font-display text-3xl tabular-nums italic text-plum-deep",
					children: pending.length
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "mt-4 overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-[11px] tracking-wider text-muted uppercase",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "When"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Receipt"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Method"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 font-medium",
							children: "Ref"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "pb-2 text-right font-medium",
							children: "Amount"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { className: "pb-2" })
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: (q.data ?? []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-t border-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 text-muted",
							children: formatDistanceToNow(new Date(p.createdAt), { addSuffix: true })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 font-mono text-xs",
							children: p.receiptNo
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-2.5",
							children: [paymentLabel(p.method), p.msisdnMasked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[11px] text-muted",
								children: p.msisdnMasked
							}) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 font-mono text-xs",
							children: p.mpesaReceipt ?? "—"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 text-right tabular-nums",
							children: kes(p.amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-2.5 text-right",
							children: p.status === "paid" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "ok",
								children: "Paid"
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								disabled: confirm.isPending,
								onClick: () => confirm.mutate(p.saleId),
								children: "Record demo confirmation"
							})
						})
					]
				}, p.id)) })]
			})
		})
	] });
}
//#endregion
export { Payments as component };
