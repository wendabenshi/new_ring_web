// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nbyahizzsymhmoltutlb.supabase.co'
const supabaseAnonKey = 'sb_publishable_uT3f1hvo9JmlzNEMU-6r7Q_OMpI1RYD'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default supabase