-- ==========================================
-- 1. MAIN WEBSITE TABLES (Public Data)
-- ==========================================

-- Teams Table: Stores teams for all sports
CREATE TABLE teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  logo TEXT,
  captain TEXT DEFAULT 'Pending',
  sport TEXT NOT NULL, -- 'Football', 'Cricket', 'Basketball'
  purse_remaining DECIMAL DEFAULT 50.0,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  points INTEGER DEFAULT 0,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Players Table: Stores registered players in the draft/auction
CREATE TABLE players (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  sport TEXT NOT NULL,
  age_category TEXT, -- 'Under 15', 'Under 17', etc.
  base_price INTEGER DEFAULT 0,
  current_bid INTEGER DEFAULT 0,
  team_id TEXT REFERENCES teams(id) ON DELETE SET NULL,
  role TEXT, -- 'Striker', 'Bowler', 'Forward', etc.
  status TEXT DEFAULT 'In Auction', -- 'In Auction', 'Sold', 'Unsold'
  photo TEXT,
  stats JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches Table: Stores fixtures and results
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sport TEXT NOT NULL,
  team_a_id TEXT REFERENCES teams(id),
  team_b_id TEXT REFERENCES teams(id),
  time TEXT, -- e.g., '14:00'
  date TEXT, -- e.g., '20 May 2026'
  venue TEXT,
  status TEXT DEFAULT 'Upcoming', -- 'Upcoming', 'Live', 'Finished'
  score_a TEXT DEFAULT '0',
  score_b TEXT DEFAULT '0',
  winner_id TEXT REFERENCES teams(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notices Table: News and announcements
CREATE TABLE notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  date TEXT,
  priority TEXT DEFAULT 'Normal', -- 'Low', 'Normal', 'High'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Table: For photos/videos
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  url TEXT NOT NULL,
  type TEXT DEFAULT 'image', -- 'image', 'video'
  created_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- 2. ADMIN & OPERATIONS TABLES (Private/CRM)
-- ==========================================

-- Registrations Table: For managing student applications (CRM)
CREATE TABLE registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  grade TEXT,
  sport TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  payment_status TEXT DEFAULT 'Pending', -- 'Pending', 'Paid', 'Failed'
  verification_status TEXT DEFAULT 'Unverified', -- 'Unverified', 'Verified'
  transaction_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin Audit Logs: Track who changed what
CREATE TABLE admin_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID, -- References auth.users(id)
  action TEXT NOT NULL, -- 'UPDATE_SCORE', 'SOLD_PLAYER', etc.
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auction History: Track every bid made in real-time
CREATE TABLE auction_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id TEXT REFERENCES players(id),
  team_id TEXT REFERENCES teams(id),
  bid_amount INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site Configuration: Global settings
CREATE TABLE site_config (
  key TEXT PRIMARY KEY,
  value JSONB,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);


-- ==========================================
-- 3. INITIAL DATA (SEEDS)
-- ==========================================

-- Insert Default Teams
INSERT INTO teams (id, name, logo, captain, sport, purse_remaining, color) VALUES
-- Cricket
('c1', 'Shalom Hurricanes', '/input_file_0.png', 'Pending', 'Cricket', 50.0, '#3b82f6'),
('c2', 'Shalom Tornados', '/input_file_1.png', 'Pending', 'Cricket', 50.0, '#eab308'),
('c3', 'Shalom Stromers', '/input_file_2.png', 'Pending', 'Cricket', 50.0, '#22c55e'),
('c4', 'Shalom Lightning', '/input_file_3.png', 'Pending', 'Cricket', 50.0, '#06b6d4'),
('c5', 'Shalom Thunders', '/input_file_4.png', 'Pending', 'Cricket', 50.0, '#15803d'),
-- Football
('f1', 'Shalom City FC', '/input_file_5.png', 'Pending', 'Football', 50.0, '#60a5fa'),
('f2', 'Shalom Blazers', '/input_file_6.png', 'Pending', 'Football', 50.0, '#ef4444'),
('f3', 'Shalom Spurs FC', '/input_file_7.png', 'Pending', 'Football', 50.0, '#1e3a8a'),
('f4', 'Shalom Athletico FC', '/input_file_8.png', 'Pending', 'Football', 50.0, '#dc2626'),
('f5', 'Real Shalom FC', '/input_file_9.png', 'Pending', 'Football', 50.0, '#111827'),
-- Basketball
('b1', 'Shalom Hills Warriors', 'https://lnsofwmfvhpzjdwddrhv.supabase.co/storage/v1/object/public/logos/WhatsApp%20Image%202026-05-15%20at%2021.25.02%20(1).jpeg', 'Pending', 'Basketball', 50.0, '#1d4ed8'),
('b2', 'Shalom Hills Sonics', '/input_file_11.png', 'Pending', 'Basketball', 50.0, '#2563eb'),
('b3', 'Shalom Hills Pacers', '/input_file_12.png', 'Pending', 'Basketball', 50.0, '#fbbf24'),
('b4', 'Shalom Hills Rovers', '/input_file_13.png', 'Pending', 'Basketball', 50.0, '#4338ca');

-- Insert Initial Site Config
INSERT INTO site_config (key, value, description) VALUES
('auction_active', '{"status": false}', 'Is the live auction currently running?'),
('registration_open', '{"status": true}', 'Are registrations currently open?'),
('event_dates', '{"start": "20 May 2026", "end": "25 May 2026"}', 'Dates for the main event');


-- ==========================================
-- 4. SECURITY (Row Level Security)
-- ==========================================

-- Enable RLS on all tables
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE auction_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_config ENABLE ROW LEVEL SECURITY;

-- Anonymous users (Website Visitors) can READ everything except registrations and logs
CREATE POLICY "Public Read Access" ON teams FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON players FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON matches FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON notices FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON site_config FOR SELECT USING (true);

-- Authenticated Users (Admins) can do EVERYTHING
-- Note: Replace 'authenticated' role or add specific condition for admin emails
CREATE POLICY "Admin All Access" ON teams FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON players FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON matches FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON notices FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON gallery FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON registrations FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON admin_logs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON auction_transactions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin All Access" ON site_config FOR ALL USING (auth.role() = 'authenticated');

-- ==========================================
-- 5. STORAGE BUCKETS
-- ==========================================

-- Note: In Supabase, buckets are often created through the dashboard or API.
-- These policies assume a bucket named 'logos' exists.

-- Allow public access to 'logos' bucket for reading
CREATE POLICY "Public Read Access Logos" ON storage.objects FOR SELECT USING (bucket_id = 'logos');

-- Allow authenticated users (Admins) to upload/update/delete in 'logos' bucket
CREATE POLICY "Admin CRUD Access Logos" ON storage.objects FOR ALL USING (bucket_id = 'logos' AND auth.role() = 'authenticated');
