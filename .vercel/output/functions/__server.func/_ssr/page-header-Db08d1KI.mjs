import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-header-Db08d1KI.js
var import_jsx_runtime = require_jsx_runtime();
function PageHeader({ eyebrow, title, description, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1 text-[11px] font-medium tracking-[0.2em] text-muted uppercase",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl tracking-tight text-plum-deep italic sm:text-4xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xl text-sm text-muted",
				children: description
			}) : null
		] }), action]
	});
}
//#endregion
export { PageHeader as t };
