import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/lib/supabase/client";
import type { Guide, Review } from "@/lib/supabase/types";

export const AdminPanel = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [author, setAuthor] = useState("");
  const [readTime, setReadTime] = useState("");
  const [type, setType] = useState<"guide" | "review">("guide");
  const [rating, setRating] = useState(5);
  const [pros, setPros] = useState<string[]>([""]);
  const [cons, setCons] = useState<string[]>([""]);

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

      const { error } = await supabase
        .from(type === "guide" ? "guides" : "reviews")
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Success",
        description: `${type} created successfully!`,
      });

      // Reset form
      setTitle("");
      setExcerpt("");
      setContent("");
      setCategory("");
      setImageUrl("");
      setAuthor("");
      setReadTime("");
      setRating(5);
      setPros([""]);
      setCons([""]);
    } catch (error) {
      console.error("Error creating content:", error);
      toast({
        title: "Error",
        description: "Failed to create content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6">
      <div className="space-y-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "guide" | "review")}
          className="w-full p-2 border rounded"
        >
          <option value="guide">Guide</option>
          <option value="review">Review</option>
        </select>

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
        {isLoading ? "Creating..." : `Create ${type}`}
      </Button>
    </form>
  );
};
