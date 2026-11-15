-- Run this in your Supabase SQL Editor to initialize the F1 Live database tables

-- 1. Table for Live Race Snapshots & Timing
CREATE TABLE IF NOT EXISTS public.race_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT UNIQUE NOT NULL,
  race_name TEXT NOT NULL,
  circuit_name TEXT NOT NULL,
  current_lap INT NOT NULL DEFAULT 1,
  total_laps INT NOT NULL DEFAULT 57,
  race_status TEXT NOT NULL DEFAULT 'GREEN',
  leaderboard_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  events_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Table for Race Sessions & Calendar
CREATE TABLE IF NOT EXISTS public.race_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  race_id TEXT NOT NULL,
  round INT NOT NULL,
  grand_prix_name TEXT NOT NULL,
  circuit_id TEXT NOT NULL,
  session_type TEXT NOT NULL,
  scheduled_start TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'UPCOMING',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Table for User Notification Preferences
CREATE TABLE IF NOT EXISTS public.notification_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_type TEXT NOT NULL,
  reminder_minutes INT NOT NULL DEFAULT 30,
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.race_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.race_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;

-- Allow public read access for live scores and schedules
CREATE POLICY "Public read race_snapshots" ON public.race_snapshots FOR SELECT USING (true);
CREATE POLICY "Public read race_sessions" ON public.race_sessions FOR SELECT USING (true);
CREATE POLICY "Public read notification_preferences" ON public.notification_preferences FOR SELECT USING (true);
CREATE POLICY "Public insert notification_preferences" ON public.notification_preferences FOR INSERT WITH CHECK (true);
