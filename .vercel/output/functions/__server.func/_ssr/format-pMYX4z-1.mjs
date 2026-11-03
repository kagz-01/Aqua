//#region node_modules/.nitro/vite/services/ssr/assets/format-pMYX4z-1.js
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
export { paymentLabel as a, mpesaReceipt as i, kes as n, spoilageLabel as o, kg as r, tempC as s, initials as t };
