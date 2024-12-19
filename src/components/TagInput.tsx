import { useState } from "react";
import { X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
}

export const TagInput = ({ tags, onChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        onChange([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm"
          >
            {tag}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-purple-200"
              onClick={() => removeTag(tag)}
            >
              <X className="h-3 w-3" />
            </Button>
          </span>
        ))}
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a tag and press Enter"
        className="mt-2"
      />
    </div>
  );
};