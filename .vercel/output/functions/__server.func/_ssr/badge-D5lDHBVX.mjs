import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn } from "./button-D2OqzxhJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-D5lDHBVX.js
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider", {
	variants: { variant: {
		default: "bg-lilac-soft text-plum-deep",
		plum: "bg-plum text-cream",
		ok: "bg-ok/12 text-ok",
		warn: "bg-warn/15 text-warn",
		danger: "bg-danger/12 text-danger",
		outline: "border border-border text-muted"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
//#endregion
export { Badge as t };
