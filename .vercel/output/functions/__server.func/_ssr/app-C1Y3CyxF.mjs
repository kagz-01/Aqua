import { o as __toESM } from "../_runtime.mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { t as Button } from "./button-NF5EutoH.mjs";
import { b as Link, g as Outlet, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUserState } from "./use-current-user-FFY7azfy.mjs";
import { a as useAquaRole } from "./role-BsZmttTl.mjs";
import { t as AppShell } from "./shell-D5hblWbn.mjs";
import { t as Card } from "./card-C3TFrwOd.mjs";
import { t as getMyAquaRole } from "./market-MTwPjtLG.mjs";
import { n as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-C1Y3CyxF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StaffAccess() {
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const demoMode = false;
	useAquaRole((state) => state.role);
	const role = useQuery({
		queryKey: ["aqua-staff-role", user?.id],
		queryFn: () => getMyAquaRole(),
		enabled: !isPending && Boolean(user)
	});
	(0, import_react.useEffect)(() => {
		if (!isPending && !user) navigate({
			to: "/login",
			search: { next: "/app" },
			replace: true
		});
		else if (role.data === null) navigate({
			to: "/client",
			replace: true
		});
	}, [
		demoMode,
		isPending,
		user,
		role.data,
		navigate
	]);
	if (isPending || role.isLoading || !user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6 text-sm text-muted",
		children: "Checking staff access…"
	});
	if (role.isError) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl italic text-plum-deep",
					children: "Could not verify access"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "Please retry. Staff pages stay locked until access is confirmed."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					onClick: () => void role.refetch(),
					children: "Retry"
				})
			]
		})
	});
	if (!role.data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "grid min-h-dvh place-items-center bg-cream p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl italic text-plum-deep",
					children: "Staff access required"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "This workspace is for approved fish-house staff."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/client",
						children: "Go to the customer shop"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		role: role.data,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
//#endregion
export { StaffAccess as component };
