import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://ijmjexylluicosvhdqjg.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlqbWpleHlsbHVpY29zdmhkcWpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODExNjQ2MzcsImV4cCI6MjA5Njc0MDYzN30.6QdLMI0sNrOZr1oA_z31pUfmJON9--EDccMcLRqXlQA"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

console.log("✅ Supabase Client connected")
console.log("🔗 URL:", SUPABASE_URL)
