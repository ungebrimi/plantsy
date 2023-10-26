import React, {useState} from "react";
import imageCompression from "browser-image-compression";
import {createClientComponentClient} from "@supabase/auth-helpers-nextjs";
import {Tables} from "@/database";
import {StorageError} from "@supabase/storage-js";

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
  const supabase = createClientComponentClient();

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
  ): Promise<Tables<"files">[] | undefined | StorageError> => {
    setLoading(true);

    const options: FileProcessingOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    if (event.target.files) {
      try {
        const compressedFiles = await Promise.all(
            Array.from(event.target.files).map(async (imageFile) => {
              return await imageCompression(imageFile, options);
            })
        );

        const uploadPromises: Promise<Tables<"files">>[] = compressedFiles.map(
            async (compressedFile) => {
              const { error } = await supabase.storage
                  .from("professionals")
                  .upload(`${path}/${compressedFile.name}`, compressedFile);

              if (error) {
                throw error;
              } else {
                const { data } = supabase.storage
                    .from("professionals")
                    .getPublicUrl(`${path}/${compressedFile.name}`);

                return await insertToFileTable({
                  file: compressedFile,
                  url: data.publicUrl,
                });
              }
            }
        );

        const results = await Promise.all(uploadPromises);
        setLoading(false);
        // filter so if any attempts that does not work out and returns undefined, gets removed from result
        return results.filter((result) => result) as Tables<"files">[];
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    }
    // Change the return type here to match your new requirement
    return [];
  };


  const removeFromFileTable = async (fileId: number) => {
    const { error } = await supabase.from("files").delete().eq("id", fileId);

    if (error) {
      throw error;
    }
    console.log("file deleted from table");
  };

  const removeFromStorage = async (path: string) => {
    const { error } = await supabase.storage
      .from("professionals")
      .remove([path]);
    if (error) {
      throw error;
    }
    console.log("file removed from storage");
  };

  const removeImage = async (fileId: number, path: string) => {
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
