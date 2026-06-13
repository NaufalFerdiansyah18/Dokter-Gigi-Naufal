import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://ijmjexylluicosvhdqjg.supabase.co"
const SUPABASE_ANON_KEY = "sb_publishable_fRB1YaYnXOErgpDPEdrOvA_x5dSRFdt"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
