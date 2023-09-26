import { SetStateAction, useState } from "react";
import imageCompression from "browser-image-compression";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FileType } from "@/dbtypes";

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
};

interface useImageUploadProps {
  loading: boolean;
  image: FileType | null;
  setImage: React.Dispatch<SetStateAction<FileType | null>>;
  images: FileType[];
  setImages: React.Dispatch<SetStateAction<FileType[]>>;
  error: any;
  handleImageUpload: (
    event: React.ChangeEvent<HTMLInputElement>,
    path: string,
    isMultiple: boolean,
  ) => Promise<void>;
  removeImage: any;
}

const useImageUpload = (): useImageUploadProps => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<FileType | null>(null);
  const [images, setImages] = useState<FileType[]>([]);
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
        setImages(res);
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

  const removeFromFileTable = async (fileId: number) => {
    const { error } = await supabase.from("files").delete().eq("id", fileId);

    if (error) {
      console.error(error);
    }
    console.log("file deleted from table");
  };

  const removeFromStorage = async (path: string) => {
    const { error } = await supabase.storage
      .from("professionals")
      .remove([path]);
    if (error) {
      console.error(error);
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
        setImage(null); // Set the image state to null for singular removal
      } else {
        // Find the index of the image to remove from the images array
        const indexToRemove = images.findIndex((img) => img.id === fileId);
        if (indexToRemove !== -1) {
          const updatedImages = [...images];
          updatedImages.splice(indexToRemove, 1);
          setImages(updatedImages);
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
