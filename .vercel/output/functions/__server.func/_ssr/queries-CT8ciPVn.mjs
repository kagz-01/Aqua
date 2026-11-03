import { r as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
import { t as staffOnly } from "./access-WLVsKFJp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-CT8ciPVn.js
var listFish = createServerFn({ method: "GET" }).handler(createSsrRpc("dd01b07e155d845c1dd94c6c5f550b3c1c39316557936cefc6d57164dcc1c864"));
var listBatches = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(createSsrRpc("5787c02d6a2b4ba932d116b87e09ea74cb02b08edb542036d557eb348b0bab3c"));
var getBatchByCode = createServerFn({ method: "POST" }).validator((input) => {
	const code = String(input?.code ?? "").trim().toUpperCase();
	if (!code) throw new Error("Enter a batch code");
	return { code };
}).handler(createSsrRpc("23440e03719eb48e11b9791927eac492bec8f1711e90f44b6be46169e472b5cb"));
var listCustomers = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(createSsrRpc("9c7c88a15a4877d44bee063e40c7d22a90289ad1e8ffc6615b3b5fe03ef7e7bb"));
var listSuppliers = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(createSsrRpc("3ed0977becbc433f1b58569707d6ccbe0ca63c0cf9e96e8665d8bb0438eeb0c0"));
var listDeliveries = createServerFn({ method: "GET" }).middleware([staffOnly([
	"owner",
	"manager",
	"accounts"
])]).handler(createSsrRpc("a65823d9c2e5ee27cf72e9e0b1083e4bb74e2be7d148499f1ba19612db3ce8c2"));
var listSales = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(createSsrRpc("14aab18e3b934e891a808fb63315a7845d6108cc422ef9b0094dbb3d5aedd15f"));
var listPayments = createServerFn({ method: "GET" }).middleware([staffOnly(["owner", "accounts"])]).handler(createSsrRpc("6ffe2c5a49f446b0b7f32672c9f699ada0913c0146cc18b6656ff41b24b6dcff"));
var listNotifications = createServerFn({ method: "GET" }).middleware([staffOnly(["owner", "manager"])]).handler(createSsrRpc("d6d371886f182e6efbb376d8aa8a0fac4fd6beffdb71eb468425909a539d9087"));
var listSensors = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(createSsrRpc("727d8df869eb57100b3ed075d40da1d88f8356db5b27806bb77d78dfced855a3"));
var getOverview = createServerFn({ method: "GET" }).middleware([staffOnly([
	"owner",
	"manager",
	"accounts"
])]).handler(createSsrRpc("12d734c6a98ed653488a53dc0e2bc38681612b4a2395d944ce469d07584b65b9"));
var recordDelivery = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const supplierId = Number(d?.supplierId);
	const landingSite = String(d?.landingSite ?? "").trim();
	const tempC = Number(d?.tempC);
	const note = String(d?.note ?? "").trim();
	if (!Number.isInteger(supplierId) || supplierId < 1 || !landingSite) throw new Error("Choose a supplier and enter the landing site");
	if (!Number.isFinite(tempC) || tempC < -5 || tempC > 20) throw new Error("Enter a receiving temperature between -5°C and 20°C");
	if (note.length > 500) throw new Error("Delivery notes must be 500 characters or fewer");
	if (!Array.isArray(d?.items) || d.items.length === 0 || d.items.length > 30) throw new Error("Add at least one fish species to the delivery");
	const seen = /* @__PURE__ */ new Set();
	return {
		supplierId,
		landingSite,
		tempC,
		note,
		items: d.items.map((raw) => {
			const item = raw;
			const fishTypeId = Number(item?.fishTypeId);
			const quantityKg = Number(item?.quantityKg);
			const unitCost = Number(item?.unitCost);
			if (!Number.isInteger(fishTypeId) || fishTypeId < 1 || seen.has(fishTypeId)) throw new Error("Each fish species must appear once in the delivery");
			if (!Number.isFinite(quantityKg) || quantityKg <= 0 || quantityKg > 1e4) throw new Error("Each delivery weight must be between 0 and 10,000 kg");
			if (!Number.isFinite(unitCost) || unitCost < 0 || unitCost > 1e6) throw new Error("Enter a valid purchase price per kg");
			seen.add(fishTypeId);
			return {
				fishTypeId,
				quantityKg,
				unitCost
			};
		})
	};
}).middleware([staffOnly(["owner", "manager"])]).handler(createSsrRpc("4fa447cf3968e78fb9f81aaee7ff1b8ab2619e877838078eb0a8bdc70d844b89"));
var weighIn = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const fishTypeId = Number(d?.fishTypeId);
	const supplierId = Number(d?.supplierId);
	const kg = Number(d?.kg);
	const landingSite = String(d?.landingSite ?? "").trim();
	const tempC = Number(d?.tempC ?? 2);
	const note = String(d?.note ?? "Scale intake").trim();
	if (!Number.isInteger(fishTypeId) || fishTypeId < 1) throw new Error("Choose a fish species");
	if (!Number.isInteger(supplierId) || supplierId < 1) throw new Error("Choose a supplier");
	if (!Number.isFinite(kg) || kg <= 0 || kg > 1e4) throw new Error("Enter a valid weight between 0 and 10,000 kg");
	if (!landingSite) throw new Error("Landing site is required");
	if (!Number.isFinite(tempC) || tempC < -5 || tempC > 20) throw new Error("Enter a receiving temperature between -5°C and 20°C");
	if (note.length > 500) throw new Error("Notes must be 500 characters or fewer");
	return {
		fishTypeId,
		supplierId,
		kg,
		landingSite,
		tempC,
		note
	};
}).middleware([staffOnly(["owner", "manager"])]).handler(createSsrRpc("8bf560ef759d51747981f8d39c58367765e8bd1571f00cbe5959a240b86378e6"));
var recordSupplierPayment = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const deliveryId = Number(d?.deliveryId);
	const amount = Number(d?.amount);
	const method = String(d?.method ?? "");
	const reference = String(d?.reference ?? "").trim();
	if (!Number.isInteger(deliveryId) || deliveryId < 1) throw new Error("Choose a delivery");
	if (!Number.isFinite(amount) || amount <= 0) throw new Error("Payment must be greater than zero");
	if (![
		"cash",
		"mpesa",
		"bank"
	].includes(method)) throw new Error("Choose a payment method");
	if (reference.length > 100) throw new Error("Payment reference is too long");
	return {
		deliveryId,
		amount,
		method,
		reference
	};
}).middleware([staffOnly(["owner", "accounts"])]).handler(createSsrRpc("066d8e4f4a094abcdd28d9adf010381a45b6eebc43025dbfda358a2580ec7083"));
var recordSale = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const customerId = Number(d.customerId);
	const method = String(d.method ?? "");
	if (!Number.isInteger(customerId) || customerId < 1) throw new Error("Choose a counter party");
	if (method !== "cash" && method !== "mpesa") throw new Error("Choose a payment method");
	if (!Array.isArray(d.items) || d.items.length === 0 || d.items.length > 30) throw new Error("Add at least one fish line");
	const quantities = /* @__PURE__ */ new Map();
	for (const raw of d.items) {
		const item = raw;
		const fishTypeId = Number(item?.fishTypeId);
		const qtyKg = Number(item?.qtyKg);
		if (!Number.isInteger(fishTypeId) || fishTypeId < 1) throw new Error("A fish line is invalid");
		if (!Number.isFinite(qtyKg) || qtyKg <= 0 || qtyKg > 1e3) throw new Error("Each sale quantity must be between 0 and 1,000 kg");
		quantities.set(fishTypeId, (quantities.get(fishTypeId) ?? 0) + qtyKg);
	}
	return {
		customerId,
		method,
		items: [...quantities].map(([fishTypeId, qtyKg]) => ({
			fishTypeId,
			qtyKg
		}))
	};
}).middleware([staffOnly(["owner", "floor"])]).handler(createSsrRpc("9f81c332a1d56f9e94c30b3447399f3a5bff0c0b4d4e62110510bbc6c5e1d7cf"));
var confirmMpesa = createServerFn({ method: "POST" }).validator((input) => {
	const saleId = Number(input?.saleId);
	if (!saleId) throw new Error("Missing sale");
	return { saleId };
}).middleware([staffOnly(["owner", "accounts"])]).handler(createSsrRpc("9f02d334170cad31c0092a497630dfc9978b93b6fff9ea4283ff7e7ecd7b7790"));
var addCustomer = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const code = String(d.code ?? "").trim();
	const kind = String(d.kind ?? "walkin").trim() || "walkin";
	if (code.length < 3) throw new Error("Use a counter name of at least 3 letters");
	return {
		code,
		kind
	};
}).middleware([staffOnly()]).handler(createSsrRpc("d26e736e03a03cfa6a0169c5d5e7601b1933b6f2f6d19ee5e1ba213e442077e7"));
var addSupplier = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const code = String(d.code ?? "").trim().toUpperCase();
	const landingSite = String(d.landingSite ?? "").trim();
	const boatOrCoop = String(d.boatOrCoop ?? "").trim();
	const supplierKind = String(d.supplierKind ?? "");
	const phone = String(d.phone ?? "").trim();
	if (code.length < 2 || code.length > 40 || !landingSite || !boatOrCoop) throw new Error("Enter a supplier code, name, and usual landing site");
	if (![
		"fisher",
		"boat",
		"cooperative"
	].includes(supplierKind)) throw new Error("Choose an individual fisher, boat, or cooperative");
	if (phone.length > 40) throw new Error("Phone number is too long");
	return {
		code,
		landingSite,
		boatOrCoop,
		supplierKind,
		phone
	};
}).middleware([staffOnly(["owner", "manager"])]).handler(createSsrRpc("613e8ceaa06311e19d9f18ece7272017032a127ea18f451ef70b46d4604b28bb"));
var sendAlert = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const channel = [
		"sms",
		"whatsapp",
		"email"
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
}).middleware([staffOnly(["owner", "manager"])]).handler(createSsrRpc("58c0847d22c5194cfdce4aacc0a89afb315083e2cab293172f28ba8898536055"));
var tickSensors = createServerFn({ method: "POST" }).middleware([staffOnly(["owner", "manager"])]).handler(createSsrRpc("6abb8b7caafdc8f5677197e19d2c69617c995d61aa670b0edd3c7c1aa0d09faa"));
//#endregion
export { recordSupplierPayment as _, getOverview as a, weighIn as b, listDeliveries as c, listPayments as d, listSales as f, recordSale as g, recordDelivery as h, getBatchByCode as i, listFish as l, listSuppliers as m, addSupplier as n, listBatches as o, listSensors as p, confirmMpesa as r, listCustomers as s, addCustomer as t, listNotifications as u, sendAlert as v, tickSensors as y };
