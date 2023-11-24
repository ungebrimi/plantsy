import React, { useState } from "react";
import { Tables } from "@/database";
import { StorageError } from "@supabase/storage-js";
import { createClient } from "@/app/utils/supabase/client";

type FileUploadHookResult = {
  loading: boolean;
  handleFileUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
    userType: string,
  ) => Promise<Tables<"files">[] | undefined | StorageError>;
};

const useFileUpload = (): FileUploadHookResult => {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

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
    userType: string,
  ) => {
    //@ts-ignore
    const newFiles = Array.from(event.target.files) || [];
    setLoading(true);

    const uploadPromises = newFiles.map(async (file: File) => {
      // Upload the file to the storage
      const { error } = await supabase.storage
        .from(userType)
        .upload(`${path}/${file.name}`, file, {
          upsert: true,
        });
      if (error) {
        throw "Error uploading file:" + error;
      } else {
        const { data } = supabase.storage
          .from(userType)
          .getPublicUrl(`${path}/${file.name}`);
        // Insert file information into the files table
        try {
          return await insertToFileTable({
            file,
            url: data.publicUrl,
          });
        } catch (error) {
          throw error;
        }
      }
    });

    const res: any = await Promise.all(uploadPromises);
    setLoading(false);
    return res;
  };

  return {
    loading,
    handleFileUpload,
  };
};

export default useFileUpload;
