import { SetStateAction, useState } from "react";
import imageCompression from "browser-image-compression";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { DbResult, DbResultErr, DbResultOk, Tables } from "@/database";

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
};

interface useImageUploadProps {
  loading: boolean;
  image: Tables<"files"> | null;
  setImage: React.Dispatch<SetStateAction<Tables<"files"> | null>>;
  images: Tables<"files">[] | null;
  setImages: React.Dispatch<SetStateAction<Tables<"files">[] | null>>;
  error: DbResultErr;
  handleImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
    isMultiple: boolean,
  ) => Promise<void>;
  removeImage: any;
}

const useImageUpload = (): useImageUploadProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<Tables<"files"> | null>(null);
  const [images, setImages] = useState<Tables<"files">[] | null>(null);
  const [error, setError] = useState<any>(null);
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

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
    isMultiple: boolean = false,
  ) => {
    const imageFiles = event.target.files;
    if (!imageFiles) return;

    setLoading(true);

    const options: FileProcessingOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      if (isMultiple) {
        const compressedFiles = await Promise.all(
          Array.from(imageFiles).map(async (imageFile) => {
            const compressedFile = await imageCompression(imageFile, options);
            return compressedFile;
          }),
        );

        const uploadPromises: Promise<Tables<"files">>[] = compressedFiles.map(
          async (compressedFile) => {
            const { error } = await supabase.storage
              .from("professionals")
              .upload(`${path}/${compressedFile.name}`, compressedFile, {
                upsert: true,
              });

            if (error) {
              setError(error);
            } else {
              const { data } = supabase.storage
                .from("professionals")
                .getPublicUrl(`${path}/${compressedFile.name}`);

              try {
                const image = await insertToFileTable({
                  file: compressedFile,
                  url: data.publicUrl,
                });
                return image;
              } catch (error) {
                setError(error);
              }
            }
          },
        );

        const res = (await Promise.all(uploadPromises)) as DbResultOk<
          Tables<"files">[]
        >;
        return res;
      } else {
        const compressedFile = await imageCompression(imageFiles[0], options);
        const { error } = await supabase.storage
          .from("professionals")
          .upload(`${path}/${compressedFile.name}`, compressedFile, {
            upsert: true,
          });

        if (error) {
          setError(error);
        } else {
          const { data } = supabase.storage
            .from("professionals")
            .getPublicUrl(`${path}/${compressedFile.name}`);

          try {
            const image = await insertToFileTable({
              file: compressedFile,
              url: data.publicUrl,
            });
            return image;
          } catch (error) {
            return error;
          }
        }
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const removeFromFileTable = async (fileId: number) => {
    const { error } = await supabase.from("files").delete().eq("id", fileId);

    if (error) {
      setError(error);
    }
    console.log("file deleted from table");
  };

  const removeFromStorage = async (path: string) => {
    const { error } = await supabase.storage
      .from("professionals")
      .remove([path]);
    if (error) {
      setError(error);
    }
    console.log("file removed from storage");
  };

  const removeImage = async (
    fileId: number,
    path: string,
    isMultiple: boolean = false,
  ) => {
    try {
      // Remove from the file table
      await removeFromFileTable(fileId);
      // Remove from storage
      await removeFromStorage(path);

      if (!isMultiple) {
        return null;
      } else {
        // Find the index of the image to remove from the images array
        if (!images) return;
        const indexToRemove = images.findIndex((img) => img.id === fileId);

        console.log("Index to remove:", indexToRemove);

        if (indexToRemove !== -1) {
          const updatedImages = [...images];
          updatedImages.splice(indexToRemove, 1);

          console.log("Updated images:", updatedImages);

          return updatedImages;
        }
      }
    } catch (error) {
      setError(error);
    }
  };
  return {
    loading,
    image,
    setImage,
    images,
    setImages,
    error,
    handleImageUpload,
    removeImage,
  };
};

export default useImageUpload;
