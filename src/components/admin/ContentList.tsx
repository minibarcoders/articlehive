import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ContentForm } from "./ContentForm";
import { PostForm } from "./PostForm";
import type { Guide, Review } from "@/lib/supabase/types";

type ContentType = "guide" | "review" | "post";

const fetchContent = async (type: ContentType) => {
  const { data, error } = await supabase
    .from(type === "guide" ? "guides" : type === "review" ? "reviews" : "posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

export const ContentList = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<Guide | Review | null>(null);
  const [contentType, setContentType] = useState<ContentType>("guide");

  const { data: content, isLoading } = useQuery({
    queryKey: [contentType + "s"],
    queryFn: () => fetchContent(contentType),
  });

  if (showForm) {
    if (contentType === "post") {
      return <PostForm onClose={() => setShowForm(false)} />;
    }
    return (
      <ContentForm
        type={contentType as "guide" | "review"}
        initialData={editingItem}
        onClose={() => {
          setShowForm(false);
          setEditingItem(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <select
          value={contentType}
          onChange={(e) => setContentType(e.target.value as ContentType)}
          className="p-2 border rounded"
        >
          <option value="guide">Guides</option>
          <option value="review">Reviews</option>
          <option value="post">Posts</option>
        </select>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="mr-2" />
          Add {contentType}
        </Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {new Date(item.date).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (contentType !== "post") {
                        setEditingItem(item);
                        setShowForm(true);
                      }
                    }}
                  >
                    Edit
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};