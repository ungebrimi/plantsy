import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const getSupabase = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    },
  );
};

export const getServerSession = async () => {
  const supabase = getSupabase();
  const { data, error } = await supabase.auth.getSession();
  const { session } = data;
  return { session, error, supabase };
};
