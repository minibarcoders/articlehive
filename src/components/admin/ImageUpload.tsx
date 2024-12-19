import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { Loader2, Upload } from "lucide-react";

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImageUrl?: string;
}

export const ImageUpload = ({ onImageUploaded, currentImageUrl }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError, data } = await supabase.storage
        .from("content-images")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("content-images")
        .getPublicUrl(filePath);

      onImageUploaded(publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
        {isUploading && (
          <Loader2 className="w-4 h-4 animate-spin" />
        )}
      </div>
      {currentImageUrl && (
        <div className="relative w-full aspect-video rounded-lg overflow-hidden">
          <img
            src={currentImageUrl}
            alt="Current image"
            className="object-cover w-full h-full"
          />
        </div>
      )}
    </div>
  );
};