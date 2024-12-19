import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { ImageUpload } from "./ImageUpload";
import { TagInput } from "@/components/TagInput";

interface PostFormProps {
  onClose: () => void;
}

export const PostForm = ({ onClose }: PostFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from("posts").insert([
        {
          title,
          content,
          category,
          image_url: imageUrl,
          author,
          tags,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Post created successfully!",
      });

      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="min-h-[200px]"
        />

        <Input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <div className="space-y-2">
          <label className="text-sm font-medium">Tags</label>
          <TagInput tags={tags} onChange={setTags} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Featured Image</label>
          <ImageUpload onImageUploaded={setImageUrl} currentImageUrl={imageUrl} />
        </div>

        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create post"}
        </Button>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </form>
  );
};