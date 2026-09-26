import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as mpesaReceipt, s as receiptNo, t as batchCode } from "./format-Dxwqcto1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/queries-C_rHQqH1.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var _0002_aqua_default = "create table if not exists fish_types (\n  id serial primary key,\n  name text not null,\n  local_name text not null,\n  category text not null,\n  unit text not null default 'kg',\n  price_per_kg double precision not null,\n  reorder_kg double precision not null,\n  quantity_kg double precision not null default 0,\n  image_key text not null,\n  in_season boolean not null default true\n);\n\ncreate table if not exists suppliers (\n  id serial primary key,\n  code text not null unique,\n  landing_site text not null,\n  boat_or_coop text not null,\n  reliability int not null default 80\n);\n\ncreate table if not exists customers (\n  id serial primary key,\n  code text not null unique,\n  kind text not null,\n  credit_balance double precision not null default 0\n);\n\ncreate table if not exists batches (\n  id serial primary key,\n  code text not null unique,\n  fish_type_id int not null references fish_types(id),\n  supplier_id int not null references suppliers(id),\n  landing_site text not null,\n  delivered_at timestamptz not null default now(),\n  quantity_kg double precision not null,\n  remaining_kg double precision not null,\n  temp_c double precision not null,\n  spoilage_score int not null default 8\n);\n\ncreate table if not exists sales (\n  id serial primary key,\n  receipt_no text not null unique,\n  customer_id int not null references customers(id),\n  total double precision not null,\n  payment_method text not null,\n  payment_status text not null,\n  mpesa_receipt text,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists sale_items (\n  id serial primary key,\n  sale_id int not null references sales(id) on delete cascade,\n  fish_type_id int not null references fish_types(id),\n  batch_id int references batches(id),\n  qty_kg double precision not null,\n  unit_price double precision not null\n);\n\ncreate table if not exists payments (\n  id serial primary key,\n  sale_id int not null references sales(id) on delete cascade,\n  method text not null,\n  amount double precision not null,\n  status text not null,\n  mpesa_receipt text,\n  msisdn_masked text,\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists notifications (\n  id serial primary key,\n  channel text not null,\n  kind text not null,\n  recipient_code text not null,\n  message text not null,\n  status text not null default 'sent',\n  created_at timestamptz not null default now()\n);\n\ncreate table if not exists sensors (\n  id serial primary key,\n  code text not null unique,\n  location text not null,\n  kind text not null,\n  value double precision not null,\n  unit text not null,\n  status text not null,\n  recorded_at timestamptz not null default now()\n);\n\ninsert into fish_types (id, name, local_name, category, price_per_kg, reorder_kg, quantity_kg, image_key, in_season)\nvalues\n  (1, 'Nile Tilapia', 'Ngege', 'Fresh whole', 450, 25, 82, 'tilapia', true),\n  (2, 'Nile Perch', 'Mbuta', 'Fresh whole', 380, 20, 54, 'nile-perch', true),\n  (3, 'Omena / Dagaa', 'Omena', 'Dried silver', 280, 30, 18, 'omena', true),\n  (4, 'African Catfish', 'Kamongo', 'Fresh whole', 320, 15, 41, 'catfish', true),\n  (5, 'Fulu', 'Fulu', 'Small cichlid', 200, 20, 12, 'market-ice', true),\n  (6, 'Marbled lungfish', 'Kamongo mamba', 'Fresh whole', 360, 8, 9, 'nile-perch', false)\non conflict do nothing;\n\ninsert into suppliers (id, code, landing_site, boat_or_coop, reliability)\nvalues\n  (1, 'DUNGA-12', 'Dunga Beach', 'Boat 12 cooperative', 92),\n  (2, 'MBITA-PT', 'Mbita Point', 'Mbita landing ring', 88),\n  (3, 'UHANYA-04', 'Uhanya Beach', 'Uhanya dawn boats', 84),\n  (4, 'HOMA-PIER', 'Homa Bay pier', 'Homa Bay pier desk', 90),\n  (5, 'SIO-PORT', 'Sio Port', 'Sio Port weigh-in', 79)\non conflict do nothing;\n\ninsert into customers (id, code, kind, credit_balance)\nvalues\n  (1, 'Dunga Beach Hotel', 'hotel', 0),\n  (2, 'Kisumu Central Market', 'market', 2400),\n  (3, 'Homa Bay Co-op Stall', 'stall', 0),\n  (4, 'Mbita Lakeside Inn', 'hotel', 800),\n  (5, 'Walk-in counter', 'walkin', 0),\n  (6, 'Portside Grill', 'hotel', 0),\n  (7, 'Lakeside Fresh Mart', 'retail', 1500)\non conflict do nothing;\n\ninsert into batches (id, code, fish_type_id, supplier_id, landing_site, delivered_at, quantity_kg, remaining_kg, temp_c, spoilage_score)\nvalues\n  (1, 'AQ-DUNGA-8841', 1, 1, 'Dunga Beach', now() - interval '6 hours', 40, 28, 1.4, 12),\n  (2, 'AQ-MBITA-2204', 2, 2, 'Mbita Point', now() - interval '1 day', 36, 18, 2.1, 28),\n  (3, 'AQ-HOMA-1109', 3, 4, 'Homa Bay pier', now() - interval '2 days', 50, 18, 4.8, 46),\n  (4, 'AQ-UHANYA-4412', 4, 3, 'Uhanya Beach', now() - interval '8 hours', 22, 16, 1.8, 16),\n  (5, 'AQ-SIO-0091', 5, 5, 'Sio Port', now() - interval '3 days', 24, 12, 6.2, 72),\n  (6, 'AQ-DUNGA-3310', 1, 1, 'Dunga Beach', now() - interval '5 days', 30, 4, 3.2, 58)\non conflict do nothing;\n\ninsert into sales (id, receipt_no, customer_id, total, payment_method, payment_status, mpesa_receipt, created_at)\nvalues\n  (1, 'R-240913-11', 1, 9000, 'mpesa', 'paid', 'QK7M2X91', now() - interval '13 days'),\n  (2, 'R-240914-04', 5, 2280, 'cash', 'paid', null, now() - interval '12 days'),\n  (3, 'R-240915-22', 2, 5600, 'mpesa', 'paid', 'QK9PLA32', now() - interval '11 days'),\n  (4, 'R-240916-08', 6, 3800, 'mpesa', 'paid', 'QK4HTW18', now() - interval '10 days'),\n  (5, 'R-240917-19', 3, 1400, 'cash', 'paid', null, now() - interval '9 days'),\n  (6, 'R-240918-02', 1, 7200, 'mpesa', 'paid', 'QK2NCD44', now() - interval '8 days'),\n  (7, 'R-240919-15', 7, 4500, 'mpesa', 'paid', 'QK8RQE70', now() - interval '7 days'),\n  (8, 'R-240920-06', 4, 3200, 'cash', 'paid', null, now() - interval '6 days'),\n  (9, 'R-240921-31', 2, 8400, 'mpesa', 'paid', 'QK1BKM55', now() - interval '5 days'),\n  (10, 'R-240922-09', 5, 1900, 'cash', 'paid', null, now() - interval '4 days'),\n  (11, 'R-240923-17', 6, 6100, 'mpesa', 'paid', 'QK6VSL22', now() - interval '3 days'),\n  (12, 'R-240924-03', 1, 5400, 'mpesa', 'paid', 'QK3YUD81', now() - interval '2 days'),\n  (13, 'R-240925-28', 7, 2800, 'mpesa', 'pending', null, now() - interval '1 day'),\n  (14, 'R-240926-12', 5, 1350, 'cash', 'paid', null, now() - interval '4 hours'),\n  (15, 'R-240926-18', 3, 4200, 'mpesa', 'paid', 'QK5WPA09', now() - interval '90 minutes')\non conflict do nothing;\n\ninsert into sale_items (sale_id, fish_type_id, batch_id, qty_kg, unit_price)\nvalues\n  (1, 1, 1, 20, 450),\n  (2, 2, 2, 6, 380),\n  (3, 3, 3, 20, 280),\n  (4, 2, 2, 10, 380),\n  (5, 5, 5, 7, 200),\n  (6, 1, 1, 16, 450),\n  (7, 1, 6, 10, 450),\n  (8, 4, 4, 10, 320),\n  (9, 2, 2, 12, 380),\n  (9, 3, 3, 14, 280),\n  (10, 5, 5, 9.5, 200),\n  (11, 1, 1, 8, 450),\n  (11, 4, 4, 8, 320),\n  (12, 1, 1, 12, 450),\n  (13, 3, 3, 10, 280),\n  (14, 1, 1, 3, 450),\n  (15, 2, 2, 6, 380),\n  (15, 4, 4, 6, 320)\non conflict do nothing;\n\ninsert into payments (sale_id, method, amount, status, mpesa_receipt, msisdn_masked, created_at)\nselect id, payment_method, total, payment_status, mpesa_receipt,\n  case when payment_method = 'mpesa' then '2547•••221' else null end,\n  created_at\nfrom sales\non conflict do nothing;\n\ninsert into notifications (channel, kind, recipient_code, message, status, created_at)\nvalues\n  ('sms', 'low-stock', 'Owner desk', 'Omena / Dagaa is under reorder (18 kg left).', 'sent', now() - interval '3 hours'),\n  ('sms', 'sale', 'Dunga Beach Hotel', 'Receipt R-240926-18 confirmed. M-Pesa QK5WPA09.', 'sent', now() - interval '90 minutes'),\n  ('whatsapp', 'daily', 'Owner desk', 'Yesterday till: KES 8,200 across 4 sales. 1 pending M-Pesa.', 'sent', now() - interval '8 hours'),\n  ('sms', 'cold-chain', 'House manager', 'Display counter at 6.2°C — ice hold Sio batch AQ-SIO-0091.', 'sent', now() - interval '2 hours'),\n  ('ussd', 'order', 'Walk-in counter', 'USSD *384*88# order 3 kg Ngege queued at the till.', 'sent', now() - interval '40 minutes')\non conflict do nothing;\n\ninsert into sensors (id, code, location, kind, value, unit, status, recorded_at)\nvalues\n  (1, 'ICE-A', 'Ice hold A', 'temp', -1.2, 'C', 'ok', now() - interval '4 minutes'),\n  (2, 'DISP-1', 'Display counter', 'temp', 4.8, 'C', 'watch', now() - interval '4 minutes'),\n  (3, 'VAN-1', 'Delivery cooler', 'temp', 2.1, 'C', 'ok', now() - interval '9 minutes'),\n  (4, 'SCALE-1', 'Digital weigh-in', 'weight', 12.4, 'kg', 'ok', now() - interval '16 minutes'),\n  (5, 'SIO-HOLD', 'Sio Port crate', 'temp', 6.2, 'C', 'alert', now() - interval '6 minutes')\non conflict do nothing;\n\nselect setval('fish_types_id_seq', (select max(id) from fish_types));\nselect setval('suppliers_id_seq', (select max(id) from suppliers));\nselect setval('customers_id_seq', (select max(id) from customers));\nselect setval('batches_id_seq', (select max(id) from batches));\nselect setval('sales_id_seq', (select max(id) from sales));\nselect setval('sensors_id_seq', (select max(id) from sensors));\n";
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({ "/migrations/0002_aqua.sql": _0002_aqua_default });
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
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
var listBatches = createServerFn({ method: "GET" }).handler(listBatches_createServerFn_handler, async () => {
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
var listCustomers = createServerFn({ method: "GET" }).handler(listCustomers_createServerFn_handler, async () => {
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
var listSuppliers = createServerFn({ method: "GET" }).handler(listSuppliers_createServerFn_handler, async () => {
	return (await (await getSql())`select id, code, landing_site, boat_or_coop, reliability from suppliers order by landing_site`).map((r) => ({
		id: r.id,
		code: r.code,
		landingSite: r.landing_site,
		boatOrCoop: r.boat_or_coop,
		reliability: n(r.reliability)
	}));
});
var listSales_createServerFn_handler = createServerRpc({
	id: "14aab18e3b934e891a808fb63315a7845d6108cc422ef9b0094dbb3d5aedd15f",
	name: "listSales",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => listSales.__executeServer(opts));
var listSales = createServerFn({ method: "GET" }).handler(listSales_createServerFn_handler, async () => {
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
var listPayments = createServerFn({ method: "GET" }).handler(listPayments_createServerFn_handler, async () => {
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
var listNotifications = createServerFn({ method: "GET" }).handler(listNotifications_createServerFn_handler, async () => {
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
var listSensors = createServerFn({ method: "GET" }).handler(listSensors_createServerFn_handler, async () => {
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
var getOverview = createServerFn({ method: "GET" }).handler(getOverview_createServerFn_handler, async () => {
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
var receiveDelivery_createServerFn_handler = createServerRpc({
	id: "3ec47c4ddad9eb1ef62141f7bd2254f321320b0bbcaa271ba670fa965d24afdb",
	name: "receiveDelivery",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => receiveDelivery.__executeServer(opts));
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
}).handler(receiveDelivery_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const code = batchCode(data.landingSite);
	const ageScore = 10;
	const tempScore = data.tempC > 5 ? 25 : data.tempC > 3 ? 12 : 4;
	const spoilage = Math.min(95, ageScore + tempScore);
	await sql`
      insert into batches (code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg, temp_c, spoilage_score)
      values (${code}, ${data.fishTypeId}, ${data.supplierId}, ${data.landingSite}, ${data.quantityKg}, ${data.quantityKg}, ${data.tempC}, ${spoilage})`;
	await sql`update fish_types set quantity_kg = quantity_kg + ${data.quantityKg} where id = ${data.fishTypeId}`;
	const fish = await sql`select name from fish_types where id = ${data.fishTypeId}`;
	await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'delivery', 'House manager',
              ${`${data.quantityKg} kg ${fish[0]?.name ?? "fish"} landed at ${data.landingSite}. Batch ${code}.`},
              'sent')`;
	return { code };
});
var recordSale_createServerFn_handler = createServerRpc({
	id: "9f81c332a1d56f9e94c30b3447399f3a5bff0c0b4d4e62110510bbc6c5e1d7cf",
	name: "recordSale",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => recordSale.__executeServer(opts));
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
}).handler(recordSale_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const fishRows = await sql`
      select id, name, price_per_kg, quantity_kg from fish_types`;
	const byId = new Map(fishRows.map((f) => [f.id, f]));
	let total = 0;
	for (const item of data.items) {
		const f = byId.get(item.fishTypeId);
		if (!f) throw new Error("Unknown fish");
		if (n(f.quantity_kg) < item.qtyKg) throw new Error(`Not enough ${f.name} on the ice`);
		total += n(f.price_per_kg) * item.qtyKg;
	}
	const receipt = receiptNo();
	const status = data.method === "mpesa" ? "pending" : "paid";
	const saleId = (await sql`
      insert into sales (receipt_no, customer_id, total, payment_method, payment_status)
      values (${receipt}, ${data.customerId}, ${total}, ${data.method}, ${status})
      returning id`)[0].id;
	for (const item of data.items) {
		const f = byId.get(item.fishTypeId);
		let remaining = item.qtyKg;
		const fifo = await sql`
        select id, remaining_kg from batches
        where fish_type_id = ${item.fishTypeId} and remaining_kg > 0
        order by delivered_at asc`;
		let batchId = fifo[0]?.id ?? null;
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
		const after = await sql`
        select quantity_kg, reorder_kg, name from fish_types where id = ${item.fishTypeId}`;
		if (after[0] && n(after[0].quantity_kg) <= n(after[0].reorder_kg)) await sql`
          insert into notifications (channel, kind, recipient_code, message, status)
          values ('sms', 'low-stock', 'Owner desk',
                  ${`${after[0].name} is under reorder (${n(after[0].quantity_kg).toFixed(1)} kg left).`},
                  'sent')`;
	}
	const masked = data.method === "mpesa" ? "2547•••221" : null;
	await sql`
      insert into payments (sale_id, method, amount, status, msisdn_masked)
      values (${saleId}, ${data.method}, ${total}, ${status}, ${masked})`;
	await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'sale', ${(await sql`select code from customers where id = ${data.customerId}`)[0]?.code ?? "Walk-in counter"},
              ${`Receipt ${receipt} logged — ${data.method === "mpesa" ? "awaiting STK" : "cash on the till"}.`},
              'sent')`;
	return {
		saleId,
		receiptNo: receipt,
		total,
		status,
		method: data.method
	};
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
}).handler(confirmMpesa_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const rec = mpesaReceipt();
	await sql`update sales set payment_status = 'paid', mpesa_receipt = ${rec} where id = ${data.saleId}`;
	await sql`update payments set status = 'paid', mpesa_receipt = ${rec} where sale_id = ${data.saleId}`;
	const sale = await sql`
      select receipt_no, total from sales where id = ${data.saleId}`;
	await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'payment', 'Owner desk',
              ${`M-Pesa ${rec} confirmed for ${sale[0]?.receipt_no ?? "sale"}.`},
              'sent')`;
	return {
		mpesaReceipt: rec,
		receiptNo: sale[0]?.receipt_no ?? ""
	};
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
}).handler(addCustomer_createServerFn_handler, async ({ data }) => {
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
	const boatOrCoop = String(d.boatOrCoop ?? "").trim() || landingSite;
	if (!code || !landingSite) throw new Error("Landing site and code are required");
	return {
		code,
		landingSite,
		boatOrCoop
	};
}).handler(addSupplier_createServerFn_handler, async ({ data }) => {
	await (await getSql())`insert into suppliers (code, landing_site, boat_or_coop, reliability)
              values (${data.code}, ${data.landingSite}, ${data.boatOrCoop}, 80)`;
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
}).handler(sendAlert_createServerFn_handler, async ({ data }) => {
	await (await getSql())`insert into notifications (channel, kind, recipient_code, message, status)
              values (${data.channel}, ${data.kind}, ${data.recipientCode}, ${data.message}, 'sent')`;
	return { ok: true };
});
var tickSensors_createServerFn_handler = createServerRpc({
	id: "6abb8b7caafdc8f5677197e19d2c69617c995d61aa670b0edd3c7c1aa0d09faa",
	name: "tickSensors",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => tickSensors.__executeServer(opts));
var tickSensors = createServerFn({ method: "POST" }).handler(tickSensors_createServerFn_handler, async () => {
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
var weighIn_createServerFn_handler = createServerRpc({
	id: "8bf560ef759d51747981f8d39c58367765e8bd1571f00cbe5959a240b86378e6",
	name: "weighIn",
	filename: "src/lib/aqua/queries.ts"
}, (opts) => weighIn.__executeServer(opts));
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
}).handler(weighIn_createServerFn_handler, async ({ data }) => {
	const sql = await getSql();
	const landing = (await sql`select landing_site from suppliers where id = ${data.supplierId}`)[0]?.landing_site ?? "Dunga Beach";
	await sql`update sensors set value = ${data.kg}, recorded_at = now() where code = 'SCALE-1'`;
	const code = batchCode(landing);
	await sql`
      insert into batches (code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg, temp_c, spoilage_score)
      values (${code}, ${data.fishTypeId}, ${data.supplierId}, ${landing}, ${data.kg}, ${data.kg}, 1.8, 8)`;
	await sql`update fish_types set quantity_kg = quantity_kg + ${data.kg} where id = ${data.fishTypeId}`;
	const fish = await sql`select name from fish_types where id = ${data.fishTypeId}`;
	await sql`
      insert into notifications (channel, kind, recipient_code, message, status)
      values ('sms', 'weigh-in', 'House manager',
              ${`Scale logged ${data.kg} kg ${fish[0]?.name ?? "fish"} as ${code}.`},
              'sent')`;
	return { code };
});
//#endregion
export { addCustomer_createServerFn_handler, addSupplier_createServerFn_handler, confirmMpesa_createServerFn_handler, getBatchByCode_createServerFn_handler, getOverview_createServerFn_handler, listBatches_createServerFn_handler, listCustomers_createServerFn_handler, listFish_createServerFn_handler, listNotifications_createServerFn_handler, listPayments_createServerFn_handler, listSales_createServerFn_handler, listSensors_createServerFn_handler, listSuppliers_createServerFn_handler, receiveDelivery_createServerFn_handler, recordSale_createServerFn_handler, sendAlert_createServerFn_handler, tickSensors_createServerFn_handler, weighIn_createServerFn_handler };
