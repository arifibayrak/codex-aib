create extension if not exists "pgcrypto";

create table if not exists startups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text not null,
  hq_country text,
  created_at timestamptz not null default now()
);

create table if not exists founders (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid not null references startups(id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  startup_id uuid not null references startups(id) on delete cascade,
  founder_id uuid not null references founders(id) on delete cascade,
  status text not null,
  stage text not null,
  raise_amount_usd numeric not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists files (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  type text not null,
  file_path text not null,
  uploaded_at timestamptz not null default now()
);

create table if not exists extracted_fields (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists qa_flags (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  type text not null,
  severity text not null,
  message text not null,
  field_path text not null,
  created_at timestamptz not null default now()
);

create table if not exists followup_questions (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  question text not null,
  reason text not null,
  answered boolean not null default false,
  answer text,
  created_at timestamptz not null default now()
);

create table if not exists investor_views (
  id uuid primary key default gen_random_uuid(),
  submission_id uuid not null references submissions(id) on delete cascade,
  summary text not null,
  scores jsonb not null,
  evidence jsonb,
  missing_items jsonb,
  created_at timestamptz not null default now()
);
