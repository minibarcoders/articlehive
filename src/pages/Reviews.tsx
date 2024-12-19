import { Header } from "@/components/Header";
import { ReviewCard } from "@/components/ReviewCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase/client";
import { format } from "date-fns";

const fetchReviews = async () => {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
};

const Reviews = () => {
  const { data: reviews, isLoading, error } = useQuery({
    queryKey: ["reviews"],
    queryFn: fetchReviews,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = reviews 
    ? ["All", ...new Set(reviews.map(review => review.category))]
    : ["All"];

  const filteredReviews = selectedCategory === "All"
    ? reviews
    : reviews?.filter(review => review.category === selectedCategory);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div>Loading...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div>Error loading reviews</div>
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
          className="space-y-8"
        >
          <div className="flex flex-col space-y-4">
            <h1 className="text-4xl font-bold text-gray-900">Tech Reviews</h1>
            <p className="text-lg text-gray-600">
              In-depth analysis and hands-on reviews of the latest tech products
            </p>
          </div>

          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredReviews?.map((review) => (
              <ReviewCard
                key={review.id}
                id={review.id}
                title={review.title}
                excerpt={review.excerpt}
                category={review.category}
                rating={review.rating}
                imageUrl={review.image_url || "/placeholder.svg"}
                date={format(new Date(review.date), "MMMM d, yyyy")}
                author={review.author}
                readTime={review.read_time}
              />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Reviews;