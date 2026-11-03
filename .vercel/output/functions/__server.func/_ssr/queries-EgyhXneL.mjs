import { r as getSql } from "./db-Dwo-RNqT.mjs";
import { r as createServerFn } from "./ssr.mjs";
import { t as staffOnly } from "./access-WLVsKFJp.mjs";
import { i as mpesaReceipt } from "./format-pMYX4z-1.mjs";
import { t as createServerRpc } from "./createServerRpc-CcvdN_gc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-EgyhXneL.js
function n(v) {
	const x = typeof v === "string" ? Number(v) : typeof v === "number" ? v : 0;
	return Number.isFinite(x) ? x : 0;
}
var listFish_createServerFn_handler = createServerRpc({
	id: "dd01b07e155d845c1dd94c6c5f550b3c1c39316557936cefc6d57164dcc1c864",
	name: "listFish",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listFish.__executeServer(opts));
var listFish = createServerFn({ method: "GET" }).handler(listFish_createServerFn_handler, async () => {
	return (await (await getSql())`select id, name, local_name, category, price_per_kg, reorder_kg, quantity_kg, image_key, in_season
     from fish_types order by name`).map((r) => ({
		id: r.id,
		name: r.name,
		localName: r.local_name,
		category: r.category,
		pricePerKg: n(r.price_per_kg),
		reorderKg: n(r.reorder_kg),
		quantityKg: n(r.quantity_kg),
		imageKey: r.image_key,
		inSeason: Boolean(r.in_season)
	}));
});
var listBatches_createServerFn_handler = createServerRpc({
	id: "5787c02d6a2b4ba932d116b87e09ea74cb02b08edb542036d557eb348b0bab3c",
	name: "listBatches",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listBatches.__executeServer(opts));
var listBatches = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(listBatches_createServerFn_handler, async () => {
	return (await (await getSql())`select b.id, b.code, b.fish_type_id, f.name as fish_name, f.local_name,
            s.code as supplier_code, b.landing_site, b.delivered_at,
            b.quantity_kg, b.remaining_kg, b.temp_c, b.spoilage_score
     from batches b
     join fish_types f on f.id = b.fish_type_id
     join suppliers s on s.id = b.supplier_id
     order by b.delivered_at desc`).map((r) => ({
		id: r.id,
		code: r.code,
		fishTypeId: r.fish_type_id,
		fishName: r.fish_name,
		localName: r.local_name,
		supplierCode: r.supplier_code,
		landingSite: r.landing_site,
		deliveredAt: String(r.delivered_at),
		quantityKg: n(r.quantity_kg),
		remainingKg: n(r.remaining_kg),
		tempC: n(r.temp_c),
		spoilageScore: n(r.spoilage_score)
	}));
});
var getBatchByCode_createServerFn_handler = createServerRpc({
	id: "23440e03719eb48e11b9791927eac492bec8f1711e90f44b6be46169e472b5cb",
	name: "getBatchByCode",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => getBatchByCode.__executeServer(opts));
var getBatchByCode = createServerFn({ method: "POST" }).validator((input) => {
	const code = String(input?.code ?? "").trim().toUpperCase();
	if (!code) throw new Error("Enter a batch code");
	return { code };
}).handler(getBatchByCode_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const r = (await sql`select b.id, b.code, b.fish_type_id, f.name as fish_name, f.local_name,
              s.code as supplier_code, s.boat_or_coop, b.landing_site, b.delivered_at,
              b.quantity_kg, b.remaining_kg, b.temp_c, b.spoilage_score
       from batches b
       join fish_types f on f.id = b.fish_type_id
       join suppliers s on s.id = b.supplier_id
       where b.code = ${data.code}
       limit 1`)[0];
	if (!r) return null;
	const hops = await sql`
      select s.receipt_no, c.code as customer_code, si.qty_kg, s.created_at
      from sale_items si
      join sales s on s.id = si.sale_id
      join customers c on c.id = s.customer_id
      where si.batch_id = ${r.id}
      order by s.created_at desc
      limit 8`;
	return {
		batch: {
			id: r.id,
			code: r.code,
			fishTypeId: r.fish_type_id,
			fishName: r.fish_name,
			localName: r.local_name,
			supplierCode: r.supplier_code,
			landingSite: r.landing_site,
			deliveredAt: String(r.delivered_at),
			quantityKg: n(r.quantity_kg),
			remainingKg: n(r.remaining_kg),
			tempC: n(r.temp_c),
			spoilageScore: n(r.spoilage_score)
		},
		boatOrCoop: r.boat_or_coop,
		hops: hops.map((h) => ({
			receiptNo: h.receipt_no,
			customerCode: h.customer_code,
			qtyKg: n(h.qty_kg),
			createdAt: String(h.created_at)
		}))
	};
});
var listCustomers_createServerFn_handler = createServerRpc({
	id: "9c7c88a15a4877d44bee063e40c7d22a90289ad1e8ffc6615b3b5fe03ef7e7bb",
	name: "listCustomers",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listCustomers.__executeServer(opts));
var listCustomers = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(listCustomers_createServerFn_handler, async () => {
	return (await (await getSql())`
    select id, code, kind, credit_balance from customers order by code`).map((r) => ({
		id: r.id,
		code: r.code,
		kind: r.kind,
		creditBalance: n(r.credit_balance)
	}));
});
var listSuppliers_createServerFn_handler = createServerRpc({
	id: "3ed0977becbc433f1b58569707d6ccbe0ca63c0cf9e96e8665d8bb0438eeb0c0",
	name: "listSuppliers",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listSuppliers.__executeServer(opts));
var listSuppliers = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(listSuppliers_createServerFn_handler, async () => {
	return (await (await getSql())`select id, code, landing_site, boat_or_coop, supplier_kind, phone, reliability
     from suppliers order by landing_site, boat_or_coop`).map((r) => ({
		id: r.id,
		code: r.code,
		landingSite: r.landing_site,
		boatOrCoop: r.boat_or_coop,
		supplierKind: r.supplier_kind,
		phone: r.phone,
		reliability: n(r.reliability)
	}));
});
var listDeliveries_createServerFn_handler = createServerRpc({
	id: "a65823d9c2e5ee27cf72e9e0b1083e4bb74e2be7d148499f1ba19612db3ce8c2",
	name: "listDeliveries",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listDeliveries.__executeServer(opts));
var listDeliveries = createServerFn({ method: "GET" }).middleware([staffOnly([
	"owner",
	"manager",
	"accounts"
])]).handler(listDeliveries_createServerFn_handler, async () => {
	const sql = await getSql();
	const headers = await sql`
      select d.id, d.code, s.code as supplier_code, s.boat_or_coop as supplier_name,
             s.supplier_kind, d.landing_site, d.received_at, d.temp_c, d.note,
             coalesce(sum(i.quantity_kg), 0)::float as total_kg,
             coalesce(sum(i.quantity_kg * i.unit_cost), 0)::float as total_cost,
             coalesce((select sum(p.amount) from supplier_payments p
                       where p.delivery_id = d.id), 0)::float as amount_paid
      from fish_deliveries d
      join suppliers s on s.id = d.supplier_id
      left join fish_delivery_items i on i.delivery_id = d.id
      group by d.id, s.code, s.boat_or_coop, s.supplier_kind
      order by d.received_at desc
      limit 100`;
	if (headers.length === 0) return [];
	const items = await sql.query(`select i.delivery_id, f.name as fish_name, i.quantity_kg, i.unit_cost, b.code as batch_code
       from fish_delivery_items i
       join fish_types f on f.id = i.fish_type_id
       join batches b on b.id = i.batch_id
       where i.delivery_id = any($1::int[])
       order by i.delivery_id, i.id`, [headers.map((delivery) => delivery.id)]);
	const itemsByDelivery = /* @__PURE__ */ new Map();
	for (const item of items) {
		const list = itemsByDelivery.get(item.delivery_id) ?? [];
		list.push({
			fishName: item.fish_name,
			quantityKg: n(item.quantity_kg),
			unitCost: n(item.unit_cost),
			batchCode: item.batch_code
		});
		itemsByDelivery.set(item.delivery_id, list);
	}
	return headers.map((delivery) => {
		const totalCost = n(delivery.total_cost);
		const amountPaid = n(delivery.amount_paid);
		return {
			id: delivery.id,
			code: delivery.code,
			supplierCode: delivery.supplier_code,
			supplierName: delivery.supplier_name,
			supplierKind: delivery.supplier_kind,
			landingSite: delivery.landing_site,
			receivedAt: String(delivery.received_at),
			tempC: n(delivery.temp_c),
			note: delivery.note,
			totalKg: n(delivery.total_kg),
			totalCost,
			amountPaid,
			balance: Math.max(0, totalCost - amountPaid),
			items: itemsByDelivery.get(delivery.id) ?? []
		};
	});
});
var listSales_createServerFn_handler = createServerRpc({
	id: "14aab18e3b934e891a808fb63315a7845d6108cc422ef9b0094dbb3d5aedd15f",
	name: "listSales",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listSales.__executeServer(opts));
var listSales = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(listSales_createServerFn_handler, async () => {
	return (await (await getSql())`select s.id, s.receipt_no, c.code as customer_code, s.total, s.payment_method,
            s.payment_status, s.mpesa_receipt, s.created_at, count(si.id)::int as item_count
     from sales s
     join customers c on c.id = s.customer_id
     left join sale_items si on si.sale_id = s.id
     group by s.id, c.code
     order by s.created_at desc
     limit 80`).map((r) => ({
		id: r.id,
		receiptNo: r.receipt_no,
		customerCode: r.customer_code,
		total: n(r.total),
		paymentMethod: r.payment_method,
		paymentStatus: r.payment_status,
		mpesaReceipt: r.mpesa_receipt,
		createdAt: String(r.created_at),
		itemCount: n(r.item_count)
	}));
});
var listPayments_createServerFn_handler = createServerRpc({
	id: "6ffe2c5a49f446b0b7f32672c9f699ada0913c0146cc18b6656ff41b24b6dcff",
	name: "listPayments",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listPayments.__executeServer(opts));
var listPayments = createServerFn({ method: "GET" }).middleware([staffOnly(["owner", "accounts"])]).handler(listPayments_createServerFn_handler, async () => {
	return (await (await getSql())`select p.id, p.sale_id, s.receipt_no, p.method, p.amount, p.status,
            p.mpesa_receipt, p.msisdn_masked, p.created_at
     from payments p
     join sales s on s.id = p.sale_id
     order by p.created_at desc
     limit 80`).map((r) => ({
		id: r.id,
		saleId: r.sale_id,
		receiptNo: r.receipt_no,
		method: r.method,
		amount: n(r.amount),
		status: r.status,
		mpesaReceipt: r.mpesa_receipt,
		msisdnMasked: r.msisdn_masked,
		createdAt: String(r.created_at)
	}));
});
var listNotifications_createServerFn_handler = createServerRpc({
	id: "d6d371886f182e6efbb376d8aa8a0fac4fd6beffdb71eb468425909a539d9087",
	name: "listNotifications",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listNotifications.__executeServer(opts));
var listNotifications = createServerFn({ method: "GET" }).middleware([staffOnly(["owner", "manager"])]).handler(listNotifications_createServerFn_handler, async () => {
	return (await (await getSql())`select id, channel, kind, recipient_code, message, status, created_at
     from notifications order by created_at desc limit 60`).map((r) => ({
		id: r.id,
		channel: r.channel,
		kind: r.kind,
		recipientCode: r.recipient_code,
		message: r.message,
		status: r.status,
		createdAt: String(r.created_at)
	}));
});
var listSensors_createServerFn_handler = createServerRpc({
	id: "727d8df869eb57100b3ed075d40da1d88f8356db5b27806bb77d78dfced855a3",
	name: "listSensors",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listSensors.__executeServer(opts));
var listSensors = createServerFn({ method: "GET" }).middleware([staffOnly()]).handler(listSensors_createServerFn_handler, async () => {
	return (await (await getSql())`select id, code, location, kind, value, unit, status, recorded_at from sensors order by id`).map((r) => ({
		id: r.id,
		code: r.code,
		location: r.location,
		kind: r.kind,
		value: n(r.value),
		unit: r.unit,
		status: r.status,
		recordedAt: String(r.recorded_at)
	}));
});
var getOverview_createServerFn_handler = createServerRpc({
	id: "12d734c6a98ed653488a53dc0e2bc38681612b4a2395d944ce469d07584b65b9",
	name: "getOverview",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => getOverview.__executeServer(opts));
var getOverview = createServerFn({ method: "GET" }).middleware([staffOnly([
	"owner",
	"manager",
	"accounts"
])]).handler(getOverview_createServerFn_handler, async () => {
	const sql = await getSql();
	const today = await sql`
    select coalesce(sum(total),0)::float as total, count(*)::int as count
    from sales where created_at::date = now()::date`;
	const week = await sql`
    select coalesce(sum(total),0)::float as total
    from sales where created_at > now() - interval '7 days'`;
	const pending = await sql`
    select coalesce(sum(total),0)::float as total, count(*)::int as count
    from sales where payment_status = 'pending'`;
	const stockValue = await sql`
    select coalesce(sum(quantity_kg * price_per_kg),0)::float as value from fish_types`;
	const mix = await sql`
    select payment_method as method, coalesce(sum(total),0)::float as total
    from sales where created_at > now() - interval '14 days'
    group by payment_method`;
	const series = await sql`
    select created_at::date as day, coalesce(sum(total),0)::float as total, count(*)::int as count
    from sales
    where created_at > now() - interval '14 days'
    group by created_at::date
    order by day`;
	const top = await sql`
    select f.name, f.local_name, coalesce(sum(si.qty_kg),0)::float as qty,
           coalesce(sum(si.qty_kg * si.unit_price),0)::float as revenue
    from sale_items si
    join sales s on s.id = si.sale_id
    join fish_types f on f.id = si.fish_type_id
    where s.created_at > now() - interval '14 days'
    group by f.name, f.local_name
    order by revenue desc`;
	const low = await sql`
    select id, name, local_name, quantity_kg, reorder_kg, image_key
    from fish_types where quantity_kg <= reorder_kg order by quantity_kg asc`;
	const forecast = await sql`select f.id as fish_type_id, f.name, f.quantity_kg,
            coalesce((select sum(si.qty_kg) from sale_items si join sales s on s.id = si.sale_id
                      where si.fish_type_id = f.id and s.created_at > now() - interval '7 days'),0)::float / 7.0 as daily
     from fish_types f`;
	return {
		todayTotal: n(today[0]?.total),
		todayCount: n(today[0]?.count),
		weekTotal: n(week[0]?.total),
		pendingTotal: n(pending[0]?.total),
		pendingCount: n(pending[0]?.count),
		stockValue: n(stockValue[0]?.value),
		mix: mix.map((m) => ({
			method: m.method,
			total: n(m.total)
		})),
		series: series.map((d) => ({
			day: String(d.day).slice(0, 10),
			total: n(d.total),
			count: n(d.count)
		})),
		top: top.map((t) => ({
			name: t.name,
			localName: t.local_name,
			qty: n(t.qty),
			revenue: n(t.revenue)
		})),
		low: low.map((f) => ({
			id: f.id,
			name: f.name,
			localName: f.local_name,
			quantityKg: n(f.quantity_kg),
			reorderKg: n(f.reorder_kg),
			imageKey: f.image_key
		})),
		forecast: forecast.map((f) => {
			const daily = n(f.daily);
			const daysLeft = daily > .05 ? n(f.quantity_kg) / daily : 99;
			return {
				fishTypeId: f.fish_type_id,
				name: f.name,
				quantityKg: n(f.quantity_kg),
				daily,
				daysLeft,
				threeDayNeed: daily * 3
			};
		})
	};
});
var recordDelivery_createServerFn_handler = createServerRpc({
	id: "4fa447cf3968e78fb9f81aaee7ff1b8ab2619e877838078eb0a8bdc70d844b89",
	name: "recordDelivery",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => recordDelivery.__executeServer(opts));
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
}).middleware([staffOnly(["owner", "manager"])]).handler(recordDelivery_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const { randomUUID } = await import("node:crypto");
	const code = `LD-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
	const batchCodes = data.items.map(() => `AQ-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`);
	const tempScore = data.tempC > 5 ? 25 : data.tempC > 3 ? 12 : 4;
	const spoilage = Math.min(95, 10 + tempScore);
	return sql.transaction(async (tx) => {
		const fishRows = await tx.query(`select id, name from fish_types
         where id = any($1::int[]) order by id for update`, [data.items.map((item) => item.fishTypeId).sort((a, b) => a - b)]);
		if (fishRows.length !== data.items.length) throw new Error("One or more selected fish species no longer exist");
		if (!(await tx`
        select id from suppliers where id = ${data.supplierId} and supplier_kind <> 'opening'`)[0]) throw new Error("The selected fisher or supplier was not found");
		const delivery = await tx`
        insert into fish_deliveries (code, supplier_id, landing_site, temp_c, note)
        values (${code}, ${data.supplierId}, ${data.landingSite}, ${data.tempC}, ${data.note})
        returning id`;
		const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
		let totalKg = 0;
		let totalCost = 0;
		for (const [index, item] of data.items.entries()) {
			if (!fishById.get(item.fishTypeId)) throw new Error("A selected fish species could not be loaded");
			const batch = await tx`
          insert into batches (
            code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg,
            temp_c, spoilage_score, delivery_id
          )
          values (
            ${batchCodes[index]}, ${item.fishTypeId}, ${data.supplierId}, ${data.landingSite},
            ${item.quantityKg}, ${item.quantityKg}, ${data.tempC}, ${spoilage}, ${delivery[0].id}
          )
          returning id`;
			await tx`
          insert into fish_delivery_items (delivery_id, fish_type_id, quantity_kg, unit_cost, batch_id)
          values (${delivery[0].id}, ${item.fishTypeId}, ${item.quantityKg}, ${item.unitCost}, ${batch[0].id})`;
			await tx`
          update fish_types set quantity_kg = quantity_kg + ${item.quantityKg}
          where id = ${item.fishTypeId}`;
			totalKg += item.quantityKg;
			totalCost += item.quantityKg * item.unitCost;
		}
		await tx`
        insert into notifications (channel, kind, recipient_code, message, status)
        values (
          'sms', 'delivery', 'House manager',
          ${`${totalKg.toFixed(1)} kg landed at ${data.landingSite} from delivery ${code}.`},
          'sent'
        )`;
		return {
			code,
			totalKg,
			totalCost
		};
	});
});
var weighIn_createServerFn_handler = createServerRpc({
	id: "8bf560ef759d51747981f8d39c58367765e8bd1571f00cbe5959a240b86378e6",
	name: "weighIn",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => weighIn.__executeServer(opts));
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
}).middleware([staffOnly(["owner", "manager"])]).handler(weighIn_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const supplier = await sql`
      select landing_site from suppliers where id = ${data.supplierId} and supplier_kind <> 'opening' limit 1`;
	if (!supplier[0]) throw new Error("The selected fisher or supplier was not found");
	const landingSite = data.landingSite || supplier[0].landing_site;
	const { randomUUID } = await import("node:crypto");
	const code = `LD-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
	const batchCode = `AQ-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
	const tempScore = data.tempC > 5 ? 25 : data.tempC > 3 ? 12 : 4;
	const spoilage = Math.min(95, 10 + tempScore);
	return sql.transaction(async (tx) => {
		if (!(await tx`
        select id, name, quantity_kg from fish_types where id = ${data.fishTypeId} for update`)[0]) throw new Error("The selected fish species could not be loaded");
		const delivery = await tx`
        insert into fish_deliveries (code, supplier_id, landing_site, temp_c, note)
        values (${code}, ${data.supplierId}, ${landingSite}, ${data.tempC}, ${data.note})
        returning id`;
		const batch = await tx`
        insert into batches (
          code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg,
          temp_c, spoilage_score, delivery_id
        )
        values (
          ${batchCode}, ${data.fishTypeId}, ${data.supplierId}, ${landingSite},
          ${data.kg}, ${data.kg}, ${data.tempC}, ${spoilage}, ${delivery[0].id}
        )
        returning id`;
		await tx`
        insert into fish_delivery_items (delivery_id, fish_type_id, quantity_kg, unit_cost, batch_id)
        values (${delivery[0].id}, ${data.fishTypeId}, ${data.kg}, 0, ${batch[0].id})`;
		await tx`
        update fish_types set quantity_kg = quantity_kg + ${data.kg} where id = ${data.fishTypeId}`;
		return {
			code,
			totalKg: data.kg,
			totalCost: 0
		};
	});
});
var recordSupplierPayment_createServerFn_handler = createServerRpc({
	id: "066d8e4f4a094abcdd28d9adf010381a45b6eebc43025dbfda358a2580ec7083",
	name: "recordSupplierPayment",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => recordSupplierPayment.__executeServer(opts));
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
}).middleware([staffOnly(["owner", "accounts"])]).handler(recordSupplierPayment_createServerFn_handler, async ({ data }) => {
	return (await getSql()).transaction(async (tx) => {
		if (!(await tx`
        select id from fish_deliveries where id = ${data.deliveryId} for update`)[0]) throw new Error("Delivery not found");
		const totals = await tx`
        select coalesce((select sum(quantity_kg * unit_cost)
                         from fish_delivery_items where delivery_id = ${data.deliveryId}), 0)::float as total,
               coalesce((select sum(amount)
                         from supplier_payments where delivery_id = ${data.deliveryId}), 0)::float as paid`;
		const balance = n(totals[0]?.total) - n(totals[0]?.paid);
		if (data.amount > balance + 1e-6) throw new Error(`Payment exceeds the outstanding balance of KES ${Math.max(0, balance).toFixed(2)}`);
		await tx`
        insert into supplier_payments (delivery_id, amount, method, reference)
        values (${data.deliveryId}, ${data.amount}, ${data.method}, ${data.reference})`;
		return { balance: Math.max(0, balance - data.amount) };
	});
});
var recordSale_createServerFn_handler = createServerRpc({
	id: "9f81c332a1d56f9e94c30b3447399f3a5bff0c0b4d4e62110510bbc6c5e1d7cf",
	name: "recordSale",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => recordSale.__executeServer(opts));
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
}).middleware([staffOnly(["owner", "floor"])]).handler(recordSale_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const { randomUUID } = await import("node:crypto");
	const now = /* @__PURE__ */ new Date();
	const receipt = `R-${`${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`}-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
	const status = data.method === "mpesa" ? "pending" : "paid";
	return sql.transaction(async (tx) => {
		const fishRows = await tx.query(`select id, name, price_per_kg, quantity_kg, reorder_kg
         from fish_types where id = any($1::int[]) order by id for update`, [data.items.map((item) => item.fishTypeId).sort((a, b) => a - b)]);
		if (fishRows.length !== data.items.length) throw new Error("One or more fish types were not found");
		const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
		if (!(await tx`
        select id from customers where id = ${data.customerId}`)[0]) throw new Error("Customer counter not found");
		const batches = await tx.query(`select id, fish_type_id, remaining_kg from batches
         where fish_type_id = any($1::int[]) and remaining_kg > 0
         order by fish_type_id, delivered_at, id for update`, [data.items.map((item) => item.fishTypeId).sort((a, b) => a - b)]);
		const batchesByFish = /* @__PURE__ */ new Map();
		for (const batch of batches) {
			const group = batchesByFish.get(batch.fish_type_id) ?? [];
			group.push(batch);
			batchesByFish.set(batch.fish_type_id, group);
		}
		let total = 0;
		for (const item of data.items) {
			const fish = fishById.get(item.fishTypeId);
			if (!fish) throw new Error("Unknown fish");
			if (n(fish.quantity_kg) < item.qtyKg) throw new Error(`Not enough ${fish.name} on the ice`);
			if ((batchesByFish.get(item.fishTypeId) ?? []).reduce((sum, batch) => sum + n(batch.remaining_kg), 0) + 1e-6 < item.qtyKg) throw new Error(`Tracked batches for ${fish.name} do not match available stock; reconcile inventory before selling`);
			total += n(fish.price_per_kg) * item.qtyKg;
		}
		const saleId = (await tx`
        insert into sales (receipt_no, customer_id, total, payment_method, payment_status)
        values (${receipt}, ${data.customerId}, ${total}, ${data.method}, ${status})
        returning id`)[0].id;
		for (const item of data.items) {
			const fish = fishById.get(item.fishTypeId);
			if (!fish) throw new Error("Unknown fish");
			let remaining = item.qtyKg;
			for (const batch of batchesByFish.get(item.fishTypeId) ?? []) {
				if (remaining <= 1e-6) break;
				const take = Math.min(n(batch.remaining_kg), remaining);
				if (!(await tx`
            update batches set remaining_kg = remaining_kg - ${take}
            where id = ${batch.id} and remaining_kg >= ${take}
            returning id`)[0]) throw new Error("Stock changed while this sale was being recorded; retry the sale");
				await tx`
            insert into sale_items (sale_id, fish_type_id, batch_id, qty_kg, unit_price)
            values (${saleId}, ${item.fishTypeId}, ${batch.id}, ${take}, ${n(fish.price_per_kg)})`;
				remaining -= take;
			}
			if (remaining > 1e-6) throw new Error(`Not enough tracked ${fish.name} stock to complete the sale`);
			const updatedFish = await tx`
          update fish_types set quantity_kg = quantity_kg - ${item.qtyKg}
          where id = ${item.fishTypeId} and quantity_kg >= ${item.qtyKg}
          returning quantity_kg`;
			if (!updatedFish[0]) throw new Error(`Not enough ${fish.name} on the ice`);
			if (n(updatedFish[0].quantity_kg) <= n(fish.reorder_kg)) await tx`
            insert into notifications (channel, kind, recipient_code, message, status)
            values (
              'sms', 'low-stock', 'Owner desk',
              ${`${fish.name} is under reorder (${n(updatedFish[0].quantity_kg).toFixed(1)} kg left).`},
              'sent'
            )`;
		}
		const masked = data.method === "mpesa" ? "2547•••221" : null;
		await tx`
        insert into payments (sale_id, method, amount, status, msisdn_masked)
        values (${saleId}, ${data.method}, ${total}, ${status}, ${masked})`;
		await tx`
        insert into notifications (channel, kind, recipient_code, message, status)
        values (
          'sms', 'sale', ${(await tx`
        select code from customers where id = ${data.customerId}`)[0].code},
          ${`Receipt ${receipt} logged — ${data.method === "mpesa" ? "awaiting payment verification" : "cash received"}.`},
          'sent'
        )`;
		return {
			saleId,
			receiptNo: receipt,
			total,
			status,
			method: data.method
		};
	});
});
var confirmMpesa_createServerFn_handler = createServerRpc({
	id: "9f02d334170cad31c0092a497630dfc9978b93b6fff9ea4283ff7e7ecd7b7790",
	name: "confirmMpesa",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => confirmMpesa.__executeServer(opts));
var confirmMpesa = createServerFn({ method: "POST" }).validator((input) => {
	const saleId = Number(input?.saleId);
	if (!saleId) throw new Error("Missing sale");
	return { saleId };
}).middleware([staffOnly(["owner", "accounts"])]).handler(confirmMpesa_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const rec = mpesaReceipt();
	return sql.transaction(async (tx) => {
		const sale = (await tx`
        select receipt_no, payment_method, payment_status
        from sales where id = ${data.saleId} for update`)[0];
		if (!sale) throw new Error("Sale not found");
		if (sale.payment_method !== "mpesa") throw new Error("Only an M-Pesa sale can be reconciled here");
		if (sale.payment_status === "paid") throw new Error("This M-Pesa sale is already marked paid");
		if ((await tx`
        update payments
        set status = 'paid', mpesa_receipt = ${rec}
        where sale_id = ${data.saleId} and method = 'mpesa' and status <> 'paid'
        returning id`).length === 0) throw new Error("No pending M-Pesa payment was found for this sale");
		await tx`
        update sales
        set payment_status = 'paid', mpesa_receipt = ${rec}
        where id = ${data.saleId} and payment_status <> 'paid'`;
		await tx`
        insert into notifications (channel, kind, recipient_code, message, status)
        values (
          'in-app', 'payment', 'Accounts desk',
          ${`Demo M-Pesa confirmation ${rec} recorded for ${sale.receipt_no}.`},
          'logged'
        )`;
		return {
			mpesaReceipt: rec,
			receiptNo: sale.receipt_no
		};
	});
});
var addCustomer_createServerFn_handler = createServerRpc({
	id: "d26e736e03a03cfa6a0169c5d5e7601b1933b6f2f6d19ee5e1ba213e442077e7",
	name: "addCustomer",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => addCustomer.__executeServer(opts));
var addCustomer = createServerFn({ method: "POST" }).validator((input) => {
	const d = input;
	const code = String(d.code ?? "").trim();
	const kind = String(d.kind ?? "walkin").trim() || "walkin";
	if (code.length < 3) throw new Error("Use a counter name of at least 3 letters");
	return {
		code,
		kind
	};
}).middleware([staffOnly()]).handler(addCustomer_createServerFn_handler, async ({ data }) => {
	await (await getSql())`insert into customers (code, kind) values (${data.code}, ${data.kind})`;
	return { ok: true };
});
var addSupplier_createServerFn_handler = createServerRpc({
	id: "613e8ceaa06311e19d9f18ece7272017032a127ea18f451ef70b46d4604b28bb",
	name: "addSupplier",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => addSupplier.__executeServer(opts));
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
}).middleware([staffOnly(["owner", "manager"])]).handler(addSupplier_createServerFn_handler, async ({ data }) => {
	await (await getSql())`
      insert into suppliers (code, landing_site, boat_or_coop, supplier_kind, phone, reliability)
      values (${data.code}, ${data.landingSite}, ${data.boatOrCoop},
              ${data.supplierKind}, ${data.phone}, 80)`;
	return { ok: true };
});
var sendAlert_createServerFn_handler = createServerRpc({
	id: "58c0847d22c5194cfdce4aacc0a89afb315083e2cab293172f28ba8898536055",
	name: "sendAlert",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => sendAlert.__executeServer(opts));
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
}).middleware([staffOnly(["owner", "manager"])]).handler(sendAlert_createServerFn_handler, async ({ data }) => {
	await (await getSql())`insert into notifications (channel, kind, recipient_code, message, status)
              values (${data.channel}, ${data.kind}, ${data.recipientCode}, ${data.message}, 'sent')`;
	return { ok: true };
});
var tickSensors_createServerFn_handler = createServerRpc({
	id: "6abb8b7caafdc8f5677197e19d2c69617c995d61aa670b0edd3c7c1aa0d09faa",
	name: "tickSensors",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => tickSensors.__executeServer(opts));
var tickSensors = createServerFn({ method: "POST" }).middleware([staffOnly(["owner", "manager"])]).handler(tickSensors_createServerFn_handler, async () => {
	const sql = await getSql();
	const rows = await sql`
    select id, kind, value, code from sensors`;
	for (const s of rows) {
		const jitter = (Math.random() - .45) * (s.kind === "weight" ? 1.6 : .7);
		const next = Math.round((n(s.value) + jitter) * 10) / 10;
		let status = "ok";
		if (s.kind === "temp") {
			if (next >= 6) status = "alert";
			else if (next >= 4) status = "watch";
		}
		await sql`update sensors set value = ${next}, status = ${status}, recorded_at = now() where id = ${s.id}`;
		if (status === "alert") await sql`
        insert into notifications (channel, kind, recipient_code, message, status)
        values ('sms', 'cold-chain', 'House manager',
                ${`${s.code} climbed to ${next}°C — ice the hold.`},
                'sent')`;
	}
	return { ok: true };
});
//#endregion
export { addCustomer_createServerFn_handler, addSupplier_createServerFn_handler, confirmMpesa_createServerFn_handler, getBatchByCode_createServerFn_handler, getOverview_createServerFn_handler, listBatches_createServerFn_handler, listCustomers_createServerFn_handler, listDeliveries_createServerFn_handler, listFish_createServerFn_handler, listNotifications_createServerFn_handler, listPayments_createServerFn_handler, listSales_createServerFn_handler, listSensors_createServerFn_handler, listSuppliers_createServerFn_handler, recordDelivery_createServerFn_handler, recordSale_createServerFn_handler, recordSupplierPayment_createServerFn_handler, sendAlert_createServerFn_handler, tickSensors_createServerFn_handler, weighIn_createServerFn_handler };
