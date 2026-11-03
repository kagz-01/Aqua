import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { a as useAquaRole } from "./role-BsZmttTl.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { n as listAllCustomerOrders, s as updateCustomerOrderStatus, t as getMyAquaRole } from "./market-MTwPjtLG.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
import { t as PageHeader } from "./page-header-Db08d1KI.mjs";
import { t as Badge } from "./badge-CagA4FK0.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as kes, r as kg } from "./format-pMYX4z-1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orders-DjKWA1U1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NEXT = {
	placed: {
		status: "confirmed",
		label: "Confirm order"
	},
	confirmed: {
		status: "preparing",
		label: "Start preparing"
	},
	preparing: {
		status: "ready",
		label: "Mark ready for pickup"
	}
};
function CustomerOrders() {
	const queryClient = useQueryClient();
	useAquaRole((state) => state.role);
	const roleAccess = useQuery({
		queryKey: ["aqua-staff-role"],
		queryFn: () => getMyAquaRole(),
		enabled: true
	});
	const role = roleAccess.data;
	const orders = useQuery({
		queryKey: ["all-customer-orders"],
		queryFn: () => listAllCustomerOrders(),
		enabled: roleAccess.data != null
	});
	const update = useMutation({
		mutationFn: (data) => updateCustomerOrderStatus({ data }),
		onSuccess: async (result) => {
			toast.success(result.receiptNo ? `Pickup recorded · receipt ${result.receiptNo}` : "Order status updated");
			await queryClient.invalidateQueries();
		},
		onError: (error) => toast.error(error.message)
	});
	if (roleAccess.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "text-sm text-danger",
		children: "Staff access could not be verified."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		className: "mt-3",
		variant: "secondary",
		onClick: () => void roleAccess.refetch(),
		children: "Retry"
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Customer orders",
		title: role === "floor" ? "Ready for customer pickup" : "From basket to pickup",
		description: role === "floor" ? "Match the order, collect cash or M-Pesa, and record the pickup receipt." : "Confirm availability, prepare each order, and mark it ready for the sales floor."
	}), orders.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Loading customer orders…"
	}) }) : orders.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		role: "alert",
		className: "text-sm text-danger",
		children: "Orders could not be loaded."
	}) }) : orders.data?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: orders.data.map((order) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StaffOrderCard, {
			order,
			role,
			busy: update.isPending,
			onAdvance: (status, paymentMethod) => update.mutate({
				orderId: order.id,
				status,
				paymentMethod
			})
		}, order.id))
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "py-10 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-2xl italic text-plum-deep",
			children: "No customer orders yet"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted",
			children: "New pickup requests will appear here."
		})]
	})] });
}
function StaffOrderCard({ order, role, busy, onAdvance }) {
	const [paymentMethod, setPaymentMethod] = (0, import_react.useState)("cash");
	const next = role === "floor" ? order.status === "ready" ? {
		status: "completed",
		label: "Record pickup"
	} : void 0 : NEXT[order.status] ?? (role === "owner" && order.status === "ready" ? {
		status: "completed",
		label: "Complete pickup"
	} : void 0);
	const canCancel = (role === "owner" || role === "manager") && order.status !== "completed" && order.status !== "cancelled";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-sm font-medium",
					children: order.code
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm",
					children: [
						order.customerName,
						" · ",
						order.customerEmail
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: new Date(order.createdAt).toLocaleString()
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: order.status === "completed" ? "ok" : order.status === "cancelled" ? "danger" : "warn",
				children: order.status
			})]
		}),
		order.receiptNo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-2 text-sm",
			children: [
				"Receipt ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-mono",
					children: order.receiptNo
				}),
				order.paymentStatus ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-2 text-muted",
					children: ["· ", order.paymentStatus === "paid" ? "Paid" : "Payment pending reconciliation"]
				}) : null
			]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-4 divide-y divide-border border-y border-border",
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
			className: "mt-3 text-sm text-muted",
			children: ["Pickup note: ", order.note]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-xl italic text-plum-deep",
				children: kes(order.total)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-end gap-2",
				children: [
					next?.status === "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-10 items-center gap-2 text-sm",
						children: ["Payment", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							className: "h-10 rounded-md border border-border bg-paper px-2",
							value: paymentMethod,
							onChange: (event) => setPaymentMethod(event.target.value === "mpesa" ? "mpesa" : "cash"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "cash",
								children: "Cash"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "mpesa",
								children: "M-Pesa"
							})]
						})]
					}) : null,
					canCancel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "secondary",
						disabled: busy,
						onClick: () => onAdvance("cancelled"),
						children: "Cancel"
					}) : null,
					next ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						disabled: busy,
						onClick: () => onAdvance(next.status, next.status === "completed" ? paymentMethod : void 0),
						children: next.label
					}) : null
				]
			})]
		})
	] });
}
//#endregion
export { CustomerOrders as component };
