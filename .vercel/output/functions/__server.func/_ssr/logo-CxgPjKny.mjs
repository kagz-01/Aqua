import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-D2OqzxhJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-CxgPjKny.js
var import_jsx_runtime = require_jsx_runtime();
function AquaMark({ className, invert = false }) {
	const fill = invert ? "#F4EDE2" : "#3D2463";
	const eye = invert ? "#3D2463" : "#F4EDE2";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className: cn("size-9", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "64",
				height: "64",
				rx: "18",
				fill: invert ? "#3D2463" : "#5B2C91"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M14 36c8-2 14-10 18-18 1.2 7 6 13 14 16-7 2-12 7-14 16-3-8-10-13-18-14Z",
				fill
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12 42c10 0 18 2 28 0 8-1.4 14-1 20 2",
				fill: "none",
				stroke: fill,
				strokeWidth: "2.2",
				strokeLinecap: "round",
				opacity: "0.75"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "40.5",
				cy: "30.5",
				r: "2.1",
				fill: eye
			})
		]
	});
}
function AquaLogo({ className, markClassName, invert = false, withWord = true, size = "md" }) {
	const word = size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-xl";
	const mark = size === "lg" ? "size-12" : size === "sm" ? "size-8" : "size-9";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaMark, {
			invert,
			className: cn(mark, markClassName)
		}), withWord ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("block font-display italic tracking-tight", word, invert ? "text-cream" : "text-plum-deep"),
				children: "Aqua"
			}), size !== "sm" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("mt-0.5 block text-[10px] font-medium uppercase tracking-[0.22em]", invert ? "text-lilac" : "text-muted"),
				children: "Lakeside"
			}) : null]
		}) : null]
	});
}
//#endregion
export { AquaLogo as t };
