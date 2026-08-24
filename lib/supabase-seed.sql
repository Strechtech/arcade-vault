-- Insert test games
INSERT INTO games (id, name, description, category) VALUES
('serpentina', 'Serpentina', 'Crece sin morder tu propia cola.', 'ARCADE'),
('caida', 'Caída', 'Encaja piezas antes de que el techo te aplaste.', 'PUZZLE'),
('gloton', 'Glotón', 'Devora puntos y escapa de fantasmas.', 'ARCADE'),
('bloque-buster', 'Bloque Buster', 'Rebota la pelota y destruye muros de neón.', 'ARCADE'),
('invasores', 'Invasores', 'Defiende el planeta de filas alienígenas.', 'SHOOTER'),
('rocas', 'Rocas', 'Pulveriza asteroides en gravedad cero.', 'SHOOTER'),
('ranaria', 'Ranaria', 'Cruza la autopista de pixeles.', 'ARCADE'),
('duelo-pixel', 'Duelo Pixel', 'Dos paletas. Una pelota. Reflejos máximos.', 'VERSUS');

-- Insert test user
INSERT INTO users (id, email, password_hash) VALUES
('user-1', 'test@example.com', 'hash_placeholder')
ON CONFLICT DO NOTHING;
