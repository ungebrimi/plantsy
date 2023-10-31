import React, {useState} from "react";
import imageCompression from "browser-image-compression";
import {Tables} from "@/database";
import {StorageError} from "@supabase/storage-js";
import {createBrowserClient} from "@supabase/ssr";

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
};

interface useImageUploadProps {
  loading: boolean;
    handleSingleImageUpload: (
        event: React.ChangeEvent<HTMLInputElement>,
        path: string
    ) => Promise<Tables<"files"> | undefined | StorageError>;
    handleMultipleImagesUpload: (
        event: React.ChangeEvent<HTMLInputElement>,
        path: string
    ) => Promise<Tables<"files">[] | undefined | StorageError>;
  removeImage: any;
}

const useImageUpload = (): useImageUploadProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

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

  const handleSingleImageUpload = async (
      event: React.ChangeEvent<HTMLInputElement>,
      path: string,
      imageNameToCheck: string | null = null
  ): Promise<Tables<"files"> | undefined | StorageError> => {
    setLoading(true);
    const imageFile = event.target?.files;
    const options: FileProcessingOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

      if (!imageFile) return
    try {
        const compressedFile = await imageCompression(imageFile[0], options);
        const {error} = await supabase.storage
            .from("professionals")
            .upload(`${path}/${compressedFile.name}`, compressedFile);
        if (error) throw error
        const {data} = supabase.storage
            .from("professionals")
            .getPublicUrl(`${path}/${compressedFile.name}`);

        return await insertToFileTable({
          file: compressedFile,
          url: data.publicUrl,
        });
      }
      catch (error) {
      throw error
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleImagesUpload = async (
      event: React.ChangeEvent<HTMLInputElement>,
      path: string
  ): Promise<Tables<"files">[] | undefined> => {
    setLoading(true);
    const options: FileProcessingOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    if (!event.target.files || event.target.files.length === 0) {
      setLoading(false);
      return [];
    }

    try {
      const compressedFiles = await Promise.all(
          Array.from(event.target.files).map((imageFile) =>
              imageCompression(imageFile, options)
          )
      );

      const uploadPromises = compressedFiles.map(async (compressedFile) => {
        try {
          const { error } = await supabase.storage
              .from("professionals")
              .upload(`${path}/${compressedFile.name}`, compressedFile);

          if (error) {
            throw new Error(error.message);
          }

          const { data} = supabase.storage
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
      // Filter out any undefined results
      return results.filter((result) => result) as Tables<"files">[];
    } catch (error) {
      setLoading(false);
      throw error; // Propagate the error to the caller
    }
  };


  const removeFromFileTable = async (fileId: number) => {
    const { error } = await supabase.from("files").delete().eq("id", fileId);

    if (error) {
      throw new Error(`Error deleting file with ID ${fileId}: ${error.message}`);
    }
    console.log("File deleted from table");
  };

  const removeFromStorage = async (path: string) => {
    const { data, error } = await supabase.storage.from("professionals").remove([path]);
    if (error) {
      throw new Error(`Error removing file from storage with path ${path}: ${error.message}`);
    }
    console.log(data)
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
    handleSingleImageUpload,
    handleMultipleImagesUpload,
    removeImage,
  };
};

export default useImageUpload;
