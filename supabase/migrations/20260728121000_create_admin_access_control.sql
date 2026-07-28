create table if not exists public.admin_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role text check (role in ('full_admin', 'marketing', 'manager', 'viewer')),
  status text not null default 'pending' check (status in ('pending', 'active', 'blocked')),
  invited_by uuid references auth.users(id) on delete set null,
  invited_at timestamptz not null default now(),
  invite_accepted_at timestamptz,
  activated_at timestamptz,
  last_sign_in_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.admin_audit_logs (
  id bigint generated always as identity primary key,
  actor_user_id uuid references auth.users(id) on delete set null,
  target_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.admin_profiles enable row level security;
alter table public.admin_audit_logs enable row level security;

revoke all on table public.admin_profiles from anon, authenticated;
revoke all on table public.admin_audit_logs from anon, authenticated;
revoke all on sequence public.admin_audit_logs_id_seq from anon, authenticated;

create index if not exists admin_profiles_status_role_idx
  on public.admin_profiles (status, role);

create index if not exists admin_audit_logs_actor_created_idx
  on public.admin_audit_logs (actor_user_id, created_at desc);

create index if not exists admin_audit_logs_target_created_idx
  on public.admin_audit_logs (target_user_id, created_at desc);
