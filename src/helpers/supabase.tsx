import { createClient } from '@supabase/supabase-js'

let supabaseUrl: string
if (process.env.REACT_APP_SUPABASE_URL) {
    supabaseUrl = process.env.REACT_APP_SUPABASE_URL
} else {
    throw new Error("environment variable is not set")
}

let supabaseAnonKey: string
if (process.env.REACT_APP_SUPABASE_ANON_KEY) {
    supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
} else {
    throw new Error("environment variable is not set")
}


export const supabase = createClient(supabaseUrl, supabaseAnonKey)