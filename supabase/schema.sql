-- Kepter Wear orders table. Run once in the Supabase SQL editor.
-- The identity PK doubles as the Robokassa InvId.

create table if not exists orders (
  id            bigint generated always as identity primary key,
  status        text not null default 'pending'
                check (status in ('pending', 'paid', 'failed')),
  amount        numeric(12,2) not null,
  currency      text not null default 'KZT',
  customer_name text not null,
  phone         text not null,
  email         text not null,
  city          text not null,
  address       text not null,
  items         jsonb not null,
  locale        text not null default 'ru',
  paid_at       timestamptz,
  created_at    timestamptz not null default now()
);

-- RLS on with zero policies: only the service-role key (server) can touch rows.
alter table orders enable row level security;
