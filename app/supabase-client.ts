import { Database } from "@/database";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
export async function getSession() {
  const supabase = createClientComponentClient<Database>();
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    return session;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}
