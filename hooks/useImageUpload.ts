import { useState } from "react";
import imageCompression from "browser-image-compression";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FileType } from "@/dbtypes";

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
};

const useImageUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [response, setResponse] = useState<FileType[]>([]);
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
    isMultiple: boolean = false
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
          })
        );

        const uploadPromises = compressedFiles.map(async (compressedFile) => {
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
        });

        const res: any = await Promise.all(uploadPromises);
        setResponse(res);
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
            setImage(image);
          } catch (error) {
            setError(error);
          }
        }
      }

      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return {
    loading,
    image,
    response,
    error,
    handleImageUpload,
  };
};

export default useImageUpload;
