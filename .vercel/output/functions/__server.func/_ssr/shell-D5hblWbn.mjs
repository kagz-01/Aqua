import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as AquaLogo } from "./logo-BmuP4i1f.mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as UserButton } from "./gates-COnb1nO8.mjs";
import { i as canSeeReports, r as canSeeFinance, t as ROLE_META } from "./role-BsZmttTl.mjs";
import { E as Bell, S as ClipboardList, T as Boxes, d as Scale, f as Receipt, g as PackageCheck, i as UserRoundCog, m as QrCode, n as Wallet, o as Thermometer, r as Users, t as X, v as Menu, x as Fish, y as LayoutDashboard } from "../_libs/lucide-react.mjs";
import { a as DialogOverlay, c as DialogTrigger, n as DialogClose, o as DialogPortal, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shell-D5hblWbn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
var SheetTrigger = DialogTrigger;
function SheetContent({ className, children, side = "left", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-ink/40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 flex h-full w-[min(20rem,88vw)] flex-col bg-cream p-4 text-ink shadow-[var(--shadow-lift)]", side === "left" ? "top-0 left-0" : "top-0 right-0", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-4 right-4 rounded-sm p-1 text-muted hover:bg-paper",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
var NAV = [
	{
		to: "/app",
		label: "Pulse",
		icon: LayoutDashboard,
		end: true,
		roles: [
			"owner",
			"manager",
			"accounts"
		]
	},
	{
		to: "/app/sales",
		label: "Sales floor",
		icon: Receipt,
		roles: ["owner", "floor"]
	},
	{
		to: "/app/inventory",
		label: "Ice hold",
		icon: Fish,
		roles: ["owner", "manager"]
	},
	{
		to: "/app/batches",
		label: "Batches",
		icon: QrCode,
		roles: [
			"owner",
			"manager",
			"floor"
		]
	},
	{
		to: "/app/customers",
		label: "Counters",
		icon: Users
	},
	{
		to: "/app/suppliers",
		label: "Landings & payables",
		icon: Boxes,
		sourcing: true
	},
	{
		to: "/app/payments",
		label: "Payment reconciliation",
		icon: Wallet,
		finance: true
	},
	{
		to: "/app/alerts",
		label: "Messaging desk",
		icon: Bell,
		roles: ["owner", "manager"]
	},
	{
		to: "/app/cold-chain",
		label: "Cold chain",
		icon: Thermometer,
		roles: ["owner", "manager"]
	},
	{
		to: "/app/reports",
		label: "Books",
		icon: ClipboardList,
		reports: true
	},
	{
		to: "/app/orders",
		label: "Customer orders",
		icon: PackageCheck,
		fulfilment: true
	},
	{
		to: "/app/team",
		label: "Team access",
		icon: UserRoundCog,
		owner: true
	}
];
function hasRole(roles, role) {
	return roles.some((allowedRole) => allowedRole === role);
}
function NavLinks({ role, onNavigate, pathname }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV.filter((item) => {
			if ("roles" in item && item.roles && !hasRole(item.roles, role)) return false;
			if ("finance" in item && item.finance && !canSeeFinance(role)) return false;
			if ("reports" in item && item.reports && !canSeeReports(role)) return false;
			if ("sourcing" in item && item.sourcing && role === "floor") return false;
			if ("fulfilment" in item && item.fulfilment && role !== "owner" && role !== "manager" && role !== "floor") return false;
			if ("owner" in item && item.owner && role !== "owner") return false;
			return true;
		}).map((item) => {
			const active = "end" in item && item.end ? pathname === item.to : pathname === item.to || pathname.startsWith(`${item.to}/`);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				onClick: onNavigate,
				className: cn("flex h-11 items-center gap-3 rounded-md px-3 text-sm font-medium transition-colors", active ? "bg-plum text-cream" : "text-ink-soft hover:bg-paper"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
			}, item.to);
		})
	});
}
function AppShell({ children, role }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [open, setOpen] = (0, import_react.useState)(false);
	const meta = ROLE_META[role];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-cream",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "fixed inset-y-0 left-0 hidden w-60 flex-col border-r border-border bg-cream-deep/40 p-4 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "mb-6 px-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
					role,
					pathname
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-auto rounded-lg bg-paper p-3 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] font-medium tracking-[0.18em] text-muted uppercase",
							children: "Desk"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-lg italic text-plum-deep",
							children: meta.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: meta.desk
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "lg:pl-60",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-cream/85 px-4 backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
							open,
							onOpenChange: setOpen,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									size: "icon",
									className: "lg:hidden",
									"aria-label": "Open menu",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "mb-6 block",
								onClick: () => setOpen(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLinks, {
								role,
								pathname,
								onNavigate: () => setOpen(false)
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden items-center gap-2 text-sm text-muted lg:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scale, { className: "size-4 text-plum" }), "Dunga desk · live till"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/client",
								children: "Customer shop"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-sm font-medium text-plum-deep sm:inline",
							children: meta.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserButton, {})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-6 sm:px-6 lg:px-8",
				children
			})]
		})]
	});
}
//#endregion
export { AppShell as t };
