import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-D2OqzxhJ.mjs";
import { t as encode } from "../_libs/uqr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/qr-Cb-VYBDp.js
var import_jsx_runtime = require_jsx_runtime();
function QrCode({ value, className }) {
	const qr = encode(value, {
		ecc: "M",
		border: 2
	});
	const cells = [];
	qr.data.forEach((row, y) => {
		row.forEach((on, x) => {
			if (on) cells.push({
				x,
				y
			});
		});
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${qr.size} ${qr.size}`,
		className: cn("text-plum-deep", className),
		shapeRendering: "crispEdges",
		"aria-label": "QR code",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			width: qr.size,
			height: qr.size,
			fill: "#F4EDE2"
		}), cells.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: c.x,
			y: c.y,
			width: 1,
			height: 1,
			fill: "currentColor"
		}, `${c.x}-${c.y}`))]
	});
}
//#endregion
export { QrCode as t };
