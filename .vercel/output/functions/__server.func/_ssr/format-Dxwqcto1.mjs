//#region node_modules/.nitro/vite/services/ssr/assets/format-Dxwqcto1.js
function kes(n) {
	return `KES ${Math.round(n).toLocaleString("en-KE")}`;
}
function kg(n) {
	return `${n.toLocaleString("en-KE", { maximumFractionDigits: 1 })} kg`;
}
function tempC(n) {
	return `${n.toFixed(1)}°C`;
}
function initials(label) {
	return label.split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("");
}
function mpesaReceipt() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	let out = "QK";
	for (let i = 0; i < 8; i += 1) out += alphabet[Math.floor(Math.random() * 32)];
	return out;
}
function batchCode(landing) {
	return `AQ-${landing.replace(/[^A-Za-z]/g, "").slice(0, 5).toUpperCase() || "LAKE"}-${Math.floor(1e3 + Math.random() * 9e3)}`;
}
function receiptNo() {
	const d = /* @__PURE__ */ new Date();
	return `R-${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}-${Math.floor(10 + Math.random() * 89)}`;
}
function spoilageLabel(score) {
	if (score >= 70) return {
		label: "At risk",
		variant: "danger"
	};
	if (score >= 40) return {
		label: "Watch",
		variant: "warn"
	};
	return {
		label: "Fresh",
		variant: "ok"
	};
}
function paymentLabel(method) {
	if (method === "mpesa") return "M-Pesa";
	if (method === "cash") return "Cash";
	return method;
}
//#endregion
export { mpesaReceipt as a, spoilageLabel as c, kg as i, tempC as l, initials as n, paymentLabel as o, kes as r, receiptNo as s, batchCode as t };
