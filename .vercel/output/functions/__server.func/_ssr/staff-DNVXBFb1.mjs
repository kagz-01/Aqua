import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as AquaLogo } from "./logo-BmuP4i1f.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowRight, S as ClipboardList, f as Receipt, n as Wallet, x as Fish } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/staff-DNVXBFb1.js
var import_jsx_runtime = require_jsx_runtime();
var WORKSPACES = [
	{
		to: "/staff/owner",
		title: "Owner",
		detail: "Business pulse, payments, reports, team access, and customer orders.",
		icon: ClipboardList
	},
	{
		to: "/staff/housemanager",
		title: "House manager",
		detail: "Inventory, landings, batch traceability, cold chain, and pickup coordination.",
		icon: Fish
	},
	{
		to: "/staff/attendant",
		title: "Sales attendant",
		detail: "The sales till, customer counters, receipts, and batch lookup.",
		icon: Receipt
	},
	{
		to: "/staff/accounts",
		title: "Accounts officer",
		detail: "Storefront receipts, supplier settlements, cash and M-Pesa reconciliation, and reports.",
		icon: Wallet
	}
];
function StaffWorkspaces() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-5xl px-4 py-8 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/client",
						children: "Customer shop"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-muted uppercase",
						children: "Staff workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl italic text-plum-deep sm:text-5xl",
						children: "Choose your desk."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-sm leading-6 text-muted",
						children: "Each desk brings the tools and daily work for that role into focus."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
						children: WORKSPACES.map(({ to, title, detail, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex flex-col p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 place-items-center rounded-lg bg-lilac-soft text-plum",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-4 font-display text-2xl italic text-plum-deep",
									children: title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm leading-6 text-muted",
									children: detail
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "mt-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to,
										children: [
											"Open ",
											title,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })
										]
									})
								})
							]
						}, to))
					})
				]
			})]
		})
	});
}
//#endregion
export { StaffWorkspaces as component };
