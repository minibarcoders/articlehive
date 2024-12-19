import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import { ArrowLeft } from "lucide-react";
import type { Guide, Review } from "@/lib/supabase/types";

interface ContentFormProps {
  type: "guide" | "review";
  initialData?: Guide | Review | null;
  onClose: () => void;
}

export const ContentForm = ({ type, initialData, onClose }: ContentFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialData?.title || "");
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "");
  const [content, setContent] = useState(initialData?.content || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [imageUrl, setImageUrl] = useState(initialData?.image_url || "");
  const [author, setAuthor] = useState(initialData?.author || "");
  const [readTime, setReadTime] = useState(initialData?.read_time || "");
  const [rating, setRating] = useState(
    type === "review" && initialData && "rating" in initialData ? initialData.rating : 5
  );
  const [pros, setPros] = useState<string[]>(
    type === "review" && initialData && "pros" in initialData ? initialData.pros : [""]
  );
  const [cons, setCons] = useState<string[]>(
    type === "review" && initialData && "cons" in initialData ? initialData.cons : [""]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = {
        title,
        excerpt,
        content,
        category,
        image_url: imageUrl,
        author,
        read_time: readTime,
        ...(type === "review" && {
          rating,
          pros: pros.filter(Boolean),
          cons: cons.filter(Boolean),
        }),
      };

      const { error } = initialData
        ? await supabase
            .from(type === "guide" ? "guides" : "reviews")
            .update(data)
            .eq("id", initialData.id)
        : await supabase
            .from(type === "guide" ? "guides" : "reviews")
            .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${type} ${initialData ? "updated" : "created"} successfully!`,
      });

      onClose();
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "Failed to save content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-4">
        <Button type="button" variant="ghost" onClick={onClose}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h2 className="text-2xl font-bold">
          {initialData ? "Edit" : "Create"} {type}
        </h2>
      </div>

      <div className="space-y-4">
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Textarea
          placeholder="Excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
        />

        <Textarea
          placeholder="Content (Markdown supported)"
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

        <Input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <Input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />

        <Input
          placeholder="Read Time (e.g., '5 min read')"
          value={readTime}
          onChange={(e) => setReadTime(e.target.value)}
          required
        />

        {type === "review" && (
          <>
            <Input
              type="number"
              min="0"
              max="5"
              step="0.1"
              placeholder="Rating (0-5)"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            />

            <div className="space-y-2">
              <h3>Pros</h3>
              {pros.map((pro, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={pro}
                    onChange={(e) => {
                      const newPros = [...pros];
                      newPros[index] = e.target.value;
                      if (index === pros.length - 1 && e.target.value) {
                        newPros.push("");
                      }
                      setPros(newPros);
                    }}
                    placeholder={`Pro ${index + 1}`}
                  />
                  {index < pros.length - 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newPros = pros.filter((_, i) => i !== index);
                        setPros(newPros);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <h3>Cons</h3>
              {cons.map((con, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={con}
                    onChange={(e) => {
                      const newCons = [...cons];
                      newCons[index] = e.target.value;
                      if (index === cons.length - 1 && e.target.value) {
                        newCons.push("");
                      }
                      setCons(newCons);
                    }}
                    placeholder={`Con ${index + 1}`}
                  />
                  {index < cons.length - 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => {
                        const newCons = cons.filter((_, i) => i !== index);
                        setCons(newCons);
                      }}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Saving..." : initialData ? "Update" : "Create"}
      </Button>
    </form>
  );
};