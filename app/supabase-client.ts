import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { Database } from "@/types_db";
export async function getSession() {
  const supabase = createClientComponentClient();
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
