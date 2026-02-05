-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT, -- Stores the icon name (e.g., "Home", "Building2")
  tag TEXT, -- e.g., "Popular", "Premium"
  display_order INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Create policies (Allow Public Read, Auth Write)
CREATE POLICY "Public can view services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Admin can service services" ON services
  FOR ALL TO authenticated USING (true);
