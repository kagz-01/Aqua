alter table suppliers
  add column if not exists supplier_kind text not null default 'cooperative',
  add column if not exists phone text not null default '';

alter table suppliers
  drop constraint if exists suppliers_supplier_kind_check;

alter table suppliers
  add constraint suppliers_supplier_kind_check
  check (supplier_kind in ('fisher', 'boat', 'cooperative', 'opening'));

insert into suppliers (code, landing_site, boat_or_coop, reliability, supplier_kind)
values ('OPENING-BALANCE', 'Unrecorded origin', 'Legacy opening stock', 0, 'opening')
on conflict (code) do nothing;

create table if not exists fish_deliveries (
  id serial primary key,
  code text not null unique,
  supplier_id int not null references suppliers(id),
  landing_site text not null,
  received_at timestamptz not null default now(),
  temp_c double precision not null,
  note text not null default ''
);

create table if not exists fish_delivery_items (
  id serial primary key,
  delivery_id int not null references fish_deliveries(id) on delete cascade,
  fish_type_id int not null references fish_types(id),
  quantity_kg double precision not null check (quantity_kg > 0),
  unit_cost double precision not null check (unit_cost >= 0),
  batch_id int unique references batches(id),
  unique (delivery_id, fish_type_id)
);

alter table batches
  add column if not exists delivery_id int references fish_deliveries(id);

create index if not exists fish_deliveries_supplier_received
  on fish_deliveries (supplier_id, received_at desc);
create index if not exists fish_delivery_items_delivery
  on fish_delivery_items (delivery_id);

create table if not exists supplier_payments (
  id serial primary key,
  delivery_id int not null references fish_deliveries(id),
  amount double precision not null check (amount > 0),
  method text not null check (method in ('cash', 'mpesa', 'bank')),
  reference text not null default '',
  paid_at timestamptz not null default now()
);

create index if not exists supplier_payments_delivery
  on supplier_payments (delivery_id, paid_at desc);

insert into batches (
  code, fish_type_id, supplier_id, landing_site, quantity_kg, remaining_kg,
  temp_c, spoilage_score
)
select
  'AQ-OPEN-' || f.id,
  f.id,
  s.id,
  'Unrecorded origin',
  f.quantity_kg - coalesce(sum(b.remaining_kg), 0),
  f.quantity_kg - coalesce(sum(b.remaining_kg), 0),
  2,
  0
from fish_types f
cross join suppliers s
left join batches b on b.fish_type_id = f.id
where s.code = 'OPENING-BALANCE'
group by f.id, f.quantity_kg, s.id
having f.quantity_kg > coalesce(sum(b.remaining_kg), 0);
