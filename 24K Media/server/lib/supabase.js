// Supabase client (server-side, service role).
// Returns null when env vars are absent so the API can fall back to local
// JSON-file storage for offline / local development.
import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL
const serviceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY

export const supabase =
  url && serviceKey
    ? createClient(url, serviceKey, {
        auth: { persistSession: false, autoRefreshToken: false },
      })
    : null

export const isSupabaseEnabled = Boolean(supabase)
