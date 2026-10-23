-- Supabase Table & Row-Level Security Setup for DSA-Java Analytics
CREATE TABLE IF NOT EXISTS website_activity_events (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamptz DEFAULT now(),
  event_type text NOT NULL,
  page_path text,
  page_title text,
  session_id text,
  topic text,
  question_id text,
  difficulty text,
  platform text,
  details jsonb
);

ALTER TABLE website_activity_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert only"
  ON website_activity_events
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated owner read only"
  ON website_activity_events
  FOR SELECT
  TO authenticated
  USING (true);
