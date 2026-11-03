create table if not exists aqua_staff_roles (
  user_id text primary key references "user" ("id") on delete cascade,
  role text not null check (role in ('owner', 'manager', 'floor')),
  created_at timestamptz not null default now()
);

create unique index if not exists aqua_one_owner
  on aqua_staff_roles (role) where role = 'owner';

create table if not exists customer_orders (
  id serial primary key,
  code text not null unique,
  user_id text not null references "user" ("id") on delete cascade,
  status text not null default 'placed'
    check (status in ('placed', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
  total double precision not null check (total >= 0),
  note text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customer_orders_user_created
  on customer_orders (user_id, created_at desc);
create index if not exists customer_orders_status_created
  on customer_orders (status, created_at desc);

create table if not exists customer_order_items (
  id serial primary key,
  order_id int not null references customer_orders (id) on delete cascade,
  fish_type_id int not null references fish_types (id),
  fish_name text not null,
  qty_kg double precision not null check (qty_kg > 0),
  unit_price double precision not null check (unit_price >= 0)
);

create index if not exists customer_order_items_order
  on customer_order_items (order_id);
