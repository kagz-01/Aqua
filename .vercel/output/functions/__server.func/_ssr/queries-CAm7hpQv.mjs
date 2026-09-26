import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as cn } from "./button-D2OqzxhJ.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CAm7hpQv.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl bg-paper p-5 text-ink shadow-[var(--shadow-border)]", className),
		...props
	});
}
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var listFish = createServerFn({ method: "GET" }).handler(createSsrRpc("dd01b07e155d845c1dd94c6c5f550b3c1c39316557936cefc6d57164dcc1c864"));
var listBatches = createServerFn({ method: "GET" }).handler(createSsrRpc("5787c02d6a2b4ba932d116b87e09ea74cb02b08edb542036d557eb348b0bab3c"));
var getBatchByCode = createServerFn({ method: "POST" }).validator((input) => {
	const code = String(input?.code ?? "").trim().toUpperCase();
	if (!code) throw new Error("Enter a batch code");
	return { code };
}).handler(createSsrRpc("23440e03719eb48e11b9791927eac492bec8f1711e90f44b6be46169e472b5cb"));
var listCustomers = createServerFn({ method: "GET" }).handler(createSsrRpc("9c7c88a15a4877d44bee063e40c7d22a90289ad1e8ffc6615b3b5fe03ef7e7bb"));
var listSuppliers = createServerFn({ method: "GET" }).handler(createSsrRpc("3ed0977becbc433f1b58569707d6ccbe0ca63c0cf9e96e8665d8bb0438eeb0c0"));
var listSales = createServerFn({ method: "GET" }).handler(createSsrRpc("14aab18e3b934e891a808fb63315a7845d6108cc422ef9b0094dbb3d5aedd15f"));
var listPayments = createServerFn({ method: "GET" }).handler(createSsrRpc("6ffe2c5a49f446b0b7f32672c9f699ada0913c0146cc18b6656ff41b24b6dcff"));
var listNotifications = createServerFn({ method: "GET" }).handler(createSsrRpc("d6d371886f182e6efbb376d8aa8a0fac4fd6beffdb71eb468425909a539d9087"));
var listSensors = createServerFn({ method: "GET" }).handler(createSsrRpc("727d8df869eb57100b3ed075d40da1d88f8356db5b27806bb77d78dfced855a3"));
var getOverview = createServerFn({ method: "GET" }).handler(createSsrRpc("12d734c6a98ed653488a53dc0e2bc38681612b4a2395d944ce469d07584b65b9"));
var receiveDelivery = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const fishTypeId = Number(d.fishTypeId);
	const supplierId = Number(d.supplierId);
	const quantityKg = Number(d.quantityKg);
	const tempC = Number(d.tempC ?? 2);
	const landingSite = String(d.landingSite ?? "").trim();
	if (!fishTypeId || !supplierId || !landingSite) throw new Error("Choose fish, landing, and supplier");
	if (!(quantityKg > 0)) throw new Error("Quantity must be above 0");
	return {
		fishTypeId,
		supplierId,
		quantityKg,
		tempC,
		landingSite
	};
}).handler(createSsrRpc("3ec47c4ddad9eb1ef62141f7bd2254f321320b0bbcaa271ba670fa965d24afdb"));
var recordSale = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const customerId = Number(d.customerId);
	const method = d.method === "cash" ? "cash" : "mpesa";
	const items = Array.isArray(d.items) ? d.items.map((i) => ({
		fishTypeId: Number(i.fishTypeId),
		qtyKg: Number(i.qtyKg)
	})).filter((i) => i.fishTypeId && i.qtyKg > 0) : [];
	if (!customerId) throw new Error("Choose a counter party");
	if (!items.length) throw new Error("Add at least one fish line");
	return {
		customerId,
		method,
		items
	};
}).handler(createSsrRpc("9f81c332a1d56f9e94c30b3447399f3a5bff0c0b4d4e62110510bbc6c5e1d7cf"));
var confirmMpesa = createServerFn({ method: "POST" }).validator((input) => {
	const saleId = Number(input?.saleId);
	if (!saleId) throw new Error("Missing sale");
	return { saleId };
}).handler(createSsrRpc("9f02d334170cad31c0092a497630dfc9978b93b6fff9ea4283ff7e7ecd7b7790"));
var addCustomer = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const code = String(d.code ?? "").trim();
	const kind = String(d.kind ?? "walkin").trim() || "walkin";
	if (code.length < 3) throw new Error("Use a counter name of at least 3 letters");
	return {
		code,
		kind
	};
}).handler(createSsrRpc("d26e736e03a03cfa6a0169c5d5e7601b1933b6f2f6d19ee5e1ba213e442077e7"));
var addSupplier = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const code = String(d.code ?? "").trim().toUpperCase();
	const landingSite = String(d.landingSite ?? "").trim();
	const boatOrCoop = String(d.boatOrCoop ?? "").trim() || landingSite;
	if (!code || !landingSite) throw new Error("Landing site and code are required");
	return {
		code,
		landingSite,
		boatOrCoop
	};
}).handler(createSsrRpc("613e8ceaa06311e19d9f18ece7272017032a127ea18f451ef70b46d4604b28bb"));
var sendAlert = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const channel = [
		"sms",
		"whatsapp",
		"ussd"
	].includes(String(d.channel)) ? String(d.channel) : "sms";
	const kind = String(d.kind ?? "notice").slice(0, 40);
	const recipientCode = String(d.recipientCode ?? "Owner desk").trim() || "Owner desk";
	const message = String(d.message ?? "").trim();
	if (message.length < 4) throw new Error("Write a short alert");
	return {
		channel,
		kind,
		recipientCode,
		message
	};
}).handler(createSsrRpc("58c0847d22c5194cfdce4aacc0a89afb315083e2cab293172f28ba8898536055"));
var tickSensors = createServerFn({ method: "POST" }).handler(createSsrRpc("6abb8b7caafdc8f5677197e19d2c69617c995d61aa670b0edd3c7c1aa0d09faa"));
var weighIn = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const fishTypeId = Number(d.fishTypeId);
	const supplierId = Number(d.supplierId);
	const kg = Number(d.kg);
	if (!fishTypeId || !supplierId || !(kg > 0)) throw new Error("Scale needs fish, supplier, and a weight");
	return {
		fishTypeId,
		supplierId,
		kg
	};
}).handler(createSsrRpc("8bf560ef759d51747981f8d39c58367765e8bd1571f00cbe5959a240b86378e6"));
//#endregion
export { sendAlert as _, getBatchByCode as a, listCustomers as c, listPayments as d, listSales as f, recordSale as g, receiveDelivery as h, confirmMpesa as i, listFish as l, listSuppliers as m, addCustomer as n, getOverview as o, listSensors as p, addSupplier as r, listBatches as s, Card as t, listNotifications as u, tickSensors as v, weighIn as y };
