import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import type { Guide } from "@/lib/supabase/types";

const fetchGuides = async () => {
  const { data, error } = await supabase
    .from("guides")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

const Guides = () => {
  const { data: guides, isLoading, error } = useQuery({
    queryKey: ["guides"],
    queryFn: fetchGuides,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl" />
            ))}
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center text-red-600">
            Error loading guides. Please try again later.
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Tech Guides</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides?.map((guide) => (
              <Link key={guide.id} to={`/guides/${guide.id}`}>
                <ArticleCard
                  id={guide.id}
                  title={guide.title}
                  excerpt={guide.excerpt}
                  category={guide.category}
                  imageUrl={guide.image_url || "https://via.placeholder.com/800x600"}
                  date={new Date(guide.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                />
              </Link>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Guides;