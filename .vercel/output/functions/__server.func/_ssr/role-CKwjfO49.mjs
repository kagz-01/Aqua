import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-CKwjfO49.js
var ROLE_META = {
	owner: {
		title: "Owner",
		desk: "Full house",
		blurb: "Payments, reports, alerts, and every till."
	},
	manager: {
		title: "House manager",
		desk: "Stock & books",
		blurb: "Inventory, batches, cold chain, and the daily pulse."
	},
	floor: {
		title: "Floor attendant",
		desk: "Sales floor",
		blurb: "Weigh-in, record a sale, send an STK push."
	}
};
var useAquaRole = create()(persist((set) => ({
	role: "owner",
	setRole: (role) => set({ role })
}), { name: "aqua-role" }));
function canSeeFinance(role) {
	return role === "owner" || role === "manager";
}
function canMutateStock(role) {
	return role === "owner" || role === "manager";
}
function canSeeReports(role) {
	return role === "owner" || role === "manager";
}
//#endregion
export { useAquaRole as a, canSeeReports as i, canMutateStock as n, canSeeFinance as r, ROLE_META as t };
