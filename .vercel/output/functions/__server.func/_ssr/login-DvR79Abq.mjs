import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { t as AquaLogo } from "./logo-BmuP4i1f.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import "./client-CoMeym3u.mjs";
import "./server-CsBJfLv3.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import "./market-MTwPjtLG.mjs";
import "./input-BvKihy7W.mjs";
import "./label-BAlLFZIs.mjs";
import { r as Route$19 } from "./router-COQ49zTk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DvR79Abq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	useNavigate();
	const { next } = Route$19.useSearch();
	const [mode, setMode] = (0, import_react.useState)("sign-in");
	const [name, setName] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [setupCode, setSetupCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "w-full max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AquaLogo, { size: "sm" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-5 font-display text-3xl italic text-plum-deep",
					children: "Demo access is open"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm leading-6 text-muted",
					children: "Sign-in is switched off in this local demo. Open a workspace directly; account security remains enabled for the deployed app."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-2 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/client",
							children: "Customer shop"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/staff",
							children: "Staff workspaces"
						})
					})]
				})
			]
		})
	});
}
//#endregion
export { Login as component };
