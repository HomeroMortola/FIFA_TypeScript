// src/config/supabase.js

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'
import { ENV } from './env.js';

const supabaseUrl = ENV.SUPABASE_URL
const supabaseKey = ENV\
.SUPABASE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error(" Error: SUPABASE_URL o SUPABASE_KEY no están definidas en el .env")
}

// Creamos el cliente oficial de conexión
export const supabase = createClient(supabaseUrl, supabaseKey)