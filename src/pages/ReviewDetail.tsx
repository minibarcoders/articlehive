import { Header } from "@/components/Header";
import { ReviewHeader } from "@/components/ReviewHeader";
import { ProsCons } from "@/components/ProsCons";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const reviews = {
  1: {
    title: "MacBook Pro M3 Max Review: The Ultimate Creator's Laptop",
    excerpt: "Apple's most powerful laptop yet redefines what's possible in a mobile workstation, with groundbreaking performance and exceptional battery life.",
    category: "Laptops",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    date: "March 15, 2024",
    author: "Sarah Chen",
    readTime: "12 min read",
    pros: [
      "Exceptional performance for creative tasks",
      "Outstanding battery life",
      "Beautiful Mini LED display",
      "Premium build quality"
    ],
    cons: [
      "High price point",
      "Limited upgradeability",
      "Port selection might not satisfy all users"
    ]
  }
} as const;

type ReviewId = keyof typeof reviews;

const ReviewDetail = () => {
  const { id } = useParams();
  const review = id ? reviews[Number(id) as ReviewId] : null;

  if (!review) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Review not found</h1>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <article className="max-w-3xl mx-auto space-y-8">
          <ReviewHeader
            title={review.title}
            author={review.author}
            date={review.date}
            category={review.category}
            rating={review.rating}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="aspect-video rounded-lg overflow-hidden"
          >
            <img
              src={review.imageUrl}
              alt={review.title}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            {review.excerpt}
          </motion.p>

          <ProsCons pros={review.pros} cons={review.cons} />
        </article>
      </main>
    </div>
  );
};

export default ReviewDetail;