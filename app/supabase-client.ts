import { createBrowserClient } from '@supabase/ssr'
import {Database} from "@/database";
import {SupabaseClient} from "@supabase/supabase-js";

export const getClientSupabase = () => {
  // what is the correct type for createBrowserClient?
  const supabase: SupabaseClient = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  return { supabase }
}