import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as cn, t as Button } from "./button-D2OqzxhJ.mjs";
import { b as Link, g as Outlet, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, c as DialogTrigger, n as DialogClose, o as DialogPortal, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { _ as ClipboardList, a as Thermometer, b as Boxes, c as Scale, d as QrCode, g as Fish, h as LayoutDashboard, l as Receipt, m as Menu, n as Wallet, r as Users, t as X, x as Bell } from "../_libs/lucide-react.mjs";
import { a as Root2, i as Portal2, n as Item2, o as Trigger, r as Label2, t as Content2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { t as AquaLogo } from "./logo-CxgPjKny.mjs";
import { a as useAquaRole, i as canSeeReports, r as canSeeFinance, t as ROLE_META } from "./role-CKwjfO49.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-83SJ1Dac.js
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
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
function DropdownMenuContent({ className, sideOffset = 8, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
		sideOffset,
		className: cn("z-50 min-w-44 overflow-hidden rounded-lg bg-paper p-1 text-ink shadow-[var(--shadow-lift)]", className),
		...props
	}) });
}
function DropdownMenuItem({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
		className: cn("flex cursor-pointer items-center gap-2 rounded-sm px-3 py-2 text-sm outline-none data-highlighted:bg-cream", className),
		...props
	});
}
function DropdownMenuLabel({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
		className: cn("px-3 py-1.5 text-xs font-medium tracking-wide text-muted uppercase", className),
		...props
	});
}
var NAV = [
	{
		to: "/app",
		label: "Pulse",
		icon: LayoutDashboard,
		end: true
	},
	{
		to: "/app/sales",
		label: "Sales floor",
		icon: Receipt
	},
	{
		to: "/app/inventory",
		label: "Ice hold",
		icon: Fish
	},
	{
		to: "/app/batches",
		label: "Batches",
		icon: QrCode
	},
	{
		to: "/app/customers",
		label: "Counters",
		icon: Users
	},
	{
		to: "/app/suppliers",
		label: "Landings",
		icon: Boxes
	},
	{
		to: "/app/payments",
		label: "M-Pesa",
		icon: Wallet,
		finance: true
	},
	{
		to: "/app/alerts",
		label: "SMS desk",
		icon: Bell
	},
	{
		to: "/app/cold-chain",
		label: "Cold chain",
		icon: Thermometer
	},
	{
		to: "/app/reports",
		label: "Books",
		icon: ClipboardList,
		reports: true
	}
];
function NavLinks({ role, onNavigate, pathname }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex flex-col gap-1",
		children: NAV.filter((item) => {
			if ("finance" in item && item.finance && !canSeeFinance(role)) return false;
			if ("reports" in item && item.reports && !canSeeReports(role)) return false;
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
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const role = useAquaRole((s) => s.role);
	const setRole = useAquaRole((s) => s.setRole);
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
								to: "/",
								children: "Home"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "secondary",
								size: "sm",
								children: meta.title
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
							align: "end",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, { children: "Switch desk" }), Object.keys(ROLE_META).map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
								onSelect: () => setRole(key),
								children: ROLE_META[key].title
							}, key))]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-9 items-center justify-center rounded-md bg-plum font-display text-sm text-cream italic",
							children: meta.title.slice(0, 1)
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-4 py-6 sm:px-6 lg:px-8",
				children
			})]
		})]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
