import { createClient } from '@supabase/supabase-js'

let supabaseUrl: string
if (import.meta.env.VITE_SUPABASE_URL) {
    supabaseUrl = import.meta.env.VITE_SUPABASE_URL
} else {
    throw new Error("environment variable is not set")
}

let supabaseAnonKey: string
if (import.meta.env.VITE_SUPABASE_ANON_KEY) {
    supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
} else {
    throw new Error("environment variable is not set")
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey)