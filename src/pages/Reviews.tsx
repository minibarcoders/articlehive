import { Header } from "@/components/Header";
import { ArticleCard } from "@/components/ArticleCard";
import { motion } from "framer-motion";

const reviews = [
  {
    title: "MacBook Pro M3 Max Review",
    excerpt: "Apple's most powerful laptop yet pushes the boundaries of what's possible in a mobile workstation.",
    category: "Hardware",
    imageUrl: "/placeholder.svg",
    date: "March 15, 2024",
  },
  {
    title: "Samsung Galaxy S24 Ultra Review",
    excerpt: "The latest flagship from Samsung brings AI features and impressive camera improvements.",
    category: "Smartphones",
    imageUrl: "/placeholder.svg",
    date: "March 14, 2024",
  },
  {
    title: "Sony WH-1000XM5 Review",
    excerpt: "The next generation of Sony's premium noise-cancelling headphones sets a new standard.",
    category: "Audio",
    imageUrl: "/placeholder.svg",
    date: "March 13, 2024",
  },
];

const Reviews = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8">Tech Reviews</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <ArticleCard key={index} {...review} />
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Reviews;