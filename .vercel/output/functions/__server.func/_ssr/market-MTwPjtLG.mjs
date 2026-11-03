import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CWlgTcWG.mjs";
import { t as createSsrRpc } from "./createSsrRpc-B2Izd0c7.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-MTwPjtLG.js
var getMyAquaRole = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("d4633da6f47cbc47bf148fdaa96fc957c48b67691e4d8b0322f7a8b6ff8787ec"));
createServerFn({ method: "POST" }).validator((input) => {
	const setupCode = String(input?.setupCode ?? "");
	if (!setupCode || setupCode.length > 200) throw new Error("Enter the owner setup code");
	return { setupCode };
}).middleware([authMiddleware]).handler(createSsrRpc("a88840cb3ae15598d85b7964340d0c740f6293d45241a09817f763a3d2406940"));
var listTeamUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("8193c7174700be4ef0ac64aad479a05f2913eefa6c0a9c6e8f2e38c7c88c36e3"));
var setStaffRole = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const userId = String(d?.userId ?? "").trim();
	const role = d?.role ?? null;
	if (!userId || userId.length > 200) throw new Error("Choose an account");
	if (role !== null && role !== "manager" && role !== "floor" && role !== "accounts") throw new Error("Choose house manager, floor attendant, accounts officer, or customer access");
	return {
		userId,
		role
	};
}).middleware([authMiddleware]).handler(createSsrRpc("6f4c0566a0787963c81c15b6a5e147bb54d2475ab22de7efe67ef7fcad2f515c"));
var listMyOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("118c4c9eb792b00951c5d6260f40f611a5d82102f56bbf3ef841d16491b9f83a"));
var placeCustomerOrder = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	if (!Array.isArray(d?.items) || d.items.length === 0 || d.items.length > 30) throw new Error("Add at least one fish to your cart");
	const quantities = /* @__PURE__ */ new Map();
	for (const raw of d.items) {
		const item = raw;
		const fishTypeId = Number(item?.fishTypeId);
		const quantityKg = Number(item?.quantityKg);
		if (!Number.isInteger(fishTypeId) || fishTypeId < 1) throw new Error("A cart item is invalid");
		if (!Number.isFinite(quantityKg) || quantityKg <= 0 || quantityKg > 1e3) throw new Error("Each quantity must be between 0 and 1,000 kg");
		quantities.set(fishTypeId, (quantities.get(fishTypeId) ?? 0) + quantityKg);
	}
	const note = String(d.note ?? "").trim();
	if (note.length > 300) throw new Error("Order notes must be 300 characters or fewer");
	return {
		items: [...quantities].map(([fishTypeId, quantityKg]) => ({
			fishTypeId,
			quantityKg
		})),
		note
	};
}).middleware([authMiddleware]).handler(createSsrRpc("4f899b12f66b963d4d9e9e82e0c8b29bc99b638d2353bf2779cb4bec33b33aff"));
var listAllCustomerOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(createSsrRpc("6b0c69748ac610bb57d4c29831f4f54f940611bd3aa53d653da61a5d8a9b6260"));
var updateCustomerOrderStatus = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const orderId = Number(d?.orderId);
	const status = String(d?.status ?? "");
	if (!Number.isInteger(orderId) || orderId < 1) throw new Error("Choose an order");
	if (![
		"confirmed",
		"preparing",
		"ready",
		"completed",
		"cancelled"
	].includes(status)) throw new Error("Choose a valid order status");
	const paymentMethod = d.paymentMethod == null ? null : String(d.paymentMethod);
	if (paymentMethod !== null && paymentMethod !== "cash" && paymentMethod !== "mpesa") throw new Error("Choose cash or M-Pesa for the pickup");
	if (status === "completed" && paymentMethod === null) throw new Error("Choose how the customer paid at pickup");
	return {
		orderId,
		status,
		paymentMethod
	};
}).middleware([authMiddleware]).handler(createSsrRpc("5d8e6e7f3dbf3d9ee3ffd97daceef6d65920fb03093b5a5cf074449e92f81134"));
//#endregion
export { placeCustomerOrder as a, listTeamUsers as i, listAllCustomerOrders as n, setStaffRole as o, listMyOrders as r, updateCustomerOrderStatus as s, getMyAquaRole as t };
