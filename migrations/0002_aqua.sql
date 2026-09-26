create table if not exists fish_types (
  id serial primary key,
  name text not null,
  local_name text not null,
  category text not null,
  unit text not null default 'kg',
  price_per_kg double precision not null,
  reorder_kg double precision not null,
  quantity_kg double precision not null default 0,
  image_key text not null,
  in_season boolean not null default true
);

create table if not exists suppliers (
  id serial primary key,
  code text not null unique,
  landing_site text not null,
  boat_or_coop text not null,
  reliability int not null default 80
);

create table if not exists customers (
  id serial primary key,
  code text not null unique,
  kind text not null,
  credit_balance double precision not null default 0
);

create table if not exists batches (
  id serial primary key,
  code text not null unique,
  fish_type_id int not null references fish_types(id),
  supplier_id int not null references suppliers(id),
  landing_site text not null,
  delivered_at timestamptz not null default now(),
  quantity_kg double precision not null,
  remaining_kg double precision not null,
  temp_c double precision not null,
  spoilage_score int not null default 8
);

create table if not exists sales (
  id serial primary key,
  receipt_no text not null unique,
  customer_id int not null references customers(id),
  total double precision not null,
  payment_method text not null,
  payment_status text not null,
  mpesa_receipt text,
  created_at timestamptz not null default now()
);

create table if not exists sale_items (
  id serial primary key,
  sale_id int not null references sales(id) on delete cascade,
  fish_type_id int not null references fish_types(id),
  batch_id int references batches(id),
  qty_kg double precision not null,
  unit_price double precision not null
);

create table if not exists payments (
  id serial primary key,
  sale_id int not null references sales(id) on delete cascade,
  method text not null,
  amount double precision not null,
  status text not null,
  mpesa_receipt text,
  msisdn_masked text,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id serial primary key,
  channel text not null,
  kind text not null,
  recipient_code text not null,
  message text not null,
  status text not null default 'sent',
  created_at timestamptz not null default now()
);

create table if not exists sensors (
  id serial primary key,
  code text not null unique,
  location text not null,
  kind text not null,
  value double precision not null,
  unit text not null,
  status text not null,
  recorded_at timestamptz not null default now()
);

insert into fish_types (id, name, local_name, category, price_per_kg, reorder_kg, quantity_kg, image_key, in_season)
values
  (1, 'Nile Tilapia', 'Ngege', 'Fresh whole', 450, 25, 82, 'tilapia', true),
  (2, 'Nile Perch', 'Mbuta', 'Fresh whole', 380, 20, 54, 'nile-perch', true),
  (3, 'Omena / Dagaa', 'Omena', 'Dried silver', 280, 30, 18, 'omena', true),
  (4, 'African Catfish', 'Kamongo', 'Fresh whole', 320, 15, 41, 'catfish', true),
  (5, 'Fulu', 'Fulu', 'Small cichlid', 200, 20, 12, 'market-ice', true),
  (6, 'Marbled lungfish', 'Kamongo mamba', 'Fresh whole', 360, 8, 9, 'nile-perch', false)
on conflict do nothing;

insert into suppliers (id, code, landing_site, boat_or_coop, reliability)
values
  (1, 'DUNGA-12', 'Dunga Beach', 'Boat 12 cooperative', 92),
  (2, 'MBITA-PT', 'Mbita Point', 'Mbita landing ring', 88),
  (3, 'UHANYA-04', 'Uhanya Beach', 'Uhanya dawn boats', 84),
  (4, 'HOMA-PIER', 'Homa Bay pier', 'Homa Bay pier desk', 90),
  (5, 'SIO-PORT', 'Sio Port', 'Sio Port weigh-in', 79)
on conflict do nothing;

insert into customers (id, code, kind, credit_balance)
values
  (1, 'Dunga Beach Hotel', 'hotel', 0),
  (2, 'Kisumu Central Market', 'market', 2400),
  (3, 'Homa Bay Co-op Stall', 'stall', 0),
  (4, 'Mbita Lakeside Inn', 'hotel', 800),
  (5, 'Walk-in counter', 'walkin', 0),
  (6, 'Portside Grill', 'hotel', 0),
  (7, 'Lakeside Fresh Mart', 'retail', 1500)
on conflict do nothing;

insert into batches (id, code, fish_type_id, supplier_id, landing_site, delivered_at, quantity_kg, remaining_kg, temp_c, spoilage_score)
values
  (1, 'AQ-DUNGA-8841', 1, 1, 'Dunga Beach', now() - interval '6 hours', 40, 28, 1.4, 12),
  (2, 'AQ-MBITA-2204', 2, 2, 'Mbita Point', now() - interval '1 day', 36, 18, 2.1, 28),
  (3, 'AQ-HOMA-1109', 3, 4, 'Homa Bay pier', now() - interval '2 days', 50, 18, 4.8, 46),
  (4, 'AQ-UHANYA-4412', 4, 3, 'Uhanya Beach', now() - interval '8 hours', 22, 16, 1.8, 16),
  (5, 'AQ-SIO-0091', 5, 5, 'Sio Port', now() - interval '3 days', 24, 12, 6.2, 72),
  (6, 'AQ-DUNGA-3310', 1, 1, 'Dunga Beach', now() - interval '5 days', 30, 4, 3.2, 58)
on conflict do nothing;

insert into sales (id, receipt_no, customer_id, total, payment_method, payment_status, mpesa_receipt, created_at)
values
  (1, 'R-240913-11', 1, 9000, 'mpesa', 'paid', 'QK7M2X91', now() - interval '13 days'),
  (2, 'R-240914-04', 5, 2280, 'cash', 'paid', null, now() - interval '12 days'),
  (3, 'R-240915-22', 2, 5600, 'mpesa', 'paid', 'QK9PLA32', now() - interval '11 days'),
  (4, 'R-240916-08', 6, 3800, 'mpesa', 'paid', 'QK4HTW18', now() - interval '10 days'),
  (5, 'R-240917-19', 3, 1400, 'cash', 'paid', null, now() - interval '9 days'),
  (6, 'R-240918-02', 1, 7200, 'mpesa', 'paid', 'QK2NCD44', now() - interval '8 days'),
  (7, 'R-240919-15', 7, 4500, 'mpesa', 'paid', 'QK8RQE70', now() - interval '7 days'),
  (8, 'R-240920-06', 4, 3200, 'cash', 'paid', null, now() - interval '6 days'),
  (9, 'R-240921-31', 2, 8400, 'mpesa', 'paid', 'QK1BKM55', now() - interval '5 days'),
  (10, 'R-240922-09', 5, 1900, 'cash', 'paid', null, now() - interval '4 days'),
  (11, 'R-240923-17', 6, 6100, 'mpesa', 'paid', 'QK6VSL22', now() - interval '3 days'),
  (12, 'R-240924-03', 1, 5400, 'mpesa', 'paid', 'QK3YUD81', now() - interval '2 days'),
  (13, 'R-240925-28', 7, 2800, 'mpesa', 'pending', null, now() - interval '1 day'),
  (14, 'R-240926-12', 5, 1350, 'cash', 'paid', null, now() - interval '4 hours'),
  (15, 'R-240926-18', 3, 4200, 'mpesa', 'paid', 'QK5WPA09', now() - interval '90 minutes')
on conflict do nothing;

insert into sale_items (sale_id, fish_type_id, batch_id, qty_kg, unit_price)
values
  (1, 1, 1, 20, 450),
  (2, 2, 2, 6, 380),
  (3, 3, 3, 20, 280),
  (4, 2, 2, 10, 380),
  (5, 5, 5, 7, 200),
  (6, 1, 1, 16, 450),
  (7, 1, 6, 10, 450),
  (8, 4, 4, 10, 320),
  (9, 2, 2, 12, 380),
  (9, 3, 3, 14, 280),
  (10, 5, 5, 9.5, 200),
  (11, 1, 1, 8, 450),
  (11, 4, 4, 8, 320),
  (12, 1, 1, 12, 450),
  (13, 3, 3, 10, 280),
  (14, 1, 1, 3, 450),
  (15, 2, 2, 6, 380),
  (15, 4, 4, 6, 320)
on conflict do nothing;

insert into payments (sale_id, method, amount, status, mpesa_receipt, msisdn_masked, created_at)
select id, payment_method, total, payment_status, mpesa_receipt,
  case when payment_method = 'mpesa' then '2547•••221' else null end,
  created_at
from sales
on conflict do nothing;

insert into notifications (channel, kind, recipient_code, message, status, created_at)
values
  ('sms', 'low-stock', 'Owner desk', 'Omena / Dagaa is under reorder (18 kg left).', 'sent', now() - interval '3 hours'),
  ('sms', 'sale', 'Dunga Beach Hotel', 'Receipt R-240926-18 confirmed. M-Pesa QK5WPA09.', 'sent', now() - interval '90 minutes'),
  ('whatsapp', 'daily', 'Owner desk', 'Yesterday till: KES 8,200 across 4 sales. 1 pending M-Pesa.', 'sent', now() - interval '8 hours'),
  ('sms', 'cold-chain', 'House manager', 'Display counter at 6.2°C — ice hold Sio batch AQ-SIO-0091.', 'sent', now() - interval '2 hours'),
  ('ussd', 'order', 'Walk-in counter', 'USSD *384*88# order 3 kg Ngege queued at the till.', 'sent', now() - interval '40 minutes')
on conflict do nothing;

insert into sensors (id, code, location, kind, value, unit, status, recorded_at)
values
  (1, 'ICE-A', 'Ice hold A', 'temp', -1.2, 'C', 'ok', now() - interval '4 minutes'),
  (2, 'DISP-1', 'Display counter', 'temp', 4.8, 'C', 'watch', now() - interval '4 minutes'),
  (3, 'VAN-1', 'Delivery cooler', 'temp', 2.1, 'C', 'ok', now() - interval '9 minutes'),
  (4, 'SCALE-1', 'Digital weigh-in', 'weight', 12.4, 'kg', 'ok', now() - interval '16 minutes'),
  (5, 'SIO-HOLD', 'Sio Port crate', 'temp', 6.2, 'C', 'alert', now() - interval '6 minutes')
on conflict do nothing;

select setval('fish_types_id_seq', (select max(id) from fish_types));
select setval('suppliers_id_seq', (select max(id) from suppliers));
select setval('customers_id_seq', (select max(id) from customers));
select setval('batches_id_seq', (select max(id) from batches));
select setval('sales_id_seq', (select max(id) from sales));
select setval('sensors_id_seq', (select max(id) from sensors));
