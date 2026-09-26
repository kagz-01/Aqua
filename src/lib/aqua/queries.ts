import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
import { batchCode, mpesaReceipt, receiptNo } from "@/lib/aqua/format";

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
  reliability: number;
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
  return rows.map(
    (r): FishRow => ({
      id: r.id,
      name: r.name,
      localName: r.local_name,
      category: r.category,
      pricePerKg: n(r.price_per_kg),
      reorderKg: n(r.reorder_kg),
      quantityKg: n(r.quantity_kg),
      imageKey: r.image_key,
      inSeason: Boolean(r.in_season),
    }),
  );
});

export const listBatches = createServerFn({ method: "GET" }).handler(async () => {
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
  return rows.map(
    (r): BatchRow => ({
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
    }),
  );
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

export const listCustomers = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{ id: number; code: string; kind: string; credit_balance: number }>`
    select id, code, kind, credit_balance from customers order by code`;
  return rows.map(
    (r): CustomerRow => ({
      id: r.id,
      code: r.code,
      kind: r.kind,
      creditBalance: n(r.credit_balance),
    }),
  );
});

export const listSuppliers = createServerFn({ method: "GET" }).handler(async () => {
  const sql = await getSql();
  const rows = await sql<{
    id: number;
    code: string;
    landing_site: string;
    boat_or_coop: string;
    reliability: number;
  }>`select id, code, landing_site, boat_or_coop, reliability from suppliers order by landing_site`;
  return rows.map(
    (r): SupplierRow => ({
      id: r.id,
      code: r.code,
      landingSite: r.landing_site,
      boatOrCoop: r.boat_or_coop,
      reliability: n(r.reliability),
    }),
  );
});

export const listSales = createServerFn({ method: "GET" }).handler(async () => {
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
  return rows.map(
    (r): SaleRow => ({
      id: r.id,
      receiptNo: r.receipt_no,
      customerCode: r.customer_code,
      total: n(r.total),
      paymentMethod: r.payment_method,
      paymentStatus: r.payment_status,
      mpesaReceipt: r.mpesa_receipt,
      createdAt: String(r.created_at),
      itemCount: n(r.item_count),
    }),
  );
});

export const listPayments = createServerFn({ method: "GET" }).handler(async () => {
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
  return rows.map(
    (r): PaymentRow => ({
      id: r.id,
      saleId: r.sale_id,
      receiptNo: r.receipt_no,
      method: r.method,
      amount: n(r.amount),
      status: r.status,
      mpesaReceipt: r.mpesa_receipt,
      msisdnMasked: r.msisdn_masked,
      createdAt: String(r.created_at),
    }),
  );
});

export const listNotifications = createServerFn({ method: "GET" }).handler(async () => {
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
  return rows.map(
    (r): NoteRow => ({
      id: r.id,
      channel: r.channel,
      kind: r.kind,
      recipientCode: r.recipient_code,
      message: r.message,
      status: r.status,
      createdAt: String(r.created_at),
    }),
  );
});

export const listSensors = createServerFn({ method: "GET" }).handler(async () => {
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
  return rows.map(
    (r): SensorRow => ({
      id: r.id,
      code: r.code,
      location: r.location,
      kind: r.kind,
      value: n(r.value),
      unit: r.unit,
      status: r.status,
      recordedAt: String(r.recorded_at),
    }),
  );
});

export const getOverview = createServerFn({ method: "GET" }).handler(async () => {
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
    series: series.map(
      (d): DayPoint => ({
        day: String(d.day).slice(0, 10),
        total: n(d.total),
        count: n(d.count),
      }),
    ),
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

export const receiveDelivery = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      fishTypeId?: number;
      supplierId?: number;
      quantityKg?: number;
      tempC?: number;
      landingSite?: string;
    };
    const fishTypeId = Number(d.fishTypeId);
    const supplierId = Number(d.supplierId);
    const quantityKg = Number(d.quantityKg);
    const tempC = Number(d.tempC ?? 2);
    const landingSite = String(d.landingSite ?? "").trim();
    if (!fishTypeId || !supplierId || !landingSite) throw new Error("Choose fish, landing, and supplier");
    if (!(quantityKg > 0)) throw new Error("Quantity must be above 0");
    return { fishTypeId, supplierId, quantityKg, tempC, landingSite };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const code = batchCode(data.landingSite);
    const ageScore = 10;
    const tempScore = data.tempC > 5 ? 25 : data.tempC > 3 ? 12 : 4;
    const spoilage = Math.min(95, ageScore + tempScore);
    await sql`
      insert into batches (code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg, temp_c, spoilage_score)
      values (${code}, ${data.fishTypeId}, ${data.supplierId}, ${data.landingSite}, ${data.quantityKg}, ${data.quantityKg}, ${data.tempC}, ${spoilage})`;
    await sql`update fish_types set quantity_kg = quantity_kg + ${data.quantityKg} where id = ${data.fishTypeId}`;
    const fish = await sql<{ name: string }>`select name from fish_types where id = ${data.fishTypeId}`;
    await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'delivery', 'House manager',
              ${`${data.quantityKg} kg ${fish[0]?.name ?? "fish"} landed at ${data.landingSite}. Batch ${code}.`},
              'sent')`;
    return { code };
  });

export const recordSale = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as {
      customerId?: number;
      method?: string;
      items?: { fishTypeId: number; qtyKg: number }[];
    };
    const customerId = Number(d.customerId);
    const method = d.method === "cash" ? "cash" : "mpesa";
    const items = Array.isArray(d.items)
      ? d.items
          .map((i) => ({ fishTypeId: Number(i.fishTypeId), qtyKg: Number(i.qtyKg) }))
          .filter((i) => i.fishTypeId && i.qtyKg > 0)
      : [];
    if (!customerId) throw new Error("Choose a counter party");
    if (!items.length) throw new Error("Add at least one fish line");
    return { customerId, method, items };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const fishRows = await sql<{ id: number; name: string; price_per_kg: number; quantity_kg: number }>`
      select id, name, price_per_kg, quantity_kg from fish_types`;
    const byId = new Map(fishRows.map((f) => [f.id, f]));
    let total = 0;
    for (const item of data.items) {
      const f = byId.get(item.fishTypeId);
      if (!f) throw new Error("Unknown fish");
      if (n(f.quantity_kg) < item.qtyKg) {
        throw new Error(`Not enough ${f.name} on the ice`);
      }
      total += n(f.price_per_kg) * item.qtyKg;
    }

    const receipt = receiptNo();
    const status = data.method === "mpesa" ? "pending" : "paid";
    const saleIns = await sql<{ id: number }>`
      insert into sales (receipt_no, customer_id, total, payment_method, payment_status)
      values (${receipt}, ${data.customerId}, ${total}, ${data.method}, ${status})
      returning id`;
    const saleId = saleIns[0].id;

    for (const item of data.items) {
      const f = byId.get(item.fishTypeId)!;
      let remaining = item.qtyKg;
      const fifo = await sql<{ id: number; remaining_kg: number }>`
        select id, remaining_kg from batches
        where fish_type_id = ${item.fishTypeId} and remaining_kg > 0
        order by delivered_at asc`;
      let batchId: number | null = fifo[0]?.id ?? null;
      for (const b of fifo) {
        if (remaining <= 0) break;
        const take = Math.min(n(b.remaining_kg), remaining);
        await sql`update batches set remaining_kg = remaining_kg - ${take} where id = ${b.id}`;
        remaining -= take;
        batchId = b.id;
      }
      await sql`
        insert into sale_items (sale_id, fish_type_id, batch_id, qty_kg, unit_price)
        values (${saleId}, ${item.fishTypeId}, ${batchId}, ${item.qtyKg}, ${n(f.price_per_kg)})`;
      await sql`update fish_types set quantity_kg = quantity_kg - ${item.qtyKg} where id = ${item.fishTypeId}`;
      const after = await sql<{ quantity_kg: number; reorder_kg: number; name: string }>`
        select quantity_kg, reorder_kg, name from fish_types where id = ${item.fishTypeId}`;
      if (after[0] && n(after[0].quantity_kg) <= n(after[0].reorder_kg)) {
        await sql`
          insert into notifications (channel, kind, recipient_code, message, status)
          values ('sms', 'low-stock', 'Owner desk',
                  ${`${after[0].name} is under reorder (${n(after[0].quantity_kg).toFixed(1)} kg left).`},
                  'sent')`;
      }
    }

    const masked = data.method === "mpesa" ? "2547•••221" : null;
    await sql`
      insert into payments (sale_id, method, amount, status, msisdn_masked)
      values (${saleId}, ${data.method}, ${total}, ${status}, ${masked})`;

    const party = await sql<{ code: string }>`select code from customers where id = ${data.customerId}`;
    await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'sale', ${party[0]?.code ?? "Walk-in counter"},
              ${`Receipt ${receipt} logged — ${data.method === "mpesa" ? "awaiting STK" : "cash on the till"}.`},
              'sent')`;

    return { saleId, receiptNo: receipt, total, status, method: data.method };
  });

export const confirmMpesa = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const saleId = Number((input as { saleId?: number })?.saleId);
    if (!saleId) throw new Error("Missing sale");
    return { saleId };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const rec = mpesaReceipt();
    await sql`update sales set payment_status = 'paid', mpesa_receipt = ${rec} where id = ${data.saleId}`;
    await sql`update payments set status = 'paid', mpesa_receipt = ${rec} where sale_id = ${data.saleId}`;
    const sale = await sql<{ receipt_no: string; total: number }>`
      select receipt_no, total from sales where id = ${data.saleId}`;
    await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'payment', 'Owner desk',
              ${`M-Pesa ${rec} confirmed for ${sale[0]?.receipt_no ?? "sale"}.`},
              'sent')`;
    return { mpesaReceipt: rec, receiptNo: sale[0]?.receipt_no ?? "" };
  });

export const addCustomer = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { code?: string; kind?: string };
    const code = String(d.code ?? "").trim();
    const kind = String(d.kind ?? "walkin").trim() || "walkin";
    if (code.length < 3) throw new Error("Use a counter name of at least 3 letters");
    return { code, kind };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into customers (code, kind) values (${data.code}, ${data.kind})`;
    return { ok: true };
  });

export const addSupplier = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { code?: string; landingSite?: string; boatOrCoop?: string };
    const code = String(d.code ?? "")
      .trim()
      .toUpperCase();
    const landingSite = String(d.landingSite ?? "").trim();
    const boatOrCoop = String(d.boatOrCoop ?? "").trim() || landingSite;
    if (!code || !landingSite) throw new Error("Landing site and code are required");
    return { code, landingSite, boatOrCoop };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into suppliers (code, landing_site, boat_or_coop, reliability)
              values (${data.code}, ${data.landingSite}, ${data.boatOrCoop}, 80)`;
    return { ok: true };
  });

export const sendAlert = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { channel?: string; kind?: string; recipientCode?: string; message?: string };
    const channel = ["sms", "whatsapp", "ussd"].includes(String(d.channel))
      ? String(d.channel)
      : "sms";
    const kind = String(d.kind ?? "notice").slice(0, 40);
    const recipientCode = String(d.recipientCode ?? "Owner desk").trim() || "Owner desk";
    const message = String(d.message ?? "").trim();
    if (message.length < 4) throw new Error("Write a short alert");
    return { channel, kind, recipientCode, message };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    await sql`insert into notifications (channel, kind, recipient_code, message, status)
              values (${data.channel}, ${data.kind}, ${data.recipientCode}, ${data.message}, 'sent')`;
    return { ok: true };
  });

export const tickSensors = createServerFn({ method: "POST" }).handler(async () => {
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

export const weighIn = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { fishTypeId?: number; supplierId?: number; kg?: number };
    const fishTypeId = Number(d.fishTypeId);
    const supplierId = Number(d.supplierId);
    const kg = Number(d.kg);
    if (!fishTypeId || !supplierId || !(kg > 0)) throw new Error("Scale needs fish, supplier, and a weight");
    return { fishTypeId, supplierId, kg };
  })
  .handler(async ({ data }) => {
    const sql = await getSql();
    const sup = await sql<{ landing_site: string }>`select landing_site from suppliers where id = ${data.supplierId}`;
    const landing = sup[0]?.landing_site ?? "Dunga Beach";
    await sql`update sensors set value = ${data.kg}, recorded_at = now() where code = 'SCALE-1'`;
    const code = batchCode(landing);
    await sql`
      insert into batches (code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg, temp_c, spoilage_score)
      values (${code}, ${data.fishTypeId}, ${data.supplierId}, ${landing}, ${data.kg}, ${data.kg}, 1.8, 8)`;
    await sql`update fish_types set quantity_kg = quantity_kg + ${data.kg} where id = ${data.fishTypeId}`;
    const fish = await sql<{ name: string }>`select name from fish_types where id = ${data.fishTypeId}`;
    await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'weigh-in', 'House manager',
              ${`Scale logged ${data.kg} kg ${fish[0]?.name ?? "fish"} as ${code}.`},
              'sent')`;
    return { code };
  });
