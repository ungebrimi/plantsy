import { useState } from "react";
import { DbResultErr, Tables } from "@/database";
import {createBrowserClient} from "@supabase/ssr";

type FileUploadHookResult = {
  loading: boolean;
  response: Tables<"files">[];
  error: DbResultErr;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
  ) => Promise<void>;
};

const useFileUpload = (): FileUploadHookResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<Tables<"files">[]>([]);
  const [error, setError] = useState<any>(null);
  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const insertToFileTable = async ({
    file,
    url,
  }: {
    file: File;
    url: string;
  }) => {
    const { data, error } = await supabase
      .from("files")
      .insert({
        name: file.name,
        url: url,
        size: file.size,
        type: file.type,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
  ) => {
    //@ts-ignore
    const newFiles = Array.from(event.target.files) || [];
    setLoading(true);

    const uploadPromises = newFiles.map(async (file: File) => {
      // Upload the file to the storage
      const { error } = await supabase.storage
        .from("professionals")
        .upload(`${path}/${file.name}`, file, {
          upsert: true,
        });
      if (error) {
        console.error("Error uploading file:", error);
      } else {
        const { data } = supabase.storage
          .from("professionals")
          .getPublicUrl(`${path}/${file.name}`);
        // Insert file information into the files table
        try {
          const insertResult = await insertToFileTable({
            file,
            url: data.publicUrl,
          });
          return insertResult;
        } catch (error) {
          setError(error);
        }
      }
    });

    const res: any = await Promise.all(uploadPromises);
    console.log("response was resolved: ", res);
    setResponse(res);
    setLoading(false);
  };

  return {
    loading,
    response,
    error,
    handleFileUpload,
  };
};

export default useFileUpload;
