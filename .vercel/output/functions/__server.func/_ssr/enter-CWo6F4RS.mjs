import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as AquaLogo } from "./logo-BmuP4i1f.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowRight, u as ShieldCheck, x as Fish } from "../_libs/lucide-react.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enter-CWo6F4RS.js
var import_jsx_runtime = require_jsx_runtime();
function Enter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "min-h-dvh bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-5xl flex-col px-4 py-8 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					size: "sm",
					variant: "ghost",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Home"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "my-auto py-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.2em] text-muted uppercase",
						children: "Aqua Fish House"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-3 max-w-2xl font-display text-4xl italic text-plum-deep sm:text-5xl",
						children: "Welcome. Where would you like to go?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-sm leading-6 text-muted",
						children: "Shop today’s catch as a customer, or sign in to the staff workspace with an approved account."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex flex-col p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-12 place-items-center rounded-xl bg-lilac-soft text-plum",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fish, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 font-display text-2xl italic text-plum-deep",
									children: "Shop fish"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm leading-6 text-muted",
									children: "Browse the market, add fish to your basket, place a pickup request, and track your orders."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "mt-6 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/client",
										children: ["Go to customer shop", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex flex-col p-6 sm:p-8",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-12 place-items-center rounded-xl bg-cream text-plum",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-6" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-5 font-display text-2xl italic text-plum-deep",
									children: "Staff workspace"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 flex-1 text-sm leading-6 text-muted",
									children: "Stock, sales, customers, cold-chain, and reports are available only to approved staff accounts."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "secondary",
									className: "mt-6 w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/staff",
										children: ["Choose staff workspace", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								})
							]
						})]
					})
				]
			})]
		})
	});
}
//#endregion
export { Enter as component };
