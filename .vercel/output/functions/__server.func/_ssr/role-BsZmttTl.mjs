import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/role-BsZmttTl.js
var ROLE_META = {
	owner: {
		title: "Owner",
		desk: "Owner desk",
		blurb: "Payments, reports, alerts, and every till."
	},
	manager: {
		title: "House manager",
		desk: "House manager desk",
		blurb: "Inventory, batches, cold chain, and the daily pulse."
	},
	floor: {
		title: "Floor attendant",
		desk: "Sales floor",
		blurb: "Record counter sales and complete ready customer pickups."
	},
	accounts: {
		title: "Accounts officer",
		desk: "Accounts desk",
		blurb: "Supplier settlements, cash and M-Pesa reconciliation, and financial reports."
	}
};
var useAquaRole = create()(persist((set) => ({
	role: "owner",
	setRole: (role) => set({ role })
}), { name: "aqua-role-demo" }));
function canSeeFinance(role) {
	return role === "owner" || role === "accounts";
}
function canMutateStock(role) {
	return role === "owner" || role === "manager";
}
function canSeeReports(role) {
	return role === "owner" || role === "manager" || role === "accounts";
}
//#endregion
export { useAquaRole as a, canSeeReports as i, canMutateStock as n, canSeeFinance as r, ROLE_META as t };
