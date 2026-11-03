import { r as getSql } from "./db-Dwo-RNqT.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as authMiddleware } from "./middleware-CWlgTcWG.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/market-o12Ye6Fe.js
function number(value) {
	const parsed = Number(value);
	return Number.isFinite(parsed) ? parsed : 0;
}
async function ensureCustomer(sql, userId) {
	const rows = await sql`
    insert into customers (code, kind, user_id)
    values (${"WEB-" + userId}, 'retail', ${userId})
    on conflict (user_id) do update set user_id = excluded.user_id
    returning id`;
	if (!rows[0]) throw new Error("Could not link this account to a customer record");
	return rows[0].id;
}
async function reserveOrderItems(sql, items) {
	if (items.length === 0) throw new Error("This order has no fish lines to reserve");
	const quantityByFish = /* @__PURE__ */ new Map();
	for (const item of items) quantityByFish.set(item.fishTypeId, (quantityByFish.get(item.fishTypeId) ?? 0) + item.quantityKg);
	const fishIds = [...quantityByFish.keys()].sort((a, b) => a - b);
	const fishRows = await sql.query(`select id, name, quantity_kg, reorder_kg
     from fish_types where id = any($1::int[]) order by id for update`, [fishIds]);
	if (fishRows.length !== fishIds.length) throw new Error("One or more fish types no longer exist");
	const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
	const batches = await sql.query(`select id, fish_type_id, remaining_kg from batches
     where fish_type_id = any($1::int[]) and remaining_kg > 0
     order by fish_type_id, delivered_at, id for update`, [fishIds]);
	const batchesByFish = /* @__PURE__ */ new Map();
	for (const batch of batches) {
		const list = batchesByFish.get(batch.fish_type_id) ?? [];
		list.push(batch);
		batchesByFish.set(batch.fish_type_id, list);
	}
	for (const [fishTypeId, quantityKg] of quantityByFish) {
		const fish = fishById.get(fishTypeId);
		if (!fish) throw new Error("A selected fish type could not be loaded");
		if (number(fish.quantity_kg) < quantityKg) throw new Error(`Not enough ${fish.name} is available for this order`);
		if ((batchesByFish.get(fishTypeId) ?? []).reduce((total, batch) => total + number(batch.remaining_kg), 0) + 1e-6 < quantityKg) throw new Error(`Tracked batches for ${fish.name} do not match available stock; reconcile inventory before ordering`);
	}
	for (const item of items) {
		let remainingKg = item.quantityKg;
		for (const batch of batchesByFish.get(item.fishTypeId) ?? []) {
			if (remainingKg <= 1e-6) break;
			const availableKg = number(batch.remaining_kg);
			const reservedKg = Math.min(availableKg, remainingKg);
			if (reservedKg <= 0) continue;
			if (!(await sql`
        update batches set remaining_kg = remaining_kg - ${reservedKg}
        where id = ${batch.id} and remaining_kg >= ${reservedKg}
        returning id`)[0]) throw new Error("Stock changed while this order was being placed; refresh and try again");
			await sql`
        insert into customer_order_allocations (order_item_id, batch_id, quantity_kg)
        values (${item.id}, ${batch.id}, ${reservedKg})`;
			batch.remaining_kg = availableKg - reservedKg;
			remainingKg -= reservedKg;
		}
		if (remainingKg > 1e-6) throw new Error("Not enough tracked batch stock is available for this order");
	}
	for (const [fishTypeId, quantityKg] of quantityByFish) {
		const fish = fishById.get(fishTypeId);
		if (!fish) throw new Error("A selected fish type could not be loaded");
		const updated = await sql`
      update fish_types set quantity_kg = quantity_kg - ${quantityKg}
      where id = ${fishTypeId} and quantity_kg >= ${quantityKg}
      returning quantity_kg`;
		if (!updated[0]) throw new Error("Stock changed while this order was being placed; refresh and try again");
		if (number(updated[0].quantity_kg) <= number(fish.reorder_kg)) await sql`
        insert into notifications (channel, kind, recipient_code, message, status)
        values (
          'in-app', 'low-stock', 'House manager',
          ${`${fish.name} is at or below reorder level (${number(updated[0].quantity_kg).toFixed(1)} kg left).`},
          'logged'
        )`;
	}
}
async function attachItems(headers) {
	if (headers.length === 0) return [];
	const items = await (await getSql()).query(`select id, order_id, fish_type_id, fish_name, qty_kg, unit_price
     from customer_order_items where order_id = any($1::int[]) order by id`, [headers.map((order) => order.id)]);
	const byOrder = /* @__PURE__ */ new Map();
	for (const item of items) {
		const list = byOrder.get(item.order_id) ?? [];
		list.push({
			fishTypeId: item.fish_type_id,
			fishName: item.fish_name,
			quantityKg: number(item.qty_kg),
			unitPrice: number(item.unit_price)
		});
		byOrder.set(item.order_id, list);
	}
	return headers.map((order) => ({
		...order,
		items: byOrder.get(order.id) ?? []
	}));
}
var getMyAquaRole_createServerFn_handler = createServerRpc({
	id: "d4633da6f47cbc47bf148fdaa96fc957c48b67691e4d8b0322f7a8b6ff8787ec",
	name: "getMyAquaRole",
	filename: "src/lib/aqua/market.ts"
}, (opts) => getMyAquaRole.__executeServer(opts));
var getMyAquaRole = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getMyAquaRole_createServerFn_handler, async ({ context }) => {
	const { getAquaRole } = await import("./access.server-Dx-ePMdm.mjs");
	return getAquaRole(context.userId);
});
var claimOwnerAccess_createServerFn_handler = createServerRpc({
	id: "a88840cb3ae15598d85b7964340d0c740f6293d45241a09817f763a3d2406940",
	name: "claimOwnerAccess",
	filename: "src/lib/aqua/market.ts"
}, (opts) => claimOwnerAccess.__executeServer(opts));
var claimOwnerAccess = createServerFn({ method: "POST" }).validator((input) => {
	const setupCode = String(input?.setupCode ?? "");
	if (!setupCode || setupCode.length > 200) throw new Error("Enter the owner setup code");
	return { setupCode };
}).middleware([authMiddleware]).handler(claimOwnerAccess_createServerFn_handler, async ({ context, data }) => {
	const { getAquaRole } = await import("./access.server-Dx-ePMdm.mjs");
	const expected = process.env.AQUA_OWNER_SETUP_CODE?.trim();
	if (!expected) throw new Error("Owner setup is not configured for this app");
	const { timingSafeEqual } = await import("node:crypto");
	const suppliedBytes = Buffer.from(data.setupCode);
	const expectedBytes = Buffer.from(expected);
	if (suppliedBytes.length !== expectedBytes.length || !timingSafeEqual(suppliedBytes, expectedBytes)) throw new Error("That setup code is not valid");
	const sql = await getSql();
	if (await getAquaRole(context.userId)) throw new Error("This account already has staff access");
	if (number((await sql`
      select count(*)::int as count from aqua_staff_roles where role = 'owner'`)[0]?.count) > 0) throw new Error("Owner setup has already been completed");
	await sql`
      insert into aqua_staff_roles (user_id, role) values (${context.userId}, 'owner')`;
	return { role: "owner" };
});
var listTeamUsers_createServerFn_handler = createServerRpc({
	id: "8193c7174700be4ef0ac64aad479a05f2913eefa6c0a9c6e8f2e38c7c88c36e3",
	name: "listTeamUsers",
	filename: "src/lib/aqua/market.ts"
}, (opts) => listTeamUsers.__executeServer(opts));
var listTeamUsers = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listTeamUsers_createServerFn_handler, async ({ context }) => {
	const { requireStaff } = await import("./access.server-Dx-ePMdm.mjs");
	await requireStaff(context.userId, ["owner"]);
	return (await getSql())`
      select u.id, u.name, u.email, r.role
      from "user" u left join aqua_staff_roles r on r.user_id = u.id
      order by u."createdAt" desc limit 200`;
});
var setStaffRole_createServerFn_handler = createServerRpc({
	id: "6f4c0566a0787963c81c15b6a5e147bb54d2475ab22de7efe67ef7fcad2f515c",
	name: "setStaffRole",
	filename: "src/lib/aqua/market.ts"
}, (opts) => setStaffRole.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(setStaffRole_createServerFn_handler, async ({ context, data }) => {
	const { requireStaff } = await import("./access.server-Dx-ePMdm.mjs");
	await requireStaff(context.userId, ["owner"]);
	if (data.userId === context.userId) throw new Error("You cannot change your own owner access");
	const sql = await getSql();
	if (!(await sql`
      select id from "user" where id = ${data.userId} limit 1`)[0]) throw new Error("Account not found");
	if (data.role === null) await sql`
        delete from aqua_staff_roles
        where user_id = ${data.userId} and role <> 'owner'`;
	else await sql`
        insert into aqua_staff_roles (user_id, role)
        values (${data.userId}, ${data.role})
        on conflict (user_id) do update set role = excluded.role
        where aqua_staff_roles.role <> 'owner'`;
	return { ok: true };
});
var listMyOrders_createServerFn_handler = createServerRpc({
	id: "118c4c9eb792b00951c5d6260f40f611a5d82102f56bbf3ef841d16491b9f83a",
	name: "listMyOrders",
	filename: "src/lib/aqua/market.ts"
}, (opts) => listMyOrders.__executeServer(opts));
var listMyOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listMyOrders_createServerFn_handler, async ({ context }) => {
	return attachItems((await (await getSql())`
      select o.id, o.code, o.status, o.total, o.note,
             o.created_at as "createdAt", s.receipt_no as "receiptNo",
             s.payment_status as "paymentStatus"
      from customer_orders o
      left join sales s on s.id = o.sale_id
      where o.user_id = ${context.userId}
      order by o.created_at desc limit 100`).map((row) => ({
		...row,
		total: number(row.total),
		createdAt: String(row.createdAt),
		receiptNo: row.receiptNo ?? null,
		paymentStatus: row.paymentStatus ?? null
	})));
});
var placeCustomerOrder_createServerFn_handler = createServerRpc({
	id: "4f899b12f66b963d4d9e9e82e0c8b29bc99b638d2353bf2779cb4bec33b33aff",
	name: "placeCustomerOrder",
	filename: "src/lib/aqua/market.ts"
}, (opts) => placeCustomerOrder.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(placeCustomerOrder_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const { randomUUID } = await import("node:crypto");
	const code = `AQO-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
	return sql.transaction(async (tx) => {
		const customerId = await ensureCustomer(tx, context.userId);
		const fishIds = data.items.map((item) => item.fishTypeId).sort((a, b) => a - b);
		const fishRows = await tx.query(`select id, name, price_per_kg
         from fish_types where id = any($1::int[]) order by id for update`, [fishIds]);
		if (fishRows.length !== new Set(fishIds).size) throw new Error("One or more selected fish types are no longer available");
		const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
		let total = 0;
		const orderItems = [];
		const created = await tx`
        insert into customer_orders (code, user_id, customer_id, status, total, note)
        values (${code}, ${context.userId}, ${customerId}, 'placed', 0, ${data.note})
        returning id, created_at`;
		for (const item of data.items) {
			const fish = fishById.get(item.fishTypeId);
			if (!fish) throw new Error("A selected fish type could not be loaded");
			total += number(fish.price_per_kg) * item.quantityKg;
			const createdItem = await tx`
          insert into customer_order_items (order_id, fish_type_id, fish_name, qty_kg, unit_price)
          values (
            ${created[0].id}, ${item.fishTypeId}, ${fish.name},
            ${item.quantityKg}, ${number(fish.price_per_kg)}
          )
          returning id`;
			orderItems.push({
				id: createdItem[0].id,
				fishTypeId: item.fishTypeId,
				quantityKg: item.quantityKg
			});
		}
		await tx`
        update customer_orders set total = ${total} where id = ${created[0].id}`;
		await reserveOrderItems(tx, orderItems);
		return {
			id: created[0].id,
			code,
			status: "placed",
			total,
			note: data.note,
			createdAt: String(created[0].created_at),
			receiptNo: null,
			paymentStatus: null
		};
	});
});
var listAllCustomerOrders_createServerFn_handler = createServerRpc({
	id: "6b0c69748ac610bb57d4c29831f4f54f940611bd3aa53d653da61a5d8a9b6260",
	name: "listAllCustomerOrders",
	filename: "src/lib/aqua/market.ts"
}, (opts) => listAllCustomerOrders.__executeServer(opts));
var listAllCustomerOrders = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(listAllCustomerOrders_createServerFn_handler, async ({ context }) => {
	const { requireStaff } = await import("./access.server-Dx-ePMdm.mjs");
	const role = await requireStaff(context.userId, [
		"owner",
		"manager",
		"floor"
	]);
	const rows = await (await getSql())`
      select o.id, o.code, o.status, o.total, o.note,
             o.created_at, s.receipt_no, s.payment_status,
             u.name as customer_name, u.email as customer_email
      from customer_orders o join "user" u on u.id = o.user_id
      left join sales s on s.id = o.sale_id
      where (${role !== "floor"} or o.status in ('ready', 'completed'))
      order by o.created_at desc limit 100`;
	const orders = await attachItems(rows.map((row) => ({
		id: row.id,
		code: row.code,
		status: row.status,
		total: number(row.total),
		note: row.note,
		createdAt: String(row.created_at),
		receiptNo: row.receipt_no,
		paymentStatus: row.payment_status
	})));
	const byId = new Map(rows.map((row) => [row.id, row]));
	return orders.map((order) => ({
		...order,
		customerName: byId.get(order.id)?.customer_name ?? "Customer",
		customerEmail: byId.get(order.id)?.customer_email ?? ""
	}));
});
var updateCustomerOrderStatus_createServerFn_handler = createServerRpc({
	id: "5d8e6e7f3dbf3d9ee3ffd97daceef6d65920fb03093b5a5cf074449e92f81134",
	name: "updateCustomerOrderStatus",
	filename: "src/lib/aqua/market.ts"
}, (opts) => updateCustomerOrderStatus.__executeServer(opts));
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
}).middleware([authMiddleware]).handler(updateCustomerOrderStatus_createServerFn_handler, async ({ context, data }) => {
	const { requireStaff } = await import("./access.server-Dx-ePMdm.mjs");
	const role = await requireStaff(context.userId, [
		"owner",
		"manager",
		"floor"
	]);
	return (await getSql()).transaction(async (tx) => {
		const order = (await tx`
        select status, total, customer_id
        from customer_orders where id = ${data.orderId} for update`)[0];
		if (!order) throw new Error("Order not found");
		const transitions = {
			placed: ["confirmed"],
			confirmed: ["preparing"],
			preparing: ["ready"],
			ready: role === "owner" ? ["completed"] : []
		};
		const canCancel = role !== "floor" && data.status === "cancelled" && order.status !== "completed" && order.status !== "cancelled";
		const canCompletePickup = data.status === "completed" && order.status === "ready" && (role === "owner" || role === "floor");
		if (!canCancel && !canCompletePickup && !transitions[order.status]?.includes(data.status)) throw new Error(`Your role cannot move this order from ${order.status} to ${data.status}`);
		if (data.status === "cancelled") {
			const orderItems = await tx`
          select id, fish_type_id, qty_kg
          from customer_order_items where order_id = ${data.orderId}`;
			const allocations = await tx`
          select a.order_item_id, i.fish_type_id, a.batch_id, a.quantity_kg
          from customer_order_allocations a
          join customer_order_items i on i.id = a.order_item_id
          where i.order_id = ${data.orderId}
          order by a.batch_id`;
			const allocatedByItem = /* @__PURE__ */ new Map();
			for (const allocation of allocations) allocatedByItem.set(allocation.order_item_id, (allocatedByItem.get(allocation.order_item_id) ?? 0) + number(allocation.quantity_kg));
			if (allocations.length > 0 && orderItems.some((item) => Math.abs((allocatedByItem.get(item.id) ?? 0) - number(item.qty_kg)) > 1e-6)) throw new Error("This order's stock reservation is incomplete; reconcile inventory before cancelling");
			const releaseByBatch = /* @__PURE__ */ new Map();
			const releaseByFish = /* @__PURE__ */ new Map();
			for (const allocation of allocations) {
				const quantityKg = number(allocation.quantity_kg);
				releaseByBatch.set(allocation.batch_id, (releaseByBatch.get(allocation.batch_id) ?? 0) + quantityKg);
				releaseByFish.set(allocation.fish_type_id, (releaseByFish.get(allocation.fish_type_id) ?? 0) + quantityKg);
			}
			for (const [batchId, quantityKg] of releaseByBatch) if (!(await tx`
            update batches
            set remaining_kg = remaining_kg + ${quantityKg}
            where id = ${batchId}
              and remaining_kg + ${quantityKg} <= quantity_kg + 0.000001
            returning id`)[0]) throw new Error("Reserved batch stock could not be restored; reconcile inventory");
			for (const [fishTypeId, quantityKg] of releaseByFish) if (!(await tx`
            update fish_types set quantity_kg = quantity_kg + ${quantityKg}
            where id = ${fishTypeId} returning id`)[0]) throw new Error("Reserved fish stock could not be restored; reconcile inventory");
		}
		let receiptNo = null;
		let paymentStatus = null;
		let saleId = null;
		if (data.status === "completed") {
			if (!order.customer_id) throw new Error("This order has no linked customer record and cannot be completed");
			const orderItems = await tx`
          select id, fish_type_id, qty_kg, unit_price
          from customer_order_items where order_id = ${data.orderId}`;
			const allocations = await tx`
          select a.order_item_id, a.batch_id, a.quantity_kg
          from customer_order_allocations a
          join customer_order_items i on i.id = a.order_item_id
          where i.order_id = ${data.orderId}
          order by a.batch_id`;
			if (orderItems.length === 0) throw new Error("This order has no items to sell");
			const allocatedByItem = /* @__PURE__ */ new Map();
			for (const allocation of allocations) allocatedByItem.set(allocation.order_item_id, (allocatedByItem.get(allocation.order_item_id) ?? 0) + number(allocation.quantity_kg));
			if (allocations.length === 0 || orderItems.some((item) => Math.abs((allocatedByItem.get(item.id) ?? 0) - number(item.qty_kg)) > 1e-6)) throw new Error("This order's batch reservation is incomplete; reconcile inventory before pickup");
			const { randomUUID } = await import("node:crypto");
			receiptNo = `R-${randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
			paymentStatus = data.paymentMethod === "cash" ? "paid" : "pending";
			saleId = (await tx`
          insert into sales (
            receipt_no, customer_id, total, payment_method, payment_status
          )
          values (
            ${receiptNo}, ${order.customer_id}, ${number(order.total)},
            ${data.paymentMethod}, ${paymentStatus}
          )
          returning id`)[0]?.id ?? null;
			if (!saleId) throw new Error("Could not create the pickup receipt");
			const itemsById = new Map(orderItems.map((item) => [item.id, item]));
			for (const allocation of allocations) {
				const item = itemsById.get(allocation.order_item_id);
				if (!item) throw new Error("A reserved order item could not be loaded");
				await tx`
            insert into sale_items (sale_id, fish_type_id, batch_id, qty_kg, unit_price)
            values (
              ${saleId}, ${item.fish_type_id}, ${allocation.batch_id},
              ${number(allocation.quantity_kg)}, ${number(item.unit_price)}
            )`;
			}
			await tx`
          insert into payments (sale_id, method, amount, status, msisdn_masked)
          values (
            ${saleId}, ${data.paymentMethod}, ${number(order.total)}, ${paymentStatus},
            ${data.paymentMethod === "mpesa" ? "2547•••221" : null}
          )`;
		}
		if (!(await tx`
        update customer_orders
        set status = ${data.status}, sale_id = coalesce(${saleId}, sale_id), updated_at = now()
        where id = ${data.orderId} and status = ${order.status}
        returning id`)[0]) throw new Error("The order changed while you were updating it; refresh and try again");
		return {
			ok: true,
			receiptNo,
			paymentStatus
		};
	});
});
//#endregion
export { claimOwnerAccess_createServerFn_handler, getMyAquaRole_createServerFn_handler, listAllCustomerOrders_createServerFn_handler, listMyOrders_createServerFn_handler, listTeamUsers_createServerFn_handler, placeCustomerOrder_createServerFn_handler, setStaffRole_createServerFn_handler, updateCustomerOrderStatus_createServerFn_handler };
