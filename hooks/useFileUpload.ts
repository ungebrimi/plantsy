import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Tables } from "@/database";
import { StorageError } from "@supabase/storage-js";
import { createClient } from "@/app/utils/supabase/client";

interface UploadOptions {
  event: React.ChangeEvent<HTMLInputElement>;
  location: string;
  path: string;
  maxWidthOrHeight?: number;
  addUniqueSuffix?: boolean;
  processImage?: boolean;
}

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
};

interface useImageUploadProps {
  loading: boolean;
  handleUpload: ({
    event,
    location,
    path,
    maxWidthOrHeight,
    addUniqueSuffix,
    processImage,
  }: UploadOptions) => Promise<
    Tables<"files"> | Tables<"files">[] | undefined | StorageError
  >;
  removeFile: any;
}

const useFileUpload = (): useImageUploadProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClient();

  const insertToFileTable = async ({ name, url, size, type }: any) => {
    const { data, error } = await supabase
      .from("files")
      .insert({
        name: name,
        url: url,
        size: size,
        type: type,
      })
      .select()
      .single();
    if (error) {
      throw error;
    }
    return data;
  };

  const handleUpload = async ({
    event,
    location,
    path,
    maxWidthOrHeight = 1920,
    addUniqueSuffix = false,
    processImage = true,
  }: UploadOptions): Promise<
    Tables<"files">[] | Tables<"files"> | undefined
  > => {
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
          let name = file.name;

          if (addUniqueSuffix) {
            const uniqueSuffix =
              Date.now() + "-" + Math.round(Math.random() * 1e9);
            name = `${uniqueSuffix}-${file.name}`;
          }

          const processedFile = processImage
            ? await imageCompression(file, options)
            : file;

          const { error } = await supabase.storage
            .from(location)
            .upload(`${path}/${name}`, processedFile);

          if (error) {
            throw new Error(error.message);
          }

          const { data } = supabase.storage
            .from(location)
            .getPublicUrl(`${path}/${name}`);

          const insertResult = await insertToFileTable({
            name: name,
            size: processedFile.size,
            type: processedFile.type,
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

  const removeFromStorage = async (location: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(location)
      .remove([path]);
    if (error) {
      throw new Error(
        `Error removing file from storage with path ${path}: ${error.message}`,
      );
    }
    console.log(data);
    console.log("File removed from storage");
  };

  const removeFile = async (fileId: number, path: string, location: string) => {
    // it does seem like this not always work
    try {
      // Remove from the file table
      await removeFromFileTable(fileId);
      // Remove from storage
      await removeFromStorage(location, path);

      return null;
    } catch (error) {
      throw error;
    }
  };

  return {
    loading,
    handleUpload,
    removeFile,
  };
};

export default useFileUpload;
