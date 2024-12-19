import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { ArticleGrid } from "@/components/ArticleGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { Header } from "@/components/Header";
import { useState } from "react";
import { motion } from "framer-motion";

const fetchGuides = async () => {
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

const Guides = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data: guides, isLoading } = useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-accent rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-accent rounded-lg shadow-md p-6 space-y-4">
                  <div className="h-48 bg-muted rounded"></div>
                  <div className="h-6 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  const categories = [...new Set(guides?.map((guide) => guide.category) || [])];
  const filteredGuides = guides?.filter(
    (guide) => !selectedCategory || guide.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Tech Guides</h1>
            <p className="text-lg text-foreground dark:text-gray-300">
              Comprehensive guides and tutorials to help you make the most of your tech
            </p>
          </div>

          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          
          <ArticleGrid
            articles={filteredGuides?.map((guide) => ({
              id: guide.id,
              title: guide.title,
              excerpt: guide.excerpt,
              imageUrl: guide.image_url || "/placeholder.svg",
              category: guide.category,
              author: guide.author,
              readTime: guide.read_time,
              date: new Date(guide.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              }),
              href: `/guides/${guide.id}`
            })) || []}
          />
        </motion.div>
      </main>
    </div>
  );
};

export default Guides;