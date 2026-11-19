import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ukvlnatyccacrhnfxjus.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_FITeekMDnqtWMJar68AyOw_W2G9ud1L";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
