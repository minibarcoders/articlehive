import { Header } from "@/components/Header";
import { ReviewCard } from "@/components/ReviewCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { motion } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    id: 1,
    title: "MacBook Pro M3 Max Review: The Ultimate Creator's Laptop",
    excerpt: "Apple's most powerful laptop yet redefines what's possible in a mobile workstation, with groundbreaking performance and exceptional battery life.",
    category: "Laptops",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 15, 2024",
    author: "Sarah Chen",
    readTime: "12 min read"
  },
  {
    id: 2,
    title: "Samsung Galaxy S24 Ultra: AI Meets Premium Hardware",
    excerpt: "Samsung's latest flagship brings revolutionary AI features and camera improvements that set a new standard for smartphone photography.",
    category: "Smartphones",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    date: "March 14, 2024",
    author: "Michael Torres",
    readTime: "15 min read"
  },
  {
    id: 3,
    title: "Sony WH-1000XM5 Review: The New King of ANC",
    excerpt: "The next generation of Sony's premium noise-cancelling headphones sets a new standard for audio quality and ambient sound control.",
    category: "Audio",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    date: "March 13, 2024",
    author: "Alex Rivera",
    readTime: "10 min read"
  }
];

const categories = ["All", "Laptops", "Smartphones", "Audio", "Gaming", "Smart Home"];

const Reviews = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredReviews = selectedCategory === "All" 
    ? reviews 
    : reviews.filter(review => review.category === selectedCategory);

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
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Reviews;