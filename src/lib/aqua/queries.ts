import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { mpesaReceipt } from "@/lib/aqua/format";
import { staffOnly } from "./access";

export type FishRow = {
  id: number;
  name: string;
  localName: string;
  category: string;
  pricePerKg: number;
  reorderKg: number;
  quantityKg: number;
  imageKey: string;
  inSeason: boolean;
};

export type BatchRow = {
  id: number;
  code: string;
  fishTypeId: number;
  fishName: string;
  localName: string;
  supplierCode: string;
  landingSite: string;
  deliveredAt: string;
  quantityKg: number;
  remainingKg: number;
  tempC: number;
  spoilageScore: number;
};

export type CustomerRow = {
  id: number;
  code: string;
  kind: string;
  creditBalance: number;
};

export type SupplierRow = {
  id: number;
  code: string;
  landingSite: string;
  boatOrCoop: string;
  supplierKind: "fisher" | "boat" | "cooperative" | "opening";
  phone: string;
  reliability: number;
};

export type DeliveryItemRow = {
  fishName: string;
  quantityKg: number;
  unitCost: number;
  batchCode: string;
};

export type DeliveryRow = {
  id: number;
  code: string;
  supplierCode: string;
  supplierName: string;
  supplierKind: string;
  landingSite: string;
  receivedAt: string;
  tempC: number;
  note: string;
  totalKg: number;
  totalCost: number;
  amountPaid: number;
  balance: number;
  items: DeliveryItemRow[];
};

export type SaleRow = {
  id: number;
  receiptNo: string;
  customerCode: string;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  mpesaReceipt: string | null;
  createdAt: string;
  itemCount: number;
};

export type PaymentRow = {
  id: number;
  saleId: number;
  receiptNo: string;
  method: string;
  amount: number;
  status: string;
  mpesaReceipt: string | null;
  msisdnMasked: string | null;
  createdAt: string;
};

export type NoteRow = {
  id: number;
  channel: string;
  kind: string;
  recipientCode: string;
  message: string;
  status: string;
  createdAt: string;
};

export type SensorRow = {
  id: number;
  code: string;
  location: string;
  kind: string;
  value: number;
  unit: string;
  status: string;
  recordedAt: string;
};

export type DayPoint = { day: string; total: number; count: number };

function n(v: unknown) {
  const x = typeof v === "string" ? Number(v) : typeof v === "number" ? v : 0;
  return Number.isFinite(x) ? x : 0;
}

export const listFish = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    name: string;
    local_name: string;
    category: string;
    price_per_kg: number;
    reorder_kg: number;
    quantity_kg: number;
    image_key: string;
    in_season: boolean;
  }>`select id, name, local_name, category, price_per_kg, reorder_kg, quantity_kg, image_key, in_season
     from fish_types order by name`;
  return rows.map((r): FishRow => ({
    id: r.id,
    name: r.name,
    localName: r.local_name,
    category: r.category,
    pricePerKg: n(r.price_per_kg),
    reorderKg: n(r.reorder_kg),
    quantityKg: n(r.quantity_kg),
    imageKey: r.image_key,
    inSeason: Boolean(r.in_season),
  }));
});

export const listBatches = createServerFn({ method: "GET" })
  .middleware([staffOnly()])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      code: string;
      fish_type_id: number;
      fish_name: string;
      local_name: string;
      supplier_code: string;
      landing_site: string;
      delivered_at: string;
      quantity_kg: number;
      remaining_kg: number;
      temp_c: number;
      spoilage_score: number;
    }>`select b.id, b.code, b.fish_type_id, f.name as fish_name, f.local_name,
            s.code as supplier_code, b.landing_site, b.delivered_at,
            b.quantity_kg, b.remaining_kg, b.temp_c, b.spoilage_score
     from batches b
     join fish_types f on f.id = b.fish_type_id
     join suppliers s on s.id = b.supplier_id
     order by b.delivered_at desc`;
    return rows.map((r): BatchRow => ({
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
      spoilageScore: n(r.spoilage_score),
    }));
  });

export const getBatchByCode = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const code = String((input as { code?: string })?.code ?? "")
      .trim()
      .toUpperCase();
    if (!code) throw new Error("Enter a batch code");
    return { code };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      code: string;
      fish_type_id: number;
      fish_name: string;
      local_name: string;
      supplier_code: string;
      landing_site: string;
      delivered_at: string;
      quantity_kg: number;
      remaining_kg: number;
      temp_c: number;
      spoilage_score: number;
      boat_or_coop: string;
    }>`select b.id, b.code, b.fish_type_id, f.name as fish_name, f.local_name,
              s.code as supplier_code, s.boat_or_coop, b.landing_site, b.delivered_at,
              b.quantity_kg, b.remaining_kg, b.temp_c, b.spoilage_score
       from batches b
       join fish_types f on f.id = b.fish_type_id
       join suppliers s on s.id = b.supplier_id
       where b.code = ${data.code}
       limit 1`;
    const r = rows[0];
    if (!r) return null;
    const hops = await sql<{
      receipt_no: string;
      customer_code: string;
      qty_kg: number;
      created_at: string;
    }>`
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
        spoilageScore: n(r.spoilage_score),
      } satisfies BatchRow,
      boatOrCoop: r.boat_or_coop,
      hops: hops.map((h) => ({
        receiptNo: h.receipt_no,
        customerCode: h.customer_code,
        qtyKg: n(h.qty_kg),
        createdAt: String(h.created_at),
      })),
    };
  });

export const listCustomers = createServerFn({ method: "GET" })
  .middleware([staffOnly()])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{ id: number; code: string; kind: string; credit_balance: number }>`
    select id, code, kind, credit_balance from customers order by code`;
    return rows.map((r): CustomerRow => ({
      id: r.id,
      code: r.code,
      kind: r.kind,
      creditBalance: n(r.credit_balance),
    }));
  });

export const listSuppliers = createServerFn({ method: "GET" })
  .middleware([staffOnly()])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      code: string;
      landing_site: string;
      boat_or_coop: string;
      supplier_kind: SupplierRow["supplierKind"];
      phone: string;
      reliability: number;
    }>`select id, code, landing_site, boat_or_coop, supplier_kind, phone, reliability
     from suppliers order by landing_site, boat_or_coop`;
    return rows.map((r): SupplierRow => ({
      id: r.id,
      code: r.code,
      landingSite: r.landing_site,
      boatOrCoop: r.boat_or_coop,
      supplierKind: r.supplier_kind,
      phone: r.phone,
      reliability: n(r.reliability),
    }));
  });

export const listDeliveries = createServerFn({ method: "GET" })
  .middleware([staffOnly(["owner", "manager", "accounts"])])
  .handler(async () => {
    const sql = await getSql();
    const headers = await sql<{
      id: number;
      code: string;
      supplier_code: string;
      supplier_name: string;
      supplier_kind: string;
      landing_site: string;
      received_at: string;
      temp_c: number;
      note: string;
      total_kg: number;
      total_cost: number;
      amount_paid: number;
    }>`
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

    const items = await sql.query<{
      delivery_id: number;
      fish_name: string;
      quantity_kg: number;
      unit_cost: number;
      batch_code: string;
    }>(
      `select i.delivery_id, f.name as fish_name, i.quantity_kg, i.unit_cost, b.code as batch_code
       from fish_delivery_items i
       join fish_types f on f.id = i.fish_type_id
       join batches b on b.id = i.batch_id
       where i.delivery_id = any($1::int[])
       order by i.delivery_id, i.id`,
      [headers.map((delivery) => delivery.id)],
    );
    const itemsByDelivery = new Map<number, DeliveryItemRow[]>();
    for (const item of items) {
      const list = itemsByDelivery.get(item.delivery_id) ?? [];
      list.push({
        fishName: item.fish_name,
        quantityKg: n(item.quantity_kg),
        unitCost: n(item.unit_cost),
        batchCode: item.batch_code,
      });
      itemsByDelivery.set(item.delivery_id, list);
    }

    return headers.map((delivery): DeliveryRow => {
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
        items: itemsByDelivery.get(delivery.id) ?? [],
      };
    });
  });

export const listSales = createServerFn({ method: "GET" })
  .middleware([staffOnly()])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      receipt_no: string;
      customer_code: string;
      total: number;
      payment_method: string;
      payment_status: string;
      mpesa_receipt: string | null;
      created_at: string;
      item_count: number;
    }>`select s.id, s.receipt_no, c.code as customer_code, s.total, s.payment_method,
            s.payment_status, s.mpesa_receipt, s.created_at, count(si.id)::int as item_count
     from sales s
     join customers c on c.id = s.customer_id
     left join sale_items si on si.sale_id = s.id
     group by s.id, c.code
     order by s.created_at desc
     limit 80`;
    return rows.map((r): SaleRow => ({
      id: r.id,
      receiptNo: r.receipt_no,
      customerCode: r.customer_code,
      total: n(r.total),
      paymentMethod: r.payment_method,
      paymentStatus: r.payment_status,
      mpesaReceipt: r.mpesa_receipt,
      createdAt: String(r.created_at),
      itemCount: n(r.item_count),
    }));
  });

export const listPayments = createServerFn({ method: "GET" })
  .middleware([staffOnly(["owner", "accounts"])])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      sale_id: number;
      receipt_no: string;
      method: string;
      amount: number;
      status: string;
      mpesa_receipt: string | null;
      msisdn_masked: string | null;
      created_at: string;
    }>`select p.id, p.sale_id, s.receipt_no, p.method, p.amount, p.status,
            p.mpesa_receipt, p.msisdn_masked, p.created_at
     from payments p
     join sales s on s.id = p.sale_id
     order by p.created_at desc
     limit 80`;
    return rows.map((r): PaymentRow => ({
      id: r.id,
      saleId: r.sale_id,
      receiptNo: r.receipt_no,
      method: r.method,
      amount: n(r.amount),
      status: r.status,
      mpesaReceipt: r.mpesa_receipt,
      msisdnMasked: r.msisdn_masked,
      createdAt: String(r.created_at),
    }));
  });

export const listNotifications = createServerFn({ method: "GET" })
  .middleware([staffOnly(["owner", "manager"])])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      channel: string;
      kind: string;
      recipient_code: string;
      message: string;
      status: string;
      created_at: string;
    }>`select id, channel, kind, recipient_code, message, status, created_at
     from notifications order by created_at desc limit 60`;
    return rows.map((r): NoteRow => ({
      id: r.id,
      channel: r.channel,
      kind: r.kind,
      recipientCode: r.recipient_code,
      message: r.message,
      status: r.status,
      createdAt: String(r.created_at),
    }));
  });

export const listSensors = createServerFn({ method: "GET" })
  .middleware([staffOnly()])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      code: string;
      location: string;
      kind: string;
      value: number;
      unit: string;
      status: string;
      recorded_at: string;
    }>`select id, code, location, kind, value, unit, status, recorded_at from sensors order by id`;
    return rows.map((r): SensorRow => ({
      id: r.id,
      code: r.code,
      location: r.location,
      kind: r.kind,
      value: n(r.value),
      unit: r.unit,
      status: r.status,
      recordedAt: String(r.recorded_at),
    }));
  });

export const getOverview = createServerFn({ method: "GET" })
  .middleware([staffOnly(["owner", "manager", "accounts"])])
  .handler(async () => {
    const sql = await getSql();
    const today = await sql<{ total: number; count: number }>`
    select coalesce(sum(total),0)::float as total, count(*)::int as count
    from sales where created_at::date = now()::date`;
    const week = await sql<{ total: number }>`
    select coalesce(sum(total),0)::float as total
    from sales where created_at > now() - interval '7 days'`;
    const pending = await sql<{ total: number; count: number }>`
    select coalesce(sum(total),0)::float as total, count(*)::int as count
    from sales where payment_status = 'pending'`;
    const stockValue = await sql<{ value: number }>`
    select coalesce(sum(quantity_kg * price_per_kg),0)::float as value from fish_types`;
    const mix = await sql<{ method: string; total: number }>`
    select payment_method as method, coalesce(sum(total),0)::float as total
    from sales where created_at > now() - interval '14 days'
    group by payment_method`;
    const series = await sql<{ day: string; total: number; count: number }>`
    select created_at::date as day, coalesce(sum(total),0)::float as total, count(*)::int as count
    from sales
    where created_at > now() - interval '14 days'
    group by created_at::date
    order by day`;
    const top = await sql<{ name: string; local_name: string; qty: number; revenue: number }>`
    select f.name, f.local_name, coalesce(sum(si.qty_kg),0)::float as qty,
           coalesce(sum(si.qty_kg * si.unit_price),0)::float as revenue
    from sale_items si
    join sales s on s.id = si.sale_id
    join fish_types f on f.id = si.fish_type_id
    where s.created_at > now() - interval '14 days'
    group by f.name, f.local_name
    order by revenue desc`;
    const low = await sql<{
      id: number;
      name: string;
      local_name: string;
      quantity_kg: number;
      reorder_kg: number;
      image_key: string;
    }>`
    select id, name, local_name, quantity_kg, reorder_kg, image_key
    from fish_types where quantity_kg <= reorder_kg order by quantity_kg asc`;
    const forecast = await sql<{
      fish_type_id: number;
      name: string;
      quantity_kg: number;
      daily: number;
    }>`select f.id as fish_type_id, f.name, f.quantity_kg,
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
      mix: mix.map((m) => ({ method: m.method, total: n(m.total) })),
      series: series.map((d): DayPoint => ({
        day: String(d.day).slice(0, 10),
        total: n(d.total),
        count: n(d.count),
      })),
      top: top.map((t) => ({
        name: t.name,
        localName: t.local_name,
        qty: n(t.qty),
        revenue: n(t.revenue),
      })),
      low: low.map((f) => ({
        id: f.id,
        name: f.name,
        localName: f.local_name,
        quantityKg: n(f.quantity_kg),
        reorderKg: n(f.reorder_kg),
        imageKey: f.image_key,
      })),
      forecast: forecast.map((f) => {
        const daily = n(f.daily);
        const daysLeft = daily > 0.05 ? n(f.quantity_kg) / daily : 99;
        return {
          fishTypeId: f.fish_type_id,
          name: f.name,
          quantityKg: n(f.quantity_kg),
          daily,
          daysLeft,
          threeDayNeed: daily * 3,
        };
      }),
    };
  });

export const recordDelivery = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      supplierId?: unknown;
      landingSite?: unknown;
      tempC?: unknown;
      note?: unknown;
      items?: unknown;
    };
    const supplierId = Number(d?.supplierId);
    const landingSite = String(d?.landingSite ?? "").trim();
    const tempC = Number(d?.tempC);
    const note = String(d?.note ?? "").trim();
    if (!Number.isInteger(supplierId) || supplierId < 1 || !landingSite) {
      throw new Error("Choose a supplier and enter the landing site");
    }
    if (!Number.isFinite(tempC) || tempC < -5 || tempC > 20) {
      throw new Error("Enter a receiving temperature between -5°C and 20°C");
    }
    if (note.length > 500) throw new Error("Delivery notes must be 500 characters or fewer");
    if (!Array.isArray(d?.items) || d.items.length === 0 || d.items.length > 30) {
      throw new Error("Add at least one fish species to the delivery");
    }
    const seen = new Set<number>();
    const items = d.items.map((raw) => {
      const item = raw as { fishTypeId?: unknown; quantityKg?: unknown; unitCost?: unknown };
      const fishTypeId = Number(item?.fishTypeId);
      const quantityKg = Number(item?.quantityKg);
      const unitCost = Number(item?.unitCost);
      if (!Number.isInteger(fishTypeId) || fishTypeId < 1 || seen.has(fishTypeId)) {
        throw new Error("Each fish species must appear once in the delivery");
      }
      if (!Number.isFinite(quantityKg) || quantityKg <= 0 || quantityKg > 10000) {
        throw new Error("Each delivery weight must be between 0 and 10,000 kg");
      }
      if (!Number.isFinite(unitCost) || unitCost < 0 || unitCost > 1000000) {
        throw new Error("Enter a valid purchase price per kg");
      }
      seen.add(fishTypeId);
      return { fishTypeId, quantityKg, unitCost };
    });
    return { supplierId, landingSite, tempC, note, items };
  })
  .middleware([staffOnly(["owner", "manager"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    const { randomUUID } = await import("node:crypto");
    const code = `LD-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    const batchCodes = data.items.map(
      () => `AQ-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`,
    );
    const tempScore = data.tempC > 5 ? 25 : data.tempC > 3 ? 12 : 4;
    const spoilage = Math.min(95, 10 + tempScore);

    return sql.transaction(async (tx) => {
      const fishRows = await tx.query<{ id: number; name: string }>(
        `select id, name from fish_types
         where id = any($1::int[]) order by id for update`,
        [data.items.map((item) => item.fishTypeId).sort((a, b) => a - b)],
      );
      if (fishRows.length !== data.items.length) {
        throw new Error("One or more selected fish species no longer exist");
      }
      const supplier = await tx<{ id: number }>`
        select id from suppliers where id = ${data.supplierId} and supplier_kind <> 'opening'`;
      if (!supplier[0]) throw new Error("The selected fisher or supplier was not found");
      const delivery = await tx<{ id: number }>`
        insert into fish_deliveries (code, supplier_id, landing_site, temp_c, note)
        values (${code}, ${data.supplierId}, ${data.landingSite}, ${data.tempC}, ${data.note})
        returning id`;
      const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
      let totalKg = 0;
      let totalCost = 0;

      for (const [index, item] of data.items.entries()) {
        const fish = fishById.get(item.fishTypeId);
        if (!fish) throw new Error("A selected fish species could not be loaded");
        const batch = await tx<{ id: number }>`
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
      return { code, totalKg, totalCost };
    });
  });

export const weighIn = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      fishTypeId?: unknown;
      supplierId?: unknown;
      kg?: unknown;
      landingSite?: unknown;
      tempC?: unknown;
      note?: unknown;
    };
    const fishTypeId = Number(d?.fishTypeId);
    const supplierId = Number(d?.supplierId);
    const kg = Number(d?.kg);
    const landingSite = String(d?.landingSite ?? "").trim();
    const tempC = Number(d?.tempC ?? 2);
    const note = String(d?.note ?? "Scale intake").trim();
    if (!Number.isInteger(fishTypeId) || fishTypeId < 1) throw new Error("Choose a fish species");
    if (!Number.isInteger(supplierId) || supplierId < 1) throw new Error("Choose a supplier");
    if (!Number.isFinite(kg) || kg <= 0 || kg > 10000)
      throw new Error("Enter a valid weight between 0 and 10,000 kg");
    if (!landingSite) throw new Error("Landing site is required");
    if (!Number.isFinite(tempC) || tempC < -5 || tempC > 20)
      throw new Error("Enter a receiving temperature between -5°C and 20°C");
    if (note.length > 500) throw new Error("Notes must be 500 characters or fewer");
    return { fishTypeId, supplierId, kg, landingSite, tempC, note };
  })
  .middleware([staffOnly(["owner", "manager"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    const supplier = await sql<{ landing_site: string }>`
      select landing_site from suppliers where id = ${data.supplierId} and supplier_kind <> 'opening' limit 1`;
    if (!supplier[0]) throw new Error("The selected fisher or supplier was not found");
    const landingSite = data.landingSite || supplier[0].landing_site;
    const { randomUUID } = await import("node:crypto");
    const code = `LD-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    const batchCode = `AQ-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    const tempScore = data.tempC > 5 ? 25 : data.tempC > 3 ? 12 : 4;
    const spoilage = Math.min(95, 10 + tempScore);

    return sql.transaction(async (tx) => {
      const fishRow = await tx<{ id: number; quantity_kg: number; name: string }>`
        select id, name, quantity_kg from fish_types where id = ${data.fishTypeId} for update`;
      if (!fishRow[0]) throw new Error("The selected fish species could not be loaded");

      const delivery = await tx<{ id: number }>`
        insert into fish_deliveries (code, supplier_id, landing_site, temp_c, note)
        values (${code}, ${data.supplierId}, ${landingSite}, ${data.tempC}, ${data.note})
        returning id`;

      const batch = await tx<{ id: number }>`
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

      const totalCost = 0;
      return { code, totalKg: data.kg, totalCost };
    });
  });

export const recordSupplierPayment = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      deliveryId?: unknown;
      amount?: unknown;
      method?: unknown;
      reference?: unknown;
    };
    const deliveryId = Number(d?.deliveryId);
    const amount = Number(d?.amount);
    const method = String(d?.method ?? "");
    const reference = String(d?.reference ?? "").trim();
    if (!Number.isInteger(deliveryId) || deliveryId < 1) throw new Error("Choose a delivery");
    if (!Number.isFinite(amount) || amount <= 0)
      throw new Error("Payment must be greater than zero");
    if (!["cash", "mpesa", "bank"].includes(method)) throw new Error("Choose a payment method");
    if (reference.length > 100) throw new Error("Payment reference is too long");
    return { deliveryId, amount, method, reference };
  })
  .middleware([staffOnly(["owner", "accounts"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    return sql.transaction(async (tx) => {
      const delivery = await tx<{ id: number }>`
        select id from fish_deliveries where id = ${data.deliveryId} for update`;
      if (!delivery[0]) throw new Error("Delivery not found");
      const totals = await tx<{ total: number; paid: number }>`
        select coalesce((select sum(quantity_kg * unit_cost)
                         from fish_delivery_items where delivery_id = ${data.deliveryId}), 0)::float as total,
               coalesce((select sum(amount)
                         from supplier_payments where delivery_id = ${data.deliveryId}), 0)::float as paid`;
      const balance = n(totals[0]?.total) - n(totals[0]?.paid);
      if (data.amount > balance + 0.000001) {
        throw new Error(
          `Payment exceeds the outstanding balance of KES ${Math.max(0, balance).toFixed(2)}`,
        );
      }
      await tx`
        insert into supplier_payments (delivery_id, amount, method, reference)
        values (${data.deliveryId}, ${data.amount}, ${data.method}, ${data.reference})`;
      return { balance: Math.max(0, balance - data.amount) };
    });
  });

export const recordSale = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      customerId?: unknown;
      method?: unknown;
      items?: unknown;
    };
    const customerId = Number(d.customerId);
    const method = String(d.method ?? "");
    if (!Number.isInteger(customerId) || customerId < 1) throw new Error("Choose a counter party");
    if (method !== "cash" && method !== "mpesa") throw new Error("Choose a payment method");
    if (!Array.isArray(d.items) || d.items.length === 0 || d.items.length > 30) {
      throw new Error("Add at least one fish line");
    }
    const quantities = new Map<number, number>();
    for (const raw of d.items) {
      const item = raw as { fishTypeId?: unknown; qtyKg?: unknown };
      const fishTypeId = Number(item?.fishTypeId);
      const qtyKg = Number(item?.qtyKg);
      if (!Number.isInteger(fishTypeId) || fishTypeId < 1)
        throw new Error("A fish line is invalid");
      if (!Number.isFinite(qtyKg) || qtyKg <= 0 || qtyKg > 1000) {
        throw new Error("Each sale quantity must be between 0 and 1,000 kg");
      }
      quantities.set(fishTypeId, (quantities.get(fishTypeId) ?? 0) + qtyKg);
    }
    const items = [...quantities].map(([fishTypeId, qtyKg]) => ({ fishTypeId, qtyKg }));
    return { customerId, method, items };
  })
  .middleware([staffOnly(["owner", "floor"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    const { randomUUID } = await import("node:crypto");
    const now = new Date();
    const date = `${String(now.getFullYear()).slice(-2)}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
    const receipt = `R-${date}-${randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase()}`;
    const status = data.method === "mpesa" ? "pending" : "paid";

    return sql.transaction(async (tx) => {
      const fishRows = await tx.query<{
        id: number;
        name: string;
        price_per_kg: number;
        quantity_kg: number;
        reorder_kg: number;
      }>(
        `select id, name, price_per_kg, quantity_kg, reorder_kg
         from fish_types where id = any($1::int[]) order by id for update`,
        [data.items.map((item) => item.fishTypeId).sort((a, b) => a - b)],
      );
      if (fishRows.length !== data.items.length)
        throw new Error("One or more fish types were not found");
      const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
      const customer = await tx<{ id: number }>`
        select id from customers where id = ${data.customerId}`;
      if (!customer[0]) throw new Error("Customer counter not found");

      const batches = await tx.query<{
        id: number;
        fish_type_id: number;
        remaining_kg: number;
      }>(
        `select id, fish_type_id, remaining_kg from batches
         where fish_type_id = any($1::int[]) and remaining_kg > 0
         order by fish_type_id, delivered_at, id for update`,
        [data.items.map((item) => item.fishTypeId).sort((a, b) => a - b)],
      );
      const batchesByFish = new Map<number, typeof batches>();
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
        const batchStock = (batchesByFish.get(item.fishTypeId) ?? []).reduce(
          (sum, batch) => sum + n(batch.remaining_kg),
          0,
        );
        if (batchStock + 0.000001 < item.qtyKg) {
          throw new Error(
            `Tracked batches for ${fish.name} do not match available stock; reconcile inventory before selling`,
          );
        }
        total += n(fish.price_per_kg) * item.qtyKg;
      }

      const sale = await tx<{ id: number }>`
        insert into sales (receipt_no, customer_id, total, payment_method, payment_status)
        values (${receipt}, ${data.customerId}, ${total}, ${data.method}, ${status})
        returning id`;
      const saleId = sale[0].id;

      for (const item of data.items) {
        const fish = fishById.get(item.fishTypeId);
        if (!fish) throw new Error("Unknown fish");
        let remaining = item.qtyKg;
        for (const batch of batchesByFish.get(item.fishTypeId) ?? []) {
          if (remaining <= 0.000001) break;
          const take = Math.min(n(batch.remaining_kg), remaining);
          const updated = await tx<{ id: number }>`
            update batches set remaining_kg = remaining_kg - ${take}
            where id = ${batch.id} and remaining_kg >= ${take}
            returning id`;
          if (!updated[0])
            throw new Error("Stock changed while this sale was being recorded; retry the sale");
          await tx`
            insert into sale_items (sale_id, fish_type_id, batch_id, qty_kg, unit_price)
            values (${saleId}, ${item.fishTypeId}, ${batch.id}, ${take}, ${n(fish.price_per_kg)})`;
          remaining -= take;
        }
        if (remaining > 0.000001)
          throw new Error(`Not enough tracked ${fish.name} stock to complete the sale`);
        const updatedFish = await tx<{ quantity_kg: number }>`
          update fish_types set quantity_kg = quantity_kg - ${item.qtyKg}
          where id = ${item.fishTypeId} and quantity_kg >= ${item.qtyKg}
          returning quantity_kg`;
        if (!updatedFish[0]) throw new Error(`Not enough ${fish.name} on the ice`);
        if (n(updatedFish[0].quantity_kg) <= n(fish.reorder_kg)) {
          await tx`
            insert into notifications (channel, kind, recipient_code, message, status)
            values (
              'sms', 'low-stock', 'Owner desk',
              ${`${fish.name} is under reorder (${n(updatedFish[0].quantity_kg).toFixed(1)} kg left).`},
              'sent'
            )`;
        }
      }

      const masked = data.method === "mpesa" ? "2547•••221" : null;
      await tx`
        insert into payments (sale_id, method, amount, status, msisdn_masked)
        values (${saleId}, ${data.method}, ${total}, ${status}, ${masked})`;
      const party = await tx<{ code: string }>`
        select code from customers where id = ${data.customerId}`;
      await tx`
        insert into notifications (channel, kind, recipient_code, message, status)
        values (
          'sms', 'sale', ${party[0].code},
          ${`Receipt ${receipt} logged — ${data.method === "mpesa" ? "awaiting payment verification" : "cash received"}.`},
          'sent'
        )`;
      return { saleId, receiptNo: receipt, total, status, method: data.method };
    });
  });

export const confirmMpesa = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const saleId = Number((input as { saleId?: number })?.saleId);
    if (!saleId) throw new Error("Missing sale");
    return { saleId };
  })
  .middleware([staffOnly(["owner", "accounts"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rec = mpesaReceipt();
    return sql.transaction(async (tx) => {
      const sales = await tx<{
        receipt_no: string;
        payment_method: string;
        payment_status: string;
      }>`
        select receipt_no, payment_method, payment_status
        from sales where id = ${data.saleId} for update`;
      const sale = sales[0];
      if (!sale) throw new Error("Sale not found");
      if (sale.payment_method !== "mpesa") {
        throw new Error("Only an M-Pesa sale can be reconciled here");
      }
      if (sale.payment_status === "paid") {
        throw new Error("This M-Pesa sale is already marked paid");
      }
      const payment = await tx<{ id: number }>`
        update payments
        set status = 'paid', mpesa_receipt = ${rec}
        where sale_id = ${data.saleId} and method = 'mpesa' and status <> 'paid'
        returning id`;
      if (payment.length === 0)
        throw new Error("No pending M-Pesa payment was found for this sale");
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
      return { mpesaReceipt: rec, receiptNo: sale.receipt_no };
    });
  });

export const addCustomer = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { code?: string; kind?: string };
    const code = String(d.code ?? "").trim();
    const kind = String(d.kind ?? "walkin").trim() || "walkin";
    if (code.length < 3) throw new Error("Use a counter name of at least 3 letters");
    return { code, kind };
  })
  .middleware([staffOnly()])
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into customers (code, kind) values (${data.code}, ${data.kind})`;
    return { ok: true };
  });

export const addSupplier = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      code?: unknown;
      landingSite?: unknown;
      boatOrCoop?: unknown;
      supplierKind?: unknown;
      phone?: unknown;
    };
    const code = String(d.code ?? "")
      .trim()
      .toUpperCase();
    const landingSite = String(d.landingSite ?? "").trim();
    const boatOrCoop = String(d.boatOrCoop ?? "").trim();
    const supplierKind = String(d.supplierKind ?? "");
    const phone = String(d.phone ?? "").trim();
    if (code.length < 2 || code.length > 40 || !landingSite || !boatOrCoop) {
      throw new Error("Enter a supplier code, name, and usual landing site");
    }
    if (!["fisher", "boat", "cooperative"].includes(supplierKind)) {
      throw new Error("Choose an individual fisher, boat, or cooperative");
    }
    if (phone.length > 40) throw new Error("Phone number is too long");
    return { code, landingSite, boatOrCoop, supplierKind, phone };
  })
  .middleware([staffOnly(["owner", "manager"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`
      insert into suppliers (code, landing_site, boat_or_coop, supplier_kind, phone, reliability)
      values (${data.code}, ${data.landingSite}, ${data.boatOrCoop},
              ${data.supplierKind}, ${data.phone}, 80)`;
    return { ok: true };
  });

export const sendAlert = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      channel?: string;
      kind?: string;
      recipientCode?: string;
      message?: string;
    };
    const channel = ["sms", "whatsapp", "email"].includes(String(d.channel))
      ? String(d.channel)
      : "sms";
    const kind = String(d.kind ?? "notice").slice(0, 40);
    const recipientCode = String(d.recipientCode ?? "Owner desk").trim() || "Owner desk";
    const message = String(d.message ?? "").trim();
    if (message.length < 4) throw new Error("Write a short alert");
    return { channel, kind, recipientCode, message };
  })
  .middleware([staffOnly(["owner", "manager"])])
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into notifications (channel, kind, recipient_code, message, status)
              values (${data.channel}, ${data.kind}, ${data.recipientCode}, ${data.message}, 'sent')`;
    return { ok: true };
  });

export const tickSensors = createServerFn({ method: "POST" })
  .middleware([staffOnly(["owner", "manager"])])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql<{ id: number; kind: string; value: number; code: string }>`
    select id, kind, value, code from sensors`;
    for (const s of rows) {
      const jitter = (Math.random() - 0.45) * (s.kind === "weight" ? 1.6 : 0.7);
      const next = Math.round((n(s.value) + jitter) * 10) / 10;
      let status = "ok";
      if (s.kind === "temp") {
        if (next >= 6) status = "alert";
        else if (next >= 4) status = "watch";
      }
      await sql`update sensors set value = ${next}, status = ${status}, recorded_at = now() where id = ${s.id}`;
      if (status === "alert") {
        await sql`
        insert into notifications (channel, kind, recipient_code, message, status)
        values ('sms', 'cold-chain', 'House manager',
                ${`${s.code} climbed to ${next}°C — ice the hold.`},
                'sent')`;
      }
    }
    return { ok: true };
  });
