alter table customers
  add column if not exists user_id text references "user" ("id") on delete set null;

create unique index if not exists customers_user_id_unique
  on customers (user_id);

alter table customer_orders
  add column if not exists customer_id int references customers(id),
  add column if not exists sale_id int references sales(id);

create unique index if not exists customer_orders_sale_id_unique
  on customer_orders (sale_id)
  where sale_id is not null;

create table if not exists customer_order_allocations (
  order_item_id int not null references customer_order_items(id) on delete cascade,
  batch_id int not null references batches(id),
  quantity_kg double precision not null check (quantity_kg > 0),
  primary key (order_item_id, batch_id)
);

create index if not exists customer_order_allocations_batch
  on customer_order_allocations (batch_id);
