import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface StoredLiveScore {
  id?: string;
  session_id: string;
  race_name: string;
  circuit_name: string;
  current_lap: number;
  total_laps: number;
  race_status: string;
  leaderboard_json: any;
  events_json: any;
  updated_at?: string;
}

export interface StoredNotificationPreference {
  id?: string;
  user_id: string;
  session_type: string;
  reminder_minutes: number;
  enabled: boolean;
  created_at?: string;
}

export async function saveLiveRaceSnapshot(snapshot: StoredLiveScore) {
  if (!supabase) return { error: 'Supabase not configured' };
  const { data, error } = await supabase
    .from('race_snapshots')
    .upsert(
      {
        session_id: snapshot.session_id,
        race_name: snapshot.race_name,
        circuit_name: snapshot.circuit_name,
        current_lap: snapshot.current_lap,
        total_laps: snapshot.total_laps,
        race_status: snapshot.race_status,
        leaderboard_json: snapshot.leaderboard_json,
        events_json: snapshot.events_json,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'session_id' }
    );
  return { data, error };
}

export async function getLatestRaceSnapshot(sessionId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('race_snapshots')
    .select('*')
    .eq('session_id', sessionId)
    .single();
  if (error) return null;
  return data as StoredLiveScore;
}
