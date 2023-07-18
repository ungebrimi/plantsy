import { useState } from 'react';
import imageCompression from 'browser-image-compression';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

type ImageType = {
  name: string;
  file: File;
  url: string;
  lastModified: string;
};

type FileProcessingOptions = {
  maxSizeMB: number;
  maxWidthOrHeight: number;
  useWebWorker: boolean;
}

const useImageUpload = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [image, setImage] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const supabase = createClientComponentClient();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageFile = event.target.files?.[0];
    if (!imageFile) return
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const options: FileProcessingOptions = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      const { error } = await supabase.storage
        .from(user.id)
        .upload(compressedFile.name, compressedFile, { upsert: true });

      if (error) {
        setError(error);
      } else {
        const { data } = supabase.storage.from(user.id).getPublicUrl(compressedFile.name);
        setImage({ compressedFile, url: data.publicUrl });
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  console.log("image state: ", image)

  return {
    loading,
    image,
    error,
    handleImageUpload,
  };
};

export default useImageUpload;

