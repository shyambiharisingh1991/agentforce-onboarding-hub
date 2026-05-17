create extension if not exists "uuid-ossp";

create table if not exists organizations (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  segment text not null check (segment in ('SMB', 'Mid-Market', 'Enterprise')),
  industry text not null,
  team_size integer not null default 0,
  salesforce_products text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  email text not null unique,
  name text not null,
  role text not null,
  auth_provider text not null default 'github',
  created_at timestamptz not null default now()
);

create table if not exists readiness_assessments (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  score integer not null,
  complexity text not null,
  inputs jsonb not null,
  quick_wins jsonb not null default '[]',
  risks jsonb not null default '[]',
  rollout_strategy text not null,
  created_at timestamptz not null default now()
);

create table if not exists onboarding_journeys (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  role text not null,
  status text not null default 'not_started',
  completion_percent integer not null default 0,
  checklist jsonb not null default '[]',
  milestones jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table if not exists prompt_templates (
  id uuid primary key default uuid_generate_v4(),
  category text not null,
  title text not null,
  template text not null,
  rating numeric not null default 0,
  use_cases text[] not null default '{}',
  variables text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists usage_snapshots (
  id uuid primary key default uuid_generate_v4(),
  organization_id uuid references organizations(id) on delete cascade,
  team text not null,
  workflow text not null,
  prompts integer not null default 0,
  credits integer not null default 0,
  estimated_cost numeric not null default 0,
  productivity_hours_saved numeric not null default 0,
  captured_on date not null default current_date
);

create table if not exists industry_templates (
  id uuid primary key default uuid_generate_v4(),
  industry text not null,
  segment text not null,
  overview text not null,
  recommended_roles text[] not null default '{}',
  rollout_stages jsonb not null default '[]',
  success_metrics text[] not null default '{}'
);

create index if not exists idx_users_organization_id on users(organization_id);
create index if not exists idx_journeys_organization_id on onboarding_journeys(organization_id);
create index if not exists idx_usage_org_date on usage_snapshots(organization_id, captured_on);
