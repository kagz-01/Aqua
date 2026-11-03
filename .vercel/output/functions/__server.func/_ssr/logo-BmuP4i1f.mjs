import { t as cn } from "./utils-C_uf36nf.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-BmuP4i1f.js
var import_jsx_runtime = require_jsx_runtime();
function AquaLogo({ className, markClassName, invert = false, withWord = true, size = "md" }) {
	const width = size === "lg" ? 260 : size === "sm" ? 120 : 190;
	const height = size === "lg" ? 72 : size === "sm" ? 34 : 54;
	if (!withWord) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo/logo-square.webp",
		alt: "Aqua",
		className: cn("object-contain", className, markClassName),
		style: {
			width: size === "lg" ? 56 : size === "sm" ? 28 : 40,
			height: size === "lg" ? 56 : size === "sm" ? 28 : 40
		},
		draggable: false
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo/logo.webp",
		alt: "Aqua",
		className: cn("h-auto object-contain", className),
		style: {
			width,
			height
		},
		draggable: false
	});
}
//#endregion
export { AquaLogo as t };
