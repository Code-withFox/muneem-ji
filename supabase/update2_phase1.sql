-- Muneem Ji — Update 2 / Phase 1 migration
-- Run this ONCE in Supabase SQL Editor on an existing Muneem Ji database.
-- Do NOT disable Row Level Security.

-- 1) Archive products instead of physically deleting them.
alter table public.products
  add column if not exists is_active boolean not null default true;

create index if not exists products_shop_active_idx
  on public.products(shop_id, is_active);

-- 2) Product delete = archive. Old sale history remains valid.
create or replace function public.delete_product(p_product_id uuid)
returns public.products
language plpgsql
security invoker
set search_path = public
as $$
declare
  archived_product public.products;
begin
  update public.products
  set is_active = false,
      updated_at = now()
  where id = p_product_id
    and shop_id = public.my_shop_id()
    and is_active = true
  returning * into archived_product;

  if archived_product.id is null then
    raise exception 'Product not found or already deleted';
  end if;

  return archived_product;
end;
$$;

-- 3) Sale delete = restore every sold quantity and then delete the sale.
-- The whole function runs as one database transaction, so stock/history stay consistent.
create or replace function public.delete_sale(p_sale_id uuid)
returns boolean
language plpgsql
security invoker
set search_path = public
as $$
declare
  sale_shop_id uuid;
  item record;
  restored_product public.products;
begin
  select shop_id
    into sale_shop_id
  from public.sales
  where id = p_sale_id
    and shop_id = public.my_shop_id()
  for update;

  if sale_shop_id is null then
    raise exception 'Sale not found or not owned by current shop';
  end if;

  for item in
    select product_id, quantity
    from public.sale_items
    where sale_id = p_sale_id
  loop
    update public.products
    set stock = stock + item.quantity,
        updated_at = now()
    where id = item.product_id
      and shop_id = sale_shop_id
    returning * into restored_product;

    if restored_product.id is null then
      raise exception 'Product for sale item was not found';
    end if;
  end loop;

  delete from public.sales
  where id = p_sale_id
    and shop_id = sale_shop_id;

  return true;
end;
$$;

grant execute on function public.delete_product(uuid) to authenticated;
grant execute on function public.delete_sale(uuid) to authenticated;
