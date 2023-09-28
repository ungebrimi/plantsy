import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import ClientPage from "./ClientPage";
import { cookies } from "next/headers";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase.from("services").select();

  if (error) console.error(error);
  if (data) {
    return <ClientPage serverServices={data} />;
  }
}
