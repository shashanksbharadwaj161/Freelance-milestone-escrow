create type project_role as enum ('client', 'freelancer', 'resolver');
create type milestone_status as enum ('pending', 'funded', 'submitted', 'disputed', 'released', 'refunded');

create table if not exists projects (
  id uuid primary key,
  project_code text not null unique,
  title text not null,
  escrow_address text unique,
  client_address text not null,
  freelancer_address text not null,
  resolver_address text not null,
  token_address text not null,
  budget numeric(36, 6) not null,
  review_period_seconds integer not null,
  created_at timestamptz not null default now()
);

create table if not exists milestones (
  id uuid primary key,
  project_id uuid not null references projects(id) on delete cascade,
  position integer not null,
  title text not null,
  amount numeric(36, 6) not null,
  due_at timestamptz not null,
  status milestone_status not null default 'pending',
  delivery_uri text,
  delivery_hash text,
  submitted_at timestamptz,
  unique(project_id, position)
);

create table if not exists escrow_events (
  id bigserial primary key,
  project_id uuid not null references projects(id) on delete cascade,
  milestone_id uuid references milestones(id) on delete set null,
  event_name text not null,
  tx_hash text not null,
  block_number bigint not null,
  payload jsonb not null default '{}',
  occurred_at timestamptz not null
);
