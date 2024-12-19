import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Chapter {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export const TableOfContents = ({ content }: TableOfContentsProps) => {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  useEffect(() => {
    // Parse markdown content to find headings
    const lines = content.split('\n');
    const headings = lines
      .filter(line => line.startsWith('#'))
      .map(line => {
        const level = line.match(/^#+/)?.[0].length || 0;
        const title = line.replace(/^#+\s/, '');
        const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return { id, title, level };
      });
    setChapters(headings);
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (chapters.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader className="py-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Link className="w-4 h-4" />
          Chapters
        </CardTitle>
      </CardHeader>
      <CardContent className="py-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          {chapters.map((chapter) => (
            <Button
              key={chapter.id}
              variant="ghost"
              size="sm"
              className={`w-full justify-start text-sm h-8 ${
                chapter.level === 2 ? 'pl-2' : 'pl-4'
              }`}
              onClick={() => scrollToSection(chapter.id)}
            >
              {chapter.title}
            </Button>
          ))}
        </motion.div>
      </CardContent>
    </Card>
  );
};