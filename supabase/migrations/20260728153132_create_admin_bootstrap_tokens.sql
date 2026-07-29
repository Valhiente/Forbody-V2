create table if not exists public.admin_bootstrap_tokens (
  token_hash text primary key,
  email text not null,
  expires_at timestamptz not null,
  used_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.admin_bootstrap_tokens enable row level security;
revoke all on table public.admin_bootstrap_tokens from anon, authenticated;
