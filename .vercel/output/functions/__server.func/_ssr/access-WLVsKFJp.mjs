import { n as createMiddleware } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CWlgTcWG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/access-WLVsKFJp.js
var STAFF_ROLES = [
	"owner",
	"manager",
	"floor",
	"accounts"
];
function staffOnly(allowed = STAFF_ROLES) {
	return createMiddleware({ type: "function" }).middleware([authMiddleware]).server(async ({ context, next }) => {
		const { requireStaff } = await import("./access.server-Dx-ePMdm.mjs");
		return next({ context: { aquaRole: await requireStaff(context.userId, allowed) } });
	});
}
//#endregion
export { staffOnly as t };
