-- Muneem Ji — Supabase database foundation
-- Run this in Supabase SQL Editor after creating a project.
-- Never put the service_role key in the frontend.

create extension if not exists pgcrypto;

create table if not exists public.shops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  shop_name text not null,
  owner_name text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  name text not null,
  code text not null,
  purchase_price numeric(12,2) not null default 0 check (purchase_price >= 0),
  selling_price numeric(12,2) not null default 0 check (selling_price >= 0),
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(shop_id, code)
);

create table if not exists public.sales (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references public.shops(id) on delete cascade,
  total numeric(12,2) not null default 0,
  profit numeric(12,2) not null default 0,
  sold_at timestamptz not null default now()
);

create table if not exists public.sale_items (
  id uuid primary key default gen_random_uuid(),
  sale_id uuid not null references public.sales(id) on delete cascade,
  product_id uuid not null references public.products(id),
  product_name text not null,
  quantity integer not null check (quantity > 0),
  purchase_price numeric(12,2) not null check (purchase_price >= 0),
  sale_price numeric(12,2) not null check (sale_price >= 0),
  line_total numeric(12,2) not null,
  line_profit numeric(12,2) not null,
  created_at timestamptz not null default now()
);

create index if not exists products_shop_id_idx on public.products(shop_id);
create index if not exists sales_shop_id_sold_at_idx on public.sales(shop_id, sold_at);
create index if not exists sale_items_sale_id_idx on public.sale_items(sale_id);

-- Helper: current user's shop.
create or replace function public.my_shop_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select id from public.shops where owner_id = auth.uid() limit 1;
$$;

-- Automatically create a profile/shop after signup.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.shops(owner_id, shop_name, owner_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'shop_name', 'My Shop'),
    coalesce(new.raw_user_meta_data->>'owner_name', '')
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- RLS
alter table public.shops enable row level security;
alter table public.products enable row level security;
alter table public.sales enable row level security;
alter table public.sale_items enable row level security;

drop policy if exists shops_owner_all on public.shops;
create policy shops_owner_all on public.shops
for all using (owner_id = auth.uid())
with check (owner_id = auth.uid());

drop policy if exists products_shop_owner_all on public.products;
create policy products_shop_owner_all on public.products
for all using (shop_id = public.my_shop_id())
with check (shop_id = public.my_shop_id());

drop policy if exists sales_shop_owner_all on public.sales;
create policy sales_shop_owner_all on public.sales
for all using (shop_id = public.my_shop_id())
with check (shop_id = public.my_shop_id());

drop policy if exists sale_items_shop_owner_all on public.sale_items;
create policy sale_items_shop_owner_all on public.sale_items
for all using (
  exists (
    select 1 from public.sales s
    where s.id = sale_items.sale_id
      and s.shop_id = public.my_shop_id()
  )
)
with check (
  exists (
    select 1 from public.sales s
    where s.id = sale_items.sale_id
      and s.shop_id = public.my_shop_id()
  )
);

-- Transaction-safe restock.
create or replace function public.restock_product(p_product_id uuid, p_quantity integer)
returns public.products
language plpgsql
security invoker
set search_path = public
as $$
declare
  updated_product public.products;
begin
  if p_quantity <= 0 then
    raise exception 'Restock quantity must be greater than zero';
  end if;

  update public.products
  set stock = stock + p_quantity,
      updated_at = now()
  where id = p_product_id
    and shop_id = public.my_shop_id()
  returning * into updated_product;

  if updated_product.id is null then
    raise exception 'Product not found or not owned by current shop';
  end if;

  return updated_product;
end;
$$;

-- Transaction-safe sale: validates stock, reduces it, stores the actual sale price,
-- and calculates actual profit/loss. Default product selling price is untouched.
create or replace function public.complete_sale(
  p_product_id uuid,
  p_quantity integer,
  p_sale_price numeric
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  p public.products;
  v_sale_id uuid;
  v_total numeric(12,2);
  v_profit numeric(12,2);
begin
  if p_quantity <= 0 then raise exception 'Quantity must be greater than zero'; end if;
  if p_sale_price < 0 then raise exception 'Sale price cannot be negative'; end if;

  select * into p
  from public.products
  where id = p_product_id and shop_id = public.my_shop_id()
  for update;

  if p.id is null then raise exception 'Product not found'; end if;
  if p_quantity > p.stock then raise exception 'Not enough stock'; end if;

  v_total := p_sale_price * p_quantity;
  v_profit := (p_sale_price - p.purchase_price) * p_quantity;

  insert into public.sales(shop_id, total, profit)
  values (public.my_shop_id(), v_total, v_profit)
  returning id into v_sale_id;

  insert into public.sale_items(
    sale_id, product_id, product_name, quantity,
    purchase_price, sale_price, line_total, line_profit
  )
  values (
    v_sale_id, p.id, p.name, p_quantity,
    p.purchase_price, p_sale_price, v_total, v_profit
  );

  update public.products
  set stock = stock - p_quantity,
      updated_at = now()
  where id = p.id;

  return v_sale_id;
end;
$$;

grant execute on function public.restock_product(uuid, integer) to authenticated;
grant execute on function public.complete_sale(uuid, integer, numeric) to authenticated;
