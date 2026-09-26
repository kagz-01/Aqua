import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-D2OqzxhJ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as AquaLogo } from "./logo-CxgPjKny.mjs";
import { a as useAquaRole, t as ROLE_META } from "./role-CKwjfO49.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/enter-DaAZPg11.js
var import_jsx_runtime = require_jsx_runtime();
function Enter() {
	const navigate = useNavigate();
	const setRole = useAquaRole((s) => s.setRole);
	function pick(role) {
		setRole(role);
		navigate({ to: "/app" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-dvh bg-cream",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-4xl flex-col px-4 py-10 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Back"
					})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "my-auto py-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium tracking-[0.22em] text-muted uppercase",
						children: "Workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl text-plum-deep italic sm:text-5xl",
						children: "Which desk are you on?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-lg text-sm text-muted",
						children: "Aqua is one house. Pick a role to see the matching keys — you can switch later from the header."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 md:grid-cols-3",
						children: Object.keys(ROLE_META).map((key) => {
							const m = ROLE_META[key];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => pick(key),
								className: "group rounded-xl bg-paper p-5 text-left shadow-[var(--shadow-border)] transition-[box-shadow,transform] duration-150 hover:shadow-[var(--shadow-lift)] active:scale-[0.98]",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] tracking-[0.18em] text-muted uppercase",
										children: m.desk
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-2 font-display text-2xl italic text-plum-deep",
										children: m.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-sm text-muted",
										children: m.blurb
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mt-5 inline-flex items-center gap-1 text-sm font-medium text-plum",
										children: ["Enter", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
									})
								]
							}, key);
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { Enter as component };
