import { createServerFn } from "@tanstack/react-start";
import { getSql, type Sql } from "@/lib/db";
import { authMiddleware } from "@/lib/auth/middleware";

export type MarketFish = {
  id: number;
  name: string;
  localName: string;
  category: string;
  pricePerKg: number;
  quantityKg: number;
  imageKey: string;
  inSeason: boolean;
};

export type OrderItem = {
  fishTypeId: number;
  fishName: string;
  quantityKg: number;
  unitPrice: number;
};

export type CustomerOrder = {
  id: number;
  code: string;
  status: string;
  total: number;
  note: string;
  createdAt: string;
  receiptNo: string | null;
  paymentStatus: string | null;
  customerName?: string;
  customerEmail?: string;
  items: OrderItem[];
};

type OrderHeader = Omit<CustomerOrder, "items">;
type OrderItemRow = {
  id: number;
  order_id: number;
  fish_type_id: number;
  fish_name: string;
  qty_kg: number;
  unit_price: number;
};

type ReservableOrderItem = {
  id: number;
  fishTypeId: number;
  quantityKg: number;
};

const LOCAL_DEMO_MODE = import.meta.env.DEV && import.meta.env.VITE_AUTH_ENABLED === "false";

function number(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function ensureCustomer(sql: Sql, userId: string): Promise<number> {
  if (LOCAL_DEMO_MODE && userId === "dev-user") {
    await sql`
      insert into "user" ("id", "name", "email", "emailVerified")
      values (${userId}, 'Dev User', 'dev@example.com', false)
      on conflict ("id") do nothing`;
  }
  const rows = await sql<{ id: number }>`
    insert into customers (code, kind, user_id)
    values (${"WEB-" + userId}, 'retail', ${userId})
    on conflict (user_id) do update set user_id = excluded.user_id
    returning id`;
  if (!rows[0]) throw new Error("Could not link this account to a customer record");
  return rows[0].id;
}

async function reserveOrderItems(sql: Sql, items: ReservableOrderItem[]): Promise<void> {
  if (items.length === 0) throw new Error("This order has no fish lines to reserve");

  const quantityByFish = new Map<number, number>();
  for (const item of items) {
    quantityByFish.set(
      item.fishTypeId,
      (quantityByFish.get(item.fishTypeId) ?? 0) + item.quantityKg,
    );
  }
  const fishIds = [...quantityByFish.keys()].sort((a, b) => a - b);
  const fishRows = await sql.query<{
    id: number;
    name: string;
    quantity_kg: number;
    reorder_kg: number;
  }>(
    `select id, name, quantity_kg, reorder_kg
     from fish_types where id = any($1::int[]) order by id for update`,
    [fishIds],
  );
  if (fishRows.length !== fishIds.length) throw new Error("One or more fish types no longer exist");
  const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
  const batches = await sql.query<{
    id: number;
    fish_type_id: number;
    remaining_kg: number;
  }>(
    `select id, fish_type_id, remaining_kg from batches
     where fish_type_id = any($1::int[]) and remaining_kg > 0
     order by fish_type_id, delivered_at, id for update`,
    [fishIds],
  );
  const batchesByFish = new Map<number, typeof batches>();
  for (const batch of batches) {
    const list = batchesByFish.get(batch.fish_type_id) ?? [];
    list.push(batch);
    batchesByFish.set(batch.fish_type_id, list);
  }

  for (const [fishTypeId, quantityKg] of quantityByFish) {
    const fish = fishById.get(fishTypeId);
    if (!fish) throw new Error("A selected fish type could not be loaded");
    if (number(fish.quantity_kg) < quantityKg) {
      throw new Error(`Not enough ${fish.name} is available for this order`);
    }
    const trackedKg = (batchesByFish.get(fishTypeId) ?? []).reduce(
      (total, batch) => total + number(batch.remaining_kg),
      0,
    );
    if (trackedKg + 0.000001 < quantityKg) {
      throw new Error(
        `Tracked batches for ${fish.name} do not match available stock; reconcile inventory before ordering`,
      );
    }
  }

  for (const item of items) {
    let remainingKg = item.quantityKg;
    for (const batch of batchesByFish.get(item.fishTypeId) ?? []) {
      if (remainingKg <= 0.000001) break;
      const availableKg = number(batch.remaining_kg);
      const reservedKg = Math.min(availableKg, remainingKg);
      if (reservedKg <= 0) continue;
      const updated = await sql<{ id: number }>`
        update batches set remaining_kg = remaining_kg - ${reservedKg}
        where id = ${batch.id} and remaining_kg >= ${reservedKg}
        returning id`;
      if (!updated[0]) {
        throw new Error("Stock changed while this order was being placed; refresh and try again");
      }
      await sql`
        insert into customer_order_allocations (order_item_id, batch_id, quantity_kg)
        values (${item.id}, ${batch.id}, ${reservedKg})`;
      batch.remaining_kg = availableKg - reservedKg;
      remainingKg -= reservedKg;
    }
    if (remainingKg > 0.000001) {
      throw new Error("Not enough tracked batch stock is available for this order");
    }
  }

  for (const [fishTypeId, quantityKg] of quantityByFish) {
    const fish = fishById.get(fishTypeId);
    if (!fish) throw new Error("A selected fish type could not be loaded");
    const updated = await sql<{ quantity_kg: number }>`
      update fish_types set quantity_kg = quantity_kg - ${quantityKg}
      where id = ${fishTypeId} and quantity_kg >= ${quantityKg}
      returning quantity_kg`;
    if (!updated[0]) {
      throw new Error("Stock changed while this order was being placed; refresh and try again");
    }
    if (number(updated[0].quantity_kg) <= number(fish.reorder_kg)) {
      await sql`
        insert into notifications (channel, kind, recipient_code, message, status)
        values (
          'in-app', 'low-stock', 'House manager',
          ${`${fish.name} is at or below reorder level (${number(updated[0].quantity_kg).toFixed(1)} kg left).`},
          'logged'
        )`;
    }
  }
}

async function attachItems(headers: OrderHeader[]): Promise<CustomerOrder[]> {
  if (headers.length === 0) return [];
  const sql = await getSql();
  const items = await sql.query<OrderItemRow>(
    `select id, order_id, fish_type_id, fish_name, qty_kg, unit_price
     from customer_order_items where order_id = any($1::int[]) order by id`,
    [headers.map((order) => order.id)],
  );
  const byOrder = new Map<number, OrderItem[]>();
  for (const item of items) {
    const list = byOrder.get(item.order_id) ?? [];
    list.push({
      fishTypeId: item.fish_type_id,
      fishName: item.fish_name,
      quantityKg: number(item.qty_kg),
      unitPrice: number(item.unit_price),
    });
    byOrder.set(item.order_id, list);
  }
  return headers.map((order) => ({ ...order, items: byOrder.get(order.id) ?? [] }));
}

export const getMyAquaRole = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { getAquaRole } = await import("./access.server");
    return getAquaRole(context.userId);
  });

export const claimOwnerAccess = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const setupCode = String((input as { setupCode?: string })?.setupCode ?? "");
    if (!setupCode || setupCode.length > 200) throw new Error("Enter the owner setup code");
    return { setupCode };
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const { getAquaRole } = await import("./access.server");
    const expected = process.env.AQUA_OWNER_SETUP_CODE?.trim();
    if (!expected) throw new Error("Owner setup is not configured for this app");
    const { timingSafeEqual } = await import("node:crypto");
    const suppliedBytes = Buffer.from(data.setupCode);
    const expectedBytes = Buffer.from(expected);
    if (
      suppliedBytes.length !== expectedBytes.length ||
      !timingSafeEqual(suppliedBytes, expectedBytes)
    ) {
      throw new Error("That setup code is not valid");
    }

    const sql = await getSql();
    const currentRole = await getAquaRole(context.userId);
    if (currentRole) throw new Error("This account already has staff access");
    const owners = await sql<{ count: number }>`
      select count(*)::int as count from aqua_staff_roles where role = 'owner'`;
    if (number(owners[0]?.count) > 0) {
      throw new Error("Owner setup has already been completed");
    }
    await sql`
      insert into aqua_staff_roles (user_id, role) values (${context.userId}, 'owner')`;
    return { role: "owner" as const };
  });

export const listTeamUsers = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { requireStaff } = await import("./access.server");
    await requireStaff(context.userId, ["owner"]);
    const sql = await getSql();
    return sql<{
      id: string;
      name: string;
      email: string;
      role: string | null;
    }>`
      select u.id, u.name, u.email, r.role
      from "user" u left join aqua_staff_roles r on r.user_id = u.id
      order by u."createdAt" desc limit 200`;
  });

export const setStaffRole = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { userId?: string; role?: string | null };
    const userId = String(d?.userId ?? "").trim();
    const role = d?.role ?? null;
    if (!userId || userId.length > 200) throw new Error("Choose an account");
    if (role !== null && role !== "manager" && role !== "floor" && role !== "accounts") {
      throw new Error(
        "Choose house manager, floor attendant, accounts officer, or customer access",
      );
    }
    return { userId, role };
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const { requireStaff } = await import("./access.server");
    await requireStaff(context.userId, ["owner"]);
    if (data.userId === context.userId) {
      throw new Error("You cannot change your own owner access");
    }
    const sql = await getSql();
    const users = await sql<{ id: string }>`
      select id from "user" where id = ${data.userId} limit 1`;
    if (!users[0]) throw new Error("Account not found");
    if (data.role === null) {
      await sql`
        delete from aqua_staff_roles
        where user_id = ${data.userId} and role <> 'owner'`;
    } else {
      await sql`
        insert into aqua_staff_roles (user_id, role)
        values (${data.userId}, ${data.role})
        on conflict (user_id) do update set role = excluded.role
        where aqua_staff_roles.role <> 'owner'`;
    }
    return { ok: true };
  });

export const listMyOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const rows = await sql<OrderHeader>`
      select o.id, o.code, o.status, o.total, o.note,
             o.created_at as "createdAt", s.receipt_no as "receiptNo",
             s.payment_status as "paymentStatus"
      from customer_orders o
      left join sales s on s.id = o.sale_id
      where o.user_id = ${context.userId}
      order by o.created_at desc limit 100`;
    return attachItems(
      rows.map((row) => ({
        ...row,
        total: number(row.total),
        createdAt: String(row.createdAt),
        receiptNo: row.receiptNo ?? null,
        paymentStatus: row.paymentStatus ?? null,
      })),
    );
  });

export const placeCustomerOrder = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { items?: unknown; note?: unknown };
    if (!Array.isArray(d?.items) || d.items.length === 0 || d.items.length > 30) {
      throw new Error("Add at least one fish to your cart");
    }
    const quantities = new Map<number, number>();
    for (const raw of d.items) {
      const item = raw as { fishTypeId?: unknown; quantityKg?: unknown };
      const fishTypeId = Number(item?.fishTypeId);
      const quantityKg = Number(item?.quantityKg);
      if (!Number.isInteger(fishTypeId) || fishTypeId < 1) {
        throw new Error("A cart item is invalid");
      }
      if (!Number.isFinite(quantityKg) || quantityKg <= 0 || quantityKg > 1000) {
        throw new Error("Each quantity must be between 0 and 1,000 kg");
      }
      quantities.set(fishTypeId, (quantities.get(fishTypeId) ?? 0) + quantityKg);
    }
    const note = String(d.note ?? "").trim();
    if (note.length > 300) throw new Error("Order notes must be 300 characters or fewer");
    return {
      items: [...quantities].map(([fishTypeId, quantityKg]) => ({ fishTypeId, quantityKg })),
      note,
    };
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const { randomUUID } = await import("node:crypto");
    const code = `AQO-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    return sql.transaction(async (tx) => {
      const customerId = await ensureCustomer(tx, context.userId);
      const fishIds = data.items.map((item) => item.fishTypeId).sort((a, b) => a - b);
      const fishRows = await tx.query<{
        id: number;
        name: string;
        price_per_kg: number;
      }>(
        `select id, name, price_per_kg
         from fish_types where id = any($1::int[]) order by id for update`,
        [fishIds],
      );
      if (fishRows.length !== new Set(fishIds).size) {
        throw new Error("One or more selected fish types are no longer available");
      }
      const fishById = new Map(fishRows.map((fish) => [fish.id, fish]));
      let total = 0;
      const orderItems: ReservableOrderItem[] = [];
      const created = await tx<{ id: number; created_at: string }>`
        insert into customer_orders (code, user_id, customer_id, status, total, note)
        values (${code}, ${context.userId}, ${customerId}, 'placed', 0, ${data.note})
        returning id, created_at`;

      for (const item of data.items) {
        const fish = fishById.get(item.fishTypeId);
        if (!fish) throw new Error("A selected fish type could not be loaded");
        total += number(fish.price_per_kg) * item.quantityKg;
        const createdItem = await tx<{ id: number }>`
          insert into customer_order_items (order_id, fish_type_id, fish_name, qty_kg, unit_price)
          values (
            ${created[0].id}, ${item.fishTypeId}, ${fish.name},
            ${item.quantityKg}, ${number(fish.price_per_kg)}
          )
          returning id`;
        orderItems.push({
          id: createdItem[0].id,
          fishTypeId: item.fishTypeId,
          quantityKg: item.quantityKg,
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
        paymentStatus: null,
      } satisfies OrderHeader;
    });
  });

export const listAllCustomerOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { requireStaff } = await import("./access.server");
    const role = await requireStaff(context.userId, ["owner", "manager", "floor"]);
    const sql = await getSql();
    const rows = await sql<{
      id: number;
      code: string;
      status: string;
      total: number;
      note: string;
      created_at: string;
      receipt_no: string | null;
      payment_status: string | null;
      customer_name: string | null;
      customer_email: string | null;
    }>`
      select o.id, o.code, o.status, o.total, o.note,
             o.created_at, s.receipt_no, s.payment_status,
             u.name as customer_name, u.email as customer_email
      from customer_orders o join "user" u on u.id = o.user_id
      left join sales s on s.id = o.sale_id
      where (${role !== "floor"} or o.status in ('ready', 'completed'))
      order by o.created_at desc limit 100`;
    const orders = await attachItems(
      rows.map((row) => ({
        id: row.id,
        code: row.code,
        status: row.status,
        total: number(row.total),
        note: row.note,
        createdAt: String(row.created_at),
        receiptNo: row.receipt_no,
        paymentStatus: row.payment_status,
      })),
    );
    const byId = new Map(rows.map((row) => [row.id, row]));
    return orders.map((order) => ({
      ...order,
      customerName: byId.get(order.id)?.customer_name ?? "Customer",
      customerEmail: byId.get(order.id)?.customer_email ?? "",
    }));
  });

export const updateCustomerOrderStatus = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { orderId?: unknown; status?: unknown; paymentMethod?: unknown };
    const orderId = Number(d?.orderId);
    const status = String(d?.status ?? "");
    if (!Number.isInteger(orderId) || orderId < 1) throw new Error("Choose an order");
    if (!["confirmed", "preparing", "ready", "completed", "cancelled"].includes(status)) {
      throw new Error("Choose a valid order status");
    }
    const paymentMethod = d.paymentMethod == null ? null : String(d.paymentMethod);
    if (paymentMethod !== null && paymentMethod !== "cash" && paymentMethod !== "mpesa") {
      throw new Error("Choose cash or M-Pesa for the pickup");
    }
    if (status === "completed" && paymentMethod === null) {
      throw new Error("Choose how the customer paid at pickup");
    }
    return { orderId, status, paymentMethod };
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const { requireStaff } = await import("./access.server");
    const role = await requireStaff(context.userId, ["owner", "manager", "floor"]);
    const sql = await getSql();
    return sql.transaction(async (tx) => {
      const current = await tx<{
        status: string;
        total: number;
        customer_id: number | null;
      }>`
        select status, total, customer_id
        from customer_orders where id = ${data.orderId} for update`;
      const order = current[0];
      if (!order) throw new Error("Order not found");

      const transitions: Record<string, string[]> = {
        placed: ["confirmed"],
        confirmed: ["preparing"],
        preparing: ["ready"],
        ready: role === "owner" ? ["completed"] : [],
      };
      const canCancel =
        role !== "floor" &&
        data.status === "cancelled" &&
        order.status !== "completed" &&
        order.status !== "cancelled";
      const canCompletePickup =
        data.status === "completed" &&
        order.status === "ready" &&
        (role === "owner" || role === "floor");
      if (!canCancel && !canCompletePickup && !transitions[order.status]?.includes(data.status)) {
        throw new Error(`Your role cannot move this order from ${order.status} to ${data.status}`);
      }

      if (data.status === "cancelled") {
        const orderItems = await tx<{
          id: number;
          fish_type_id: number;
          qty_kg: number;
        }>`
          select id, fish_type_id, qty_kg
          from customer_order_items where order_id = ${data.orderId}`;
        const allocations = await tx<{
          order_item_id: number;
          fish_type_id: number;
          batch_id: number;
          quantity_kg: number;
        }>`
          select a.order_item_id, i.fish_type_id, a.batch_id, a.quantity_kg
          from customer_order_allocations a
          join customer_order_items i on i.id = a.order_item_id
          where i.order_id = ${data.orderId}
          order by a.batch_id`;
        const allocatedByItem = new Map<number, number>();
        for (const allocation of allocations) {
          allocatedByItem.set(
            allocation.order_item_id,
            (allocatedByItem.get(allocation.order_item_id) ?? 0) + number(allocation.quantity_kg),
          );
        }
        if (
          allocations.length > 0 &&
          orderItems.some(
            (item) =>
              Math.abs((allocatedByItem.get(item.id) ?? 0) - number(item.qty_kg)) > 0.000001,
          )
        ) {
          throw new Error(
            "This order's stock reservation is incomplete; reconcile inventory before cancelling",
          );
        }

        const releaseByBatch = new Map<number, number>();
        const releaseByFish = new Map<number, number>();
        for (const allocation of allocations) {
          const quantityKg = number(allocation.quantity_kg);
          releaseByBatch.set(
            allocation.batch_id,
            (releaseByBatch.get(allocation.batch_id) ?? 0) + quantityKg,
          );
          releaseByFish.set(
            allocation.fish_type_id,
            (releaseByFish.get(allocation.fish_type_id) ?? 0) + quantityKg,
          );
        }
        for (const [batchId, quantityKg] of releaseByBatch) {
          const batch = await tx<{ id: number }>`
            update batches
            set remaining_kg = remaining_kg + ${quantityKg}
            where id = ${batchId}
              and remaining_kg + ${quantityKg} <= quantity_kg + 0.000001
            returning id`;
          if (!batch[0])
            throw new Error("Reserved batch stock could not be restored; reconcile inventory");
        }
        for (const [fishTypeId, quantityKg] of releaseByFish) {
          const fish = await tx<{ id: number }>`
            update fish_types set quantity_kg = quantity_kg + ${quantityKg}
            where id = ${fishTypeId} returning id`;
          if (!fish[0])
            throw new Error("Reserved fish stock could not be restored; reconcile inventory");
        }
      }

      let receiptNo: string | null = null;
      let paymentStatus: string | null = null;
      let saleId: number | null = null;
      if (data.status === "completed") {
        if (!order.customer_id) {
          throw new Error("This order has no linked customer record and cannot be completed");
        }
        const orderItems = await tx<{
          id: number;
          fish_type_id: number;
          qty_kg: number;
          unit_price: number;
        }>`
          select id, fish_type_id, qty_kg, unit_price
          from customer_order_items where order_id = ${data.orderId}`;
        const allocations = await tx<{
          order_item_id: number;
          batch_id: number;
          quantity_kg: number;
        }>`
          select a.order_item_id, a.batch_id, a.quantity_kg
          from customer_order_allocations a
          join customer_order_items i on i.id = a.order_item_id
          where i.order_id = ${data.orderId}
          order by a.batch_id`;
        if (orderItems.length === 0) throw new Error("This order has no items to sell");
        const allocatedByItem = new Map<number, number>();
        for (const allocation of allocations) {
          allocatedByItem.set(
            allocation.order_item_id,
            (allocatedByItem.get(allocation.order_item_id) ?? 0) + number(allocation.quantity_kg),
          );
        }
        if (
          allocations.length === 0 ||
          orderItems.some(
            (item) =>
              Math.abs((allocatedByItem.get(item.id) ?? 0) - number(item.qty_kg)) > 0.000001,
          )
        ) {
          throw new Error(
            "This order's batch reservation is incomplete; reconcile inventory before pickup",
          );
        }

        const { randomUUID } = await import("node:crypto");
        receiptNo = `R-${randomUUID().replaceAll("-", "").slice(0, 10).toUpperCase()}`;
        paymentStatus = data.paymentMethod === "cash" ? "paid" : "pending";
        const createdSale = await tx<{ id: number }>`
          insert into sales (
            receipt_no, customer_id, total, payment_method, payment_status
          )
          values (
            ${receiptNo}, ${order.customer_id}, ${number(order.total)},
            ${data.paymentMethod}, ${paymentStatus}
          )
          returning id`;
        saleId = createdSale[0]?.id ?? null;
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

      const updated = await tx<{ id: number }>`
        update customer_orders
        set status = ${data.status}, sale_id = coalesce(${saleId}, sale_id), updated_at = now()
        where id = ${data.orderId} and status = ${order.status}
        returning id`;
      if (!updated[0])
        throw new Error("The order changed while you were updating it; refresh and try again");
      return { ok: true, receiptNo, paymentStatus };
    });
  });
