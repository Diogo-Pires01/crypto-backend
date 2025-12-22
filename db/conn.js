const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL ou Key não encontrada no ambiente!");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
