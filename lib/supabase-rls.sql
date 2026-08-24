-- Verificar tablas existen
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'games', 'scores');

-- Permitir inserciones en scores (temporal para desarrollo)
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert scores" ON scores
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read scores" ON scores
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Permitir lectura de games y users
ALTER TABLE games ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read games" ON games
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow read users" ON users
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Verificar datos insertados
SELECT COUNT(*) as game_count FROM games;
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as score_count FROM scores;
