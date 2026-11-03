import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-FFY7azfy.mjs";
import { a as useAquaRole } from "./role-BsZmttTl.mjs";
import { D as ArrowRight, S as ClipboardList, T as Boxes, b as HandCoins, f as Receipt, g as PackageCheck, m as QrCode, n as Wallet, o as Thermometer, r as Users, x as Fish } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./shell-D5hblWbn.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { t as getMyAquaRole } from "./market-MTwPjtLG.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-dashboard-B3TqRrB2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DASHBOARDS = {
	owner: {
		eyebrow: "Owner dashboard",
		title: "Keep the whole fish house in view.",
		description: "Sales, payments, customer orders, reports, and staff access in one owner workspace.",
		links: [
			{
				to: "/app/",
				label: "Business pulse",
				detail: "Sales totals, stock value, and reorder watch.",
				icon: Wallet
			},
			{
				to: "/app/orders",
				label: "Customer orders",
				detail: "Review requests and move them toward pickup.",
				icon: PackageCheck
			},
			{
				to: "/app/payments",
				label: "Payments",
				detail: "Review cash and M-Pesa records.",
				icon: Wallet
			},
			{
				to: "/app/reports",
				label: "Reports",
				detail: "Review performance and export sales.",
				icon: ClipboardList
			},
			{
				to: "/app/team",
				label: "Team access",
				detail: "Approve staff workspace access.",
				icon: Users
			}
		]
	},
	manager: {
		eyebrow: "House manager dashboard",
		title: "Keep every landing and cold hold moving.",
		description: "Receive stock, watch cold-chain conditions, trace batches, and coordinate customer pickups.",
		links: [
			{
				to: "/app/inventory",
				label: "Fish inventory",
				detail: "Check quantities, prices, and reorder lines.",
				icon: Fish
			},
			{
				to: "/app/orders",
				label: "Customer orders",
				detail: "Confirm availability and prepare pickups.",
				icon: PackageCheck
			},
			{
				to: "/app/batches",
				label: "Catch traceability",
				detail: "Follow each landing’s batch trail.",
				icon: QrCode
			},
			{
				to: "/app/suppliers",
				label: "Suppliers",
				detail: "Keep landing rings and sourcing details current.",
				icon: Boxes
			},
			{
				to: "/app/cold-chain",
				label: "Cold chain",
				detail: "Review temperature and scale readings.",
				icon: Thermometer
			}
		]
	},
	floor: {
		eyebrow: "Sales attendant dashboard",
		title: "Serve the next customer quickly.",
		description: "Build a sale, record the counter, and keep the customer’s receipt and catch trail together.",
		links: [
			{
				to: "/app/sales",
				label: "Open the sales till",
				detail: "Choose fish, weigh quantities, and record a sale.",
				icon: Receipt
			},
			{
				to: "/app/orders",
				label: "Customer pickups",
				detail: "Collect payment and issue receipts for ready online orders.",
				icon: PackageCheck
			},
			{
				to: "/app/customers",
				label: "Customer counters",
				detail: "Find the customer for a sale.",
				icon: Users
			},
			{
				to: "/app/batches",
				label: "Batch lookup",
				detail: "Show a customer the origin of a catch.",
				icon: QrCode
			}
		]
	},
	accounts: {
		eyebrow: "Accounts dashboard",
		title: "Keep every shilling accounted for.",
		description: "Reconcile storefront receipts, settle fish-supplier balances, and review the business books.",
		links: [
			{
				to: "/app/payments",
				label: "Cash & M-Pesa",
				detail: "Review receipts and reconcile payment records.",
				icon: Wallet
			},
			{
				to: "/app/suppliers",
				label: "Supplier payables",
				detail: "Review landing costs, outstanding balances, and supplier settlements.",
				icon: HandCoins
			},
			{
				to: "/app/reports",
				label: "Financial reports",
				detail: "Review daily and weekly sales and export the sales ledger.",
				icon: ClipboardList
			}
		]
	}
};
var ROLE_PATH = {
	owner: "/staff/owner",
	manager: "/staff/housemanager",
	floor: "/staff/attendant",
	accounts: "/staff/accounts"
};
function StaffDashboard({ role }) {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const demoMode = false;
	const demoSetRole = useAquaRole((state) => state.setRole);
	const access = useQuery({
		queryKey: ["aqua-staff-role", user?.id],
		queryFn: () => getMyAquaRole(),
		enabled: !isPending && Boolean(user)
	});
	const dashboard = DASHBOARDS[role];
	(0, import_react.useEffect)(() => {
		if (!isPending && !user) navigate({
			to: "/login",
			search: { next: ROLE_PATH[role] },
			replace: true
		});
		else if (access.data && access.data !== role) navigate({
			to: ROLE_PATH[access.data],
			replace: true
		});
		else if (access.data === null) navigate({
			to: "/client",
			replace: true
		});
	}, [
		demoMode,
		demoSetRole,
		role,
		isPending,
		user,
		access.data,
		navigate
	]);
	if (isPending || access.isLoading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted",
		children: "Checking staff access…"
	});
	if (access.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl italic text-plum-deep",
					children: "Could not verify access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "This staff workspace stays locked until access is confirmed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => void access.refetch(),
					children: "Retry"
				})
			]
		})
	});
	if (access.data !== role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted",
		children: "Opening your workspace…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		role,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-muted uppercase",
				children: dashboard.eyebrow
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 max-w-3xl font-display text-4xl italic text-plum-deep sm:text-5xl",
				children: dashboard.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-sm leading-6 text-muted",
				children: dashboard.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: dashboard.links.map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: "group rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)] transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-lg bg-lilac-soft text-plum",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 font-display text-xl italic text-plum-deep",
								children: item.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm leading-5 text-muted",
								children: item.detail
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-plum",
								children: ["Open", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
							})
						]
					}, item.to);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-7",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/staff",
						children: "Switch staff workspace"
					})
				})
			})
		] })
	});
}
//#endregion
export { StaffDashboard as t };
