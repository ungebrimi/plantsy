import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Tables } from "@/database";
import { StorageError } from "@supabase/storage-js";
import { createClient } from "@/app/utils/supabase/client";

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
};

interface useImageUploadProps {
  loading: boolean;
  handleImageUpload: (
    location: string,
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
    maxWidthOrHeight?: number,
    addUniqueSuffix?: boolean,
  ) => Promise<Tables<"files"> | Tables<"files">[] | undefined | StorageError>;
  removeImage: any;
}

const useImageUpload = (): useImageUploadProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  const insertToFileTable = async ({ file, url }: any) => {
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
    if (error) {
      throw error;
    }
    return data;
  };

  const handleImageUpload = async (
    location: string,
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
    maxWidthOrHeight: number = 1920,
    addUniqueSuffix: boolean = false,
  ): Promise<Tables<"files">[] | Tables<"files"> | undefined> => {
    setLoading(true);
    const options: FileProcessingOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: maxWidthOrHeight,
      useWebWorker: true,
    };

    try {
      const files = event.target?.files;

      if (!files || files.length === 0) {
        setLoading(false);
        return undefined;
      }

      const uploadPromises = Array.from(files).map(async (file) => {
        try {
          const compressedFile = await imageCompression(file, options);
          let name = compressedFile.name;
          if (addUniqueSuffix) {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            name = `${uniqueSuffix}-${compressedFile.name}`;
          }
          console.log(name);
          const { error } = await supabase.storage
            .from(location)
            .upload(`${path}/${name}`, compressedFile);

          if (error) {
            throw new Error(error.message);
          }

          const { data } = supabase.storage
            .from("professionals")
            .getPublicUrl(`${path}/${compressedFile.name}`);

          const insertResult = await insertToFileTable({
            file: compressedFile,
            url: data?.publicUrl,
          });

          if (!insertResult) {
            throw new Error("Failed to insert into the files table.");
          }

          return insertResult;
        } catch (error) {
          console.error("Error uploading file:", error);
          throw error; // Propagate the error to the caller
        }
      });

      const results = await Promise.all(uploadPromises);
      setLoading(false);

      if (results.length === 1) {
        return results[0] as Tables<"files">;
      } else {
        // Filter out any undefined results
        return results.filter((result) => result) as Tables<"files">[];
      }
    } catch (error) {
      setLoading(false);
      throw error; // Propagate the error to the caller
    }
  };

  const removeFromFileTable = async (fileId: number) => {
    const { error } = await supabase.from("files").delete().eq("id", fileId);

    if (error) {
      throw new Error(
        `Error deleting file with ID ${fileId}: ${error.message}`,
      );
    }
    console.log("File deleted from table");
  };

  const removeFromStorage = async (path: string) => {
    const { data, error } = await supabase.storage
      .from("professionals")
      .remove([path]);
    if (error) {
      throw new Error(
        `Error removing file from storage with path ${path}: ${error.message}`,
      );
    }
    console.log(data);
    console.log("File removed from storage");
  };

  const removeImage = async (fileId: number, path: string) => {
    // it does seem like this not always work
    try {
      // Remove from the file table
      await removeFromFileTable(fileId);
      // Remove from storage
      await removeFromStorage(path);

      return null;
    } catch (error) {
      throw error;
    }
  };

  return {
    loading,
    handleImageUpload,
    removeImage,
  };
};

export default useImageUpload;
