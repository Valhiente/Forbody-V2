create table if not exists public.franchise_rate_limits (
  id bigint generated always as identity primary key,
  fingerprint text not null,
  created_at timestamptz not null default now()
);

alter table public.franchise_rate_limits enable row level security;

revoke all on table public.franchise_rate_limits from anon, authenticated;
revoke all on sequence public.franchise_rate_limits_id_seq from anon, authenticated;

create index if not exists franchise_rate_limits_fingerprint_created_idx
  on public.franchise_rate_limits (fingerprint, created_at desc);
