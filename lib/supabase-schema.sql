create table if not exists users (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

create table if not exists games (
  id text primary key,
  name text not null,
  description text,
  category text,
  created_at timestamp with time zone default now()
);

create table if not exists scores (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references users(id) on delete cascade,
  game_id text not null references games(id) on delete cascade,
  score integer not null,
  created_at timestamp with time zone default now()
);

-- Create indexes
create index if not exists idx_scores_user_id on scores(user_id);
create index if not exists idx_scores_game_id on scores(game_id);
create index if not exists idx_scores_score on scores(score desc);
