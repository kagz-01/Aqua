import { r as getSql } from "./db-Dwo-RNqT.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/access.server-Dx-ePMdm.js
var STAFF_ROLES = [
	"owner",
	"manager",
	"floor",
	"accounts"
];
async function getAquaRole(userId) {
	const role = (await (await getSql())`
    select role from aqua_staff_roles where user_id = ${userId} limit 1`)[0]?.role;
	return STAFF_ROLES.includes(role) ? role : null;
}
async function requireStaff(userId, allowed = STAFF_ROLES) {
	if (process.env.VITE_AUTH_ENABLED === "false" && !process.env.GROK_PROJECT_ID) {
		const demoRole = allowed[0];
		if (demoRole) return demoRole;
	}
	const role = await getAquaRole(userId);
	if (!role || !allowed.includes(role)) throw new Error("Staff access required");
	return role;
}
//#endregion
export { getAquaRole, requireStaff };
