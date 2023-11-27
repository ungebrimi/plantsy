import { createClient } from "@/app/utils/supabase/client";

const supabase = createClient();

export const archiveData = async (
  id: number,
  table_name: string,
  payload: string,
  archive_reason: string,
) => {
  try {
    const { data, error } = await supabase
      .from("archive")
      .insert({
        original_id: id,
        table_name: table_name,
        payload: payload,
        archive_reason: archive_reason,
      })
      .select()
      .single();
    if (error) throw error;
    if (!error) console.log("data successfully archived");
    return data;
  } catch (e) {
    throw e;
  }
};
