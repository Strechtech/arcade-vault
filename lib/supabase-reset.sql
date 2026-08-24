-- Drop existing tables if they exist
DROP TABLE IF EXISTS scores CASCADE;
DROP TABLE IF EXISTS games CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create tables from scratch
CREATE TABLE users (
  id text primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamp with time zone default now()
);

CREATE TABLE games (
  id text primary key,
  name text not null,
  description text,
  category text,
  created_at timestamp with time zone default now()
);

CREATE TABLE scores (
  id uuid primary key default gen_random_uuid(),
  user_id text not null references users(id) on delete cascade,
  game_id text not null references games(id) on delete cascade,
  score integer not null,
  created_at timestamp with time zone default now()
);

-- Create indexes
CREATE INDEX idx_scores_user_id ON scores(user_id);
CREATE INDEX idx_scores_game_id ON scores(game_id);
CREATE INDEX idx_scores_score ON scores(score desc);

-- Insert test data
INSERT INTO users (id, email, password_hash) VALUES
('user-1', 'test@example.com', 'hash_placeholder');

INSERT INTO games (id, name, description, category) VALUES
('serpentina', 'Serpentina', 'Crece sin morder tu propia cola.', 'ARCADE'),
('caida', 'Caída', 'Encaja piezas antes de que el techo te aplaste.', 'PUZZLE'),
('gloton', 'Glotón', 'Devora puntos y escapa de fantasmas.', 'ARCADE'),
('bloque-buster', 'Bloque Buster', 'Rebota la pelota y destruye muros de neón.', 'ARCADE'),
('invasores', 'Invasores', 'Defiende el planeta de filas alienígenas.', 'SHOOTER'),
('rocas', 'Rocas', 'Pulveriza asteroides en gravedad cero.', 'SHOOTER'),
('ranaria', 'Ranaria', 'Cruza la autopista de pixeles.', 'ARCADE'),
('duelo-pixel', 'Duelo Pixel', 'Dos paletas. Una pelota. Reflejos máximos.', 'VERSUS');

-- Enable RLS and create policies
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert scores" ON scores
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Allow read scores" ON scores
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow read games" ON games
  FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Allow read users" ON users
  FOR SELECT TO anon, authenticated USING (true);

-- Verify
SELECT COUNT(*) as games FROM games;
SELECT COUNT(*) as users FROM users;
