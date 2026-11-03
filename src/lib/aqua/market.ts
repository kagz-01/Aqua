import { createServerFn } from "@tanstack/react-start";
import { getSql } from "@/lib/db";
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
  customerName?: string;
  customerEmail?: string;
  items: OrderItem[];
};

type OrderHeader = Omit<CustomerOrder, "items">;
type OrderItemRow = {
  order_id: number;
  fish_type_id: number;
  fish_name: string;
  qty_kg: number;
  unit_price: number;
};

function number(value: unknown): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function attachItems(headers: OrderHeader[]): Promise<CustomerOrder[]> {
  if (headers.length === 0) return [];
  const sql = await getSql();
  const items = await sql.query<OrderItemRow>(
    `select order_id, fish_type_id, fish_name, qty_kg, unit_price
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
    if (role !== null && role !== "manager" && role !== "floor") {
      throw new Error("Choose manager, floor attendant, or customer access");
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
      select id, code, status, total, note, created_at as "createdAt"
      from customer_orders where user_id = ${context.userId}
      order by created_at desc limit 100`;
    return attachItems(rows.map((row) => ({
      ...row,
      total: number(row.total),
      createdAt: String(row.createdAt),
    })));
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
    const itemsJson = JSON.stringify(data.items);
    const rows = await sql.query<{
      id: number;
      code: string;
      status: string;
      total: number;
      note: string;
      created_at: string;
      item_count: number;
    }>(
      `with requested as materialized (
         select fish_type_id, sum(quantity_kg)::double precision as quantity_kg
         from jsonb_to_recordset($3::jsonb) as item(fish_type_id int, quantity_kg double precision)
         group by fish_type_id
       ),
       available as materialized (
         select f.id, f.name, f.price_per_kg, r.quantity_kg
         from fish_types f join requested r on r.fish_type_id = f.id
         where f.quantity_kg >= r.quantity_kg
       ),
       created as (
         insert into customer_orders (code, user_id, status, total, note)
         select $1, $2, 'placed',
                sum(a.quantity_kg * a.price_per_kg), $4
         from available a
         having count(*) = (select count(*) from requested)
         returning id, code, status, total, note, created_at
       ),
       added_items as (
         insert into customer_order_items (order_id, fish_type_id, fish_name, qty_kg, unit_price)
         select c.id, a.id, a.name, a.quantity_kg, a.price_per_kg
         from created c cross join available a
         returning order_id
       )
       select c.*, (select count(*)::int from added_items) as item_count
       from created c`,
      [code, context.userId, itemsJson, data.note],
    );
    const order = rows[0];
    if (!order) {
      throw new Error("Some fish no longer has enough stock. Refresh the shop and try again.");
    }
    return {
      id: order.id,
      code: order.code,
      status: order.status,
      total: number(order.total),
      note: order.note,
      createdAt: String(order.created_at),
    } satisfies OrderHeader;
  });

export const listAllCustomerOrders = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const { requireStaff } = await import("./access.server");
    await requireStaff(context.userId, ["owner", "manager"]);
    const sql = await getSql();
    const rows = await sql<OrderHeader & { customer_name: string; customer_email: string }>`
      select o.id, o.code, o.status, o.total, o.note,
             o.created_at as "createdAt", u.name as customer_name, u.email as customer_email
      from customer_orders o join "user" u on u.id = o.user_id
      order by o.created_at desc limit 100`;
    const orders = await attachItems(rows.map((row) => ({
      id: row.id,
      code: row.code,
      status: row.status,
      total: number(row.total),
      note: row.note,
      createdAt: String(row.createdAt),
    })));
    const byId = new Map(rows.map((row) => [row.id, row]));
    return orders.map((order) => ({
      ...order,
      customerName: byId.get(order.id)?.customer_name ?? "",
      customerEmail: byId.get(order.id)?.customer_email ?? "",
    }));
  });

export const updateCustomerOrderStatus = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const d = input as { orderId?: unknown; status?: unknown };
    const orderId = Number(d?.orderId);
    const status = String(d?.status ?? "");
    if (!Number.isInteger(orderId) || orderId < 1) throw new Error("Choose an order");
    if (!["confirmed", "preparing", "ready", "completed", "cancelled"].includes(status)) {
      throw new Error("Choose a valid order status");
    }
    return { orderId, status };
  })
  .middleware([authMiddleware])
  .handler(async ({ context, data }) => {
    const { requireStaff } = await import("./access.server");
    await requireStaff(context.userId, ["owner", "manager"]);
    const transitions: Record<string, string[]> = {
      placed: ["confirmed", "cancelled"],
      confirmed: ["preparing", "cancelled"],
      preparing: ["ready", "cancelled"],
      ready: ["completed", "cancelled"],
    };
    const sql = await getSql();
    const current = await sql<{ status: string }>`
      select status from customer_orders where id = ${data.orderId} limit 1`;
    if (!current[0]) throw new Error("Order not found");
    if (!transitions[current[0].status]?.includes(data.status)) {
      throw new Error(`An order cannot move from ${current[0].status} to ${data.status}`);
    }
    await sql`
      update customer_orders set status = ${data.status}, updated_at = now()
      where id = ${data.orderId} and status = ${current[0].status}`;
    return { ok: true };
  });
