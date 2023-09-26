import { getSession } from "@/app/supabase-server";
import { redirect } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import ServiceForm from "../components/ServiceForm";

export default async function page() {
  const supabase = createServerComponentClient({ cookies });
  const session = (await getSession()) || null;
  if (!session) redirect("/");

  const { data: professional, error } = await supabase
    .from("professionals")
    .select()
    .eq("id", session.user.id)
    .single();
  if (error) console.error(error);

  return (
    <div className="space-y-10 divide-y divide-gray-900/10">
      <ServiceForm professional={professional} service={null} edit={false} />
    </div>
  );
}
